/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').Element} Element
 */

/**
 * @param {Rule} query
 * @param {Element} element
 * @returns {boolean}
 */
export function name(query, element) {
  return query.tagName === '*' || query.tagName === element.tagName
}
