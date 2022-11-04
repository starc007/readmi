import copyTextToClipboard from '@uiw/copy-to-clipboard';
import { useCallback, useEffect } from 'react';
export function useCopied(container) {
  var handle = useCallback(event => {
    var target = event.currentTarget || event.target;
    target.classList.add('active');
    copyTextToClipboard(target.dataset.code, function () {
      setTimeout(() => {
        target.classList.remove('active');
      }, 2000);
    });
  }, []);
  useEffect(() => {
    var _container$current;
    var btns = (_container$current = container.current) == null ? void 0 : _container$current.querySelectorAll('pre code + div.copied');
    btns && Array.from(btns).forEach(elm => elm.addEventListener('click', handle, false));
    return () => {
      btns && Array.from(btns).forEach(elm => elm.removeEventListener('click', handle, false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);
}
//# sourceMappingURL=useCopied.js.map