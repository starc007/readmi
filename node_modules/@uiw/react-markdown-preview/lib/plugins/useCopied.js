"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCopied = useCopied;
var _copyToClipboard = _interopRequireDefault(require("@uiw/copy-to-clipboard"));
var _react = require("react");
function useCopied(container) {
  var handle = (0, _react.useCallback)(function (event) {
    var target = event.currentTarget || event.target;
    target.classList.add('active');
    (0, _copyToClipboard.default)(target.dataset.code, function () {
      setTimeout(function () {
        target.classList.remove('active');
      }, 2000);
    });
  }, []);
  (0, _react.useEffect)(function () {
    var _container$current;
    var btns = (_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.querySelectorAll('pre code + div.copied');
    btns && Array.from(btns).forEach(function (elm) {
      return elm.addEventListener('click', handle, false);
    });
    return function () {
      btns && Array.from(btns).forEach(function (elm) {
        return elm.removeEventListener('click', handle, false);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);
}
//# sourceMappingURL=useCopied.js.map