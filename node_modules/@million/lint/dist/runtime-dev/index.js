'use strict';

var React8 = require('react');
var socket_ioClient = require('socket.io-client');
require('@million/lint/devtools');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React8__namespace = /*#__PURE__*/_interopNamespace(React8);

var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var _null, isRSC, isSSR, useIsomorphicLayoutEffect, _window, SIGKILL, kill, isTest, _document, _addEventListener, _Map, _WeakMap, _WeakSet, _Set, _Object, _Array, _isArray, _setTimeout, _performance, NO_OP, mapProto, _mapHas, _mapGet, _mapSet, _mapDelete, weakMapProto, _weakMapHas, _weakMapSet, _weakMapGet, _weakMapDelete, weakSetProto, setProto, _setHas, _setAdd, objectPrototype, _objectHasOwnProperty, _objectToString, VERSION, PAYLOAD_VERSION, FLAG, WRAPPER_FLAG, MAX_QUEUE_SIZE, FLUSH_TIMEOUT, SESSION_EXPIRE_TIMEOUT, GZIP_MIN_LEN, GZIP_MAX_LEN, MAX_PENDING_REQUESTS, FLOAT_MAX_LEN, ELEMENT_SYMBOL_STRING, FRAGMENT_SYMBOL_STRING, PORTAL_SYMBOL_STRING, PROFILER_SYMBOL_STRING, FORWARD_REF_SYMBOL_STRING, STRICT_MODE_SYMBOL_STRING, SUSPENSE_SYMBOL_STRING, SUSPENSE_LIST_SYMBOL_STRING, PROFILER_DISPLAY_NAME;
var init_constants = __esm({
  "runtime/src/core/utils/constants.ts"() {
    _null = null;
    isRSC = !React8__namespace.useRef;
    isSSR = typeof window === "undefined" || isRSC;
    useIsomorphicLayoutEffect = isSSR ? React8__namespace.useEffect : React8__namespace.useLayoutEffect;
    _window = isSSR ? _null : window;
    SIGKILL = _window && _window._ANYA_SIGKILL_;
    kill = () => SIGKILL = 1;
    isTest = _window && /**
     * @see https://docs.cypress.io/faq/questions/using-cypress-faq#Is-there-any-way-to-detect-if-my-app-is-running-under-Cypress
     */
    (_window.Cypress || /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/webdriver
     */
    navigator.webdriver) || /**
     * @see https://stackoverflow.com/a/60491322
     */
    // @ts-expect-error jest is a global in test
    typeof jest !== "undefined";
    _document = isSSR ? _null : document;
    _addEventListener = isSSR ? _null : addEventListener;
    _Map = Map;
    _WeakMap = WeakMap;
    _WeakSet = WeakSet;
    _Set = Set;
    _Object = Object;
    _Array = Array;
    _isArray = _Array.isArray;
    _setTimeout = setTimeout;
    _performance = isSSR ? _null : performance;
    NO_OP = () => {
    };
    mapProto = _Map.prototype;
    _mapHas = mapProto.has;
    _mapGet = mapProto.get;
    _mapSet = mapProto.set;
    _mapDelete = mapProto.delete;
    weakMapProto = _WeakMap.prototype;
    _weakMapHas = weakMapProto.has;
    _weakMapSet = weakMapProto.set;
    _weakMapGet = weakMapProto.get;
    _weakMapDelete = weakMapProto.delete;
    weakSetProto = _WeakSet.prototype;
    weakSetProto.has;
    weakSetProto.add;
    weakSetProto.delete;
    setProto = _Set.prototype;
    _setHas = setProto.has;
    _setAdd = setProto.add;
    objectPrototype = _Object.prototype;
    _objectHasOwnProperty = objectPrototype.hasOwnProperty;
    _objectToString = objectPrototype.toString;
    VERSION = "1.0.14";
    PAYLOAD_VERSION = Number("0");
    FLAG = "_ANYA_";
    WRAPPER_FLAG = FLAG + "w";
    MAX_QUEUE_SIZE = 300;
    FLUSH_TIMEOUT = isTest ? 100 : 1e3;
    SESSION_EXPIRE_TIMEOUT = 3e5;
    GZIP_MIN_LEN = 1e3;
    GZIP_MAX_LEN = 6e4;
    MAX_PENDING_REQUESTS = 15;
    FLOAT_MAX_LEN = 1e3;
    ELEMENT_SYMBOL_STRING = "Symbol(react.element)";
    FRAGMENT_SYMBOL_STRING = "Symbol(react.fragment)";
    PORTAL_SYMBOL_STRING = "Symbol(react.portal)";
    PROFILER_SYMBOL_STRING = "Symbol(react.profiler)";
    FORWARD_REF_SYMBOL_STRING = "Symbol(react.forward_ref)";
    STRICT_MODE_SYMBOL_STRING = "Symbol(react.strict_mode)";
    SUSPENSE_SYMBOL_STRING = "Symbol(react.suspense)";
    SUSPENSE_LIST_SYMBOL_STRING = "Symbol(react.suspense_list)";
    PROFILER_DISPLAY_NAME = "Million(Profiler)";
  }
});
var debounce, onIdle, doubleRAF, onHidden, generateId, getRenderItemCacheKey, _id, useId;
var init_utils = __esm({
  "runtime/src/core/utils/utils.ts"() {
    init_constants();
    debounce = (callback, timeout = 1e3) => {
      let timeoutId;
      return function() {
        if (timeoutId !== void 0) {
          clearTimeout(timeoutId);
        }
        timeoutId = _setTimeout(() => {
          callback.apply(this, arguments);
          timeoutId = void 0;
        }, timeout);
      };
    };
    onIdle = (callback) => {
      if ("scheduler" in globalThis) {
        return globalThis.scheduler.postTask(callback, {
          priority: "background"
        });
      }
      if ("requestIdleCallback" in _window) {
        return requestIdleCallback(callback);
      }
      return _setTimeout(callback, 0);
    };
    doubleRAF = (callback) => {
      return requestAnimationFrame(() => {
        requestAnimationFrame(callback);
      });
    };
    onHidden = (callback) => {
      let handler = (event) => {
        if (event.type === "pagehide" || _document.visibilityState === "hidden") {
          callback();
        }
      };
      _addEventListener("visibilitychange", handler, true);
      _addEventListener("pagehide", handler, true);
      _addEventListener("prerenderingchange", handler, true);
    };
    generateId = () => {
      let alphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
      let id = "";
      let randomValues = crypto.getRandomValues(new Uint8Array(21));
      for (let i3 = 0; i3 < 21; i3++) {
        id += alphabet[63 & randomValues[i3]];
      }
      return id;
    };
    getRenderItemCacheKey = (key, kind, loc, owner, error, eventId, instanceIndex, triggerKey) => {
      return (
        // eslint-disable-next-line prefer-template
        key + "." + kind + "." + loc + (owner || "") + (error || "") + (eventId || "") + (instanceIndex || "") + (triggerKey || "")
      );
    };
    _id = 0;
    useId = () => React8__namespace.useState(() => "" + _id++)[0];
  }
});

// runtime/src/core/session.ts
var getGpuRenderer, getSession;
var init_session = __esm({
  "runtime/src/core/session.ts"() {
    init_constants();
    init_utils();
    getGpuRenderer = () => {
      if (!("chrome" in _window))
        return "";
      let gl = _document.createElement("canvas").getContext("webgl", { powerPreference: "high-performance" });
      if (!gl)
        return "";
      let ext = gl.getExtension("WEBGL_debug_renderer_info");
      return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "";
    };
    getSession = () => {
      if (isSSR)
        return _null;
      let id = generateId();
      let url2 = _window.location.toString();
      let connection = navigator.connection;
      let wifi = connection && connection.effectiveType || _null;
      let cpu = navigator.hardwareConcurrency;
      let mem = navigator.deviceMemory;
      let session2 = {
        id,
        url: url2,
        wifi,
        cpu,
        mem,
        gpu: _null
      };
      onIdle(() => {
        session2.gpu = getGpuRenderer();
      });
      return session2;
    };
  }
});

// runtime/src/core/transport.ts
var CONTENT_TYPE, supportsCompression, compress, transport;
var init_transport = __esm({
  "runtime/src/core/transport.ts"() {
    init_constants();
    CONTENT_TYPE = "application/json";
    supportsCompression = typeof CompressionStream === "function";
    compress = async (payload) => {
      let stream = new Blob([payload], { type: CONTENT_TYPE }).stream().pipeThrough(new CompressionStream("gzip"));
      return new Response(stream).arrayBuffer();
    };
    transport = async (url2, payload, buildId2, apiKey2, commitHash2, pendingRequests2) => {
      let fail = { ok: false };
      if (isSSR)
        return fail;
      let json = JSON.stringify(payload, (key, value) => {
        if (key === "r" && typeof value === "object" && value && typeof value.i !== "string" && value.d) {
          value.i = _null;
        }
        if (typeof value === "number" && parseInt(value) !== value) {
          value = ~~(value * FLOAT_MAX_LEN) / FLOAT_MAX_LEN;
        }
        if (
          // eslint-disable-next-line eqeqeq
          value != _null && value !== false && // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
          key[0] !== "_" || _isArray(value) && value.length
        ) {
          return value;
        }
      });
      let shouldCompress = json.length > GZIP_MIN_LEN;
      let body = shouldCompress && supportsCompression ? await compress(json) : json;
      let headers = {
        "Content-Type": CONTENT_TYPE,
        "Content-Encoding": shouldCompress ? "gzip" : void 0,
        "X-API-KEY": apiKey2,
        "X-BUILD-ID": buildId2,
        "X-COMMIT-HASH": commitHash2
        // "X-SESSION-ID": proxySessionId,
      };
      if (shouldCompress)
        url2 += "?z=1";
      let size = typeof body === "string" ? body.length : body.byteLength;
      return fetch(url2, {
        body,
        method: "POST",
        referrerPolicy: "origin",
        /**
         * Outgoing requests are usually cancelled when navigating to a different page, causing a "TypeError: Failed to
         * fetch" error and sending a "network_error" client-outcome - in Chrome, the request status shows "(cancelled)".
         * The `keepalive` flag keeps outgoing requests alive, even when switching pages. We want this since we're
         * frequently sending events right before the user is switching pages (e.g., when finishing navigation transactions).
         *
         * This is the modern alternative to the navigator.sendBeacon API.
         * @see https://javascript.info/fetch-api#keepalive
         *
         * Gotchas:
         * - `keepalive` isn't supported by Firefox
         * - As per spec (https://fetch.spec.whatwg.org/#http-network-or-cache-fetch):
         *   If the sum of contentLength and inflightKeepaliveBytes is greater than 64 kibibytes, then return a network error.
         *   We will therefore only activate the flag when we're below that limit.
         * - There is also a limit of requests that can be open at the same time, so we also limit this to 15.
         *
         * @see https://github.com/getsentry/sentry-javascript/pull/7553
         */
        keepalive: GZIP_MAX_LEN > size && MAX_PENDING_REQUESTS > pendingRequests2,
        priority: "low",
        mode: (
          /* proxySessionId || */
          "no-cors"
        ),
        headers
      });
    };
  }
});

// runtime/src/core/utils/is-equal.ts
var MAX_RECURSION_DEPTH, _isEqual, isEqual;
var init_is_equal = __esm({
  "runtime/src/core/utils/is-equal.ts"() {
    init_constants();
    MAX_RECURSION_DEPTH = 2;
    _isEqual = (prev, next, shallow, depth) => {
      let isShallowEqual = prev === next;
      if (isShallowEqual)
        return true;
      if (depth > MAX_RECURSION_DEPTH)
        return isShallowEqual;
      if (prev && next && typeof prev === "object" && typeof next === "object") {
        if (prev.constructor !== next.constructor)
          return false;
        let length;
        let i3;
        let keys;
        if (_isArray(prev) && _isArray(next)) {
          length = prev.length;
          if (length !== next.length)
            return false;
          for (i3 = length; i3-- !== 0; ) {
            if (shallow) {
              if (prev[i3] !== next[i3])
                return false;
            } else if (!_isEqual(prev[i3], next[i3], shallow, depth + 1))
              return false;
          }
          return true;
        }
        let it2;
        if (prev instanceof _Map && next instanceof _Map) {
          if (prev.size !== next.size)
            return false;
          it2 = prev.entries();
          while (!(i3 = it2.next()).done)
            if (!next.has(i3.value[0]))
              return false;
          it2 = prev.entries();
          while (!(i3 = it2.next()).done) {
            if (shallow) {
              if (_mapGet.call(next, i3.value[0]) !== i3.value[1])
                return false;
            } else if (!_isEqual(
              i3.value[1],
              _mapGet.call(next, i3.value[0]),
              shallow,
              depth + 1
            ))
              return false;
          }
          return true;
        }
        if (prev instanceof _Set && next instanceof _Set) {
          if (prev.size !== next.size)
            return false;
          it2 = prev.entries();
          while (!(i3 = it2.next()).done) {
            if (!_setHas.call(next, i3.value[0]))
              return false;
          }
          return true;
        }
        if (prev.valueOf !== objectPrototype.valueOf && typeof prev.valueOf === "function" && typeof next.valueOf === "function") {
          return prev.valueOf() === next.valueOf();
        }
        if (prev.toString !== objectPrototype.toString && typeof prev.toString === "function" && typeof next.toString === "function") {
          return prev.toString() === next.toString();
        }
        keys = _Object.keys(prev);
        length = keys.length;
        if (length !== _Object.keys(next).length)
          return false;
        for (i3 = length; i3-- !== 0; ) {
          if (!_objectHasOwnProperty.call(next, keys[i3]))
            return false;
        }
        if (prev instanceof Element)
          return false;
        for (i3 = length; i3-- !== 0; ) {
          if (keys[i3] === "_owner" && prev.$$typeof) {
            continue;
          }
          if (shallow) {
            if (prev[keys[i3]] !== next[keys[i3]])
              return false;
          } else if (!_isEqual(
            prev[keys[i3]],
            next[keys[i3]],
            shallow,
            depth + 1
          ))
            return false;
        }
        return true;
      }
      return prev !== prev && next !== next;
    };
    isEqual = (prev, next, shallow) => {
      try {
        return _isEqual(prev, next, shallow, 0);
      } catch (_3) {
        return false;
      }
    };
  }
});
var traverseFiber, FiberContext; exports.MillionLintProvider = void 0; var currentFiber, setCurrentFiber, useFiber, useNearestChild, PerformedWork, didFiberRender, getTimings, ReactSharedInternals, getFiberDEV, getDispatcherRef, invalidHookErrFunctions, peekIsInComponent, getOwner, truncateString, serialize, types, isElementUnsafeToCapture, setRef, mergeProps, getElementRef, canStabilize, shiftNodesToCurrentTree, getFiberMetadata, createTrackedFiberNodeTree, replaceNodeWithFirstTrackedMountedParent, areFibersEqual, getTrackedSelfTime, computeDirtyComponentTrees;
var init_react_internals = __esm({
  "runtime/src/core/utils/react-internals.ts"() {
    init_core();
    init_constants();
    init_is_equal();
    traverseFiber = (fiber, ascending, selector) => {
      if (!fiber)
        return _null;
      if (selector(fiber) === true)
        return fiber;
      let child = ascending ? fiber.return : fiber.child;
      while (child) {
        let match = traverseFiber(child, ascending, selector);
        if (match)
          return match;
        child = ascending ? _null : child.sibling;
      }
      return _null;
    };
    FiberContext = SIGKILL || isRSC ? _null : React8__namespace.createContext(_null);
    exports.MillionLintProvider = class extends React8__namespace.Component {
      render() {
        if (!FiberContext)
          return this.props.children;
        return React8__namespace.createElement(
          FiberContext.Provider,
          { value: this._reactInternals },
          this.props.children
        );
      }
    };
    currentFiber = _null;
    setCurrentFiber = (fiber) => {
      currentFiber = fiber;
      return fiber;
    };
    useFiber = () => {
      {
        return setCurrentFiber(getFiberDEV());
      }
    };
    useNearestChild = (fiber) => {
      let childRef = React8__namespace.useRef();
      useIsomorphicLayoutEffect(() => {
        if (!fiber)
          return;
        let elementFiber = traverseFiber(
          fiber,
          false,
          (node) => typeof node.type === "string"
        );
        childRef.current = elementFiber && elementFiber.stateNode || _null;
      }, [fiber]);
      return childRef;
    };
    PerformedWork = 1;
    didFiberRender = (fiber) => {
      if (!fiber)
        return true;
      let { alternate } = fiber;
      let prevProps = alternate && alternate.memoizedProps;
      let nextProps = fiber.memoizedProps;
      switch (fiber.tag) {
        case 1:
        case 0:
        case 9:
        case 11:
          let flags = (fiber.flags !== void 0 ? fiber.flags : fiber.effectTag) ?? 0;
          return (flags & PerformedWork) === PerformedWork;
        case 14:
        case 15:
          if (typeof fiber.type.compare === "function") {
            return !fiber.type.compare(prevProps || {}, nextProps || {});
          }
          return !isEqual(prevProps, nextProps, true);
        default:
          if (!alternate)
            return true;
          return prevProps !== nextProps || alternate.memoizedState !== fiber.memoizedState || alternate.ref !== fiber.ref;
      }
    };
    getTimings = (fiber) => {
      let totalTime = fiber && fiber.actualDuration;
      if (totalTime == _null) {
        totalTime = 0;
      } else {
        metadata.a = true;
      }
      let worstCaseTotalTime = fiber && fiber.treeBaseDuration || 0;
      let selfTime = totalTime;
      let child = fiber && fiber.child || _null;
      while (totalTime > 0 && child != _null) {
        selfTime -= child.actualDuration || 0;
        child = child.sibling;
      }
      return {
        /**
         * totalTime
         */
        t: totalTime,
        /**
         * selfTime
         */
        s: selfTime,
        /**
         * memoScore
         */
        $: totalTime / worstCaseTotalTime
      };
    };
    ReactSharedInternals = React8__namespace?.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE || React8__namespace?.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    getFiberDEV = () => {
      return ReactSharedInternals && (ReactSharedInternals.A ? ReactSharedInternals.A.getOwner() : ReactSharedInternals && ReactSharedInternals.ReactCurrentOwner && ReactSharedInternals.ReactCurrentOwner.current) || _null;
    };
    getDispatcherRef = () => {
      return ReactSharedInternals && (ReactSharedInternals.ReactCurrentDispatcher || ReactSharedInternals);
    };
    invalidHookErrFunctions = new _WeakMap();
    peekIsInComponent = (dispatcher) => {
      if (!dispatcher) {
        let ref = getDispatcherRef();
        dispatcher = ref.H || ref.current;
      }
      let hook = dispatcher && dispatcher.useRef;
      if (typeof hook !== "function" || _weakMapHas.call(invalidHookErrFunctions, hook)) {
        return false;
      }
      let str = hook.toString();
      if (str.includes("Error")) {
        _weakMapSet.call(invalidHookErrFunctions, hook, true);
        return false;
      }
      return true;
    };
    getOwner = (fiber) => {
      let curr = fiber && fiber.return;
      while (curr) {
        let type = curr.type;
        if (typeof type === "function" && type[FLAG]) {
          return type[FLAG];
        }
        curr = curr.return;
      }
      return _null;
    };
    truncateString = (value, length) => {
      return value.length > length ? value.slice(0, length) + "\u2026" : value;
    };
    serialize = (value) => {
      switch (typeof value) {
        case "function":
          return truncateString(value.toString(), 20);
        case "string":
          return truncateString(value, 20);
        case "object":
          if (value === _null) {
            return "null";
          }
          if (_Array.isArray(value)) {
            return value.length > 0 ? "[\u2026]" : "[]";
          }
          if (typeof value.$$typeof === "symbol" && String(value.$$typeof) === ELEMENT_SYMBOL_STRING) {
            return (
              // eslint-disable-next-line prefer-template
              "<" + (value.type.displayName || value.type.name || "") + (_Object.keys(value.props).length > 0 ? " \u2026" : "") + ">"
            );
          }
          if (typeof value === "object" && value !== _null && value.constructor === _Object) {
            for (let key in value) {
              if (_objectHasOwnProperty.call(value, key)) {
                return "{\u2026}";
              }
            }
            return "{}";
          }
          let tagString = _objectToString.call(value).slice(8, -1);
          if (tagString === "Object") {
            let proto = _Object.getPrototypeOf(value);
            let constructor = proto && proto.constructor;
            if (typeof constructor === "function") {
              return (constructor.displayName || constructor.name || "") + "{\u2026}";
            }
          }
          return tagString + "{\u2026}";
        default:
          return String(value);
      }
    };
    types = [
      STRICT_MODE_SYMBOL_STRING,
      FRAGMENT_SYMBOL_STRING,
      PROFILER_SYMBOL_STRING,
      SUSPENSE_SYMBOL_STRING,
      SUSPENSE_LIST_SYMBOL_STRING
    ];
    isElementUnsafeToCapture = (element) => {
      if (!element)
        return true;
      let isTypeFn = typeof element.type === "function";
      let isClass = isTypeFn && element.type.prototype?.isReactComponent;
      let isMuiFn = isTypeFn && element.type.muiName;
      let isNextUIFn = isTypeFn && element.type.displayName?.includes("NextUI");
      let isPortal = String(element.$$typeof) === PORTAL_SYMBOL_STRING;
      let isInvalidType = types.includes(String(element.type));
      let isTypeObj = typeof element.type === "object";
      let isMuiObj = isTypeObj && element.type && element.type.muiName;
      let isNextUIObj = isTypeObj && "render" in element.type && typeof element.type.render === "function" && element.type.render.displayName?.includes("NextUI");
      let isReactRouter = element.props && (element.props.Component || element.props.component || element.props.asChild);
      let isNextUIReturn = element.type && (isTypeFn || isTypeObj) && "rendered" in element.type;
      return isClass || isMuiFn || isNextUIFn || isPortal || isInvalidType || isMuiObj || isNextUIObj || isReactRouter || isNextUIReturn;
    };
    setRef = (ref, value) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null && ref !== void 0) {
        ref.current = value;
      }
    };
    mergeProps = (prevProps, nextProps) => {
      let overrideProps = _Object.assign({}, nextProps);
      for (let propName in nextProps) {
        let nextPropValue = nextProps[propName];
        let prevPropValue = prevProps[propName];
        if (propName.startsWith("on")) {
          if (nextPropValue && prevPropValue) {
            overrideProps[propName] = function() {
              prevPropValue.apply(this, arguments);
              nextPropValue.apply(this, arguments);
            };
          } else if (nextPropValue) {
            overrideProps[propName] = nextPropValue;
          }
        } else if (propName === "style") {
          overrideProps[propName] = _Object.assign(
            {},
            prevPropValue,
            nextPropValue
          );
        } else if (propName === "className") {
          overrideProps[propName] = [nextPropValue, prevPropValue].filter(Boolean).join(" ");
        }
      }
      return _Object.assign({}, prevProps, overrideProps);
    };
    getElementRef = (element) => {
      {
        if (!React8__namespace.isValidElement(element))
          return;
        let refPropsDescriptor = _Object.getOwnPropertyDescriptor(
          element.props,
          "ref"
        );
        let getter = refPropsDescriptor && refPropsDescriptor.get;
        let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
        if (mayWarn) {
          return element.ref;
        }
        let refDescriptor = _Object.getOwnPropertyDescriptor(element, "ref");
        getter = refDescriptor && refDescriptor.get;
        mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
        if (mayWarn) {
          return element.props.ref;
        }
      }
      return element.props.ref || element.ref;
    };
    canStabilize = (prevValue, nextValue, change) => {
      return (
        // eslint-disable-next-line eqeqeq
        (change.i ?? change.n) != _null && change.u && isEqual(prevValue, nextValue, false)
      );
    };
    shiftNodesToCurrentTree = (toShift, currentRoot2) => {
      {
        let currentTree = /* @__PURE__ */ new Set();
        traverseFiber(currentRoot2, false, (node) => {
          currentTree.add(node);
        });
        let newNodes = [];
        toShift.forEach((node) => {
          if (!currentTree.has(node)) {
            if (!node.alternate) {
              newNodes.push(node);
              return;
            }
            newNodes.push(node.alternate);
            return;
          }
          newNodes.push(node);
        });
        return newNodes;
      }
    };
    getFiberMetadata = (fiber, metadata2) => _weakMapGet.call(metadata2, fiber) ?? (fiber.alternate ? _weakMapGet.call(metadata2, fiber.alternate) : null);
    createTrackedFiberNodeTree = (rootFiber, subtreeCache, computedTrees, fiberComponentMap2, trackedSelfTimeMap) => {
      {
        let _createTrackedFiberNodeTree = (fiber, ancestor) => {
          let metadata2 = getFiberMetadata(fiber, fiberComponentMap2);
          if (metadata2) {
            metadata2.selfTime = trackedSelfTimeMap.get(fiber) ?? metadata2.selfTime;
          }
          let componentName = fiber?.type?.displayName || // copied directly from "../audit/utils";
          fiber?.type?.name || fiber?.elementType?.displayName || fiber?.elementType?.name || "<unknown>";
          let cacheEntry = _mapGet.call(subtreeCache, fiber);
          if (cacheEntry) {
            _mapDelete.call(computedTrees, cacheEntry[1]);
          }
          let node = cacheEntry?.[0] ?? (metadata2 ? {
            metadata: metadata2,
            name: componentName,
            children: []
          } : null);
          _mapSet.call(subtreeCache, fiber, [node, rootFiber]);
          let parent = metadata2 ? node : ancestor;
          let child = fiber.child;
          while (child !== null) {
            let childNode = _createTrackedFiberNodeTree(child, parent);
            if (childNode && parent && !parent.children.some((child2) => child2 === childNode)) {
              parent.children.push(childNode);
            }
            child = child.sibling;
          }
          return node;
        };
        let existingCacheEntry = _mapGet.call(subtreeCache, rootFiber);
        if (existingCacheEntry) {
          return existingCacheEntry[0];
        }
        let subtree = _createTrackedFiberNodeTree(rootFiber, null);
        _mapSet.call(computedTrees, rootFiber, subtree);
        return subtree;
      }
    };
    replaceNodeWithFirstTrackedMountedParent = (nodes, fiberComponentMap2) => {
      {
        let parentCache = new _Map();
        let newNodes = [];
        for (let i3 = 0, len = nodes.length; i3 < len; i3++) {
          let node = nodes[i3];
          let parentCacheValue = parentCache.get(node);
          if (parentCacheValue) {
            newNodes.push(parentCacheValue);
            continue;
          }
          let firstParent = traverseFiber(node, true, (n3) => {
            return !!getFiberMetadata(n3, fiberComponentMap2) && !areFibersEqual(n3, node);
          });
          let finalNode = firstParent ?? node;
          newNodes.push(finalNode);
          parentCache.set(node, finalNode);
        }
        return newNodes;
      }
    };
    areFibersEqual = (fiberA, fiberB) => fiberA === fiberB || fiberA.alternate === fiberB || fiberB.alternate === fiberA ;
    getTrackedSelfTime = (fiber, fiberComponentMap2, accMap, visited) => {
      {
        const traverse = (node, currentTrackedParent) => {
          if (!node)
            return;
          if (visited.has(node))
            return;
          visited.add(node);
          const isTracked = fiberComponentMap2.has(node);
          const { s: selfTime } = getTimings(node);
          if (isTracked) {
            const existingTime = accMap.get(node) || 0;
            accMap.set(node, existingTime + selfTime);
            currentTrackedParent = node;
          } else if (currentTrackedParent) {
            const existingTime = accMap.get(currentTrackedParent) || 0;
            accMap.set(currentTrackedParent, existingTime + selfTime);
          }
          traverse(node.child, currentTrackedParent);
          traverse(node.sibling, currentTrackedParent);
        };
        traverse(fiber, null);
      }
    };
    computeDirtyComponentTrees = (dirtyNodes2, fiberComponentMap2, currentRoot2) => {
      {
        let reComputedSubtrees = new _Map();
        let subtreeCache = new _Map();
        let deReffedNodes = [];
        for (let i3 = 0, len = dirtyNodes2.length; i3 < len; i3++) {
          let node = dirtyNodes2[i3].deref();
          if (node) {
            deReffedNodes.push(node);
          }
        }
        dirtyNodes2 = [];
        let shifted = shiftNodesToCurrentTree(deReffedNodes, currentRoot2);
        let replaced = replaceNodeWithFirstTrackedMountedParent(
          shifted,
          fiberComponentMap2
        );
        let trackedSelfTimeMap = /* @__PURE__ */ new Map();
        const visitedFibers = /* @__PURE__ */ new Set();
        replaced.forEach(
          (fiber) => getTrackedSelfTime(
            fiber,
            fiberComponentMap2,
            trackedSelfTimeMap,
            visitedFibers
          )
        );
        replaced.forEach((fiber) => {
          createTrackedFiberNodeTree(
            fiber,
            subtreeCache,
            reComputedSubtrees,
            fiberComponentMap2,
            trackedSelfTimeMap
          );
        });
        let runtimeTreeUpdates = new _Array(
          reComputedSubtrees.size
        );
        let valuesIterator = reComputedSubtrees.values();
        let result = valuesIterator.next();
        for (let i3 = 0; !result.done; i3++) {
          if (result.value) {
            runtimeTreeUpdates[i3] = {
              kind: "update",
              node: result.value,
              nodesUpdated: deReffedNodes.map(
                (node) => (fiberComponentMap2.get(node) || node.alternate && fiberComponentMap2.get(node.alternate))?.renderId
              ).filter((x3) => typeof x3 !== "undefined")
            };
          }
          result = valuesIterator.next();
        }
        return [runtimeTreeUpdates, deReffedNodes];
      }
    };
  }
});

// ../../node_modules/.pnpm/posthog-js@1.189.0/node_modules/posthog-js/dist/module.js
function g(e3, t3, i3) {
  if (D(e3)) {
    if (s && e3.forEach === s)
      e3.forEach(t3, i3);
    else if ("length" in e3 && e3.length === +e3.length) {
      for (var r3 = 0, n3 = e3.length; r3 < n3; r3++)
        if (r3 in e3 && t3.call(i3, e3[r3], r3) === p)
          return;
    }
  }
}
function f(e3, t3, i3) {
  if (!j(e3)) {
    if (D(e3))
      return g(e3, t3, i3);
    if (Q(e3)) {
      for (var s3 of e3.entries())
        if (t3.call(i3, s3[1], s3[0]) === p)
          return;
    } else
      for (var r3 in e3)
        if (O.call(e3, r3) && t3.call(i3, e3[r3], r3) === p)
          return;
  }
}
function b(e3, t3) {
  return -1 !== e3.indexOf(t3);
}
function y(e3) {
  for (var t3 = Object.keys(e3), i3 = t3.length, s3 = new Array(i3); i3--; )
    s3[i3] = [t3[i3], e3[t3[i3]]];
  return s3;
}
function x(e3, t3) {
  return i3 = e3, s3 = (e4) => U(e4) && !z(t3) ? e4.slice(0, t3) : e4, r3 = /* @__PURE__ */ new Set(), function e4(t4, i4) {
    return t4 !== Object(t4) ? s3 ? s3(t4, i4) : t4 : r3.has(t4) ? void 0 : (r3.add(t4), D(t4) ? (n3 = [], g(t4, (t5) => {
      n3.push(e4(t5));
    })) : (n3 = {}, f(t4, (t5, i5) => {
      r3.has(t5) || (n3[i5] = e4(t5, i5));
    })), n3);
    var n3;
  }(i3);
  var i3, s3, r3;
}
function F(e3, t3) {
  for (var i3 = 0; i3 < e3.length; i3++)
    if (t3(e3[i3]))
      return e3[i3];
}
function Z(e3, t3) {
  var i3 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var s3 = Object.getOwnPropertySymbols(e3);
    t3 && (s3 = s3.filter(function(t4) {
      return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
    })), i3.push.apply(i3, s3);
  }
  return i3;
}
function ee(e3) {
  for (var t3 = 1; t3 < arguments.length; t3++) {
    var i3 = null != arguments[t3] ? arguments[t3] : {};
    t3 % 2 ? Z(Object(i3), true).forEach(function(t4) {
      te(e3, t4, i3[t4]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(i3)) : Z(Object(i3)).forEach(function(t4) {
      Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(i3, t4));
    });
  }
  return e3;
}
function te(e3, t3, i3) {
  return t3 in e3 ? Object.defineProperty(e3, t3, { value: i3, enumerable: true, configurable: true, writable: true }) : e3[t3] = i3, e3;
}
function ie(e3, t3) {
  if (null == e3)
    return {};
  var i3, s3, r3 = function(e4, t4) {
    if (null == e4)
      return {};
    var i4, s4, r4 = {}, n4 = Object.keys(e4);
    for (s4 = 0; s4 < n4.length; s4++)
      i4 = n4[s4], t4.indexOf(i4) >= 0 || (r4[i4] = e4[i4]);
    return r4;
  }(e3, t3);
  if (Object.getOwnPropertySymbols) {
    var n3 = Object.getOwnPropertySymbols(e3);
    for (s3 = 0; s3 < n3.length; s3++)
      i3 = n3[s3], t3.indexOf(i3) >= 0 || Object.prototype.propertyIsEnumerable.call(e3, i3) && (r3[i3] = e3[i3]);
  }
  return r3;
}
function et(e3, t3) {
  if (t3) {
    var i3 = function(e4) {
      var t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o;
      if (Ke)
        return Ke;
      if (!t4)
        return "";
      if (["localhost", "127.0.0.1"].includes(e4))
        return "";
      for (var i4 = e4.split("."), s4 = Math.min(i4.length, 8), r3 = "dmn_chk_" + Je(), n3 = new RegExp("(^|;)\\s*" + r3 + "=1"); !Ke && s4--; ) {
        var a3 = i4.slice(s4).join("."), l3 = r3 + "=1;domain=." + a3;
        t4.cookie = l3, n3.test(t4.cookie) && (t4.cookie = l3 + ";expires=" + Xe, Ke = a3);
      }
      return Ke;
    }(e3);
    if (!i3) {
      var s3 = ((e4) => {
        var t4 = e4.match(Ze);
        return t4 ? t4[0] : "";
      })(e3);
      s3 !== i3 && X.info("Warning: cookie subdomain discovery mismatch", s3, i3), i3 = s3;
    }
    return i3 ? "; domain=." + i3 : "";
  }
  return "";
}
function gi(e3) {
  var t3, i3;
  return (null === (t3 = JSON.stringify(e3, (i3 = [], function(e4, t4) {
    if (q(t4)) {
      for (; i3.length > 0 && i3[i3.length - 1] !== this; )
        i3.pop();
      return i3.includes(t4) ? "[Circular]" : (i3.push(t4), t4);
    }
    return t4;
  }))) || void 0 === t3 ? void 0 : t3.length) || 0;
}
function fi(e3) {
  var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 66060288e-1;
  if (e3.size >= t3 && e3.data.length > 1) {
    var i3 = Math.floor(e3.data.length / 2), s3 = e3.data.slice(0, i3), r3 = e3.data.slice(i3);
    return [fi({ size: gi(s3), data: s3, sessionId: e3.sessionId, windowId: e3.windowId }), fi({ size: gi(r3), data: r3, sessionId: e3.sessionId, windowId: e3.windowId })].flatMap((e4) => e4);
  }
  return [e3];
}
function yi(e3) {
  var t3;
  return e3.id === Le || !(null === (t3 = e3.closest) || void 0 === t3 || !t3.call(e3, ".toolbar-global-fade-container"));
}
function wi(e3) {
  return !!e3 && 1 === e3.nodeType;
}
function Si(e3, t3) {
  return !!e3 && !!e3.tagName && e3.tagName.toLowerCase() === t3.toLowerCase();
}
function Ei(e3) {
  return !!e3 && 3 === e3.nodeType;
}
function ki(e3) {
  return !!e3 && 11 === e3.nodeType;
}
function xi(e3) {
  return e3 ? v(e3).split(/\s+/) : [];
}
function Ii(t3) {
  var i3 = null == e ? void 0 : e.location.href;
  return !!(i3 && t3 && t3.some((e3) => i3.match(e3)));
}
function Pi(e3) {
  var t3 = "";
  switch (typeof e3.className) {
    case "string":
      t3 = e3.className;
      break;
    case "object":
      t3 = (e3.className && "baseVal" in e3.className ? e3.className.baseVal : null) || e3.getAttribute("class") || "";
      break;
    default:
      t3 = "";
  }
  return xi(t3);
}
function Fi(e3) {
  return j(e3) ? null : v(e3).split(/(\s+)/).filter((e4) => Ui(e4)).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
}
function Ri(e3) {
  var t3 = "";
  return Ai(e3) && !Oi(e3) && e3.childNodes && e3.childNodes.length && f(e3.childNodes, function(e4) {
    var i3;
    Ei(e4) && e4.textContent && (t3 += null !== (i3 = Fi(e4.textContent)) && void 0 !== i3 ? i3 : "");
  }), v(t3);
}
function Ci(e3) {
  return H(e3.target) ? e3.srcElement || null : null !== (t3 = e3.target) && void 0 !== t3 && t3.shadowRoot ? e3.composedPath()[0] || null : e3.target || null;
  var t3;
}
function $i(e3) {
  var t3 = e3.parentNode;
  return !(!t3 || !wi(t3)) && t3;
}
function Mi(t3, i3) {
  var s3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0, r3 = arguments.length > 3 ? arguments[3] : void 0, n3 = arguments.length > 4 ? arguments[4] : void 0;
  if (!e || !t3 || Si(t3, "html") || !wi(t3))
    return false;
  if (null != s3 && s3.url_allowlist && !Ii(s3.url_allowlist))
    return false;
  if (null != s3 && s3.url_ignorelist && Ii(s3.url_ignorelist))
    return false;
  if (null != s3 && s3.dom_event_allowlist) {
    var o3 = s3.dom_event_allowlist;
    if (o3 && !o3.some((e3) => i3.type === e3))
      return false;
  }
  for (var a3 = false, l3 = [t3], u3 = true, c3 = t3; c3.parentNode && !Si(c3, "body"); )
    if (ki(c3.parentNode))
      l3.push(c3.parentNode.host), c3 = c3.parentNode.host;
    else {
      if (!(u3 = $i(c3)))
        break;
      if (r3 || Ti.indexOf(u3.tagName.toLowerCase()) > -1)
        a3 = true;
      else {
        var d3 = e.getComputedStyle(u3);
        d3 && "pointer" === d3.getPropertyValue("cursor") && (a3 = true);
      }
      l3.push(u3), c3 = u3;
    }
  if (!function(e3, t4) {
    var i4 = null == t4 ? void 0 : t4.element_allowlist;
    if (H(i4))
      return true;
    var s4 = function(e4) {
      if (i4.some((t5) => e4.tagName.toLowerCase() === t5))
        return { v: true };
    };
    for (var r4 of e3) {
      var n4 = s4(r4);
      if ("object" == typeof n4)
        return n4.v;
    }
    return false;
  }(l3, s3))
    return false;
  if (!function(e3, t4) {
    var i4 = null == t4 ? void 0 : t4.css_selector_allowlist;
    if (H(i4))
      return true;
    var s4 = function(e4) {
      if (i4.some((t5) => e4.matches(t5)))
        return { v: true };
    };
    for (var r4 of e3) {
      var n4 = s4(r4);
      if ("object" == typeof n4)
        return n4.v;
    }
    return false;
  }(l3, s3))
    return false;
  var h3 = e.getComputedStyle(t3);
  if (h3 && "pointer" === h3.getPropertyValue("cursor") && "click" === i3.type)
    return true;
  var _3 = t3.tagName.toLowerCase();
  switch (_3) {
    case "html":
      return false;
    case "form":
      return (n3 || ["submit"]).indexOf(i3.type) >= 0;
    case "input":
    case "select":
    case "textarea":
      return (n3 || ["change", "click"]).indexOf(i3.type) >= 0;
    default:
      return a3 ? (n3 || ["click"]).indexOf(i3.type) >= 0 : (n3 || ["click"]).indexOf(i3.type) >= 0 && (Ti.indexOf(_3) > -1 || "true" === t3.getAttribute("contenteditable"));
  }
}
function Ai(e3) {
  for (var t3 = e3; t3.parentNode && !Si(t3, "body"); t3 = t3.parentNode) {
    var i3 = Pi(t3);
    if (b(i3, "ph-sensitive") || b(i3, "ph-no-capture"))
      return false;
  }
  if (b(Pi(e3), "ph-include"))
    return true;
  var s3 = e3.type || "";
  if (U(s3))
    switch (s3.toLowerCase()) {
      case "hidden":
      case "password":
        return false;
    }
  var r3 = e3.name || e3.id || "";
  if (U(r3)) {
    if (/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(r3.replace(/[^a-zA-Z0-9]/g, "")))
      return false;
  }
  return true;
}
function Oi(e3) {
  return !!(Si(e3, "input") && !["button", "checkbox", "submit", "reset"].includes(e3.type) || Si(e3, "select") || Si(e3, "textarea") || "true" === e3.getAttribute("contenteditable"));
}
function Ui(e3) {
  var t3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  if (j(e3))
    return false;
  if (U(e3)) {
    if (e3 = v(e3), (t3 ? Di : Ni).test((e3 || "").replace(/[- ]/g, "")))
      return false;
    if ((t3 ? Bi : Hi).test(e3))
      return false;
  }
  return true;
}
function Wi(e3) {
  var t3 = Ri(e3);
  return Ui(t3 = "".concat(t3, " ").concat(zi(e3)).trim()) ? t3 : "";
}
function zi(e3) {
  var t3 = "";
  return e3 && e3.childNodes && e3.childNodes.length && f(e3.childNodes, function(e4) {
    var i3;
    if (e4 && "span" === (null === (i3 = e4.tagName) || void 0 === i3 ? void 0 : i3.toLowerCase()))
      try {
        var s3 = Ri(e4);
        t3 = "".concat(t3, " ").concat(s3).trim(), e4.childNodes && e4.childNodes.length && (t3 = "".concat(t3, " ").concat(zi(e4)).trim());
      } catch (e5) {
        X.error(e5);
      }
  }), t3;
}
function ji(e3) {
  return function(e4) {
    var t3 = e4.map((e5) => {
      var t4, i3, s3 = "";
      if (e5.tag_name && (s3 += e5.tag_name), e5.attr_class)
        for (var r3 of (e5.attr_class.sort(), e5.attr_class))
          s3 += ".".concat(r3.replace(/"/g, ""));
      var n3 = ee(ee(ee(ee({}, e5.text ? { text: e5.text } : {}), {}, { "nth-child": null !== (t4 = e5.nth_child) && void 0 !== t4 ? t4 : 0, "nth-of-type": null !== (i3 = e5.nth_of_type) && void 0 !== i3 ? i3 : 0 }, e5.href ? { href: e5.href } : {}), e5.attr_id ? { attr_id: e5.attr_id } : {}), e5.attributes), o3 = {};
      return y(n3).sort((e6, t5) => {
        var [i4] = e6, [s4] = t5;
        return i4.localeCompare(s4);
      }).forEach((e6) => {
        var [t5, i4] = e6;
        return o3[Vi(t5.toString())] = Vi(i4.toString());
      }), s3 += ":", s3 += y(n3).map((e6) => {
        var [t5, i4] = e6;
        return "".concat(t5, '="').concat(i4, '"');
      }).join("");
    });
    return t3.join(";");
  }(function(e4) {
    return e4.map((e5) => {
      var t3, i3, s3 = { text: null === (t3 = e5.$el_text) || void 0 === t3 ? void 0 : t3.slice(0, 400), tag_name: e5.tag_name, href: null === (i3 = e5.attr__href) || void 0 === i3 ? void 0 : i3.slice(0, 2048), attr_class: Gi(e5), attr_id: e5.attr__id, nth_child: e5.nth_child, nth_of_type: e5.nth_of_type, attributes: {} };
      return y(e5).filter((e6) => {
        var [t4] = e6;
        return 0 === t4.indexOf("attr__");
      }).forEach((e6) => {
        var [t4, i4] = e6;
        return s3.attributes[t4] = i4;
      }), s3;
    });
  }(e3));
}
function Vi(e3) {
  return e3.replace(/"|\\"/g, '\\"');
}
function Gi(e3) {
  var t3 = e3.attr__class;
  return t3 ? D(t3) ? t3 : xi(t3) : void 0;
}
function es(e3, t3, i3, s3) {
  if (j(e3))
    return e3;
  var r3 = (null == t3 ? void 0 : t3["content-length"]) || function(e4) {
    return new Blob([e4]).size;
  }(e3);
  return U(r3) && (r3 = parseInt(r3)), r3 > i3 ? Qi + " ".concat(s3, " body too large to record (").concat(r3, " bytes)") : e3;
}
function ts(e3, t3) {
  if (j(e3))
    return e3;
  var i3 = e3;
  return Ui(i3, false) || (i3 = Qi + " " + t3 + " body " + Ji), f(Ki, (e4) => {
    var s3, r3;
    null !== (s3 = i3) && void 0 !== s3 && s3.length && -1 !== (null === (r3 = i3) || void 0 === r3 ? void 0 : r3.indexOf(e4)) && (i3 = Qi + " " + t3 + " body " + Ji + " as might contain: " + e4);
  }), i3;
}
function ss(e3, t3, i3, s3) {
  return t3 > i3 && (X.warn("min cannot be greater than max."), t3 = i3), V(e3) ? e3 > i3 ? (s3 && X.warn(s3 + " cannot be  greater than max: " + i3 + ". Using max value instead."), i3) : e3 < t3 ? (s3 && X.warn(s3 + " cannot be less than min: " + t3 + ". Using min value instead."), t3) : e3 : (s3 && X.warn(s3 + " must be a number. Defaulting to max value:" + i3), i3);
}
function Hs(e3, t3) {
  void 0 === t3 && (t3 = {});
  var i3 = Ls(), s3 = e3.length;
  i3.p(e3);
  var r3 = Ds(e3, t3, Bs(t3), 8), n3 = r3.length;
  return qs(r3, t3), Ns(r3, n3 - 8, i3.d()), Ns(r3, n3 - 4, s3), r3;
}
function Us(e3, t3) {
  var i3 = e3.length;
  if ("undefined" != typeof TextEncoder)
    return new TextEncoder().encode(e3);
  for (var s3 = new ns(e3.length + (e3.length >>> 1)), r3 = 0, n3 = function(e4) {
    s3[r3++] = e4;
  }, o3 = 0; o3 < i3; ++o3) {
    if (r3 + 5 > s3.length) {
      var a3 = new ns(r3 + 8 + (i3 - o3 << 1));
      a3.set(s3), s3 = a3;
    }
    var l3 = e3.charCodeAt(o3);
    l3 < 128 || t3 ? n3(l3) : l3 < 2048 ? (n3(192 | l3 >>> 6), n3(128 | 63 & l3)) : l3 > 55295 && l3 < 57344 ? (n3(240 | (l3 = 65536 + (1047552 & l3) | 1023 & e3.charCodeAt(++o3)) >>> 18), n3(128 | l3 >>> 12 & 63), n3(128 | l3 >>> 6 & 63), n3(128 | 63 & l3)) : (n3(224 | l3 >>> 12), n3(128 | l3 >>> 6 & 63), n3(128 | 63 & l3));
  }
  return xs(s3, 0, r3);
}
function Gs(e3) {
  return function(e4, t3) {
    for (var i3 = "", s3 = 0; s3 < e4.length; ) {
      var r3 = e4[s3++];
      r3 < 128 || t3 ? i3 += String.fromCharCode(r3) : r3 < 224 ? i3 += String.fromCharCode((31 & r3) << 6 | 63 & e4[s3++]) : r3 < 240 ? i3 += String.fromCharCode((15 & r3) << 12 | (63 & e4[s3++]) << 6 | 63 & e4[s3++]) : (r3 = ((15 & r3) << 18 | (63 & e4[s3++]) << 12 | (63 & e4[s3++]) << 6 | 63 & e4[s3++]) - 65536, i3 += String.fromCharCode(55296 | r3 >> 10, 56320 | 1023 & r3));
    }
    return i3;
  }(Hs(Us(JSON.stringify(e3))), true);
}
function Qs(e3) {
  return e3.type === mi.Custom && "sessionIdle" === e3.data.tag;
}
function Js(e3, t3) {
  return t3.some((t4) => "regex" === t4.matching && new RegExp(t4.url).test(e3));
}
function vr(e3) {
  var { organization: t3, projectId: i3, prefix: s3, severityAllowList: r3 = ["error"] } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return (n3) => {
    var o3, a3, l3, u3, c3;
    if (!("*" === r3 || r3.includes(n3.level)) || !e3.__loaded)
      return n3;
    n3.tags || (n3.tags = {});
    var d3 = e3.requestRouter.endpointFor("ui", "/project/".concat(e3.config.token, "/person/").concat(e3.get_distinct_id()));
    n3.tags["PostHog Person URL"] = d3, e3.sessionRecordingStarted() && (n3.tags["PostHog Recording URL"] = e3.get_session_replay_url({ withTimestamp: true }));
    var h3 = (null === (o3 = n3.exception) || void 0 === o3 ? void 0 : o3.values) || [];
    h3.map((e4) => {
      e4.stacktrace && (e4.stacktrace.type = "raw");
    });
    var _3 = { $exception_message: (null === (a3 = h3[0]) || void 0 === a3 ? void 0 : a3.value) || n3.message, $exception_type: null === (l3 = h3[0]) || void 0 === l3 ? void 0 : l3.type, $exception_personURL: d3, $exception_level: n3.level, $exception_list: h3, $sentry_event_id: n3.event_id, $sentry_exception: n3.exception, $sentry_exception_message: (null === (u3 = h3[0]) || void 0 === u3 ? void 0 : u3.value) || n3.message, $sentry_exception_type: null === (c3 = h3[0]) || void 0 === c3 ? void 0 : c3.type, $sentry_tags: n3.tags };
    return t3 && i3 && (_3.$sentry_url = (s3 || "https://sentry.io/organizations/") + t3 + "/issues/?project=" + i3 + "&query=" + n3.event_id), e3.exceptions.sendExceptionEvent(_3), n3;
  };
}
function yr(e3, t3) {
  var i3 = e3.config.segment;
  if (!i3)
    return t3();
  !function(e4, t4) {
    var i4 = e4.config.segment;
    if (!i4)
      return t4();
    var s3 = (i5) => {
      var s4 = () => i5.anonymousId() || Je();
      e4.config.get_device_id = s4, i5.id() && (e4.register({ distinct_id: i5.id(), $device_id: s4() }), e4.persistence.set_property(Re, "identified")), t4();
    }, r3 = i4.user();
    "then" in r3 && N(r3.then) ? r3.then((e5) => s3(e5)) : s3(r3);
  }(e3, () => {
    i3.register(((e4) => {
      Promise && Promise.resolve || X.warn("This browser does not have Promise support, and can not use the segment integration");
      var t4 = (t5, i4) => {
        var s3;
        if (!i4)
          return t5;
        t5.event.userId || t5.event.anonymousId === e4.get_distinct_id() || (X.info("Segment integration does not have a userId set, resetting PostHog"), e4.reset()), t5.event.userId && t5.event.userId !== e4.get_distinct_id() && (X.info("Segment integration has a userId set, identifying with PostHog"), e4.identify(t5.event.userId));
        var r3 = e4._calculate_event_properties(i4, null !== (s3 = t5.event.properties) && void 0 !== s3 ? s3 : {}, /* @__PURE__ */ new Date());
        return t5.event.properties = Object.assign({}, r3, t5.event.properties), t5;
      };
      return { name: "PostHog JS", type: "enrichment", version: "1.0.0", isLoaded: () => true, load: () => Promise.resolve(), track: (e5) => t4(e5, e5.event.event), page: (e5) => t4(e5, "$pageview"), identify: (e5) => t4(e5, "$identify"), screen: (e5) => t4(e5, "$screen") };
    })(e3)).then(() => {
      t3();
    });
  });
}
function Dr(e3, t3) {
  for (var i3 in t3)
    e3[i3] = t3[i3];
  return e3;
}
function Nr(e3) {
  var t3 = e3.parentNode;
  t3 && t3.removeChild(e3);
}
function qr(e3, t3, i3, s3, r3) {
  var n3 = { type: e3, props: t3, key: i3, ref: s3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r3 ? ++Pr : r3, __i: -1, __u: 0 };
  return null == r3 && null != Ir.vnode && Ir.vnode(n3), n3;
}
function Br(e3) {
  return e3.children;
}
function Hr(e3, t3) {
  this.props = e3, this.context = t3;
}
function Ur(e3, t3) {
  if (null == t3)
    return e3.__ ? Ur(e3.__, e3.__i + 1) : null;
  for (var i3; t3 < e3.__k.length; t3++)
    if (null != (i3 = e3.__k[t3]) && null != i3.__e)
      return i3.__e;
  return "function" == typeof e3.type ? Ur(e3) : null;
}
function Wr(e3) {
  var t3, i3;
  if (null != (e3 = e3.__) && null != e3.__c) {
    for (e3.__e = e3.__c.base = null, t3 = 0; t3 < e3.__k.length; t3++)
      if (null != (i3 = e3.__k[t3]) && null != i3.__e) {
        e3.__e = e3.__c.base = i3.__e;
        break;
      }
    return Wr(e3);
  }
}
function zr(e3) {
  (!e3.__d && (e3.__d = true) && Fr.push(e3) && !jr.__r++ || Rr !== Ir.debounceRendering) && ((Rr = Ir.debounceRendering) || Cr)(jr);
}
function jr() {
  var e3, t3, i3, s3, r3, n3, o3, a3, l3;
  for (Fr.sort(Tr); e3 = Fr.shift(); )
    e3.__d && (t3 = Fr.length, s3 = void 0, n3 = (r3 = (i3 = e3).__v).__e, a3 = [], l3 = [], (o3 = i3.__P) && ((s3 = Dr({}, r3)).__v = r3.__v + 1, Ir.vnode && Ir.vnode(s3), en(o3, s3, r3, i3.__n, void 0 !== o3.ownerSVGElement, 32 & r3.__u ? [n3] : null, a3, null == n3 ? Ur(r3) : n3, !!(32 & r3.__u), l3), s3.__.__k[s3.__i] = s3, tn(a3, s3, l3), s3.__e != n3 && Wr(s3)), Fr.length > t3 && Fr.sort(Tr));
  jr.__r = 0;
}
function Vr(e3, t3, i3, s3, r3, n3, o3, a3, l3, u3, c3) {
  var d3, h3, _3, p3, v3, g3 = s3 && s3.__k || Ar, f3 = t3.length;
  for (i3.__d = l3, Gr(i3, t3, g3), l3 = i3.__d, d3 = 0; d3 < f3; d3++)
    null != (_3 = i3.__k[d3]) && "boolean" != typeof _3 && "function" != typeof _3 && (h3 = -1 === _3.__i ? Mr : g3[_3.__i] || Mr, _3.__i = d3, en(e3, _3, h3, r3, n3, o3, a3, l3, u3, c3), p3 = _3.__e, _3.ref && h3.ref != _3.ref && (h3.ref && rn(h3.ref, null, _3), c3.push(_3.ref, _3.__c || p3, _3)), null == v3 && null != p3 && (v3 = p3), 65536 & _3.__u || h3.__k === _3.__k ? l3 = Qr(_3, l3, e3) : "function" == typeof _3.type && void 0 !== _3.__d ? l3 = _3.__d : p3 && (l3 = p3.nextSibling), _3.__d = void 0, _3.__u &= -196609);
  i3.__d = l3, i3.__e = v3;
}
function Gr(e3, t3, i3) {
  var s3, r3, n3, o3, a3, l3 = t3.length, u3 = i3.length, c3 = u3, d3 = 0;
  for (e3.__k = [], s3 = 0; s3 < l3; s3++)
    null != (r3 = e3.__k[s3] = null == (r3 = t3[s3]) || "boolean" == typeof r3 || "function" == typeof r3 ? null : "string" == typeof r3 || "number" == typeof r3 || "bigint" == typeof r3 || r3.constructor == String ? qr(null, r3, null, null, r3) : Lr(r3) ? qr(Br, { children: r3 }, null, null, null) : void 0 === r3.constructor && r3.__b > 0 ? qr(r3.type, r3.props, r3.key, r3.ref ? r3.ref : null, r3.__v) : r3) ? (r3.__ = e3, r3.__b = e3.__b + 1, a3 = Jr(r3, i3, o3 = s3 + d3, c3), r3.__i = a3, n3 = null, -1 !== a3 && (c3--, (n3 = i3[a3]) && (n3.__u |= 131072)), null == n3 || null === n3.__v ? (-1 == a3 && d3--, "function" != typeof r3.type && (r3.__u |= 65536)) : a3 !== o3 && (a3 === o3 + 1 ? d3++ : a3 > o3 ? c3 > l3 - o3 ? d3 += a3 - o3 : d3-- : d3 = a3 < o3 && a3 == o3 - 1 ? a3 - o3 : 0, a3 !== s3 + d3 && (r3.__u |= 65536))) : (n3 = i3[s3]) && null == n3.key && n3.__e && (n3.__e == e3.__d && (e3.__d = Ur(n3)), nn(n3, n3, false), i3[s3] = null, c3--);
  if (c3)
    for (s3 = 0; s3 < u3; s3++)
      null != (n3 = i3[s3]) && 0 == (131072 & n3.__u) && (n3.__e == e3.__d && (e3.__d = Ur(n3)), nn(n3, n3));
}
function Qr(e3, t3, i3) {
  var s3, r3;
  if ("function" == typeof e3.type) {
    for (s3 = e3.__k, r3 = 0; s3 && r3 < s3.length; r3++)
      s3[r3] && (s3[r3].__ = e3, t3 = Qr(s3[r3], t3, i3));
    return t3;
  }
  return e3.__e != t3 && (i3.insertBefore(e3.__e, t3 || null), t3 = e3.__e), t3 && t3.nextSibling;
}
function Jr(e3, t3, i3, s3) {
  var r3 = e3.key, n3 = e3.type, o3 = i3 - 1, a3 = i3 + 1, l3 = t3[i3];
  if (null === l3 || l3 && r3 == l3.key && n3 === l3.type)
    return i3;
  if (s3 > (null != l3 && 0 == (131072 & l3.__u) ? 1 : 0))
    for (; o3 >= 0 || a3 < t3.length; ) {
      if (o3 >= 0) {
        if ((l3 = t3[o3]) && 0 == (131072 & l3.__u) && r3 == l3.key && n3 === l3.type)
          return o3;
        o3--;
      }
      if (a3 < t3.length) {
        if ((l3 = t3[a3]) && 0 == (131072 & l3.__u) && r3 == l3.key && n3 === l3.type)
          return a3;
        a3++;
      }
    }
  return -1;
}
function Yr(e3, t3, i3) {
  "-" === t3[0] ? e3.setProperty(t3, null == i3 ? "" : i3) : e3[t3] = null == i3 ? "" : "number" != typeof i3 || Or.test(t3) ? i3 : i3 + "px";
}
function Xr(e3, t3, i3, s3, r3) {
  var n3;
  e:
    if ("style" === t3)
      if ("string" == typeof i3)
        e3.style.cssText = i3;
      else {
        if ("string" == typeof s3 && (e3.style.cssText = s3 = ""), s3)
          for (t3 in s3)
            i3 && t3 in i3 || Yr(e3.style, t3, "");
        if (i3)
          for (t3 in i3)
            s3 && i3[t3] === s3[t3] || Yr(e3.style, t3, i3[t3]);
      }
    else if ("o" === t3[0] && "n" === t3[1])
      n3 = t3 !== (t3 = t3.replace(/(PointerCapture)$|Capture$/, "$1")), t3 = t3.toLowerCase() in e3 ? t3.toLowerCase().slice(2) : t3.slice(2), e3.l || (e3.l = {}), e3.l[t3 + n3] = i3, i3 ? s3 ? i3.u = s3.u : (i3.u = Date.now(), e3.addEventListener(t3, n3 ? Zr : Kr, n3)) : e3.removeEventListener(t3, n3 ? Zr : Kr, n3);
    else {
      if (r3)
        t3 = t3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" !== t3 && "height" !== t3 && "href" !== t3 && "list" !== t3 && "form" !== t3 && "tabIndex" !== t3 && "download" !== t3 && "rowSpan" !== t3 && "colSpan" !== t3 && "role" !== t3 && t3 in e3)
        try {
          e3[t3] = null == i3 ? "" : i3;
          break e;
        } catch (e4) {
        }
      "function" == typeof i3 || (null == i3 || false === i3 && "-" !== t3[4] ? e3.removeAttribute(t3) : e3.setAttribute(t3, i3));
    }
}
function Kr(e3) {
  var t3 = this.l[e3.type + false];
  if (e3.t) {
    if (e3.t <= t3.u)
      return;
  } else
    e3.t = Date.now();
  return t3(Ir.event ? Ir.event(e3) : e3);
}
function Zr(e3) {
  return this.l[e3.type + true](Ir.event ? Ir.event(e3) : e3);
}
function en(e3, t3, i3, s3, r3, n3, o3, a3, l3, u3) {
  var c3, d3, h3, _3, p3, v3, g3, f3, m3, b3, y3, w3, S3, E3, k3, x3 = t3.type;
  if (void 0 !== t3.constructor)
    return null;
  128 & i3.__u && (l3 = !!(32 & i3.__u), n3 = [a3 = t3.__e = i3.__e]), (c3 = Ir.__b) && c3(t3);
  e:
    if ("function" == typeof x3)
      try {
        if (f3 = t3.props, m3 = (c3 = x3.contextType) && s3[c3.__c], b3 = c3 ? m3 ? m3.props.value : c3.__ : s3, i3.__c ? g3 = (d3 = t3.__c = i3.__c).__ = d3.__E : ("prototype" in x3 && x3.prototype.render ? t3.__c = d3 = new x3(f3, b3) : (t3.__c = d3 = new Hr(f3, b3), d3.constructor = x3, d3.render = on), m3 && m3.sub(d3), d3.props = f3, d3.state || (d3.state = {}), d3.context = b3, d3.__n = s3, h3 = d3.__d = true, d3.__h = [], d3._sb = []), null == d3.__s && (d3.__s = d3.state), null != x3.getDerivedStateFromProps && (d3.__s == d3.state && (d3.__s = Dr({}, d3.__s)), Dr(d3.__s, x3.getDerivedStateFromProps(f3, d3.__s))), _3 = d3.props, p3 = d3.state, d3.__v = t3, h3)
          null == x3.getDerivedStateFromProps && null != d3.componentWillMount && d3.componentWillMount(), null != d3.componentDidMount && d3.__h.push(d3.componentDidMount);
        else {
          if (null == x3.getDerivedStateFromProps && f3 !== _3 && null != d3.componentWillReceiveProps && d3.componentWillReceiveProps(f3, b3), !d3.__e && (null != d3.shouldComponentUpdate && false === d3.shouldComponentUpdate(f3, d3.__s, b3) || t3.__v === i3.__v)) {
            for (t3.__v !== i3.__v && (d3.props = f3, d3.state = d3.__s, d3.__d = false), t3.__e = i3.__e, t3.__k = i3.__k, t3.__k.forEach(function(e4) {
              e4 && (e4.__ = t3);
            }), y3 = 0; y3 < d3._sb.length; y3++)
              d3.__h.push(d3._sb[y3]);
            d3._sb = [], d3.__h.length && o3.push(d3);
            break e;
          }
          null != d3.componentWillUpdate && d3.componentWillUpdate(f3, d3.__s, b3), null != d3.componentDidUpdate && d3.__h.push(function() {
            d3.componentDidUpdate(_3, p3, v3);
          });
        }
        if (d3.context = b3, d3.props = f3, d3.__P = e3, d3.__e = false, w3 = Ir.__r, S3 = 0, "prototype" in x3 && x3.prototype.render) {
          for (d3.state = d3.__s, d3.__d = false, w3 && w3(t3), c3 = d3.render(d3.props, d3.state, d3.context), E3 = 0; E3 < d3._sb.length; E3++)
            d3.__h.push(d3._sb[E3]);
          d3._sb = [];
        } else
          do {
            d3.__d = false, w3 && w3(t3), c3 = d3.render(d3.props, d3.state, d3.context), d3.state = d3.__s;
          } while (d3.__d && ++S3 < 25);
        d3.state = d3.__s, null != d3.getChildContext && (s3 = Dr(Dr({}, s3), d3.getChildContext())), h3 || null == d3.getSnapshotBeforeUpdate || (v3 = d3.getSnapshotBeforeUpdate(_3, p3)), Vr(e3, Lr(k3 = null != c3 && c3.type === Br && null == c3.key ? c3.props.children : c3) ? k3 : [k3], t3, i3, s3, r3, n3, o3, a3, l3, u3), d3.base = t3.__e, t3.__u &= -161, d3.__h.length && o3.push(d3), g3 && (d3.__E = d3.__ = null);
      } catch (e4) {
        t3.__v = null, l3 || null != n3 ? (t3.__e = a3, t3.__u |= l3 ? 160 : 32, n3[n3.indexOf(a3)] = null) : (t3.__e = i3.__e, t3.__k = i3.__k), Ir.__e(e4, t3, i3);
      }
    else
      null == n3 && t3.__v === i3.__v ? (t3.__k = i3.__k, t3.__e = i3.__e) : t3.__e = sn(i3.__e, t3, i3, s3, r3, n3, o3, l3, u3);
  (c3 = Ir.diffed) && c3(t3);
}
function tn(e3, t3, i3) {
  t3.__d = void 0;
  for (var s3 = 0; s3 < i3.length; s3++)
    rn(i3[s3], i3[++s3], i3[++s3]);
  Ir.__c && Ir.__c(t3, e3), e3.some(function(t4) {
    try {
      e3 = t4.__h, t4.__h = [], e3.some(function(e4) {
        e4.call(t4);
      });
    } catch (e4) {
      Ir.__e(e4, t4.__v);
    }
  });
}
function sn(e3, t3, i3, s3, r3, n3, o3, a3, l3) {
  var u3, c3, d3, h3, _3, p3, v3, g3 = i3.props, f3 = t3.props, m3 = t3.type;
  if ("svg" === m3 && (r3 = true), null != n3) {
    for (u3 = 0; u3 < n3.length; u3++)
      if ((_3 = n3[u3]) && "setAttribute" in _3 == !!m3 && (m3 ? _3.localName === m3 : 3 === _3.nodeType)) {
        e3 = _3, n3[u3] = null;
        break;
      }
  }
  if (null == e3) {
    if (null === m3)
      return document.createTextNode(f3);
    e3 = r3 ? document.createElementNS("http://www.w3.org/2000/svg", m3) : document.createElement(m3, f3.is && f3), n3 = null, a3 = false;
  }
  if (null === m3)
    g3 === f3 || a3 && e3.data === f3 || (e3.data = f3);
  else {
    if (n3 = n3 && xr.call(e3.childNodes), g3 = i3.props || Mr, !a3 && null != n3)
      for (g3 = {}, u3 = 0; u3 < e3.attributes.length; u3++)
        g3[(_3 = e3.attributes[u3]).name] = _3.value;
    for (u3 in g3)
      _3 = g3[u3], "children" == u3 || ("dangerouslySetInnerHTML" == u3 ? d3 = _3 : "key" === u3 || u3 in f3 || Xr(e3, u3, null, _3, r3));
    for (u3 in f3)
      _3 = f3[u3], "children" == u3 ? h3 = _3 : "dangerouslySetInnerHTML" == u3 ? c3 = _3 : "value" == u3 ? p3 = _3 : "checked" == u3 ? v3 = _3 : "key" === u3 || a3 && "function" != typeof _3 || g3[u3] === _3 || Xr(e3, u3, _3, g3[u3], r3);
    if (c3)
      a3 || d3 && (c3.__html === d3.__html || c3.__html === e3.innerHTML) || (e3.innerHTML = c3.__html), t3.__k = [];
    else if (d3 && (e3.innerHTML = ""), Vr(e3, Lr(h3) ? h3 : [h3], t3, i3, s3, r3 && "foreignObject" !== m3, n3, o3, n3 ? n3[0] : i3.__k && Ur(i3, 0), a3, l3), null != n3)
      for (u3 = n3.length; u3--; )
        null != n3[u3] && Nr(n3[u3]);
    a3 || (u3 = "value", void 0 !== p3 && (p3 !== e3[u3] || "progress" === m3 && !p3 || "option" === m3 && p3 !== g3[u3]) && Xr(e3, u3, p3, g3[u3], false), u3 = "checked", void 0 !== v3 && v3 !== e3[u3] && Xr(e3, u3, v3, g3[u3], false));
  }
  return e3;
}
function rn(e3, t3, i3) {
  try {
    "function" == typeof e3 ? e3(t3) : e3.current = t3;
  } catch (e4) {
    Ir.__e(e4, i3);
  }
}
function nn(e3, t3, i3) {
  var s3, r3;
  if (Ir.unmount && Ir.unmount(e3), (s3 = e3.ref) && (s3.current && s3.current !== e3.__e || rn(s3, null, t3)), null != (s3 = e3.__c)) {
    if (s3.componentWillUnmount)
      try {
        s3.componentWillUnmount();
      } catch (e4) {
        Ir.__e(e4, t3);
      }
    s3.base = s3.__P = null, e3.__c = void 0;
  }
  if (s3 = e3.__k)
    for (r3 = 0; r3 < s3.length; r3++)
      s3[r3] && nn(s3[r3], t3, i3 || "function" != typeof e3.type);
  i3 || null == e3.__e || Nr(e3.__e), e3.__ = e3.__e = e3.__d = void 0;
}
function on(e3, t3, i3) {
  return this.constructor(e3, i3);
}
function En(e3, t3) {
  return t3.length > e3 ? t3.slice(0, e3) + "..." : t3;
}
function kn(e3) {
  if (e3.previousElementSibling)
    return e3.previousElementSibling;
  var t3 = e3;
  do {
    t3 = t3.previousSibling;
  } while (t3 && !wi(t3));
  return t3;
}
function xn(e3, t3, i3, s3) {
  var r3 = e3.tagName.toLowerCase(), n3 = { tag_name: r3 };
  Ti.indexOf(r3) > -1 && !i3 && ("a" === r3.toLowerCase() || "button" === r3.toLowerCase() ? n3.$el_text = En(1024, Wi(e3)) : n3.$el_text = En(1024, Ri(e3)));
  var o3 = Pi(e3);
  o3.length > 0 && (n3.classes = o3.filter(function(e4) {
    return "" !== e4;
  })), f(e3.attributes, function(i4) {
    var r4;
    if ((!Oi(e3) || -1 !== ["name", "id", "class", "aria-label"].indexOf(i4.name)) && ((null == s3 || !s3.includes(i4.name)) && !t3 && Ui(i4.value) && (r4 = i4.name, !U(r4) || "_ngcontent" !== r4.substring(0, 10) && "_nghost" !== r4.substring(0, 7)))) {
      var o4 = i4.value;
      "class" === i4.name && (o4 = xi(o4).join(" ")), n3["attr__" + i4.name] = En(1024, o4);
    }
  });
  for (var a3 = 1, l3 = 1, u3 = e3; u3 = kn(u3); )
    a3++, u3.tagName === e3.tagName && l3++;
  return n3.nth_child = a3, n3.nth_of_type = l3, n3;
}
function In(t3, i3) {
  for (var s3, r3, { e: n3, maskAllElementAttributes: o3, maskAllText: a3, elementAttributeIgnoreList: l3, elementsChainAsString: u3 } = i3, c3 = [t3], d3 = t3; d3.parentNode && !Si(d3, "body"); )
    ki(d3.parentNode) ? (c3.push(d3.parentNode.host), d3 = d3.parentNode.host) : (c3.push(d3.parentNode), d3 = d3.parentNode);
  var h3, _3 = [], p3 = {}, v3 = false, g3 = false;
  if (f(c3, (e3) => {
    var t4 = Ai(e3);
    "a" === e3.tagName.toLowerCase() && (v3 = e3.getAttribute("href"), v3 = t4 && v3 && Ui(v3) && v3), b(Pi(e3), "ph-no-capture") && (g3 = true), _3.push(xn(e3, o3, a3, l3));
    var i4 = function(e4) {
      if (!Ai(e4))
        return {};
      var t5 = {};
      return f(e4.attributes, function(e5) {
        if (e5.name && 0 === e5.name.indexOf("data-ph-capture-attribute")) {
          var i5 = e5.name.replace("data-ph-capture-attribute-", ""), s4 = e5.value;
          i5 && s4 && Ui(s4) && (t5[i5] = s4);
        }
      }), t5;
    }(e3);
    m(p3, i4);
  }), g3)
    return { props: {}, explicitNoCapture: g3 };
  if (a3 || ("a" === t3.tagName.toLowerCase() || "button" === t3.tagName.toLowerCase() ? _3[0].$el_text = Wi(t3) : _3[0].$el_text = Ri(t3)), v3) {
    var y3, w3;
    _3[0].attr__href = v3;
    var S3 = null === (y3 = dt(v3)) || void 0 === y3 ? void 0 : y3.host, E3 = null == e || null === (w3 = e.location) || void 0 === w3 ? void 0 : w3.host;
    S3 && E3 && S3 !== E3 && (h3 = v3);
  }
  return { props: m({ $event_type: n3.type, $ce_version: 1 }, u3 ? { $elements_chain: ji(_3) } : { $elements: _3 }, null !== (s3 = _3[0]) && void 0 !== s3 && s3.$el_text ? { $el_text: null === (r3 = _3[0]) || void 0 === r3 ? void 0 : r3.$el_text } : {}, h3 && "click" === n3.type ? { $external_click_url: h3 } : {}, p3) };
}
var e, t, i, s, r, n, o, a, l, u, c, d, h, _, p, v, m, w, S, E, k, I, P, R, C, T, M, A, O, L, D, N, q, B, H, U, W, z, j, V, G, Q, J, Y, X, K, se, re, ne, oe, ae, le, ue, ce, de, he, _e, pe, ve, ge, fe, me, be, ye, we, Se, Ee, ke, xe, Ie, Pe, Fe, Re, Ce, Te, $e, Me, Ae, Oe, Le, De, Ne, qe, Be, He, Ue, We, ze, je, Ve, Ge, Qe, Je, Ye, Xe, Ke, Ze, tt, it, st, rt, nt, ot, at, lt, ut, ct, dt, ht, _t, pt, vt, gt, ft, mt, bt, yt, wt, St, Et, kt, xt, It, Pt, Ft, Rt, Ct, Tt, $t, Mt, At, Ot, Lt, Dt, Nt, qt, Bt, Ht, Ut, Wt, zt, jt, Vt, Gt, Qt, Jt, Yt, Xt, Kt, Zt, ei, ti, ii, si, ri, ni, oi, ai, li, ui, ci, di, hi, _i, pi, vi, mi, bi, Ti, Li, Di, Ni, qi, Bi, Hi, Qi, Ji, Yi, Xi, Ki, Zi, is, rs, ns, os, as, ls, us, cs, ds, hs, _s, ps, ms, vs, gs, fs, bs, ys, ws, Ss, Es, ks, xs, Is, Ps, Fs, Rs, Cs, Ts, $s, Ms, As, Os, Ls, Ds, Ns, qs, Bs, Ws, zs, js, Vs, Ys, Xs, Ks, Zs, er, tr, ir, sr, rr, nr, or, ar, lr, ur, cr, dr, hr, _r, pr, gr, fr, mr, br, wr, Sr, Er, kr, xr, Ir, Pr, Fr, Rr, Cr, Tr, $r, Mr, Ar, Or, Lr, an, ln, un, cn, dn, hn, _n, pn, vn, gn, fn, mn, bn, yn, wn, Sn, Pn, Fn, Rn, Cn, Tn, $n, Mn, An, On, Ln, Dn, Nn, qn, Bn, Hn, Un, Wn, zn, jn, Vn, Gn, Qn;
var init_module = __esm({
  "../../node_modules/.pnpm/posthog-js@1.189.0/node_modules/posthog-js/dist/module.js"() {
    e = "undefined" != typeof window ? window : void 0;
    t = "undefined" != typeof globalThis ? globalThis : e;
    i = Array.prototype;
    s = i.forEach;
    r = i.indexOf;
    n = null == t ? void 0 : t.navigator;
    o = null == t ? void 0 : t.document;
    a = null == t ? void 0 : t.location;
    l = null == t ? void 0 : t.fetch;
    u = null != t && t.XMLHttpRequest && "withCredentials" in new t.XMLHttpRequest() ? t.XMLHttpRequest : void 0;
    c = null == t ? void 0 : t.AbortController;
    d = null == n ? void 0 : n.userAgent;
    h = null != e ? e : {};
    _ = { DEBUG: false, LIB_VERSION: "1.189.0" };
    p = {};
    v = function(e3) {
      return e3.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
    m = function(e3) {
      for (var t3 = arguments.length, i3 = new Array(t3 > 1 ? t3 - 1 : 0), s3 = 1; s3 < t3; s3++)
        i3[s3 - 1] = arguments[s3];
      return g(i3, function(t4) {
        for (var i4 in t4)
          void 0 !== t4[i4] && (e3[i4] = t4[i4]);
      }), e3;
    };
    w = function(e3) {
      try {
        return e3();
      } catch (e4) {
        return;
      }
    };
    S = function(e3) {
      return function() {
        try {
          for (var t3 = arguments.length, i3 = new Array(t3), s3 = 0; s3 < t3; s3++)
            i3[s3] = arguments[s3];
          return e3.apply(this, i3);
        } catch (e4) {
          X.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), X.critical(e4);
        }
      };
    };
    E = function(e3) {
      var t3 = {};
      return f(e3, function(e4, i3) {
        U(e4) && e4.length > 0 && (t3[i3] = e4);
      }), t3;
    };
    k = function(e3) {
      return e3.replace(/^\$/, "");
    };
    I = function(e3) {
      var t3, i3, s3, r3, n3 = "";
      for (t3 = i3 = 0, s3 = (e3 = (e3 + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, r3 = 0; r3 < s3; r3++) {
        var o3 = e3.charCodeAt(r3), a3 = null;
        o3 < 128 ? i3++ : a3 = o3 > 127 && o3 < 2048 ? String.fromCharCode(o3 >> 6 | 192, 63 & o3 | 128) : String.fromCharCode(o3 >> 12 | 224, o3 >> 6 & 63 | 128, 63 & o3 | 128), z(a3) || (i3 > t3 && (n3 += e3.substring(t3, i3)), n3 += a3, t3 = i3 = r3 + 1);
      }
      return i3 > t3 && (n3 += e3.substring(t3, e3.length)), n3;
    };
    P = function() {
      function t3(e3) {
        return e3 && (e3.preventDefault = t3.preventDefault, e3.stopPropagation = t3.stopPropagation), e3;
      }
      return t3.preventDefault = function() {
        this.returnValue = false;
      }, t3.stopPropagation = function() {
        this.cancelBubble = true;
      }, function(i3, s3, r3, n3, o3) {
        if (i3)
          if (i3.addEventListener && !n3)
            i3.addEventListener(s3, r3, !!o3);
          else {
            var a3 = "on" + s3, l3 = i3[a3];
            i3[a3] = /* @__PURE__ */ function(i4, s4, r4) {
              return function(n4) {
                if (n4 = n4 || t3(null == e ? void 0 : e.event)) {
                  var o4, a4 = true;
                  N(r4) && (o4 = r4(n4));
                  var l4 = s4.call(i4, n4);
                  return false !== o4 && false !== l4 || (a4 = false), a4;
                }
              };
            }(i3, r3, l3);
          }
        else
          X.error("No valid element provided to register_event");
      };
    }();
    C = "$copy_autocapture";
    T = ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"];
    !function(e3) {
      e3.GZipJS = "gzip-js", e3.Base64 = "base64";
    }(R || (R = {}));
    M = Array.isArray;
    A = Object.prototype;
    O = A.hasOwnProperty;
    L = A.toString;
    D = M || function(e3) {
      return "[object Array]" === L.call(e3);
    };
    N = (e3) => "function" == typeof e3;
    q = (e3) => e3 === Object(e3) && !D(e3);
    B = (e3) => {
      if (q(e3)) {
        for (var t3 in e3)
          if (O.call(e3, t3))
            return false;
        return true;
      }
      return false;
    };
    H = (e3) => void 0 === e3;
    U = (e3) => "[object String]" == L.call(e3);
    W = (e3) => U(e3) && 0 === e3.trim().length;
    z = (e3) => null === e3;
    j = (e3) => H(e3) || z(e3);
    V = (e3) => "[object Number]" == L.call(e3);
    G = (e3) => "[object Boolean]" === L.call(e3);
    Q = (e3) => e3 instanceof FormData;
    J = (e3) => b(T, e3);
    Y = "[PostHog.js]";
    X = { _log: function(t3) {
      if (e && (_.DEBUG || h.POSTHOG_DEBUG) && !H(e.console) && e.console) {
        for (var i3 = ("__rrweb_original__" in e.console[t3]) ? e.console[t3].__rrweb_original__ : e.console[t3], s3 = arguments.length, r3 = new Array(s3 > 1 ? s3 - 1 : 0), n3 = 1; n3 < s3; n3++)
          r3[n3 - 1] = arguments[n3];
        i3(Y, ...r3);
      }
    }, info: function() {
      for (var e3 = arguments.length, t3 = new Array(e3), i3 = 0; i3 < e3; i3++)
        t3[i3] = arguments[i3];
      X._log("log", ...t3);
    }, warn: function() {
      for (var e3 = arguments.length, t3 = new Array(e3), i3 = 0; i3 < e3; i3++)
        t3[i3] = arguments[i3];
      X._log("warn", ...t3);
    }, error: function() {
      for (var e3 = arguments.length, t3 = new Array(e3), i3 = 0; i3 < e3; i3++)
        t3[i3] = arguments[i3];
      X._log("error", ...t3);
    }, critical: function() {
      for (var e3 = arguments.length, t3 = new Array(e3), i3 = 0; i3 < e3; i3++)
        t3[i3] = arguments[i3];
      console.error(Y, ...t3);
    }, uninitializedWarning: (e3) => {
      X.error("You must initialize PostHog before calling ".concat(e3));
    } };
    K = (e3, t3, i3) => {
      if (e3.config.disable_external_dependency_loading)
        return X.warn("".concat(t3, " was requested but loading of external scripts is disabled.")), i3("Loading of external scripts is disabled");
      var s3 = () => {
        if (!o)
          return i3("document not found");
        var e4 = o.createElement("script");
        e4.type = "text/javascript", e4.crossOrigin = "anonymous", e4.src = t3, e4.onload = (e5) => i3(void 0, e5), e4.onerror = (e5) => i3(e5);
        var s4, r3 = o.querySelectorAll("body > script");
        r3.length > 0 ? null === (s4 = r3[0].parentNode) || void 0 === s4 || s4.insertBefore(e4, r3[0]) : o.body.appendChild(e4);
      };
      null != o && o.body ? s3() : null == o || o.addEventListener("DOMContentLoaded", s3);
    };
    h.__PosthogExtensions__ = h.__PosthogExtensions__ || {}, h.__PosthogExtensions__.loadExternalDependency = (e3, t3, i3) => {
      var s3 = "/static/".concat(t3, ".js") + "?v=".concat(e3.version);
      if ("toolbar" === t3) {
        var r3 = 3e5, n3 = Math.floor(Date.now() / r3) * r3;
        s3 = "".concat(s3, "&t=").concat(n3);
      }
      var o3 = e3.requestRouter.endpointFor("assets", s3);
      K(e3, o3, i3);
    }, h.__PosthogExtensions__.loadSiteApp = (e3, t3, i3) => {
      var s3 = e3.requestRouter.endpointFor("api", t3);
      K(e3, s3, i3);
    };
    se = "$people_distinct_id";
    re = "__alias";
    ne = "__timers";
    oe = "$autocapture_disabled_server_side";
    ae = "$heatmaps_enabled_server_side";
    le = "$exception_capture_enabled_server_side";
    ue = "$web_vitals_enabled_server_side";
    ce = "$dead_clicks_enabled_server_side";
    de = "$web_vitals_allowed_metrics";
    he = "$session_recording_enabled_server_side";
    _e = "$console_log_recording_enabled_server_side";
    pe = "$session_recording_network_payload_capture";
    ve = "$session_recording_canvas_recording";
    ge = "$replay_sample_rate";
    fe = "$replay_minimum_duration";
    me = "$sesid";
    be = "$session_is_sampled";
    ye = "$session_recording_url_trigger_activated_session";
    we = "$session_recording_event_trigger_activated_session";
    Se = "$enabled_feature_flags";
    Ee = "$early_access_features";
    ke = "$stored_person_properties";
    xe = "$stored_group_properties";
    Ie = "$surveys";
    Pe = "$surveys_activated";
    Fe = "$flag_call_reported";
    Re = "$user_state";
    Ce = "$client_session_props";
    Te = "$capture_rate_limit";
    $e = "$initial_campaign_params";
    Me = "$initial_referrer_info";
    Ae = "$initial_person_info";
    Oe = "$epp";
    Le = "__POSTHOG_TOOLBAR__";
    De = [se, re, "__cmpns", ne, he, ae, me, Se, Re, Ee, xe, ke, Ie, Fe, Ce, Te, $e, Me, Oe];
    Ne = "$active_feature_flags";
    qe = "$override_feature_flags";
    Be = "$feature_flag_payloads";
    He = (e3) => {
      var t3 = {};
      for (var [i3, s3] of y(e3 || {}))
        s3 && (t3[i3] = s3);
      return t3;
    };
    Ue = class {
      constructor(e3) {
        this.instance = e3, this._override_warning = false, this.featureFlagEventHandlers = [], this.reloadFeatureFlagsQueued = false, this.reloadFeatureFlagsInAction = false;
      }
      getFlags() {
        return Object.keys(this.getFlagVariants());
      }
      getFlagVariants() {
        var e3 = this.instance.get_property(Se), t3 = this.instance.get_property(qe);
        if (!t3)
          return e3 || {};
        for (var i3 = m({}, e3), s3 = Object.keys(t3), r3 = 0; r3 < s3.length; r3++)
          i3[s3[r3]] = t3[s3[r3]];
        return this._override_warning || (X.warn(" Overriding feature flags!", { enabledFlags: e3, overriddenFlags: t3, finalFlags: i3 }), this._override_warning = true), i3;
      }
      getFlagPayloads() {
        return this.instance.get_property(Be) || {};
      }
      reloadFeatureFlags() {
        this.reloadFeatureFlagsQueued || (this.reloadFeatureFlagsQueued = true, this._startReloadTimer());
      }
      setAnonymousDistinctId(e3) {
        this.$anon_distinct_id = e3;
      }
      setReloadingPaused(e3) {
        this.reloadFeatureFlagsInAction = e3;
      }
      resetRequestQueue() {
        this.reloadFeatureFlagsQueued = false;
      }
      _startReloadTimer() {
        this.reloadFeatureFlagsQueued && !this.reloadFeatureFlagsInAction && setTimeout(() => {
          !this.reloadFeatureFlagsInAction && this.reloadFeatureFlagsQueued && (this.reloadFeatureFlagsQueued = false, this._reloadFeatureFlagsRequest());
        }, 5);
      }
      _reloadFeatureFlagsRequest() {
        if (!this.instance.config.advanced_disable_feature_flags) {
          this.setReloadingPaused(true);
          var e3 = this.instance.config.token, t3 = this.instance.get_property(ke), i3 = this.instance.get_property(xe), s3 = { token: e3, distinct_id: this.instance.get_distinct_id(), groups: this.instance.getGroups(), $anon_distinct_id: this.$anon_distinct_id, person_properties: t3, group_properties: i3, disable_flags: this.instance.config.advanced_disable_feature_flags || void 0 };
          this.instance._send_request({ method: "POST", url: this.instance.requestRouter.endpointFor("api", "/decide/?v=3"), data: s3, compression: this.instance.config.disable_compression ? void 0 : R.Base64, timeout: this.instance.config.feature_flag_request_timeout_ms, callback: (e4) => {
            var t4;
            this.setReloadingPaused(false);
            var i4 = true;
            200 === e4.statusCode && (this.$anon_distinct_id = void 0, i4 = false), this.receivedFeatureFlags(null !== (t4 = e4.json) && void 0 !== t4 ? t4 : {}, i4), this._startReloadTimer();
          } });
        }
      }
      getFeatureFlag(e3) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (this.instance.decideEndpointWasHit || this.getFlags() && this.getFlags().length > 0) {
          var i3, s3 = this.getFlagVariants()[e3], r3 = "".concat(s3), n3 = this.instance.get_property(Fe) || {};
          if (t3.send_event || !("send_event" in t3)) {
            if (!(e3 in n3) || !n3[e3].includes(r3))
              D(n3[e3]) ? n3[e3].push(r3) : n3[e3] = [r3], null === (i3 = this.instance.persistence) || void 0 === i3 || i3.register({ [Fe]: n3 }), this.instance.capture("$feature_flag_called", { $feature_flag: e3, $feature_flag_response: s3 });
          }
          return s3;
        }
        X.warn('getFeatureFlag for key "' + e3 + `" failed. Feature flags didn't load in time.`);
      }
      getFeatureFlagPayload(e3) {
        return this.getFlagPayloads()[e3];
      }
      isFeatureEnabled(e3) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (this.instance.decideEndpointWasHit || this.getFlags() && this.getFlags().length > 0)
          return !!this.getFeatureFlag(e3, t3);
        X.warn('isFeatureEnabled for key "' + e3 + `" failed. Feature flags didn't load in time.`);
      }
      addFeatureFlagsHandler(e3) {
        this.featureFlagEventHandlers.push(e3);
      }
      removeFeatureFlagsHandler(e3) {
        this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter((t3) => t3 !== e3);
      }
      receivedFeatureFlags(e3, t3) {
        if (this.instance.persistence) {
          this.instance.decideEndpointWasHit = true;
          var i3 = this.getFlagVariants(), s3 = this.getFlagPayloads();
          !function(e4, t4) {
            var i4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, s4 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, r3 = e4.featureFlags, n3 = e4.featureFlagPayloads;
            if (r3)
              if (D(r3)) {
                var o3 = {};
                if (r3)
                  for (var a3 = 0; a3 < r3.length; a3++)
                    o3[r3[a3]] = true;
                t4 && t4.register({ [Ne]: r3, [Se]: o3 });
              } else {
                var l3 = r3, u3 = n3;
                e4.errorsWhileComputingFlags && (l3 = ee(ee({}, i4), l3), u3 = ee(ee({}, s4), u3)), t4 && t4.register({ [Ne]: Object.keys(He(l3)), [Se]: l3 || {}, [Be]: u3 || {} });
              }
          }(e3, this.instance.persistence, i3, s3), this._fireFeatureFlagsCallbacks(t3);
        }
      }
      override(e3) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (!this.instance.__loaded || !this.instance.persistence)
          return X.uninitializedWarning("posthog.feature_flags.override");
        if (this._override_warning = t3, false === e3)
          this.instance.persistence.unregister(qe);
        else if (D(e3)) {
          for (var i3 = {}, s3 = 0; s3 < e3.length; s3++)
            i3[e3[s3]] = true;
          this.instance.persistence.register({ [qe]: i3 });
        } else
          this.instance.persistence.register({ [qe]: e3 });
      }
      onFeatureFlags(e3) {
        if (this.addFeatureFlagsHandler(e3), this.instance.decideEndpointWasHit) {
          var { flags: t3, flagVariants: i3 } = this._prepareFeatureFlagsForCallbacks();
          e3(t3, i3);
        }
        return () => this.removeFeatureFlagsHandler(e3);
      }
      updateEarlyAccessFeatureEnrollment(e3, t3) {
        var i3, s3 = { ["$feature_enrollment/".concat(e3)]: t3 };
        this.instance.capture("$feature_enrollment_update", { $feature_flag: e3, $feature_enrollment: t3, $set: s3 }), this.setPersonPropertiesForFlags(s3, false);
        var r3 = ee(ee({}, this.getFlagVariants()), {}, { [e3]: t3 });
        null === (i3 = this.instance.persistence) || void 0 === i3 || i3.register({ [Ne]: Object.keys(He(r3)), [Se]: r3 }), this._fireFeatureFlagsCallbacks();
      }
      getEarlyAccessFeatures(e3) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i3 = this.instance.get_property(Ee);
        if (i3 && !t3)
          return e3(i3);
        this.instance._send_request({ transport: "XHR", url: this.instance.requestRouter.endpointFor("api", "/api/early_access_features/?token=".concat(this.instance.config.token)), method: "GET", callback: (t4) => {
          var i4;
          if (t4.json) {
            var s3 = t4.json.earlyAccessFeatures;
            return null === (i4 = this.instance.persistence) || void 0 === i4 || i4.register({ [Ee]: s3 }), e3(s3);
          }
        } });
      }
      _prepareFeatureFlagsForCallbacks() {
        var e3 = this.getFlags(), t3 = this.getFlagVariants();
        return { flags: e3.filter((e4) => t3[e4]), flagVariants: Object.keys(t3).filter((e4) => t3[e4]).reduce((e4, i3) => (e4[i3] = t3[i3], e4), {}) };
      }
      _fireFeatureFlagsCallbacks(e3) {
        var { flags: t3, flagVariants: i3 } = this._prepareFeatureFlagsForCallbacks();
        this.featureFlagEventHandlers.forEach((s3) => s3(t3, i3, { errorsLoading: e3 }));
      }
      setPersonPropertiesForFlags(e3) {
        var t3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i3 = this.instance.get_property(ke) || {};
        this.instance.register({ [ke]: ee(ee({}, i3), e3) }), t3 && this.instance.reloadFeatureFlags();
      }
      resetPersonPropertiesForFlags() {
        this.instance.unregister(ke);
      }
      setGroupPropertiesForFlags(e3) {
        var t3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i3 = this.instance.get_property(xe) || {};
        0 !== Object.keys(i3).length && Object.keys(i3).forEach((t4) => {
          i3[t4] = ee(ee({}, i3[t4]), e3[t4]), delete e3[t4];
        }), this.instance.register({ [xe]: ee(ee({}, i3), e3) }), t3 && this.instance.reloadFeatureFlags();
      }
      resetGroupPropertiesForFlags(e3) {
        if (e3) {
          var t3 = this.instance.get_property(xe) || {};
          this.instance.register({ [xe]: ee(ee({}, t3), {}, { [e3]: {} }) });
        } else
          this.instance.unregister(xe);
      }
    };
    Math.trunc || (Math.trunc = function(e3) {
      return e3 < 0 ? Math.ceil(e3) : Math.floor(e3);
    }), Number.isInteger || (Number.isInteger = function(e3) {
      return V(e3) && isFinite(e3) && Math.floor(e3) === e3;
    });
    We = "0123456789abcdef";
    ze = class _ze {
      constructor(e3) {
        if (this.bytes = e3, 16 !== e3.length)
          throw new TypeError("not 128-bit length");
      }
      static fromFieldsV7(e3, t3, i3, s3) {
        if (!Number.isInteger(e3) || !Number.isInteger(t3) || !Number.isInteger(i3) || !Number.isInteger(s3) || e3 < 0 || t3 < 0 || i3 < 0 || s3 < 0 || e3 > 281474976710655 || t3 > 4095 || i3 > 1073741823 || s3 > 4294967295)
          throw new RangeError("invalid field value");
        var r3 = new Uint8Array(16);
        return r3[0] = e3 / Math.pow(2, 40), r3[1] = e3 / Math.pow(2, 32), r3[2] = e3 / Math.pow(2, 24), r3[3] = e3 / Math.pow(2, 16), r3[4] = e3 / Math.pow(2, 8), r3[5] = e3, r3[6] = 112 | t3 >>> 8, r3[7] = t3, r3[8] = 128 | i3 >>> 24, r3[9] = i3 >>> 16, r3[10] = i3 >>> 8, r3[11] = i3, r3[12] = s3 >>> 24, r3[13] = s3 >>> 16, r3[14] = s3 >>> 8, r3[15] = s3, new _ze(r3);
      }
      toString() {
        for (var e3 = "", t3 = 0; t3 < this.bytes.length; t3++)
          e3 = e3 + We.charAt(this.bytes[t3] >>> 4) + We.charAt(15 & this.bytes[t3]), 3 !== t3 && 5 !== t3 && 7 !== t3 && 9 !== t3 || (e3 += "-");
        if (36 !== e3.length)
          throw new Error("Invalid UUIDv7 was generated");
        return e3;
      }
      clone() {
        return new _ze(this.bytes.slice(0));
      }
      equals(e3) {
        return 0 === this.compareTo(e3);
      }
      compareTo(e3) {
        for (var t3 = 0; t3 < 16; t3++) {
          var i3 = this.bytes[t3] - e3.bytes[t3];
          if (0 !== i3)
            return Math.sign(i3);
        }
        return 0;
      }
    };
    je = class {
      constructor() {
        te(this, "timestamp", 0), te(this, "counter", 0), te(this, "random", new Qe());
      }
      generate() {
        var e3 = this.generateOrAbort();
        if (H(e3)) {
          this.timestamp = 0;
          var t3 = this.generateOrAbort();
          if (H(t3))
            throw new Error("Could not generate UUID after timestamp reset");
          return t3;
        }
        return e3;
      }
      generateOrAbort() {
        var e3 = Date.now();
        if (e3 > this.timestamp)
          this.timestamp = e3, this.resetCounter();
        else {
          if (!(e3 + 1e4 > this.timestamp))
            return;
          this.counter++, this.counter > 4398046511103 && (this.timestamp++, this.resetCounter());
        }
        return ze.fromFieldsV7(this.timestamp, Math.trunc(this.counter / Math.pow(2, 30)), this.counter & Math.pow(2, 30) - 1, this.random.nextUint32());
      }
      resetCounter() {
        this.counter = 1024 * this.random.nextUint32() + (1023 & this.random.nextUint32());
      }
    };
    Ge = (e3) => {
      if ("undefined" != typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG)
        throw new Error("no cryptographically strong RNG available");
      for (var t3 = 0; t3 < e3.length; t3++)
        e3[t3] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
      return e3;
    };
    e && !H(e.crypto) && crypto.getRandomValues && (Ge = (e3) => crypto.getRandomValues(e3));
    Qe = class {
      constructor() {
        te(this, "buffer", new Uint32Array(8)), te(this, "cursor", 1 / 0);
      }
      nextUint32() {
        return this.cursor >= this.buffer.length && (Ge(this.buffer), this.cursor = 0), this.buffer[this.cursor++];
      }
    };
    Je = () => Ye().toString();
    Ye = () => (Ve || (Ve = new je())).generate();
    Xe = "Thu, 01 Jan 1970 00:00:00 GMT";
    Ke = "";
    Ze = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;
    tt = { is_supported: () => !!o, error: function(e3) {
      X.error("cookieStore error: " + e3);
    }, get: function(e3) {
      if (o) {
        try {
          for (var t3 = e3 + "=", i3 = o.cookie.split(";").filter((e4) => e4.length), s3 = 0; s3 < i3.length; s3++) {
            for (var r3 = i3[s3]; " " == r3.charAt(0); )
              r3 = r3.substring(1, r3.length);
            if (0 === r3.indexOf(t3))
              return decodeURIComponent(r3.substring(t3.length, r3.length));
          }
        } catch (e4) {
        }
        return null;
      }
    }, parse: function(e3) {
      var t3;
      try {
        t3 = JSON.parse(tt.get(e3)) || {};
      } catch (e4) {
      }
      return t3;
    }, set: function(e3, t3, i3, s3, r3) {
      if (o)
        try {
          var n3 = "", a3 = "", l3 = et(o.location.hostname, s3);
          if (i3) {
            var u3 = /* @__PURE__ */ new Date();
            u3.setTime(u3.getTime() + 24 * i3 * 60 * 60 * 1e3), n3 = "; expires=" + u3.toUTCString();
          }
          r3 && (a3 = "; secure");
          var c3 = e3 + "=" + encodeURIComponent(JSON.stringify(t3)) + n3 + "; SameSite=Lax; path=/" + l3 + a3;
          return c3.length > 3686.4 && X.warn("cookieStore warning: large cookie, len=" + c3.length), o.cookie = c3, c3;
        } catch (e4) {
          return;
        }
    }, remove: function(e3, t3) {
      try {
        tt.set(e3, "", -1, t3);
      } catch (e4) {
        return;
      }
    } };
    it = null;
    st = { is_supported: function() {
      if (!z(it))
        return it;
      var t3 = true;
      if (H(e))
        t3 = false;
      else
        try {
          var i3 = "__mplssupport__";
          st.set(i3, "xyz"), '"xyz"' !== st.get(i3) && (t3 = false), st.remove(i3);
        } catch (e3) {
          t3 = false;
        }
      return t3 || X.error("localStorage unsupported; falling back to cookie store"), it = t3, t3;
    }, error: function(e3) {
      X.error("localStorage error: " + e3);
    }, get: function(t3) {
      try {
        return null == e ? void 0 : e.localStorage.getItem(t3);
      } catch (e3) {
        st.error(e3);
      }
      return null;
    }, parse: function(e3) {
      try {
        return JSON.parse(st.get(e3)) || {};
      } catch (e4) {
      }
      return null;
    }, set: function(t3, i3) {
      try {
        null == e || e.localStorage.setItem(t3, JSON.stringify(i3));
      } catch (e3) {
        st.error(e3);
      }
    }, remove: function(t3) {
      try {
        null == e || e.localStorage.removeItem(t3);
      } catch (e3) {
        st.error(e3);
      }
    } };
    rt = ["distinct_id", me, be, Oe];
    nt = ee(ee({}, st), {}, { parse: function(e3) {
      try {
        var t3 = {};
        try {
          t3 = tt.parse(e3) || {};
        } catch (e4) {
        }
        var i3 = m(t3, JSON.parse(st.get(e3) || "{}"));
        return st.set(e3, i3), i3;
      } catch (e4) {
      }
      return null;
    }, set: function(e3, t3, i3, s3, r3, n3) {
      try {
        st.set(e3, t3, void 0, void 0, n3);
        var o3 = {};
        rt.forEach((e4) => {
          t3[e4] && (o3[e4] = t3[e4]);
        }), Object.keys(o3).length && tt.set(e3, o3, i3, s3, r3, n3);
      } catch (e4) {
        st.error(e4);
      }
    }, remove: function(t3, i3) {
      try {
        null == e || e.localStorage.removeItem(t3), tt.remove(t3, i3);
      } catch (e3) {
        st.error(e3);
      }
    } });
    ot = {};
    at = { is_supported: function() {
      return true;
    }, error: function(e3) {
      X.error("memoryStorage error: " + e3);
    }, get: function(e3) {
      return ot[e3] || null;
    }, parse: function(e3) {
      return ot[e3] || null;
    }, set: function(e3, t3) {
      ot[e3] = t3;
    }, remove: function(e3) {
      delete ot[e3];
    } };
    lt = null;
    ut = { is_supported: function() {
      if (!z(lt))
        return lt;
      if (lt = true, H(e))
        lt = false;
      else
        try {
          var t3 = "__support__";
          ut.set(t3, "xyz"), '"xyz"' !== ut.get(t3) && (lt = false), ut.remove(t3);
        } catch (e3) {
          lt = false;
        }
      return lt;
    }, error: function(e3) {
      X.error("sessionStorage error: ", e3);
    }, get: function(t3) {
      try {
        return null == e ? void 0 : e.sessionStorage.getItem(t3);
      } catch (e3) {
        ut.error(e3);
      }
      return null;
    }, parse: function(e3) {
      try {
        return JSON.parse(ut.get(e3)) || null;
      } catch (e4) {
      }
      return null;
    }, set: function(t3, i3) {
      try {
        null == e || e.sessionStorage.setItem(t3, JSON.stringify(i3));
      } catch (e3) {
        ut.error(e3);
      }
    }, remove: function(t3) {
      try {
        null == e || e.sessionStorage.removeItem(t3);
      } catch (e3) {
        ut.error(e3);
      }
    } };
    ct = ["localhost", "127.0.0.1"];
    dt = (e3) => {
      var t3 = null == o ? void 0 : o.createElement("a");
      return H(t3) ? null : (t3.href = e3, t3);
    };
    ht = function(e3, t3) {
      return !!function(e4) {
        try {
          new RegExp(e4);
        } catch (e5) {
          return false;
        }
        return true;
      }(t3) && new RegExp(t3).test(e3);
    };
    _t = function(e3) {
      var t3, i3, s3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "&", r3 = [];
      return f(e3, function(e4, s4) {
        H(e4) || H(s4) || "undefined" === s4 || (t3 = encodeURIComponent(((e5) => e5 instanceof File)(e4) ? e4.name : e4.toString()), i3 = encodeURIComponent(s4), r3[r3.length] = i3 + "=" + t3);
      }), r3.join(s3);
    };
    pt = function(e3, t3) {
      for (var i3, s3 = ((e3.split("#")[0] || "").split("?")[1] || "").split("&"), r3 = 0; r3 < s3.length; r3++) {
        var n3 = s3[r3].split("=");
        if (n3[0] === t3) {
          i3 = n3;
          break;
        }
      }
      if (!D(i3) || i3.length < 2)
        return "";
      var o3 = i3[1];
      try {
        o3 = decodeURIComponent(o3);
      } catch (e4) {
        X.error("Skipping decoding for malformed query param: " + o3);
      }
      return o3.replace(/\+/g, " ");
    };
    vt = function(e3, t3) {
      var i3 = e3.match(new RegExp(t3 + "=([^&]*)"));
      return i3 ? i3[1] : null;
    };
    gt = "Mobile";
    ft = "iOS";
    mt = "Android";
    bt = "Tablet";
    yt = mt + " " + bt;
    wt = "iPad";
    St = "Apple";
    Et = St + " Watch";
    kt = "Safari";
    xt = "BlackBerry";
    It = "Samsung";
    Pt = It + "Browser";
    Ft = It + " Internet";
    Rt = "Chrome";
    Ct = Rt + " OS";
    Tt = Rt + " " + ft;
    $t = "Internet Explorer";
    Mt = $t + " " + gt;
    At = "Opera";
    Ot = At + " Mini";
    Lt = "Edge";
    Dt = "Microsoft " + Lt;
    Nt = "Firefox";
    qt = Nt + " " + ft;
    Bt = "Nintendo";
    Ht = "PlayStation";
    Ut = "Xbox";
    Wt = mt + " " + gt;
    zt = gt + " " + kt;
    jt = "Windows";
    Vt = jt + " Phone";
    Gt = "Nokia";
    Qt = "Ouya";
    Jt = "Generic";
    Yt = Jt + " " + gt.toLowerCase();
    Xt = Jt + " " + bt.toLowerCase();
    Kt = "Konqueror";
    Zt = "(\\d+(\\.\\d+)?)";
    ei = new RegExp("Version/" + Zt);
    ti = new RegExp(Ut, "i");
    ii = new RegExp(Ht + " \\w+", "i");
    si = new RegExp(Bt + " \\w+", "i");
    ri = new RegExp(xt + "|PlayBook|BB10", "i");
    ni = { "NT3.51": "NT 3.11", "NT4.0": "NT 4.0", "5.0": "2000", 5.1: "XP", 5.2: "XP", "6.0": "Vista", 6.1: "7", 6.2: "8", 6.3: "8.1", 6.4: "10", "10.0": "10" };
    oi = (e3, t3) => t3 && b(t3, St) || function(e4) {
      return b(e4, kt) && !b(e4, Rt) && !b(e4, mt);
    }(e3);
    ai = function(e3, t3) {
      return t3 = t3 || "", b(e3, " OPR/") && b(e3, "Mini") ? Ot : b(e3, " OPR/") ? At : ri.test(e3) ? xt : b(e3, "IE" + gt) || b(e3, "WPDesktop") ? Mt : b(e3, Pt) ? Ft : b(e3, Lt) || b(e3, "Edg/") ? Dt : b(e3, "FBIOS") ? "Facebook " + gt : b(e3, "UCWEB") || b(e3, "UCBrowser") ? "UC Browser" : b(e3, "CriOS") ? Tt : b(e3, "CrMo") ? Rt : b(e3, mt) && b(e3, kt) ? Wt : b(e3, Rt) ? Rt : b(e3, "FxiOS") ? qt : b(e3.toLowerCase(), Kt.toLowerCase()) ? Kt : oi(e3, t3) ? b(e3, gt) ? zt : kt : b(e3, Nt) ? Nt : b(e3, "MSIE") || b(e3, "Trident/") ? $t : b(e3, "Gecko") ? Nt : "";
    };
    li = { [Mt]: [new RegExp("rv:" + Zt)], [Dt]: [new RegExp(Lt + "?\\/" + Zt)], [Rt]: [new RegExp("(" + Rt + "|CrMo)\\/" + Zt)], [Tt]: [new RegExp("CriOS\\/" + Zt)], "UC Browser": [new RegExp("(UCBrowser|UCWEB)\\/" + Zt)], [kt]: [ei], [zt]: [ei], [At]: [new RegExp("(Opera|OPR)\\/" + Zt)], [Nt]: [new RegExp(Nt + "\\/" + Zt)], [qt]: [new RegExp("FxiOS\\/" + Zt)], [Kt]: [new RegExp("Konqueror[:/]?" + Zt, "i")], [xt]: [new RegExp(xt + " " + Zt), ei], [Wt]: [new RegExp("android\\s" + Zt, "i")], [Ft]: [new RegExp(Pt + "\\/" + Zt)], [$t]: [new RegExp("(rv:|MSIE )" + Zt)], Mozilla: [new RegExp("rv:" + Zt)] };
    ui = [[new RegExp(Ut + "; " + Ut + " (.*?)[);]", "i"), (e3) => [Ut, e3 && e3[1] || ""]], [new RegExp(Bt, "i"), [Bt, ""]], [new RegExp(Ht, "i"), [Ht, ""]], [ri, [xt, ""]], [new RegExp(jt, "i"), (e3, t3) => {
      if (/Phone/.test(t3) || /WPDesktop/.test(t3))
        return [Vt, ""];
      if (new RegExp(gt).test(t3) && !/IEMobile\b/.test(t3))
        return [jt + " " + gt, ""];
      var i3 = /Windows NT ([0-9.]+)/i.exec(t3);
      if (i3 && i3[1]) {
        var s3 = i3[1], r3 = ni[s3] || "";
        return /arm/i.test(t3) && (r3 = "RT"), [jt, r3];
      }
      return [jt, ""];
    }], [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, (e3) => {
      if (e3 && e3[3]) {
        var t3 = [e3[3], e3[4], e3[5] || "0"];
        return [ft, t3.join(".")];
      }
      return [ft, ""];
    }], [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, (e3) => {
      var t3 = "";
      return e3 && e3.length >= 3 && (t3 = H(e3[2]) ? e3[3] : e3[2]), ["watchOS", t3];
    }], [new RegExp("(" + mt + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + mt + ")", "i"), (e3) => {
      if (e3 && e3[2]) {
        var t3 = [e3[2], e3[3], e3[4] || "0"];
        return [mt, t3.join(".")];
      }
      return [mt, ""];
    }], [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, (e3) => {
      var t3 = ["Mac OS X", ""];
      if (e3 && e3[1]) {
        var i3 = [e3[1], e3[2], e3[3] || "0"];
        t3[1] = i3.join(".");
      }
      return t3;
    }], [/Mac/i, ["Mac OS X", ""]], [/CrOS/, [Ct, ""]], [/Linux|debian/i, ["Linux", ""]]];
    ci = function(e3) {
      return si.test(e3) ? Bt : ii.test(e3) ? Ht : ti.test(e3) ? Ut : new RegExp(Qt, "i").test(e3) ? Qt : new RegExp("(" + Vt + "|WPDesktop)", "i").test(e3) ? Vt : /iPad/.test(e3) ? wt : /iPod/.test(e3) ? "iPod Touch" : /iPhone/.test(e3) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(e3) ? Et : ri.test(e3) ? xt : /(kobo)\s(ereader|touch)/i.test(e3) ? "Kobo" : new RegExp(Gt, "i").test(e3) ? Gt : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(e3) || /(kf[a-z]+)( bui|\)).+silk\//i.test(e3) ? "Kindle Fire" : /(Android|ZTE)/i.test(e3) ? !new RegExp(gt).test(e3) || /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(e3) ? /pixel[\daxl ]{1,6}/i.test(e3) && !/pixel c/i.test(e3) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(e3) || /lmy47v/i.test(e3) && !/QTAQZ3/i.test(e3) ? mt : yt : mt : new RegExp("(pda|" + gt + ")", "i").test(e3) ? Yt : new RegExp(bt, "i").test(e3) && !new RegExp(bt + " pc", "i").test(e3) ? Xt : "";
    };
    di = "https?://(.*)";
    hi = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "gad_source", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "mc_cid", "igshid", "ttclid", "rdt_cid"];
    _i = { campaignParams: function(e3) {
      return o ? this._campaignParamsFromUrl(o.URL, e3) : {};
    }, _campaignParamsFromUrl: function(e3, t3) {
      var i3 = hi.concat(t3 || []), s3 = {};
      return f(i3, function(t4) {
        var i4 = pt(e3, t4);
        s3[t4] = i4 || null;
      }), s3;
    }, _searchEngine: function(e3) {
      return e3 ? 0 === e3.search(di + "google.([^/?]*)") ? "google" : 0 === e3.search(di + "bing.com") ? "bing" : 0 === e3.search(di + "yahoo.com") ? "yahoo" : 0 === e3.search(di + "duckduckgo.com") ? "duckduckgo" : null : null;
    }, _searchInfoFromReferrer: function(e3) {
      var t3 = _i._searchEngine(e3), i3 = "yahoo" != t3 ? "q" : "p", s3 = {};
      if (!z(t3)) {
        s3.$search_engine = t3;
        var r3 = o ? pt(o.referrer, i3) : "";
        r3.length && (s3.ph_keyword = r3);
      }
      return s3;
    }, searchInfo: function() {
      var e3 = null == o ? void 0 : o.referrer;
      return e3 ? this._searchInfoFromReferrer(e3) : {};
    }, browser: ai, browserVersion: function(e3, t3) {
      var i3 = ai(e3, t3), s3 = li[i3];
      if (H(s3))
        return null;
      for (var r3 = 0; r3 < s3.length; r3++) {
        var n3 = s3[r3], o3 = e3.match(n3);
        if (o3)
          return parseFloat(o3[o3.length - 2]);
      }
      return null;
    }, browserLanguage: function() {
      return navigator.language || navigator.userLanguage;
    }, os: function(e3) {
      for (var t3 = 0; t3 < ui.length; t3++) {
        var [i3, s3] = ui[t3], r3 = i3.exec(e3), n3 = r3 && (N(s3) ? s3(r3, e3) : s3);
        if (n3)
          return n3;
      }
      return ["", ""];
    }, device: ci, deviceType: function(e3) {
      var t3 = ci(e3);
      return t3 === wt || t3 === yt || "Kobo" === t3 || "Kindle Fire" === t3 || t3 === Xt ? bt : t3 === Bt || t3 === Ut || t3 === Ht || t3 === Qt ? "Console" : t3 === Et ? "Wearable" : t3 ? gt : "Desktop";
    }, referrer: function() {
      return (null == o ? void 0 : o.referrer) || "$direct";
    }, referringDomain: function() {
      var e3;
      return null != o && o.referrer && (null === (e3 = dt(o.referrer)) || void 0 === e3 ? void 0 : e3.host) || "$direct";
    }, referrerInfo: function() {
      return { $referrer: this.referrer(), $referring_domain: this.referringDomain() };
    }, initialPersonInfo: function() {
      return { r: this.referrer(), u: null == a ? void 0 : a.href };
    }, initialPersonPropsFromInfo: function(e3) {
      var t3, { r: i3, u: s3 } = e3, r3 = { $initial_referrer: i3, $initial_referring_domain: null == i3 ? void 0 : "$direct" == i3 ? "$direct" : null === (t3 = dt(i3)) || void 0 === t3 ? void 0 : t3.host };
      if (s3) {
        r3.$initial_current_url = s3;
        var n3 = dt(s3);
        r3.$initial_host = null == n3 ? void 0 : n3.host, r3.$initial_pathname = null == n3 ? void 0 : n3.pathname, f(this._campaignParamsFromUrl(s3), function(e4, t4) {
          r3["$initial_" + k(t4)] = e4;
        });
      }
      i3 && f(this._searchInfoFromReferrer(i3), function(e4, t4) {
        r3["$initial_" + k(t4)] = e4;
      });
      return r3;
    }, timezone: function() {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (e3) {
        return;
      }
    }, properties: function() {
      if (!d)
        return {};
      var [t3, i3] = _i.os(d);
      return m(E({ $os: t3, $os_version: i3, $browser: _i.browser(d, navigator.vendor), $device: _i.device(d), $device_type: _i.deviceType(d), $timezone: _i.timezone() }), { $current_url: null == a ? void 0 : a.href, $host: null == a ? void 0 : a.host, $pathname: null == a ? void 0 : a.pathname, $raw_user_agent: d.length > 1e3 ? d.substring(0, 997) + "..." : d, $browser_version: _i.browserVersion(d, navigator.vendor), $browser_language: _i.browserLanguage(), $screen_height: null == e ? void 0 : e.screen.height, $screen_width: null == e ? void 0 : e.screen.width, $viewport_height: null == e ? void 0 : e.innerHeight, $viewport_width: null == e ? void 0 : e.innerWidth, $lib: "web", $lib_version: _.LIB_VERSION, $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10), $time: Date.now() / 1e3 });
    }, people_properties: function() {
      if (!d)
        return {};
      var [e3, t3] = _i.os(d);
      return m(E({ $os: e3, $os_version: t3, $browser: _i.browser(d, navigator.vendor) }), { $browser_version: _i.browserVersion(d, navigator.vendor) });
    } };
    pi = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"];
    vi = class {
      constructor(e3) {
        this.config = e3, this.props = {}, this.campaign_params_saved = false, this.name = ((e4) => {
          var t3 = "";
          return e4.token && (t3 = e4.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), e4.persistence_name ? "ph_" + e4.persistence_name : "ph_" + t3 + "_posthog";
        })(e3), this.storage = this.buildStorage(e3), this.load(), e3.debug && X.info("Persistence loaded", e3.persistence, ee({}, this.props)), this.update_config(e3, e3), this.save();
      }
      buildStorage(e3) {
        -1 === pi.indexOf(e3.persistence.toLowerCase()) && (X.critical("Unknown persistence type " + e3.persistence + "; falling back to localStorage+cookie"), e3.persistence = "localStorage+cookie");
        var t3 = e3.persistence.toLowerCase();
        return "localstorage" === t3 && st.is_supported() ? st : "localstorage+cookie" === t3 && nt.is_supported() ? nt : "sessionstorage" === t3 && ut.is_supported() ? ut : "memory" === t3 ? at : "cookie" === t3 ? tt : nt.is_supported() ? nt : tt;
      }
      properties() {
        var e3 = {};
        return f(this.props, function(t3, i3) {
          if (i3 === Se && q(t3))
            for (var s3 = Object.keys(t3), n3 = 0; n3 < s3.length; n3++)
              e3["$feature/".concat(s3[n3])] = t3[s3[n3]];
          else
            a3 = i3, l3 = false, (z(o3 = De) ? l3 : r && o3.indexOf === r ? -1 != o3.indexOf(a3) : (f(o3, function(e4) {
              if (l3 || (l3 = e4 === a3))
                return p;
            }), l3)) || (e3[i3] = t3);
          var o3, a3, l3;
        }), e3;
      }
      load() {
        if (!this.disabled) {
          var e3 = this.storage.parse(this.name);
          e3 && (this.props = m({}, e3));
        }
      }
      save() {
        this.disabled || this.storage.set(this.name, this.props, this.expire_days, this.cross_subdomain, this.secure, this.config.debug);
      }
      remove() {
        this.storage.remove(this.name, false), this.storage.remove(this.name, true);
      }
      clear() {
        this.remove(), this.props = {};
      }
      register_once(e3, t3, i3) {
        if (q(e3)) {
          H(t3) && (t3 = "None"), this.expire_days = H(i3) ? this.default_expiry : i3;
          var s3 = false;
          if (f(e3, (e4, i4) => {
            this.props.hasOwnProperty(i4) && this.props[i4] !== t3 || (this.props[i4] = e4, s3 = true);
          }), s3)
            return this.save(), true;
        }
        return false;
      }
      register(e3, t3) {
        if (q(e3)) {
          this.expire_days = H(t3) ? this.default_expiry : t3;
          var i3 = false;
          if (f(e3, (t4, s3) => {
            e3.hasOwnProperty(s3) && this.props[s3] !== t4 && (this.props[s3] = t4, i3 = true);
          }), i3)
            return this.save(), true;
        }
        return false;
      }
      unregister(e3) {
        e3 in this.props && (delete this.props[e3], this.save());
      }
      update_campaign_params() {
        if (!this.campaign_params_saved) {
          var e3 = _i.campaignParams(this.config.custom_campaign_params);
          B(E(e3)) || this.register(e3), this.campaign_params_saved = true;
        }
      }
      update_search_keyword() {
        this.register(_i.searchInfo());
      }
      update_referrer_info() {
        this.register_once(_i.referrerInfo(), void 0);
      }
      set_initial_person_info() {
        this.props[$e] || this.props[Me] || this.register_once({ [Ae]: _i.initialPersonInfo() }, void 0);
      }
      get_referrer_info() {
        return E({ $referrer: this.props.$referrer, $referring_domain: this.props.$referring_domain });
      }
      get_initial_props() {
        var e3 = {};
        f([Me, $e], (t4) => {
          var i4 = this.props[t4];
          i4 && f(i4, function(t5, i5) {
            e3["$initial_" + k(i5)] = t5;
          });
        });
        var t3 = this.props[Ae];
        if (t3) {
          var i3 = _i.initialPersonPropsFromInfo(t3);
          m(e3, i3);
        }
        return e3;
      }
      safe_merge(e3) {
        return f(this.props, function(t3, i3) {
          i3 in e3 || (e3[i3] = t3);
        }), e3;
      }
      update_config(e3, t3) {
        if (this.default_expiry = this.expire_days = e3.cookie_expiration, this.set_disabled(e3.disable_persistence), this.set_cross_subdomain(e3.cross_subdomain_cookie), this.set_secure(e3.secure_cookie), e3.persistence !== t3.persistence) {
          var i3 = this.buildStorage(e3), s3 = this.props;
          this.clear(), this.storage = i3, this.props = s3, this.save();
        }
      }
      set_disabled(e3) {
        this.disabled = e3, this.disabled ? this.remove() : this.save();
      }
      set_cross_subdomain(e3) {
        e3 !== this.cross_subdomain && (this.cross_subdomain = e3, this.remove(), this.save());
      }
      get_cross_subdomain() {
        return !!this.cross_subdomain;
      }
      set_secure(e3) {
        e3 !== this.secure && (this.secure = e3, this.remove(), this.save());
      }
      set_event_timer(e3, t3) {
        var i3 = this.props[ne] || {};
        i3[e3] = t3, this.props[ne] = i3, this.save();
      }
      remove_event_timer(e3) {
        var t3 = (this.props[ne] || {})[e3];
        return H(t3) || (delete this.props[ne][e3], this.save()), t3;
      }
      get_property(e3) {
        return this.props[e3];
      }
      set_property(e3, t3) {
        this.props[e3] = t3, this.save();
      }
    };
    mi = ((e3) => (e3[e3.DomContentLoaded = 0] = "DomContentLoaded", e3[e3.Load = 1] = "Load", e3[e3.FullSnapshot = 2] = "FullSnapshot", e3[e3.IncrementalSnapshot = 3] = "IncrementalSnapshot", e3[e3.Meta = 4] = "Meta", e3[e3.Custom = 5] = "Custom", e3[e3.Plugin = 6] = "Plugin", e3))(mi || {});
    bi = ((e3) => (e3[e3.Mutation = 0] = "Mutation", e3[e3.MouseMove = 1] = "MouseMove", e3[e3.MouseInteraction = 2] = "MouseInteraction", e3[e3.Scroll = 3] = "Scroll", e3[e3.ViewportResize = 4] = "ViewportResize", e3[e3.Input = 5] = "Input", e3[e3.TouchMove = 6] = "TouchMove", e3[e3.MediaInteraction = 7] = "MediaInteraction", e3[e3.StyleSheetRule = 8] = "StyleSheetRule", e3[e3.CanvasMutation = 9] = "CanvasMutation", e3[e3.Font = 10] = "Font", e3[e3.Log = 11] = "Log", e3[e3.Drag = 12] = "Drag", e3[e3.StyleDeclaration = 13] = "StyleDeclaration", e3[e3.Selection = 14] = "Selection", e3[e3.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e3[e3.CustomElement = 16] = "CustomElement", e3))(bi || {});
    Ti = ["a", "button", "form", "input", "select", "textarea", "label"];
    Li = "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})";
    Di = new RegExp("^(?:".concat(Li, ")$"));
    Ni = new RegExp(Li);
    qi = "\\d{3}-?\\d{2}-?\\d{4}";
    Bi = new RegExp("^(".concat(qi, ")$"));
    Hi = new RegExp("(".concat(qi, ")"));
    Qi = "[SessionRecording]";
    Ji = "redacted";
    Yi = { initiatorTypes: ["audio", "beacon", "body", "css", "early-hint", "embed", "fetch", "frame", "iframe", "icon", "image", "img", "input", "link", "navigation", "object", "ping", "script", "track", "video", "xmlhttprequest"], maskRequestFn: (e3) => e3, recordHeaders: false, recordBody: false, recordInitialRequests: false, recordPerformance: false, performanceEntryTypeToObserve: ["first-input", "navigation", "paint", "resource"], payloadSizeLimitBytes: 1e6, payloadHostDenyList: [".lr-ingest.io", ".ingest.sentry.io"] };
    Xi = ["authorization", "x-forwarded-for", "authorization", "cookie", "set-cookie", "x-api-key", "x-real-ip", "remote-addr", "forwarded", "proxy-authorization", "x-csrf-token", "x-csrftoken", "x-xsrf-token"];
    Ki = ["password", "secret", "passwd", "api_key", "apikey", "auth", "credentials", "mysql_pwd", "privatekey", "private_key", "token"];
    Zi = ["/s/", "/e/", "/i/"];
    is = (e3, t3) => {
      var i3, s3, r3, n3 = { payloadSizeLimitBytes: Yi.payloadSizeLimitBytes, performanceEntryTypeToObserve: [...Yi.performanceEntryTypeToObserve], payloadHostDenyList: [...t3.payloadHostDenyList || [], ...Yi.payloadHostDenyList] }, o3 = false !== e3.session_recording.recordHeaders && t3.recordHeaders, a3 = false !== e3.session_recording.recordBody && t3.recordBody, l3 = false !== e3.capture_performance && t3.recordPerformance, u3 = (i3 = n3, r3 = Math.min(1e6, null !== (s3 = i3.payloadSizeLimitBytes) && void 0 !== s3 ? s3 : 1e6), (e4) => (null != e4 && e4.requestBody && (e4.requestBody = es(e4.requestBody, e4.requestHeaders, r3, "Request")), null != e4 && e4.responseBody && (e4.responseBody = es(e4.responseBody, e4.responseHeaders, r3, "Response")), e4)), c3 = (t4) => {
        return u3(((e4, t5) => {
          var i5, s5 = dt(e4.name), r4 = 0 === t5.indexOf("http") ? null === (i5 = dt(t5)) || void 0 === i5 ? void 0 : i5.pathname : t5;
          "/" === r4 && (r4 = "");
          var n4 = null == s5 ? void 0 : s5.pathname.replace(r4 || "", "");
          if (!(s5 && n4 && Zi.some((e5) => 0 === n4.indexOf(e5))))
            return e4;
        })((s4 = (i4 = t4).requestHeaders, j(s4) || f(Object.keys(null != s4 ? s4 : {}), (e4) => {
          Xi.includes(e4.toLowerCase()) && (s4[e4] = Ji);
        }), i4), e3.api_host));
        var i4, s4;
      }, d3 = N(e3.session_recording.maskNetworkRequestFn);
      return d3 && N(e3.session_recording.maskCapturedNetworkRequestFn) && X.warn("Both `maskNetworkRequestFn` and `maskCapturedNetworkRequestFn` are defined. `maskNetworkRequestFn` will be ignored."), d3 && (e3.session_recording.maskCapturedNetworkRequestFn = (t4) => {
        var i4 = e3.session_recording.maskNetworkRequestFn({ url: t4.name });
        return ee(ee({}, t4), {}, { name: null == i4 ? void 0 : i4.url });
      }), n3.maskRequestFn = N(e3.session_recording.maskCapturedNetworkRequestFn) ? (t4) => {
        var i4, s4, r4, n4 = c3(t4);
        return n4 && null !== (i4 = null === (s4 = (r4 = e3.session_recording).maskCapturedNetworkRequestFn) || void 0 === s4 ? void 0 : s4.call(r4, n4)) && void 0 !== i4 ? i4 : void 0;
      } : (e4) => function(e5) {
        if (!H(e5))
          return e5.requestBody = ts(e5.requestBody, "Request"), e5.responseBody = ts(e5.responseBody, "Response"), e5;
      }(c3(e4)), ee(ee(ee({}, Yi), n3), {}, { recordHeaders: o3, recordBody: a3, recordPerformance: l3, recordInitialRequests: l3 });
    };
    rs = class {
      constructor(e3) {
        var t3, i3, s3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        te(this, "bucketSize", 100), te(this, "refillRate", 10), te(this, "mutationBuckets", {}), te(this, "loggedTracker", {}), te(this, "refillBuckets", () => {
          Object.keys(this.mutationBuckets).forEach((e4) => {
            this.mutationBuckets[e4] = this.mutationBuckets[e4] + this.refillRate, this.mutationBuckets[e4] >= this.bucketSize && delete this.mutationBuckets[e4];
          });
        }), te(this, "getNodeOrRelevantParent", (e4) => {
          var t4 = this.rrweb.mirror.getNode(e4);
          if ("svg" !== (null == t4 ? void 0 : t4.nodeName) && t4 instanceof Element) {
            var i4 = t4.closest("svg");
            if (i4)
              return [this.rrweb.mirror.getId(i4), i4];
          }
          return [e4, t4];
        }), te(this, "numberOfChanges", (e4) => {
          var t4, i4, s4, r3, n3, o3, a3, l3;
          return (null !== (t4 = null === (i4 = e4.removes) || void 0 === i4 ? void 0 : i4.length) && void 0 !== t4 ? t4 : 0) + (null !== (s4 = null === (r3 = e4.attributes) || void 0 === r3 ? void 0 : r3.length) && void 0 !== s4 ? s4 : 0) + (null !== (n3 = null === (o3 = e4.texts) || void 0 === o3 ? void 0 : o3.length) && void 0 !== n3 ? n3 : 0) + (null !== (a3 = null === (l3 = e4.adds) || void 0 === l3 ? void 0 : l3.length) && void 0 !== a3 ? a3 : 0);
        }), te(this, "throttleMutations", (e4) => {
          if (3 !== e4.type || 0 !== e4.data.source)
            return e4;
          var t4 = e4.data, i4 = this.numberOfChanges(t4);
          t4.attributes && (t4.attributes = t4.attributes.filter((e5) => {
            var t5, i5, s5, [r3, n3] = this.getNodeOrRelevantParent(e5.id);
            if (0 === this.mutationBuckets[r3])
              return false;
            (this.mutationBuckets[r3] = null !== (t5 = this.mutationBuckets[r3]) && void 0 !== t5 ? t5 : this.bucketSize, this.mutationBuckets[r3] = Math.max(this.mutationBuckets[r3] - 1, 0), 0 === this.mutationBuckets[r3]) && (this.loggedTracker[r3] || (this.loggedTracker[r3] = true, null === (i5 = (s5 = this.options).onBlockedNode) || void 0 === i5 || i5.call(s5, r3, n3)));
            return e5;
          }));
          var s4 = this.numberOfChanges(t4);
          return 0 !== s4 || i4 === s4 ? e4 : void 0;
        }), this.rrweb = e3, this.options = s3, this.refillRate = ss(null !== (t3 = this.options.refillRate) && void 0 !== t3 ? t3 : this.refillRate, 0, 100, "mutation throttling refill rate"), this.bucketSize = ss(null !== (i3 = this.options.bucketSize) && void 0 !== i3 ? i3 : this.bucketSize, 0, 100, "mutation throttling bucket size"), setInterval(() => {
          this.refillBuckets();
        }, 1e3);
      }
    };
    ns = Uint8Array;
    os = Uint16Array;
    as = Uint32Array;
    ls = new ns([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
    us = new ns([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
    cs = new ns([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    ds = function(e3, t3) {
      for (var i3 = new os(31), s3 = 0; s3 < 31; ++s3)
        i3[s3] = t3 += 1 << e3[s3 - 1];
      var r3 = new as(i3[30]);
      for (s3 = 1; s3 < 30; ++s3)
        for (var n3 = i3[s3]; n3 < i3[s3 + 1]; ++n3)
          r3[n3] = n3 - i3[s3] << 5 | s3;
      return [i3, r3];
    };
    hs = ds(ls, 2);
    _s = hs[0];
    ps = hs[1];
    _s[28] = 258, ps[258] = 28;
    for (vs = ds(us, 0)[1], gs = new os(32768), fs = 0; fs < 32768; ++fs) {
      ms = (43690 & fs) >>> 1 | (21845 & fs) << 1;
      ms = (61680 & (ms = (52428 & ms) >>> 2 | (13107 & ms) << 2)) >>> 4 | (3855 & ms) << 4, gs[fs] = ((65280 & ms) >>> 8 | (255 & ms) << 8) >>> 1;
    }
    bs = function(e3, t3, i3) {
      for (var s3 = e3.length, r3 = 0, n3 = new os(t3); r3 < s3; ++r3)
        ++n3[e3[r3] - 1];
      var o3, a3 = new os(t3);
      for (r3 = 0; r3 < t3; ++r3)
        a3[r3] = a3[r3 - 1] + n3[r3 - 1] << 1;
      if (i3) {
        o3 = new os(1 << t3);
        var l3 = 15 - t3;
        for (r3 = 0; r3 < s3; ++r3)
          if (e3[r3])
            for (var u3 = r3 << 4 | e3[r3], c3 = t3 - e3[r3], d3 = a3[e3[r3] - 1]++ << c3, h3 = d3 | (1 << c3) - 1; d3 <= h3; ++d3)
              o3[gs[d3] >>> l3] = u3;
      } else
        for (o3 = new os(s3), r3 = 0; r3 < s3; ++r3)
          o3[r3] = gs[a3[e3[r3] - 1]++] >>> 15 - e3[r3];
      return o3;
    };
    ys = new ns(288);
    for (fs = 0; fs < 144; ++fs)
      ys[fs] = 8;
    for (fs = 144; fs < 256; ++fs)
      ys[fs] = 9;
    for (fs = 256; fs < 280; ++fs)
      ys[fs] = 7;
    for (fs = 280; fs < 288; ++fs)
      ys[fs] = 8;
    ws = new ns(32);
    for (fs = 0; fs < 32; ++fs)
      ws[fs] = 5;
    Ss = bs(ys, 9, 0);
    Es = bs(ws, 5, 0);
    ks = function(e3) {
      return (e3 / 8 >> 0) + (7 & e3 && 1);
    };
    xs = function(e3, t3, i3) {
      (null == i3 || i3 > e3.length) && (i3 = e3.length);
      var s3 = new (e3 instanceof os ? os : e3 instanceof as ? as : ns)(i3 - t3);
      return s3.set(e3.subarray(t3, i3)), s3;
    };
    Is = function(e3, t3, i3) {
      i3 <<= 7 & t3;
      var s3 = t3 / 8 >> 0;
      e3[s3] |= i3, e3[s3 + 1] |= i3 >>> 8;
    };
    Ps = function(e3, t3, i3) {
      i3 <<= 7 & t3;
      var s3 = t3 / 8 >> 0;
      e3[s3] |= i3, e3[s3 + 1] |= i3 >>> 8, e3[s3 + 2] |= i3 >>> 16;
    };
    Fs = function(e3, t3) {
      for (var i3 = [], s3 = 0; s3 < e3.length; ++s3)
        e3[s3] && i3.push({ s: s3, f: e3[s3] });
      var r3 = i3.length, n3 = i3.slice();
      if (!r3)
        return [new ns(0), 0];
      if (1 == r3) {
        var o3 = new ns(i3[0].s + 1);
        return o3[i3[0].s] = 1, [o3, 1];
      }
      i3.sort(function(e4, t4) {
        return e4.f - t4.f;
      }), i3.push({ s: -1, f: 25001 });
      var a3 = i3[0], l3 = i3[1], u3 = 0, c3 = 1, d3 = 2;
      for (i3[0] = { s: -1, f: a3.f + l3.f, l: a3, r: l3 }; c3 != r3 - 1; )
        a3 = i3[i3[u3].f < i3[d3].f ? u3++ : d3++], l3 = i3[u3 != c3 && i3[u3].f < i3[d3].f ? u3++ : d3++], i3[c3++] = { s: -1, f: a3.f + l3.f, l: a3, r: l3 };
      var h3 = n3[0].s;
      for (s3 = 1; s3 < r3; ++s3)
        n3[s3].s > h3 && (h3 = n3[s3].s);
      var _3 = new os(h3 + 1), p3 = Rs(i3[c3 - 1], _3, 0);
      if (p3 > t3) {
        s3 = 0;
        var v3 = 0, g3 = p3 - t3, f3 = 1 << g3;
        for (n3.sort(function(e4, t4) {
          return _3[t4.s] - _3[e4.s] || e4.f - t4.f;
        }); s3 < r3; ++s3) {
          var m3 = n3[s3].s;
          if (!(_3[m3] > t3))
            break;
          v3 += f3 - (1 << p3 - _3[m3]), _3[m3] = t3;
        }
        for (v3 >>>= g3; v3 > 0; ) {
          var b3 = n3[s3].s;
          _3[b3] < t3 ? v3 -= 1 << t3 - _3[b3]++ - 1 : ++s3;
        }
        for (; s3 >= 0 && v3; --s3) {
          var y3 = n3[s3].s;
          _3[y3] == t3 && (--_3[y3], ++v3);
        }
        p3 = t3;
      }
      return [new ns(_3), p3];
    };
    Rs = function(e3, t3, i3) {
      return -1 == e3.s ? Math.max(Rs(e3.l, t3, i3 + 1), Rs(e3.r, t3, i3 + 1)) : t3[e3.s] = i3;
    };
    Cs = function(e3) {
      for (var t3 = e3.length; t3 && !e3[--t3]; )
        ;
      for (var i3 = new os(++t3), s3 = 0, r3 = e3[0], n3 = 1, o3 = function(e4) {
        i3[s3++] = e4;
      }, a3 = 1; a3 <= t3; ++a3)
        if (e3[a3] == r3 && a3 != t3)
          ++n3;
        else {
          if (!r3 && n3 > 2) {
            for (; n3 > 138; n3 -= 138)
              o3(32754);
            n3 > 2 && (o3(n3 > 10 ? n3 - 11 << 5 | 28690 : n3 - 3 << 5 | 12305), n3 = 0);
          } else if (n3 > 3) {
            for (o3(r3), --n3; n3 > 6; n3 -= 6)
              o3(8304);
            n3 > 2 && (o3(n3 - 3 << 5 | 8208), n3 = 0);
          }
          for (; n3--; )
            o3(r3);
          n3 = 1, r3 = e3[a3];
        }
      return [i3.subarray(0, s3), t3];
    };
    Ts = function(e3, t3) {
      for (var i3 = 0, s3 = 0; s3 < t3.length; ++s3)
        i3 += e3[s3] * t3[s3];
      return i3;
    };
    $s = function(e3, t3, i3) {
      var s3 = i3.length, r3 = ks(t3 + 2);
      e3[r3] = 255 & s3, e3[r3 + 1] = s3 >>> 8, e3[r3 + 2] = 255 ^ e3[r3], e3[r3 + 3] = 255 ^ e3[r3 + 1];
      for (var n3 = 0; n3 < s3; ++n3)
        e3[r3 + n3 + 4] = i3[n3];
      return 8 * (r3 + 4 + s3);
    };
    Ms = function(e3, t3, i3, s3, r3, n3, o3, a3, l3, u3, c3) {
      Is(t3, c3++, i3), ++r3[256];
      for (var d3 = Fs(r3, 15), h3 = d3[0], _3 = d3[1], p3 = Fs(n3, 15), v3 = p3[0], g3 = p3[1], f3 = Cs(h3), m3 = f3[0], b3 = f3[1], y3 = Cs(v3), w3 = y3[0], S3 = y3[1], E3 = new os(19), k3 = 0; k3 < m3.length; ++k3)
        E3[31 & m3[k3]]++;
      for (k3 = 0; k3 < w3.length; ++k3)
        E3[31 & w3[k3]]++;
      for (var x3 = Fs(E3, 7), I3 = x3[0], P3 = x3[1], F3 = 19; F3 > 4 && !I3[cs[F3 - 1]]; --F3)
        ;
      var R3, C3, T3, $2, M3 = u3 + 5 << 3, A3 = Ts(r3, ys) + Ts(n3, ws) + o3, O3 = Ts(r3, h3) + Ts(n3, v3) + o3 + 14 + 3 * F3 + Ts(E3, I3) + (2 * E3[16] + 3 * E3[17] + 7 * E3[18]);
      if (M3 <= A3 && M3 <= O3)
        return $s(t3, c3, e3.subarray(l3, l3 + u3));
      if (Is(t3, c3, 1 + (O3 < A3)), c3 += 2, O3 < A3) {
        R3 = bs(h3, _3, 0), C3 = h3, T3 = bs(v3, g3, 0), $2 = v3;
        var L3 = bs(I3, P3, 0);
        Is(t3, c3, b3 - 257), Is(t3, c3 + 5, S3 - 1), Is(t3, c3 + 10, F3 - 4), c3 += 14;
        for (k3 = 0; k3 < F3; ++k3)
          Is(t3, c3 + 3 * k3, I3[cs[k3]]);
        c3 += 3 * F3;
        for (var D3 = [m3, w3], N3 = 0; N3 < 2; ++N3) {
          var q3 = D3[N3];
          for (k3 = 0; k3 < q3.length; ++k3) {
            var B3 = 31 & q3[k3];
            Is(t3, c3, L3[B3]), c3 += I3[B3], B3 > 15 && (Is(t3, c3, q3[k3] >>> 5 & 127), c3 += q3[k3] >>> 12);
          }
        }
      } else
        R3 = Ss, C3 = ys, T3 = Es, $2 = ws;
      for (k3 = 0; k3 < a3; ++k3)
        if (s3[k3] > 255) {
          B3 = s3[k3] >>> 18 & 31;
          Ps(t3, c3, R3[B3 + 257]), c3 += C3[B3 + 257], B3 > 7 && (Is(t3, c3, s3[k3] >>> 23 & 31), c3 += ls[B3]);
          var H3 = 31 & s3[k3];
          Ps(t3, c3, T3[H3]), c3 += $2[H3], H3 > 3 && (Ps(t3, c3, s3[k3] >>> 5 & 8191), c3 += us[H3]);
        } else
          Ps(t3, c3, R3[s3[k3]]), c3 += C3[s3[k3]];
      return Ps(t3, c3, R3[256]), c3 + C3[256];
    };
    As = new as([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
    Os = function() {
      for (var e3 = new as(256), t3 = 0; t3 < 256; ++t3) {
        for (var i3 = t3, s3 = 9; --s3; )
          i3 = (1 & i3 && 3988292384) ^ i3 >>> 1;
        e3[t3] = i3;
      }
      return e3;
    }();
    Ls = function() {
      var e3 = 4294967295;
      return { p: function(t3) {
        for (var i3 = e3, s3 = 0; s3 < t3.length; ++s3)
          i3 = Os[255 & i3 ^ t3[s3]] ^ i3 >>> 8;
        e3 = i3;
      }, d: function() {
        return 4294967295 ^ e3;
      } };
    };
    Ds = function(e3, t3, i3, s3, r3) {
      return function(e4, t4, i4, s4, r4, n3) {
        var o3 = e4.length, a3 = new ns(s4 + o3 + 5 * (1 + Math.floor(o3 / 7e3)) + r4), l3 = a3.subarray(s4, a3.length - r4), u3 = 0;
        if (!t4 || o3 < 8)
          for (var c3 = 0; c3 <= o3; c3 += 65535) {
            var d3 = c3 + 65535;
            d3 < o3 ? u3 = $s(l3, u3, e4.subarray(c3, d3)) : (l3[c3] = n3, u3 = $s(l3, u3, e4.subarray(c3, o3)));
          }
        else {
          for (var h3 = As[t4 - 1], _3 = h3 >>> 13, p3 = 8191 & h3, v3 = (1 << i4) - 1, g3 = new os(32768), f3 = new os(v3 + 1), m3 = Math.ceil(i4 / 3), b3 = 2 * m3, y3 = function(t5) {
            return (e4[t5] ^ e4[t5 + 1] << m3 ^ e4[t5 + 2] << b3) & v3;
          }, w3 = new as(25e3), S3 = new os(288), E3 = new os(32), k3 = 0, x3 = 0, I3 = (c3 = 0, 0), P3 = 0, F3 = 0; c3 < o3; ++c3) {
            var R3 = y3(c3), C3 = 32767 & c3, T3 = f3[R3];
            if (g3[C3] = T3, f3[R3] = C3, P3 <= c3) {
              var $2 = o3 - c3;
              if ((k3 > 7e3 || I3 > 24576) && $2 > 423) {
                u3 = Ms(e4, l3, 0, w3, S3, E3, x3, I3, F3, c3 - F3, u3), I3 = k3 = x3 = 0, F3 = c3;
                for (var M3 = 0; M3 < 286; ++M3)
                  S3[M3] = 0;
                for (M3 = 0; M3 < 30; ++M3)
                  E3[M3] = 0;
              }
              var A3 = 2, O3 = 0, L3 = p3, D3 = C3 - T3 & 32767;
              if ($2 > 2 && R3 == y3(c3 - D3))
                for (var N3 = Math.min(_3, $2) - 1, q3 = Math.min(32767, c3), B3 = Math.min(258, $2); D3 <= q3 && --L3 && C3 != T3; ) {
                  if (e4[c3 + A3] == e4[c3 + A3 - D3]) {
                    for (var H3 = 0; H3 < B3 && e4[c3 + H3] == e4[c3 + H3 - D3]; ++H3)
                      ;
                    if (H3 > A3) {
                      if (A3 = H3, O3 = D3, H3 > N3)
                        break;
                      var U3 = Math.min(D3, H3 - 2), W3 = 0;
                      for (M3 = 0; M3 < U3; ++M3) {
                        var z3 = c3 - D3 + M3 + 32768 & 32767, j3 = z3 - g3[z3] + 32768 & 32767;
                        j3 > W3 && (W3 = j3, T3 = z3);
                      }
                    }
                  }
                  D3 += (C3 = T3) - (T3 = g3[C3]) + 32768 & 32767;
                }
              if (O3) {
                w3[I3++] = 268435456 | ps[A3] << 18 | vs[O3];
                var V3 = 31 & ps[A3], G3 = 31 & vs[O3];
                x3 += ls[V3] + us[G3], ++S3[257 + V3], ++E3[G3], P3 = c3 + A3, ++k3;
              } else
                w3[I3++] = e4[c3], ++S3[e4[c3]];
            }
          }
          u3 = Ms(e4, l3, n3, w3, S3, E3, x3, I3, F3, c3 - F3, u3);
        }
        return xs(a3, 0, s4 + ks(u3) + r4);
      }(e3, null == t3.level ? 6 : t3.level, null == t3.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e3.length)))) : 12 + t3.mem, i3, s3, !r3);
    };
    Ns = function(e3, t3, i3) {
      for (; i3; ++t3)
        e3[t3] = i3, i3 >>>= 8;
    };
    qs = function(e3, t3) {
      var i3 = t3.filename;
      if (e3[0] = 31, e3[1] = 139, e3[2] = 8, e3[8] = t3.level < 2 ? 4 : 9 == t3.level ? 2 : 0, e3[9] = 3, 0 != t3.mtime && Ns(e3, 4, Math.floor(new Date(t3.mtime || Date.now()) / 1e3)), i3) {
        e3[3] = 8;
        for (var s3 = 0; s3 <= i3.length; ++s3)
          e3[s3 + 10] = i3.charCodeAt(s3);
      }
    };
    Bs = function(e3) {
      return 10 + (e3.filename && e3.filename.length + 1 || 0);
    };
    Ws = 3e5;
    zs = [bi.MouseMove, bi.MouseInteraction, bi.Scroll, bi.ViewportResize, bi.Input, bi.TouchMove, bi.MediaInteraction, bi.Drag];
    js = (e3) => ({ rrwebMethod: e3, enqueuedAt: Date.now(), attempt: 1 });
    Vs = "[SessionRecording]";
    Ys = class {
      get sessionIdleThresholdMilliseconds() {
        return this.instance.config.session_recording.session_idle_threshold_ms || 3e5;
      }
      get rrwebRecord() {
        var e3, t3;
        return null == h || null === (e3 = h.__PosthogExtensions__) || void 0 === e3 || null === (t3 = e3.rrweb) || void 0 === t3 ? void 0 : t3.record;
      }
      get started() {
        return this._captureStarted;
      }
      get sessionManager() {
        if (!this.instance.sessionManager)
          throw new Error(Vs + " must be started with a valid sessionManager.");
        return this.instance.sessionManager;
      }
      get fullSnapshotIntervalMillis() {
        var e3, t3;
        return "trigger_pending" === this.triggerStatus ? 6e4 : null !== (e3 = null === (t3 = this.instance.config.session_recording) || void 0 === t3 ? void 0 : t3.full_snapshot_interval_millis) && void 0 !== e3 ? e3 : Ws;
      }
      get isSampled() {
        var e3 = this.instance.get_property(be);
        return G(e3) ? e3 : null;
      }
      get sessionDuration() {
        var e3, t3, i3 = null === (e3 = this.buffer) || void 0 === e3 ? void 0 : e3.data[(null === (t3 = this.buffer) || void 0 === t3 ? void 0 : t3.data.length) - 1], { sessionStartTimestamp: s3 } = this.sessionManager.checkAndGetSessionAndWindowId(true);
        return i3 ? i3.timestamp - s3 : null;
      }
      get isRecordingEnabled() {
        var t3 = !!this.instance.get_property(he), i3 = !this.instance.config.disable_session_recording;
        return e && t3 && i3;
      }
      get isConsoleLogCaptureEnabled() {
        var e3 = !!this.instance.get_property(_e), t3 = this.instance.config.enable_recording_console_log;
        return null != t3 ? t3 : e3;
      }
      get canvasRecording() {
        var e3, t3, i3, s3, r3, n3, o3 = this.instance.config.session_recording.captureCanvas, a3 = this.instance.get_property(ve), l3 = null !== (e3 = null !== (t3 = null == o3 ? void 0 : o3.recordCanvas) && void 0 !== t3 ? t3 : null == a3 ? void 0 : a3.enabled) && void 0 !== e3 && e3, u3 = null !== (i3 = null !== (s3 = null == o3 ? void 0 : o3.canvasFps) && void 0 !== s3 ? s3 : null == a3 ? void 0 : a3.fps) && void 0 !== i3 ? i3 : 0, c3 = null !== (r3 = null !== (n3 = null == o3 ? void 0 : o3.canvasQuality) && void 0 !== n3 ? n3 : null == a3 ? void 0 : a3.quality) && void 0 !== r3 ? r3 : 0;
        return { enabled: l3, fps: ss(u3, 0, 12, "canvas recording fps"), quality: ss(c3, 0, 1, "canvas recording quality") };
      }
      get networkPayloadCapture() {
        var e3, t3, i3 = this.instance.get_property(pe), s3 = { recordHeaders: null === (e3 = this.instance.config.session_recording) || void 0 === e3 ? void 0 : e3.recordHeaders, recordBody: null === (t3 = this.instance.config.session_recording) || void 0 === t3 ? void 0 : t3.recordBody }, r3 = (null == s3 ? void 0 : s3.recordHeaders) || (null == i3 ? void 0 : i3.recordHeaders), n3 = (null == s3 ? void 0 : s3.recordBody) || (null == i3 ? void 0 : i3.recordBody), o3 = q(this.instance.config.capture_performance) ? this.instance.config.capture_performance.network_timing : this.instance.config.capture_performance, a3 = !!(G(o3) ? o3 : null == i3 ? void 0 : i3.capturePerformance);
        return r3 || n3 || a3 ? { recordHeaders: r3, recordBody: n3, recordPerformance: a3 } : void 0;
      }
      get sampleRate() {
        var e3 = this.instance.get_property(ge);
        return V(e3) ? e3 : null;
      }
      get minimumDuration() {
        var e3 = this.instance.get_property(fe);
        return V(e3) ? e3 : null;
      }
      get status() {
        return this.receivedDecide ? this.isRecordingEnabled ? j(this._linkedFlag) || this._linkedFlagSeen ? "trigger_pending" === this.triggerStatus ? "buffering" : this._urlBlocked ? "paused" : G(this.isSampled) ? this.isSampled ? "sampled" : "disabled" : "active" : "buffering" : "disabled" : "buffering";
      }
      get urlTriggerStatus() {
        var e3;
        return 0 === this._urlTriggers.length ? "trigger_disabled" : (null === (e3 = this.instance) || void 0 === e3 ? void 0 : e3.get_property(ye)) === this.sessionId ? "trigger_activated" : "trigger_pending";
      }
      get eventTriggerStatus() {
        var e3;
        return 0 === this._eventTriggers.length ? "trigger_disabled" : (null === (e3 = this.instance) || void 0 === e3 ? void 0 : e3.get_property(we)) === this.sessionId ? "trigger_activated" : "trigger_pending";
      }
      get triggerStatus() {
        var e3 = "trigger_activated" === this.eventTriggerStatus || "trigger_activated" === this.urlTriggerStatus, t3 = "trigger_pending" === this.eventTriggerStatus || "trigger_pending" === this.urlTriggerStatus;
        return e3 ? "trigger_activated" : t3 ? "trigger_pending" : "trigger_disabled";
      }
      constructor(e3) {
        if (te(this, "queuedRRWebEvents", []), te(this, "isIdle", false), te(this, "_linkedFlagSeen", false), te(this, "_lastActivityTimestamp", Date.now()), te(this, "_linkedFlag", null), te(this, "_removePageViewCaptureHook", void 0), te(this, "_onSessionIdListener", void 0), te(this, "_persistDecideOnSessionListener", void 0), te(this, "_samplingSessionListener", void 0), te(this, "_urlTriggers", []), te(this, "_urlBlocklist", []), te(this, "_urlBlocked", false), te(this, "_eventTriggers", []), te(this, "_removeEventTriggerCaptureHook", void 0), te(this, "_forceAllowLocalhostNetworkCapture", false), te(this, "_onBeforeUnload", () => {
          this._flushBuffer();
        }), te(this, "_onOffline", () => {
          this._tryAddCustomEvent("browser offline", {});
        }), te(this, "_onOnline", () => {
          this._tryAddCustomEvent("browser online", {});
        }), te(this, "_onVisibilityChange", () => {
          if (null != o && o.visibilityState) {
            var e4 = "window " + o.visibilityState;
            this._tryAddCustomEvent(e4, {});
          }
        }), this.instance = e3, this._captureStarted = false, this._endpoint = "/s/", this.stopRrweb = void 0, this.receivedDecide = false, !this.instance.sessionManager)
          throw X.error(Vs + " started without valid sessionManager"), new Error(Vs + " started without valid sessionManager. This is a bug.");
        var { sessionId: t3, windowId: i3 } = this.sessionManager.checkAndGetSessionAndWindowId();
        this.sessionId = t3, this.windowId = i3, this.buffer = this.clearBuffer(), this.sessionIdleThresholdMilliseconds >= this.sessionManager.sessionTimeoutMs && X.warn(Vs + " session_idle_threshold_ms (".concat(this.sessionIdleThresholdMilliseconds, ") is greater than the session timeout (").concat(this.sessionManager.sessionTimeoutMs, "). Session will never be detected as idle"));
      }
      startIfEnabledOrStop(t3) {
        this.isRecordingEnabled ? (this._startCapture(t3), null == e || e.addEventListener("beforeunload", this._onBeforeUnload), null == e || e.addEventListener("offline", this._onOffline), null == e || e.addEventListener("online", this._onOnline), null == e || e.addEventListener("visibilitychange", this._onVisibilityChange), this._setupSampling(), this._addEventTriggerListener(), j(this._removePageViewCaptureHook) && (this._removePageViewCaptureHook = this.instance._addCaptureHook((t4) => {
          try {
            if ("$pageview" === t4) {
              var i3 = e ? this._maskUrl(e.location.href) : "";
              if (!i3)
                return;
              this._tryAddCustomEvent("$pageview", { href: i3 });
            }
          } catch (e3) {
            X.error("Could not add $pageview to rrweb session", e3);
          }
        })), this._onSessionIdListener || (this._onSessionIdListener = this.sessionManager.onSessionId((e3, t4, i3) => {
          var s3, r3, n3, o3;
          i3 && (this._tryAddCustomEvent("$session_id_change", { sessionId: e3, windowId: t4, changeReason: i3 }), null === (s3 = this.instance) || void 0 === s3 || null === (r3 = s3.persistence) || void 0 === r3 || r3.unregister(we), null === (n3 = this.instance) || void 0 === n3 || null === (o3 = n3.persistence) || void 0 === o3 || o3.unregister(ye));
        }))) : this.stopRecording();
      }
      stopRecording() {
        var t3, i3, s3, r3;
        this._captureStarted && this.stopRrweb && (this.stopRrweb(), this.stopRrweb = void 0, this._captureStarted = false, null == e || e.removeEventListener("beforeunload", this._onBeforeUnload), null == e || e.removeEventListener("offline", this._onOffline), null == e || e.removeEventListener("online", this._onOnline), null == e || e.removeEventListener("visibilitychange", this._onVisibilityChange), this.clearBuffer(), clearInterval(this._fullSnapshotTimer), null === (t3 = this._removePageViewCaptureHook) || void 0 === t3 || t3.call(this), this._removePageViewCaptureHook = void 0, null === (i3 = this._removeEventTriggerCaptureHook) || void 0 === i3 || i3.call(this), this._removeEventTriggerCaptureHook = void 0, null === (s3 = this._onSessionIdListener) || void 0 === s3 || s3.call(this), this._onSessionIdListener = void 0, null === (r3 = this._samplingSessionListener) || void 0 === r3 || r3.call(this), this._samplingSessionListener = void 0, X.info(Vs + " stopped"));
      }
      makeSamplingDecision(e3) {
        var t3, i3 = this.sessionId !== e3, s3 = this.sampleRate;
        if (V(s3)) {
          var r3, n3 = this.isSampled, o3 = i3 || !G(n3);
          if (o3)
            r3 = Math.random() < s3;
          else
            r3 = n3;
          o3 && (r3 ? this._reportStarted("sampled") : X.warn(Vs + " Sample rate (".concat(s3, ") has determined that this sessionId (").concat(e3, ") will not be sent to the server.")), this._tryAddCustomEvent("samplingDecisionMade", { sampleRate: s3, isSampled: r3 })), null === (t3 = this.instance.persistence) || void 0 === t3 || t3.register({ [be]: r3 });
        } else {
          var a3;
          null === (a3 = this.instance.persistence) || void 0 === a3 || a3.register({ [be]: null });
        }
      }
      afterDecideResponse(e3) {
        var t3, i3, s3, r3, n3, o3;
        (this._persistDecideResponse(e3), this._linkedFlag = (null === (t3 = e3.sessionRecording) || void 0 === t3 ? void 0 : t3.linkedFlag) || null, null !== (i3 = e3.sessionRecording) && void 0 !== i3 && i3.endpoint) && (this._endpoint = null === (o3 = e3.sessionRecording) || void 0 === o3 ? void 0 : o3.endpoint);
        if (this._setupSampling(), !j(this._linkedFlag) && !this._linkedFlagSeen) {
          var a3 = U(this._linkedFlag) ? this._linkedFlag : this._linkedFlag.flag, l3 = U(this._linkedFlag) ? null : this._linkedFlag.variant;
          this.instance.onFeatureFlags((e4, t4) => {
            var i4 = q(t4) && a3 in t4, s4 = l3 ? t4[a3] === l3 : i4;
            s4 && this._reportStarted("linked_flag_matched", { linkedFlag: a3, linkedVariant: l3 }), this._linkedFlagSeen = s4;
          });
        }
        null !== (s3 = e3.sessionRecording) && void 0 !== s3 && s3.urlTriggers && (this._urlTriggers = e3.sessionRecording.urlTriggers), null !== (r3 = e3.sessionRecording) && void 0 !== r3 && r3.urlBlocklist && (this._urlBlocklist = e3.sessionRecording.urlBlocklist), null !== (n3 = e3.sessionRecording) && void 0 !== n3 && n3.eventTriggers && (this._eventTriggers = e3.sessionRecording.eventTriggers), this.receivedDecide = true, this.startIfEnabledOrStop();
      }
      _setupSampling() {
        V(this.sampleRate) && j(this._samplingSessionListener) && (this._samplingSessionListener = this.sessionManager.onSessionId((e3) => {
          this.makeSamplingDecision(e3);
        }));
      }
      _persistDecideResponse(e3) {
        if (this.instance.persistence) {
          var t3, i3 = this.instance.persistence, s3 = () => {
            var t4, s4, r3, n3, o3, a3, l3, u3 = null === (t4 = e3.sessionRecording) || void 0 === t4 ? void 0 : t4.sampleRate, c3 = j(u3) ? null : parseFloat(u3), d3 = null === (s4 = e3.sessionRecording) || void 0 === s4 ? void 0 : s4.minimumDurationMilliseconds;
            i3.register({ [he]: !!e3.sessionRecording, [_e]: null === (r3 = e3.sessionRecording) || void 0 === r3 ? void 0 : r3.consoleLogRecordingEnabled, [pe]: ee({ capturePerformance: e3.capturePerformance }, null === (n3 = e3.sessionRecording) || void 0 === n3 ? void 0 : n3.networkPayloadCapture), [ve]: { enabled: null === (o3 = e3.sessionRecording) || void 0 === o3 ? void 0 : o3.recordCanvas, fps: null === (a3 = e3.sessionRecording) || void 0 === a3 ? void 0 : a3.canvasFps, quality: null === (l3 = e3.sessionRecording) || void 0 === l3 ? void 0 : l3.canvasQuality }, [ge]: c3, [fe]: H(d3) ? null : d3 });
          };
          s3(), null === (t3 = this._persistDecideOnSessionListener) || void 0 === t3 || t3.call(this), this._persistDecideOnSessionListener = this.sessionManager.onSessionId(s3);
        }
      }
      log(e3) {
        var t3, i3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "log";
        null === (t3 = this.instance.sessionRecording) || void 0 === t3 || t3.onRRwebEmit({ type: 6, data: { plugin: "rrweb/console@1", payload: { level: i3, trace: [], payload: [JSON.stringify(e3)] } }, timestamp: Date.now() });
      }
      _startCapture(e3) {
        if (!H(Object.assign) && !H(Array.from) && !(this._captureStarted || this.instance.config.disable_session_recording || this.instance.consent.isOptedOut())) {
          var t3, i3;
          if (this._captureStarted = true, this.sessionManager.checkAndGetSessionAndWindowId(), this.rrwebRecord)
            this._onScriptLoaded();
          else
            null === (t3 = h.__PosthogExtensions__) || void 0 === t3 || null === (i3 = t3.loadExternalDependency) || void 0 === i3 || i3.call(t3, this.instance, "recorder", (e4) => {
              if (e4)
                return X.error(Vs + " could not load recorder", e4);
              this._onScriptLoaded();
            });
          X.info(Vs + " starting"), "active" === this.status && this._reportStarted(e3 || "recording_initialized");
        }
      }
      isInteractiveEvent(e3) {
        var t3;
        return 3 === e3.type && -1 !== zs.indexOf(null === (t3 = e3.data) || void 0 === t3 ? void 0 : t3.source);
      }
      _updateWindowAndSessionIds(e3) {
        var t3 = this.isInteractiveEvent(e3);
        t3 || this.isIdle || e3.timestamp - this._lastActivityTimestamp > this.sessionIdleThresholdMilliseconds && (this.isIdle = true, clearInterval(this._fullSnapshotTimer), this._tryAddCustomEvent("sessionIdle", { eventTimestamp: e3.timestamp, lastActivityTimestamp: this._lastActivityTimestamp, threshold: this.sessionIdleThresholdMilliseconds, bufferLength: this.buffer.data.length, bufferSize: this.buffer.size }), this._flushBuffer());
        var i3 = false;
        if (t3 && (this._lastActivityTimestamp = e3.timestamp, this.isIdle && (this.isIdle = false, this._tryAddCustomEvent("sessionNoLongerIdle", { reason: "user activity", type: e3.type }), i3 = true)), !this.isIdle) {
          var { windowId: s3, sessionId: r3 } = this.sessionManager.checkAndGetSessionAndWindowId(!t3, e3.timestamp), n3 = this.sessionId !== r3, o3 = this.windowId !== s3;
          this.windowId = s3, this.sessionId = r3, n3 || o3 ? (this.stopRecording(), this.startIfEnabledOrStop("session_id_changed")) : i3 && this._scheduleFullSnapshot();
        }
      }
      _tryRRWebMethod(e3) {
        try {
          return e3.rrwebMethod(), true;
        } catch (t3) {
          return this.queuedRRWebEvents.length < 10 ? this.queuedRRWebEvents.push({ enqueuedAt: e3.enqueuedAt || Date.now(), attempt: e3.attempt++, rrwebMethod: e3.rrwebMethod }) : X.warn(Vs + " could not emit queued rrweb event.", t3, e3), false;
        }
      }
      _tryAddCustomEvent(e3, t3) {
        return this._tryRRWebMethod(js(() => this.rrwebRecord.addCustomEvent(e3, t3)));
      }
      _tryTakeFullSnapshot() {
        return this._tryRRWebMethod(js(() => this.rrwebRecord.takeFullSnapshot()));
      }
      _onScriptLoaded() {
        var e3, t3 = { blockClass: "ph-no-capture", blockSelector: void 0, ignoreClass: "ph-ignore-input", maskTextClass: "ph-mask", maskTextSelector: void 0, maskTextFn: void 0, maskAllInputs: true, maskInputOptions: { password: true }, maskInputFn: void 0, slimDOMOptions: {}, collectFonts: false, inlineStylesheet: true, recordCrossOriginIframes: false }, i3 = this.instance.config.session_recording;
        for (var [s3, r3] of Object.entries(i3 || {}))
          s3 in t3 && ("maskInputOptions" === s3 ? t3.maskInputOptions = ee({ password: true }, r3) : t3[s3] = r3);
        if (this.canvasRecording && this.canvasRecording.enabled && (t3.recordCanvas = true, t3.sampling = { canvas: this.canvasRecording.fps }, t3.dataURLOptions = { type: "image/webp", quality: this.canvasRecording.quality }), this.rrwebRecord) {
          this.mutationRateLimiter = null !== (e3 = this.mutationRateLimiter) && void 0 !== e3 ? e3 : new rs(this.rrwebRecord, { refillRate: this.instance.config.session_recording.__mutationRateLimiterRefillRate, bucketSize: this.instance.config.session_recording.__mutationRateLimiterBucketSize, onBlockedNode: (e4, t4) => {
            var i4 = "Too many mutations on node '".concat(e4, "'. Rate limiting. This could be due to SVG animations or something similar");
            X.info(i4, { node: t4 }), this.log(Vs + " " + i4, "warn");
          } });
          var n3 = this._gatherRRWebPlugins();
          this.stopRrweb = this.rrwebRecord(ee({ emit: (e4) => {
            this.onRRwebEmit(e4);
          }, plugins: n3 }, t3)), this._lastActivityTimestamp = Date.now(), this.isIdle = false, this._tryAddCustomEvent("$session_options", { sessionRecordingOptions: t3, activePlugins: n3.map((e4) => null == e4 ? void 0 : e4.name) }), this._tryAddCustomEvent("$posthog_config", { config: this.instance.config });
        } else
          X.error(Vs + "onScriptLoaded was called but rrwebRecord is not available. This indicates something has gone wrong.");
      }
      _scheduleFullSnapshot() {
        if (this._fullSnapshotTimer && clearInterval(this._fullSnapshotTimer), !this.isIdle) {
          var e3 = this.fullSnapshotIntervalMillis;
          e3 && (this._fullSnapshotTimer = setInterval(() => {
            this._tryTakeFullSnapshot();
          }, e3));
        }
      }
      _gatherRRWebPlugins() {
        var e3, t3, i3, s3, r3 = [], n3 = null === (e3 = h.__PosthogExtensions__) || void 0 === e3 || null === (t3 = e3.rrwebPlugins) || void 0 === t3 ? void 0 : t3.getRecordConsolePlugin;
        n3 && this.isConsoleLogCaptureEnabled && r3.push(n3());
        var o3 = null === (i3 = h.__PosthogExtensions__) || void 0 === i3 || null === (s3 = i3.rrwebPlugins) || void 0 === s3 ? void 0 : s3.getRecordNetworkPlugin;
        this.networkPayloadCapture && N(o3) && (!ct.includes(location.hostname) || this._forceAllowLocalhostNetworkCapture ? r3.push(o3(is(this.instance.config, this.networkPayloadCapture))) : X.info(Vs + " NetworkCapture not started because we are on localhost."));
        return r3;
      }
      onRRwebEmit(e3) {
        var t3;
        if (this._processQueuedEvents(), e3 && q(e3)) {
          if (e3.type === mi.Meta) {
            var i3 = this._maskUrl(e3.data.href);
            if (this._lastHref = i3, !i3)
              return;
            e3.data.href = i3;
          } else
            this._pageViewFallBack();
          if (this._checkUrlTriggerConditions(), "paused" !== this.status || function(e4) {
            return e4.type === mi.Custom && "recording paused" === e4.data.tag;
          }(e3)) {
            e3.type === mi.FullSnapshot && this._scheduleFullSnapshot(), e3.type === mi.FullSnapshot && "trigger_pending" === this.triggerStatus && this.clearBuffer();
            var s3 = this.mutationRateLimiter ? this.mutationRateLimiter.throttleMutations(e3) : e3;
            if (s3) {
              var r3 = function(e4) {
                var t4 = e4;
                if (t4 && q(t4) && 6 === t4.type && q(t4.data) && "rrweb/console@1" === t4.data.plugin) {
                  t4.data.payload.payload.length > 10 && (t4.data.payload.payload = t4.data.payload.payload.slice(0, 10), t4.data.payload.payload.push("...[truncated]"));
                  for (var i4 = [], s4 = 0; s4 < t4.data.payload.payload.length; s4++)
                    t4.data.payload.payload[s4] && t4.data.payload.payload[s4].length > 2e3 ? i4.push(t4.data.payload.payload[s4].slice(0, 2e3) + "...[truncated]") : i4.push(t4.data.payload.payload[s4]);
                  return t4.data.payload.payload = i4, e4;
                }
                return e4;
              }(s3);
              if (this._updateWindowAndSessionIds(r3), !this.isIdle || Qs(r3)) {
                if (Qs(r3)) {
                  var n3 = r3.data.payload;
                  if (n3) {
                    var o3 = n3.lastActivityTimestamp, a3 = n3.threshold;
                    r3.timestamp = o3 + a3;
                  }
                }
                var l3 = null === (t3 = this.instance.config.session_recording.compress_events) || void 0 === t3 || t3 ? function(e4) {
                  if (gi(e4) < 1024)
                    return e4;
                  try {
                    if (e4.type === mi.FullSnapshot)
                      return ee(ee({}, e4), {}, { data: Gs(e4.data), cv: "2024-10" });
                    if (e4.type === mi.IncrementalSnapshot && e4.data.source === bi.Mutation)
                      return ee(ee({}, e4), {}, { cv: "2024-10", data: ee(ee({}, e4.data), {}, { texts: Gs(e4.data.texts), attributes: Gs(e4.data.attributes), removes: Gs(e4.data.removes), adds: Gs(e4.data.adds) }) });
                    if (e4.type === mi.IncrementalSnapshot && e4.data.source === bi.StyleSheetRule)
                      return ee(ee({}, e4), {}, { cv: "2024-10", data: ee(ee({}, e4.data), {}, { adds: Gs(e4.data.adds), removes: Gs(e4.data.removes) }) });
                  } catch (e5) {
                    X.error(Vs + " could not compress event - will use uncompressed event", e5);
                  }
                  return e4;
                }(r3) : r3, u3 = { $snapshot_bytes: gi(l3), $snapshot_data: l3, $session_id: this.sessionId, $window_id: this.windowId };
                "disabled" !== this.status ? this._captureSnapshotBuffered(u3) : this.clearBuffer();
              }
            }
          }
        }
      }
      _pageViewFallBack() {
        if (!this.instance.config.capture_pageview && e) {
          var t3 = this._maskUrl(e.location.href);
          this._lastHref !== t3 && (this._tryAddCustomEvent("$url_changed", { href: t3 }), this._lastHref = t3);
        }
      }
      _processQueuedEvents() {
        if (this.queuedRRWebEvents.length) {
          var e3 = [...this.queuedRRWebEvents];
          this.queuedRRWebEvents = [], e3.forEach((e4) => {
            Date.now() - e4.enqueuedAt <= 2e3 && this._tryRRWebMethod(e4);
          });
        }
      }
      _maskUrl(e3) {
        var t3 = this.instance.config.session_recording;
        if (t3.maskNetworkRequestFn) {
          var i3, s3 = { url: e3 };
          return null === (i3 = s3 = t3.maskNetworkRequestFn(s3)) || void 0 === i3 ? void 0 : i3.url;
        }
        return e3;
      }
      clearBuffer() {
        return this.buffer = { size: 0, data: [], sessionId: this.sessionId, windowId: this.windowId }, this.buffer;
      }
      _flushBuffer() {
        this.flushBufferTimer && (clearTimeout(this.flushBufferTimer), this.flushBufferTimer = void 0);
        var e3 = this.minimumDuration, t3 = this.sessionDuration, i3 = V(t3) && t3 >= 0, s3 = V(e3) && i3 && t3 < e3;
        if ("buffering" === this.status || s3)
          return this.flushBufferTimer = setTimeout(() => {
            this._flushBuffer();
          }, 2e3), this.buffer;
        this.buffer.data.length > 0 && fi(this.buffer).forEach((e4) => {
          this._captureSnapshot({ $snapshot_bytes: e4.size, $snapshot_data: e4.data, $session_id: e4.sessionId, $window_id: e4.windowId });
        });
        return this.clearBuffer();
      }
      _captureSnapshotBuffered(e3) {
        var t3, i3 = 2 + ((null === (t3 = this.buffer) || void 0 === t3 ? void 0 : t3.data.length) || 0);
        !this.isIdle && (this.buffer.size + e3.$snapshot_bytes + i3 > 943718.4 || this.buffer.sessionId !== this.sessionId) && (this.buffer = this._flushBuffer()), this.buffer.size += e3.$snapshot_bytes, this.buffer.data.push(e3.$snapshot_data), this.flushBufferTimer || this.isIdle || (this.flushBufferTimer = setTimeout(() => {
          this._flushBuffer();
        }, 2e3));
      }
      _captureSnapshot(e3) {
        this.instance.capture("$snapshot", e3, { _url: this.instance.requestRouter.endpointFor("api", this._endpoint), _noTruncate: true, _batchKey: "recordings", skip_client_rate_limiting: true });
      }
      _checkUrlTriggerConditions() {
        if (void 0 !== e && e.location.href) {
          var t3 = e.location.href, i3 = "paused" === this.status, s3 = Js(t3, this._urlBlocklist);
          s3 && !i3 ? this._pauseRecording() : !s3 && i3 && this._resumeRecording(), Js(t3, this._urlTriggers) && this._activateTrigger("url");
        }
      }
      _activateTrigger(e3) {
        var t3, i3;
        "trigger_pending" === this.triggerStatus && (null === (t3 = this.instance) || void 0 === t3 || null === (i3 = t3.persistence) || void 0 === i3 || i3.register({ ["url" === e3 ? ye : we]: this.sessionId }), this._flushBuffer(), this._reportStarted(e3 + "_trigger_matched"));
      }
      _pauseRecording() {
        var e3, t3;
        "paused" !== this.status && (this._urlBlocked = true, null == o || null === (e3 = o.body) || void 0 === e3 || null === (t3 = e3.classList) || void 0 === t3 || t3.add("ph-no-capture"), clearInterval(this._fullSnapshotTimer), setTimeout(() => {
          this._flushBuffer();
        }, 100), X.info(Vs + " recording paused due to URL blocker"), this._tryAddCustomEvent("recording paused", { reason: "url blocker" }));
      }
      _resumeRecording() {
        var e3, t3;
        "paused" === this.status && (this._urlBlocked = false, null == o || null === (e3 = o.body) || void 0 === e3 || null === (t3 = e3.classList) || void 0 === t3 || t3.remove("ph-no-capture"), this._tryTakeFullSnapshot(), this._scheduleFullSnapshot(), this._tryAddCustomEvent("recording resumed", { reason: "left blocked url" }), X.info(Vs + " recording resumed"));
      }
      _addEventTriggerListener() {
        0 !== this._eventTriggers.length && j(this._removeEventTriggerCaptureHook) && (this._removeEventTriggerCaptureHook = this.instance.on("eventCaptured", (e3) => {
          try {
            this._eventTriggers.includes(e3.event) && this._activateTrigger("event");
          } catch (e4) {
            X.error(Vs + "Could not activate event trigger", e4);
          }
        }));
      }
      overrideLinkedFlag() {
        this._linkedFlagSeen = true, this._reportStarted("linked_flag_overridden");
      }
      overrideSampling() {
        var e3;
        null === (e3 = this.instance.persistence) || void 0 === e3 || e3.register({ [be]: true }), this._reportStarted("sampling_overridden");
      }
      overrideTrigger(e3) {
        this._activateTrigger(e3);
      }
      _reportStarted(e3, t3) {
        this.instance.register_for_session({ $session_recording_start_reason: e3 }), X.info(Vs + " " + e3.replace("_", " "), t3), b(["recording_initialized", "session_id_changed"], e3) || this._tryAddCustomEvent(e3, t3);
      }
    };
    Xs = class {
      constructor(e3) {
        this.instance = e3, this.instance.decideEndpointWasHit = this.instance._hasBootstrappedFeatureFlags();
      }
      call() {
        var e3 = { token: this.instance.config.token, distinct_id: this.instance.get_distinct_id(), groups: this.instance.getGroups(), person_properties: this.instance.get_property(ke), group_properties: this.instance.get_property(xe), disable_flags: this.instance.config.advanced_disable_feature_flags || this.instance.config.advanced_disable_feature_flags_on_first_load || void 0 };
        this.instance._send_request({ method: "POST", url: this.instance.requestRouter.endpointFor("api", "/decide/?v=3"), data: e3, compression: this.instance.config.disable_compression ? void 0 : R.Base64, timeout: this.instance.config.feature_flag_request_timeout_ms, callback: (e4) => this.parseDecideResponse(e4.json) });
      }
      parseDecideResponse(e3) {
        var t3 = this;
        this.instance.featureFlags.setReloadingPaused(false), this.instance.featureFlags._startReloadTimer();
        var i3 = !e3;
        if (this.instance.config.advanced_disable_feature_flags_on_first_load || this.instance.config.advanced_disable_feature_flags || this.instance.featureFlags.receivedFeatureFlags(null != e3 ? e3 : {}, i3), i3)
          X.error("Failed to fetch feature flags from PostHog.");
        else {
          if (!o || !o.body)
            return X.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout(() => {
              this.parseDecideResponse(e3);
            }, 500);
          if (this.instance._afterDecideResponse(e3), e3.siteApps)
            if (this.instance.config.opt_in_site_apps) {
              var s3 = function(e4, i4) {
                var s4, r4;
                h["__$$ph_site_app_".concat(e4)] = t3.instance, null === (s4 = h.__PosthogExtensions__) || void 0 === s4 || null === (r4 = s4.loadSiteApp) || void 0 === r4 || r4.call(s4, t3.instance, i4, (t4) => {
                  if (t4)
                    return X.error("Error while initializing PostHog app with config id ".concat(e4), t4);
                });
              };
              for (var { id: r3, url: n3 } of e3.siteApps)
                s3(r3, n3);
            } else
              e3.siteApps.length > 0 && X.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
        }
      }
    };
    Zs = null != e && e.location ? vt(e.location.hash, "__posthog") || vt(location.hash, "state") : null;
    er = "_postHogToolbarParams";
    !function(e3) {
      e3[e3.UNINITIALIZED = 0] = "UNINITIALIZED", e3[e3.LOADING = 1] = "LOADING", e3[e3.LOADED = 2] = "LOADED";
    }(Ks || (Ks = {}));
    tr = class {
      constructor(e3) {
        this.instance = e3;
      }
      setToolbarState(e3) {
        h.ph_toolbar_state = e3;
      }
      getToolbarState() {
        var e3;
        return null !== (e3 = h.ph_toolbar_state) && void 0 !== e3 ? e3 : Ks.UNINITIALIZED;
      }
      maybeLoadToolbar() {
        var t3, i3, s3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0, r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
        if (!e || !o)
          return false;
        s3 = null !== (t3 = s3) && void 0 !== t3 ? t3 : e.location, n3 = null !== (i3 = n3) && void 0 !== i3 ? i3 : e.history;
        try {
          if (!r3) {
            try {
              e.localStorage.setItem("test", "test"), e.localStorage.removeItem("test");
            } catch (e3) {
              return false;
            }
            r3 = null == e ? void 0 : e.localStorage;
          }
          var a3, l3 = Zs || vt(s3.hash, "__posthog") || vt(s3.hash, "state"), u3 = l3 ? w(() => JSON.parse(atob(decodeURIComponent(l3)))) || w(() => JSON.parse(decodeURIComponent(l3))) : null;
          return u3 && "ph_authorize" === u3.action ? ((a3 = u3).source = "url", a3 && Object.keys(a3).length > 0 && (u3.desiredHash ? s3.hash = u3.desiredHash : n3 ? n3.replaceState(n3.state, "", s3.pathname + s3.search) : s3.hash = "")) : ((a3 = JSON.parse(r3.getItem(er) || "{}")).source = "localstorage", delete a3.userIntent), !(!a3.token || this.instance.config.token !== a3.token) && (this.loadToolbar(a3), true);
        } catch (e3) {
          return false;
        }
      }
      _callLoadToolbar(e3) {
        (h.ph_load_toolbar || h.ph_load_editor)(e3, this.instance);
      }
      loadToolbar(t3) {
        var i3 = !(null == o || !o.getElementById(Le));
        if (!e || i3)
          return false;
        var s3 = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics, r3 = ee(ee({ token: this.instance.config.token }, t3), {}, { apiURL: this.instance.requestRouter.endpointFor("ui") }, s3 ? { instrument: false } : {});
        if (e.localStorage.setItem(er, JSON.stringify(ee(ee({}, r3), {}, { source: void 0 }))), this.getToolbarState() === Ks.LOADED)
          this._callLoadToolbar(r3);
        else if (this.getToolbarState() === Ks.UNINITIALIZED) {
          var n3, a3;
          this.setToolbarState(Ks.LOADING), null === (n3 = h.__PosthogExtensions__) || void 0 === n3 || null === (a3 = n3.loadExternalDependency) || void 0 === a3 || a3.call(n3, this.instance, "toolbar", (e3) => {
            if (e3)
              return X.error("Failed to load toolbar", e3), void this.setToolbarState(Ks.UNINITIALIZED);
            this.setToolbarState(Ks.LOADED), this._callLoadToolbar(r3);
          }), P(e, "turbolinks:load", () => {
            this.setToolbarState(Ks.UNINITIALIZED), this.loadToolbar(r3);
          });
        }
        return true;
      }
      _loadEditor(e3) {
        return this.loadToolbar(e3);
      }
      maybeLoadEditor() {
        var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0, t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, i3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
        return this.maybeLoadToolbar(e3, t3, i3);
      }
    };
    ir = class {
      constructor(e3) {
        te(this, "isPaused", true), te(this, "queue", []), te(this, "flushTimeoutMs", 3e3), this.sendRequest = e3;
      }
      enqueue(e3) {
        this.queue.push(e3), this.flushTimeout || this.setFlushTimeout();
      }
      unload() {
        this.clearFlushTimeout();
        var e3 = this.queue.length > 0 ? this.formatQueue() : {}, t3 = Object.values(e3), i3 = [...t3.filter((e4) => 0 === e4.url.indexOf("/e")), ...t3.filter((e4) => 0 !== e4.url.indexOf("/e"))];
        i3.map((e4) => {
          this.sendRequest(ee(ee({}, e4), {}, { transport: "sendBeacon" }));
        });
      }
      enable() {
        this.isPaused = false, this.setFlushTimeout();
      }
      setFlushTimeout() {
        var e3 = this;
        this.isPaused || (this.flushTimeout = setTimeout(() => {
          if (this.clearFlushTimeout(), this.queue.length > 0) {
            var t3 = this.formatQueue(), i3 = function(i4) {
              var s4 = t3[i4], r3 = (/* @__PURE__ */ new Date()).getTime();
              s4.data && D(s4.data) && f(s4.data, (e4) => {
                e4.offset = Math.abs(e4.timestamp - r3), delete e4.timestamp;
              }), e3.sendRequest(s4);
            };
            for (var s3 in t3)
              i3(s3);
          }
        }, this.flushTimeoutMs));
      }
      clearFlushTimeout() {
        clearTimeout(this.flushTimeout), this.flushTimeout = void 0;
      }
      formatQueue() {
        var e3 = {};
        return f(this.queue, (t3) => {
          var i3, s3 = t3, r3 = (s3 ? s3.batchKey : null) || s3.url;
          H(e3[r3]) && (e3[r3] = ee(ee({}, s3), {}, { data: [] })), null === (i3 = e3[r3].data) || void 0 === i3 || i3.push(s3.data);
        }), this.queue = [], e3;
      }
    };
    sr = !!u || !!l;
    rr = "text/plain";
    nr = (e3, t3) => {
      var [i3, s3] = e3.split("?"), r3 = ee({}, t3);
      null == s3 || s3.split("&").forEach((e4) => {
        var [t4] = e4.split("=");
        delete r3[t4];
      });
      var n3 = _t(r3);
      return n3 = n3 ? (s3 ? s3 + "&" : "") + n3 : s3, "".concat(i3, "?").concat(n3);
    };
    or = (e3) => {
      var { data: t3, compression: i3 } = e3;
      if (t3) {
        if (i3 === R.GZipJS) {
          var s3 = Hs(Us(JSON.stringify(t3)), { mtime: 0 }), r3 = new Blob([s3], { type: rr });
          return { contentType: rr, body: r3, estimatedSize: r3.size };
        }
        if (i3 === R.Base64) {
          var n3 = function(e4) {
            var t4, i4, s4, r4, n4, o4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a4 = 0, l3 = 0, u3 = "", c3 = [];
            if (!e4)
              return e4;
            e4 = I(e4);
            do {
              t4 = (n4 = e4.charCodeAt(a4++) << 16 | e4.charCodeAt(a4++) << 8 | e4.charCodeAt(a4++)) >> 18 & 63, i4 = n4 >> 12 & 63, s4 = n4 >> 6 & 63, r4 = 63 & n4, c3[l3++] = o4.charAt(t4) + o4.charAt(i4) + o4.charAt(s4) + o4.charAt(r4);
            } while (a4 < e4.length);
            switch (u3 = c3.join(""), e4.length % 3) {
              case 1:
                u3 = u3.slice(0, -2) + "==";
                break;
              case 2:
                u3 = u3.slice(0, -1) + "=";
            }
            return u3;
          }(JSON.stringify(t3)), o3 = ((e4) => "data=" + encodeURIComponent("string" == typeof e4 ? e4 : JSON.stringify(e4)))(n3);
          return { contentType: "application/x-www-form-urlencoded", body: o3, estimatedSize: new Blob([o3]).size };
        }
        var a3 = JSON.stringify(t3);
        return { contentType: "application/json", body: a3, estimatedSize: new Blob([a3]).size };
      }
    };
    ar = [];
    u && ar.push({ transport: "XHR", method: (e3) => {
      var t3, i3 = new u();
      i3.open(e3.method || "GET", e3.url, true);
      var { contentType: s3, body: r3 } = null !== (t3 = or(e3)) && void 0 !== t3 ? t3 : {};
      f(e3.headers, function(e4, t4) {
        i3.setRequestHeader(t4, e4);
      }), s3 && i3.setRequestHeader("Content-Type", s3), e3.timeout && (i3.timeout = e3.timeout), i3.withCredentials = true, i3.onreadystatechange = () => {
        if (4 === i3.readyState) {
          var t4, s4 = { statusCode: i3.status, text: i3.responseText };
          if (200 === i3.status)
            try {
              s4.json = JSON.parse(i3.responseText);
            } catch (e4) {
            }
          null === (t4 = e3.callback) || void 0 === t4 || t4.call(e3, s4);
        }
      }, i3.send(r3);
    } }), l && ar.push({ transport: "fetch", method: (e3) => {
      var t3, i3, { contentType: s3, body: r3, estimatedSize: n3 } = null !== (t3 = or(e3)) && void 0 !== t3 ? t3 : {}, o3 = new Headers();
      f(e3.headers, function(e4, t4) {
        o3.append(t4, e4);
      }), s3 && o3.append("Content-Type", s3);
      var a3 = e3.url, u3 = null;
      if (c) {
        var d3 = new c();
        u3 = { signal: d3.signal, timeout: setTimeout(() => d3.abort(), e3.timeout) };
      }
      l(a3, { method: (null == e3 ? void 0 : e3.method) || "GET", headers: o3, keepalive: "POST" === e3.method && (n3 || 0) < 52428.8, body: r3, signal: null === (i3 = u3) || void 0 === i3 ? void 0 : i3.signal }).then((t4) => t4.text().then((i4) => {
        var s4, r4 = { statusCode: t4.status, text: i4 };
        if (200 === t4.status)
          try {
            r4.json = JSON.parse(i4);
          } catch (e4) {
            X.error(e4);
          }
        null === (s4 = e3.callback) || void 0 === s4 || s4.call(e3, r4);
      })).catch((t4) => {
        var i4;
        X.error(t4), null === (i4 = e3.callback) || void 0 === i4 || i4.call(e3, { statusCode: 0, text: t4 });
      }).finally(() => u3 ? clearTimeout(u3.timeout) : null);
    } }), null != n && n.sendBeacon && ar.push({ transport: "sendBeacon", method: (e3) => {
      var t3 = nr(e3.url, { beacon: "1" });
      try {
        var i3, { contentType: s3, body: r3 } = null !== (i3 = or(e3)) && void 0 !== i3 ? i3 : {}, o3 = "string" == typeof r3 ? new Blob([r3], { type: s3 }) : r3;
        n.sendBeacon(t3, o3);
      } catch (e4) {
      }
    } });
    lr = ["retriesPerformedSoFar"];
    ur = class {
      constructor(t3) {
        te(this, "isPolling", false), te(this, "pollIntervalMs", 3e3), te(this, "queue", []), this.instance = t3, this.queue = [], this.areWeOnline = true, !H(e) && "onLine" in e.navigator && (this.areWeOnline = e.navigator.onLine, e.addEventListener("online", () => {
          this.areWeOnline = true, this.flush();
        }), e.addEventListener("offline", () => {
          this.areWeOnline = false;
        }));
      }
      retriableRequest(e3) {
        var { retriesPerformedSoFar: t3 } = e3, i3 = ie(e3, lr);
        V(t3) && t3 > 0 && (i3.url = nr(i3.url, { retry_count: t3 })), this.instance._send_request(ee(ee({}, i3), {}, { callback: (e4) => {
          var s3;
          200 !== e4.statusCode && (e4.statusCode < 400 || e4.statusCode >= 500) && (null != t3 ? t3 : 0) < 10 ? this.enqueue(ee({ retriesPerformedSoFar: t3 }, i3)) : null === (s3 = i3.callback) || void 0 === s3 || s3.call(i3, e4);
        } }));
      }
      enqueue(e3) {
        var t3 = e3.retriesPerformedSoFar || 0;
        e3.retriesPerformedSoFar = t3 + 1;
        var i3 = function(e4) {
          var t4 = 3e3 * Math.pow(2, e4), i4 = t4 / 2, s4 = Math.min(18e5, t4), r4 = (Math.random() - 0.5) * (s4 - i4);
          return Math.ceil(s4 + r4);
        }(t3), s3 = Date.now() + i3;
        this.queue.push({ retryAt: s3, requestOptions: e3 });
        var r3 = "Enqueued failed request for retry in ".concat(i3);
        navigator.onLine || (r3 += " (Browser is offline)"), X.warn(r3), this.isPolling || (this.isPolling = true, this.poll());
      }
      poll() {
        this.poller && clearTimeout(this.poller), this.poller = setTimeout(() => {
          this.areWeOnline && this.queue.length > 0 && this.flush(), this.poll();
        }, this.pollIntervalMs);
      }
      flush() {
        var e3 = Date.now(), t3 = [], i3 = this.queue.filter((i4) => i4.retryAt < e3 || (t3.push(i4), false));
        if (this.queue = t3, i3.length > 0)
          for (var { requestOptions: s3 } of i3)
            this.retriableRequest(s3);
      }
      unload() {
        for (var { requestOptions: e3 } of (this.poller && (clearTimeout(this.poller), this.poller = void 0), this.queue))
          try {
            this.instance._send_request(ee(ee({}, e3), {}, { transport: "sendBeacon" }));
          } catch (e4) {
            X.error(e4);
          }
        this.queue = [];
      }
    };
    dr = class {
      constructor(e3, t3, i3, s3) {
        var r3;
        te(this, "_sessionIdChangedHandlers", []), this.config = e3, this.persistence = t3, this._windowId = void 0, this._sessionId = void 0, this._sessionStartTimestamp = null, this._sessionActivityTimestamp = null, this._sessionIdGenerator = i3 || Je, this._windowIdGenerator = s3 || Je;
        var n3 = e3.persistence_name || e3.token, o3 = e3.session_idle_timeout_seconds || 1800;
        if (this._sessionTimeoutMs = 1e3 * ss(o3, 60, 1800, "session_idle_timeout_seconds"), this._window_id_storage_key = "ph_" + n3 + "_window_id", this._primary_window_exists_storage_key = "ph_" + n3 + "_primary_window_exists", this._canUseSessionStorage()) {
          var a3 = ut.parse(this._window_id_storage_key), l3 = ut.parse(this._primary_window_exists_storage_key);
          a3 && !l3 ? this._windowId = a3 : ut.remove(this._window_id_storage_key), ut.set(this._primary_window_exists_storage_key, true);
        }
        if (null !== (r3 = this.config.bootstrap) && void 0 !== r3 && r3.sessionID)
          try {
            var u3 = ((e4) => {
              var t4 = e4.replace(/-/g, "");
              if (32 !== t4.length)
                throw new Error("Not a valid UUID");
              if ("7" !== t4[12])
                throw new Error("Not a UUIDv7");
              return parseInt(t4.substring(0, 12), 16);
            })(this.config.bootstrap.sessionID);
            this._setSessionId(this.config.bootstrap.sessionID, (/* @__PURE__ */ new Date()).getTime(), u3);
          } catch (e4) {
            X.error("Invalid sessionID in bootstrap", e4);
          }
        this._listenToReloadWindow();
      }
      get sessionTimeoutMs() {
        return this._sessionTimeoutMs;
      }
      onSessionId(e3) {
        return H(this._sessionIdChangedHandlers) && (this._sessionIdChangedHandlers = []), this._sessionIdChangedHandlers.push(e3), this._sessionId && e3(this._sessionId, this._windowId), () => {
          this._sessionIdChangedHandlers = this._sessionIdChangedHandlers.filter((t3) => t3 !== e3);
        };
      }
      _canUseSessionStorage() {
        return "memory" !== this.config.persistence && !this.persistence.disabled && ut.is_supported();
      }
      _setWindowId(e3) {
        e3 !== this._windowId && (this._windowId = e3, this._canUseSessionStorage() && ut.set(this._window_id_storage_key, e3));
      }
      _getWindowId() {
        return this._windowId ? this._windowId : this._canUseSessionStorage() ? ut.parse(this._window_id_storage_key) : null;
      }
      _setSessionId(e3, t3, i3) {
        e3 === this._sessionId && t3 === this._sessionActivityTimestamp && i3 === this._sessionStartTimestamp || (this._sessionStartTimestamp = i3, this._sessionActivityTimestamp = t3, this._sessionId = e3, this.persistence.register({ [me]: [t3, e3, i3] }));
      }
      _getSessionId() {
        if (this._sessionId && this._sessionActivityTimestamp && this._sessionStartTimestamp)
          return [this._sessionActivityTimestamp, this._sessionId, this._sessionStartTimestamp];
        var e3 = this.persistence.props[me];
        return D(e3) && 2 === e3.length && e3.push(e3[0]), e3 || [0, null, 0];
      }
      resetSessionId() {
        this._setSessionId(null, null, null);
      }
      _listenToReloadWindow() {
        null == e || e.addEventListener("beforeunload", () => {
          this._canUseSessionStorage() && ut.remove(this._primary_window_exists_storage_key);
        });
      }
      checkAndGetSessionAndWindowId() {
        var e3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t3 = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null) || (/* @__PURE__ */ new Date()).getTime(), [i3, s3, r3] = this._getSessionId(), n3 = this._getWindowId(), o3 = V(r3) && r3 > 0 && Math.abs(t3 - r3) > 864e5, a3 = false, l3 = !s3, u3 = !e3 && Math.abs(t3 - i3) > this.sessionTimeoutMs;
        l3 || u3 || o3 ? (s3 = this._sessionIdGenerator(), n3 = this._windowIdGenerator(), X.info("[SessionId] new session ID generated", { sessionId: s3, windowId: n3, changeReason: { noSessionId: l3, activityTimeout: u3, sessionPastMaximumLength: o3 } }), r3 = t3, a3 = true) : n3 || (n3 = this._windowIdGenerator(), a3 = true);
        var c3 = 0 === i3 || !e3 || o3 ? t3 : i3, d3 = 0 === r3 ? (/* @__PURE__ */ new Date()).getTime() : r3;
        return this._setWindowId(n3), this._setSessionId(s3, c3, d3), a3 && this._sessionIdChangedHandlers.forEach((e4) => e4(s3, n3, a3 ? { noSessionId: l3, activityTimeout: u3, sessionPastMaximumLength: o3 } : void 0)), { sessionId: s3, windowId: n3, sessionStartTimestamp: d3, changeReason: a3 ? { noSessionId: l3, activityTimeout: u3, sessionPastMaximumLength: o3 } : void 0, lastActivityTimestamp: i3 };
      }
    };
    !function(e3) {
      e3.US = "us", e3.EU = "eu", e3.CUSTOM = "custom";
    }(cr || (cr = {}));
    hr = "i.posthog.com";
    _r = class {
      constructor(e3) {
        te(this, "_regionCache", {}), this.instance = e3;
      }
      get apiHost() {
        var e3 = this.instance.config.api_host.trim().replace(/\/$/, "");
        return "https://app.posthog.com" === e3 ? "https://us.i.posthog.com" : e3;
      }
      get uiHost() {
        var e3, t3 = null === (e3 = this.instance.config.ui_host) || void 0 === e3 ? void 0 : e3.replace(/\/$/, "");
        return t3 || (t3 = this.apiHost.replace(".".concat(hr), ".posthog.com")), "https://app.posthog.com" === t3 ? "https://us.posthog.com" : t3;
      }
      get region() {
        return this._regionCache[this.apiHost] || (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this._regionCache[this.apiHost] = cr.US : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this._regionCache[this.apiHost] = cr.EU : this._regionCache[this.apiHost] = cr.CUSTOM), this._regionCache[this.apiHost];
      }
      endpointFor(e3) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        if (t3 && (t3 = "/" === t3[0] ? t3 : "/".concat(t3)), "ui" === e3)
          return this.uiHost + t3;
        if (this.region === cr.CUSTOM)
          return this.apiHost + t3;
        var i3 = hr + t3;
        switch (e3) {
          case "assets":
            return "https://".concat(this.region, "-assets.").concat(i3);
          case "api":
            return "https://".concat(this.region, ".").concat(i3);
        }
      }
    };
    pr = "posthog-js";
    gr = class {
      constructor(e3, t3, i3, s3, r3) {
        this.name = pr, this.setupOnce = function(n3) {
          n3(vr(e3, { organization: t3, projectId: i3, prefix: s3, severityAllowList: r3 }));
        };
      }
    };
    wr = class {
      constructor(e3) {
        this._instance = e3;
      }
      doPageView(t3) {
        var i3, s3 = this._previousPageViewProperties(t3);
        return this._currentPath = null !== (i3 = null == e ? void 0 : e.location.pathname) && void 0 !== i3 ? i3 : "", this._instance.scrollManager.resetContext(), this._prevPageviewTimestamp = t3, s3;
      }
      doPageLeave(e3) {
        return this._previousPageViewProperties(e3);
      }
      _previousPageViewProperties(e3) {
        var t3 = this._currentPath, i3 = this._prevPageviewTimestamp, s3 = this._instance.scrollManager.getContext();
        if (!i3)
          return {};
        var r3 = {};
        if (s3) {
          var { maxScrollHeight: n3, lastScrollY: o3, maxScrollY: a3, maxContentHeight: l3, lastContentY: u3, maxContentY: c3 } = s3;
          if (!(H(n3) || H(o3) || H(a3) || H(l3) || H(u3) || H(c3)))
            n3 = Math.ceil(n3), o3 = Math.ceil(o3), a3 = Math.ceil(a3), l3 = Math.ceil(l3), u3 = Math.ceil(u3), c3 = Math.ceil(c3), r3 = { $prev_pageview_last_scroll: o3, $prev_pageview_last_scroll_percentage: n3 <= 1 ? 1 : ss(o3 / n3, 0, 1), $prev_pageview_max_scroll: a3, $prev_pageview_max_scroll_percentage: n3 <= 1 ? 1 : ss(a3 / n3, 0, 1), $prev_pageview_last_content: u3, $prev_pageview_last_content_percentage: l3 <= 1 ? 1 : ss(u3 / l3, 0, 1), $prev_pageview_max_content: c3, $prev_pageview_max_content_percentage: l3 <= 1 ? 1 : ss(c3 / l3, 0, 1) };
        }
        return t3 && (r3.$prev_pageview_pathname = t3), i3 && (r3.$prev_pageview_duration = (e3.getTime() - i3.getTime()) / 1e3), r3;
      }
    };
    !function(e3) {
      e3.Popover = "popover", e3.API = "api", e3.Widget = "widget";
    }(fr || (fr = {})), function(e3) {
      e3.Open = "open", e3.MultipleChoice = "multiple_choice", e3.SingleChoice = "single_choice", e3.Rating = "rating", e3.Link = "link";
    }(mr || (mr = {})), function(e3) {
      e3.NextQuestion = "next_question", e3.End = "end", e3.ResponseBased = "response_based", e3.SpecificQuestion = "specific_question";
    }(br || (br = {}));
    Sr = class {
      constructor() {
        te(this, "events", {}), this.events = {};
      }
      on(e3, t3) {
        return this.events[e3] || (this.events[e3] = []), this.events[e3].push(t3), () => {
          this.events[e3] = this.events[e3].filter((e4) => e4 !== t3);
        };
      }
      emit(e3, t3) {
        for (var i3 of this.events[e3] || [])
          i3(t3);
        for (var s3 of this.events["*"] || [])
          s3(e3, t3);
      }
    };
    Er = class _Er {
      constructor(e3) {
        te(this, "_debugEventEmitter", new Sr()), te(this, "checkStep", (e4, t3) => this.checkStepEvent(e4, t3) && this.checkStepUrl(e4, t3) && this.checkStepElement(e4, t3)), te(this, "checkStepEvent", (e4, t3) => null == t3 || !t3.event || (null == e4 ? void 0 : e4.event) === (null == t3 ? void 0 : t3.event)), this.instance = e3, this.actionEvents = /* @__PURE__ */ new Set(), this.actionRegistry = /* @__PURE__ */ new Set();
      }
      init() {
        var e3;
        if (!H(null === (e3 = this.instance) || void 0 === e3 ? void 0 : e3._addCaptureHook)) {
          var t3;
          null === (t3 = this.instance) || void 0 === t3 || t3._addCaptureHook((e4, t4) => {
            this.on(e4, t4);
          });
        }
      }
      register(e3) {
        var t3, i3;
        if (!H(null === (t3 = this.instance) || void 0 === t3 ? void 0 : t3._addCaptureHook) && (e3.forEach((e4) => {
          var t4, i4;
          null === (t4 = this.actionRegistry) || void 0 === t4 || t4.add(e4), null === (i4 = e4.steps) || void 0 === i4 || i4.forEach((e5) => {
            var t5;
            null === (t5 = this.actionEvents) || void 0 === t5 || t5.add((null == e5 ? void 0 : e5.event) || "");
          });
        }), null !== (i3 = this.instance) && void 0 !== i3 && i3.autocapture)) {
          var s3, r3 = /* @__PURE__ */ new Set();
          e3.forEach((e4) => {
            var t4;
            null === (t4 = e4.steps) || void 0 === t4 || t4.forEach((e5) => {
              null != e5 && e5.selector && r3.add(null == e5 ? void 0 : e5.selector);
            });
          }), null === (s3 = this.instance) || void 0 === s3 || s3.autocapture.setElementSelectors(r3);
        }
      }
      on(e3, t3) {
        var i3;
        null != t3 && 0 != e3.length && (this.actionEvents.has(e3) || this.actionEvents.has(null == t3 ? void 0 : t3.event)) && this.actionRegistry && (null === (i3 = this.actionRegistry) || void 0 === i3 ? void 0 : i3.size) > 0 && this.actionRegistry.forEach((e4) => {
          this.checkAction(t3, e4) && this._debugEventEmitter.emit("actionCaptured", e4.name);
        });
      }
      _addActionHook(e3) {
        this.onAction("actionCaptured", (t3) => e3(t3));
      }
      checkAction(e3, t3) {
        if (null == (null == t3 ? void 0 : t3.steps))
          return false;
        for (var i3 of t3.steps)
          if (this.checkStep(e3, i3))
            return true;
        return false;
      }
      onAction(e3, t3) {
        return this._debugEventEmitter.on(e3, t3);
      }
      checkStepUrl(e3, t3) {
        if (null != t3 && t3.url) {
          var i3, s3 = null == e3 || null === (i3 = e3.properties) || void 0 === i3 ? void 0 : i3.$current_url;
          if (!s3 || "string" != typeof s3)
            return false;
          if (!_Er.matchString(s3, null == t3 ? void 0 : t3.url, (null == t3 ? void 0 : t3.url_matching) || "contains"))
            return false;
        }
        return true;
      }
      static matchString(t3, i3, s3) {
        switch (s3) {
          case "regex":
            return !!e && ht(t3, i3);
          case "exact":
            return i3 === t3;
          case "contains":
            var r3 = _Er.escapeStringRegexp(i3).replace(/_/g, ".").replace(/%/g, ".*");
            return ht(t3, r3);
          default:
            return false;
        }
      }
      static escapeStringRegexp(e3) {
        return e3.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
      }
      checkStepElement(e3, t3) {
        if ((null != t3 && t3.href || null != t3 && t3.tag_name || null != t3 && t3.text) && !this.getElementsList(e3).some((e4) => !(null != t3 && t3.href && !_Er.matchString(e4.href || "", null == t3 ? void 0 : t3.href, (null == t3 ? void 0 : t3.href_matching) || "exact")) && ((null == t3 || !t3.tag_name || e4.tag_name === (null == t3 ? void 0 : t3.tag_name)) && !(null != t3 && t3.text && !_Er.matchString(e4.text || "", null == t3 ? void 0 : t3.text, (null == t3 ? void 0 : t3.text_matching) || "exact") && !_Er.matchString(e4.$el_text || "", null == t3 ? void 0 : t3.text, (null == t3 ? void 0 : t3.text_matching) || "exact")))))
          return false;
        if (null != t3 && t3.selector) {
          var i3, s3 = null == e3 || null === (i3 = e3.properties) || void 0 === i3 ? void 0 : i3.$element_selectors;
          if (!s3)
            return false;
          if (!s3.includes(null == t3 ? void 0 : t3.selector))
            return false;
        }
        return true;
      }
      getElementsList(e3) {
        return null == (null == e3 ? void 0 : e3.properties.$elements) ? [] : null == e3 ? void 0 : e3.properties.$elements;
      }
    };
    kr = class _kr {
      constructor(e3) {
        this.instance = e3, this.eventToSurveys = /* @__PURE__ */ new Map(), this.actionToSurveys = /* @__PURE__ */ new Map();
      }
      register(e3) {
        var t3;
        H(null === (t3 = this.instance) || void 0 === t3 ? void 0 : t3._addCaptureHook) || (this.setupEventBasedSurveys(e3), this.setupActionBasedSurveys(e3));
      }
      setupActionBasedSurveys(e3) {
        var t3 = e3.filter((e4) => {
          var t4, i3, s3, r3;
          return (null === (t4 = e4.conditions) || void 0 === t4 ? void 0 : t4.actions) && (null === (i3 = e4.conditions) || void 0 === i3 || null === (s3 = i3.actions) || void 0 === s3 || null === (r3 = s3.values) || void 0 === r3 ? void 0 : r3.length) > 0;
        });
        if (0 !== t3.length) {
          if (null == this.actionMatcher) {
            this.actionMatcher = new Er(this.instance), this.actionMatcher.init();
            this.actionMatcher._addActionHook((e4) => {
              this.onAction(e4);
            });
          }
          t3.forEach((e4) => {
            var t4, i3, s3, r3, n3, o3, a3, l3, u3, c3;
            e4.conditions && null !== (t4 = e4.conditions) && void 0 !== t4 && t4.actions && null !== (i3 = e4.conditions) && void 0 !== i3 && null !== (s3 = i3.actions) && void 0 !== s3 && s3.values && (null === (r3 = e4.conditions) || void 0 === r3 || null === (n3 = r3.actions) || void 0 === n3 || null === (o3 = n3.values) || void 0 === o3 ? void 0 : o3.length) > 0 && (null === (a3 = this.actionMatcher) || void 0 === a3 || a3.register(e4.conditions.actions.values), null === (l3 = e4.conditions) || void 0 === l3 || null === (u3 = l3.actions) || void 0 === u3 || null === (c3 = u3.values) || void 0 === c3 || c3.forEach((t5) => {
              if (t5 && t5.name) {
                var i4 = this.actionToSurveys.get(t5.name);
                i4 && i4.push(e4.id), this.actionToSurveys.set(t5.name, i4 || [e4.id]);
              }
            }));
          });
        }
      }
      setupEventBasedSurveys(e3) {
        var t3;
        if (0 !== e3.filter((e4) => {
          var t4, i3, s3, r3;
          return (null === (t4 = e4.conditions) || void 0 === t4 ? void 0 : t4.events) && (null === (i3 = e4.conditions) || void 0 === i3 || null === (s3 = i3.events) || void 0 === s3 || null === (r3 = s3.values) || void 0 === r3 ? void 0 : r3.length) > 0;
        }).length) {
          null === (t3 = this.instance) || void 0 === t3 || t3._addCaptureHook((e4, t4) => {
            this.onEvent(e4, t4);
          }), e3.forEach((e4) => {
            var t4, i3, s3;
            null === (t4 = e4.conditions) || void 0 === t4 || null === (i3 = t4.events) || void 0 === i3 || null === (s3 = i3.values) || void 0 === s3 || s3.forEach((t5) => {
              if (t5 && t5.name) {
                var i4 = this.eventToSurveys.get(t5.name);
                i4 && i4.push(e4.id), this.eventToSurveys.set(t5.name, i4 || [e4.id]);
              }
            });
          });
        }
      }
      onEvent(e3, t3) {
        var i3, s3, r3 = (null === (i3 = this.instance) || void 0 === i3 || null === (s3 = i3.persistence) || void 0 === s3 ? void 0 : s3.props[Pe]) || [];
        if (_kr.SURVEY_SHOWN_EVENT_NAME == e3 && t3 && r3.length > 0) {
          var n3, o3 = null == t3 || null === (n3 = t3.properties) || void 0 === n3 ? void 0 : n3.$survey_id;
          if (o3) {
            var a3 = r3.indexOf(o3);
            a3 >= 0 && (r3.splice(a3, 1), this._updateActivatedSurveys(r3));
          }
        } else
          this.eventToSurveys.has(e3) && this._updateActivatedSurveys(r3.concat(this.eventToSurveys.get(e3) || []));
      }
      onAction(e3) {
        var t3, i3, s3 = (null === (t3 = this.instance) || void 0 === t3 || null === (i3 = t3.persistence) || void 0 === i3 ? void 0 : i3.props[Pe]) || [];
        this.actionToSurveys.has(e3) && this._updateActivatedSurveys(s3.concat(this.actionToSurveys.get(e3) || []));
      }
      _updateActivatedSurveys(e3) {
        var t3, i3;
        null === (t3 = this.instance) || void 0 === t3 || null === (i3 = t3.persistence) || void 0 === i3 || i3.register({ [Pe]: [...new Set(e3)] });
      }
      getSurveys() {
        var e3, t3, i3 = null === (e3 = this.instance) || void 0 === e3 || null === (t3 = e3.persistence) || void 0 === t3 ? void 0 : t3.props[Pe];
        return i3 || [];
      }
      getEventToSurveys() {
        return this.eventToSurveys;
      }
      _getActionMatcher() {
        return this.actionMatcher;
      }
    };
    te(kr, "SURVEY_SHOWN_EVENT_NAME", "survey shown");
    Mr = {};
    Ar = [];
    Or = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    Lr = Array.isArray;
    xr = Ar.slice, Ir = { __e: function(e3, t3, i3, s3) {
      for (var r3, n3, o3; t3 = t3.__; )
        if ((r3 = t3.__c) && !r3.__)
          try {
            if ((n3 = r3.constructor) && null != n3.getDerivedStateFromError && (r3.setState(n3.getDerivedStateFromError(e3)), o3 = r3.__d), null != r3.componentDidCatch && (r3.componentDidCatch(e3, s3 || {}), o3 = r3.__d), o3)
              return r3.__E = r3;
          } catch (t4) {
            e3 = t4;
          }
      throw e3;
    } }, Pr = 0, Hr.prototype.setState = function(e3, t3) {
      var i3;
      i3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = Dr({}, this.state), "function" == typeof e3 && (e3 = e3(Dr({}, i3), this.props)), e3 && Dr(i3, e3), null != e3 && this.__v && (t3 && this._sb.push(t3), zr(this));
    }, Hr.prototype.forceUpdate = function(e3) {
      this.__v && (this.__e = true, e3 && this.__h.push(e3), zr(this));
    }, Hr.prototype.render = Br, Fr = [], Cr = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Tr = function(e3, t3) {
      return e3.__v.__b - t3.__v.__b;
    }, jr.__r = 0, $r = 0;
    !function(e3, t3) {
      var i3 = { __c: t3 = "__cC" + $r++, __: e3, Consumer: function(e4, t4) {
        return e4.children(t4);
      }, Provider: function(e4) {
        var i4, s3;
        return this.getChildContext || (i4 = [], (s3 = {})[t3] = this, this.getChildContext = function() {
          return s3;
        }, this.shouldComponentUpdate = function(e5) {
          this.props.value !== e5.value && i4.some(function(e6) {
            e6.__e = true, zr(e6);
          });
        }, this.sub = function(e5) {
          i4.push(e5);
          var t4 = e5.componentWillUnmount;
          e5.componentWillUnmount = function() {
            i4.splice(i4.indexOf(e5), 1), t4 && t4.call(e5);
          };
        }), e4.children;
      } };
      i3.Provider.__ = i3.Consumer.contextType = i3;
    }({ isPreviewMode: false, previewPageIndex: 0, handleCloseSurveyPopup: () => {
    }, isPopup: true });
    an = "[Surveys]";
    ln = { icontains: (t3) => !!e && e.location.href.toLowerCase().indexOf(t3.toLowerCase()) > -1, not_icontains: (t3) => !!e && -1 === e.location.href.toLowerCase().indexOf(t3.toLowerCase()), regex: (t3) => !!e && ht(e.location.href, t3), not_regex: (t3) => !!e && !ht(e.location.href, t3), exact: (t3) => (null == e ? void 0 : e.location.href) === t3, is_not: (t3) => (null == e ? void 0 : e.location.href) !== t3 };
    un = class {
      constructor(e3) {
        this.instance = e3, this._surveyEventReceiver = null;
      }
      afterDecideResponse(e3) {
        this._decideServerResponse = !!e3.surveys, this.loadIfEnabled();
      }
      reset() {
        localStorage.removeItem("lastSeenSurveyDate");
        var e3 = (() => {
          for (var e4 = [], t3 = 0; t3 < localStorage.length; t3++) {
            var i3 = localStorage.key(t3);
            null != i3 && i3.startsWith("seenSurvey_") && e4.push(i3);
          }
          return e4;
        })();
        e3.forEach((e4) => localStorage.removeItem(e4));
      }
      loadIfEnabled() {
        var e3, t3, i3, s3 = null == h || null === (e3 = h.__PosthogExtensions__) || void 0 === e3 ? void 0 : e3.generateSurveys;
        this.instance.config.disable_surveys || !this._decideServerResponse || s3 || (null == this._surveyEventReceiver && (this._surveyEventReceiver = new kr(this.instance)), null === (t3 = h.__PosthogExtensions__) || void 0 === t3 || null === (i3 = t3.loadExternalDependency) || void 0 === i3 || i3.call(t3, this.instance, "surveys", (e4) => {
          var t4, i4;
          if (e4)
            return X.error(an, "Could not load surveys script", e4);
          this._surveyManager = null === (t4 = h.__PosthogExtensions__) || void 0 === t4 || null === (i4 = t4.generateSurveys) || void 0 === i4 ? void 0 : i4.call(t4, this.instance);
        }));
      }
      getSurveys(e3) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (this.instance.config.disable_surveys)
          return e3([]);
        null == this._surveyEventReceiver && (this._surveyEventReceiver = new kr(this.instance));
        var i3 = this.instance.get_property(Ie);
        if (i3 && !t3)
          return e3(i3);
        this.instance._send_request({ url: this.instance.requestRouter.endpointFor("api", "/api/surveys/?token=".concat(this.instance.config.token)), method: "GET", transport: "XHR", callback: (t4) => {
          var i4;
          if (200 !== t4.statusCode || !t4.json)
            return e3([]);
          var s3, r3 = t4.json.surveys || [], n3 = r3.filter((e4) => {
            var t5, i5, s4, r4, n4, o3, a3, l3, u3, c3, d3, h3;
            return (null === (t5 = e4.conditions) || void 0 === t5 ? void 0 : t5.events) && (null === (i5 = e4.conditions) || void 0 === i5 || null === (s4 = i5.events) || void 0 === s4 ? void 0 : s4.values) && (null === (r4 = e4.conditions) || void 0 === r4 || null === (n4 = r4.events) || void 0 === n4 || null === (o3 = n4.values) || void 0 === o3 ? void 0 : o3.length) > 0 || (null === (a3 = e4.conditions) || void 0 === a3 ? void 0 : a3.actions) && (null === (l3 = e4.conditions) || void 0 === l3 || null === (u3 = l3.actions) || void 0 === u3 ? void 0 : u3.values) && (null === (c3 = e4.conditions) || void 0 === c3 || null === (d3 = c3.actions) || void 0 === d3 || null === (h3 = d3.values) || void 0 === h3 ? void 0 : h3.length) > 0;
          });
          n3.length > 0 && (null === (s3 = this._surveyEventReceiver) || void 0 === s3 || s3.register(n3));
          return null === (i4 = this.instance.persistence) || void 0 === i4 || i4.register({ [Ie]: r3 }), e3(r3);
        } });
      }
      getActiveMatchingSurveys(e3) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.getSurveys((t4) => {
          var i3, s3 = t4.filter((e4) => !(!e4.start_date || e4.end_date)).filter((e4) => {
            var t5, i4, s4, r4;
            if (!e4.conditions)
              return true;
            var n4 = null === (t5 = e4.conditions) || void 0 === t5 || !t5.url || ln[null !== (i4 = null === (s4 = e4.conditions) || void 0 === s4 ? void 0 : s4.urlMatchType) && void 0 !== i4 ? i4 : "icontains"](e4.conditions.url), a3 = null === (r4 = e4.conditions) || void 0 === r4 || !r4.selector || (null == o ? void 0 : o.querySelector(e4.conditions.selector));
            return n4 && a3;
          }), r3 = null === (i3 = this._surveyEventReceiver) || void 0 === i3 ? void 0 : i3.getSurveys(), n3 = s3.filter((e4) => {
            var t5, i4, s4, n4, o3, a3, l3, u3, c3, d3, h3;
            if (!(e4.linked_flag_key || e4.targeting_flag_key || e4.internal_targeting_flag_key || null !== (t5 = e4.feature_flag_keys) && void 0 !== t5 && t5.length))
              return true;
            var _3 = !e4.linked_flag_key || this.instance.featureFlags.isFeatureEnabled(e4.linked_flag_key), p3 = !e4.targeting_flag_key || this.instance.featureFlags.isFeatureEnabled(e4.targeting_flag_key), v3 = (null === (i4 = e4.conditions) || void 0 === i4 ? void 0 : i4.events) && (null === (s4 = e4.conditions) || void 0 === s4 || null === (n4 = s4.events) || void 0 === n4 ? void 0 : n4.values) && (null === (o3 = e4.conditions) || void 0 === o3 || null === (a3 = o3.events) || void 0 === a3 ? void 0 : a3.values.length) > 0, g3 = (null === (l3 = e4.conditions) || void 0 === l3 ? void 0 : l3.actions) && (null === (u3 = e4.conditions) || void 0 === u3 || null === (c3 = u3.actions) || void 0 === c3 ? void 0 : c3.values) && (null === (d3 = e4.conditions) || void 0 === d3 || null === (h3 = d3.actions) || void 0 === h3 ? void 0 : h3.values.length) > 0, f3 = !v3 && !g3 || (null == r3 ? void 0 : r3.includes(e4.id)), m3 = this._canActivateRepeatedly(e4), b3 = !(e4.internal_targeting_flag_key && !m3) || this.instance.featureFlags.isFeatureEnabled(e4.internal_targeting_flag_key), y3 = this.checkFlags(e4);
            return _3 && p3 && b3 && f3 && y3;
          });
          return e3(n3);
        }, t3);
      }
      checkFlags(e3) {
        var t3;
        return null === (t3 = e3.feature_flag_keys) || void 0 === t3 || !t3.length || e3.feature_flag_keys.every((e4) => {
          var { key: t4, value: i3 } = e4;
          return !t4 || !i3 || this.instance.featureFlags.isFeatureEnabled(i3);
        });
      }
      getNextSurveyStep(e3, t3, i3) {
        var s3, r3 = e3.questions[t3], n3 = t3 + 1;
        if (null === (s3 = r3.branching) || void 0 === s3 || !s3.type)
          return t3 === e3.questions.length - 1 ? br.End : n3;
        if (r3.branching.type === br.End)
          return br.End;
        if (r3.branching.type === br.SpecificQuestion) {
          if (Number.isInteger(r3.branching.index))
            return r3.branching.index;
        } else if (r3.branching.type === br.ResponseBased) {
          if (r3.type === mr.SingleChoice) {
            var o3, a3, l3 = r3.choices.indexOf("".concat(i3));
            if (null !== (o3 = r3.branching) && void 0 !== o3 && null !== (a3 = o3.responseValues) && void 0 !== a3 && a3.hasOwnProperty(l3)) {
              var u3 = r3.branching.responseValues[l3];
              return Number.isInteger(u3) ? u3 : u3 === br.End ? br.End : n3;
            }
          } else if (r3.type === mr.Rating) {
            var c3, d3;
            if ("number" != typeof i3 || !Number.isInteger(i3))
              throw new Error("The response type must be an integer");
            var h3 = function(e4, t4) {
              if (3 === t4) {
                if (e4 < 1 || e4 > 3)
                  throw new Error("The response must be in range 1-3");
                return 1 === e4 ? "negative" : 2 === e4 ? "neutral" : "positive";
              }
              if (5 === t4) {
                if (e4 < 1 || e4 > 5)
                  throw new Error("The response must be in range 1-5");
                return e4 <= 2 ? "negative" : 3 === e4 ? "neutral" : "positive";
              }
              if (7 === t4) {
                if (e4 < 1 || e4 > 7)
                  throw new Error("The response must be in range 1-7");
                return e4 <= 3 ? "negative" : 4 === e4 ? "neutral" : "positive";
              }
              if (10 === t4) {
                if (e4 < 0 || e4 > 10)
                  throw new Error("The response must be in range 0-10");
                return e4 <= 6 ? "detractors" : e4 <= 8 ? "passives" : "promoters";
              }
              throw new Error("The scale must be one of: 3, 5, 7, 10");
            }(i3, r3.scale);
            if (null !== (c3 = r3.branching) && void 0 !== c3 && null !== (d3 = c3.responseValues) && void 0 !== d3 && d3.hasOwnProperty(h3)) {
              var _3 = r3.branching.responseValues[h3];
              return Number.isInteger(_3) ? _3 : _3 === br.End ? br.End : n3;
            }
          }
          return n3;
        }
        return X.warn(an, "Falling back to next question index due to unexpected branching type"), n3;
      }
      _canActivateRepeatedly(e3) {
        var t3;
        return j(null === (t3 = h.__PosthogExtensions__) || void 0 === t3 ? void 0 : t3.canActivateRepeatedly) ? (X.warn(an, "canActivateRepeatedly is not defined, must init before calling"), false) : h.__PosthogExtensions__.canActivateRepeatedly(e3);
      }
      canRenderSurvey(e3) {
        j(this._surveyManager) ? X.warn(an, "canActivateRepeatedly is not defined, must init before calling") : this.getSurveys((t3) => {
          var i3 = t3.filter((t4) => t4.id === e3)[0];
          this._surveyManager.canRenderSurvey(i3);
        });
      }
      renderSurvey(e3, t3) {
        j(this._surveyManager) ? X.warn(an, "canActivateRepeatedly is not defined, must init before calling") : this.getSurveys((i3) => {
          var s3 = i3.filter((t4) => t4.id === e3)[0];
          this._surveyManager.renderSurvey(s3, null == o ? void 0 : o.querySelector(t3));
        });
      }
    };
    cn = class {
      constructor(e3) {
        var t3, i3;
        te(this, "serverLimits", {}), te(this, "lastEventRateLimited", false), te(this, "checkForLimiting", (e4) => {
          var t4 = e4.text;
          if (t4 && t4.length)
            try {
              (JSON.parse(t4).quota_limited || []).forEach((e5) => {
                X.info("[RateLimiter] ".concat(e5 || "events", " is quota limited.")), this.serverLimits[e5] = (/* @__PURE__ */ new Date()).getTime() + 6e4;
              });
            } catch (e5) {
              return void X.warn('[RateLimiter] could not rate limit - continuing. Error: "'.concat(null == e5 ? void 0 : e5.message, '"'), { text: t4 });
            }
        }), this.instance = e3, this.captureEventsPerSecond = (null === (t3 = e3.config.rate_limiting) || void 0 === t3 ? void 0 : t3.events_per_second) || 10, this.captureEventsBurstLimit = Math.max((null === (i3 = e3.config.rate_limiting) || void 0 === i3 ? void 0 : i3.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond), this.lastEventRateLimited = this.clientRateLimitContext(true).isRateLimited;
      }
      clientRateLimitContext() {
        var e3, t3, i3, s3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r3 = (/* @__PURE__ */ new Date()).getTime(), n3 = null !== (e3 = null === (t3 = this.instance.persistence) || void 0 === t3 ? void 0 : t3.get_property(Te)) && void 0 !== e3 ? e3 : { tokens: this.captureEventsBurstLimit, last: r3 };
        n3.tokens += (r3 - n3.last) / 1e3 * this.captureEventsPerSecond, n3.last = r3, n3.tokens > this.captureEventsBurstLimit && (n3.tokens = this.captureEventsBurstLimit);
        var o3 = n3.tokens < 1;
        return o3 || s3 || (n3.tokens = Math.max(0, n3.tokens - 1)), !o3 || this.lastEventRateLimited || s3 || this.instance.capture("$$client_ingestion_warning", { $$client_ingestion_warning_message: "posthog-js client rate limited. Config is set to ".concat(this.captureEventsPerSecond, " events per second and ").concat(this.captureEventsBurstLimit, " events burst limit.") }, { skip_client_rate_limiting: true }), this.lastEventRateLimited = o3, null === (i3 = this.instance.persistence) || void 0 === i3 || i3.set_property(Te, n3), { isRateLimited: o3, remainingTokens: n3.tokens };
      }
      isServerRateLimited(e3) {
        var t3 = this.serverLimits[e3 || "events"] || false;
        return false !== t3 && (/* @__PURE__ */ new Date()).getTime() < t3;
      }
    };
    dn = () => ee({ initialPathName: (null == a ? void 0 : a.pathname) || "", referringDomain: _i.referringDomain() }, _i.campaignParams());
    hn = class {
      constructor(e3, t3, i3) {
        te(this, "_onSessionIdCallback", (e4) => {
          var t4 = this._getStoredProps();
          if (!t4 || t4.sessionId !== e4) {
            var i4 = { sessionId: e4, props: this._sessionSourceParamGenerator() };
            this._persistence.register({ [Ce]: i4 });
          }
        }), this._sessionIdManager = e3, this._persistence = t3, this._sessionSourceParamGenerator = i3 || dn, this._sessionIdManager.onSessionId(this._onSessionIdCallback);
      }
      _getStoredProps() {
        return this._persistence.props[Ce];
      }
      getSessionProps() {
        var e3, t3 = null === (e3 = this._getStoredProps()) || void 0 === e3 ? void 0 : e3.props;
        return t3 ? { $client_session_initial_referring_host: t3.referringDomain, $client_session_initial_pathname: t3.initialPathName, $client_session_initial_utm_source: t3.utm_source, $client_session_initial_utm_campaign: t3.utm_campaign, $client_session_initial_utm_medium: t3.utm_medium, $client_session_initial_utm_content: t3.utm_content, $client_session_initial_utm_term: t3.utm_term } : {};
      }
    };
    _n = ["ahrefsbot", "ahrefssiteaudit", "applebot", "baiduspider", "bingbot", "bingpreview", "bot.htm", "bot.php", "crawler", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "gptbot", "http://yandex.com/bots", "hubspot", "ia_archiver", "linkedinbot", "mj12bot", "msnbot", "nessus", "petalbot", "pinterest", "prerender", "rogerbot", "screaming frog", "semrushbot", "sitebulb", "slurp", "turnitin", "twitterbot", "vercelbot", "yahoo! slurp", "yandexbot", "headlesschrome", "cypress", "Google-HotelAdsVerifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleweblight", "mediapartners-google", "storebot-google", "Bytespider;"];
    pn = function(e3, t3) {
      if (!e3)
        return false;
      var i3 = e3.toLowerCase();
      return _n.concat(t3 || []).some((e4) => {
        var t4 = e4.toLowerCase();
        return -1 !== i3.indexOf(t4);
      });
    };
    vn = function(e3, t3) {
      if (!e3)
        return false;
      var i3 = e3.userAgent;
      if (i3 && pn(i3, t3))
        return true;
      try {
        var s3 = null == e3 ? void 0 : e3.userAgentData;
        if (null != s3 && s3.brands && s3.brands.some((e4) => pn(null == e4 ? void 0 : e4.brand, t3)))
          return true;
      } catch (e4) {
      }
      return !!e3.webdriver;
    };
    gn = class {
      constructor() {
        this.clicks = [];
      }
      isRageClick(e3, t3, i3) {
        var s3 = this.clicks[this.clicks.length - 1];
        if (s3 && Math.abs(e3 - s3.x) + Math.abs(t3 - s3.y) < 30 && i3 - s3.timestamp < 1e3) {
          if (this.clicks.push({ x: e3, y: t3, timestamp: i3 }), 3 === this.clicks.length)
            return true;
        } else
          this.clicks = [{ x: e3, y: t3, timestamp: i3 }];
        return false;
      }
    };
    fn = "[Dead Clicks]";
    mn = () => true;
    bn = (e3) => {
      var t3, i3 = !(null === (t3 = e3.instance.persistence) || void 0 === t3 || !t3.get_property(ce)), s3 = e3.instance.config.capture_dead_clicks;
      return G(s3) ? s3 : i3;
    };
    yn = class {
      get lazyLoadedDeadClicksAutocapture() {
        return this._lazyLoadedDeadClicksAutocapture;
      }
      constructor(e3, t3, i3) {
        this.instance = e3, this.isEnabled = t3, this.onCapture = i3, this.startIfEnabled();
      }
      afterDecideResponse(e3) {
        this.instance.persistence && this.instance.persistence.register({ [ce]: null == e3 ? void 0 : e3.captureDeadClicks }), this.startIfEnabled();
      }
      startIfEnabled() {
        this.isEnabled(this) && this.loadScript(() => {
          this.start();
        });
      }
      loadScript(e3) {
        var t3, i3, s3;
        null !== (t3 = h.__PosthogExtensions__) && void 0 !== t3 && t3.initDeadClicksAutocapture && e3(), null === (i3 = h.__PosthogExtensions__) || void 0 === i3 || null === (s3 = i3.loadExternalDependency) || void 0 === s3 || s3.call(i3, this.instance, "dead-clicks-autocapture", (t4) => {
          t4 ? X.error(fn + " failed to load script", t4) : e3();
        });
      }
      start() {
        var e3;
        if (o) {
          if (!this._lazyLoadedDeadClicksAutocapture && null !== (e3 = h.__PosthogExtensions__) && void 0 !== e3 && e3.initDeadClicksAutocapture) {
            var t3 = q(this.instance.config.capture_dead_clicks) ? this.instance.config.capture_dead_clicks : {};
            t3.__onCapture = this.onCapture, this._lazyLoadedDeadClicksAutocapture = h.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, t3), this._lazyLoadedDeadClicksAutocapture.start(o), X.info("".concat(fn, " starting..."));
          }
        } else
          X.error(fn + " `document` not found. Cannot start.");
      }
      stop() {
        this._lazyLoadedDeadClicksAutocapture && (this._lazyLoadedDeadClicksAutocapture.stop(), this._lazyLoadedDeadClicksAutocapture = void 0, X.info("".concat(fn, " stopping...")));
      }
    };
    wn = class {
      constructor(t3) {
        var i3;
        te(this, "rageclicks", new gn()), te(this, "_enabledServerSide", false), te(this, "_initialized", false), te(this, "_flushInterval", null), this.instance = t3, this._enabledServerSide = !(null === (i3 = this.instance.persistence) || void 0 === i3 || !i3.props[ae]), null == e || e.addEventListener("beforeunload", () => {
          this.flush();
        });
      }
      get flushIntervalMilliseconds() {
        var e3 = 5e3;
        return q(this.instance.config.capture_heatmaps) && this.instance.config.capture_heatmaps.flush_interval_milliseconds && (e3 = this.instance.config.capture_heatmaps.flush_interval_milliseconds), e3;
      }
      get isEnabled() {
        return H(this.instance.config.capture_heatmaps) ? H(this.instance.config.enable_heatmaps) ? this._enabledServerSide : this.instance.config.enable_heatmaps : false !== this.instance.config.capture_heatmaps;
      }
      startIfEnabled() {
        if (this.isEnabled) {
          if (this._initialized)
            return;
          X.info("[heatmaps] starting..."), this._setupListeners(), this._flushInterval = setInterval(this.flush.bind(this), this.flushIntervalMilliseconds);
        } else {
          var e3, t3;
          clearInterval(null !== (e3 = this._flushInterval) && void 0 !== e3 ? e3 : void 0), null === (t3 = this.deadClicksCapture) || void 0 === t3 || t3.stop(), this.getAndClearBuffer();
        }
      }
      afterDecideResponse(e3) {
        var t3 = !!e3.heatmaps;
        this.instance.persistence && this.instance.persistence.register({ [ae]: t3 }), this._enabledServerSide = t3, this.startIfEnabled();
      }
      getAndClearBuffer() {
        var e3 = this.buffer;
        return this.buffer = void 0, e3;
      }
      _onDeadClick(e3) {
        this._onClick(e3.originalEvent, "deadclick");
      }
      _setupListeners() {
        e && o && (P(o, "click", (t3) => this._onClick(t3 || (null == e ? void 0 : e.event)), false, true), P(o, "mousemove", (t3) => this._onMouseMove(t3 || (null == e ? void 0 : e.event)), false, true), this.deadClicksCapture = new yn(this.instance, mn, this._onDeadClick.bind(this)), this.deadClicksCapture.startIfEnabled(), this._initialized = true);
      }
      _getProperties(t3, i3) {
        var s3 = this.instance.scrollManager.scrollY(), r3 = this.instance.scrollManager.scrollX(), n3 = this.instance.scrollManager.scrollElement(), o3 = function(t4, i4, s4) {
          for (var r4 = t4; r4 && wi(r4) && !Si(r4, "body"); ) {
            if (r4 === s4)
              return false;
            if (b(i4, null == e ? void 0 : e.getComputedStyle(r4).position))
              return true;
            r4 = $i(r4);
          }
          return false;
        }(Ci(t3), ["fixed", "sticky"], n3);
        return { x: t3.clientX + (o3 ? 0 : r3), y: t3.clientY + (o3 ? 0 : s3), target_fixed: o3, type: i3 };
      }
      _onClick(e3) {
        var t3, i3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "click";
        if (!yi(e3.target)) {
          var s3 = this._getProperties(e3, i3);
          null !== (t3 = this.rageclicks) && void 0 !== t3 && t3.isRageClick(e3.clientX, e3.clientY, (/* @__PURE__ */ new Date()).getTime()) && this._capture(ee(ee({}, s3), {}, { type: "rageclick" })), this._capture(s3);
        }
      }
      _onMouseMove(e3) {
        yi(e3.target) || (clearTimeout(this._mouseMoveTimeout), this._mouseMoveTimeout = setTimeout(() => {
          this._capture(this._getProperties(e3, "mousemove"));
        }, 500));
      }
      _capture(t3) {
        if (e) {
          var i3 = e.location.href;
          this.buffer = this.buffer || {}, this.buffer[i3] || (this.buffer[i3] = []), this.buffer[i3].push(t3);
        }
      }
      flush() {
        this.buffer && !B(this.buffer) && this.instance.capture("$$heatmap", { $heatmap_data: this.getAndClearBuffer() });
      }
    };
    Sn = class {
      constructor(e3) {
        te(this, "_updateScrollData", () => {
          var e4, t3, i3, s3;
          this.context || (this.context = {});
          var r3 = this.scrollElement(), n3 = this.scrollY(), o3 = r3 ? Math.max(0, r3.scrollHeight - r3.clientHeight) : 0, a3 = n3 + ((null == r3 ? void 0 : r3.clientHeight) || 0), l3 = (null == r3 ? void 0 : r3.scrollHeight) || 0;
          this.context.lastScrollY = Math.ceil(n3), this.context.maxScrollY = Math.max(n3, null !== (e4 = this.context.maxScrollY) && void 0 !== e4 ? e4 : 0), this.context.maxScrollHeight = Math.max(o3, null !== (t3 = this.context.maxScrollHeight) && void 0 !== t3 ? t3 : 0), this.context.lastContentY = a3, this.context.maxContentY = Math.max(a3, null !== (i3 = this.context.maxContentY) && void 0 !== i3 ? i3 : 0), this.context.maxContentHeight = Math.max(l3, null !== (s3 = this.context.maxContentHeight) && void 0 !== s3 ? s3 : 0);
        }), this.instance = e3;
      }
      getContext() {
        return this.context;
      }
      resetContext() {
        var e3 = this.context;
        return setTimeout(this._updateScrollData, 0), e3;
      }
      startMeasuringScrollPosition() {
        null == e || e.addEventListener("scroll", this._updateScrollData, true), null == e || e.addEventListener("scrollend", this._updateScrollData, true), null == e || e.addEventListener("resize", this._updateScrollData);
      }
      scrollElement() {
        if (!this.instance.config.scroll_root_selector)
          return null == e ? void 0 : e.document.documentElement;
        var t3 = D(this.instance.config.scroll_root_selector) ? this.instance.config.scroll_root_selector : [this.instance.config.scroll_root_selector];
        for (var i3 of t3) {
          var s3 = null == e ? void 0 : e.document.querySelector(i3);
          if (s3)
            return s3;
        }
      }
      scrollY() {
        if (this.instance.config.scroll_root_selector) {
          var t3 = this.scrollElement();
          return t3 && t3.scrollTop || 0;
        }
        return e && (e.scrollY || e.pageYOffset || e.document.documentElement.scrollTop) || 0;
      }
      scrollX() {
        if (this.instance.config.scroll_root_selector) {
          var t3 = this.scrollElement();
          return t3 && t3.scrollLeft || 0;
        }
        return e && (e.scrollX || e.pageXOffset || e.document.documentElement.scrollLeft) || 0;
      }
    };
    Pn = class {
      constructor(e3) {
        te(this, "_initialized", false), te(this, "_isDisabledServerSide", null), te(this, "rageclicks", new gn()), te(this, "_elementsChainAsString", false), this.instance = e3, this._elementSelectors = null;
      }
      get config() {
        var e3, t3, i3 = q(this.instance.config.autocapture) ? this.instance.config.autocapture : {};
        return i3.url_allowlist = null === (e3 = i3.url_allowlist) || void 0 === e3 ? void 0 : e3.map((e4) => new RegExp(e4)), i3.url_ignorelist = null === (t3 = i3.url_ignorelist) || void 0 === t3 ? void 0 : t3.map((e4) => new RegExp(e4)), i3;
      }
      _addDomEventHandlers() {
        if (this.isBrowserSupported()) {
          if (e && o) {
            var t3 = (t4) => {
              t4 = t4 || (null == e ? void 0 : e.event);
              try {
                this._captureEvent(t4);
              } catch (e3) {
                X.error("Failed to capture event", e3);
              }
            }, i3 = (t4) => {
              t4 = t4 || (null == e ? void 0 : e.event), this._captureEvent(t4, C);
            };
            P(o, "submit", t3, false, true), P(o, "change", t3, false, true), P(o, "click", t3, false, true), this.config.capture_copied_text && (P(o, "copy", i3, false, true), P(o, "cut", i3, false, true));
          }
        } else
          X.info("Disabling Automatic Event Collection because this browser is not supported");
      }
      startIfEnabled() {
        this.isEnabled && !this._initialized && (this._addDomEventHandlers(), this._initialized = true);
      }
      afterDecideResponse(e3) {
        e3.elementsChainAsString && (this._elementsChainAsString = e3.elementsChainAsString), this.instance.persistence && this.instance.persistence.register({ [oe]: !!e3.autocapture_opt_out }), this._isDisabledServerSide = !!e3.autocapture_opt_out, this.startIfEnabled();
      }
      setElementSelectors(e3) {
        this._elementSelectors = e3;
      }
      getElementSelectors(e3) {
        var t3, i3 = [];
        return null === (t3 = this._elementSelectors) || void 0 === t3 || t3.forEach((t4) => {
          var s3 = null == o ? void 0 : o.querySelectorAll(t4);
          null == s3 || s3.forEach((s4) => {
            e3 === s4 && i3.push(t4);
          });
        }), i3;
      }
      get isEnabled() {
        var e3, t3, i3 = null === (e3 = this.instance.persistence) || void 0 === e3 ? void 0 : e3.props[oe], s3 = this._isDisabledServerSide;
        if (z(s3) && !G(i3) && !this.instance.config.advanced_disable_decide)
          return false;
        var r3 = null !== (t3 = this._isDisabledServerSide) && void 0 !== t3 ? t3 : !!i3;
        return !!this.instance.config.autocapture && !r3;
      }
      _captureEvent(t3) {
        var i3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "$autocapture";
        if (this.isEnabled) {
          var s3, r3 = Ci(t3);
          if (Ei(r3) && (r3 = r3.parentNode || null), "$autocapture" === i3 && "click" === t3.type && t3 instanceof MouseEvent)
            this.instance.config.rageclick && null !== (s3 = this.rageclicks) && void 0 !== s3 && s3.isRageClick(t3.clientX, t3.clientY, (/* @__PURE__ */ new Date()).getTime()) && this._captureEvent(t3, "$rageclick");
          var n3 = i3 === C;
          if (r3 && Mi(r3, t3, this.config, n3, n3 ? ["copy", "cut"] : void 0)) {
            var { props: o3, explicitNoCapture: a3 } = In(r3, { e: t3, maskAllElementAttributes: this.instance.config.mask_all_element_attributes, maskAllText: this.instance.config.mask_all_text, elementAttributeIgnoreList: this.config.element_attribute_ignorelist, elementsChainAsString: this._elementsChainAsString });
            if (a3)
              return false;
            var l3 = this.getElementSelectors(r3);
            if (l3 && l3.length > 0 && (o3.$element_selectors = l3), i3 === C) {
              var u3, c3 = Fi(null == e || null === (u3 = e.getSelection()) || void 0 === u3 ? void 0 : u3.toString()), d3 = t3.type || "clipboard";
              if (!c3)
                return false;
              o3.$selected_content = c3, o3.$copy_type = d3;
            }
            return this.instance.capture(i3, o3), true;
          }
        }
      }
      isBrowserSupported() {
        return N(null == o ? void 0 : o.querySelectorAll);
      }
    };
    Fn = class {
      constructor(e3) {
        te(this, "_restoreXHRPatch", void 0), te(this, "_restoreFetchPatch", void 0), te(this, "_startCapturing", () => {
          var e4, t3, i3, s3;
          H(this._restoreXHRPatch) && (null === (e4 = h.__PosthogExtensions__) || void 0 === e4 || null === (t3 = e4.tracingHeadersPatchFns) || void 0 === t3 || t3._patchXHR(this.instance.sessionManager));
          H(this._restoreFetchPatch) && (null === (i3 = h.__PosthogExtensions__) || void 0 === i3 || null === (s3 = i3.tracingHeadersPatchFns) || void 0 === s3 || s3._patchFetch(this.instance.sessionManager));
        }), this.instance = e3;
      }
      _loadScript(e3) {
        var t3, i3, s3;
        null !== (t3 = h.__PosthogExtensions__) && void 0 !== t3 && t3.tracingHeadersPatchFns && e3(), null === (i3 = h.__PosthogExtensions__) || void 0 === i3 || null === (s3 = i3.loadExternalDependency) || void 0 === s3 || s3.call(i3, this.instance, "tracing-headers", (t4) => {
          if (t4)
            return X.error("[TRACING-HEADERS] failed to load script", t4);
          e3();
        });
      }
      startIfEnabledOrStop() {
        var e3, t3;
        this.instance.config.__add_tracing_headers ? this._loadScript(this._startCapturing) : (null === (e3 = this._restoreXHRPatch) || void 0 === e3 || e3.call(this), null === (t3 = this._restoreFetchPatch) || void 0 === t3 || t3.call(this), this._restoreXHRPatch = void 0, this._restoreFetchPatch = void 0);
      }
    };
    !function(e3) {
      e3[e3.PENDING = -1] = "PENDING", e3[e3.DENIED = 0] = "DENIED", e3[e3.GRANTED = 1] = "GRANTED";
    }(Rn || (Rn = {}));
    Cn = class {
      constructor(e3) {
        this.instance = e3;
      }
      get config() {
        return this.instance.config;
      }
      get consent() {
        return this.getDnt() ? Rn.DENIED : this.storedConsent;
      }
      isOptedOut() {
        return this.consent === Rn.DENIED || this.consent === Rn.PENDING && this.config.opt_out_capturing_by_default;
      }
      isOptedIn() {
        return !this.isOptedOut();
      }
      optInOut(e3) {
        this.storage.set(this.storageKey, e3 ? 1 : 0, this.config.cookie_expiration, this.config.cross_subdomain_cookie, this.config.secure_cookie);
      }
      reset() {
        this.storage.remove(this.storageKey, this.config.cross_subdomain_cookie);
      }
      get storageKey() {
        var { token: e3, opt_out_capturing_cookie_prefix: t3 } = this.instance.config;
        return (t3 || "__ph_opt_in_out_") + e3;
      }
      get storedConsent() {
        var e3 = this.storage.get(this.storageKey);
        return "1" === e3 ? Rn.GRANTED : "0" === e3 ? Rn.DENIED : Rn.PENDING;
      }
      get storage() {
        if (!this._storage) {
          var e3 = this.config.opt_out_capturing_persistence_type;
          this._storage = "localStorage" === e3 ? st : tt;
          var t3 = "localStorage" === e3 ? tt : st;
          t3.get(this.storageKey) && (this._storage.get(this.storageKey) || this.optInOut("1" === t3.get(this.storageKey)), t3.remove(this.storageKey, this.config.cross_subdomain_cookie));
        }
        return this._storage;
      }
      getDnt() {
        return !!this.config.respect_dnt && !!F([null == n ? void 0 : n.doNotTrack, null == n ? void 0 : n.msDoNotTrack, h.doNotTrack], (e3) => b([true, 1, "1", "yes"], e3));
      }
    };
    Tn = "[Exception Autocapture]";
    $n = class {
      constructor(t3) {
        var i3;
        te(this, "originalOnUnhandledRejectionHandler", void 0), te(this, "startCapturing", () => {
          var t4, i4, s3, r3;
          if (e && this.isEnabled && !this.hasHandlers && !this.isCapturing) {
            var n3 = null === (t4 = h.__PosthogExtensions__) || void 0 === t4 || null === (i4 = t4.errorWrappingFunctions) || void 0 === i4 ? void 0 : i4.wrapOnError, o3 = null === (s3 = h.__PosthogExtensions__) || void 0 === s3 || null === (r3 = s3.errorWrappingFunctions) || void 0 === r3 ? void 0 : r3.wrapUnhandledRejection;
            if (n3 && o3)
              try {
                this.unwrapOnError = n3(this.captureException.bind(this)), this.unwrapUnhandledRejection = o3(this.captureException.bind(this));
              } catch (e3) {
                X.error(Tn + " failed to start", e3), this.stopCapturing();
              }
            else
              X.error(Tn + " failed to load error wrapping functions - cannot start");
          }
        }), this.instance = t3, this.remoteEnabled = !(null === (i3 = this.instance.persistence) || void 0 === i3 || !i3.props[le]), this.startIfEnabled();
      }
      get isEnabled() {
        var e3;
        return null !== (e3 = this.remoteEnabled) && void 0 !== e3 && e3;
      }
      get isCapturing() {
        var t3;
        return !(null == e || null === (t3 = e.onerror) || void 0 === t3 || !t3.__POSTHOG_INSTRUMENTED__);
      }
      get hasHandlers() {
        return this.originalOnUnhandledRejectionHandler || this.unwrapOnError;
      }
      startIfEnabled() {
        this.isEnabled && !this.isCapturing && (X.info(Tn + " enabled, starting..."), this.loadScript(this.startCapturing));
      }
      loadScript(e3) {
        var t3, i3;
        this.hasHandlers && e3(), null === (t3 = h.__PosthogExtensions__) || void 0 === t3 || null === (i3 = t3.loadExternalDependency) || void 0 === i3 || i3.call(t3, this.instance, "exception-autocapture", (t4) => {
          if (t4)
            return X.error(Tn + " failed to load script", t4);
          e3();
        });
      }
      stopCapturing() {
        var e3, t3;
        null === (e3 = this.unwrapOnError) || void 0 === e3 || e3.call(this), null === (t3 = this.unwrapUnhandledRejection) || void 0 === t3 || t3.call(this);
      }
      afterDecideResponse(e3) {
        var t3 = e3.autocaptureExceptions;
        this.remoteEnabled = !!t3 || false, this.instance.persistence && this.instance.persistence.register({ [le]: this.remoteEnabled }), this.startIfEnabled();
      }
      captureException(e3) {
        var t3 = this.instance.requestRouter.endpointFor("ui");
        e3.$exception_personURL = "".concat(t3, "/project/").concat(this.instance.config.token, "/person/").concat(this.instance.get_distinct_id()), this.instance.exceptions.sendExceptionEvent(e3);
      }
    };
    Mn = 9e5;
    An = "[Web Vitals]";
    On = class {
      constructor(e3) {
        var t3;
        te(this, "_enabledServerSide", false), te(this, "_initialized", false), te(this, "buffer", { url: void 0, metrics: [], firstMetricTimestamp: void 0 }), te(this, "_flushToCapture", () => {
          clearTimeout(this._delayedFlushTimer), 0 !== this.buffer.metrics.length && (this.instance.capture("$web_vitals", this.buffer.metrics.reduce((e4, t4) => ee(ee({}, e4), {}, { ["$web_vitals_".concat(t4.name, "_event")]: ee({}, t4), ["$web_vitals_".concat(t4.name, "_value")]: t4.value }), {})), this.buffer = { url: void 0, metrics: [], firstMetricTimestamp: void 0 });
        }), te(this, "_addToBuffer", (e4) => {
          var t4, i3 = null === (t4 = this.instance.sessionManager) || void 0 === t4 ? void 0 : t4.checkAndGetSessionAndWindowId(true);
          if (H(i3))
            X.error(An + "Could not read session ID. Dropping metrics!");
          else {
            this.buffer = this.buffer || { url: void 0, metrics: [], firstMetricTimestamp: void 0 };
            var s3 = this._currentURL();
            if (!H(s3))
              if (j(null == e4 ? void 0 : e4.name) || j(null == e4 ? void 0 : e4.value))
                X.error(An + "Invalid metric received", e4);
              else if (this._maxAllowedValue && e4.value >= this._maxAllowedValue)
                X.error(An + "Ignoring metric with value >= " + this._maxAllowedValue, e4);
              else
                this.buffer.url !== s3 && (this._flushToCapture(), this._delayedFlushTimer = setTimeout(this._flushToCapture, this.flushToCaptureTimeoutMs)), H(this.buffer.url) && (this.buffer.url = s3), this.buffer.firstMetricTimestamp = H(this.buffer.firstMetricTimestamp) ? Date.now() : this.buffer.firstMetricTimestamp, e4.attribution && e4.attribution.interactionTargetElement && (e4.attribution.interactionTargetElement = void 0), this.buffer.metrics.push(ee(ee({}, e4), {}, { $current_url: s3, $session_id: i3.sessionId, $window_id: i3.windowId, timestamp: Date.now() })), this.buffer.metrics.length === this.allowedMetrics.length && this._flushToCapture();
          }
        }), te(this, "_startCapturing", () => {
          var e4, t4, i3, s3, r3 = h.__PosthogExtensions__;
          H(r3) || H(r3.postHogWebVitalsCallbacks) || ({ onLCP: e4, onCLS: t4, onFCP: i3, onINP: s3 } = r3.postHogWebVitalsCallbacks), e4 && t4 && i3 && s3 ? (this.allowedMetrics.indexOf("LCP") > -1 && e4(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("CLS") > -1 && t4(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("FCP") > -1 && i3(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("INP") > -1 && s3(this._addToBuffer.bind(this)), this._initialized = true) : X.error(An + "web vitals callbacks not loaded - not starting");
        }), this.instance = e3, this._enabledServerSide = !(null === (t3 = this.instance.persistence) || void 0 === t3 || !t3.props[ue]), this.startIfEnabled();
      }
      get allowedMetrics() {
        var e3, t3, i3 = q(this.instance.config.capture_performance) ? null === (e3 = this.instance.config.capture_performance) || void 0 === e3 ? void 0 : e3.web_vitals_allowed_metrics : void 0;
        return H(i3) ? (null === (t3 = this.instance.persistence) || void 0 === t3 ? void 0 : t3.props[de]) || ["CLS", "FCP", "INP", "LCP"] : i3;
      }
      get flushToCaptureTimeoutMs() {
        return (q(this.instance.config.capture_performance) ? this.instance.config.capture_performance.web_vitals_delayed_flush_ms : void 0) || 5e3;
      }
      get _maxAllowedValue() {
        var e3 = q(this.instance.config.capture_performance) && V(this.instance.config.capture_performance.__web_vitals_max_value) ? this.instance.config.capture_performance.__web_vitals_max_value : Mn;
        return 0 < e3 && e3 <= 6e4 ? Mn : e3;
      }
      get isEnabled() {
        var e3 = q(this.instance.config.capture_performance) ? this.instance.config.capture_performance.web_vitals : void 0;
        return G(e3) ? e3 : this._enabledServerSide;
      }
      startIfEnabled() {
        this.isEnabled && !this._initialized && (X.info(An + " enabled, starting..."), this.loadScript(this._startCapturing));
      }
      afterDecideResponse(e3) {
        var t3 = q(e3.capturePerformance) && !!e3.capturePerformance.web_vitals, i3 = q(e3.capturePerformance) ? e3.capturePerformance.web_vitals_allowed_metrics : void 0;
        this.instance.persistence && (this.instance.persistence.register({ [ue]: t3 }), this.instance.persistence.register({ [de]: i3 })), this._enabledServerSide = t3, this.startIfEnabled();
      }
      loadScript(e3) {
        var t3, i3, s3;
        null !== (t3 = h.__PosthogExtensions__) && void 0 !== t3 && t3.postHogWebVitalsCallbacks && e3(), null === (i3 = h.__PosthogExtensions__) || void 0 === i3 || null === (s3 = i3.loadExternalDependency) || void 0 === s3 || s3.call(i3, this.instance, "web-vitals", (t4) => {
          t4 ? X.error(An + " failed to load script", t4) : e3();
        });
      }
      _currentURL() {
        var t3 = e ? e.location.href : void 0;
        return t3 || X.error(An + "Could not determine current URL"), t3;
      }
    };
    Ln = { icontains: (t3, i3) => !!e && i3.href.toLowerCase().indexOf(t3.toLowerCase()) > -1, not_icontains: (t3, i3) => !!e && -1 === i3.href.toLowerCase().indexOf(t3.toLowerCase()), regex: (t3, i3) => !!e && ht(i3.href, t3), not_regex: (t3, i3) => !!e && !ht(i3.href, t3), exact: (e3, t3) => t3.href === e3, is_not: (e3, t3) => t3.href !== e3 };
    Dn = class _Dn {
      constructor(e3) {
        var t3 = this;
        te(this, "getWebExperimentsAndEvaluateDisplayLogic", function() {
          var e4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          t3.getWebExperiments((e5) => {
            _Dn.logInfo("retrieved web experiments from the server"), t3._flagToExperiments = /* @__PURE__ */ new Map(), e5.forEach((e6) => {
              if (e6.feature_flag_key && t3._featureFlags && t3._featureFlags[e6.feature_flag_key]) {
                var i3;
                if (t3._flagToExperiments)
                  _Dn.logInfo("setting flag key ", e6.feature_flag_key, " to web experiment ", e6), null === (i3 = t3._flagToExperiments) || void 0 === i3 || i3.set(e6.feature_flag_key, e6);
                var s3 = t3._featureFlags[e6.feature_flag_key];
                s3 && e6.variants[s3] && t3.applyTransforms(e6.name, s3, e6.variants[s3].transforms);
              } else if (e6.variants)
                for (var r3 in e6.variants) {
                  var n3 = e6.variants[r3];
                  _Dn.matchesTestVariant(n3) && t3.applyTransforms(e6.name, r3, n3.transforms);
                }
            });
          }, e4);
        }), this.instance = e3;
        this.instance.onFeatureFlags && this.instance.onFeatureFlags((e4) => {
          this.applyFeatureFlagChanges(e4);
        }), this._flagToExperiments = /* @__PURE__ */ new Map();
      }
      applyFeatureFlagChanges(e3) {
        j(this._flagToExperiments) || this.instance.config.disable_web_experiments || (_Dn.logInfo("applying feature flags", e3), e3.forEach((e4) => {
          var t3;
          if (this._flagToExperiments && null !== (t3 = this._flagToExperiments) && void 0 !== t3 && t3.has(e4)) {
            var i3, s3 = this.instance.getFeatureFlag(e4), r3 = null === (i3 = this._flagToExperiments) || void 0 === i3 ? void 0 : i3.get(e4);
            s3 && null != r3 && r3.variants[s3] && this.applyTransforms(r3.name, s3, r3.variants[s3].transforms);
          }
        }));
      }
      afterDecideResponse(e3) {
        this._is_bot() ? _Dn.logInfo("Refusing to render web experiment since the viewer is a likely bot") : (this._featureFlags = e3.featureFlags, this.loadIfEnabled(), this.previewWebExperiment());
      }
      previewWebExperiment() {
        var e3 = _Dn.getWindowLocation();
        if (null != e3 && e3.search) {
          var t3 = pt(null == e3 ? void 0 : e3.search, "__experiment_id"), i3 = pt(null == e3 ? void 0 : e3.search, "__experiment_variant");
          t3 && i3 && (_Dn.logInfo("previewing web experiments ".concat(t3, " && ").concat(i3)), this.getWebExperiments((e4) => {
            this.showPreviewWebExperiment(parseInt(t3), i3, e4);
          }, false, true));
        }
      }
      loadIfEnabled() {
        this.instance.config.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic();
      }
      getWebExperiments(e3, t3, i3) {
        if (this.instance.config.disable_web_experiments && !i3)
          return e3([]);
        var s3 = this.instance.get_property("$web_experiments");
        if (s3 && !t3)
          return e3(s3);
        this.instance._send_request({ url: this.instance.requestRouter.endpointFor("api", "/api/web_experiments/?token=".concat(this.instance.config.token)), method: "GET", transport: "XHR", callback: (t4) => {
          if (200 !== t4.statusCode || !t4.json)
            return e3([]);
          var i4 = t4.json.experiments || [];
          return e3(i4);
        } });
      }
      showPreviewWebExperiment(e3, t3, i3) {
        var s3 = i3.filter((t4) => t4.id === e3);
        s3 && s3.length > 0 && (_Dn.logInfo("Previewing web experiment [".concat(s3[0].name, "] with variant [").concat(t3, "]")), this.applyTransforms(s3[0].name, t3, s3[0].variants[t3].transforms, true));
      }
      static matchesTestVariant(e3) {
        return !j(e3.conditions) && (_Dn.matchUrlConditions(e3) && _Dn.matchUTMConditions(e3));
      }
      static matchUrlConditions(e3) {
        var t3;
        if (j(e3.conditions) || j(null === (t3 = e3.conditions) || void 0 === t3 ? void 0 : t3.url))
          return true;
        var i3, s3, r3, n3 = _Dn.getWindowLocation();
        return !!n3 && (null === (i3 = e3.conditions) || void 0 === i3 || !i3.url || Ln[null !== (s3 = null === (r3 = e3.conditions) || void 0 === r3 ? void 0 : r3.urlMatchType) && void 0 !== s3 ? s3 : "icontains"](e3.conditions.url, n3));
      }
      static getWindowLocation() {
        return null == e ? void 0 : e.location;
      }
      static matchUTMConditions(e3) {
        var t3;
        if (j(e3.conditions) || j(null === (t3 = e3.conditions) || void 0 === t3 ? void 0 : t3.utm))
          return true;
        var i3 = _i.campaignParams();
        if (i3.utm_source) {
          var s3, r3, n3, o3, a3, l3, u3, c3, d3, h3, _3, p3, v3, g3, f3, m3, b3 = null === (s3 = e3.conditions) || void 0 === s3 || null === (r3 = s3.utm) || void 0 === r3 || !r3.utm_campaign || (null === (n3 = e3.conditions) || void 0 === n3 || null === (o3 = n3.utm) || void 0 === o3 ? void 0 : o3.utm_campaign) == i3.utm_campaign, y3 = null === (a3 = e3.conditions) || void 0 === a3 || null === (l3 = a3.utm) || void 0 === l3 || !l3.utm_source || (null === (u3 = e3.conditions) || void 0 === u3 || null === (c3 = u3.utm) || void 0 === c3 ? void 0 : c3.utm_source) == i3.utm_source, w3 = null === (d3 = e3.conditions) || void 0 === d3 || null === (h3 = d3.utm) || void 0 === h3 || !h3.utm_medium || (null === (_3 = e3.conditions) || void 0 === _3 || null === (p3 = _3.utm) || void 0 === p3 ? void 0 : p3.utm_medium) == i3.utm_medium, S3 = null === (v3 = e3.conditions) || void 0 === v3 || null === (g3 = v3.utm) || void 0 === g3 || !g3.utm_term || (null === (f3 = e3.conditions) || void 0 === f3 || null === (m3 = f3.utm) || void 0 === m3 ? void 0 : m3.utm_term) == i3.utm_term;
          return b3 && w3 && S3 && y3;
        }
        return false;
      }
      static logInfo(e3) {
        for (var t3 = arguments.length, i3 = new Array(t3 > 1 ? t3 - 1 : 0), s3 = 1; s3 < t3; s3++)
          i3[s3 - 1] = arguments[s3];
        X.info("[WebExperiments] ".concat(e3), i3);
      }
      applyTransforms(e3, t3, i3, s3) {
        var r3;
        this._is_bot() ? _Dn.logInfo("Refusing to render web experiment since the viewer is a likely bot") : "control" !== t3 ? i3.forEach((i4) => {
          if (i4.selector) {
            var r4;
            _Dn.logInfo("applying transform of variant ".concat(t3, " for experiment ").concat(e3, " "), i4);
            var n3, o3 = 0, a3 = null === (r4 = document) || void 0 === r4 ? void 0 : r4.querySelectorAll(i4.selector);
            if (null == a3 || a3.forEach((e4) => {
              var t4 = e4;
              o3 += 1, i4.attributes && i4.attributes.forEach((e5) => {
                switch (e5.name) {
                  case "text":
                    t4.innerText = e5.value;
                    break;
                  case "html":
                    t4.innerHTML = e5.value;
                    break;
                  case "cssClass":
                    t4.className = e5.value;
                    break;
                  default:
                    t4.setAttribute(e5.name, e5.value);
                }
              }), i4.text && (t4.innerText = i4.text), i4.html && (t4.parentElement ? t4.parentElement.innerHTML = i4.html : t4.innerHTML = i4.html), i4.css && t4.setAttribute("style", i4.css);
            }), this.instance && this.instance.capture)
              this.instance.capture("$web_experiment_applied", { $web_experiment_name: e3, $web_experiment_variant: t3, $web_experiment_preview: s3, $web_experiment_document_url: null === (n3 = _Dn.getWindowLocation()) || void 0 === n3 ? void 0 : n3.href, $web_experiment_elements_modified: o3 });
          }
        }) : (_Dn.logInfo("Control variants leave the page unmodified."), this.instance && this.instance.capture && this.instance.capture("$web_experiment_applied", { $web_experiment_name: e3, $web_experiment_preview: s3, $web_experiment_variant: t3, $web_experiment_document_url: null === (r3 = _Dn.getWindowLocation()) || void 0 === r3 ? void 0 : r3.href, $web_experiment_elements_modified: 0 }));
      }
      _is_bot() {
        return n && this.instance ? vn(n, this.instance.config.custom_blocked_useragents) : void 0;
      }
    };
    Nn = class {
      constructor(e3) {
        this.instance = e3;
      }
      sendExceptionEvent(e3) {
        this.instance.capture("$exception", e3, { _noTruncate: true, _batchKey: "exceptionEvent" });
      }
    };
    qn = {};
    Bn = () => {
    };
    Hn = "posthog";
    Un = !sr && -1 === (null == d ? void 0 : d.indexOf("MSIE")) && -1 === (null == d ? void 0 : d.indexOf("Mozilla"));
    Wn = () => {
      var t3, i3, s3;
      return { api_host: "https://us.i.posthog.com", ui_host: null, token: "", autocapture: true, rageclick: true, cross_subdomain_cookie: (i3 = null == o ? void 0 : o.location, s3 = null == i3 ? void 0 : i3.hostname, !!U(s3) && "herokuapp.com" !== s3.split(".").slice(-2).join(".")), persistence: "localStorage+cookie", persistence_name: "", loaded: Bn, store_google: true, custom_campaign_params: [], custom_blocked_useragents: [], save_referrer: true, capture_pageview: true, capture_pageleave: "if_capture_pageview", debug: a && U(null == a ? void 0 : a.search) && -1 !== a.search.indexOf("__posthog_debug=true") || false, verbose: false, cookie_expiration: 365, upgrade: false, disable_session_recording: false, disable_persistence: false, disable_web_experiments: true, disable_surveys: false, enable_recording_console_log: void 0, secure_cookie: "https:" === (null == e || null === (t3 = e.location) || void 0 === t3 ? void 0 : t3.protocol), ip: true, opt_out_capturing_by_default: false, opt_out_persistence_by_default: false, opt_out_useragent_filter: false, opt_out_capturing_persistence_type: "localStorage", opt_out_capturing_cookie_prefix: null, opt_in_site_apps: false, property_denylist: [], respect_dnt: false, sanitize_properties: null, request_headers: {}, inapp_protocol: "//", inapp_link_new_window: false, request_batching: true, properties_string_max_length: 65535, session_recording: {}, mask_all_element_attributes: false, mask_all_text: false, advanced_disable_decide: false, advanced_disable_feature_flags: false, advanced_disable_feature_flags_on_first_load: false, advanced_disable_toolbar_metrics: false, feature_flag_request_timeout_ms: 3e3, on_request_error: (e3) => {
        var t4 = "Bad HTTP status: " + e3.statusCode + " " + e3.text;
        X.error(t4);
      }, get_device_id: (e3) => e3, _onCapture: Bn, capture_performance: void 0, name: "posthog", bootstrap: {}, disable_compression: false, session_idle_timeout_seconds: 1800, person_profiles: "identified_only", __add_tracing_headers: false, before_send: void 0 };
    };
    zn = (e3) => {
      var t3 = {};
      H(e3.process_person) || (t3.person_profiles = e3.process_person), H(e3.xhr_headers) || (t3.request_headers = e3.xhr_headers), H(e3.cookie_name) || (t3.persistence_name = e3.cookie_name), H(e3.disable_cookie) || (t3.disable_persistence = e3.disable_cookie);
      var i3 = m({}, t3, e3);
      return D(e3.property_blacklist) && (H(e3.property_denylist) ? i3.property_denylist = e3.property_blacklist : D(e3.property_denylist) ? i3.property_denylist = [...e3.property_blacklist, ...e3.property_denylist] : X.error("Invalid value for property_denylist config: " + e3.property_denylist)), i3;
    };
    jn = class {
      constructor() {
        te(this, "__forceAllowLocalhost", false);
      }
      get _forceAllowLocalhost() {
        return this.__forceAllowLocalhost;
      }
      set _forceAllowLocalhost(e3) {
        X.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = e3;
      }
    };
    Vn = class _Vn {
      constructor() {
        te(this, "webPerformance", new jn()), te(this, "version", _.LIB_VERSION), te(this, "_internalEventEmitter", new Sr()), this.config = Wn(), this.decideEndpointWasHit = false, this.SentryIntegration = gr, this.sentryIntegration = (e3) => function(e4, t3) {
          var i3 = vr(e4, t3);
          return { name: pr, processEvent: (e5) => i3(e5) };
        }(this, e3), this.__request_queue = [], this.__loaded = false, this.analyticsDefaultEndpoint = "/e/", this._initialPageviewCaptured = false, this._initialPersonProfilesConfig = null, this.featureFlags = new Ue(this), this.toolbar = new tr(this), this.scrollManager = new Sn(this), this.pageViewManager = new wr(this), this.surveys = new un(this), this.experiments = new Dn(this), this.exceptions = new Nn(this), this.rateLimiter = new cn(this), this.requestRouter = new _r(this), this.consent = new Cn(this), this.people = { set: (e3, t3, i3) => {
          var s3 = U(e3) ? { [e3]: t3 } : e3;
          this.setPersonProperties(s3), null == i3 || i3({});
        }, set_once: (e3, t3, i3) => {
          var s3 = U(e3) ? { [e3]: t3 } : e3;
          this.setPersonProperties(void 0, s3), null == i3 || i3({});
        } }, this.on("eventCaptured", (e3) => X.info('send "'.concat(null == e3 ? void 0 : e3.event, '"'), e3));
      }
      init(e3, t3, i3) {
        if (i3 && i3 !== Hn) {
          var s3, r3 = null !== (s3 = qn[i3]) && void 0 !== s3 ? s3 : new _Vn();
          return r3._init(e3, t3, i3), qn[i3] = r3, qn[Hn][i3] = r3, r3;
        }
        return this._init(e3, t3, i3);
      }
      _init(t3) {
        var i3, s3, r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = arguments.length > 2 ? arguments[2] : void 0;
        if (H(t3) || W(t3))
          return X.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
        if (this.__loaded)
          return X.warn("You have already initialized PostHog! Re-initializing is a no-op"), this;
        this.__loaded = true, this.config = {}, this._triggered_notifs = [], r3.person_profiles && (this._initialPersonProfilesConfig = r3.person_profiles), this.set_config(m({}, Wn(), zn(r3), { name: n3, token: t3 })), this.config.on_xhr_error && X.error("[posthog] on_xhr_error is deprecated. Use on_request_error instead"), this.compression = r3.disable_compression ? void 0 : R.GZipJS, this.persistence = new vi(this.config), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new vi(ee(ee({}, this.config), {}, { persistence: "sessionStorage" }));
        var o3 = ee({}, this.persistence.props), a3 = ee({}, this.sessionPersistence.props);
        if (this._requestQueue = new ir((e3) => this._send_retriable_request(e3)), this._retryQueue = new ur(this), this.__request_queue = [], this.sessionManager = new dr(this.config, this.persistence), this.sessionPropsManager = new hn(this.sessionManager, this.persistence), new Fn(this).startIfEnabledOrStop(), this.sessionRecording = new Ys(this), this.sessionRecording.startIfEnabledOrStop(), this.config.disable_scroll_properties || this.scrollManager.startMeasuringScrollPosition(), this.autocapture = new Pn(this), this.autocapture.startIfEnabled(), this.surveys.loadIfEnabled(), this.heatmaps = new wn(this), this.heatmaps.startIfEnabled(), this.webVitalsAutocapture = new On(this), this.exceptionObserver = new $n(this), this.exceptionObserver.startIfEnabled(), this.deadClicksAutocapture = new yn(this, bn), this.deadClicksAutocapture.startIfEnabled(), _.DEBUG = _.DEBUG || this.config.debug, _.DEBUG && X.info("Starting in debug mode", { this: this, config: r3, thisC: ee({}, this.config), p: o3, s: a3 }), this._sync_opt_out_with_persistence(), void 0 !== (null === (i3 = r3.bootstrap) || void 0 === i3 ? void 0 : i3.distinctID)) {
          var l3, u3, c3 = this.config.get_device_id(Je()), d3 = null !== (l3 = r3.bootstrap) && void 0 !== l3 && l3.isIdentifiedID ? c3 : r3.bootstrap.distinctID;
          this.persistence.set_property(Re, null !== (u3 = r3.bootstrap) && void 0 !== u3 && u3.isIdentifiedID ? "identified" : "anonymous"), this.register({ distinct_id: r3.bootstrap.distinctID, $device_id: d3 });
        }
        if (this._hasBootstrappedFeatureFlags()) {
          var h3, p3, v3 = Object.keys((null === (h3 = r3.bootstrap) || void 0 === h3 ? void 0 : h3.featureFlags) || {}).filter((e3) => {
            var t4, i4;
            return !(null === (t4 = r3.bootstrap) || void 0 === t4 || null === (i4 = t4.featureFlags) || void 0 === i4 || !i4[e3]);
          }).reduce((e3, t4) => {
            var i4, s4;
            return e3[t4] = (null === (i4 = r3.bootstrap) || void 0 === i4 || null === (s4 = i4.featureFlags) || void 0 === s4 ? void 0 : s4[t4]) || false, e3;
          }, {}), g3 = Object.keys((null === (p3 = r3.bootstrap) || void 0 === p3 ? void 0 : p3.featureFlagPayloads) || {}).filter((e3) => v3[e3]).reduce((e3, t4) => {
            var i4, s4, n4, o4;
            null !== (i4 = r3.bootstrap) && void 0 !== i4 && null !== (s4 = i4.featureFlagPayloads) && void 0 !== s4 && s4[t4] && (e3[t4] = null === (n4 = r3.bootstrap) || void 0 === n4 || null === (o4 = n4.featureFlagPayloads) || void 0 === o4 ? void 0 : o4[t4]);
            return e3;
          }, {});
          this.featureFlags.receivedFeatureFlags({ featureFlags: v3, featureFlagPayloads: g3 });
        }
        if (!this.get_distinct_id()) {
          var f3 = this.config.get_device_id(Je());
          this.register_once({ distinct_id: f3, $device_id: f3 }, ""), this.persistence.set_property(Re, "anonymous");
        }
        return null == e || null === (s3 = e.addEventListener) || void 0 === s3 || s3.call(e, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this)), this.toolbar.maybeLoadToolbar(), r3.segment ? yr(this, () => this._loaded()) : this._loaded(), N(this.config._onCapture) && this.config._onCapture !== Bn && (X.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", (e3) => this.config._onCapture(e3.event, e3))), this;
      }
      _afterDecideResponse(e3) {
        var t3, i3, s3, r3, n3, o3, a3, l3, u3;
        this.compression = void 0, e3.supportedCompression && !this.config.disable_compression && (this.compression = b(e3.supportedCompression, R.GZipJS) ? R.GZipJS : b(e3.supportedCompression, R.Base64) ? R.Base64 : void 0), null !== (t3 = e3.analytics) && void 0 !== t3 && t3.endpoint && (this.analyticsDefaultEndpoint = e3.analytics.endpoint), this.set_config({ person_profiles: this._initialPersonProfilesConfig ? this._initialPersonProfilesConfig : e3.defaultIdentifiedOnly ? "identified_only" : "always" }), null === (i3 = this.sessionRecording) || void 0 === i3 || i3.afterDecideResponse(e3), null === (s3 = this.autocapture) || void 0 === s3 || s3.afterDecideResponse(e3), null === (r3 = this.heatmaps) || void 0 === r3 || r3.afterDecideResponse(e3), null === (n3 = this.experiments) || void 0 === n3 || n3.afterDecideResponse(e3), null === (o3 = this.surveys) || void 0 === o3 || o3.afterDecideResponse(e3), null === (a3 = this.webVitalsAutocapture) || void 0 === a3 || a3.afterDecideResponse(e3), null === (l3 = this.exceptionObserver) || void 0 === l3 || l3.afterDecideResponse(e3), null === (u3 = this.deadClicksAutocapture) || void 0 === u3 || u3.afterDecideResponse(e3);
      }
      _loaded() {
        var e3 = this.config.advanced_disable_decide;
        e3 || this.featureFlags.setReloadingPaused(true);
        try {
          this.config.loaded(this);
        } catch (e4) {
          X.critical("`loaded` function failed", e4);
        }
        this._start_queue_if_opted_in(), this.config.capture_pageview && setTimeout(() => {
          this.consent.isOptedIn() && this._captureInitialPageview();
        }, 1), e3 || (new Xs(this).call(), this.featureFlags.resetRequestQueue());
      }
      _start_queue_if_opted_in() {
        var e3;
        this.has_opted_out_capturing() || this.config.request_batching && (null === (e3 = this._requestQueue) || void 0 === e3 || e3.enable());
      }
      _dom_loaded() {
        this.has_opted_out_capturing() || g(this.__request_queue, (e3) => this._send_retriable_request(e3)), this.__request_queue = [], this._start_queue_if_opted_in();
      }
      _handle_unload() {
        var e3, t3;
        this.config.request_batching ? (this._shouldCapturePageleave() && this.capture("$pageleave"), null === (e3 = this._requestQueue) || void 0 === e3 || e3.unload(), null === (t3 = this._retryQueue) || void 0 === t3 || t3.unload()) : this._shouldCapturePageleave() && this.capture("$pageleave", null, { transport: "sendBeacon" });
      }
      _send_request(e3) {
        this.__loaded && (Un ? this.__request_queue.push(e3) : this.rateLimiter.isServerRateLimited(e3.batchKey) || (e3.transport = e3.transport || this.config.api_transport, e3.url = nr(e3.url, { ip: this.config.ip ? 1 : 0 }), e3.headers = ee({}, this.config.request_headers), e3.compression = "best-available" === e3.compression ? this.compression : e3.compression, ((e4) => {
          var t3, i3, s3, r3 = ee({}, e4);
          r3.timeout = r3.timeout || 6e4, r3.url = nr(r3.url, { _: (/* @__PURE__ */ new Date()).getTime().toString(), ver: _.LIB_VERSION, compression: r3.compression });
          var n3 = null !== (t3 = r3.transport) && void 0 !== t3 ? t3 : "XHR", o3 = null !== (i3 = null === (s3 = F(ar, (e5) => e5.transport === n3)) || void 0 === s3 ? void 0 : s3.method) && void 0 !== i3 ? i3 : ar[0].method;
          if (!o3)
            throw new Error("No available transport method");
          o3(r3);
        })(ee(ee({}, e3), {}, { callback: (t3) => {
          var i3, s3, r3;
          (this.rateLimiter.checkForLimiting(t3), t3.statusCode >= 400) && (null === (s3 = (r3 = this.config).on_request_error) || void 0 === s3 || s3.call(r3, t3));
          null === (i3 = e3.callback) || void 0 === i3 || i3.call(e3, t3);
        } }))));
      }
      _send_retriable_request(e3) {
        this._retryQueue ? this._retryQueue.retriableRequest(e3) : this._send_request(e3);
      }
      _execute_array(e3) {
        var t3, i3 = [], s3 = [], r3 = [];
        g(e3, (e4) => {
          e4 && (t3 = e4[0], D(t3) ? r3.push(e4) : N(e4) ? e4.call(this) : D(e4) && "alias" === t3 ? i3.push(e4) : D(e4) && -1 !== t3.indexOf("capture") && N(this[t3]) ? r3.push(e4) : s3.push(e4));
        });
        var n3 = function(e4, t4) {
          g(e4, function(e5) {
            if (D(e5[0])) {
              var i4 = t4;
              f(e5, function(e6) {
                i4 = i4[e6[0]].apply(i4, e6.slice(1));
              });
            } else
              this[e5[0]].apply(this, e5.slice(1));
          }, t4);
        };
        n3(i3, this), n3(s3, this), n3(r3, this);
      }
      _hasBootstrappedFeatureFlags() {
        var e3, t3;
        return (null === (e3 = this.config.bootstrap) || void 0 === e3 ? void 0 : e3.featureFlags) && Object.keys(null === (t3 = this.config.bootstrap) || void 0 === t3 ? void 0 : t3.featureFlags).length > 0 || false;
      }
      push(e3) {
        this._execute_array([e3]);
      }
      capture(e3, t3, i3) {
        var s3;
        if (this.__loaded && this.persistence && this.sessionPersistence && this._requestQueue) {
          if (!this.consent.isOptedOut())
            if (!H(e3) && U(e3)) {
              if (this.config.opt_out_useragent_filter || !this._is_bot()) {
                var r3 = null != i3 && i3.skip_client_rate_limiting ? void 0 : this.rateLimiter.clientRateLimitContext();
                if (null == r3 || !r3.isRateLimited) {
                  this.sessionPersistence.update_search_keyword(), this.config.store_google && this.sessionPersistence.update_campaign_params(), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.store_google || this.config.save_referrer) && this.persistence.set_initial_person_info();
                  var n3 = /* @__PURE__ */ new Date(), o3 = (null == i3 ? void 0 : i3.timestamp) || n3, a3 = { uuid: Je(), event: e3, properties: this._calculate_event_properties(e3, t3 || {}, o3) };
                  r3 && (a3.properties.$lib_rate_limit_remaining_tokens = r3.remainingTokens), (null == i3 ? void 0 : i3.$set) && (a3.$set = null == i3 ? void 0 : i3.$set);
                  var l3 = this._calculate_set_once_properties(null == i3 ? void 0 : i3.$set_once);
                  l3 && (a3.$set_once = l3), (a3 = x(a3, null != i3 && i3._noTruncate ? null : this.config.properties_string_max_length)).timestamp = o3, H(null == i3 ? void 0 : i3.timestamp) || (a3.properties.$event_time_override_provided = true, a3.properties.$event_time_override_system_time = n3);
                  var u3 = ee(ee({}, a3.properties.$set), a3.$set);
                  if (B(u3) || this.setPersonPropertiesForFlags(u3), !j(this.config.before_send)) {
                    var c3 = this._runBeforeSend(a3);
                    if (!c3)
                      return;
                    a3 = c3;
                  }
                  this._internalEventEmitter.emit("eventCaptured", a3);
                  var d3 = { method: "POST", url: null !== (s3 = null == i3 ? void 0 : i3._url) && void 0 !== s3 ? s3 : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint), data: a3, compression: "best-available", batchKey: null == i3 ? void 0 : i3._batchKey };
                  return !this.config.request_batching || i3 && (null == i3 || !i3._batchKey) || null != i3 && i3.send_instantly ? this._send_retriable_request(d3) : this._requestQueue.enqueue(d3), a3;
                }
                X.critical("This capture call is ignored due to client rate limiting.");
              }
            } else
              X.error("No event name provided to posthog.capture");
        } else
          X.uninitializedWarning("posthog.capture");
      }
      _addCaptureHook(e3) {
        return this.on("eventCaptured", (t3) => e3(t3.event, t3));
      }
      _calculate_event_properties(e3, t3, i3) {
        if (i3 = i3 || /* @__PURE__ */ new Date(), !this.persistence || !this.sessionPersistence)
          return t3;
        var s3 = this.persistence.remove_event_timer(e3), r3 = ee({}, t3);
        if (r3.token = this.config.token, "$snapshot" === e3) {
          var n3 = ee(ee({}, this.persistence.properties()), this.sessionPersistence.properties());
          return r3.distinct_id = n3.distinct_id, (!U(r3.distinct_id) && !V(r3.distinct_id) || W(r3.distinct_id)) && X.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), r3;
        }
        var a3 = _i.properties();
        if (this.sessionManager) {
          var { sessionId: l3, windowId: u3 } = this.sessionManager.checkAndGetSessionAndWindowId();
          r3.$session_id = l3, r3.$window_id = u3;
        }
        if (this.requestRouter.region === cr.CUSTOM && (r3.$lib_custom_api_host = this.config.api_host), this.sessionPropsManager && this.config.__preview_send_client_session_params && ("$pageview" === e3 || "$pageleave" === e3 || "$autocapture" === e3)) {
          var c3 = this.sessionPropsManager.getSessionProps();
          r3 = m(r3, c3);
        }
        if (!this.config.disable_scroll_properties) {
          var h3 = {};
          "$pageview" === e3 ? h3 = this.pageViewManager.doPageView(i3) : "$pageleave" === e3 && (h3 = this.pageViewManager.doPageLeave(i3)), r3 = m(r3, h3);
        }
        if ("$pageview" === e3 && o && (r3.title = o.title), !H(s3)) {
          var _3 = i3.getTime() - s3;
          r3.$duration = parseFloat((_3 / 1e3).toFixed(3));
        }
        d && this.config.opt_out_useragent_filter && (r3.$browser_type = this._is_bot() ? "bot" : "browser"), (r3 = m({}, a3, this.persistence.properties(), this.sessionPersistence.properties(), r3)).$is_identified = this._isIdentified(), D(this.config.property_denylist) ? f(this.config.property_denylist, function(e4) {
          delete r3[e4];
        }) : X.error("Invalid value for property_denylist config: " + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
        var p3 = this.config.sanitize_properties;
        p3 && (r3 = p3(r3, e3));
        var v3 = this._hasPersonProcessing();
        return r3.$process_person_profile = v3, v3 && this._requirePersonProcessing("_calculate_event_properties"), r3;
      }
      _calculate_set_once_properties(e3) {
        if (!this.persistence || !this._hasPersonProcessing())
          return e3;
        var t3 = m({}, this.persistence.get_initial_props(), e3 || {}), i3 = this.config.sanitize_properties;
        return i3 && (t3 = i3(t3, "$set_once")), B(t3) ? void 0 : t3;
      }
      register(e3, t3) {
        var i3;
        null === (i3 = this.persistence) || void 0 === i3 || i3.register(e3, t3);
      }
      register_once(e3, t3, i3) {
        var s3;
        null === (s3 = this.persistence) || void 0 === s3 || s3.register_once(e3, t3, i3);
      }
      register_for_session(e3) {
        var t3;
        null === (t3 = this.sessionPersistence) || void 0 === t3 || t3.register(e3);
      }
      unregister(e3) {
        var t3;
        null === (t3 = this.persistence) || void 0 === t3 || t3.unregister(e3);
      }
      unregister_for_session(e3) {
        var t3;
        null === (t3 = this.sessionPersistence) || void 0 === t3 || t3.unregister(e3);
      }
      _register_single(e3, t3) {
        this.register({ [e3]: t3 });
      }
      getFeatureFlag(e3, t3) {
        return this.featureFlags.getFeatureFlag(e3, t3);
      }
      getFeatureFlagPayload(e3) {
        var t3 = this.featureFlags.getFeatureFlagPayload(e3);
        try {
          return JSON.parse(t3);
        } catch (e4) {
          return t3;
        }
      }
      isFeatureEnabled(e3, t3) {
        return this.featureFlags.isFeatureEnabled(e3, t3);
      }
      reloadFeatureFlags() {
        this.featureFlags.reloadFeatureFlags();
      }
      updateEarlyAccessFeatureEnrollment(e3, t3) {
        this.featureFlags.updateEarlyAccessFeatureEnrollment(e3, t3);
      }
      getEarlyAccessFeatures(e3) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return this.featureFlags.getEarlyAccessFeatures(e3, t3);
      }
      on(e3, t3) {
        return this._internalEventEmitter.on(e3, t3);
      }
      onFeatureFlags(e3) {
        return this.featureFlags.onFeatureFlags(e3);
      }
      onSessionId(e3) {
        var t3, i3;
        return null !== (t3 = null === (i3 = this.sessionManager) || void 0 === i3 ? void 0 : i3.onSessionId(e3)) && void 0 !== t3 ? t3 : () => {
        };
      }
      getSurveys(e3) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.surveys.getSurveys(e3, t3);
      }
      getActiveMatchingSurveys(e3) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.surveys.getActiveMatchingSurveys(e3, t3);
      }
      renderSurvey(e3, t3) {
        this.surveys.renderSurvey(e3, t3);
      }
      canRenderSurvey(e3) {
        this.surveys.canRenderSurvey(e3);
      }
      getNextSurveyStep(e3, t3, i3) {
        return this.surveys.getNextSurveyStep(e3, t3, i3);
      }
      identify(e3, t3, i3) {
        if (!this.__loaded || !this.persistence)
          return X.uninitializedWarning("posthog.identify");
        if (V(e3) && (e3 = e3.toString(), X.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), e3) {
          if (["distinct_id", "distinctid"].includes(e3.toLowerCase()))
            X.critical('The string "'.concat(e3, '" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.'));
          else if (this._requirePersonProcessing("posthog.identify")) {
            var s3 = this.get_distinct_id();
            if (this.register({ $user_id: e3 }), !this.get_property("$device_id")) {
              var r3 = s3;
              this.register_once({ $had_persisted_distinct_id: true, $device_id: r3 }, "");
            }
            e3 !== s3 && e3 !== this.get_property(re) && (this.unregister(re), this.register({ distinct_id: e3 }));
            var n3 = "anonymous" === (this.persistence.get_property(Re) || "anonymous");
            e3 !== s3 && n3 ? (this.persistence.set_property(Re, "identified"), this.setPersonPropertiesForFlags(t3 || {}, false), this.capture("$identify", { distinct_id: e3, $anon_distinct_id: s3 }, { $set: t3 || {}, $set_once: i3 || {} }), this.featureFlags.setAnonymousDistinctId(s3)) : (t3 || i3) && this.setPersonProperties(t3, i3), e3 !== s3 && (this.reloadFeatureFlags(), this.unregister(Fe));
          }
        } else
          X.error("Unique user id has not been set in posthog.identify");
      }
      setPersonProperties(e3, t3) {
        (e3 || t3) && this._requirePersonProcessing("posthog.setPersonProperties") && (this.setPersonPropertiesForFlags(e3 || {}), this.capture("$set", { $set: e3 || {}, $set_once: t3 || {} }));
      }
      group(e3, t3, i3) {
        if (e3 && t3) {
          if (this._requirePersonProcessing("posthog.group")) {
            var s3 = this.getGroups();
            s3[e3] !== t3 && this.resetGroupPropertiesForFlags(e3), this.register({ $groups: ee(ee({}, s3), {}, { [e3]: t3 }) }), i3 && (this.capture("$groupidentify", { $group_type: e3, $group_key: t3, $group_set: i3 }), this.setGroupPropertiesForFlags({ [e3]: i3 })), s3[e3] === t3 || i3 || this.reloadFeatureFlags();
          }
        } else
          X.error("posthog.group requires a group type and group key");
      }
      resetGroups() {
        this.register({ $groups: {} }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags();
      }
      setPersonPropertiesForFlags(e3) {
        var t3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        this._requirePersonProcessing("posthog.setPersonPropertiesForFlags") && this.featureFlags.setPersonPropertiesForFlags(e3, t3);
      }
      resetPersonPropertiesForFlags() {
        this.featureFlags.resetPersonPropertiesForFlags();
      }
      setGroupPropertiesForFlags(e3) {
        var t3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        this._requirePersonProcessing("posthog.setGroupPropertiesForFlags") && this.featureFlags.setGroupPropertiesForFlags(e3, t3);
      }
      resetGroupPropertiesForFlags(e3) {
        this.featureFlags.resetGroupPropertiesForFlags(e3);
      }
      reset(e3) {
        var t3, i3, s3, r3, n3;
        if (X.info("reset"), !this.__loaded)
          return X.uninitializedWarning("posthog.reset");
        var o3 = this.get_property("$device_id");
        this.consent.reset(), null === (t3 = this.persistence) || void 0 === t3 || t3.clear(), null === (i3 = this.sessionPersistence) || void 0 === i3 || i3.clear(), null === (s3 = this.surveys) || void 0 === s3 || s3.reset(), null === (r3 = this.persistence) || void 0 === r3 || r3.set_property(Re, "anonymous"), null === (n3 = this.sessionManager) || void 0 === n3 || n3.resetSessionId();
        var a3 = this.config.get_device_id(Je());
        this.register_once({ distinct_id: a3, $device_id: e3 ? a3 : o3 }, "");
      }
      get_distinct_id() {
        return this.get_property("distinct_id");
      }
      getGroups() {
        return this.get_property("$groups") || {};
      }
      get_session_id() {
        var e3, t3;
        return null !== (e3 = null === (t3 = this.sessionManager) || void 0 === t3 ? void 0 : t3.checkAndGetSessionAndWindowId(true).sessionId) && void 0 !== e3 ? e3 : "";
      }
      get_session_replay_url(e3) {
        if (!this.sessionManager)
          return "";
        var { sessionId: t3, sessionStartTimestamp: i3 } = this.sessionManager.checkAndGetSessionAndWindowId(true), s3 = this.requestRouter.endpointFor("ui", "/project/".concat(this.config.token, "/replay/").concat(t3));
        if (null != e3 && e3.withTimestamp && i3) {
          var r3, n3 = null !== (r3 = e3.timestampLookBack) && void 0 !== r3 ? r3 : 10;
          if (!i3)
            return s3;
          var o3 = Math.max(Math.floor(((/* @__PURE__ */ new Date()).getTime() - i3) / 1e3) - n3, 0);
          s3 += "?t=".concat(o3);
        }
        return s3;
      }
      alias(e3, t3) {
        return e3 === this.get_property(se) ? (X.critical("Attempting to create alias for existing People user - aborting."), -2) : this._requirePersonProcessing("posthog.alias") ? (H(t3) && (t3 = this.get_distinct_id()), e3 !== t3 ? (this._register_single(re, e3), this.capture("$create_alias", { alias: e3, distinct_id: t3 })) : (X.warn("alias matches current distinct_id - skipping api call."), this.identify(e3), -1)) : void 0;
      }
      set_config(e3) {
        var t3, i3, s3, r3, n3 = ee({}, this.config);
        q(e3) && (m(this.config, zn(e3)), null === (t3 = this.persistence) || void 0 === t3 || t3.update_config(this.config, n3), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new vi(ee(ee({}, this.config), {}, { persistence: "sessionStorage" })), st.is_supported() && "true" === st.get("ph_debug") && (this.config.debug = true), this.config.debug && (_.DEBUG = true, X.info("set_config", { config: e3, oldConfig: n3, newConfig: ee({}, this.config) })), null === (i3 = this.sessionRecording) || void 0 === i3 || i3.startIfEnabledOrStop(), null === (s3 = this.autocapture) || void 0 === s3 || s3.startIfEnabled(), null === (r3 = this.heatmaps) || void 0 === r3 || r3.startIfEnabled(), this.surveys.loadIfEnabled(), this._sync_opt_out_with_persistence());
      }
      startSessionRecording(e3) {
        var t3 = true === e3, i3 = { sampling: t3 || !(null == e3 || !e3.sampling), linked_flag: t3 || !(null == e3 || !e3.linked_flag), url_trigger: t3 || !(null == e3 || !e3.url_trigger), event_trigger: t3 || !(null == e3 || !e3.event_trigger) };
        if (Object.values(i3).some(Boolean)) {
          var s3, r3, n3, o3, a3;
          if (null === (s3 = this.sessionManager) || void 0 === s3 || s3.checkAndGetSessionAndWindowId(), i3.sampling)
            null === (r3 = this.sessionRecording) || void 0 === r3 || r3.overrideSampling();
          if (i3.linked_flag)
            null === (n3 = this.sessionRecording) || void 0 === n3 || n3.overrideLinkedFlag();
          if (i3.url_trigger)
            null === (o3 = this.sessionRecording) || void 0 === o3 || o3.overrideTrigger("url");
          if (i3.event_trigger)
            null === (a3 = this.sessionRecording) || void 0 === a3 || a3.overrideTrigger("event");
        }
        this.set_config({ disable_session_recording: false });
      }
      stopSessionRecording() {
        this.set_config({ disable_session_recording: true });
      }
      sessionRecordingStarted() {
        var e3;
        return !(null === (e3 = this.sessionRecording) || void 0 === e3 || !e3.started);
      }
      captureException(e3, t3) {
        var i3, s3 = new Error("PostHog syntheticException"), r3 = N(null === (i3 = h.__PosthogExtensions__) || void 0 === i3 ? void 0 : i3.parseErrorAsProperties) ? h.__PosthogExtensions__.parseErrorAsProperties([e3.message, void 0, void 0, void 0, e3], { syntheticException: s3 }) : ee({ $exception_level: "error", $exception_list: [{ type: e3.name, value: e3.message, mechanism: { handled: true, synthetic: false } }] }, t3);
        this.exceptions.sendExceptionEvent(r3);
      }
      loadToolbar(e3) {
        return this.toolbar.loadToolbar(e3);
      }
      get_property(e3) {
        var t3;
        return null === (t3 = this.persistence) || void 0 === t3 ? void 0 : t3.props[e3];
      }
      getSessionProperty(e3) {
        var t3;
        return null === (t3 = this.sessionPersistence) || void 0 === t3 ? void 0 : t3.props[e3];
      }
      toString() {
        var e3, t3 = null !== (e3 = this.config.name) && void 0 !== e3 ? e3 : Hn;
        return t3 !== Hn && (t3 = Hn + "." + t3), t3;
      }
      _isIdentified() {
        var e3, t3;
        return "identified" === (null === (e3 = this.persistence) || void 0 === e3 ? void 0 : e3.get_property(Re)) || "identified" === (null === (t3 = this.sessionPersistence) || void 0 === t3 ? void 0 : t3.get_property(Re));
      }
      _hasPersonProcessing() {
        var e3, t3, i3, s3;
        return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && B(this.getGroups()) && (null === (e3 = this.persistence) || void 0 === e3 || null === (t3 = e3.props) || void 0 === t3 || !t3[re]) && (null === (i3 = this.persistence) || void 0 === i3 || null === (s3 = i3.props) || void 0 === s3 || !s3[Oe]));
      }
      _shouldCapturePageleave() {
        return true === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && this.config.capture_pageview;
      }
      createPersonProfile() {
        this._hasPersonProcessing() || this._requirePersonProcessing("posthog.createPersonProfile") && this.setPersonProperties({}, {});
      }
      _requirePersonProcessing(e3) {
        return "never" === this.config.person_profiles ? (X.error(e3 + ' was called, but process_person is set to "never". This call will be ignored.'), false) : (this._register_single(Oe, true), true);
      }
      _sync_opt_out_with_persistence() {
        var e3, t3, i3, s3, r3 = this.consent.isOptedOut(), n3 = this.config.opt_out_persistence_by_default, o3 = this.config.disable_persistence || r3 && !!n3;
        (null === (e3 = this.persistence) || void 0 === e3 ? void 0 : e3.disabled) !== o3 && (null === (i3 = this.persistence) || void 0 === i3 || i3.set_disabled(o3));
        (null === (t3 = this.sessionPersistence) || void 0 === t3 ? void 0 : t3.disabled) !== o3 && (null === (s3 = this.sessionPersistence) || void 0 === s3 || s3.set_disabled(o3));
      }
      opt_in_capturing(e3) {
        var t3;
        (this.consent.optInOut(true), this._sync_opt_out_with_persistence(), H(null == e3 ? void 0 : e3.captureEventName) || null != e3 && e3.captureEventName) && this.capture(null !== (t3 = null == e3 ? void 0 : e3.captureEventName) && void 0 !== t3 ? t3 : "$opt_in", null == e3 ? void 0 : e3.captureProperties, { send_instantly: true });
        this.config.capture_pageview && this._captureInitialPageview();
      }
      opt_out_capturing() {
        this.consent.optInOut(false), this._sync_opt_out_with_persistence();
      }
      has_opted_in_capturing() {
        return this.consent.isOptedIn();
      }
      has_opted_out_capturing() {
        return this.consent.isOptedOut();
      }
      clear_opt_in_out_capturing() {
        this.consent.reset(), this._sync_opt_out_with_persistence();
      }
      _is_bot() {
        return n ? vn(n, this.config.custom_blocked_useragents) : void 0;
      }
      _captureInitialPageview() {
        o && !this._initialPageviewCaptured && (this._initialPageviewCaptured = true, this.capture("$pageview", { title: o.title }, { send_instantly: true }));
      }
      debug(t3) {
        false === t3 ? (null == e || e.console.log("You've disabled debug mode."), localStorage && localStorage.removeItem("ph_debug"), this.set_config({ debug: false })) : (null == e || e.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), localStorage && localStorage.setItem("ph_debug", "true"), this.set_config({ debug: true }));
      }
      _runBeforeSend(e3) {
        if (j(this.config.before_send))
          return e3;
        var t3 = D(this.config.before_send) ? this.config.before_send : [this.config.before_send], i3 = e3;
        for (var s3 of t3) {
          if (i3 = s3(i3), j(i3)) {
            var r3 = "Event '".concat(e3.event, "' was rejected in beforeSend function");
            return J(e3.event) ? X.warn("".concat(r3, ". This can cause unexpected behavior.")) : X.info(r3), null;
          }
          i3.properties && !B(i3.properties) || X.warn("Event '".concat(e3.event, "' has no properties after beforeSend function, this is likely an error."));
        }
        return i3;
      }
    };
    !function(e3, t3) {
      for (var i3 = 0; i3 < t3.length; i3++)
        e3.prototype[t3[i3]] = S(e3.prototype[t3[i3]]);
    }(Vn, ["identify"]);
    Qn = (Gn = qn[Hn] = new Vn(), function() {
      function t3() {
        t3.done || (t3.done = true, Un = false, f(qn, function(e3) {
          e3._dom_loaded();
        }));
      }
      null != o && o.addEventListener && ("complete" === o.readyState ? t3() : o.addEventListener("DOMContentLoaded", t3, false)), e && P(e, "load", t3, true);
    }(), Gn);
  }
});
function PostHogProvider(_a) {
  var children = _a.children, client = _a.client, apiKey2 = _a.apiKey, options = _a.options;
  var posthog = React8.useMemo(function() {
    if (client && apiKey2) {
      console.warn("[PostHog.js] You have provided both a client and an apiKey to PostHogProvider. The apiKey will be ignored in favour of the client.");
    }
    if (client && options) {
      console.warn("[PostHog.js] You have provided both a client and options to PostHogProvider. The options will be ignored in favour of the client.");
    }
    if (client) {
      return client;
    }
    if (apiKey2) {
      if (Qn.__loaded) {
        console.warn("[PostHog.js] was already loaded elsewhere. This may cause issues.");
      }
      Qn.init(apiKey2, options);
    }
    return Qn;
  }, [client, apiKey2]);
  return React8__namespace.default.createElement(PostHogContext.Provider, { value: { client: posthog } }, children);
}
var PostHogContext, usePostHog;
var init_esm = __esm({
  "../../node_modules/.pnpm/posthog-js@1.189.0/node_modules/posthog-js/react/dist/esm/index.js"() {
    init_module();
    PostHogContext = React8.createContext({ client: Qn });
    usePostHog = function() {
      var client = React8.useContext(PostHogContext).client;
      return client;
    };
  }
});
var t2, n2, o2, r2, a2, i2, s2, c2, l2, d2, p2, u2, m2, f2, h2, g2, y2, w2, b2, v2, x2, k2, C2, E2, S2, M2, L2, $, T2, F2, O2, R2, z2, j2, D2, A2, _2, P2, H2, B2, N2, I2, q2, V2, W2, X2, Y2, G2, U2, K2, J2, Q2, Z2, ee2, te2, ne2, oe2, re2, ae2, ie2, se2, ce2, le2, de2, pe2, ue2, me2, fe2, he2, ge2, ye2, we2, ve2, ke2, Ee2;
var init_dist = __esm({
  "../../node_modules/.pnpm/react-scan@0.0.31/node_modules/react-scan/dist/index.mjs"() {
    t2 = () => {
    };
    n2 = ({ onCommitFiberRoot: e3 }) => {
      let n3 = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      const o3 = /* @__PURE__ */ new Map();
      let r3 = 0;
      n3 || (n3 = { checkDCE: t2, supportsFiber: true, renderers: o3, onScheduleFiberRoot: t2, onCommitFiberRoot: t2, onCommitFiberUnmount: t2, inject(e4) {
        const t3 = ++r3;
        return o3.set(t3, e4), t3;
      } }, globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__ = n3);
      const a3 = n3.onCommitFiberRoot;
      return n3.onCommitFiberRoot = (t3, n4) => {
        a3 && a3(t3, n4), e3(t3, n4);
      }, n3;
    };
    n2({ onCommitFiberRoot() {
    } });
    o2 = (t3) => {
      switch (typeof t3) {
        case "function":
          return t3.toString();
        case "string":
          return t3;
        case "object":
          if (null === t3)
            return "null";
          if (Array.isArray(t3))
            return t3.length > 0 ? "[\u2026]" : "[]";
          if (React8__namespace.isValidElement(t3) && "$$typeof" in t3 && "symbol" == typeof t3.$$typeof && "Symbol(react.element)" === String(t3.$$typeof))
            return `<${a2(t3.type) ?? ""}${Object.keys(t3.props || {}).length > 0 ? " \u2026" : ""}>`;
          if ("object" == typeof t3 && null !== t3 && t3.constructor === Object) {
            for (const e3 in t3)
              if (Object.prototype.hasOwnProperty.call(t3, e3))
                return "{\u2026}";
            return "{}";
          }
          const n3 = Object.prototype.toString.call(t3).slice(8, -1);
          if ("Object" === n3) {
            const e3 = Object.getPrototypeOf(t3), n4 = e3?.constructor;
            if ("function" == typeof n4)
              return `${n4.displayName || n4.name || ""}{\u2026}`;
          }
          return `${n3}{\u2026}`;
        default:
          return String(t3);
      }
    };
    r2 = (e3) => "function" == typeof e3 ? e3 : "object" == typeof e3 && e3 ? r2(e3.type || e3.render) : null;
    a2 = (e3) => (e3 = r2(e3)) && (e3.displayName || e3.name) || null;
    i2 = (e3) => 5 === e3.tag || 26 === e3.tag || 27 === e3.tag;
    s2 = (e3) => {
      const t3 = e3.memoizedProps, n3 = e3.alternate?.memoizedProps || {}, o3 = e3.flags ?? e3.effectTag ?? 0;
      switch (e3.tag) {
        case 1:
        case 0:
        case 9:
        case 11:
        case 14:
        case 15:
          return !(1 & ~o3);
        default:
          return !e3.alternate || (n3 !== t3 || e3.alternate.memoizedState !== e3.memoizedState || e3.alternate.ref !== e3.ref);
      }
    };
    c2 = (e3) => {
      switch (e3.tag) {
        case 18:
        case 6:
        case 7:
        case 23:
        case 22:
          return true;
        case 3:
          return false;
        default: {
          const t3 = "object" == typeof e3.type && null !== e3.type ? e3.type.$$typeof : e3.type;
          switch ("symbol" == typeof t3 ? t3.toString() : t3) {
            case 60111:
            case "Symbol(react.concurrent_mode)":
            case "Symbol(react.async_mode)":
              return true;
            default:
              return false;
          }
        }
      }
    };
    l2 = (e3, t3, n3 = false) => {
      if (!e3)
        return null;
      if (true === t3(e3))
        return e3;
      let o3 = n3 ? e3.return : e3.child;
      for (; o3; ) {
        const e4 = l2(o3, t3, n3);
        if (e4)
          return e4;
        o3 = n3 ? null : o3.sibling;
      }
      return null;
    };
    d2 = (e3) => {
      const t3 = e3?.actualDuration ?? 0;
      let n3 = t3, o3 = e3?.child ?? null;
      for (; t3 > 0 && null != o3; )
        n3 -= o3.actualDuration ?? 0, o3 = o3.sibling;
      return n3;
    };
    p2 = (e3) => Boolean(e3.updateQueue?.memoCache);
    u2 = ["function", "object"];
    m2 = ({ onCommitStart: t3, onRender: i3, onCommitFinish: m3 }) => {
      const f3 = (n3, f4) => {
        if (we2.isPaused && "inspect-off" === we2.inspectState.kind || false === we2.options.enabled)
          return;
        t3();
        const h3 = (t4) => {
          const n4 = r2(t4.type);
          if (!n4)
            return null;
          if (!s2(t4))
            return null;
          const c3 = ((t5, n5) => {
            const r3 = [], i4 = t5.alternate?.memoizedProps, s3 = t5.memoizedProps;
            for (const t6 in { ...i4, ...s3 }) {
              const n6 = i4?.[t6], a3 = s3?.[t6];
              if (Object.is(n6, a3) || React8__namespace.isValidElement(n6) || React8__namespace.isValidElement(a3) || "children" === t6)
                continue;
              const c4 = { name: t6, prevValue: n6, nextValue: a3, unstable: false };
              r3.push(c4);
              const l3 = o2(n6), d3 = o2(a3);
              u2.includes(typeof n6) && u2.includes(typeof a3) && l3 === d3 && (c4.unstable = true);
            }
            return { type: "props", count: 1, trigger: false, changes: r3, name: a2(n5), time: d2(t5), forget: p2(t5) };
          })(t4, n4), m4 = ((e3, t5) => {
            const n5 = [], r3 = ((e4, t6) => {
              const n6 = e4.dependencies, o3 = e4.alternate?.dependencies;
              if (!n6 || !o3)
                return false;
              if ("object" != typeof n6 || !("firstContext" in n6) || "object" != typeof o3 || !("firstContext" in o3))
                return false;
              let r4 = n6.firstContext, a3 = o3.firstContext;
              for (; r4 && "object" == typeof r4 && "memoizedValue" in r4 && a3 && "object" == typeof a3 && "memoizedValue" in a3; ) {
                if (true === t6(r4, a3))
                  return true;
                r4 = r4.next, a3 = a3.next;
              }
              return false;
            })(e3, (e4, t6) => {
              const r4 = e4.memoizedValue, a3 = t6.memoizedValue, i4 = { name: "", prevValue: r4, nextValue: a3, unstable: false };
              n5.push(i4);
              const s3 = o2(r4), c4 = o2(a3);
              u2.includes(typeof r4) && u2.includes(typeof a3) && s3 === c4 && (i4.unstable = true);
            });
            return r3 ? { type: "context", count: 1, trigger: false, changes: n5, name: a2(t5), time: d2(e3), forget: p2(e3) } : null;
          })(t4, n4);
          let f5 = false;
          if (t4.alternate) {
            const e3 = ((e4, t5) => {
              let n5 = e4.memoizedState, o3 = e4.alternate?.memoizedState;
              for (; n5 && o3; ) {
                if (true === t5(n5, o3))
                  return true;
                n5 = n5.next, o3 = o3.next;
              }
              return false;
            })(t4, (e4, t5) => !Object.is(e4.memoizedState, t5.memoizedState));
            e3 && (f5 = true);
          }
          const h4 = a2(n4);
          if (h4 && (((e3, t5) => {
            const [n5, o3] = (() => {
              const t6 = we2.reportDataByFiber.get(e3);
              if (t6)
                return [e3, t6];
              if (!e3.alternate)
                return [e3, null];
              const n6 = we2.reportDataByFiber.get(e3.alternate);
              return [e3.alternate, n6];
            })();
            if (o3)
              for (let e4 = 0, n6 = t5.length; e4 < n6; e4++) {
                const n7 = t5[e4];
                n7 && o3.badRenders.push(n7);
              }
            const r3 = d2(e3);
            we2.reportDataByFiber.set(n5, { count: (o3?.count ?? 0) + 1, time: (o3?.time ?? 0) + (0 !== r3 ? r3 : 0.1), badRenders: o3?.badRenders ?? [], displayName: a2(e3.type) }), we2.emit("reportDataByFiber", we2.reportDataByFiber);
          })(t4, [c3, m4]), ((e3, t5, n5) => {
            if (false === we2.options.report)
              return;
            const o3 = we2.reportData[e3];
            if (o3)
              for (let e4 = 0, t6 = n5.length; e4 < t6; e4++) {
                const t7 = n5[e4];
                t7 && o3.badRenders.push(t7);
              }
            const a3 = d2(t5) ?? 0;
            we2.reportData[e3] = { count: (o3?.count ?? 0) + 1, time: (o3?.time ?? 0) + a3, badRenders: o3?.badRenders || [], type: r2(t5.type) || t5.type };
          })(h4, t4, [c3, m4])), !c3 && !m4)
            return null;
          const g4 = we2.componentAllowList, y4 = g4?.has(t4.type) ?? g4?.has(t4.elementType);
          if (y4) {
            if (!l2(t4, (e3) => {
              const t5 = g4?.get(e3.type) ?? g4?.get(e3.elementType);
              return t5?.includeChildren;
            }, true) && !y4)
              return null;
          }
          c3 && (c3.trigger = f5, i3(t4, c3)), m4 && (m4.trigger = f5, i3(t4, m4)), f5 && i3(t4, { type: "state", count: 1, trigger: f5, changes: [], name: a2(n4), time: d2(t4), forget: p2(t4) }), c3 || m4 || f5 || i3(t4, { type: "misc", count: 1, trigger: f5, changes: [], name: a2(n4), time: d2(t4), forget: p2(t4) });
        }, g3 = f4.current, y3 = null !== g3.alternate && Boolean(g3.alternate.memoizedState?.element) && true !== g3.alternate.memoizedState.isDehydrated, w3 = Boolean(g3.memoizedState?.element), b3 = (e3, t4) => {
          let n4 = e3;
          for (; null != n4; ) {
            !c2(n4) && h3(n4), null != n4.child && b3(n4.child, true), n4 = t4 ? n4.sibling : null;
          }
        }, v3 = (e3, t4) => {
          if (!t4)
            return;
          if (!c2(e3) && h3(e3), e3.child !== t4.child) {
            let t5 = e3.child;
            for (; t5; ) {
              const e4 = t5.alternate;
              e4 ? v3(t5, e4) : b3(t5, false), t5 = t5.sibling;
            }
          }
        };
        !y3 && w3 ? b3(g3, false) : y3 && w3 && v3(g3, g3.alternate), m3();
      };
      we2.onCommitFiberRoot = (e3, t4) => {
        t4 && we2.fiberRoots.add(t4);
        try {
          f3(0, t4);
        } catch (e4) {
          console.error("[React Scan] Error instrumenting: ", e4);
        }
      }, n2({ onCommitFiberRoot: we2.onCommitFiberRoot });
    };
    f2 = (e3) => {
      let t3 = "";
      const n3 = /* @__PURE__ */ new Map();
      for (let t4 = 0, o4 = e3.length; t4 < o4; t4++) {
        const o5 = e3[t4], r4 = o5.name;
        if (!r4?.trim())
          continue;
        const { count: a3, trigger: i3, forget: s3 } = n3.get(r4) ?? { count: 0, trigger: false, forget: false };
        n3.set(r4, { count: a3 + o5.count, trigger: i3 || o5.trigger, forget: s3 || o5.forget });
      }
      const o3 = Array.from(n3.entries()).sort(([, e4], [, t4]) => t4.count - e4.count), r3 = [];
      for (const [e4, { count: t4, trigger: n4, forget: a3 }] of o3) {
        let o4 = e4;
        t4 > 1 && (o4 += ` \xD7${t4}`), n4 && (o4 = `\u{1F525} ${o4}`), a3 && (o4 = `${o4} \u2728`), r3.push(o4);
      }
      return t3 = r3.join(" "), t3.length ? (t3.length > 20 && (t3 = `${t3.slice(0, 20)}\u2026`), t3) : null;
    };
    h2 = (e3, t3) => {
      let n3 = 0;
      return (...o3) => {
        const r3 = Date.now();
        if (r3 - n3 >= t3)
          return n3 = r3, e3(...o3);
      };
    };
    g2 = (e3) => {
      for (let t3 = 0, n3 = e3.renders.length; t3 < n3; t3++) {
        const n4 = e3.renders[t3];
        if (n4.changes)
          for (let e4 = 0, t4 = n4.changes.length; e4 < t4; e4++) {
            if (n4.changes[e4].unstable)
              return true;
          }
      }
      return false;
    };
    y2 = "Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace";
    w2 = 115;
    b2 = 97;
    v2 = 230;
    x2 = 185;
    k2 = 49;
    C2 = 115;
    E2 = /* @__PURE__ */ new Map();
    S2 = (e3) => {
      const t3 = performance.now(), n3 = E2.get(e3);
      if (n3 && t3 - n3.timestamp < 32)
        return n3.rect;
      const o3 = window.getComputedStyle(e3);
      if ("none" === o3.display || "hidden" === o3.visibility || "0" === o3.opacity)
        return null;
      const r3 = e3.getBoundingClientRect();
      return r3.bottom > 0 && r3.right > 0 && r3.top < window.innerHeight && r3.left < window.innerWidth && r3.width && r3.height ? (E2.set(e3, { rect: r3, timestamp: t3 }), r3) : null;
    };
    M2 = (e3, t3) => {
      const n3 = ((e4) => {
        let t4 = l2(e4, i2);
        return t4 || (t4 = l2(e4, i2, true)), t4;
      })(e3);
      if (!n3)
        return null;
      const o3 = n3.stateNode;
      if (!(o3 instanceof HTMLElement))
        return null;
      let r3 = false, a3 = o3;
      for (; a3; ) {
        if (a3.hasAttribute("data-react-scan-ignore")) {
          r3 = true;
          break;
        }
        a3 = a3.parentElement;
      }
      if (r3)
        return null;
      const s3 = S2(o3);
      return s3 ? { rect: s3, domNode: o3, renders: [t3] } : null;
    };
    L2 = h2(() => {
      const { scheduledOutlines: e3, activeOutlines: t3 } = we2;
      for (let t4 = e3.length - 1; t4 >= 0; t4--) {
        const n3 = e3[t4], o3 = S2(n3.domNode);
        o3 ? n3.rect = o3 : e3.splice(t4, 1);
      }
      for (let e4 = t3.length - 1; e4 >= 0; e4--) {
        const n3 = t3[e4];
        if (!n3)
          continue;
        const { outline: o3 } = n3, r3 = S2(o3.domNode);
        r3 ? o3.rect = r3 : t3.splice(e4, 1);
      }
    }, 32);
    $ = (e3, t3 = /* @__PURE__ */ new Map()) => {
      if (!we2.scheduledOutlines.length)
        return;
      const n3 = we2.scheduledOutlines;
      we2.scheduledOutlines = [], L2();
      const o3 = /* @__PURE__ */ new Map();
      !async function(e4, t4) {
        new Promise((n4) => {
          const { options: o4 } = we2, r3 = o4.alwaysShowLabels ? 60 : 30, a3 = 0.8;
          o4.onPaintStart?.(t4);
          const i3 = t4.map((e5) => {
            const t5 = e5.renders;
            return { outline: e5, alpha: a3, frame: 0, totalFrames: r3, resolve: n4, text: f2(t5) };
          });
          we2.activeOutlines.push(...i3), T2 || (T2 = requestAnimationFrame(() => F2(e4)));
        });
      }(e3, n3.filter((e4) => {
        const n4 = ((e5) => `${e5.rect.top}-${e5.rect.left}-${e5.rect.width}-${e5.rect.height}`)(e4);
        return !t3.has(n4) && (o3.set(n4, e4), true);
      })), we2.scheduledOutlines.length && requestAnimationFrame(() => {
        $(e3, o3);
      });
    };
    T2 = null;
    F2 = (e3) => {
      const { activeOutlines: t3, options: n3 } = we2, o3 = window.devicePixelRatio || 1;
      e3.clearRect(0, 0, e3.canvas.width / o3, e3.canvas.height / o3);
      const r3 = /* @__PURE__ */ new Map();
      for (let e4 = t3.length - 1; e4 >= 0; e4--) {
        const o4 = t3[e4];
        if (!o4)
          continue;
        const { outline: a4 } = o4, { rect: i4 } = a4, s3 = `${i4.x}-${i4.y}`;
        if (r3.has(s3)) {
          const n4 = r3.get(s3);
          n4.outline.renders !== a4.renders && (n4.outline.renders = [...n4.outline.renders, ...a4.renders]), n4.alpha = Math.max(n4.alpha, o4.alpha), n4.frame = Math.min(n4.frame, o4.frame), n4.totalFrames = Math.max(n4.totalFrames, o4.totalFrames), t3.splice(e4, 1);
        } else
          r3.set(s3, o4);
        o4.frame++;
        const c3 = o4.frame / o4.totalFrames, l3 = g2(o4.outline) || n3.alwaysShowLabels ? 0.8 : 0.2;
        o4.alpha = l3 * (1 - c3), o4.frame >= o4.totalFrames && (o4.resolve(), t3.splice(e4, 1));
      }
      const a3 = [];
      e3.save();
      const i3 = n3.renderCountThreshold ?? 0;
      for (const t4 of Array.from(r3.values())) {
        const { outline: o4, frame: r4, totalFrames: s3 } = t4;
        let c3 = 0, l3 = 0;
        for (let e4 = 0, t5 = o4.renders.length; e4 < t5; e4++) {
          const t6 = o4.renders[e4];
          c3 += t6.count, l3 += t6.time;
        }
        const d3 = we2.options.maxRenders ?? 100, p3 = Math.min(c3 * (l3 || 1) / d3, 1), u3 = { r: Math.round(w2 + p3 * (x2 - w2)), g: Math.round(b2 + p3 * (k2 - b2)), b: Math.round(v2 + p3 * (C2 - v2)) }, { rect: m3 } = o4, h3 = g2(o4);
        if (i3 > 0) {
          let e4 = 0;
          for (let t5 = 0, n4 = o4.renders.length; t5 < n4; t5++) {
            e4 += o4.renders[t5].count;
          }
          if (e4 < i3)
            continue;
        }
        const y3 = h3 || n3.alwaysShowLabels, E3 = y3 ? 0.8 : 0.2;
        t4.alpha = E3 * (1 - r4 / s3);
        const S3 = t4.alpha, M3 = y3 ? 0.1 * t4.alpha : 0, L3 = `${u3.r},${u3.g},${u3.b}`;
        if (e3.strokeStyle = `rgba(${L3},${S3})`, e3.lineWidth = 1, e3.fillStyle = `rgba(${L3},${M3})`, e3.beginPath(), e3.rect(m3.x, m3.y, m3.width, m3.height), e3.stroke(), e3.fill(), y3) {
          const e4 = f2(o4.renders);
          a3.push({ alpha: S3, outline: o4, text: e4, color: u3 });
        }
      }
      e3.restore();
      for (let t4 = 0, n4 = a3.length; t4 < n4; t4++) {
        const { alpha: n5, outline: o4, text: r4, color: i4 } = a3[t4], { rect: s3 } = o4;
        if (e3.save(), r4) {
          e3.font = `11px ${y2}`;
          const t5 = e3.measureText(r4).width, o5 = 11, a4 = s3.x, c3 = s3.y - o5 - 4;
          e3.fillStyle = `rgba(${i4.r},${i4.g},${i4.b},${n5})`, e3.fillRect(a4, c3, t5 + 4, o5 + 4), e3.fillStyle = `rgba(255,255,255,${n5})`, e3.fillText(r4, a4 + 2, c3 + o5);
        }
        e3.restore();
      }
      T2 = t3.length ? requestAnimationFrame(() => F2(e3)) : null;
    };
    j2 = () => {
      class e3 extends HTMLElement {
        canvas;
        ctx;
        constructor() {
          super();
          const e4 = this.attachShadow({ mode: "open" });
          this.canvas = document.createElement("canvas"), this.setupCanvas(), e4.appendChild(this.canvas);
        }
        getContext() {
          return this.ctx;
        }
        setupCanvas() {
          this.canvas.id = "react-scan-canvas", this.canvas.style.position = "fixed", this.canvas.style.top = "0", this.canvas.style.left = "0", this.canvas.style.width = "100vw", this.canvas.style.height = "100vh", this.canvas.style.pointerEvents = "none", this.canvas.style.zIndex = "2147483646", this.canvas.setAttribute("aria-hidden", "true");
          const e4 = "OffscreenCanvas" in globalThis ? this.canvas.transferControlToOffscreen() : this.canvas;
          this.ctx = e4.getContext("2d");
          let t3 = false;
          const n3 = () => {
            const e5 = window.devicePixelRatio || 1;
            this.ctx.canvas.width = e5 * window.innerWidth, this.ctx.canvas.height = e5 * window.innerHeight, this.canvas.style.width = `${window.innerWidth}px`, this.canvas.style.height = `${window.innerHeight}px`, this.ctx.resetTransform(), this.ctx.scale(e5, e5), t3 = false;
          };
          n3(), window.addEventListener("resize", () => {
            L2(), t3 || (t3 = true, requestAnimationFrame(() => {
              n3();
            }));
          }), window.addEventListener("scroll", () => {
            L2();
          });
        }
      }
      return customElements.define("react-scan-overlay", e3), e3;
    };
    D2 = (e3) => {
      if (!e3)
        return null;
      const t3 = ((e4) => {
        if ("__REACT_DEVTOOLS_GLOBAL_HOOK__" in window) {
          const { renderers: t4 } = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (!t4)
            return null;
          for (const [n4, o3] of Array.from(t4))
            try {
              const t5 = o3.findFiberByHostInstance(e4);
              if (t5)
                return t5;
            } catch (e5) {
            }
        }
        if ("_reactRootContainer" in e4)
          return e4._reactRootContainer?._internalRoot?.current?.child;
        for (const t4 in e4)
          if (t4.startsWith("__reactInternalInstance$") || t4.startsWith("__reactFiber"))
            return e4[t4];
        return null;
      })(e3);
      if (!t3)
        return null;
      const n3 = A2(t3);
      return n3 ? n3[0] : null;
    };
    A2 = (e3) => {
      let t3 = e3, n3 = null;
      for (; t3; ) {
        if (0 === t3.tag || 1 === t3.tag)
          return [t3, n3];
        i2(t3) && (n3 = t3), t3 = t3.return;
      }
    };
    _2 = (e3) => {
      if (!e3)
        return {};
      if (0 === e3.tag || 11 === e3.tag) {
        let t3 = e3.memoizedState;
        const n3 = {};
        let o3 = 0;
        for (; t3; )
          t3.queue && void 0 !== t3.memoizedState && (n3[o3] = t3.memoizedState), t3 = t3.next, o3++;
        return n3;
      }
      return 1 === e3.tag && e3.memoizedState || {};
    };
    P2 = (e3) => {
      let t3 = e3, n3 = null;
      for (; t3; ) {
        if (t3.stateNode && we2.fiberRoots.has(t3.stateNode)) {
          n3 = t3;
          break;
        }
        t3 = t3.return;
      }
      if (!n3)
        return false;
      return ((e4, t4) => !!l2(t4, (t5) => t5 === e4))(e3, n3.stateNode.current);
    };
    H2 = (e3) => {
      const t3 = D2(e3);
      if (!t3)
        return {};
      const n3 = P2(t3) ? t3 : t3.alternate ?? t3, o3 = ((e4) => {
        let t4 = e4;
        for (; t4; ) {
          if (t4.stateNode instanceof HTMLElement)
            return t4.stateNode;
          if (!t4.child)
            return null;
          t4 = t4.child;
        }
        return null;
      })(n3);
      if (!o3)
        return {};
      const r3 = S2(o3);
      if (!r3)
        return {};
      const a3 = A2(n3);
      if (!a3)
        return {};
      let [i3] = a3;
      return i3 = (P2(i3) ? i3 : i3.alternate) ?? i3, { parentCompositeFiber: i3, targetRect: r3 };
    };
    B2 = () => {
      if ("focused" !== we2.inspectState.kind)
        return false;
      const { focusedDomElement: e3 } = we2.inspectState;
      if (!e3)
        return false;
      let t3 = false;
      if (e3.parentElement) {
        const n3 = D2(e3);
        let o3 = e3.parentElement;
        for (; o3; ) {
          const e4 = D2(o3);
          if (!e4 || e4 !== n3) {
            t3 = true;
            break;
          }
          o3 = o3.parentElement;
        }
      }
      return t3;
    };
    N2 = false;
    I2 = false;
    q2 = 0;
    V2 = 0;
    W2 = 15;
    X2 = h2((e3) => {
      localStorage.setItem("react-scan-toolbar-width", String(e3));
    }, 100);
    Y2 = () => {
      if ("undefined" == typeof window)
        return () => {
        };
      const e3 = '\n<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>\n  ', t3 = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-dashed-mouse-pointer"><path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h2"/><path d="M14 3h1"/><path d="M3 9v1"/><path d="M21 9v2"/><path d="M3 14v1"/></svg>', n3 = "150ms", o3 = '\n    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>\n  ', r3 = ((e4) => {
        const t4 = document.createElement("template");
        return t4.innerHTML = e4.trim(), t4.content.firstElementChild;
      })(`
  <div id="react-scan-toolbar" style="
    position: fixed;
    z-index: 2147483647;
    font-family: ${y2};
    font-size: 13px;
    background: transparent;
    user-select: none;
    right: 24px;
    bottom: 24px;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    pointer-events: none;
    max-height: 450px;
  ">
    <div id="react-scan-toolbar-content" style="
      background: rgba(0, 0, 0, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column-reverse;
      cursor: move;
      pointer-events: auto;
      overflow: hidden;
      width: fit-content;
      min-width: min-content;
      position: relative;
    ">
      <div style="display: flex; align-items: center; height: 36px; width: 100%;">
        <button id="${fe2}" style="
          padding: 0 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          transition: all ${n3} ease;
          height: 100%;
          min-width: 36px;
          outline: none;
        " title="Inspect element">
          ${t3}
        </button>
        <button id="react-scan-power" style="
          padding: 0 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          transition: all ${n3} ease;
          height: 100%;
          min-width: 36px;
          outline: none;
        " title="Start">
          ${e3}
        </button>
        <button id="react-scan-sound-toggle" style="
          padding: 0 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          transition: all ${n3} ease;
          height: 100%;
          min-width: 36px;
          outline: none;
        " title="Sound On">
          ${o3}
        </button>
        <div style="
          padding: 0 12px;
          color: #fff;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          height: 100%;
          flex: 1;
          justify-content: space-evenly;
        ">
          <div style="display: flex; gap: 8px; align-items: center;">
            <button id="react-scan-parent-focus" style="
              padding: 4px 10px;
              display: none;
              align-items: center;
              justify-content: center;
              background: none;
              color: #fff;
              cursor: pointer;
              transition: all ${n3} ease;
              height: 26px;
              outline: none;
               border: none;
              font-size: 12px;
              white-space: nowrap;
               font-family: ${y2};
            ">jump to parent</button>
            <button id="react-scan-previous-focus" style="
              padding: 4px 10px;
              display: none;
              align-items: center;
              justify-content: center;
              background: none;
              color: #fff;
              cursor: pointer;
              transition: all ${n3} ease;
              height: 26px;
              outline: none;
               border: none;
              font-size: 12px;
              white-space: nowrap;
            "><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/></svg></button>
          </div>
           <span style="font-size: 14px; font-weight: 500;">react-scan</span>
        </div>
      </div>
      <div id="react-scan-props" style="
        pointer-events: auto;
        background: #000;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        min-width: 100%;
        width: 360px;
        overflow: auto;
        max-height: 0;
        transition: max-height 500ms cubic-bezier(0, 0.95, 0.1, 1);
      ">
        <!-- Props content will be injected here -->
      </div>
      <div id="react-scan-resize-handle" style="
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        cursor: ew-resize;
        dis
      "></div>
    </div>
  </div>
`), a3 = document.createElement("style");
      a3.textContent = `
  #react-scan-toolbar {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }


  .react-scan-inspector {
    font-size: 13px;
    width: 360px;
    color: #fff;
    width: 100%;
  }

  .react-scan-header {
    padding: 8px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    gap: 8px;
    align-items: center;
    background: #000;
  }

  .react-scan-component-name {
    font-weight: 500;
    color: #fff;
  }

  .react-scan-metrics {
    color: #888;
    font-size: 12px;
  }

  .react-scan-content {
    padding: 12px;
    background: #000;
  }

  .react-scan-section {
    color: #888;
    margin-bottom: 16px;
    font-size: 12px;
  }

  .react-scan-section:last-child {
    margin-bottom: 0;
  }

  .react-scan-property {
    margin-left: 14px;
    margin-top: 8px;
    position: relative;
  }

  .react-scan-section > .react-scan-property:first-child {
    margin-top: 4px;
  }

  .react-scan-key {
    color: #fff;
  }

  .react-scan-string {
    color: #9ECBFF;
  }

  .react-scan-number {
    color: #79C7FF;
  }

  .react-scan-boolean {
    color: #56B6C2;
  }

  .react-scan-object-key {
    color: #fff;
  }

  .react-scan-array {
    color: #fff;
  }

  .react-scan-expandable {
    display: flex;
    align-items: flex-start;
  }

  .react-scan-arrow {
    cursor: pointer;
    content: '\u25B6';
    display: inline-block;
    font-size: 8px;
    margin: 5px 4px 0 0;
    transition: transform ${n3} ease;
    width: 8px;
    flex-shrink: 0;
    color: #888;
  }

  .react-scan-expanded > .react-scan-arrow {
    transform: rotate(90deg);
  }

  .react-scan-property-content {
    flex: 1;
    min-width: 0;
  }

  .react-scan-hidden {
    display: none;
  }

  .react-scan-array-container {
    overflow-y: auto;
    margin-left: 14px;
    margin-top: 8px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding-left: 8px;
  }

  .react-scan-nested-object {
    margin-left: 14px;
    margin-top: 8px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding-left: 8px;
  }

  .react-scan-nested-object > .react-scan-property {
    margin-top: 8px;
  }

  .react-scan-nested-object > .react-scan-property:first-child {
    margin-top: 0;
  }

 .react-scan-preview-line {
  position: relative;
  padding: 3px 6px;
  border-radius: 4px;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  display: flex;
  align-items: center;
}
.react-scan-flash-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(142, 97, 227, 1);
  pointer-events: none;
  opacity: 0;
  z-index: 999999;
  mix-blend-mode: multiply;
  transition: opacity ${n3} ease-in;
  border-radius: 4px;
}

.react-scan-flash-active {
  opacity: 0.4;
  transition: opacity 300ms ease-in-out;
}

  /* Hover states */
  #react-scan-toolbar button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  #react-scan-toolbar button:active {
    background: rgba(255, 255, 255, 0.15);
  }

  /* Focus states */
  #react-scan-toolbar button:focus-visible {
    outline: 2px solid #0070F3;
    outline-offset: -2px;
  }

  /* Scrollbar styling */
  .react-scan-props::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .react-scan-props::-webkit-scrollbar-track {
    background: transparent;
  }

  .react-scan-props::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .react-scan-props::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  ::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* For Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
}
  `, document.head && document.head.appendChild(a3);
      const i3 = r3.querySelector(`#${fe2}`), s3 = r3.querySelector("#react-scan-power"), c3 = r3.querySelector("#react-scan-parent-focus"), l3 = r3.querySelector("#react-scan-previous-focus"), d3 = r3.querySelector("#react-scan-sound-toggle"), p3 = [], u3 = r3.querySelector("#react-scan-props"), m3 = r3.querySelector("#react-scan-toolbar-content"), f3 = r3.querySelector("#react-scan-resize-handle");
      let g3 = !we2.isPaused, w3 = false;
      document.documentElement.appendChild(r3);
      let b3 = 0, v3 = 0, x3 = 0, k3 = 0;
      const C3 = (e4, t4) => {
        r3.style.transform = `translate(${e4}px, ${t4}px)`;
      };
      C3(0, 0);
      const E3 = () => {
        const e4 = r3.getBoundingClientRect(), t4 = window.innerWidth, n4 = window.innerHeight, o4 = [{ edge: "left", distance: Math.abs(e4.left - W2), deltaX: W2 - e4.left, deltaY: 0 }, { edge: "right", distance: Math.abs(t4 - W2 - e4.right), deltaX: t4 - W2 - e4.right, deltaY: 0 }, { edge: "top", distance: Math.abs(e4.top - W2), deltaX: 0, deltaY: W2 - e4.top }, { edge: "bottom", distance: Math.abs(n4 - W2 - e4.bottom), deltaX: 0, deltaY: n4 - W2 - e4.bottom }].reduce((e5, t5) => t5.distance < e5.distance ? t5 : e5);
        x3 += o4.deltaX, k3 += o4.deltaY, r3.style.transition = "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)", C3(x3, k3), setTimeout(() => {
          r3.style.transition = "";
        }, 300);
      };
      m3.addEventListener("mousedown", (e4) => {
        if (e4.target === i3 || e4.target === s3 || e4.target === c3 || e4.target === f3)
          return;
        N2 = true;
        const t4 = new DOMMatrix(getComputedStyle(r3).transform);
        x3 = t4.m41, k3 = t4.m42, b3 = e4.clientX - x3, v3 = e4.clientY - k3, r3.style.transition = "none", e4.preventDefault();
      }), f3.addEventListener("mousedown", (e4) => {
        I2 = true, q2 = u3.offsetWidth, V2 = e4.clientX, e4.preventDefault();
      }), document.addEventListener("mousemove", (e4) => {
        if (N2) {
          const t4 = e4.clientX - b3, n4 = e4.clientY - v3;
          x3 = t4, k3 = n4, C3(t4, n4);
        }
        if (I2) {
          const t4 = q2 - (e4.clientX - V2);
          u3.style.width = `${Math.max(360, t4)}px`, X2(t4);
        }
      }), document.addEventListener("mouseup", () => {
        N2 && (N2 = false, E3()), I2 && (I2 = false);
      });
      const S3 = () => {
        s3.innerHTML = g3 ? '\n <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>\n  ' : e3, s3.title = g3 ? "Stop" : "Start", s3.style.color = g3 ? "#fff" : "#999";
        const n4 = "focused" === we2.inspectState.kind, r4 = "inspecting" === we2.inspectState.kind;
        r4 ? (i3.innerHTML = t3, i3.style.color = "rgba(142, 97, 227, 1)") : n4 ? (i3.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-mouse-pointer"><path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/><path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/></svg>', i3.style.color = "rgba(142, 97, 227, 1)") : i3.style.color = "#999", r4 || n4 ? n4 && (f3.style.display = "block") : (u3.style.maxHeight = "0", u3.style.width = "fit-content", u3.innerHTML = "", f3.style.display = "none"), d3.innerHTML = w3 ? o3 : '\n    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>\n  ', d3.style.color = w3 ? "#fff" : "#999", d3.title = w3 ? "Sound On" : "Sound Off", (() => {
          if ("focused" === we2.inspectState.kind) {
            const e4 = B2();
            if (!we2.inspectState.focusedDomElement)
              return c3.style.display = "none", void (l3.style.display = "none");
            c3.style.display = "flex", c3.style.color = e4 ? "#999" : "#444", c3.style.cursor = e4 ? "pointer" : "not-allowed", l3.style.display = p3.length > 0 ? "flex" : "none", l3.style.color = "#999", l3.style.cursor = "pointer";
          } else
            c3.style.display = "none", l3.style.display = "none";
        })();
      };
      s3.addEventListener("click", (e4) => {
        e4.stopPropagation(), g3 = !g3, we2.isPaused = !g3, localStorage.setItem("react-scan-paused", String(we2.isPaused)), S3();
      }), i3.addEventListener("click", (e4) => {
        e4.stopPropagation();
        const t4 = we2.inspectState;
        switch (t4.kind) {
          case "inspecting":
            return u3.innerHTML = "", u3.style.maxHeight = "0", u3.style.width = "fit-content", we2.inspectState = { kind: "inspect-off", propContainer: t4.propContainer }, void setTimeout(() => {
              "inspect-off" === we2.inspectState.kind && (we2.inspectState = { kind: "inspect-off", propContainer: t4.propContainer });
            }, 500);
          case "focused":
            u3.style.maxHeight = "0", u3.style.width = "fit-content", u3.innerHTML = "", we2.inspectState = { kind: "inspecting", hoveredDomElement: t4.focusedDomElement, propContainer: t4.propContainer };
            break;
          case "inspect-off":
            we2.inspectState = { kind: "inspecting", hoveredDomElement: null, propContainer: u3 };
        }
        S3();
      }), c3.addEventListener("click", (e4) => {
        e4.stopPropagation();
        const t4 = we2.inspectState;
        if ("focused" !== t4.kind)
          return;
        const { focusedDomElement: n4 } = t4;
        if (!n4 || !n4.parentElement)
          return;
        p3.push(n4);
        let o4 = n4.parentElement;
        const r4 = D2(n4);
        for (; o4; ) {
          const e5 = D2(o4);
          if (!e5 || e5.memoizedProps !== r4?.memoizedProps)
            break;
          o4 = o4.parentElement;
        }
        o4 && (we2.inspectState = { kind: "focused", focusedDomElement: o4, propContainer: t4.propContainer });
      }), l3.addEventListener("click", (e4) => {
        e4.stopPropagation();
        const t4 = we2.inspectState;
        if ("focused" !== t4.kind || 0 === p3.length)
          return;
        const n4 = p3.pop();
        n4 && (we2.inspectState = { kind: "focused", focusedDomElement: n4, propContainer: t4.propContainer });
      }), d3.addEventListener("click", (e4) => {
        e4.stopPropagation(), w3 = !w3, ve2({ playSound: w3 }), S3();
      }), S3();
      const M3 = document.getElementById("react-scan-toolbar");
      M3 && M3.remove(), r3.parentElement || document.documentElement.appendChild(r3), we2.inspectState = { kind: "inspect-off", propContainer: u3 }, we2.subscribe("inspectState", () => {
        S3();
      });
      const L3 = h2(() => {
        N2 || I2 || E3();
      }, 100);
      window.addEventListener("resize", L3), window.addEventListener("scroll", L3);
      return () => {
        window.removeEventListener("resize", L3), window.removeEventListener("scroll", L3);
      };
    };
    G2 = /* @__PURE__ */ new Set();
    U2 = /* @__PURE__ */ new WeakMap();
    K2 = (e3, t3, n3, o3) => {
      const r3 = ee2(() => Array.from(((e4) => {
        const t4 = /* @__PURE__ */ new Map();
        if (!e4)
          return t4;
        let n4 = e4;
        for (; n4; ) {
          const e5 = n4.dependencies;
          if (e5?.firstContext) {
            let n5 = e5.firstContext;
            for (; n5; ) {
              const e6 = n5.context, o4 = e6._currentValue;
              t4.has(e6) || t4.set(e6, o4), n5 = n5.next;
            }
          }
          if (n4.type?._context) {
            const e6 = n4.type._context, o4 = n4.memoizedProps?.value;
            t4.has(e6) || t4.set(e6, o4);
          }
          n4 = n4.return;
        }
        return t4;
      })(t3).entries()).map((e4) => e4[1]), []), a3 = t3.type?.displayName || t3.type?.name || "Unknown", i3 = t3.memoizedProps || {}, s3 = _2(t3) || {}, c3 = n3?.count || 0, l3 = n3?.time?.toFixed(2) || "0", d3 = new Set(((e4) => {
        const t4 = /* @__PURE__ */ new Set(), n4 = e4.memoizedProps || {}, o4 = e4.alternate?.memoizedProps || {};
        return Object.keys(n4).forEach((e5) => {
          n4[e5] !== o4[e5] && t4.add(e5);
        }), t4;
      })(t3)), p3 = new Set(((e4) => {
        const t4 = /* @__PURE__ */ new Set(), n4 = _2(e4), o4 = e4.alternate ? _2(e4.alternate) : {};
        return Object.keys(n4).forEach((e5) => {
          n4[e5] !== o4[e5] && t4.add(e5);
        }), t4;
      })(t3));
      o3.innerHTML = "";
      const u3 = document.createElement("div");
      u3.className = "react-scan-inspector";
      const m3 = document.createElement("div");
      m3.className = "react-scan-header", m3.innerHTML = `
    <span class="react-scan-component-name">${a3}</span>
    <span class="react-scan-metrics">${c3} renders \u2022 ${l3}ms</span>
  `, u3.appendChild(m3);
      const f3 = document.createElement("div");
      f3.className = "react-scan-content", Object.values(i3).length && ee2(() => {
        f3.appendChild(J2(a3, e3, o3, "Props", i3, d3));
      }, null), Object.values(s3).length && ee2(() => {
        f3.appendChild(J2(a3, e3, o3, "State", Object.values(s3), p3));
      }, null), r3.length && ee2(() => {
        f3.appendChild(J2(a3, e3, o3, "Context", r3));
      }, null), u3.appendChild(f3), o3.appendChild(u3), requestAnimationFrame(() => {
        const e4 = u3.getBoundingClientRect().height;
        o3.style.maxHeight = `${e4}px`;
      });
    };
    J2 = (e3, t3, n3, o3, r3, a3 = /* @__PURE__ */ new Set()) => {
      const i3 = document.createElement("div");
      return i3.className = "react-scan-section", i3.textContent = o3, Object.entries(r3).forEach(([r4, s3]) => {
        const c3 = te2(e3, t3, n3, r4, s3, o3.toLowerCase(), 0, a3, "", /* @__PURE__ */ new WeakMap());
        c3 && i3.appendChild(c3);
      }), i3;
    };
    Q2 = /* @__PURE__ */ new Map();
    Z2 = /* @__PURE__ */ new Map();
    ee2 = (e3, t3) => {
      try {
        return e3();
      } catch (e4) {
        return t3;
      }
    };
    te2 = (e3, t3, n3, o3, r3, a3 = "", i3 = 0, s3 = /* @__PURE__ */ new Set(), c3 = "", l3 = /* @__PURE__ */ new WeakMap()) => {
      try {
        O2 || (O2 = setInterval(() => {
          Q2.forEach((e4, t4) => {
            Date.now() - e4 > 450 && Q2.delete(t4);
          });
        }, 200));
        const d3 = document.createElement("div");
        d3.className = "react-scan-property";
        const p3 = "object" == typeof r3 && null !== r3 || Array.isArray(r3), u3 = ((e4, t4, n4, o4) => n4 ? `${e4}.${n4}.${o4}` : `${e4}.${t4}.${o4}`)(e3, a3, c3, o3);
        if (p3) {
          const c4 = G2.has(u3);
          if ("object" == typeof r3 && null !== r3) {
            let e4 = l3.get(r3);
            if (e4 || (e4 = /* @__PURE__ */ new Set(), l3.set(r3, e4)), e4.has(u3))
              return ne2(o3);
            e4.add(u3);
          }
          d3.classList.add("react-scan-expandable"), c4 && d3.classList.add("react-scan-expanded");
          const p4 = document.createElement("span");
          p4.className = "react-scan-arrow", p4.textContent = "\u25B6", d3.appendChild(p4);
          const m4 = document.createElement("div");
          m4.className = "react-scan-property-content";
          const f3 = document.createElement("div");
          f3.className = "react-scan-preview-line", f3.dataset.key = o3, f3.dataset.section = a3, f3.innerHTML = `
    <span class="react-scan-key">${o3}</span>: <span class="${oe2(r3)}">${re2(r3)}</span>
  `;
          const h3 = document.createElement("div");
          if (h3.className = c4 ? "react-scan-nested-object" : "react-scan-nested-object react-scan-hidden", m4.appendChild(f3), m4.appendChild(h3), d3.appendChild(m4), c4)
            if (Array.isArray(r3)) {
              const o4 = document.createElement("div");
              o4.className = "react-scan-array-container", r3.forEach((r4, c5) => {
                const d4 = te2(e3, t3, n3, c5.toString(), r4, a3, i3 + 1, s3, u3, l3);
                d4 && o4.appendChild(d4);
              }), h3.appendChild(o4);
            } else
              Object.entries(r3).forEach(([o4, r4]) => {
                const c5 = te2(e3, t3, n3, o4, r4, a3, i3 + 1, s3, u3, l3);
                c5 && h3.appendChild(c5);
              });
          p4.addEventListener("click", (o4) => {
            o4.stopPropagation();
            if (!d3.classList.contains("react-scan-expanded")) {
              if (G2.add(u3), d3.classList.add("react-scan-expanded"), h3.classList.remove("react-scan-hidden"), !h3.hasChildNodes())
                if (Array.isArray(r3)) {
                  const o5 = document.createElement("div");
                  o5.className = "react-scan-array-container", r3.forEach((r4, c5) => {
                    const l4 = te2(e3, t3, n3, c5.toString(), r4, a3, i3 + 1, s3, u3, /* @__PURE__ */ new WeakMap());
                    l4 && o5.appendChild(l4);
                  }), h3.appendChild(o5);
                } else
                  Object.entries(r3).forEach(([o5, r4]) => {
                    const c5 = te2(e3, t3, n3, o5, r4, a3, i3 + 1, s3, u3, /* @__PURE__ */ new WeakMap());
                    c5 && h3.appendChild(c5);
                  });
            } else
              G2.delete(u3), d3.classList.remove("react-scan-expanded"), h3.classList.add("react-scan-hidden");
            requestAnimationFrame(() => {
              const e4 = n3.firstElementChild;
              if (e4) {
                const t4 = e4.getBoundingClientRect().height;
                n3.style.maxHeight = `${t4}px`;
              }
            });
          });
        } else {
          const e4 = document.createElement("div");
          e4.className = "react-scan-preview-line", e4.dataset.key = o3, e4.dataset.section = a3, e4.innerHTML = `
    <span style="width: 8px; display: inline-block"></span>
    <span class="react-scan-key">${o3}</span>: <span class="${oe2(r3)}">${re2(r3)}</span>
  `, d3.appendChild(e4);
        }
        const m3 = void 0 !== Z2.get(u3) && Z2.get(u3) !== r3;
        if (Z2.set(u3, r3), m3 && Q2.set(u3, Date.now()), s3.has(o3) && Q2.set(u3, Date.now()), Q2.has(u3)) {
          const e4 = document.createElement("div");
          e4.className = "react-scan-flash-overlay", d3.appendChild(e4), e4.style.opacity = ".9";
          const t4 = U2.get(e4);
          void 0 !== t4 && clearTimeout(t4);
          const n4 = setTimeout(() => {
            e4.style.transition = "opacity 400ms ease-out", e4.style.opacity = "0", U2.delete(e4);
          }, 300);
          U2.set(e4, n4);
        }
        return d3;
      } catch {
        return null;
      }
    };
    ne2 = (e3) => {
      const t3 = document.createElement("div");
      t3.className = "react-scan-property";
      const n3 = document.createElement("div");
      return n3.className = "react-scan-preview-line", n3.innerHTML = `
    <span style="width: 8px; display: inline-block"></span>
    <span class="react-scan-key">${e3}</span>: <span class="react-scan-circular">[Circular Reference]</span>
  `, t3.appendChild(n3), t3;
    };
    oe2 = (e3) => {
      if (Array.isArray(e3))
        return "react-scan-array";
      if (null == e3)
        return "react-scan-null";
      switch (typeof e3) {
        case "string":
          return "react-scan-string";
        case "number":
          return "react-scan-number";
        case "boolean":
          return "react-scan-boolean";
        case "object":
          return "react-scan-object-key";
        default:
          return "";
      }
    };
    re2 = (e3) => {
      if (Array.isArray(e3))
        return `Array(${e3.length})`;
      if (null === e3)
        return "null";
      if (void 0 === e3)
        return "undefined";
      switch (typeof e3) {
        case "string":
          return `"${e3}"`;
        case "number":
        case "boolean":
          return e3.toString();
        case "object": {
          const t3 = Object.keys(e3);
          return t3.length <= 3 ? `{${t3.join(", ")}}` : `{${t3.slice(0, 3).join(", ")}, ...}`;
        }
        default:
          return typeof e3;
      }
    };
    ae2 = null;
    ie2 = null;
    se2 = "undefined" != typeof window && window.devicePixelRatio || 1;
    ce2 = null;
    le2 = (e3, t3, n3) => e3 * (1 - n3) + t3 * n3;
    de2 = (e3, t3, n3, o3) => {
      const { parentCompositeFiber: r3, targetRect: a3 } = H2(e3);
      if (!r3 || !a3)
        return;
      const i3 = we2.reportDataByFiber.get(r3) ?? (r3.alternate ? we2.reportDataByFiber.get(r3.alternate) : null), s3 = { count: i3?.count ?? 0, time: i3?.time ?? 0 };
      if (n3.save(), ae2) {
        null !== ce2 && cancelAnimationFrame(ce2);
        const e4 = () => {
          ae2 = { left: le2(ae2.left, a3.left, 0.1), top: le2(ae2.top, a3.top, 0.1), width: le2(ae2.width, a3.width, 0.1), height: le2(ae2.height, a3.height, 0.1) }, me2(ae2, t3, n3, o3, s3, r3);
          Math.abs(ae2.left - a3.left) > 0.1 || Math.abs(ae2.top - a3.top) > 0.1 || Math.abs(ae2.width - a3.width) > 0.1 || Math.abs(ae2.height - a3.height) > 0.1 ? ce2 = requestAnimationFrame(e4) : (ae2 = a3, ce2 = null);
        };
        ce2 = requestAnimationFrame(e4);
      } else
        me2(a3, t3, n3, o3, s3, r3), ae2 = a3;
      n3.restore();
    };
    pe2 = (e3, t3) => {
      e3 && (e3.width = Math.floor(window.innerWidth * se2), e3.height = Math.floor(window.innerHeight * se2), t3 && (t3.setTransform(1, 0, 0, 1, 0, 0), t3.scale(se2, se2)));
    };
    ue2 = (e3, t3, n3, o3, r3) => {
      let i3 = r3 ? a2(r3) ?? "Unknown" : "Unknown";
      n3.count && (i3 += ` \u2022 \xD7${n3.count}`, n3.time && (i3 += ` (${n3.time.toFixed(1)}ms)`)), e3.save(), e3.font = "12px system-ui, -apple-system, sans-serif";
      const s3 = "locked" === o3 ? 14 : 0, c3 = "locked" === o3 ? 6 : 0, l3 = e3.measureText(i3).width + 16 + s3 + c3, d3 = t3.left, p3 = t3.top - 24 - 4;
      if (e3.fillStyle = "rgb(37, 37, 38, .75)", e3.beginPath(), e3.roundRect(d3, p3, l3, 24, 3), e3.fill(), "locked" === o3) {
        const t4 = d3 + 8, n4 = p3 + (24 - s3) / 2 + 2;
        ((e4, t5, n5, o4) => {
          e4.save(), e4.strokeStyle = "white", e4.fillStyle = "white", e4.lineWidth = 1.5;
          const r4 = 0.6 * o4, a3 = 0.5 * o4, i4 = t5 + (o4 - r4) / 2, s4 = n5;
          e4.beginPath(), e4.arc(i4 + r4 / 2, s4 + a3 / 2, r4 / 2, Math.PI, 0, false), e4.stroke();
          const c4 = 0.8 * o4, l4 = 0.5 * o4, d4 = t5 + (o4 - c4) / 2, p4 = n5 + a3 / 2;
          e4.fillRect(d4, p4, c4, l4), e4.restore();
        })(e3, t4, n4, s3), ie2 = { x: t4, y: n4, width: s3, height: s3 };
      } else
        ie2 = null;
      e3.fillStyle = "white", e3.textBaseline = "middle";
      const u3 = d3 + 8 + ("locked" === o3 ? s3 + c3 : 0);
      e3.fillText(i3, u3, p3 + 12), e3.restore();
    };
    me2 = (e3, t3, n3, o3, r3, a3) => {
      n3.clearRect(0, 0, t3.width, t3.height), "locked" === o3 ? (n3.strokeStyle = "rgba(142, 97, 227, 0.5)", n3.fillStyle = "rgba(173, 97, 230, 0.10)", n3.setLineDash([])) : (n3.strokeStyle = "rgba(142, 97, 227, 0.5)", n3.fillStyle = "rgba(173, 97, 230, 0.10)", n3.setLineDash([4])), n3.lineWidth = 1, n3.fillRect(e3.left, e3.top, e3.width, e3.height), n3.strokeRect(e3.left, e3.top, e3.width, e3.height), ue2(n3, e3, r3, o3, a3);
    };
    fe2 = "react-scan-inspect-element-toggle";
    he2 = "react-scan-inspect-canvas";
    ge2 = () => {
      if ("undefined" == typeof window)
        return;
      let e3 = document.getElementById(he2);
      if (!e3) {
        e3 = document.createElement("canvas"), e3.id = he2, e3.style.cssText = "\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100vw;\n    height: 100vh;\n    pointer-events: none;\n    z-index: 214748367;\n  ", document.documentElement.appendChild(e3);
        const t4 = e3.getContext("2d", { alpha: true });
        if (!t4)
          return;
        pe2(e3, t4), window.addEventListener("resize", () => {
          pe2(e3, t4);
        });
      }
      const t3 = e3.getContext("2d", { alpha: true });
      if (!t3)
        return;
      const n3 = () => {
        cancelAnimationFrame(z2), t3.save(), t3.setTransform(1, 0, 0, 1, 0, 0), t3.clearRect(0, 0, e3.width, e3.height), t3.restore();
      }, o3 = {}, r3 = (e4) => {
        const t4 = () => {
          z2 && cancelAnimationFrame(z2), z2 = requestAnimationFrame(() => {
            e4(), t4();
          });
        };
        t4();
      };
      return we2.subscribeMultiple(["reportDataByFiber", "inspectState"], h2((a3) => {
        Object.entries(o3).forEach(([e4, t4]) => {
          t4();
        });
        const i3 = (() => {
          const o4 = a3.inspectState;
          switch (o4.kind) {
            case "uninitialized":
              return;
            case "inspect-off": {
              n3();
              const o5 = () => {
                n3(), pe2(e3, t3);
              };
              return window.addEventListener("mousemove", o5), () => {
                window.removeEventListener("mousemove", o5);
              };
            }
            case "inspecting": {
              r3(() => {
                o4.hoveredDomElement && de2(o4.hoveredDomElement, e3, t3, "inspecting");
              });
              const a4 = document.createElement("div");
              a4.style.cssText = `
              position: fixed;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              z-index: ${parseInt(e3.style.zIndex) - 1};
              pointer-events: auto;
            `, e3.parentNode.insertBefore(a4, e3);
              let i4 = null;
              const s3 = h2((n4) => {
                if ("inspecting" !== we2.inspectState.kind)
                  return;
                a4.style.pointerEvents = "none";
                const r4 = document.elementFromPoint(n4.clientX, n4.clientY);
                a4.style.pointerEvents = "auto", r4 && (R2 = r4, i4 = r4, o4.hoveredDomElement = r4, de2(r4, e3, t3, "inspecting"));
              }, 16);
              window.addEventListener("mousemove", s3);
              const c3 = (n4) => {
                n4.stopPropagation(), a4.style.pointerEvents = "none";
                const r4 = i4 ?? document.elementFromPoint(n4.clientX, n4.clientY) ?? R2;
                if (a4.style.pointerEvents = "auto", r4 && (de2(r4, e3, t3, "locked"), ((e4) => {
                  const t4 = localStorage.getItem("react-scan-toolbar-width");
                  e4.style.width = `${t4 ?? 360}px`;
                })(o4.propContainer), we2.inspectState = { kind: "focused", focusedDomElement: r4, propContainer: o4.propContainer }, !B2())) {
                  const e4 = document.getElementById("react-scan-previous-focus"), t4 = document.getElementById("react-scan-parent-focus");
                  e4.style.display = "none", t4.style.display = "none";
                }
              };
              window.addEventListener("click", c3);
              const l3 = (e4) => {
                "Escape" === e4.key && (we2.inspectState = { kind: "inspect-off", propContainer: o4.propContainer }, n3());
              };
              window.addEventListener("keydown", l3);
              let d3 = () => {
              };
              return o4.hoveredDomElement && (d3 = ye2(o4.hoveredDomElement, () => {
                de2(o4.hoveredDomElement, e3, t3, "inspecting");
              })), () => {
                window.removeEventListener("click", c3), window.removeEventListener("mousemove", s3), window.removeEventListener("keydown", l3), a4.parentNode?.removeChild(a4), d3();
              };
            }
            case "focused": {
              if (r3(() => {
                de2(o4.focusedDomElement, e3, t3, "locked");
              }), !document.contains(o4.focusedDomElement))
                return setTimeout(() => {
                  n3();
                }, 500), o4.propContainer.style.maxHeight = "0", o4.propContainer.style.width = "fit-content", o4.propContainer.innerHTML = "", void (we2.inspectState = { kind: "inspect-off", propContainer: o4.propContainer });
              de2(o4.focusedDomElement, e3, t3, "locked");
              const i4 = o4.focusedDomElement, { parentCompositeFiber: c3 } = H2(i4);
              if (!c3)
                return;
              const l3 = a3.reportDataByFiber.get(c3) ?? (c3.alternate ? a3.reportDataByFiber.get(c3.alternate) : null), d3 = s2(c3);
              K2(d3, c3, l3, o4.propContainer);
              const p3 = (r4) => {
                "Escape" === r4.key && (n3(), de2(r4.target ?? o4.focusedDomElement, e3, t3, "inspecting"), o4.propContainer.style.maxHeight = "0", o4.propContainer.style.width = "fit-content", o4.propContainer.innerHTML = "", we2.inspectState = { kind: "inspecting", hoveredDomElement: r4.target ?? o4.focusedDomElement, propContainer: o4.propContainer });
              };
              window.addEventListener("keydown", p3);
              const u3 = (r4) => {
                if (!ie2)
                  return;
                const a4 = e3.getBoundingClientRect(), i5 = e3.width / a4.width, s3 = e3.height / a4.height, c4 = (r4.clientX - a4.left) * i5, l4 = (r4.clientY - a4.top) * s3, d4 = c4 / se2, p4 = l4 / se2;
                return d4 >= ie2.x && d4 <= ie2.x + ie2.width && p4 >= ie2.y && p4 <= ie2.y + ie2.height ? (o4.propContainer.innerHTML = "", o4.propContainer.style.maxHeight = "0", n3(), de2(r4.target, e3, t3, "inspecting"), r4.stopPropagation(), void (we2.inspectState = { kind: "inspecting", hoveredDomElement: r4.target, propContainer: o4.propContainer })) : void 0;
              };
              window.addEventListener("click", u3);
              const m3 = ye2(o4.focusedDomElement, () => {
                de2(o4.focusedDomElement, e3, t3, "locked");
              });
              return () => {
                m3(), window.removeEventListener("keydown", p3), window.removeEventListener("click", u3);
              };
            }
          }
        })();
        i3 && (o3[a3.inspectState.kind] = i3);
      }, 16)), () => {
      };
    };
    ye2 = (e3, t3) => {
      const n3 = () => {
        t3(e3);
      };
      return document.addEventListener("scroll", n3, { passive: true, capture: true }), () => {
        document.removeEventListener("scroll", n3, { capture: true });
      };
    };
    we2 = ((e3) => {
      const t3 = { ...e3 }, n3 = {}, o3 = (e4, t4) => {
        n3[e4]?.forEach((e5) => e5(t4));
      }, r3 = (e4, n4) => {
        t3[e4] !== n4 && (t3[e4] = n4, o3(e4, n4));
      }, a3 = (e4, o4) => (n3[e4] || (n3[e4] = []), n3[e4].push(o4), o4(t3[e4]), () => {
        n3[e4] = n3[e4].filter((e5) => e5 !== o4);
      }), i3 = (e4) => {
        for (const t4 in e4)
          Object.prototype.hasOwnProperty.call(e4, t4) && r3(t4, e4[t4]);
      }, s3 = (e4, o4) => (e4.forEach((e5) => {
        n3[e5] || (n3[e5] = []), n3[e5]?.push(() => o4(t3));
      }), () => {
        e4.forEach((e5) => {
          n3[e5] = n3[e5]?.filter((e6) => e6 !== o4);
        });
      });
      return new Proxy(t3, { get: (e4, t4, n4) => "subscribe" === t4 ? a3 : "setState" === t4 ? i3 : "emit" === t4 ? o3 : "set" === t4 ? r3 : "subscribeMultiple" === t4 ? s3 : Reflect.get(e4, t4, n4), set(e4, t4, n4) {
        if (t4 in e4)
          return r3(t4, n4), true;
        throw new Error(`Property "${String(t4)}" does not exist`);
      }, deleteProperty(e4, t4) {
        throw new Error(`Cannot delete property "${String(t4)}" from store`);
      } });
    })({ onCommitFiberRoot: (e3, t3) => {
    }, isInIframe: "undefined" != typeof window && window.self !== window.top, isPaused: "undefined" == typeof window || ((e3) => {
      try {
        return JSON.parse(e3);
      } catch {
        return "false";
      }
    })(localStorage.getItem("react-scan-paused") ?? "false"), componentAllowList: null, options: { enabled: true, includeChildren: true, playSound: false, log: false, showToolbar: true, renderCountThreshold: 0, report: void 0, alwaysShowLabels: false }, onRender: null, reportData: {}, reportDataByFiber: /* @__PURE__ */ new WeakMap(), scheduledOutlines: [], activeOutlines: [], fiberRoots: /* @__PURE__ */ new WeakSet(), inspectState: { kind: "uninitialized" } });
    ve2 = (e3) => {
      we2.options = { ...we2.options, ...e3 };
    };
    ke2 = () => {
      if ("undefined" == typeof window)
        return;
      if (document.querySelector("react-scan-overlay"))
        return;
      j2();
      const e3 = document.createElement("react-scan-overlay");
      document.documentElement.appendChild(e3), we2.options.showToolbar && Y2();
      const t3 = e3.getContext();
      ge2();
      const n3 = "undefined" != typeof window ? new (window.AudioContext || window.webkitAudioContext)() : null;
      (() => {
        const e4 = new PerformanceObserver((e5) => {
          const t4 = e5.getEntries();
          let n4 = 0;
          for (let e6 = 0, o3 = t4.length; e6 < o3; e6++)
            n4 += t4[e6].duration;
        });
        e4.observe({ entryTypes: ["longtask"] });
      })(), console.log("%c[\xB7] %cReact Scan", "font-weight:bold;color:#7a68e8;font-size:20px;", "font-weight:bold;font-size:14px;"), console.log("Try Million Lint to automatically optimize your app: https://million.dev"), globalThis.__REACT_SCAN__ = { ReactScanInternals: we2 }, m2({ onCommitStart() {
        we2.options.onCommitStart?.();
      }, onRender(e4, o3) {
        if (we2.isPaused)
          return;
        we2.options.onRender?.(e4, o3);
        const r3 = M2(e4, o3);
        if (r3) {
          if (we2.scheduledOutlines.push(r3), we2.options.playSound && n3) {
            const e5 = 10, t4 = Math.min(1, (o3.time - e5) / (2 * e5));
            ((e6, t5) => {
              const n4 = Math.max(0.5, t5), o4 = 1e-3, r4 = 440 + 200 * t5, a3 = e6.createOscillator();
              a3.type = "sine", a3.frequency.setValueAtTime(r4, e6.currentTime), a3.frequency.exponentialRampToValueAtTime(220, e6.currentTime + o4);
              const i3 = e6.createGain();
              i3.gain.setValueAtTime(n4, e6.currentTime), i3.gain.exponentialRampToValueAtTime(0.01, 5e-4), a3.connect(i3), i3.connect(e6.destination), a3.start(), a3.stop(e6.currentTime + o4);
            })(n3, t4);
          }
          $(t3, /* @__PURE__ */ new Map());
        }
      }, onCommitFinish() {
        we2.options.onCommitFinish?.();
      } });
    };
    Ee2 = (e3 = {}) => {
      ve2(e3);
      const { isInIframe: t3 } = we2;
      t3 || false === e3.enabled || ke2();
    };
  }
});
function FPSStats({ graphWidth = 35, graphHeight = 15 }) {
  const [state, dispatch] = React8.useReducer(
    (state2) => {
      const currentTime = Date.now();
      if (currentTime > state2.prevTime + 1e3) {
        const nextFPS = [
          ...new Array(
            Math.floor((currentTime - state2.prevTime - 1e3) / 1e3)
          ).fill(0),
          Math.max(
            1,
            Math.round(state2.frames * 1e3 / (currentTime - state2.prevTime))
          )
        ];
        return {
          max: Math.max(state2.max, ...nextFPS),
          len: Math.min(state2.len + nextFPS.length, graphWidth),
          fps: [...state2.fps, ...nextFPS].slice(-graphWidth),
          frames: 1,
          prevTime: currentTime
        };
      }
      return { ...state2, frames: state2.frames + 1 };
    },
    {
      len: 0,
      max: 0,
      frames: 0,
      prevTime: Date.now(),
      fps: []
    }
  );
  const requestRef = React8.useRef();
  const tick = () => {
    dispatch();
    requestRef.current = requestAnimationFrame(tick);
  };
  React8.useEffect(() => {
    requestRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
  const { fps, len } = state;
  const getColor = (fps2) => {
    if (fps2 >= 60)
      return "hsl(120, 100%, 50%)";
    const hue = Math.max(0, Math.min(120, (fps2 - 12) * 2.5));
    return `hsl(${hue}, 100%, 50%)`;
  };
  return /* @__PURE__ */ React8__namespace.default.createElement(
    "div",
    {
      style: {
        zIndex: 999999,
        color: "#fff",
        fontSize: "8px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "semibold",
        boxSizing: "border-box",
        pointerEvents: "none"
      }
    },
    /* @__PURE__ */ React8__namespace.default.createElement("div", null, /* @__PURE__ */ React8__namespace.default.createElement(
      "span",
      {
        style: {
          fontSize: "11px"
        }
      },
      fps[len - 1]
    ), " ", "FPS"),
    /* @__PURE__ */ React8__namespace.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          height: graphHeight,
          boxSizing: "border-box"
        }
      },
      fps.map((frame, i3) => /* @__PURE__ */ React8__namespace.default.createElement(
        "div",
        {
          key: `fps-${i3}`,
          style: {
            right: `${len - 1 - i3}px`,
            height: "100%",
            width: 1,
            background: frame === 0 ? "#414141" : getColor(frame),
            boxSizing: "border-box"
          }
        }
      ))
    )
  );
}
var fps_stats_default;
var init_fps_stats = __esm({
  "runtime/src/core/dev/fps-stats.tsx"() {
    fps_stats_default = FPSStats;
  }
});

// runtime/src/core/dev/select.ts
var getFiberFromElement, getParentComponentFiber, getChildComponentFiber, getDisplayName, destroySelections, _selection, _selectionLite, _indicator, isPending, pendingSelections, acquirableSelectionElements, createSelectionAreaElement, startSelection;
var init_select = __esm({
  "runtime/src/core/dev/select.ts"() {
    init_utils();
    init_constants();
    init_core();
    getFiberFromElement = (element) => {
      if ("__REACT_DEVTOOLS_GLOBAL_HOOK__" in _window) {
        const { renderers } = _window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!renderers)
          return null;
        for (const renderer of renderers.values()) {
          try {
            const fiber = renderer.findFiberByHostInstance(element);
            if (fiber) {
              return fiber;
            }
          } catch (e3) {
          }
        }
      }
      if ("_reactRootContainer" in element) {
        return element._reactRootContainer._internalRoot.current.child;
      }
      for (const key in element) {
        if (key.startsWith("__reactInternalInstance$") || key.startsWith("__reactFiber")) {
          return element[key];
        }
      }
      return _null;
    };
    getParentComponentFiber = (fiber) => {
      if (!fiber)
        return _null;
      if (typeof fiber.type === "function" && fiber.type[FLAG]) {
        return fiber;
      }
      return getParentComponentFiber(fiber._debugOwner);
    };
    getChildComponentFiber = (fiber) => {
      if (!fiber)
        return _null;
      if (typeof fiber.type === "function" || typeof fiber.type === "object") {
        return fiber;
      }
      return getChildComponentFiber(fiber._debugOwner);
    };
    getDisplayName = (fiber) => {
      if (!fiber)
        return void 0;
      const { elementType, type } = fiber;
      if (typeof type === "string") {
        return type;
      }
      return type.displayName || type.name || elementType.displayName || elementType.name;
    };
    destroySelections = () => {
      acquirableSelectionElements.forEach((selection) => selection.remove());
      pendingSelections.clear();
      const selections = document.getElementsByClassName("million-select");
      for (const selection of selections) {
        selection.remove();
      }
    };
    _selection = document.createElement("div");
    _selection.className = "million-select";
    _selection.setAttribute("aria-hidden", "true");
    _selection.style.cssText = `
  position: fixed;
  border-radius: 4px;
  background-color: #8048de5e;
  z-index: 2147483647;
  border: 1px dashed #8048de;
  pointer-events: none;
  user-select: none;
  opacity: 1;
  transition: all 1000ms ease;
`;
    _selectionLite = _selection.cloneNode(true);
    _selectionLite.style.backgroundColor = "transparent";
    _selectionLite.style.border = "1px solid #8048de5e";
    _selectionLite.style.boxShadow = "0px 0px 1.5px 1.5px rgba(128, 72, 222, 0.1)";
    _indicator = document.createElement("div");
    _indicator.setAttribute("aria-hidden", "true");
    _indicator.style.cssText = `
  position: absolute;
  left: 4px;
  color: white;
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  font-size: 10px;
  padding: 2px 4px;
  background-color: #8048de;
  border-radius: 2px;
  z-index: 2147483646;
  top: -16px;
  pointer-events: none;
  user-select: none;
`;
    isPending = false;
    pendingSelections = /* @__PURE__ */ new Set();
    acquirableSelectionElements = [];
    createSelectionAreaElement = (element, name, translucent = false, lite = false, _color = _null, minimal = false) => {
      const fail = { selection: _null, indicator: _null, fadeOut: _null };
      if (isPending)
        return fail;
      isPending = true;
      const selection = lite ? acquirableSelectionElements.length ? acquirableSelectionElements.pop() : _selectionLite.cloneNode() : _selection.cloneNode();
      const rect = element.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        isPending = false;
        return fail;
      }
      const { top, left } = rect;
      const { offsetWidth, offsetHeight } = element;
      const key = `${top}-${left}-${offsetWidth}-${offsetHeight}-${name}`;
      if (pendingSelections.has(key) && lite) {
        isPending = false;
        return fail;
      }
      pendingSelections.add(key);
      if (!selection)
        return fail;
      selection.style.top = `${top - 2}px`;
      selection.style.left = `${left - 4}px`;
      selection.style.width = `${offsetWidth + 8}px`;
      selection.style.height = `${offsetHeight + 4}px`;
      selection.style.opacity = translucent ? "0.5" : "1";
      if (minimal) {
        selection.style.border = "none";
        selection.style.boxShadow = "none";
        selection.style.backgroundColor = "transparent";
      }
      const indicator = _indicator.cloneNode();
      if (minimal) {
        indicator.style.fontFamily = "sans";
        indicator.style.backgroundColor = "transparent";
        indicator.style.opacity = "0.1";
        indicator.style.fontSize = "8px";
        indicator.textContent = "\u26A0\uFE0F";
        indicator.style.filter = "grayscale(0.5)";
      } else {
        indicator.textContent = name;
      }
      if (minimal || name)
        selection.appendChild(indicator);
      const fadeOut = () => {
        requestAnimationFrame(() => {
          selection.style.opacity = "0";
          setTimeout(() => {
            acquirableSelectionElements.push(selection);
            setTimeout(() => {
              pendingSelections.delete(key);
            }, 16);
            setTimeout(() => {
              acquirableSelectionElements.pop()?.remove();
            }, 750);
          }, 1e3);
        });
      };
      isPending = false;
      return { selection, indicator, fadeOut };
    };
    startSelection = (uriScheme, onChange) => {
      destroySelections();
      let destroyHovered = _null;
      let currentSelection = _null;
      let currentFiber2 = _null;
      let freeze = false;
      const createSelection = (element, name, translucent = false) => {
        if (freeze)
          return _null;
        const { selection, indicator } = createSelectionAreaElement(
          element,
          name,
          translucent
        );
        if (!selection)
          return _null;
        document.body.appendChild(selection);
        currentSelection = selection;
        try {
          const destroy2 = () => {
            if (document.body.contains(selection)) {
              document.body.removeChild(selection);
            }
          };
          return destroy2;
        } finally {
          const selectionRect = selection.getBoundingClientRect();
          const indicatorRect = indicator.getBoundingClientRect();
          if (indicatorRect.top < 0 || indicatorRect.bottom > window.innerHeight) {
            indicator.style.top = "0";
          }
          if (selectionRect.height < indicatorRect.height) {
            indicator.style.top = `-${selectionRect.top - indicatorRect.bottom + 16}px`;
          }
        }
      };
      const resetHovered = () => {
        if (destroyHovered) {
          destroyHovered();
          destroyHovered = _null;
          currentSelection = _null;
        }
      };
      resetHovered();
      onChange({
        selector: _null,
        destroy: _null
      });
      document.addEventListener("mouseleave", resetHovered);
      const hoverSelection = debounce((event) => {
        if (freeze || !event)
          return;
        requestAnimationFrame(() => {
          const element = document.elementFromPoint(event.clientX, event.clientY);
          if (!element || freeze)
            return;
          resetHovered();
          const fiber = getFiberFromElement(element);
          if (!fiber)
            return;
          let parentComponentFiber = getParentComponentFiber(fiber);
          let needsTranslucent = false;
          if (!parentComponentFiber) {
            parentComponentFiber = fiber?._debugOwner || fiber?.return || fiber;
            needsTranslucent = true;
          }
          let childComponentFiber = getChildComponentFiber(fiber) || fiber;
          childComponentFiber = fiber;
          if (!parentComponentFiber)
            return;
          currentFiber2 = parentComponentFiber;
          const metadata2 = componentMetadata.get(parentComponentFiber.type[FLAG]);
          const type = parentComponentFiber.type;
          if (destroyHovered)
            resetHovered();
          const parentName = getDisplayName(parentComponentFiber);
          const childName = getDisplayName(childComponentFiber);
          const selectedName = metadata2?._ ? metadata2._.componentName : parentName;
          const selectedChildName = !childName || parentName === childName ? getDisplayName(fiber) : childName;
          destroyHovered = createSelection(
            element,
            selectedName ? `${selectedName} > ${selectedChildName}` : selectedChildName || "?",
            needsTranslucent
          );
          onChange({
            selector: type[FLAG]
          });
        });
      }, 1);
      document.addEventListener("mousemove", hoverSelection);
      const clickSelection = (event) => {
        if (event.target === currentSelection) {
          event.stopPropagation();
          event.stopImmediatePropagation();
          event.preventDefault();
        }
        if (!currentSelection)
          return;
        if (freeze) {
          freeze = false;
          currentSelection.style.border = "1px dashed #8048de";
          resetHovered();
          return;
        }
        currentSelection.style.border = "2px dashed #8048de";
        if (!currentFiber2)
          return;
        const metadata2 = componentMetadata.get(currentFiber2.type[FLAG]);
        if (!metadata2?._)
          return;
        freeze = true;
        if (confirm(`Do you want to open ${metadata2._.componentName}?`)) {
          _window.location.assign(`${uriScheme}://file/${metadata2._.filename}`);
        }
      };
      document.addEventListener("click", clickSelection);
      const destroy = () => {
        freeze = true;
        onChange({
          selector: _null,
          destroy: _null
        });
        document.removeEventListener("mousemove", hoverSelection);
        document.removeEventListener("click", clickSelection);
        document.removeEventListener("mouseleave", resetHovered);
        document.removeEventListener("keydown", handleEscape);
        resetHovered();
        destroySelections();
      };
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          if (freeze) {
            freeze = false;
            if (currentSelection) {
              currentSelection.style.border = "1px dashed #8048de";
            }
            resetHovered();
            return;
          }
          destroy();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return destroy;
    };
  }
});
var FeedbackSurvey;
var init_feedback = __esm({
  "runtime/src/core/dev/feedback.tsx"() {
    init_esm();
    FeedbackSurvey = ({
      survey,
      setIsOpen
    }) => {
      const posthog = usePostHog();
      const handleSubmit = React8.useCallback((e3) => {
        e3.preventDefault();
        const formData = new FormData(e3.target);
        const feedback = formData.get("feedback");
        const email = formData.get("email");
        if (!email || !feedback)
          return;
        posthog.identify(email.toString());
        posthog.capture("survey sent", {
          $survey_id: survey.id,
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          $survey_response: feedback?.toString()
        });
        setButtonText("Thank you!");
        setTimeout(() => {
          setIsOpen(false);
        }, 2e3);
      }, []);
      const [buttonText, setButtonText] = React8.useState(
        survey.questions[0].buttonText ?? "Submit"
      );
      return /* @__PURE__ */ React8__namespace.default.createElement(
        "div",
        {
          style: {
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }
        },
        /* @__PURE__ */ React8__namespace.default.createElement(
          "div",
          {
            style: {
              userSelect: "none",
              backgroundColor: "#1E1E1E",
              borderRadius: "0.5rem",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.3)",
              width: "100%",
              maxWidth: "28rem",
              position: "relative"
            }
          },
          /* @__PURE__ */ React8__namespace.default.createElement(
            "button",
            {
              onClick: () => setIsOpen(false),
              style: {
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                color: "#FFFFFF",
                backgroundColor: "transparent",
                border: "none",
                outline: "none"
              }
            },
            /* @__PURE__ */ React8__namespace.default.createElement(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "1em",
                height: "1em",
                viewBox: "0 0 24 24"
              },
              /* @__PURE__ */ React8__namespace.default.createElement(
                "path",
                {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M18 6L6 18M6 6l12 12"
                }
              )
            )
          ),
          /* @__PURE__ */ React8__namespace.default.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React8__namespace.default.createElement(
            "div",
            {
              style: {
                padding: "1rem 1.5rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem"
              }
            },
            /* @__PURE__ */ React8__namespace.default.createElement(
              "h2",
              {
                style: {
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  textAlign: "center"
                }
              },
              survey.questions[0].question
            ),
            /* @__PURE__ */ React8__namespace.default.createElement(
              "input",
              {
                name: "email",
                type: "email",
                placeholder: "Email",
                style: {
                  marginTop: "0.50rem",
                  padding: "0.50rem",
                  borderRadius: "0.250rem",
                  marginBottom: "1rem",
                  border: "none",
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  color: "#FFFFFF",
                  backgroundColor: "#2C2C2C"
                }
              }
            ),
            /* @__PURE__ */ React8__namespace.default.createElement(
              "textarea",
              {
                name: "feedback",
                style: {
                  padding: "0.50rem",
                  marginBottom: "1rem",
                  borderRadius: "0.250rem",
                  border: "none",
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  color: "#FFFFFF",
                  backgroundColor: "#2C2C2C"
                },
                rows: 4,
                placeholder: "I found a bug..."
              }
            ),
            /* @__PURE__ */ React8__namespace.default.createElement(
              "button",
              {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "0.125rem",
                  borderColor: "#FFFFFF",
                  outlineStyle: "none",
                  width: "100%",
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  fontWeight: 600,
                  color: "#000000",
                  backgroundColor: "#FFFFFF",
                  transitionProperty: "all",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px 0 rgba(255, 255, 255, 0.1)",
                  padding: "12px"
                },
                type: "submit",
                onMouseOver: (e3) => (
                  // @ts-expect-error lol
                  e3.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
                ),
                onMouseOut: (e3) => e3.target.style.backgroundColor = "white"
              },
              buttonText
            )
          ))
        )
      );
    };
  }
});
var useSES, useSyncExternalStore;
var init_use_ses_shim = __esm({
  "runtime/src/core/dev/use-ses-shim.js"() {
    (function() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      }
      var ReactSharedInternals2 = React8__namespace.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED || {
        ReactDebugCurrentFrame: {
          getStackAddendum: () => ""
        }
      };
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame = ReactSharedInternals2.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      function is2(x3, y3) {
        return x3 === y3 && (x3 !== 0 || 1 / x3 === 1 / y3) || x3 !== x3 && y3 !== y3;
      }
      var objectIs = typeof Object.is === "function" ? Object.is : is2;
      var useState5 = React8__namespace.default.useState, useEffect7 = React8__namespace.default.useEffect, useLayoutEffect3 = React8__namespace.default.useLayoutEffect, useDebugValue = React8__namespace.default.useDebugValue;
      var didWarnOld18Alpha = false;
      var didWarnUncachedGetSnapshot = false;
      function useSyncExternalStore3(subscribe, getSnapshot, getServerSnapshot) {
        {
          if (!didWarnOld18Alpha) {
            if (React8__namespace.default.startTransition !== void 0) {
              didWarnOld18Alpha = true;
              error(
                "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
              );
            }
          }
        }
        var value = getSnapshot();
        {
          if (!didWarnUncachedGetSnapshot) {
            var cachedValue = getSnapshot();
            if (!objectIs(value, cachedValue)) {
              error(
                "The result of getSnapshot should be cached to avoid an infinite loop"
              );
              didWarnUncachedGetSnapshot = true;
            }
          }
        }
        var _useState = useState5({
          inst: {
            value,
            getSnapshot
          }
        }), inst = _useState[0].inst, forceUpdate = _useState[1];
        useLayoutEffect3(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          },
          [subscribe, value, getSnapshot]
        );
        useEffect7(
          function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
            var handleStoreChange = function() {
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
            };
            return subscribe(handleStoreChange);
          },
          [subscribe]
        );
        useDebugValue(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        var prevValue = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(prevValue, nextValue);
        } catch (error2) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
        return getSnapshot();
      }
      var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
      var isServerEnvironment = !canUseDOM;
      var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore3;
      var useSyncExternalStore$2 = React8__namespace.default.useSyncExternalStore !== void 0 ? React8__namespace.default.useSyncExternalStore : shim;
      useSES = useSyncExternalStore$2;
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
      }
    })();
    useSyncExternalStore = useSES;
  }
});

// runtime/src/core/dev/extension-socket.ts
var extension_socket_exports = {};
__export(extension_socket_exports, {
  anySignal: () => anySignal,
  extensionStore: () => extensionStore
});
var DEV, reconnectInterval, createStore, extensionStore, anySignal, connectToWs;
var init_extension_socket = __esm({
  "runtime/src/core/dev/extension-socket.ts"() {
    init_constants();
    init_toolbar();
    DEV = _window[`${FLAG}DEV_`];
    createStore = (initialData) => {
      const data = { ...initialData };
      const listeners = {};
      const get = (key) => {
        return data[key];
      };
      const set = (key, value) => {
        data[key] = value;
        emit(key, value);
      };
      const subscribe = (key, listener) => {
        if (!listeners[key]) {
          listeners[key] = [];
        }
        listeners[key].push(listener);
        listener(data[key]);
        return () => {
          listeners[key] = listeners[key].filter((l3) => l3 !== listener);
        };
      };
      const emit = (key, value) => {
        if (listeners[key]) {
          for (const listener of listeners[key]) {
            listener(value);
          }
        }
      };
      return {
        get,
        set,
        subscribe
      };
    };
    extensionStore = createStore({
      ws: null,
      error: null,
      getFullTrackedFiberTree: null,
      tabId: crypto.randomUUID(),
      ingestUrl: null,
      compilerInstanceId: null,
      supportsWs: null,
      isProfilerRecording: false
    });
    DEV.extensionStore = extensionStore;
    anySignal = (...args) => {
      const signals = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
      const controller = new AbortController();
      for (const signal of signals) {
        if (signal.aborted) {
          controller.abort(signal.reason);
          break;
        }
        signal.addEventListener("abort", () => controller.abort(signal.reason), {
          signal: controller.signal
        });
      }
      return controller.signal;
    };
    connectToWs = ({ urlObj }) => {
      const ws2 = socket_ioClient.io(`localhost:${urlObj.port}`, {
        path: "/ws",
        query: {
          tabId: extensionStore.get("tabId")
        },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1e3,
        reconnectionDelayMax: 5e3,
        randomizationFactor: 0.5,
        transports: ["websocket"]
      });
      ws2.on("serverInfo", (serverId) => {
        const retry = () => {
          clearInterval(reconnectInterval);
          reconnectInterval = setInterval(() => {
            if (!ws2.connected) {
              ws2.connect();
              return;
            }
            clearInterval(reconnectInterval);
          }, 3e3);
        };
        if (!serverId) {
          ws2.disconnect();
          toolbarStore.setData({
            error: "Could not find dev server"
          });
          retry();
          return;
        }
        const compilerInstanceId2 = extensionStore.get("compilerInstanceId");
        if (compilerInstanceId2 && compilerInstanceId2 !== serverId) {
          toolbarStore.setData({
            error: "Could not find dev server"
          });
          ws2.disconnect();
          retry();
          return;
        }
        toolbarStore.setData({
          error: null
        });
        extensionStore.set("compilerInstanceId", serverId);
        extensionStore.set("ws", ws2);
        ws2.send(
          JSON.stringify({
            kind: "ready"
          })
        );
      });
      ws2.on("connect_error", (err) => {
        if (err instanceof Error) {
          if (err.name === "TypeError" && err.message.includes("CORS")) {
            toolbarStore.setData({
              error: `Failed to connect to WebSocket (Add ${urlObj.origin.replace(
                "/ws",
                ""
              )} to your CORS allow list)`,
              cause: err.message
            });
          } else if (err.name === "SecurityError") {
            toolbarStore.setData({
              error: `Failed to connect to WebSocket (Add ${urlObj.origin.replace(
                "/ws",
                ""
              )} to your CSP config)`,
              cause: err.message
            });
          } else {
            const acceptedHosts = ["localhost", "127.0.0.1"];
            if (!acceptedHosts.some((host) => urlObj.hostname.includes(host))) {
              console.error(
                `[Million Lint] ${urlObj.hostname} is not an accepted host. Please use localhost or 127.0.0.1. Call for support: https://cal.com/aiden`
              );
              toolbarStore.setData({
                error: `${urlObj.hostname} is an invalid host`,
                cause: `connect_error ${err.message}`
              });
              return;
            }
          }
        }
        clearInterval(reconnectInterval);
        reconnectInterval = setInterval(() => {
          if (!ws2.connected) {
            ws2.connect();
            return;
          }
          clearInterval(reconnectInterval);
        }, 3e3);
      });
      ws2.on("disconnect", () => {
        clearInterval(reconnectInterval);
        reconnectInterval = setInterval(() => {
          if (!ws2.connected) {
            ws2.connect();
            return;
          }
          clearInterval(reconnectInterval);
        }, 3e3);
      });
      window.addEventListener("focus", function() {
        if (ws2.connected) {
          const fullTree = extensionStore.get("getFullTrackedFiberTree")?.() ?? [];
          ws2.send(
            JSON.stringify({
              kind: "window-focus",
              events: fullTree.map((event) => {
                if (event.kind !== "update") {
                  return event;
                }
                return {
                  ...event,
                  nodesUpdated: null
                  // explicitly send null since this send is not triggered by re-renders
                  // invariant: WS will always send every react commit update in order
                };
              })
            })
          );
        }
      });
      window.addEventListener("blur", function() {
        if (ws2.connected) {
          ws2.send(
            JSON.stringify({
              kind: "window-blur"
            })
          );
        }
      });
      return ws2;
    };
    extensionStore.subscribe("ingestUrl", async (url2) => {
      if (!url2)
        return;
      const urlObj = new URL(url2);
      const ws2 = connectToWs({ urlObj });
      ws2.on("supports-ws", (data) => {
        const message = JSON.parse(data);
        extensionStore.set("supportsWs", message.support);
        ws2.emit("supports-ws-ack", JSON.stringify({ ackId: message.ackId }));
      });
    });
  }
});

// runtime/src/core/dev/toolbar.tsx
var toolbar_exports = {};
__export(toolbar_exports, {
  getCWV: () => getCWV,
  toolbarStore: () => toolbarStore,
  useSocketStatus: () => useSocketStatus
});
var useDeferredValue, useSyncExternalStore2, posthogKey, posthogConfig, Score, getCWV, DEV2, toolbarStore, Feedback, Select, Scan, socketMap, initializeSocketEntry, noSocket, useSocketStatus, SurveyContext, WithIngestError, WithWebsocketStatus, AppContext, App, render;
var init_toolbar = __esm({
  "runtime/src/core/dev/toolbar.tsx"() {
    init_module();
    init_esm();
    init_dist();
    init_core();
    init_constants();
    init_fps_stats();
    init_select();
    init_feedback();
    init_use_ses_shim();
    init_extension_socket();
    useDeferredValue = (value, delay = 100) => {
      const [deferredValue, setDeferredValue] = React8.useState(value);
      React8.useEffect(() => {
        let isMounted = true;
        const handle = setTimeout(() => {
          if (isMounted) {
            setDeferredValue(value);
          }
        }, delay);
        return () => {
          isMounted = false;
          clearTimeout(handle);
        };
      }, [value]);
      return deferredValue;
    };
    useSyncExternalStore2 = (subscribe, getSnapshot) => useSyncExternalStore(subscribe, getSnapshot);
    posthogKey = "phc_63GH6Se2jAEx8SUH5ILoJ0alUunbAnWbc5ORKUphj2i";
    posthogConfig = {
      api_host: "https://app.posthog.com",
      autocapture: false,
      capture_pageview: false,
      disable_session_recording: true
    };
    try {
      Qn.init(posthogKey, posthogConfig);
    } catch {
    }
    Score = {
      Unknown: {
        color: "#ffffff2e",
        backgroundColor: "#111",
        severity: -1
      },
      Good: {
        color: "#0ace6b2e",
        backgroundColor: "#185929",
        severity: 0
      },
      NeedsImprovement: {
        color: "#fcba032e",
        backgroundColor: "#9c7200",
        severity: 1
      },
      Poor: {
        color: "#ff575e2e",
        backgroundColor: "#440c13",
        severity: 2
      }
    };
    getCWV = (event) => {
      if (!event)
        return Score.Unknown;
      const { n: name, t: value } = event;
      if (name === "CLS") {
        if (value > 0.25)
          return Score.Poor;
        if (value > 0.1)
          return Score.NeedsImprovement;
        return Score.Good;
      }
      if (name === "FCP") {
        if (value > 3e3)
          return Score.Poor;
        if (value > 1800)
          return Score.NeedsImprovement;
        return Score.Good;
      }
      if (name === "LCP") {
        if (value < 4e3)
          return Score.Good;
        if (value < 2500)
          return Score.NeedsImprovement;
        return Score.Poor;
      }
      if (value > 500)
        return Score.Poor;
      if (value > 200)
        return Score.NeedsImprovement;
      return Score.Good;
    };
    DEV2 = _window[`${FLAG}DEV_`];
    toolbarStore = {
      listeners: [],
      batch: [],
      events: [],
      data: {
        items: 0,
        pending: false,
        state: "hidden",
        destroy: _null,
        selector: _null,
        selectedName: _null,
        scan: Boolean(_window.localStorage.getItem("MILLION_SCAN")),
        replay: false,
        latestRender: void 0,
        problems: [],
        uriScheme: "vscode"
      },
      pushBatch: (batch2, events2) => {
        const len = batch2.length;
        const newBatch = new _Array(len);
        const initialEventsIndex = toolbarStore.events.length;
        for (let i3 = 0; i3 < len; i3++) {
          const item = _Object.assign({}, batch2[i3]);
          const render2 = _Object.assign({}, item.r);
          if (render2.x !== -1 && render2.x != _null) {
            render2.x += initialEventsIndex;
          }
          item.r = render2;
          newBatch[i3] = item;
        }
        toolbarStore.events.push(...events2);
        toolbarStore.batch.push(...newBatch);
        toolbarStore.emit();
      },
      setData(data) {
        toolbarStore.data = {
          ...toolbarStore.data,
          ...data
        };
        toolbarStore.emit();
      },
      subscribe(listener) {
        toolbarStore.listeners.push(listener);
        return () => {
          toolbarStore.listeners = toolbarStore.listeners.filter(
            (l3) => l3 !== listener
          );
        };
      },
      getSnapshot() {
        return toolbarStore.data;
      },
      emit() {
        for (const listener of toolbarStore.listeners) {
          listener();
        }
      },
      getCWV,
      createSelectionAreaElement
    };
    Ee2({
      enabled: true,
      showToolbar: false
    });
    ve2({
      enabled: toolbarStore.data.scan
    });
    DEV2.toolbarStore = toolbarStore;
    Feedback = ({ isDragging }) => {
      const posthog = usePostHog();
      const { survey, setSurvey } = React8.useContext(SurveyContext);
      const [isOpen, setIsOpen] = React8.useState(false);
      React8.useEffect(() => {
        try {
          posthog.getSurveys(setSurvey);
        } catch {
        }
      }, [posthog]);
      return /* @__PURE__ */ React8__namespace.default.createElement(
        "div",
        {
          style: {
            border: "none",
            outline: "none",
            background: "transparent",
            color: "white",
            borderRadius: "1rem",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          className: "util-button"
        },
        !isDragging ? /* @__PURE__ */ React8__namespace.default.createElement(
          "button",
          {
            onClick: () => setIsOpen(true),
            style: {
              border: "none",
              outline: "none",
              background: "transparent",
              color: "white",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 0
            }
          },
          /* @__PURE__ */ React8__namespace.default.createElement(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "opacity-hover"
            },
            /* @__PURE__ */ React8__namespace.default.createElement("circle", { cx: "12", cy: "12", r: "10" }),
            /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
            /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M12 17h.01" })
          )
        ) : null,
        isOpen && /* @__PURE__ */ React8__namespace.default.createElement(FeedbackSurvey, { survey: survey[0], setIsOpen })
      );
    };
    Select = ({ isDragging }) => {
      const data = useSyncExternalStore2(
        toolbarStore.subscribe,
        toolbarStore.getSnapshot
      );
      const [isHovered, setIsHovered] = React8.useState(false);
      const buttonRef = React8.useRef(null);
      React8.useEffect(() => {
        if (!data.destroy)
          destroySelections();
      }, [data.destroy]);
      const handleClick = React8.useCallback(() => {
        if (data.destroy) {
          data.destroy();
          destroySelections();
        } else {
          toolbarStore.setData({
            destroy: startSelection(
              toolbarStore.data.uriScheme,
              (data2) => toolbarStore.setData(data2)
            )
          });
        }
      }, [data.destroy]);
      return /* @__PURE__ */ React8__namespace.default.createElement(
        "button",
        {
          ref: buttonRef,
          style: {
            color: data.destroy ? "black" : "white",
            background: data.destroy ? "#b18feb" : isHovered ? "#b18feb49" : "transparent",
            borderRadius: "1rem",
            marginLeft: 0,
            padding: "0.25rem 0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "3px",
            outline: "none",
            border: "none"
          },
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
          className: "util-button",
          onClick: handleClick
        },
        /* @__PURE__ */ React8__namespace.default.createElement(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          },
          /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M5 3a2 2 0 0 0-2 2" }),
          /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M19 3a2 2 0 0 1 2 2" }),
          /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "m12 12 4 10 1.7-4.3L22 16Z" }),
          /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M5 21a2 2 0 0 1-2-2" }),
          /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M9 3h1" }),
          /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M9 21h2" }),
          /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M14 3h1" }),
          /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M3 9v1" }),
          /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M21 9v2" }),
          /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M3 14v1" })
        ),
        !isDragging ? "Select" : null
      );
    };
    Scan = ({ isDragging }) => {
      const data = useSyncExternalStore2(
        toolbarStore.subscribe,
        toolbarStore.getSnapshot
      );
      const [isHovered, setIsHovered] = React8.useState(false);
      const buttonRef = React8.useRef(null);
      const handleClick = React8.useCallback(() => {
        const newScanValue = !data.scan;
        toolbarStore.setData({
          scan: newScanValue
        });
        _window.localStorage.setItem("MILLION_SCAN", newScanValue ? "1" : "");
        ve2({
          enabled: newScanValue
        });
      }, [data.scan]);
      const createScanJSX = (shouldPing) => /* @__PURE__ */ React8__namespace.default.createElement(
        "div",
        {
          style: {
            position: shouldPing ? "absolute" : "relative"
          },
          className: shouldPing ? "animate-ping" : ""
        },
        /* @__PURE__ */ React8__namespace.default.createElement(
          "button",
          {
            ref: buttonRef,
            style: {
              color: shouldPing ? "transparent" : data.scan ? "black" : "white",
              background: data.scan ? "#b18feb" : isHovered ? "#b18feb49" : "transparent",
              borderRadius: "1rem",
              marginLeft: 0,
              padding: "0.25rem 0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "3px",
              outline: "none",
              border: "none",
              cursor: "pointer"
            },
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
            className: "util-button",
            onClick: handleClick
          },
          /* @__PURE__ */ React8__namespace.default.createElement(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            },
            /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }),
            /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }),
            /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }),
            /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }),
            /* @__PURE__ */ React8__namespace.default.createElement("circle", { cx: "12", cy: "12", r: "1" }),
            /* @__PURE__ */ React8__namespace.default.createElement("path", { d: "M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5" })
          ),
          !isDragging ? "Scan" : ""
        )
      );
      return /* @__PURE__ */ React8__namespace.default.createElement("div", null, createScanJSX(true), createScanJSX(false));
    };
    socketMap = /* @__PURE__ */ new WeakMap();
    initializeSocketEntry = (socket) => {
      if (socketMap.has(socket)) {
        return;
      }
      const entry = {
        state: socket.connected ? { kind: "connected" } : { kind: "connecting" },
        listeners: /* @__PURE__ */ new Set()
      };
      const handleConnect = () => {
        entry.state = { kind: "connected" };
        entry.listeners.forEach((listener) => listener());
      };
      const handleReconnectAttempt = (attempt) => {
        entry.state = { kind: "reconnecting", attempt };
        entry.listeners.forEach((listener) => listener());
      };
      const handleConnectError = (error) => {
        const message = error?.message || "An unknown error occurred.";
        entry.state = { kind: "error", message };
        entry.listeners.forEach((listener) => listener());
      };
      const handleDisconnect = (_3) => {
        entry.state = { kind: "connecting" };
        entry.listeners.forEach((listener) => listener());
      };
      socket.on("connect", handleConnect);
      socket.on("reconnect_attempt", handleReconnectAttempt);
      socket.on("connect_error", handleConnectError);
      socket.on("disconnect", handleDisconnect);
      socketMap.set(socket, entry);
    };
    noSocket = { kind: "no_socket" };
    useSocketStatus = (socket) => {
      if (!socket) {
        return useSyncExternalStore2(
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          () => () => {
          },
          () => noSocket
        );
      }
      initializeSocketEntry(socket);
      const getSnapshot = () => {
        const entry = socketMap.get(socket);
        return entry ? entry.state : { kind: "no_socket" };
      };
      const subscribe = (callback) => {
        const entry = socketMap.get(socket);
        if (!entry) {
          return () => {
          };
        }
        entry.listeners.add(callback);
        return () => {
          entry.listeners.delete(callback);
        };
      };
      return useSyncExternalStore2(subscribe, getSnapshot);
    };
    SurveyContext = React8.createContext({
      survey: [],
      setSurvey: () => {
        throw new Error("must be under SurveyContext");
      }
    });
    WithIngestError = ({ children }) => {
      const { dragStyles, editorWS: editorWS2, isDragging, onToolbarDown, toolbarRef } = React8.useContext(AppContext);
      const { survey } = React8.useContext(SurveyContext);
      const wsStatus = useSocketStatus(editorWS2);
      const data = useSyncExternalStore2(
        toolbarStore.subscribe,
        toolbarStore.getSnapshot
      );
      if (wsStatus.kind === "reconnecting") {
        return children;
      }
      if (data.error) {
        return /* @__PURE__ */ React8__namespace.default.createElement(
          "div",
          {
            className: `toolbar error ${isDragging ? "dragging" : ""}`,
            style: dragStyles,
            onMouseDown: onToolbarDown,
            ref: toolbarRef
          },
          /* @__PURE__ */ React8__namespace.default.createElement(
            "div",
            {
              style: {
                position: "relative",
                display: "flex",
                alignItems: "center"
              }
            },
            /* @__PURE__ */ React8__namespace.default.createElement(
              "div",
              {
                style: { position: "absolute" },
                className: "animate-ping error-circle"
              }
            ),
            /* @__PURE__ */ React8__namespace.default.createElement("div", { className: "error-circle" })
          ),
          /* @__PURE__ */ React8__namespace.default.createElement("div", { className: "div" }),
          /* @__PURE__ */ React8__namespace.default.createElement(
            "div",
            {
              onDoubleClick: () => {
                toolbarStore.setData({
                  state: "hidden"
                });
              }
            },
            data.error
          ),
          survey.length > 0 && /* @__PURE__ */ React8__namespace.default.createElement(React8__namespace.default.Fragment, null, /* @__PURE__ */ React8__namespace.default.createElement("div", { className: "div" }), /* @__PURE__ */ React8__namespace.default.createElement(PostHogProvider, { client: Qn }, /* @__PURE__ */ React8__namespace.default.createElement(Feedback, { isDragging })))
        );
      }
      return children;
    };
    WithWebsocketStatus = ({ children }) => {
      const { dragStyles, isDragging, onToolbarDown, toolbarRef, editorWS: editorWS2 } = React8.useContext(AppContext);
      const socketStatus = useSocketStatus(editorWS2);
      const data = useSyncExternalStore2(
        toolbarStore.subscribe,
        toolbarStore.getSnapshot
      );
      if (socketStatus.kind === "reconnecting") {
        /* @__PURE__ */ React8__namespace.default.createElement(
          "div",
          {
            onMouseDown: onToolbarDown,
            className: `toolbar connecting ${data.state === "hidden" ? "hidden" : ""} ${isDragging ? "dragging" : ""}`,
            ref: toolbarRef,
            style: dragStyles,
            onDoubleClick: () => {
              toolbarStore.setData({
                state: "hidden"
              });
            }
          },
          /* @__PURE__ */ React8__namespace.default.createElement(
            "svg",
            {
              className: "animate-spin spinner",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24"
            },
            /* @__PURE__ */ React8__namespace.default.createElement(
              "circle",
              {
                style: { opacity: 0.25 },
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth: "4"
              }
            ),
            /* @__PURE__ */ React8__namespace.default.createElement(
              "path",
              {
                style: { opacity: 0.75 },
                fill: "currentColor",
                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              }
            )
          ),
          "Re-connecting..."
        );
      }
      if (socketStatus.kind === "error" && socketStatus.message !== "no-extension-servers-listening") {
        return /* @__PURE__ */ React8__namespace.default.createElement(
          "div",
          {
            className: `toolbar error ${isDragging ? "dragging" : ""}`,
            style: dragStyles,
            onMouseDown: onToolbarDown,
            ref: toolbarRef
          },
          /* @__PURE__ */ React8__namespace.default.createElement(
            "div",
            {
              style: {
                position: "relative",
                display: "flex",
                alignItems: "center"
              }
            },
            /* @__PURE__ */ React8__namespace.default.createElement(
              "div",
              {
                style: { position: "absolute" },
                className: "animate-ping error-circle"
              }
            ),
            /* @__PURE__ */ React8__namespace.default.createElement("div", { className: "error-circle" })
          ),
          /* @__PURE__ */ React8__namespace.default.createElement("div", { className: "div" }),
          " ",
          /* @__PURE__ */ React8__namespace.default.createElement(
            "div",
            {
              onDoubleClick: () => {
                toolbarStore.setData({
                  state: "hidden"
                });
              }
            },
            "Could not find dev server"
          )
        );
      }
      if (socketStatus.kind === "connecting") {
        return /* @__PURE__ */ React8__namespace.default.createElement(
          "div",
          {
            onMouseDown: onToolbarDown,
            className: `toolbar connecting ${data.state === "hidden" ? "hidden" : ""} ${isDragging ? "dragging" : ""}`,
            ref: toolbarRef,
            style: dragStyles,
            onDoubleClick: () => {
              toolbarStore.setData({
                state: "hidden"
              });
            }
          },
          /* @__PURE__ */ React8__namespace.default.createElement(
            "svg",
            {
              className: "animate-spin spinner",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24"
            },
            /* @__PURE__ */ React8__namespace.default.createElement(
              "circle",
              {
                style: { opacity: 0.25 },
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth: "4"
              }
            ),
            /* @__PURE__ */ React8__namespace.default.createElement(
              "path",
              {
                style: { opacity: 0.75 },
                fill: "currentColor",
                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              }
            )
          ),
          "Connecting..."
        );
      }
      return children;
    };
    AppContext = React8.createContext(null);
    App = () => {
      const [isDragging, setIsDragging] = React8.useState(false);
      const [survey, setSurvey] = React8.useState([]);
      const [position, setPosition] = React8.useState(() => {
        const storedPosition = localStorage.getItem("MILLION_TOOLBAR_POSITION");
        if (storedPosition) {
          try {
            return JSON.parse(storedPosition);
          } catch (e3) {
          }
        }
        return _null;
      });
      const ref = React8.useRef(null);
      const prevItems = React8.useRef(0);
      const data = useSyncExternalStore2(
        toolbarStore.subscribe,
        toolbarStore.getSnapshot
      );
      const editorWS2 = useDeferredValue(
        useSyncExternalStore2(
          (listener) => extensionStore.subscribe("ws", listener),
          () => extensionStore.get("ws")
        )
      );
      const dragStartPosition = React8.useRef({ x: 0, y: 0 });
      const isMouseDownOnToolbar = React8.useRef(false);
      const dragStyles = {
        left: isDragging ? 0 : position?.x,
        top: isDragging ? 0 : position?.y,
        bottom: position ? void 0 : 15,
        right: position ? void 0 : 15,
        transform: isDragging ? `translate(${position?.x || 0}px, ${position?.y || 0}px) scale(0.75)` : void 0
      };
      const onMouseDown = React8.useCallback(
        (event) => {
          if (ref.current && ref.current.contains(event.target)) {
            isMouseDownOnToolbar.current = true;
            dragStartPosition.current = { x: event.clientX, y: event.clientY };
            if (!data.prevUserSelect) {
              data.prevUserSelect = document.body.style.userSelect || "auto";
            }
            document.body.style.userSelect = "none";
          }
        },
        [data]
      );
      const onMouseMove = React8.useCallback(
        (event) => {
          if (!isMouseDownOnToolbar.current || event.buttons !== 1)
            return;
          const deltaX = event.clientX - dragStartPosition.current.x;
          const deltaY = event.clientY - dragStartPosition.current.y;
          if (!isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
            setIsDragging(true);
          }
          if (isDragging && ref.current) {
            setPosition({
              x: event.clientX - ref.current.clientWidth / 2,
              y: event.clientY - ref.current.clientHeight / 2
            });
          }
        },
        [isDragging]
      );
      const snap = React8.useCallback((targetPosition) => {
        const padding = 15;
        const toolbarWidth = ref.current?.clientWidth || 0;
        const toolbarHeight = ref.current?.clientHeight || 0;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const distToTop = targetPosition.y;
        const distToBottom = viewportHeight - (targetPosition.y + toolbarHeight);
        const minDist = Math.min(distToTop, distToBottom);
        let newX, newY;
        if (minDist === distToTop) {
          newX = Math.max(
            padding,
            Math.min(targetPosition.x, viewportWidth - toolbarWidth - padding)
          );
          newY = padding;
        } else {
          newX = Math.max(
            padding,
            Math.min(targetPosition.x, viewportWidth - toolbarWidth - padding)
          );
          newY = viewportHeight - toolbarHeight - padding;
        }
        const adjustedPosition = { x: newX, y: newY };
        ref.current?.animate(
          [
            {
              transform: `translate(${targetPosition.x}px, ${targetPosition.y}px) scale(0.9)`
            },
            { transform: `translate(${newX}px, ${newY}px) scale(1)` }
          ],
          {
            duration: 200,
            easing: "ease-in-out"
          }
        );
        return adjustedPosition;
      }, []);
      const onMouseUp = React8.useCallback(() => {
        if (!position)
          return;
        if (data.prevUserSelect) {
          document.body.style.userSelect = data.prevUserSelect;
          data.prevUserSelect = void 0;
        }
        if (isDragging) {
          const adjustedPosition = snap(position);
          setTimeout(() => {
            localStorage.setItem(
              "MILLION_TOOLBAR_POSITION",
              JSON.stringify(adjustedPosition)
            );
            if (adjustedPosition.x !== position.x || adjustedPosition.y !== position.y) {
              setPosition(adjustedPosition);
            }
            setIsDragging(false);
          }, 200 + 16);
        }
        isMouseDownOnToolbar.current = false;
      }, [isDragging, position, data.prevUserSelect, snap]);
      const onWindowResize = React8.useCallback(() => {
        if (!position || !ref.current)
          return;
        const { innerWidth, innerHeight } = window;
        const { width, height } = ref.current.getBoundingClientRect();
        const newX = position.x / (innerWidth - width) * (innerWidth - width);
        const newY = position.y / (innerHeight - height) * (innerHeight - height);
        const newPosition = snap({ x: newX, y: newY });
        setPosition(newPosition);
        localStorage.setItem(
          "MILLION_TOOLBAR_POSITION",
          JSON.stringify(newPosition)
        );
      }, [position, snap]);
      React8.useEffect(() => {
        const rafOnMouseMove = (event) => {
          requestAnimationFrame(() => onMouseMove(event));
        };
        const rafOnMouseUp = () => {
          requestAnimationFrame(onMouseUp);
        };
        const rafOnWindowResize = () => {
          requestAnimationFrame(onWindowResize);
        };
        window.addEventListener("mousemove", rafOnMouseMove);
        window.addEventListener("mouseup", rafOnMouseUp);
        window.addEventListener("resize", rafOnWindowResize);
        return () => {
          window.removeEventListener("mousemove", rafOnMouseMove);
          window.removeEventListener("mouseup", rafOnMouseUp);
          window.removeEventListener("resize", rafOnWindowResize);
        };
      }, [isDragging, position, onMouseMove, onMouseUp, onWindowResize]);
      let { items } = toolbarStore.data;
      const dirty = prevItems.current !== items;
      if (dirty) {
        prevItems.current = items;
      }
      let maxScore = Score.Unknown;
      let instances = 1;
      if (componentMetadata.has(data.selector)) {
        const { i: i3 } = componentMetadata.get(data.selector);
        instances = i3[i3.length - 1] || 1;
      }
      if (data.selector && items) {
        let count = 0;
        for (let i3 = 0, len = toolbarStore.batch.length; i3 < len; i3++) {
          const item = toolbarStore.batch[i3];
          if (item.k === data.selector) {
            count += item.r.c;
            const score = getCWV(toolbarStore.events[item.r.x]);
            if (maxScore == _null || score.severity > maxScore.severity) {
              maxScore = score;
            }
          }
        }
        items = Math.ceil(count / instances);
      }
      return /* @__PURE__ */ React8__namespace.default.createElement("div", { "data-react-scan-ignore": true }, /* @__PURE__ */ React8__namespace.default.createElement(
        SurveyContext.Provider,
        {
          value: {
            survey,
            setSurvey
          }
        },
        /* @__PURE__ */ React8__namespace.default.createElement(
          AppContext.Provider,
          {
            value: {
              dragStyles,
              isDragging,
              onToolbarDown: onMouseDown,
              toolbarRef: ref,
              editorWS: editorWS2
            }
          },
          /* @__PURE__ */ React8__namespace.default.createElement(WithWebsocketStatus, null, /* @__PURE__ */ React8__namespace.default.createElement(WithIngestError, null, /* @__PURE__ */ React8__namespace.default.createElement(
            "div",
            {
              className: `toolbar data ${dirty ? "ping-once" : ""} ${isDragging ? "dragging" : ""}`,
              ref,
              style: {
                backgroundColor: maxScore.backgroundColor,
                ...dragStyles
              },
              onMouseDown
            },
            /* @__PURE__ */ React8__namespace.default.createElement(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "none",
                className: "w-5",
                viewBox: "0 0 46 32",
                style: {
                  marginRight: 7.5
                }
              },
              /* @__PURE__ */ React8__namespace.default.createElement(
                "path",
                {
                  fill: "currentColor",
                  fillRule: "evenodd",
                  d: "M11.428 27c2.07-2.968 6.285-5 11.147-5s9.076 2.032 11.147 5c-2.071 2.968-6.285 5-11.147 5s-9.076-2.032-11.147-5z",
                  clipRule: "evenodd"
                }
              ),
              /* @__PURE__ */ React8__namespace.default.createElement(
                "path",
                {
                  fill: "currentColor",
                  d: "M11.352 4.947C13.422 2.01 17.632 0 22.492 0c4.858 0 9.07 2.01 11.14 4.947-2.07 2.936-6.282 4.947-11.14 4.947-4.86 0-9.07-2.01-11.14-4.947z"
                }
              ),
              /* @__PURE__ */ React8__namespace.default.createElement(
                "path",
                {
                  fill: "currentColor",
                  d: "M22.706 16.059c-3.011 2.912-7.095 4.548-11.353 4.548S3.01 18.97 0 16.059L11.353 4.947 22.706 16.06z"
                }
              ),
              /* @__PURE__ */ React8__namespace.default.createElement(
                "path",
                {
                  fill: "currentColor",
                  d: "M45.012 16.064c-3.01 2.912-7.095 4.548-11.352 4.548-4.259 0-8.342-1.636-11.353-4.548L33.66 4.947l11.352 11.117z"
                }
              )
            ),
            /* @__PURE__ */ React8__namespace.default.createElement(fps_stats_default, { graphHeight: 9 }),
            /* @__PURE__ */ React8__namespace.default.createElement(
              "div",
              {
                className: "div",
                style: { marginLeft: 7.5, marginRight: 7.5 }
              }
            ),
            /* @__PURE__ */ React8__namespace.default.createElement(Scan, { isDragging }),
            /* @__PURE__ */ React8__namespace.default.createElement(Select, { isDragging }),
            survey.length > 0 && /* @__PURE__ */ React8__namespace.default.createElement(React8__namespace.default.Fragment, null, /* @__PURE__ */ React8__namespace.default.createElement("div", { className: "div" }), /* @__PURE__ */ React8__namespace.default.createElement(PostHogProvider, { client: Qn }, /* @__PURE__ */ React8__namespace.default.createElement(Feedback, { isDragging })))
          )))
        )
      ));
    };
    render = async (node) => {
      const elementName = "million-dev-toolbar";
      const root = document.createElement(elementName);
      root.classList.add("rr-ignore");
      root.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.innerHTML = `
  .toolbar {
    position: fixed;
    z-index: 2147483647;
    opacity: 0;
    display: flex;
    height: 26px;
    justify-content: center;
    align-items: center;
    gap: 3px;
    border-radius: 50px;
    padding: 4px 12px;
    background-color: #111;
    color: #fff;
    font-size: 12px;
    font-variant-numeric: tabular-nums;
    transition: opacity 0.2s ease-in-out, transform 0s ease-in;
    border: 1px solid #ffffff2e;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 8px 30px 0px;
    cursor: grab;
    white-space: nowrap;
  }

  .dragging {
    cursor: grabbing;
    opacity: 0.5 !important;
  }

  .hidden {
    pointer-events: none;
    opacity: 0;
  }

  .spinner {
    height: 0.85rem;
    width: 0.85rem;
    color: white;
  }

  .error {
    background: #440c13;
    animation: none;
    color: #ff575e;
    opacity: 1;
    align-items: center;
    gap: 6px;
    border: 1px solid #ff575e2e;
  }

  .error a {
    color: #ff575e;
    font-weight: bold;
    text-decoration: underline dotted;
  }

  .error a:hover {
    text-decoration: underline;
  }

  .error .div {
    height: 100%;
    width: 1px;
    background-color: #ff575e2e;
  }

  .toolbar .div {
    height: 100%;
    width: 1px;
    background-color: #ffffff2e;
  }

  .connecting {
    display: flex;
    gap: 6px;
    font-weight: normal;
    animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite;
  }

  .util-button {
    transition: font-size 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out;
    font-size: 12px;
  }

  .opacity-hover {
    opacity: 0.75;
    transition: opacity 0.2s ease-in-out;
  }

  .opacity-hover:hover {
    opacity: 1;
  }

  .pulse {
    animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite;
  }

  .data {
    opacity: 1;
  }

  .error-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff575e;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }

  @keyframes ping {
    75%, 100% {
      transform: scale(1.1);
      opacity: 0;
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-ping {
    animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    75% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  .ping-once {
    animation: subtle-ping 0.3s ease-in-out;
  }

  @keyframes subtle-ping {
    10% {
      filter: brightness(3);
    }
    100% {
      filter: brightness(1);
    }
  }
  `;
      const shadowRoot = root.shadowRoot;
      shadowRoot.appendChild(style);
      shadowRoot._ANYA_DEV_ = true;
      const prevMountedElement = document.querySelector(elementName);
      if (prevMountedElement) {
        prevMountedElement.replaceWith(root);
      } else {
        document.body.appendChild(root);
      }
      toolbarStore.setData({
        root: root.shadowRoot
      });
      const createRootRender = () => {
        void import('react-dom/client').then((ReactDOMClient) => {
          ReactDOMClient.createRoot(shadowRoot).render(node);
        });
      };
      const majorVersion = Number(React8__namespace.default.version.split(".")[0]);
      try {
        if (majorVersion >= 18 && true) {
          createRootRender();
          return;
        }
      } catch (_e2) {
      }
      const deprecatedRender = () => {
        void import('react-dom').then((ReactDOM) => {
          const div = document.createElement("div");
          shadowRoot.appendChild(div);
          ReactDOM.render(node, div);
        });
      };
      deprecatedRender();
    };
    try {
      void (async () => {
        await render(/* @__PURE__ */ React8__namespace.default.createElement(App, null));
      })();
    } catch (_3) {
    }
  }
});
function devInvariant(value, message, prodMessage) {
  {
    if (value) {
      return;
    }
    {
      throw new Error(message);
    }
  }
}
var editorWS, onCommitFiberRoot, dispatcherRefs, DEVTOOLS_HOOK, controlDispatcherRef, createRuntimeTreeCommit, unmountedSet, syncDispatcherRefs, renderItemKeyCache, componentMetadata, batch, currentOwner, currentTriggers, getCurrentTrigger, pushTrigger, inited, session, url, apiKey, buildId, commitHash, onRender, errors, events, eventIndex, pendingRequests, compilerInstanceId, fiberComponentMap, dirtyNodes, currentRoot, recordingFiberTree, getMetadata, UNSTABLE_TYPES, getChange, captureDeps, captureProps, captureValue, captureFunction, unsafeElements, REACT_MAJOR_VERSION, MillionProfilerRaw, MillionProfiler, captureJSX, captureHook, trackOwner, componentIds, captureBaseline, hijackReactCurrentDispatcher, didSyncDispatcherRefs; exports.$$ = void 0; exports.useCapture = void 0; exports.useCount = void 0; exports.useCallbackExperiment = void 0; exports.useMemoExperiment = void 0; exports.memoExperiment = void 0; var mergeChange, reportRender, flush, metadata, debouncedFlush; exports.reset = void 0; exports.registerMetadata = void 0; var getFullTreeUpdates, wsCallbackUnsubscribe, treeInterval; exports.init = void 0;
var init_core = __esm({
  "runtime/src/core/index.ts"() {
    init_session();
    init_transport();
    init_constants();
    init_react_internals();
    init_utils();
    init_is_equal();
    init_react_internals();
    editorWS = _null;
    onCommitFiberRoot = NO_OP;
    dispatcherRefs = new _Set();
    DEVTOOLS_HOOK = "__REACT_DEVTOOLS_GLOBAL_HOOK__";
    controlDispatcherRef = (currentDispatcherRef) => {
      let ref = currentDispatcherRef;
      if (ref && !_setHas.call(dispatcherRefs, ref)) {
        let propName = REACT_MAJOR_VERSION > 18 ? "H" : "current";
        let currentDispatcher = ref[propName];
        let seenDispatchers = new _Set();
        _Object.defineProperty(ref, propName, {
          get: () => currentDispatcher,
          set(current) {
            currentDispatcher = current;
            if (!current || _setHas.call(seenDispatchers, current) || current.useRef === current.useImperativeHandle || /warnInvalidContextAccess\(\)/.test(current.readContext.toString()))
              return;
            _setAdd.call(seenDispatchers, current);
            let isInComponent = peekIsInComponent(current);
            if (isInComponent) {
              currentDispatcher = hijackReactCurrentDispatcher(current);
            }
          }
        });
        _setAdd.call(dispatcherRefs, ref);
      }
    };
    createRuntimeTreeCommit = (currentTree, _dirtyNodes, queuedDeletes) => {
      {
        if (!currentTree) {
          return "no-tree";
        }
        let [updates, fibersUpdated] = computeDirtyComponentTrees(
          _dirtyNodes,
          fiberComponentMap,
          currentTree
        );
        let nodesUpdated = fibersUpdated.filter(Boolean).map((fiber) => fiberComponentMap.get(fiber)?.renderId).filter((x3) => typeof x3 !== "undefined");
        if (editorWS) {
          _dirtyNodes.length = 0;
          onIdle(() => {
            editorWS?.send(
              JSON.stringify({
                kind: "runtime-tree-updates",
                events: [
                  ...updates,
                  // needed in the case an untracked component unmounts tracked fibers
                  ...queuedDeletes.length ? [
                    {
                      kind: "delete",
                      ids: queuedDeletes
                    }
                  ] : []
                ],
                nodesUpdated
              })
            );
          });
        }
        return updates;
      }
    };
    unmountedSet = /* @__PURE__ */ new Set();
    syncDispatcherRefs = (devtools) => {
      if (!devtools)
        return;
      if (!devtools.renderers.size) {
        let dispatcher = getDispatcherRef();
        if (!dispatcher)
          return;
        controlDispatcherRef(dispatcher);
      }
      for (let renderer of devtools.renderers.values()) {
        controlDispatcherRef(renderer.currentDispatcherRef);
      }
    };
    try {
      if (!SIGKILL && !isSSR && _objectHasOwnProperty.call(_window, DEVTOOLS_HOOK)) {
        let devtools = _window[DEVTOOLS_HOOK];
        if (devtools) {
          let existingOFCR = devtools.onCommitFiberRoot;
          devtools.onCommitFiberRoot = (rendererID, root) => {
            if (existingOFCR)
              existingOFCR(rendererID, root);
            onCommitFiberRoot(root);
          };
          devtools.onPostCommitFiberRoot = () => {
            if (true) {
              if (!recordingFiberTree) {
                return;
              }
              if (!dirtyNodes.length && !unmountedSet.size) {
                return;
              }
              if (!currentRoot.current) {
                return;
              }
              createRuntimeTreeCommit(
                currentRoot.current,
                dirtyNodes,
                Array.from(unmountedSet.values()).map((fiber) => fiberComponentMap.get(fiber)?.renderId).filter((x3) => typeof x3 !== "undefined")
              );
              unmountedSet.clear();
            }
          };
        }
      }
    } catch (err) {
      {
        console.error("Failed to inject __REACT_DEVTOOLS_GLOBAL_HOOK_: %s", err);
      }
    }
    renderItemKeyCache = new _Map();
    componentMetadata = new _Map();
    batch = [];
    currentOwner = _null;
    currentTriggers = new _WeakMap();
    getCurrentTrigger = (fiber) => {
      let foundFiber = traverseFiber(
        fiber,
        true,
        (f3) => _weakMapHas.call(currentTriggers, f3.elementType)
      );
      return foundFiber ? _weakMapGet.call(currentTriggers, foundFiber.elementType) : _null;
    };
    pushTrigger = (fiber, owner) => {
      let data = getMetadata(owner.k);
      let triggerData = _weakMapGet.call(currentTriggers, fiber.elementType);
      if (!triggerData) {
        triggerData = { a: [], h: _null, c: new _Set() };
        _weakMapSet.call(currentTriggers, fiber.elementType, triggerData);
      }
      if (data && !data.v) {
        triggerData.h = owner;
      }
      let cacheKey = owner.k + "." + owner.l;
      if (_setHas.call(triggerData.c, cacheKey))
        return;
      _setAdd.call(triggerData.c, cacheKey);
      triggerData.a.push(owner);
    };
    inited = false;
    session = getSession();
    url = _null;
    onRender = _null;
    errors = [];
    events = [];
    eventIndex = -1;
    pendingRequests = 0;
    fiberComponentMap = new _WeakMap() ;
    dirtyNodes = [];
    currentRoot = { current: _null };
    recordingFiberTree = false;
    getMetadata = (key) => {
      return _mapGet.call(componentMetadata, key);
    };
    UNSTABLE_TYPES = ["object", "function"];
    getChange = (prevValue, nextValue, shallow) => {
      if (shallow) {
        if (_Object.is(prevValue, nextValue))
          return _null;
      }
      let type;
      let isJSX = React8__namespace.isValidElement(nextValue);
      if (!shallow || isJSX) {
        if (isEqual(prevValue, nextValue, false))
          return _null;
      }
      if (isJSX && typeof nextValue.type === "string")
        type = "jsx";
      let isDispatcher = typeof prevValue === "function" && prevValue[FLAG];
      if (isDispatcher)
        return _null;
      let prev = serialize(prevValue);
      let next = serialize(nextValue);
      let stringEq = prev === next;
      type = nextValue ? typeof nextValue : typeof prevValue;
      let unstable = stringEq && UNSTABLE_TYPES.includes(type);
      return {
        // unstable
        u: unstable,
        // type
        t: type,
        // count
        c: 1,
        // index: (if it's a change of the deps array, this will be the index of the dep)
        i: _null,
        // name: used to help identify the change
        // prop change postfixes this with the name of the prop
        n: stringEq ? prev : prev + "~" + next,
        d: _null
      };
    };
    captureDeps = (key, deps, instancesIndex, loc, locs, index, cache) => {
      if (!_isArray(deps))
        return deps;
      let fiber = useFiber();
      let owner = getOwner(fiber);
      let prev = cache && cache[index] || _null;
      let changes = [];
      if (prev) {
        for (let i3 = 0, len = deps.length; i3 < len; i3++) {
          let prevDepValue = prev[i3];
          let nextDepValue = deps[i3];
          let change = getChange(prevDepValue, nextDepValue, true);
          if (!change)
            continue;
          change.n = i3 + "";
          change.i = i3;
          change.d = canStabilize(prevDepValue, nextDepValue, change);
          changes.push(change);
        }
      }
      if (!prev || changes.length) {
        reportRender(
          key,
          1 /* Deps */,
          loc,
          _null,
          locs,
          0,
          0,
          -1,
          1,
          _null,
          owner,
          _null,
          instancesIndex,
          changes
        );
      }
      if (cache)
        cache[index] = deps;
      return deps;
    };
    captureProps = (key, props, instancesIndex, loc, index, noisy, cache) => {
      if (typeof props !== "object")
        return props;
      let fiber = useFiber();
      let owner = getOwner(fiber);
      let memoizedProps = fiber && fiber.memoizedProps || _null;
      let prevMemoizedProps = fiber && fiber.alternate && fiber.alternate.memoizedProps || _null;
      if (memoizedProps && !props)
        props = memoizedProps;
      let prevProps = cache ? cache[index] : prevMemoizedProps;
      React8__namespace.useEffect(() => {
        if (didFiberRender(fiber) && !noisy) {
          let changes = [];
          if (prevProps) {
            for (let name in props) {
              if (name === "children")
                continue;
              let prevProp = prevProps[name];
              let nextProp = props[name];
              let change = getChange(prevProp, nextProp, true);
              if (!change)
                continue;
              change.n = name;
              changes.push(change);
            }
          }
          if (!prevProps || changes.length) {
            reportRender(
              key,
              2 /* Props */,
              loc,
              _null,
              _null,
              0,
              0,
              -1,
              1,
              _null,
              owner,
              _null,
              instancesIndex,
              changes
            );
          }
          if (cache)
            cache[index] = props;
        }
      });
      return props;
    };
    captureValue = (key, value, instancesIndex, loc, locs, index, noisy, cache) => {
      let fiber = useFiber();
      let targetValue = value;
      if (fiber && typeof value === "object" && value && value.current) {
        targetValue = value.current;
      }
      let owner = getOwner(fiber);
      if (_isArray(value) && value.length === 2 && typeof value[1] === "function") {
        let dispatch = value[1];
        let hijackedDispatcher = function(nextValue) {
          let prevValue2 = cache ? cache[index][0] : value[0];
          dispatch(nextValue);
          if (!dispatch[FLAG] && fiber) {
            pushTrigger(fiber, {
              p: currentOwner,
              k: key,
              l: loc
            });
          }
          let change = getChange(prevValue2, nextValue, false);
          if (!change)
            return;
          reportRender(
            key,
            4 /* Value */,
            loc,
            _null,
            _null,
            0,
            0,
            -1,
            1,
            _null,
            owner,
            _null,
            instancesIndex,
            [change]
          );
        };
        hijackedDispatcher[FLAG] = true;
        if (cache) {
          let prevValue2 = cache[index];
          if (prevValue2) {
            prevValue2[0] = value[0];
            value[1] = prevValue2[1];
          } else {
            cache[index] = [value[0], hijackedDispatcher];
            value[1] = hijackedDispatcher;
          }
        }
        return value;
      }
      if (noisy)
        return value;
      let prevValue = cache && cache[index] || _null;
      if (cache)
        cache[index] = targetValue;
      if (prevValue) {
        let changes = [];
        if (typeof targetValue === "object" && locs) {
          if (_isArray(targetValue)) {
            for (let i3 = 0, len = targetValue.length; i3 < len; i3++) {
              let change = getChange(prevValue[i3], targetValue[i3], false);
              if (!change)
                continue;
              change.n = `${i3}`;
              change.i = i3;
              changes.push(change);
            }
          } else {
            for (let prop in targetValue) {
              let change = getChange(prevValue[prop], targetValue[prop], false);
              if (!change)
                continue;
              change.n = prop;
              changes.push(change);
            }
          }
        } else {
          let change = getChange(prevValue, targetValue, false);
          if (!change)
            return value;
          changes.push(change);
        }
        reportRender(
          key,
          4 /* Value */,
          loc,
          _null,
          locs,
          0,
          0,
          -1,
          locs ? 0 : 1,
          _null,
          owner,
          _null,
          instancesIndex,
          changes
        );
      }
      return value;
    };
    captureFunction = (key, fn2, instancesIndex, loc) => {
      if (typeof fn2 !== "function" || FLAG in fn2)
        return fn2;
      let capturedFn = function() {
        let startTime = _performance.now();
        try {
          let maybeSyntheticEvent = arguments[0];
          let ret = fn2.apply(this, arguments);
          let time = _performance.now() - startTime;
          let event = null;
          if (maybeSyntheticEvent && typeof maybeSyntheticEvent === "object" && maybeSyntheticEvent.nativeEvent instanceof Event) {
            let k3 = key + "." + loc;
            event = {
              n: maybeSyntheticEvent.type,
              t: time,
              d: Date.now(),
              k: k3,
              a: _null
            };
            if (events[eventIndex] && events[eventIndex].n === maybeSyntheticEvent.type && Date.now() - events[eventIndex].d < 16) {
              events[eventIndex] = event;
            } else {
              eventIndex = events.length;
              events.push(event);
            }
          }
          doubleRAF(() => {
            let layoutTime = _performance.now() - startTime;
            if (event)
              event.t = layoutTime;
            reportRender(
              key,
              128 /* Function */,
              loc,
              null,
              _null,
              time,
              layoutTime,
              -1,
              1,
              null,
              null,
              null,
              instancesIndex,
              []
            );
          });
          return ret;
        } catch (error) {
          reportRender(
            key,
            256 /* Error */,
            loc,
            null,
            _null,
            0,
            0,
            -1,
            1,
            null,
            null,
            error.message.trim(),
            instancesIndex,
            []
          );
          throw error;
        }
      };
      capturedFn[FLAG] = true;
      return capturedFn;
    };
    unsafeElements = new _WeakMap();
    REACT_MAJOR_VERSION = +React8__namespace.version.split(".")[0];
    MillionProfilerRaw = (_props, forwardedRef) => {
      let { children, _k, _l, _i: _i2, _l2, ...parentProps } = _props;
      let parentRef = REACT_MAJOR_VERSION > 18 ? _props.ref : forwardedRef;
      let prevRef = React8__namespace.useRef();
      let prev = prevRef.current;
      let childProps = children.props;
      let childrenRef = getElementRef(children);
      let isChildrenForwardRef = typeof children.type === "object" && "$$typeof" in children.type && String(children.type.$$typeof) === FORWARD_REF_SYMBOL_STRING;
      let changes = [];
      for (let name in childProps) {
        if (name === "children")
          continue;
        let prevProp = prev && prev[name] || _null;
        let nextProp = childProps[name];
        let change = getChange(prevProp, nextProp, true);
        if (!change)
          continue;
        change.n = name;
        change.d = canStabilize(prevProp, nextProp, change);
        changes.push(change);
      }
      let element = (
        /**
         * Condition 1: if parentProps exists, that means the parent to the profiler is a Slot (cloneElement Profiler passes new props down)
         *   with Slot: cloneElement(Profiler, {...ParentProps})
         *   without Slot: createElement(Profiler, {...})
         *
         * Condition 2: if a forwardRef is passed, then we need to forward that to the child
         *   before: Parent -(ref)-> ForwardRef(Child)
         *   after: Parent -(ref)-> Profiler -(!!!)> ForwardRef(Child)
         *   fixed: Parent -(ref)-> ForwardRef(Profiler) -(ref)-> ForwardRef(Child)
         *
         * @see https://github.com/radix-ui/primitives/blob/main/packages/react/slot/src/Slot.tsx
         */
        Object.keys(parentProps).length || parentRef ? (
          // https://x.com/aidenybai/status/1818774190717387121
          React8__namespace.cloneElement(
            children,
            _Object.assign(mergeProps(parentProps, childProps), {
              ref: (
                // We only pass a composed ref if the child is a forwardRef and the parent
                // passed down a forwardRef. Else, we default to the children's ref (may be undefined)
                isChildrenForwardRef && parentRef ? (ref) => {
                  setRef(parentRef, ref);
                  setRef(childrenRef, ref);
                } : childrenRef
              )
            })
          )
        ) : children
      );
      if (element && element.key) {
        changes.push({
          u: false,
          t: typeof element.key,
          c: 1,
          i: _null,
          n: "key~" + element.key,
          d: _null
        });
      }
      let fiber = useFiber();
      React8__namespace.useEffect(() => {
        if (!fiber || SIGKILL || !didFiberRender(fiber))
          return;
        if (fiber.type === MillionProfiler) {
          fiber = fiber.child;
        }
        let {
          s: s3,
          t: t3,
          $: $2
          /* memoScore */
        } = getTimings(fiber);
        let reference = fiber && fiber.type || _null;
        let self2 = _null;
        let owner = _null;
        let data = getMetadata(_k);
        if (data && data.v) {
          self2 = reference && reference[FLAG];
          owner = getOwner(fiber);
        }
        let isFiberMounted = fiber && (!fiber.alternate || (fiber.flags & (2 | 4096)) !== 0) || !fiber || !prev;
        reportRender(
          _k,
          isFiberMounted ? 32 /* JSXMount */ : 64 /* JSXUpdate */,
          _l,
          _l2,
          _null,
          s3,
          t3,
          $2,
          1,
          self2,
          owner,
          _null,
          _i2,
          changes
        );
        prevRef.current = childProps;
      });
      return element;
    };
    MillionProfiler = REACT_MAJOR_VERSION > 18 ? MillionProfilerRaw : React8__namespace.forwardRef(MillionProfilerRaw);
    MillionProfiler.displayName = PROFILER_DISPLAY_NAME;
    captureJSX = (key, element, instancesIndex, loc, secondaryLoc) => {
      if (_weakMapGet.call(unsafeElements, element) || [MillionProfiler, exports.MillionLintProvider].includes(element.type) || // ignore non-function styled components, since we assume their render isn't expensive
      typeof element.type === "object" && element.type && element.type.componentStyle && typeof element.type.target === "string") {
        return element;
      }
      if (isElementUnsafeToCapture(element)) {
        _weakMapSet.call(unsafeElements, element, true);
        return element;
      }
      return React8__namespace.createElement(MillionProfiler, {
        key: element.key || void 0,
        children: element,
        /**
         * key
         */
        _k: key,
        /**
         * instancesIndex
         */
        _i: instancesIndex,
        /**
         * loc
         */
        _l: loc,
        /**
         * secondaryLoc
         */
        _l2: secondaryLoc
      });
    };
    captureHook = (key, hook, instancesIndex, loc) => {
      if (typeof hook === "function") {
        let self2 = hook[FLAG];
        reportRender(
          key,
          1024 /* Hooks */,
          loc,
          _null,
          _null,
          0,
          0,
          -1,
          0,
          self2,
          _null,
          _null,
          instancesIndex,
          []
        );
      }
      return trackOwner(hook, key, loc);
    };
    trackOwner = (fn2, key, loc) => {
      return function() {
        let parentOwner = currentOwner;
        currentOwner = { p: parentOwner, k: key, l: loc };
        let ret = fn2.apply(this, arguments);
        currentOwner = parentOwner;
        return ret;
      };
    };
    componentIds = new _WeakMap() ;
    captureBaseline = (key, isInComponent, reference, data, loc) => {
      let noisy = false;
      let cache = [];
      if (reference && UNSTABLE_TYPES.includes(typeof reference) && !(FLAG in reference)) {
        reference[FLAG] = key;
      }
      if (isInComponent) {
        let cacheRef = React8__namespace.useRef([]);
        if (!cacheRef.current) {
          cacheRef.current = new _Array(data.c);
        }
        cache = cacheRef.current;
        let fiber = useFiber();
        if (fiber && data.v) {
          if (!(FLAG in fiber.type)) {
            fiber.type[FLAG] = key;
          }
          if (fiber.updateQueue && fiber.updateQueue.memoCache) {
            data.$ = true;
          }
        }
        {
          let ref = React8__namespace.useRef(_null);
          if (ref.current === _null) {
            ref.current = true;
            if (fiber) {
              let prevMemoizedState = _weakMapGet.call(componentIds, fiber);
              if (_weakMapHas.call(componentIds, fiber)) {
                _weakMapSet.call(componentIds, fiber, fiber.memoizedState);
              } else if (fiber.memoizedState !== prevMemoizedState) {
                _weakMapDelete.call(componentIds, fiber);
                noisy = true;
              }
            }
          }
        }
        let renderId = useId();
        React8__namespace.useLayoutEffect(() => {
          if (!fiber) {
            return;
          }
          unmountedSet.delete(fiber);
          return () => {
            unmountedSet.add(fiber);
          };
        }, []);
        React8__namespace.useEffect(() => {
          let {
            s: s3,
            t: t3,
            $: $2
            /* memoScore */
          } = getTimings(fiber);
          let didRender = didFiberRender(fiber);
          {
            if (didRender && fiber && data.v && typeof fiber.type[FLAG] === "string") {
              if (recordingFiberTree) {
                dirtyNodes.push(new WeakRef(fiber));
              }
              _weakMapSet.call(fiberComponentMap, fiber, {
                selfTime: s3,
                totalTime: t3,
                renderId,
                key: fiber.type[FLAG],
                fiberComponentName: fiber.type.displayName || fiber.type.name || "",
                hooks: []
                // we technically don't need to define this on the client, but it's fine for now
              });
            }
          }
          if (didRender && !noisy) {
            reportRender(
              key,
              512 /* Baseline */,
              loc,
              _null,
              _null,
              data.v ? s3 : 0,
              data.v ? t3 : 0,
              data.v ? $2 : -1,
              1,
              _null,
              _null,
              _null,
              data.i.length - 1,
              []
            );
          }
        });
        let child = useNearestChild(fiber);
        let current = child && child.current;
        if (current && !(FLAG in current)) {
          current[FLAG] = key;
        }
        let scheduleInstanceUpdate = () => {
          doubleRAF(() => {
            if (data._i !== data.i[data.i.length - 1]) {
              data.i.push(data._i);
            }
          });
        };
        React8__namespace.useEffect(() => {
          noisy = false;
          data._i++;
          scheduleInstanceUpdate();
          return () => {
            data._i--;
            scheduleInstanceUpdate();
          };
        }, []);
      }
      return { n: noisy, c: cache };
    };
    hijackReactCurrentDispatcher = (dispatcher) => {
      let prevUseStateDispatcher = dispatcher.useState;
      dispatcher.useState = (initialState) => {
        let [value, dispatch] = prevUseStateDispatcher(initialState);
        let trigger = currentOwner;
        let fiber = currentFiber;
        if (typeof dispatch[WRAPPER_FLAG] !== "function") {
          dispatch[WRAPPER_FLAG] = (newValue) => {
            if (fiber && trigger) {
              pushTrigger(fiber, trigger);
            }
            dispatch(newValue);
          };
        }
        return [value, dispatch[WRAPPER_FLAG]];
      };
      let prevUseReducerDispatcher = dispatcher.useReducer;
      dispatcher.useReducer = (reducer, initialState, init2) => {
        let [value, dispatch] = prevUseReducerDispatcher(
          reducer,
          initialState,
          init2
        );
        let trigger = currentOwner;
        let fiber = currentFiber;
        if (typeof dispatch[WRAPPER_FLAG] !== "function") {
          dispatch[WRAPPER_FLAG] = (newValue) => {
            if (fiber && trigger) {
              pushTrigger(fiber, trigger);
            }
            dispatch(newValue);
          };
        }
        return [value, dispatch[WRAPPER_FLAG]];
      };
      let prevUseContextDispatcher = dispatcher.useContext;
      let prevContextStateMap = new _WeakMap();
      dispatcher.useContext = (context) => {
        let value = prevUseContextDispatcher(context);
        if (_weakMapHas.call(prevContextStateMap, context)) {
          let prevValue = _weakMapGet.call(prevContextStateMap, context);
          if (_Object.is(prevValue, value))
            return value;
          if (currentFiber && currentOwner) {
            pushTrigger(currentFiber, currentOwner);
          }
        }
        _weakMapSet.call(prevContextStateMap, context, value);
        return value;
      };
      if (REACT_MAJOR_VERSION > 17) {
        let prevUseSyncExternalStoreDispatcher = dispatcher.useSyncExternalStore;
        let prevSESStateMap = new _WeakMap();
        dispatcher.useSyncExternalStore = (subscribe, getSnapshot, getServerSnapshot) => {
          let value = prevUseSyncExternalStoreDispatcher(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
          if (_weakMapHas.call(prevSESStateMap, subscribe)) {
            let prevValue = _weakMapGet.call(prevSESStateMap, subscribe);
            if (_Object.is(prevValue, value))
              return value;
            if (currentFiber && currentOwner) {
              pushTrigger(currentFiber, currentOwner);
            }
          }
          _weakMapSet.call(prevSESStateMap, subscribe, value);
          return value;
        };
      }
      return dispatcher;
    };
    didSyncDispatcherRefs = false;
    exports.$$ = (value, kind, key, loc, secondaryLoc, locs, index, mountInfo) => {
      if (isSSR || SIGKILL)
        return value;
      let data = getMetadata(key);
      if (!data)
        return value;
      let noisy = mountInfo && mountInfo.n || false;
      let cache = mountInfo && mountInfo.c || _null;
      let instancesIndex = data.i.length - 1;
      if (!didSyncDispatcherRefs) {
        syncDispatcherRefs(_window[DEVTOOLS_HOOK]);
        didSyncDispatcherRefs = true;
      }
      if (data.i.length === 1 && !data.i[0]) {
        data.i[0] = 1;
      }
      let isInComponent = peekIsInComponent(_null);
      if (isInComponent) {
        for (let dispatcherRef of dispatcherRefs) {
          if (dispatcherRef && !peekIsInComponent(
            dispatcherRef.H || dispatcherRef.current
          )) {
            isInComponent = false;
            break;
          }
        }
      }
      if (kind & 512 /* Baseline */) {
        return captureBaseline(key, isInComponent, value, data, loc);
      } else if (isInComponent && kind & 2 /* Props */) {
        return captureProps(key, value, instancesIndex, loc, index, noisy, cache);
      } else if (isInComponent && kind & 4 /* Value */) {
        return captureValue(
          key,
          value,
          instancesIndex,
          loc,
          locs,
          index,
          noisy,
          cache
        );
      } else if (isInComponent && kind & 1 /* Deps */) {
        return captureDeps(key, value, instancesIndex, loc, locs, index, cache);
      } else if (kind & 16 /* JSX */) {
        return captureJSX(key, value, instancesIndex, loc, secondaryLoc);
      } else if (kind & 128 /* Function */) {
        return captureFunction(key, value, instancesIndex, loc);
      } else if (kind & 1024 /* Hooks */) {
        return captureHook(key, value, instancesIndex, loc);
      } else if (kind & 2048 /* Note */) {
        reportRender(
          key,
          2048 /* Note */,
          loc,
          _null,
          _null,
          0,
          0,
          -1,
          1,
          _null,
          _null,
          value,
          instancesIndex,
          []
        );
      }
      return value;
    };
    exports.useCapture = (value, key, loc, index, mountInfo) => {
      if (SIGKILL || !key || loc == _null || index == _null || mountInfo == _null) {
        return value;
      }
      return exports.$$(
        value,
        value && typeof value === "object" && "$$typeof" in value ? 16 /* JSX */ : 4 /* Value */,
        key,
        loc,
        _null,
        _null,
        index,
        mountInfo || _null
      );
    };
    exports.useCount = (message, key, loc, index, mountInfo) => {
      if (SIGKILL || !key || loc == _null || index == _null || message == _null || mountInfo == _null) {
        return message;
      }
      {
        console.count(message);
      }
      return exports.$$(
        message,
        2048 /* Note */,
        key,
        loc,
        _null,
        _null,
        index,
        mountInfo || _null
      );
    };
    exports.useCallbackExperiment = (callback, deps, shouldMemo) => {
      let memoizedCallback = React8__namespace.useCallback(callback, deps);
      return shouldMemo ? memoizedCallback : callback;
    };
    exports.useMemoExperiment = (factory, deps, shouldMemo) => {
      let memoizedValue = React8__namespace.useMemo(factory, deps);
      return shouldMemo ? memoizedValue : factory();
    };
    exports.memoExperiment = (Component2, propsAreEqual, shouldMemo) => {
      return shouldMemo ? React8__namespace.memo(Component2, propsAreEqual) : Component2;
    };
    mergeChange = (prev, next) => {
      if (!prev && !next)
        return [];
      if (!prev || !prev.length)
        return next;
      if (!next || !next.length)
        return prev;
      let prevHead = 0;
      let nextHead = 0;
      let prevTail = prev.length - 1;
      let nextTail = next.length - 1;
      while (prevHead <= prevTail && nextHead <= nextTail) {
        let prevHeadChange = prev[prevHead];
        let nextHeadChange = next[nextHead];
        let prevTailChange = prev[prevTail];
        let nextTailChange = next[nextTail];
        if (prevHeadChange.n === nextHeadChange.n) {
          prevHeadChange.c += nextHeadChange.c;
          prevHeadChange.u = nextHeadChange.u;
          prevHead++;
          nextHead++;
        } else if (prevTailChange.n === nextTailChange.n) {
          prevTailChange.c += nextTailChange.c;
          prevTailChange.u = nextTailChange.u;
          prevTail--;
          nextTail--;
        } else {
          break;
        }
      }
      let changeIndexLookup = new _Map();
      for (; prevHead <= prevTail; prevHead++) {
        _mapSet.call(changeIndexLookup, prev[prevHead].n, prevHead);
      }
      for (; nextHead <= nextTail; nextHead++) {
        let nextChange = next[nextHead];
        let head = _mapGet.call(changeIndexLookup, nextChange.n);
        if (head == _null) {
          let index = prev.push(nextChange);
          _mapSet.call(changeIndexLookup, nextChange.n, index - 1);
          continue;
        }
        let prevChange = prev[head];
        prevChange.c += nextChange.c;
        prevChange.u = nextChange.u;
      }
      return prev;
    };
    reportRender = (key, kind, loc, secondaryLoc, locs, selfTime, totalTime, memoScore, count, self2, owner, message, instancesIndex, changes) => {
      let triggerData = getCurrentTrigger(currentFiber);
      let triggerKeys = _null;
      let overrideTriggerKey = _null;
      if (triggerData) {
        let data = getMetadata(key);
        if (data && !data.v) {
          overrideTriggerKey = triggerData.h ? triggerData.h.k + "." + triggerData.h.l : _null;
        } else {
          let allTriggers = triggerData.a;
          for (let i3 = 0, len = allTriggers.length; i3 < len; i3++) {
            let trigger = allTriggers[i3];
            if (trigger.l) {
              if (!triggerKeys)
                triggerKeys = [];
              triggerKeys.push(trigger.k + "." + trigger.l);
            }
          }
        }
      }
      if (overrideTriggerKey) {
        triggerKeys = // FIXME: slightly redundant
        triggerData && triggerData.h ? [overrideTriggerKey] : _null;
      }
      if (typeof self2 !== "string" && self2 !== null && self2 !== void 0) {
        return;
      }
      let render2 = {
        k: kind,
        l: loc,
        l2: secondaryLoc,
        ls: locs,
        s: selfTime,
        t: totalTime,
        $: memoScore,
        c: count,
        i: self2,
        o: owner,
        m: message,
        d: changes,
        x: eventIndex,
        n: instancesIndex,
        r: triggerKeys
      };
      let batchKey = getRenderItemCacheKey(
        key,
        kind,
        loc,
        owner,
        message,
        eventIndex,
        instancesIndex,
        triggerKeys && triggerKeys.join(".")
      );
      if (_mapHas.call(renderItemKeyCache, batchKey)) {
        let prevIndex = _mapGet.call(renderItemKeyCache, batchKey);
        let prevRender = batch[prevIndex].r;
        prevRender.c += count;
        prevRender.t += totalTime;
        prevRender.s += selfTime;
        prevRender.d = mergeChange(prevRender.d, changes);
        prevRender.$ = memoScore;
        return;
      }
      _mapSet.call(renderItemKeyCache, batchKey, batch.length);
      let renderItem = {
        k: key,
        r: render2
      };
      batch.push(renderItem);
      if (onRender)
        onRender();
      if (batch.length >= MAX_QUEUE_SIZE) {
        debouncedFlush();
      }
    };
    flush = (onFlushComplete = null, runtimeCommit = null, force = false) => {
      {
        if (_window._ANYA_DEV_.extensionStore.get("ws")?.io._readyState === "closed") {
          return;
        }
      }
      let renderItems = batch.length;
      let nothingToFlush = !renderItems && !runtimeCommit;
      if ((!url || nothingToFlush || !apiKey || SIGKILL || !session) && !force)
        return;
      {
        let DEV3 = _window._ANYA_DEV_;
        let toolbarStore2 = DEV3?.toolbarStore;
        if (toolbarStore2?.data.state === "error") {
          return;
        }
      }
      try {
        let components = new _Array(
          componentMetadata.size
        );
        let i3 = 0;
        componentMetadata.forEach((value, key) => {
          if (false) ; else {
            components[i3++] = {
              k: key,
              i: value.i,
              $: value.$,
              v: value.v,
              _: value._
            };
          }
          value.i = [value.i[value.i.length - 1] || 0];
        });
        let date = Date.now();
        let newEvents = [];
        for (let i4 = 0, len = events.length; i4 < len; i4++) {
          let event = events[i4];
          let loc = _null;
          let key = event.k;
          if (key) {
            let parts = key.split(".");
            loc = parts[2] || _null;
            if (loc)
              key = parts[0] + "." + parts[1];
          }
          newEvents.push({
            n: event.n,
            t: event.t,
            l: Number(loc),
            d: event.d,
            k: event.k,
            a: event.a
          });
        }
        let payload = {
          batch,
          events: newEvents,
          components,
          runtimeTreeEvents: runtimeCommit ?? [],
          session,
          version: VERSION || _null,
          pv: PAYLOAD_VERSION,
          react: React8__namespace.version || _null,
          geo: void 0,
          date,
          errors,
          compilerInstanceId
        };
        errors = [];
        events = [];
        eventIndex = -1;
        let _batch = false ? [] : [...batch];
        if (true) {
          let DEV3 = _window._ANYA_DEV_;
          let toolbarStore2 = DEV3?.toolbarStore;
          if (toolbarStore2) {
            toolbarStore2.setData({
              pending: true
            });
            toolbarStore2.pushBatch(_batch, newEvents);
          }
        }
        pendingRequests++;
        transport(url, payload, buildId, apiKey, commitHash, pendingRequests).then(() => {
          pendingRequests--;
          if (true) {
            onFlushComplete?.();
            let DEV3 = _window._ANYA_DEV_;
            let toolbarStore2 = DEV3?.toolbarStore;
            if (toolbarStore2) {
              toolbarStore2.setData({
                pending: false
              });
              let { items } = DEV3.toolbarStore.data;
              if (["error", "dormant"].includes(toolbarStore2.data.state)) {
                return;
              }
              toolbarStore2.setData({
                items: renderItems + items,
                state: "data",
                error: null
              });
            }
          }
        }).catch(async () => {
          if (true) {
            let DEV3 = _window._ANYA_DEV_;
            let toolbarStore2 = DEV3?.toolbarStore;
            if (toolbarStore2) {
              toolbarStore2.setData({
                pending: false,
                error: "Failed to ingest events"
              });
            }
            batch = _batch.concat(batch);
            let INITIAL_PORT = 42423;
            if (url) {
              let { port: parsedPort } = new URL(url);
              let port = Number(parsedPort) - 1;
              if (port >= INITIAL_PORT) {
                await transport(
                  url.replace(parsedPort, String(port)),
                  payload,
                  buildId,
                  apiKey,
                  commitHash,
                  pendingRequests
                );
              }
            }
          }
        });
      } catch (_err) {
      }
      _setTimeout(exports.reset, 0);
    };
    metadata = {
      f: flush,
      v: VERSION,
      c: false,
      a: false,
      x: kill,
      o: void 0,
      t: isTest
    };
    debouncedFlush = debounce(flush, 300);
    exports.reset = () => {
      if (SIGKILL)
        return;
      batch.length = 0;
      renderItemKeyCache.clear();
    };
    exports.registerMetadata = (key, size, isComponent, _DEV) => {
      if (isSSR || SIGKILL)
        return;
      if (_mapHas.call(componentMetadata, key))
        return;
      _mapSet.call(componentMetadata, key, {
        i: [0],
        _i: 0,
        c: size,
        n: false,
        v: isComponent,
        _: _DEV
      });
    };
    getFullTreeUpdates = () => {
      {
        let node = traverseFiber(
          currentRoot.current,
          false,
          (n3) => fiberComponentMap.has(n3) || !!(n3.alternate && fiberComponentMap.has(n3.alternate))
        );
        if (!node) {
          return;
        }
        let [updates] = computeDirtyComponentTrees(
          [new WeakRef(node)],
          fiberComponentMap,
          currentRoot.current
        );
        let nodesUpdated = dirtyNodes.map((x3) => x3.deref()).filter((fiber) => !!fiber).map((fiber) => fiberComponentMap.get(fiber)?.renderId).filter((x3) => typeof x3 !== "undefined");
        return updates.map((e3) => {
          if (e3.kind !== "update") {
            return e3;
          }
          return { ...e3, nodesUpdated };
        });
      }
    };
    wsCallbackUnsubscribe = {
      onInit: null
    };
    treeInterval = null;
    exports.init = (options = {}) => {
      if (isSSR || SIGKILL)
        return;
      _window[FLAG] = metadata;
      if (options.url) {
        url = options.url;
      }
      if (!buildId && options.buildId) {
        buildId = options.buildId;
      }
      if (!commitHash && options.commitHash) {
        commitHash = options.commitHash;
      }
      metadata.o = _Object.assign(options, {
        buildId,
        commitHash,
        url
      });
      apiKey = "dev";
      if (inited)
        return;
      inited = true;
      {
        try {
          void fetch(`${url}/reset`, {
            mode: (
              /* proxySessionId ? undefined : */
              "no-cors"
            ),
            method: (
              /* proxySessionId ? "POST" : */
              "GET"
            )
            // headers: {
            //   "X-Session-Id": proxySessionId || "",
            // },
          }).then(() => {
          }).catch(() => {
          });
        } catch (_err) {
        }
        console.log(`[Million Lint] Initialized with ${url}`);
      }
      let rootCache = null;
      onCommitFiberRoot = (root) => {
        metadata.c = true;
        {
          let DEV3 = _window._ANYA_DEV_;
          let fiberRoot = root ? "current" in root ? root.current : root : null;
          let canHitCache = rootCache?.elementType === fiberRoot.elementType;
          let treeIsTracked = canHitCache ? true : traverseFiber(
            fiberRoot,
            false,
            (n3) => fiberComponentMap.has(n3) || !!(n3.alternate && fiberComponentMap.has(n3.alternate))
          );
          if (!canHitCache && treeIsTracked) {
            rootCache = fiberRoot.elementType;
            currentRoot.current = fiberRoot;
          }
          if (DEV3.toolbarStore.data.root === root.containerInfo) {
            return;
          }
        }
        syncDispatcherRefs(_window[DEVTOOLS_HOOK]);
      };
      let debouncedLazyFlush = debounce(() => onIdle(flush), FLUSH_TIMEOUT);
      onHidden(flush);
      let checkExpiry = debounce(() => {
        session = getSession();
      }, SESSION_EXPIRE_TIMEOUT);
      let handleEvent = (event) => {
        if (events[eventIndex] && events[eventIndex].n === event.type && Date.now() - events[eventIndex].d < 16) {
          return;
        }
        eventIndex = events.length;
        events.push({
          n: event.type,
          t: 0,
          d: Date.now(),
          k: _null,
          a: _null
        });
      };
      for (let event of ["click", "mouseover", "touchstart", "input"]) {
        _addEventListener(event, handleEvent);
      }
      onRender = () => {
        debouncedLazyFlush();
        checkExpiry();
        {
          let DEV3 = _window._ANYA_DEV_;
          let toolbarStore2 = DEV3?.toolbarStore;
          if (!toolbarStore2)
            return;
          if (toolbarStore2.data.state === "hidden") {
            toolbarStore2.setData({
              state: "connecting"
            });
          }
          DEV3.inited = true;
          DEV3.url = url;
          DEV3.buildId = buildId;
          DEV3.apiKey = apiKey;
          DEV3.commitHash = commitHash;
        }
      };
      {
        let DEV3 = {
          batch,
          flush,
          componentMetadata,
          session,
          inited,
          buildId,
          apiKey,
          url,
          errors,
          FLAG,
          // eslint-disable-next-line no-console
          log: console.log,
          // prettyMs: (ms: number) => ms,
          getCurrentOwner: () => currentOwner ? getMetadata(currentOwner.k)?._?.componentName : ""
        };
        _window._ANYA_DEV_ = DEV3;
        if (!localStorage.getItem("DISABLE_MILLION_TOOLBAR") && // @ts-expect-error jest is a global in test
        typeof jest === "undefined") {
          try {
            void Promise.resolve().then(() => (init_toolbar(), toolbar_exports)).then(() => {
              let rootTrackedNode = traverseFiber(
                currentRoot.current,
                false,
                (n3) => fiberComponentMap.has(n3) || !!(n3.alternate && fiberComponentMap.has(n3.alternate))
              );
              if (!rootTrackedNode) {
                return;
              }
            });
          } catch (_3) {
          }
        }
        const handleServerStartup = (ws2) => {
          let fullUpdates = getFullTreeUpdates();
          debouncedFlush(
            () => {
              if (!fullUpdates) {
                return;
              }
              if (!recordingFiberTree) {
                return;
              }
              ws2.send(
                // this type design is poor/properties are redundant
                // for ex. isFullUpdate and null flag for nodes updated
                // can be compressed into a more specific kind:
                JSON.stringify({
                  kind: "runtime-tree-updates",
                  events: fullUpdates,
                  nodesUpdated: null,
                  isFullUpdate: true
                })
              );
              dirtyNodes.length = 0;
            },
            fullUpdates?.length ? fullUpdates : null,
            true
          );
        };
        void Promise.resolve().then(() => (init_extension_socket(), extension_socket_exports)).then(({ extensionStore: extensionStore2 }) => {
          {
            extensionStore2.set("ingestUrl", url ?? null);
            wsCallbackUnsubscribe.onInit?.();
            extensionStore2.subscribe("compilerInstanceId", (instanceId) => {
              if (instanceId) {
                compilerInstanceId = instanceId;
              }
            });
            extensionStore2.subscribe("supportsWs", (supportsWs) => {
              if (supportsWs === null) {
                return;
              }
              if (supportsWs) {
                clearInterval(treeInterval);
                return;
              }
              let timer = setInterval(() => {
                if (editorWS) {
                  clearInterval(treeInterval);
                  return;
                }
                if (extensionStore2.get("error") || extensionStore2.get("ws")?.io._readyState === "closed") {
                  clearInterval(treeInterval);
                  return;
                }
                if (!recordingFiberTree) {
                  return;
                }
                if (!currentRoot.current) {
                  return;
                }
                if (!dirtyNodes.length) {
                  return;
                }
                let fullUpdates = getFullTreeUpdates();
                if (fullUpdates) {
                  debouncedFlush(null, fullUpdates);
                  dirtyNodes.length = 0;
                }
              }, 2e3);
              if (treeInterval) {
                clearInterval(treeInterval);
              }
              treeInterval = timer;
            });
            extensionStore2.set("getFullTrackedFiberTree", () => {
              let fullUpdates = getFullTreeUpdates();
              return fullUpdates ?? [];
            });
            let unsubscribe = extensionStore2.subscribe("ws", (ws2) => {
              clearInterval(treeInterval);
              editorWS = ws2;
              if (ws2) {
                handleServerStartup(ws2);
                ws2.on("message", (anyMessage) => {
                  devInvariant(
                    typeof anyMessage === "string",
                    "always must be a string"
                  );
                  const message = JSON.parse(anyMessage);
                  switch (message.kind) {
                    case "editor-connection-open": {
                      handleServerStartup(ws2);
                      return;
                    }
                    case "needs-refresh": {
                      if (message.tabId && message.tabId !== extensionStore2.get("tabId")) {
                        return;
                      }
                      let fullUpdates = getFullTreeUpdates();
                      if (!fullUpdates?.length) {
                        return;
                      }
                      ws2.send(
                        JSON.stringify({
                          kind: "runtime-tree-updates",
                          events: fullUpdates,
                          nodesUpdated: null,
                          isFullUpdate: true
                        })
                      );
                      return;
                    }
                    case "runtime-tree-recording": {
                      if (recordingFiberTree === message.value) {
                        return;
                      }
                      recordingFiberTree = message.value;
                      ws2.send(
                        JSON.stringify({
                          kind: "runtime-tree-recording-ack",
                          tabId: extensionStore2.get("tabId")
                        })
                      );
                      return;
                    }
                  }
                });
              }
            });
            wsCallbackUnsubscribe.onInit = unsubscribe;
          }
        });
      }
    };
  }
});

// runtime/src/index.ts
init_core();
init_react_internals();
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
