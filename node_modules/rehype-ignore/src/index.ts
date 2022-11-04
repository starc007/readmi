import { Plugin } from 'unified';
import { Root, RootContent } from 'hast';
import { visit } from 'unist-util-visit';

export type RehypeIgnoreOptions = {
  /**
   *  Character to use for opening delimiter, by default `rehype:ignore:start`
   */
  openDelimiter?: string;
  /**
   * Character to use for closing delimiter, by default `rehype:ignore:end`
   */
  closeDelimiter?: string;
}

const rehypeIgnore: Plugin<[RehypeIgnoreOptions?], Root> = (options = {}) => {
  const { openDelimiter = 'rehype:ignore:start', closeDelimiter = 'rehype:ignore:end' } = options;
  return (tree) => {
    visit(tree, (node: Root | RootContent, index, parent) => {
      if (node.type === 'element' || node.type === 'root') {
        // const start = node.children.findIndex((item) => item.type === 'comment' && item.value === openDelimiter);
        // const end = node.children.findIndex((item) => item.type === 'comment' && item.value === closeDelimiter);
        // if (start > -1 && end > -1) {
        //   node.children = node.children.filter((_, idx) => idx < start || idx > end);
        // }
        let start = false;
        node.children = node.children.filter((item) => {
          if (item.type === 'raw' || item.type === 'comment') {
            let str =  item.value?.trim();
            str = str.replace(/^<!--(.*?)-->/, '$1')
            if (str === openDelimiter) {
                start = true;
                return false;
            }
            if (str === closeDelimiter) {
                start = false;
                return false;
            }
          }
          
          return !start;
        })
      }
    });
  }
}

export default rehypeIgnore;
