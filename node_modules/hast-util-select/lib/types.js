/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Properties} Properties
 * @typedef {Element|Root} HastParent
 * @typedef {import('hast').Parent['children'][number]|Root} HastNode
 * @typedef {Element['children'][number]} ElementChild
 * @typedef {Properties[string]} PropertyValue
 *
 * @typedef {import('css-selector-parser').Selector} Selector
 * @typedef {import('css-selector-parser').Selectors} Selectors
 * @typedef {import('css-selector-parser').RuleSet} RuleSet
 * @typedef {import('css-selector-parser').Rule} Rule
 * @typedef {import('css-selector-parser').RulePseudo} RulePseudo
 * @typedef {import('css-selector-parser').AttrValueType} AttrValueType
 * @typedef {Selector|Rule|RulePseudo} Query
 *
 * Fix for types.
 * @typedef RuleAttr
 * @property {string} name
 * @property {string} [operator]
 * @property {AttrValueType} [valueType]
 * @property {string} [value]
 *
 * More specific type for registered selector pseudos.
 * @typedef RulePseudoSelector
 * @property {string} name
 * @property {'selector'} valueType
 * @property {Selector} value
 *
 * Overwrite to compile nth-checks once.
 * @typedef RulePseudoNth
 * @property {string} name
 * @property {'function'} valueType
 * @property {(index: number) => boolean} value
 *
 * @typedef {'html'|'svg'} Space
 * @typedef {'auto'|'ltr'|'rtl'} Direction
 * @typedef {typeof import('property-information').html} Schema
 * @typedef {Schema['property'][string]} Info
 *
 * @typedef SelectState
 * @property {Array<Element>} [scopeElements]
 * @property {SelectIterator} [iterator]
 * @property {boolean} [one=false]
 * @property {boolean} [shallow=false]
 * @property {boolean} [index=false]
 * @property {boolean} [found=false]
 * @property {Space} [space]
 * @property {Schema} [schema]
 * @property {string} [language]
 * @property {Direction} [direction]
 * @property {boolean} [editableOrEditingHost]
 * @property {number} [typeIndex] Track siblings
 * @property {number} [elementIndex] Track siblings
 * @property {number} [typeCount] Track siblings
 * @property {number} [elementCount] Track siblings
 */

/**
 * @callback SelectIterator
 * @param {Rule} query
 * @param {HastNode} node
 * @param {number} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 */

/**
 * @typedef {(
 *  ((query: Rule, node: HastNode, index: number|null, parent: Parent|null, state: SelectState) => void)
 * )} Handler
 */

export {}
