/**
 * @typedef {import('./types.js').SelectState} SelectState
 * @typedef {import('./types.js').HastNode} HastNode
 * @typedef {import('./types.js').ElementChild} ElementChild
 * @typedef {import('./types.js').Direction} Direction
 * @typedef {import('unist-util-visit/complex-types').Visitor<ElementChild>} Visitor
 */

import {direction} from 'direction'
import {isElement} from 'hast-util-is-element'
import {toString} from 'hast-util-to-string'
import {svg} from 'property-information'
import {visit, EXIT, SKIP} from 'unist-util-visit'
import {element} from './util.js'

/**
 * @param {SelectState} state
 * @param {HastNode} node
 * @returns {() => void}
 */
// eslint-disable-next-line complexity
export function enterState(state, node) {
  const schema = state.schema
  const language = state.language
  const currentDirection = state.direction
  const editableOrEditingHost = state.editableOrEditingHost
  /** @type {Direction|undefined} */
  let dirInferred
  /** @type {boolean|undefined} */
  let found

  if (element(node) && node.properties) {
    const lang = node.properties.xmlLang || node.properties.lang
    const type = node.properties.type || 'text'
    const dir = dirProperty(node)

    if (lang !== undefined && lang !== null) {
      state.language = String(lang)
      found = true
    }

    if (schema && schema.space === 'html') {
      if (node.properties.contentEditable === 'true') {
        state.editableOrEditingHost = true
        found = true
      }

      if (isElement(node, 'svg')) {
        state.schema = svg
        found = true
      }

      // See: <https://html.spec.whatwg.org/#the-directionality>.
      // Explicit `[dir=rtl]`.
      if (dir === 'rtl') {
        dirInferred = dir
      } else if (
        // Explicit `[dir=ltr]`.
        dir === 'ltr' ||
        // HTML with an invalid or no `[dir]`.
        (dir !== 'auto' && isElement(node, 'html')) ||
        // `input[type=tel]` with an invalid or no `[dir]`.
        (dir !== 'auto' && isElement(node, 'input') && type === 'tel')
      ) {
        dirInferred = 'ltr'
        // `[dir=auto]` or `bdi` with an invalid or no `[dir]`.
      } else if (dir === 'auto' || isElement(node, 'bdi')) {
        if (isElement(node, 'textarea')) {
          // Check contents of `<textarea>`.
          dirInferred = dirBidi(toString(node))
        } else if (
          isElement(node, 'input') &&
          (type === 'email' ||
            type === 'search' ||
            type === 'tel' ||
            type === 'text')
        ) {
          // Check value of `<input>`.
          // @ts-expect-error something is `never` in types but this is needed.
          dirInferred = node.properties.value
            ? // @ts-expect-error Assume string
              dirBidi(node.properties.value)
            : 'ltr'
        } else {
          // Check text nodes in `node`.
          visit(node, inferDirectionality)
        }
      }

      if (dirInferred) {
        state.direction = dirInferred
        found = true
      }
    }
    // Turn off editing mode in non-HTML spaces.
    else if (state.editableOrEditingHost) {
      state.editableOrEditingHost = false
      found = true
    }
  }

  return found ? reset : noop

  function reset() {
    state.schema = schema
    state.language = language
    state.direction = currentDirection
    state.editableOrEditingHost = editableOrEditingHost
  }

  /** @type {Visitor} */
  function inferDirectionality(child) {
    if (child.type === 'text') {
      dirInferred = dirBidi(child.value)
      return dirInferred ? EXIT : null
    }

    if (
      child !== node &&
      (isElement(child, ['bdi', 'script', 'style', 'textare']) ||
        dirProperty(child))
    ) {
      return SKIP
    }
  }
}

/**
 * @param {string} value
 * @returns {Direction|undefined}
 */
function dirBidi(value) {
  const result = direction(value)
  return result === 'neutral' ? undefined : result
}

/**
 * @param {ElementChild} node
 * @returns {Direction|undefined}
 */
function dirProperty(node) {
  const value =
    element(node) && node.properties && typeof node.properties.dir === 'string'
      ? node.properties.dir.toLowerCase()
      : undefined

  return value === 'auto' || value === 'ltr' || value === 'rtl'
    ? value
    : undefined
}

function noop() {}
