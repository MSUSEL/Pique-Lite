(function (exports) {
  'use strict';

  // dist/runtime/devtools.mjs
  var e;
  var t;
  var r = Object.getOwnPropertyNames;
  (e = { "runtime/src/devtools.ts"() {
    !function() {
      try {
        var e2 = () => {
        }, t2 = /* @__PURE__ */ new Map(), r2 = 0;
        "undefined" == typeof window || "_ANYA_SIGKILL_" in window || window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || (window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { checkDCE: e2, supportsFiber: true, supportsFlight: true, hasUnsupportedRendererAttached: false, renderers: t2, onScheduleFiberRoot: e2, onCommitFiberRoot: e2, onCommitFiberUnmount: e2, inject(e3) {
          var o2 = ++r2;
          return t2.set(o2, e3), o2;
        } });
      } catch (e3) {
      }
    }();
  } }, function() {
    return t || (0, e[r(e)[0]])((t = { exports: {} }).exports, t), t.exports;
  })();

  // ../../node_modules/.pnpm/parse-ms@3.0.0/node_modules/parse-ms/index.js
  function parseMilliseconds(milliseconds) {
    if (typeof milliseconds !== "number") {
      throw new TypeError("Expected a number");
    }
    const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
    return {
      days: roundTowardsZero(milliseconds / 864e5),
      hours: roundTowardsZero(milliseconds / 36e5) % 24,
      minutes: roundTowardsZero(milliseconds / 6e4) % 60,
      seconds: roundTowardsZero(milliseconds / 1e3) % 60,
      milliseconds: roundTowardsZero(milliseconds) % 1e3,
      microseconds: roundTowardsZero(milliseconds * 1e3) % 1e3,
      nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1e3
    };
  }

  // ../../node_modules/.pnpm/pretty-ms@8.0.0/node_modules/pretty-ms/index.js
  var pluralize = (word, count) => count === 1 ? word : `${word}s`;
  var SECOND_ROUNDING_EPSILON = 1e-7;
  function prettyMilliseconds(milliseconds, options = {}) {
    if (!Number.isFinite(milliseconds)) {
      throw new TypeError("Expected a finite number");
    }
    if (options.colonNotation) {
      options.compact = false;
      options.formatSubMilliseconds = false;
      options.separateMilliseconds = false;
      options.verbose = false;
    }
    if (options.compact) {
      options.secondsDecimalDigits = 0;
      options.millisecondsDecimalDigits = 0;
    }
    const result = [];
    const floorDecimals = (value, decimalDigits) => {
      const flooredInterimValue = Math.floor(value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON);
      const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
      return flooredValue.toFixed(decimalDigits);
    };
    const add = (value, long, short, valueString) => {
      if ((result.length === 0 || !options.colonNotation) && value === 0 && !(options.colonNotation && short === "m")) {
        return;
      }
      valueString = (valueString || value || "0").toString();
      let prefix;
      let suffix;
      if (options.colonNotation) {
        prefix = result.length > 0 ? ":" : "";
        suffix = "";
        const wholeDigits = valueString.includes(".") ? valueString.split(".")[0].length : valueString.length;
        const minLength = result.length > 0 ? 2 : 1;
        valueString = "0".repeat(Math.max(0, minLength - wholeDigits)) + valueString;
      } else {
        prefix = "";
        suffix = options.verbose ? " " + pluralize(long, value) : short;
      }
      result.push(prefix + valueString + suffix);
    };
    const parsed = parseMilliseconds(milliseconds);
    add(Math.trunc(parsed.days / 365), "year", "y");
    add(parsed.days % 365, "day", "d");
    add(parsed.hours, "hour", "h");
    add(parsed.minutes, "minute", "m");
    if (options.separateMilliseconds || options.formatSubMilliseconds || !options.colonNotation && milliseconds < 1e3) {
      add(parsed.seconds, "second", "s");
      if (options.formatSubMilliseconds) {
        add(parsed.milliseconds, "millisecond", "ms");
        add(parsed.microseconds, "microsecond", "\xB5s");
        add(parsed.nanoseconds, "nanosecond", "ns");
      } else {
        const millisecondsAndBelow = parsed.milliseconds + parsed.microseconds / 1e3 + parsed.nanoseconds / 1e6;
        const millisecondsDecimalDigits = typeof options.millisecondsDecimalDigits === "number" ? options.millisecondsDecimalDigits : 0;
        const roundedMiliseconds = millisecondsAndBelow >= 1 ? Math.round(millisecondsAndBelow) : Math.ceil(millisecondsAndBelow);
        const millisecondsString = millisecondsDecimalDigits ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits) : roundedMiliseconds;
        add(
          Number.parseFloat(millisecondsString),
          "millisecond",
          "ms",
          millisecondsString
        );
      }
    } else {
      const seconds = milliseconds / 1e3 % 60;
      const secondsDecimalDigits = typeof options.secondsDecimalDigits === "number" ? options.secondsDecimalDigits : 1;
      const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
      const secondsString = options.keepDecimalsOnWholeSeconds ? secondsFixed : secondsFixed.replace(/\.0+$/, "");
      add(Number.parseFloat(secondsString), "second", "s", secondsString);
    }
    if (result.length === 0) {
      return "0" + (options.verbose ? " milliseconds" : "ms");
    }
    if (options.compact) {
      return result[0];
    }
    if (typeof options.unitCount === "number") {
      const separator = options.colonNotation ? "" : " ";
      return result.slice(0, Math.max(options.unitCount, 1)).join(separator);
    }
    return options.colonNotation ? result.join("") : result.join(" ");
  }

  // runtime/src/core/audit/utils.ts
  var SEPARATOR = /[-–—!$%^&*()_+|~=`{}[\]:/\\"'“”‘’;<>?,.@#\s\n\t\r]$/;
  var compileMarkdown = (strings, trace = "") => {
    const tokens = {};
    let formatted = "";
    let char = "";
    const result = [];
    const styles = [];
    const setStylesAndFormatted = (type, value, tokenType) => {
      if (formatted.endsWith("%c")) {
        styles[styles.length - 1] += value;
      } else {
        formatted += "%c";
        styles.push(value);
      }
      tokens[type] = tokenType;
      char = void 0;
    };
    const checkNextOrPrev = (value) => {
      return typeof value === "undefined" || SEPARATOR.test(value);
    };
    const process = (type, open, close, next, prev) => {
      if (tokens[type] && checkNextOrPrev(next)) {
        setStylesAndFormatted(type, close, false);
      } else if (!tokens[type] && checkNextOrPrev(prev)) {
        setStylesAndFormatted(type, open, true);
      } else {
        char = type;
      }
    };
    for (let i = 0, len = strings.length; i < len; i++) {
      formatted = "";
      let prev;
      const str = strings[i];
      for (let j = 0; j < str.length; j++) {
        char = str[j];
        if (char === "*") {
          if (str[j + 1] === "*") {
            j++;
            process(
              "**",
              "font-weight: bold;",
              "font-weight: normal;",
              str[j + 1],
              prev
            );
          } else {
            process(
              "*",
              "font-style: italic;",
              "font-style: normal;",
              str[j + 1],
              prev
            );
          }
        } else if (char === "_") {
          if (str[j + 1] === "_") {
            j++;
            process(
              "__",
              "font-weight: bold;",
              "font-weight: normal;",
              str[j + 1],
              prev
            );
          } else {
            process(
              "_",
              "font-style: italic;",
              "font-style: normal;",
              str[j + 1],
              prev
            );
          }
        } else if (char === "`") {
          process(
            "`",
            "background: hsla(0,0%,70%,.3); border-radius:3px; padding: 0 2px;",
            "background: unset;",
            str[j + 1],
            prev
          );
        }
        prev = char;
        if (typeof char !== "undefined") {
          formatted += char;
        }
      }
      if (!result.length)
        result.push("");
      if (formatted !== "") {
        if (result.length) {
          result[result.length - 1] += formatted;
        } else {
          result.push(formatted);
        }
      }
    }
    if (trace) {
      if (!result.length)
        result.push("");
      result[result.length - 1] += `%c(@ ${trace})`;
      styles.push(
        "color: #999; font-style: italic; font-size: 0.9em; padding-left: 2em;"
      );
    }
    result.push(...styles);
    return result;
  };
  var serialize = (value) => {
    switch (typeof value) {
      case "function":
        return value.toString();
      case "string":
        return value;
      case "object":
        if (value === null) {
          return "null";
        }
        if (Array.isArray(value)) {
          return value.length > 0 ? "[\u2026]" : "[]";
        }
        if (typeof value.$$typeof === "symbol" && String(value.$$typeof) === "Symbol(react.element)") {
          return `<${value.type.displayName || value.type.name || ""}${Object.keys(value.props).length > 0 ? " \u2026" : ""}>`;
        }
        if (typeof value === "object" && value !== null && value.constructor === Object) {
          for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
              return "{\u2026}";
            }
          }
          return "{}";
        }
        const tagString = Object.prototype.toString.call(value).slice(8, -1);
        if (tagString === "Object") {
          const proto = Object.getPrototypeOf(value);
          const constructor = proto && proto.constructor;
          if (typeof constructor === "function") {
            return `${constructor.displayName || constructor.name || ""}{\u2026}`;
          }
        }
        return `${tagString}{\u2026}`;
      default:
        return String(value);
    }
  };
  var didFiberRender = (fiber) => {
    if (!(fiber && fiber.alternate))
      return true;
    switch (fiber.tag) {
      case 0:
      case 1:
      case 9:
      case 14:
      case 15:
        const flags = (fiber.flags !== void 0 ? fiber.flags : fiber.effectTag) ?? 0;
        return (flags & 1) === 1;
      default:
        return fiber.alternate.memoizedProps !== fiber.memoizedProps || fiber.alternate.memoizedState !== fiber.memoizedState || fiber.alternate.ref !== fiber.ref;
    }
  };
  var isUnstableType = (value) => {
    return value && ["function", "object"].includes(typeof value);
  };
  var getComponentName = (fiber) => {
    return fiber?.type?.displayName || fiber?.type?.name || fiber?.elementType?.displayName || fiber?.elementType?.name || "<unknown>";
  };
  var getVSCodeUri = (fileName, lineNumber) => `vscode://file${fileName}:${lineNumber || 0}`;
  var traverseFiber = (root, selector) => {
    while (root) {
      if (selector(root)) {
        return root;
      }
      if (root.child) {
        const childFiber = traverseFiber(root.child, selector);
        if (childFiber)
          return childFiber;
      }
      root = root.sibling ?? null;
    }
    return null;
  };
  var getNearestChild = (fiber) => {
    return traverseFiber(fiber, (childFiber) => {
      return childFiber.stateNode;
    });
  };
  var createColorGradient = (len) => {
    const colors = [
      { r: 255, g: 255, b: 255 },
      // white
      { r: 255, g: 255, b: 0 },
      // Yellow
      { r: 255, g: 165, b: 0 },
      // Orange
      { r: 255, g: 0, b: 0 }
      // Red
    ];
    return (index) => {
      const position = index / (len - 1);
      const segment = position * (colors.length - 1);
      const start = Math.floor(segment);
      const end = Math.min(start + 1, colors.length - 1);
      const ratio = segment - start;
      const r2 = Math.round(
        colors[start].r + ratio * (colors[end].r - colors[start].r)
      );
      const g = Math.round(
        colors[start].g + ratio * (colors[end].g - colors[start].g)
      );
      const b = Math.round(
        colors[start].b + ratio * (colors[end].b - colors[start].b)
      );
      return { r: r2, g, b };
    };
  };

  // runtime/src/core/audit/index.ts
  var Window = window;
  var components = /* @__PURE__ */ Object.create(null);
  var handleFiber = (fiber) => {
    const name = getComponentName(fiber);
    let component = components[name];
    if (!component) {
      const source = fiber._debugSource ? getVSCodeUri(fiber._debugSource.fileName, fiber._debugSource.lineNumber) : void 0;
      component = {
        potentialUnstableProps: {},
        unstableProps: {},
        totalTime: 0,
        selfTime: 0,
        baseTime: 0,
        count: 0,
        source,
        nodes: [getNearestChild(fiber)?.stateNode]
      };
      components[name] = component;
    }
    if (didFiberRender(fiber)) {
      const totalTime = fiber?.actualDuration || 0;
      const baseTime = fiber?.treeBaseDuration || 0;
      let selfTime = totalTime;
      let child = fiber?.child;
      while (totalTime > 0 && child) {
        selfTime -= child.actualDuration || 0;
        child = child.sibling;
      }
      component.totalTime += totalTime;
      component.selfTime += selfTime;
      component.baseTime = baseTime;
      component.count++;
      const node = getNearestChild(fiber)?.stateNode;
      if (node) {
        component.nodes.push(node);
      }
      const nextProps = fiber.memoizedProps;
      const prevProps = fiber.alternate?.memoizedProps;
      if (nextProps && typeof nextProps === "object") {
        for (const prop in nextProps) {
          const nextValue = nextProps[prop];
          const prevValue = prevProps?.[prop];
          const isNextUnstable = isUnstableType(nextValue);
          const isPrevUnstable = isUnstableType(prevValue);
          const reportProp = (target) => {
            const prevProp = target[prop];
            if (prevProp) {
              prevProp.count++;
              prevProp.totalTime += totalTime;
              prevProp.selfTime += selfTime;
              prevProp.baseTime += baseTime;
            } else {
              target[prop] = {
                count: 1,
                totalTime,
                selfTime,
                baseTime
              };
            }
          };
          if (nextValue !== prevValue) {
            if (isNextUnstable) {
              reportProp(component.potentialUnstableProps);
            }
            if (isNextUnstable && isPrevUnstable && serialize(nextValue) === serialize(prevValue)) {
              reportProp(component.unstableProps);
            }
          }
        }
      }
    }
    return false;
  };
  var prevOCFR = Window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.onCommitFiberRoot;
  var handleCommitFiberRoot = (_rendererID, fiberRoot) => {
    if (prevOCFR)
      prevOCFR(_rendererID, fiberRoot);
    const fiber = fiberRoot.current;
    traverseFiber(fiber, handleFiber);
  };
  if (Window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    Window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = handleCommitFiberRoot;
  }
  var createComponentTable = () => {
    let totalPotentialSavings = 0;
    let totalSelfTime = 0;
    let table = [];
    for (const componentName in components) {
      const component = components[componentName];
      if (componentName === "<unknown>" || !component.count)
        continue;
      let maxCount = 0;
      const averageSelfTime = component.selfTime / component.count;
      const allProps = component.potentialUnstableProps;
      for (const propName in allProps) {
        const prop = allProps[propName];
        maxCount = Math.max(maxCount, prop.count);
      }
      const potentialSavings = averageSelfTime * maxCount;
      totalPotentialSavings += potentialSavings;
      totalSelfTime += component.selfTime;
      table.push({
        componentName,
        potentialSavings,
        count: maxCount,
        selfTime: component.selfTime,
        nodes: component.nodes,
        source: component.source
      });
    }
    table = table.sort((a, b) => a.selfTime - b.selfTime);
    const improvement = totalPotentialSavings / totalSelfTime;
    return { table, improvement, savings: totalPotentialSavings };
  };
  var clearBoxes = () => {
    document.querySelectorAll(".__million_audit_box__").forEach((el) => el.remove());
  };
  var displayComponents = () => {
    const { table } = createComponentTable();
    clearBoxes();
    const getColor = createColorGradient(table.length);
    const seen = /* @__PURE__ */ new WeakSet();
    for (let i = 0, len = table.length; i < len; i++) {
      const component = table[i];
      for (let j = 0, len2 = component.nodes.length; j < len2; j++) {
        let el = component.nodes[j];
        if (el instanceof Text && el.parentNode instanceof Element) {
          el = el.parentNode;
        }
        if (el instanceof Element) {
          const { r: r2, g, b } = getColor(i);
          const box = document.createElement("div");
          const rect = el.getBoundingClientRect();
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            continue;
          }
          if (seen.has(el)) {
            continue;
          }
          seen.add(el);
          if (rect.width - 100 > window.innerWidth || rect.height - 100 > window.innerHeight) {
            continue;
          }
          if (rect.width === 0 || rect.height === 0) {
            continue;
          }
          box.className = "__million_audit_box__";
          box.style.left = `${rect.left}px`;
          box.style.top = `${rect.top}px`;
          box.style.width = `${rect.width}px`;
          box.style.height = `${rect.height}px`;
          box.style.backgroundColor = `rgba(${r2}, ${g}, ${b}, 0.1)`;
          document.body.appendChild(box);
        }
      }
    }
  };
  var logAudit = () => {
    console.log(
      "%c[Million Lint] Audit generated",
      "background: red; color: white; font-size: 20px; padding: 10px;"
    );
    const { table, improvement, savings } = createComponentTable();
    for (let i = 0, len = table.length; i < len; i++) {
      const component = table[i];
      console.log(
        ...compileMarkdown(
          [
            `**${prettyMilliseconds(component.selfTime)}** _(\xD7${component.count})_ \xB7 \`${component.componentName}\``
          ],
          component.source
        )
      );
    }
    console.log(
      `%cYou can potentially save: ${prettyMilliseconds(savings)} (${Math.round(improvement * 100)}% faster)`,
      "background: red; color: white; font-size: 20px; padding: 10px;"
    );
  };
  var interval;
  var inited = false;
  window.$audit = () => {
    if (!inited) {
      document.head.appendChild(document.createElement("style")).textContent = `
      .__million_audit_box__ {
        position: fixed;
        padding: 4px 8px;
        border-radius: 4px;
        z-index: 9998;
        opacity: 0.8;
        pointer-events: none;
      }
    `;
    }
    inited = true;
    if (interval) {
      clearInterval(interval);
      interval = null;
      clearBoxes();
      return;
    }
    displayComponents();
    logAudit();
    interval = setInterval(() => {
    }, 1e3);
    displayComponents();
  };

  exports.compileMarkdown = compileMarkdown;
  exports.logAudit = logAudit;
  exports.prettyMs = prettyMilliseconds;

  return exports;

})({});
