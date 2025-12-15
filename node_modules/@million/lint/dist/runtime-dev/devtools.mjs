var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// runtime/src/devtools.ts
var require_devtools = __commonJS({
  "runtime/src/devtools.ts"() {
    (function() {
      try {
        var n = () => {
        };
        var m = /* @__PURE__ */ new Map();
        var i = 0;
        if (typeof window !== "undefined" && !("_ANYA_SIGKILL_" in window) && !window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
            checkDCE: n,
            supportsFiber: true,
            supportsFlight: true,
            hasUnsupportedRendererAttached: false,
            renderers: m,
            onScheduleFiberRoot: n,
            onCommitFiberRoot: n,
            onCommitFiberUnmount: n,
            inject(r) {
              var x = ++i;
              m.set(x, r);
              return x;
            }
          };
        }
      } catch (_) {
      }
    })();
  }
});
var devtools = require_devtools();

export { devtools as default };
