'use strict';

require('@million/lint/devtools');
var prettyMs = require('pretty-ms');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var prettyMs__default = /*#__PURE__*/_interopDefault(prettyMs);

// runtime/src/core/audit/index.ts

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
    const r = Math.round(
      colors[start].r + ratio * (colors[end].r - colors[start].r)
    );
    const g = Math.round(
      colors[start].g + ratio * (colors[end].g - colors[start].g)
    );
    const b = Math.round(
      colors[start].b + ratio * (colors[end].b - colors[start].b)
    );
    return { r, g, b };
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
        const { r, g, b } = getColor(i);
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
        box.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
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
          `**${prettyMs__default.default(component.selfTime)}** _(\xD7${component.count})_ \xB7 \`${component.componentName}\``
        ],
        component.source
      )
    );
  }
  console.log(
    `%cYou can potentially save: ${prettyMs__default.default(savings)} (${Math.round(improvement * 100)}% faster)`,
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

Object.defineProperty(exports, "prettyMs", {
  enumerable: true,
  get: function () { return prettyMs__default.default; }
});
exports.compileMarkdown = compileMarkdown;
exports.logAudit = logAudit;
