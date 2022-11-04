/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').HastNode} HastNode
 * @typedef {import('./types.js').Element} Element
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').SelectState} SelectState
 * @typedef {import('hast-util-is-element').AssertPredicate<Element>} IsElement
 */

import {attribute} from './attribute.js'
import {className} from './class-name.js'
import {id} from './id.js'
import {name} from './name.js'
import {pseudo} from './pseudo.js'
import {element} from './util.js'

/**
 * @param {Rule} query
 * @param {HastNode} node
 * @param {number|null} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
export function test(query, node, index, parent, state) {
  return Boolean(
    element(node) &&
      state.schema &&
      (!query.tagName || name(query, node)) &&
      (!query.classNames || className(query, node)) &&
      (!query.id || id(query, node)) &&
      (!query.attrs || attribute(query, node, state.schema)) &&
      (!query.pseudos || pseudo(query, node, index, parent, state))
  )
}
