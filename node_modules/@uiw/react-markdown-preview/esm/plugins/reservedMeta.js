import _extends from "@babel/runtime/helpers/extends";
import { visit } from 'unist-util-visit';
export var reservedMeta = function reservedMeta(options) {
  if (options === void 0) {
    options = {};
  }
  return tree => {
    visit(tree, node => {
      if (node.type === 'element' && node.tagName === 'code' && node.data && node.data.meta) {
        node.properties = _extends({}, node.properties, {
          'data-meta': String(node.data.meta)
        });
      }
    });
  };
};
//# sourceMappingURL=reservedMeta.js.map