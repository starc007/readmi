/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RulePseudo} RulePseudo
 * @typedef {import('./types.js').RulePseudoNth} RulePseudoNth
 * @typedef {import('./types.js').RulePseudoSelector} RulePseudoSelector
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').Selector} Selector
 * @typedef {import('./types.js').Selectors} Selectors
 * @typedef {import('./types.js').SelectState} SelectState
 * @typedef {import('./types.js').Element} Element
 * @typedef {import('./types.js').ElementChild} ElementChild
 */

import {extendedFilter} from 'bcp-47-match'
import {parse as commas} from 'comma-separated-tokens'
import {hasProperty} from 'hast-util-has-property'
import {isElement} from 'hast-util-is-element'
import {whitespace} from 'hast-util-whitespace'
import {zwitch} from 'zwitch'
import {any} from './any.js'

const handle = zwitch('name', {
  // @ts-expect-error: hush.
  unknown: unknownPseudo,
  invalid: invalidPseudo,
  handlers: {
    // @ts-expect-error: hush.
    any: matches,
    // @ts-expect-error: hush.
    'any-link': anyLink,
    // @ts-expect-error: hush.
    blank,
    // @ts-expect-error: hush.
    checked,
    // @ts-expect-error: hush.
    dir,
    // @ts-expect-error: hush.
    disabled,
    // @ts-expect-error: hush.
    empty,
    // @ts-expect-error: hush.
    enabled,
    // @ts-expect-error: hush.
    'first-child': firstChild,
    // @ts-expect-error: hush.
    'first-of-type': firstOfType,
    // @ts-expect-error: hush.
    has,
    // @ts-expect-error: hush.
    lang,
    // @ts-expect-error: hush.
    'last-child': lastChild,
    // @ts-expect-error: hush.
    'last-of-type': lastOfType,
    // @ts-expect-error: hush.
    matches,
    // @ts-expect-error: hush.
    not,
    // @ts-expect-error: hush.
    'nth-child': nthChild,
    // @ts-expect-error: hush.
    'nth-last-child': nthLastChild,
    // @ts-expect-error: hush.
    'nth-of-type': nthOfType,
    // @ts-expect-error: hush.
    'nth-last-of-type': nthLastOfType,
    // @ts-expect-error: hush.
    'only-child': onlyChild,
    // @ts-expect-error: hush.
    'only-of-type': onlyOfType,
    // @ts-expect-error: hush.
    optional,
    // @ts-expect-error: hush.
    'read-only': readOnly,
    // @ts-expect-error: hush.
    'read-write': readWrite,
    // @ts-expect-error: hush.
    required,
    // @ts-expect-error: hush.
    root,
    // @ts-expect-error: hush.
    scope
  }
})

pseudo.needsIndex = [
  'first-child',
  'first-of-type',
  'last-child',
  'last-of-type',
  'nth-child',
  'nth-last-child',
  'nth-of-type',
  'nth-last-of-type',
  'only-child',
  'only-of-type'
]

/**
 * @param {Rule} query
 * @param {Element} element
 * @param {number|null} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
export function pseudo(query, element, index, parent, state) {
  const pseudos = query.pseudos
  let offset = -1

  while (++offset < pseudos.length) {
    if (!handle(pseudos[offset], element, index, parent, state)) return false
  }

  return true
}

/**
 * @param {RulePseudoSelector} query
 * @param {Element} element
 * @param {number|null} _1
 * @param {Parent|null} _2
 * @param {SelectState} state
 * @returns {boolean}
 */
function matches(query, element, _1, _2, state) {
  const shallow = state.shallow
  const one = state.one

  state.shallow = true
  state.one = true

  const result = any(query.value, element, state)[0] === element

  state.shallow = shallow
  state.one = one

  return result
}

/**
 * @param {RulePseudoSelector} query
 * @param {Element} element
 * @param {number|null} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
function not(query, element, index, parent, state) {
  return !matches(query, element, index, parent, state)
}

/**
 * @param {RulePseudo} _
 * @param {Element} element
 * @returns {boolean}
 */
function anyLink(_, element) {
  return (
    isElement(element, ['a', 'area', 'link']) && hasProperty(element, 'href')
  )
}

