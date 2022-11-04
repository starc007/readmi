"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reservedMeta = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _unistUtilVisit = require("unist-util-visit");
var reservedMeta = function reservedMeta() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (tree) {
    (0, _unistUtilVisit.visit)(tree, function (node) {
      if (node.type === 'element' && node.tagName === 'code' && node.data && node.data.meta) {
        node.properties = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, node.properties), {}, {
          'data-meta': String(node.data.meta)
        });
      }
    });
  };
};
exports.reservedMeta = reservedMeta;
//# sourceMappingURL=reservedMeta.js.map