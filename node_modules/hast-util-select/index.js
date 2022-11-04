/**
 * @typedef {import('./lib/types.js').Element} Element
 * @typedef {import('./lib/types.js').HastNode} HastNode
 * @typedef {import('./lib/types.js').Space} Space
 */

import {any} from './lib/any.js'
import {parse} from './lib/parse.js'

/**
 * @param {string} selector
 * @param {HastNode} [node]
 * @param {Space} [space]
 * @returns {boolean}
 */
export function matches(selector, node, space) {
  return Boolean(
    any(parse(selector), node, {space, one: true, shallow: true})[0]
  )
}

/**
 * @param {string} selector
 * @param {HastNode} [node]
 * @param {Space} [space]
 * @returns {Element|null}
 */
export function select(selector, node, space) {
  return any(parse(selector), node, {space, one: true})[0] || null
}

/**
 * @param {string} selector
 * @param {HastNode} [node]
 * @param {Space} [space]
 * @returns {Array<Element>}
 */
export function selectAll(selector, node, space) {
  return any(parse(selector), node, {space})
}
