import { Plugin } from 'unified';
import { Root, Element, Comment, Properties, Literal } from 'hast';
import { visit } from 'unist-util-visit';
import { propertiesHandle, nextChild, prevChild, getCommentObject } from './utils';

export type RehypeAttrsOptions = {
  /**
   * ## `data`
   * 
   * ```markdown
   * text
   * <!--rehype:title=Rehype Attrs&abc=2-->
   * ```
   * 
   * ⇣⇣⇣⇣⇣⇣
   * 
   * ```html
   * <p data-config="data-config='[object Object]'">text</p>
   * ```
   * 
   * ## `string`
   * 
   * ```markdown
   * text
   * <!--rehype:title=Rehype Attrs-->
   * ```
   * 
   * ⇣⇣⇣⇣⇣⇣
   * 
   * ```html
   * <p data-config="{&#x22;title&#x22;:&#x22;Rehype Attrs&#x22;,&#x22;rehyp&#x22;:true}">text</p>
   * ```
   * 
   * ## attr
   * 
   * ```markdown
   * text
   * <!--rehype:title=Rehype Attrs-->
   * ```
   * ⇣⇣⇣⇣⇣⇣
   * ```html
   * <p title="Rehype Attrs">text</p>
   * ```
   */
  properties: 'data' | 'string' | 'attr';
}

const defaultOptions: RehypeAttrsOptions = {
  properties: 'data',
}

const rehypeAttrs: Plugin<[RehypeAttrsOptions?], Root> = (options) => {
  const opts = { ...defaultOptions, ...options }
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'pre' && node && Array.isArray(node.children) && parent && Array.isArray(parent.children) && parent.children.length > 1) {
        const firstChild = node.children[0] as Element;
        if (firstChild && firstChild.tagName === 'code' && typeof index === 'number') {
          const child = prevChild(parent.children as Literal[], index);
          if (child) {
            const attr = getCommentObject(child);
            if (Object.keys(attr).length > 0) {
              node.properties = { ...node.properties, ...{ 'data-type': 'rehyp' } }
              firstChild.properties = propertiesHandle(firstChild.properties, attr, opts.properties) as Properties
            }
          }
        }
      }

      if (/^(em|strong|b|a|i|p|pre|kbd|blockquote|h(1|2|3|4|5|6)|code|table|img|del|ul|ol)$/.test(node.tagName) && parent && Array.isArray(parent.children) && typeof index === 'number') {
        const child = nextChild(parent.children, index)
        if (child) {
          const attr = getCommentObject(child as Comment)
          if (Object.keys(attr).length > 0) {
            node.properties = propertiesHandle(node.properties, attr, opts.properties) as Properties
          }
        }
      }
    });
  }
}


export default rehypeAttrs