/**
 * @param {RulePseudo} _
 * @param {Element} element
 * @returns {boolean}
 */
function checked(_, element) {
  if (isElement(element, ['input', 'menuitem'])) {
    return Boolean(
      element.properties &&
        (element.properties.type === 'checkbox' ||
          element.properties.type === 'radio') &&
        hasProperty(element, 'checked')
    )
  }

  if (isElement(element, 'option')) {
    return hasProperty(element, 'selected')
  }

  return false
}

/**
 * @param {RulePseudo} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function dir(query, _1, _2, _3, state) {
  return state.direction === query.value
}

/**
 * @param {RulePseudo} _
 * @param {Element} element
 * @returns {boolean}
 */
function disabled(_, element) {
  return (
    isElement(element, [
      'button',
      'input',
      'select',
      'textarea',
      'optgroup',
      'option',
      'menuitem',
      'fieldset'
    ]) && hasProperty(element, 'disabled')
  )
}

/**
 * @param {RulePseudo} query
 * @param {Element} element
 * @returns {boolean}
 */
function enabled(query, element) {
  return !disabled(query, element)
}

/**
 * @param {RulePseudo} _
 * @param {Element} element
 * @returns {boolean}
 */
function required(_, element) {
  return (
    isElement(element, ['input', 'textarea', 'select']) &&
    hasProperty(element, 'required')
  )
}

/**
 * @param {RulePseudo} query
 * @param {Element} element
 * @returns {boolean}
 */
function optional(query, element) {
  return !required(query, element)
}

/**
 * @param {RulePseudo} _
 * @param {Element} element
 * @param {number|null} _1
 * @param {Parent|null} _2
 * @param {SelectState} state
 * @returns {boolean}
 */
function readWrite(_, element, _1, _2, state) {
  return isElement(element, ['input', 'textarea'])
    ? !hasProperty(element, 'readOnly') && !hasProperty(element, 'disabled')
    : Boolean(state.editableOrEditingHost)
}

/**
 * @param {RulePseudo} query
 * @param {Element} element
 * @param {number|null} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
function readOnly(query, element, index, parent, state) {
  return !readWrite(query, element, index, parent, state)
}

/**
 * @param {RulePseudo} _
 * @param {Element} element
 * @param {number|null} _1
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
function root(_, element, _1, parent, state) {
  return Boolean(
    (!parent || parent.type === 'root') &&
      state.schema &&
      (state.schema.space === 'html' || state.schema.space === 'svg') &&
      isElement(element, ['html', 'svg'])
  )
}

/**
 * @param {RulePseudo} _
 * @param {Element} element
 * @param {number|null} _1
 * @param {Parent|null} _2
 * @param {SelectState} state
 * @returns {boolean}
 */
function scope(_, element, _1, _2, state) {
  return Boolean(
    isElement(element) &&
      state.scopeElements &&
      state.scopeElements.includes(element)
  )
}

/**
 * @param {RulePseudo} _
 * @param {Element} element
 * @returns {boolean}
 */
function empty(_, element) {
  return !someChildren(element, check)

  /**
   * @param {ElementChild} child
   * @returns {boolean}
   */
  function check(child) {
    return child.type === 'element' || child.type === 'text'
  }
}

/**
 * @param {RulePseudo} _
 * @param {Element} element
 * @returns {boolean}
 */
function blank(_, element) {
  return !someChildren(element, check)

  /**
   * @param {ElementChild} child
   * @returns {boolean}
   */
  function check(child) {
    return (
      child.type === 'element' || (child.type === 'text' && !whitespace(child))
    )
  }
}

