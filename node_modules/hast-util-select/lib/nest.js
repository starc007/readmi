/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Element} Element
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').SelectState} SelectState
 * @typedef {import('./types.js').SelectIterator} SelectIterator
 * @typedef {import('./types.js').Handler} Handler
 */

import {zwitch} from 'zwitch'
import {enterState} from './enter-state.js'
import {parent, element} from './util.js'

const own = {}.hasOwnProperty

const handle = zwitch('nestingOperator', {
  // @ts-expect-error: hush.
  unknown: unknownNesting,
  // @ts-expect-error: hush.
  invalid: topScan, // `undefined` is the top query selector.
  handlers: {
    // @ts-expect-error: hush.
    null: descendant, // `null` is the descendant combinator.
    // @ts-expect-error: hush.
    '>': child,
    // @ts-expect-error: hush.
    '+': adjacentSibling,
    // @ts-expect-error: hush.
    '~': generalSibling
  }
})

/** @type {Handler} */
export function nest(query, node, index, parent, state) {
  handle(query, node, index, parent, state)
}

// Shouldn’t be called, parser gives correct data.
/* c8 ignore next 6 */
/**
 * @param {{[x: string]: unknown, type: string}} query
 */
function unknownNesting(query) {
  throw new Error('Unexpected nesting `' + query.nestingOperator + '`')
}

/** @type {Handler} */
function topScan(query, node, index, parent, state) {
  // Shouldn’t happen.
  /* c8 ignore next 3 */
  if (parent || index === null) {
    throw new Error('topScan is supposed to be called from the root node')
  }

  // Shouldn’t happen.
  /* c8 ignore next 3 */
  if (!state.iterator) {
    throw new Error('Expected `iterator`')
  }

  state.iterator(query, node, index, parent, state)
  if (!state.shallow) descendant(query, node, index, parent, state)
}

/** @type {Handler} */
function descendant(query, node, index, parent, state) {
  const previous = state.iterator

  state.iterator = iterator
  child(query, node, index, parent, state)

  /** @type {SelectIterator} */
  function iterator(query, node, index, parent, state) {
    // Shouldn’t happen.
    /* c8 ignore next 3 */
    if (!previous) {
      throw new Error('Expected `iterator`')
    }

    state.iterator = previous
    previous(query, node, index, parent, state)
    state.iterator = iterator

    if (state.one && state.found) return

    child(query, node, index, parent, state)
  }
}

/** @type {Handler} */
function child(query, node, _1, _2, state) {
  if (!parent(node)) return
  if (node.children.length === 0) return
  indexedSearch(query, node, state)
}

/** @type {Handler} */
function adjacentSibling(query, _, index, parent, state) {
  // Shouldn’t happen.
  /* c8 ignore next */
  if (!parent || index === null) return
  indexedSearch(query, parent, state, index + 1, true)
}

/** @type {Handler} */
function generalSibling(query, _, index, parent, state) {
  // Shouldn’t happen.
  /* c8 ignore next */
  if (!parent || index === null) return
  indexedSearch(query, parent, state, index + 1)
}

/**
 * Handles `typeIndex` and `typeCount` properties for every walker.
 *
 * @param {Rule} query
 * @param {Parent} parent
 * @param {SelectState} state
 * @param {number} [from=0]
 * @param {boolean} [firstElementOnly=false]
 */
function indexedSearch(query, parent, state, from, firstElementOnly) {
  const handle = state.index ? delay : add
  const children = parent.children
  let elements = 0
  let index = -1
  /** @type {Record<string, number>} */
  const types = {}
  /** @type {Array<Function>} */
  const delayed = []

  // Start looking at `from`
  if (from === undefined || from === null) from = 0

  // Exit if there are no further nodes.
  if (from >= children.length) return

  // If we need to index for types, do so for all elements before `from`.
  if (state.index) {
    while (++index < from) {
      const child = children[index]
      if (element(child)) count(child.tagName)
    }
  }

  index = from - 1

  while (++index < children.length) {
    const child = children[index]
    // Only check elements.
    // Check either all elements, or only check the first sibling
    if (element(child)) {
      handle(child, index)

      // Stop if we’re looking for one node and it’s already found.
      if (state.one && state.found) return
      if (firstElementOnly) break
    }
  }

  if (state.index) {
    index = -1

    while (++index < delayed.length) {
      delayed[index]()
      if (state.one && state.found) return
    }
  }

  /**
   * @param {Element} node
   * @param {number} childIndex
   */
  function delay(node, childIndex) {
    const elementsBefore = elements
    const elementsByTypeBefore = own.call(types, node.tagName)
      ? types[node.tagName]
      : 0

    count(node.tagName)

    delayed.push(fn)

    function fn() {
      // Before counting further elements:
      state.elementIndex = elementsBefore
      state.typeIndex = elementsByTypeBefore

      // After counting all elements.
      state.elementCount = elements
      state.typeCount = types[node.tagName]

      add(node, childIndex)
    }
  }

  /**
   * @param {Element} node
   * @param {number} childIndex
   */
  function add(node, childIndex) {
    const exit = enterState(state, node)

    // Shouldn’t happen.
    /* c8 ignore next 3 */
    if (!state.iterator) {
      throw new Error('Expected `iterator`')
    }

    state.iterator(query, node, childIndex, parent, state)
    exit()
  }

  /**
   * @param {string} name
   */
  function count(name) {
    if (!own.call(types, name)) types[name] = 0
    elements++
    types[name]++
  }
}