/**
 * @param {RulePseudo} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function firstChild(query, _1, _2, _3, state) {
  assertDeep(state, query)
  return state.elementIndex === 0
}

/**
 * @param {RulePseudo} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function lang(query, _1, _2, _3, state) {
  return (
    state.language !== '' &&
    state.language !== undefined &&
    state.language !== null &&
    // @ts-expect-error never `selectors`.
    extendedFilter(state.language, commas(query.value)).length > 0
  )
}

/**
 * @param {RulePseudo} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function lastChild(query, _1, _2, _3, state) {
  assertDeep(state, query)
  return Boolean(
    state.elementCount && state.elementIndex === state.elementCount - 1
  )
}

/**
 * @param {RulePseudo} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function onlyChild(query, _1, _2, _3, state) {
  assertDeep(state, query)
  return state.elementCount === 1
}

/**
 * @param {RulePseudoNth} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthChild(query, _1, _2, _3, state) {
  assertDeep(state, query)
  return (
    typeof state.elementIndex === 'number' && query.value(state.elementIndex)
  )
}

/**
 * @param {RulePseudoNth} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthLastChild(query, _1, _2, _3, state) {
  assertDeep(state, query)
  return Boolean(
    typeof state.elementCount === 'number' &&
      typeof state.elementIndex === 'number' &&
      query.value(state.elementCount - state.elementIndex - 1)
  )
}

/**
 * @param {RulePseudoNth} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthOfType(query, _1, _2, _3, state) {
  assertDeep(state, query)
  return typeof state.typeIndex === 'number' && query.value(state.typeIndex)
}

/**
 * @param {RulePseudoNth} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthLastOfType(query, _1, _2, _3, state) {
  assertDeep(state, query)
  return (
    typeof state.typeCount === 'number' &&
    typeof state.typeIndex === 'number' &&
    query.value(state.typeCount - 1 - state.typeIndex)
  )
}

/**
 * @param {RulePseudo} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function firstOfType(query, _1, _2, _3, state) {
  assertDeep(state, query)
  return state.typeIndex === 0
}

/**
 * @param {RulePseudo} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function lastOfType(query, _1, _2, _3, state) {
  assertDeep(state, query)
  return (
    typeof state.typeIndex === 'number' &&
    typeof state.typeCount === 'number' &&
    state.typeIndex === state.typeCount - 1
  )
}

/**
 * @param {RulePseudo} query
 * @param {Element} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function onlyOfType(query, _1, _2, _3, state) {
  assertDeep(state, query)
  return state.typeCount === 1
}

/**
 * @param {Element} element
 * @param {(child: ElementChild) => boolean} check
 * @returns {boolean}
 */
function someChildren(element, check) {
  const children = element.children
  let index = -1

  while (++index < children.length) {
    if (check(children[index])) return true
  }

  return false
}

// Shouldn’t be called, parser gives correct data.
/* c8 ignore next 3 */
function invalidPseudo() {
  throw new Error('Invalid pseudo-selector')
}

/**
 * @param {RulePseudo} query
 */
function unknownPseudo(query) {
  if (query.name) {
    throw new Error('Unknown pseudo-selector `' + query.name + '`')
  }

  throw new Error('Unexpected pseudo-element or empty pseudo-class')
}

/**
 * @param {SelectState} state
 * @param {RulePseudo|RulePseudoNth} query
 */
function assertDeep(state, query) {
  if (state.shallow) {
    throw new Error('Cannot use `:' + query.name + '` without parent')
  }
}

/**
 * @param {RulePseudoSelector} query
 * @param {Element} element
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function has(query, element, _2, _3, state) {
  const shallow = state.shallow
  const one = state.one
  const scopeElements = state.scopeElements
  const value = appendScope(query.value)

  state.shallow = false
  state.one = true
  state.scopeElements = [element]

  const result = any(value, element, state).length > 0

  state.shallow = shallow
  state.one = one
  state.scopeElements = scopeElements

  return result
}

/**
 * @param {Selector} value
 * @returns {Selectors}
 */
function appendScope(value) {
  /** @type {Selectors} */
  const selector =
    value.type === 'ruleSet' ? {type: 'selectors', selectors: [value]} : value
  let index = -1

  while (++index < selector.selectors.length) {
    const rule = selector.selectors[index].rule
    rule.nestingOperator = null

    if (
      !rule.pseudos ||
      rule.pseudos.length !== 1 ||
      rule.pseudos[0].name !== 'scope'
    ) {
      selector.selectors[index] = {
        type: 'ruleSet',
        // @ts-expect-error pseudos are fine w/ just a name!
        rule: {type: 'rule', rule, pseudos: [{name: 'scope'}]}
      }
    }
  }

  return selector
}
