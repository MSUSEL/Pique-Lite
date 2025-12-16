var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/tsup@8.0.2_postcss@8.4.49_ts-node@10.9.2_@types+node@20.12.11_typescript@5.4.5__typescript@5.4.5/node_modules/tsup/assets/esm_shims.js
var init_esm_shims = __esm({
  "../../node_modules/.pnpm/tsup@8.0.2_postcss@8.4.49_ts-node@10.9.2_@types+node@20.12.11_typescript@5.4.5__typescript@5.4.5/node_modules/tsup/assets/esm_shims.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/debug.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module.exports = debug;
  }
});

// ../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/constants.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// ../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/re.js
var require_re = __commonJS({
  "../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/re.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports = module.exports = {};
    var re = exports.re = [];
    var safeRe = exports.safeRe = [];
    var src = exports.src = [];
    var t3 = exports.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t3[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t3.NUMERICIDENTIFIER]})\\.(${src[t3.NUMERICIDENTIFIER]})\\.(${src[t3.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t3.NUMERICIDENTIFIERLOOSE]})\\.(${src[t3.NUMERICIDENTIFIERLOOSE]})\\.(${src[t3.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t3.NUMERICIDENTIFIER]}|${src[t3.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t3.NUMERICIDENTIFIERLOOSE]}|${src[t3.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t3.PRERELEASEIDENTIFIER]}(?:\\.${src[t3.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t3.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t3.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t3.BUILDIDENTIFIER]}(?:\\.${src[t3.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t3.MAINVERSION]}${src[t3.PRERELEASE]}?${src[t3.BUILD]}?`);
    createToken("FULL", `^${src[t3.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t3.MAINVERSIONLOOSE]}${src[t3.PRERELEASELOOSE]}?${src[t3.BUILD]}?`);
    createToken("LOOSE", `^${src[t3.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t3.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t3.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t3.XRANGEIDENTIFIER]})(?:\\.(${src[t3.XRANGEIDENTIFIER]})(?:\\.(${src[t3.XRANGEIDENTIFIER]})(?:${src[t3.PRERELEASE]})?${src[t3.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t3.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t3.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t3.XRANGEIDENTIFIERLOOSE]})(?:${src[t3.PRERELEASELOOSE]})?${src[t3.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t3.GTLT]}\\s*${src[t3.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t3.GTLT]}\\s*${src[t3.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t3.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t3.COERCEPLAIN] + `(?:${src[t3.PRERELEASE]})?(?:${src[t3.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t3.COERCE], true);
    createToken("COERCERTLFULL", src[t3.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t3.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t3.LONETILDE]}${src[t3.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t3.LONETILDE]}${src[t3.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t3.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t3.LONECARET]}${src[t3.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t3.LONECARET]}${src[t3.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t3.GTLT]}\\s*(${src[t3.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t3.GTLT]}\\s*(${src[t3.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t3.GTLT]}\\s*(${src[t3.LOOSEPLAIN]}|${src[t3.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t3.XRANGEPLAIN]})\\s+-\\s+(${src[t3.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t3.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t3.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// ../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/parse-options.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module.exports = parseOptions;
  }
});

// ../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/identifiers.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// ../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/classes/semver.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t: t3 } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t3.LOOSE] : re[t3.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier7, identifierBase) {
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier7, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier7, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier7, identifierBase);
            this.inc("pre", identifier7, identifierBase);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier7, identifierBase);
            }
            this.inc("pre", identifier7, identifierBase);
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (!identifier7 && identifierBase === false) {
              throw new Error("invalid increment argument: identifier is empty");
            }
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier7 === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier7) {
              let prerelease = [identifier7, base];
              if (identifierBase === false) {
                prerelease = [identifier7];
              }
              if (compareIdentifiers(this.prerelease[0], identifier7) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module.exports = SemVer;
  }
});

// ../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/compare.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module.exports = compare;
  }
});

// ../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "../../node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/gte.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module.exports = gte;
  }
});

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "@million/lint",
      version: "1.0.14",
      description: "Make your React app fast",
      keywords: [],
      license: "UNLICENSED",
      type: "commonjs",
      exports: {
        "./package.json": "./package.json",
        ".": {
          import: {
            types: "./dist/compiler/index.d.mts",
            default: "./dist/compiler/index.mjs"
          },
          require: {
            types: "./dist/compiler/index.d.ts",
            default: "./dist/compiler/index.js"
          }
        },
        "./compiler": {
          import: {
            types: "./dist/compiler/index.d.mts",
            default: "./dist/compiler/index.mjs"
          },
          require: {
            types: "./dist/compiler/index.d.ts",
            default: "./dist/compiler/index.js"
          }
        },
        "./loader": {
          import: {
            types: "./dist/compiler/loader.d.mts",
            default: "./dist/compiler/loader.mjs"
          },
          require: {
            types: "./dist/compiler/loader.d.ts",
            default: "./dist/compiler/loader.js"
          }
        },
        "./runtime": {
          production: {
            import: {
              types: "./dist/runtime/index.d.mts",
              "react-server": "./dist/runtime/rsc-shim.mjs",
              default: "./dist/runtime/index.mjs"
            },
            require: {
              types: "./dist/runtime/index.d.ts",
              "react-server": "./dist/runtime/rsc-shim.js",
              default: "./dist/runtime/index.js"
            }
          },
          development: {
            import: {
              types: "./dist/runtime-dev/index.d.mts",
              "react-server": "./dist/runtime-dev/rsc-shim.mjs",
              default: "./dist/runtime-dev/index.mjs"
            },
            require: {
              types: "./dist/runtime-dev/index.d.ts",
              "react-server": "./dist/runtime-dev/rsc-shim.js",
              default: "./dist/runtime-dev/index.js"
            }
          },
          default: {
            import: {
              types: "./dist/runtime-dev/index.d.mts",
              "react-server": "./dist/runtime-dev/rsc-shim.mjs",
              default: "./dist/runtime-dev/index.mjs"
            },
            require: {
              types: "./dist/runtime-dev/index.d.ts",
              "react-server": "./dist/runtime-dev/rsc-shim.js",
              default: "./dist/runtime-dev/index.js"
            }
          }
        },
        "./runtime-dev": {
          import: {
            types: "./dist/runtime-dev/index.d.mts",
            "react-server": "./dist/runtime-dev/rsc-shim.js",
            default: "./dist/runtime-dev/index.mjs"
          },
          require: {
            types: "./dist/runtime-dev/index.d.ts",
            "react-server": "./dist/runtime-dev/rsc-shim.js",
            default: "./dist/runtime-dev/index.js"
          }
        },
        "./runtime-17-compat": {
          production: {
            import: {
              types: "./dist/runtime/index.d.mts",
              "react-server": "./dist/runtime/rsc-shim.mjs",
              default: "./dist/runtime/index.mjs"
            },
            require: {
              types: "./dist/runtime/index.d.ts",
              "react-server": "./dist/runtime/rsc-shim.js",
              default: "./dist/runtime/index.js"
            }
          },
          development: {
            import: {
              types: "./dist/runtime-dev-17-compat/index.d.mts",
              "react-server": "./dist/runtime-dev-17-compat/rsc-shim.mjs",
              default: "./dist/runtime-dev-17-compat/index.mjs"
            },
            require: {
              types: "./dist/runtime-dev-17-compat/index.d.ts",
              "react-server": "./dist/runtime-dev-17-compat/rsc-shim.js",
              default: "./dist/runtime-dev-17-compat/index.js"
            }
          },
          default: {
            import: {
              types: "./dist/runtime-dev/index.d.mts",
              "react-server": "./dist/runtime-dev/rsc-shim.mjs",
              default: "./dist/runtime-dev/index.mjs"
            },
            require: {
              types: "./dist/runtime-dev/index.d.ts",
              "react-server": "./dist/runtime-dev/rsc-shim.js",
              default: "./dist/runtime-dev/index.js"
            }
          }
        },
        "./runtime-dev-17-compat": {
          import: {
            types: "./dist/runtime-dev-17-compat/index.d.mts",
            "react-server": "./dist/runtime-dev-17-compat/rsc-shim.js",
            default: "./dist/runtime-dev-17-compat/index.mjs"
          },
          require: {
            types: "./dist/runtime-dev-17-compat/index.d.ts",
            "react-server": "./dist/runtime-dev-17-compat/rsc-shim.js",
            default: "./dist/runtime-dev-17-compat/index.js"
          }
        },
        "./devtools": {
          import: {
            types: "./dist/runtime/devtools.d.mts",
            "react-server": "./dist/runtime/rsc-shim.mjs",
            default: "./dist/runtime/devtools.mjs"
          },
          require: {
            types: "./dist/runtime/devtools.d.ts",
            "react-server": "./dist/runtime/rsc-shim.js",
            default: "./dist/runtime/devtools.js"
          }
        },
        "./dist/*": "./dist/*.js",
        "./dist/*.js": "./dist/*.js",
        "./dist/*.mjs": "./dist/*.mjs"
      },
      main: "dist/compiler/index.js",
      module: "dist/compiler/index.mjs",
      types: "dist/compiler/index.d.ts",
      bin: "./cli.js",
      files: [
        "dist",
        "package.json",
        "compiler.d.ts",
        "runtime.d.ts",
        "cli.js"
      ],
      scripts: {
        build: "tsup && node validate-build.cjs",
        bump: "tsup && npx bumpp && tsup",
        dev: "tsup --watch",
        lint: "eslint '**/*.{ts,tsx}'",
        pack: "node ./local-update.cjs && npm run build && rm -rf ./dist/wizard && npm pack",
        "pack:faire": "pnpm run pack",
        test: "vitest"
      },
      dependencies: {
        "@axiomhq/js": "1.0.0-rc.3",
        "@babel/core": "7.26.0",
        "@babel/types": "7.26.0",
        "@hono/node-server": "^1.11.1",
        "@million/install": "latest",
        "@rollup/pluginutils": "^5.1.0",
        "@rrweb/types": "2.0.0-alpha.16",
        "babel-plugin-syntax-hermes-parser": "^0.21.1",
        "ci-info": "^4.0.0",
        esbuild: "^0.20.1",
        "faster-babel-types": "^0.1.0",
        hono: "^4.5.9",
        "isomorphic-fetch": "^3.0.0",
        nanoid: "^5.0.7",
        ohash: "^1.1.4",
        pako: "^2.1.0",
        pathe: "^1.1.2",
        piscina: "^4.4.0",
        "pretty-ms": "8.0.0",
        "react-scan": "^0.0.31",
        rrweb: "2.0.0-alpha.4",
        "rrweb-player": "1.0.0-alpha.4",
        semver: "^7.6.2",
        "socket.io": "^4.8.1",
        "socket.io-client": "^4.7.5",
        tmp: "^0.2.3",
        unplugin: "^1.6.0",
        "update-notifier-cjs": "^5.1.6"
      },
      devDependencies: {
        "@million/shared": "workspace:^",
        "@types/babel__core": "^7.20.5",
        "@types/isomorphic-fetch": "^0.0.39",
        "@types/node": "^20.11.13",
        "@types/react": "^18.3.3",
        "@types/react-dom": "^18.3.0",
        "@types/react-reconciler": "^0.28.8",
        "@types/semver": "^7.5.8",
        "@types/tmp": "^0.2.6",
        "@types/web": "^0.0.136",
        "async-mutex": "^0.4.1",
        bumpp: "^9.2.0",
        kleur: "^4.1.5",
        lodash: "^4.17.21",
        next: "14.2.5",
        "posthog-js": "^1.189.0",
        react: "*",
        "react-dom": "*",
        "react-reconciler": "^0.29.2",
        terser: "^5.29.2",
        tslib: "^2.6.2",
        tsup: "^8.0.2",
        typescript: "^5.4.5",
        "use-sync-external-store": "^1.2.2",
        vite: "^5.2.12",
        vitest: "^2.0.5"
      },
      publishConfig: {
        access: "public"
      }
    };
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js"(exports, module) {
    "use strict";
    init_esm_shims();
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js
var require_root = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/now.js
var require_now = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/now.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var root = require_root();
    var now = function() {
      return root.Date.now();
    };
    module.exports = now;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_trimmedEndIndex.js
var require_trimmedEndIndex = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {
      }
      return index;
    }
    module.exports = trimmedEndIndex;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTrim.js
var require_baseTrim = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTrim.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var trimmedEndIndex = require_trimmedEndIndex();
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    module.exports = baseTrim;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js"(exports, module) {
    "use strict";
    init_esm_shims();
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toNumber.js
var require_toNumber = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toNumber.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var baseTrim = require_baseTrim();
    var isObject = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = toNumber;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/debounce.js
var require_debounce = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/debounce.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var isObject = require_isObject();
    var now = require_now();
    var toNumber = require_toNumber();
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    function debounce2(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    module.exports = debounce2;
  }
});

// compiler/loader.ts
init_esm_shims();

// compiler/src/index.ts
init_esm_shims();
import path4 from "path";
import { createFilter } from "@rollup/pluginutils";
import { createUnplugin } from "unplugin";

// compiler/src/axiom.ts
init_esm_shims();
import { Axiom } from "@axiomhq/js";

// compiler/src/core/utils/machine-id.ts
init_esm_shims();
import os from "os";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
var getConfigDir = (name) => {
  const homedir = os.homedir();
  const macos = () => path.join(homedir, "Library", "Preferences", name);
  const win = () => {
    const { APPDATA = path.join(homedir, "AppData", "Roaming") } = process.env;
    return path.join(APPDATA, name, "Config");
  };
  const linux = () => {
    const { XDG_CONFIG_HOME = path.join(homedir, ".config") } = process.env;
    return path.join(XDG_CONFIG_HOME, name);
  };
  switch (process.platform) {
    case "darwin":
      return macos();
    case "win32":
      return win();
    default:
      return linux();
  }
};
var configDir = getConfigDir("million-lint");
var machineId = `mil-${randomUUID()}`;
var getMachineIdAsync = async () => {
  if (!env.IS_DEVELOPMENT)
    return void 0;
  if (!machineId) {
    try {
      const stat = fs.statSync(path.join(configDir, "machineId.txt"));
      if (stat.isFile()) {
        machineId = fs.readFileSync(path.join(configDir, "machineId.txt"), "utf8") || machineId;
      }
    } catch (err) {
      if (err instanceof Error) {
        void saveLog("error", {
          origin: "Failed to read machine-id",
          message: err.message,
          stack: err.stack,
          configDir
        });
      }
    }
  }
  return machineId;
};
var getMachineId = () => {
  return machineId;
};

// compiler/src/core/utils/get-commit-hash.ts
init_esm_shims();
import { execSync } from "child_process";

// ../../node_modules/.pnpm/nanoid@5.0.7/node_modules/nanoid/index.js
init_esm_shims();
import { webcrypto as crypto2 } from "crypto";

// ../../node_modules/.pnpm/nanoid@5.0.7/node_modules/nanoid/url-alphabet/index.js
init_esm_shims();
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// ../../node_modules/.pnpm/nanoid@5.0.7/node_modules/nanoid/index.js
var POOL_SIZE_MULTIPLIER = 128;
var pool;
var poolOffset;
function fillPool(bytes) {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    crypto2.getRandomValues(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto2.getRandomValues(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
}
function nanoid(size = 21) {
  fillPool(size -= 0);
  let id = "";
  for (let i = poolOffset - size; i < poolOffset; i++) {
    id += urlAlphabet[pool[i] & 63];
  }
  return id;
}

// compiler/src/core/utils/get-commit-hash.ts
var COMMIT_HASH_REGEX = new RegExp(/^[a-f0-9]{40}$/i, "g");
var testCommitHash = (str) => {
  return typeof str === "string" && COMMIT_HASH_REGEX.test(str) ? str : void 0;
};
var getCommitHash = () => {
  const hash3 = (
    // testCommitHash(process.env.MILLION_COMMIT_SHA) ??
    // testCommitHash(process.env.VERCEL_GIT_COMMIT_SHA) ??
    // testCommitHash(process.env.GITHUB_SHA) ??
    // testCommitHash(process.env.COMMIT_REF) ??
    // testCommitHash(process.env.HEROKU_SLUG_COMMIT) ??
    // testCommitHash(process.env.SOURCE_VERSION) ??
    testCommitHash(
      execSync("git rev-parse HEAD", {
        stdio: ["ignore", "pipe", "ignore"]
      }).toString().trim()
    )
  );
  return hash3 || `MILLION-${nanoid(40)}`;
};
var buildId = nanoid();
var getBuildId = () => {
  return buildId;
};

// compiler/src/axiom.ts
var axiom = new Axiom({
  // compiler token on axiom
  token: "xaat-c264ece9-0d91-4c55-8ab7-d6b24b57e1c6"
});
var trunc = (str, length) => {
  if (str.length <= length)
    return str;
  return `${str.slice(0, length)}...`;
};
var saveLog = async (level, message) => {
  const machineId2 = await getMachineIdAsync();
  for (const key in message) {
    if (typeof message[key] === "string") {
      message[key] = trunc(message[key], 2 ** 14);
    }
  }
  const { message: msg, origin, ...restOfMessage } = message;
  try {
    axiom.ingest("compiler-v2", {
      origin,
      level,
      id: machineId2 || `b-${getBuildId()}` || `c-${getCommitHash()}`,
      message: msg,
      context: JSON.stringify(
        // eslint-disable-next-line prefer-object-spread
        Object.assign({}, restOfMessage, {})
      ),
      env: {
        NODE_ENV: process.env.NODE_ENV,
        VERSION: "1.0.14",
        ...env
      }
    });
  } catch (_err) {
  }
};

// compiler/src/core/bridge.ts
init_esm_shims();
var import_gte = __toESM(require_gte());
import { normalize } from "pathe";
import updateNotifier from "update-notifier-cjs";
var import_package = __toESM(require_package());

// compiler/src/core/utils/log.ts
init_esm_shims();

// ../../node_modules/.pnpm/kleur@4.1.5/node_modules/kleur/colors.mjs
init_esm_shims();
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$.enabled || txt == null)
      return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);

// compiler/src/core/utils/log.ts
var isDisplayed = false;
var displayIntro = () => {
  if (isDisplayed)
    return;
  const initialTime = performance.now();
  isDisplayed = true;
  console.log(
    `
 ${bold(magenta(`\u26A1 Million Lint v${"1.0.14"}`))}`
  );
  console.log(
    ` ${green("\u2713")} Ready in ${(performance.now() - initialTime).toFixed(2)}ms
`
  );
};
var displayProductionIntro = (buildId2, commitHash, apiKey) => {
  if (isDisplayed)
    return;
  isDisplayed = true;
  if (!buildId2 || !commitHash || !apiKey || buildId2 === "dev" || commitHash === "dev") {
    console.error(
      ` ${red("\u2716")} ${bold(
        "Please provide a build ID, commit hash, and API key for production"
      )}`
    );
    process.exit(1);
  }
  console.log(
    `
 ${bold(magenta(`\u26A1 Million Lint (Production) v${"1.0.14"}`))}
     - Build ID: ${cyan(buildId2)}
     - Commit Hash: ${cyan(commitHash)}
     - API Key: ${cyan(apiKey)}
`
  );
};
var moduleCount = 0;
var cumulativeTime = 0;
var numberOfTimes = 0;
var prettyMs = (time) => {
  return `${time.toFixed(0)}ms`;
};
void (async () => {
  prettyMs = (await import("pretty-ms")).default;
})();
var logStart = (filename) => {
  console.log(` ${gray("\u25CB")} ${filename} \u2026`);
  return performance.now();
};
var logEnd = (filename, initialTime, stats) => {
  if (initialTime === null)
    return 0;
  const diff = performance.now() - initialTime;
  let color = white;
  const average = cumulativeTime / numberOfTimes;
  if (average !== 0) {
    if (average * 3 < diff) {
      color = magenta;
    } else if (average * 2 < diff) {
      color = red;
    } else if (average * 1.5 < diff) {
      color = yellow;
    }
  }
  cumulativeTime += diff;
  numberOfTimes++;
  moduleCount++;
  console.log(` ${green("\u2714")} ${filename} in ${color(prettyMs(diff))}`);
  if ((stats == null ? void 0 : stats.components) && (stats == null ? void 0 : stats.captures)) {
    console.log(gray(`  - ${stats.components} components`));
    console.log(gray(`  - ${stats.captures} captures`));
  }
  return diff;
};
var logFinish = (totalTime, stats) => {
  if (totalTime === 0)
    return;
  console.log(
    ` ${magenta("\u2726")} Completed in ${prettyMs(totalTime)} (${moduleCount} modules)`
  );
  void saveLog("log", {
    origin: "Completed compile",
    moduleCount,
    totalTime,
    ...stats
  });
};
var logError = (message) => {
  console.error(` ${yellow("\u26A0")} ${message}`);
};

// compiler/src/core/bridge.ts
updateNotifier({
  pkg: import_package.default,
  updateCheckInterval: 1e3 * 60 * 5
}).notify();
var DEFAULT_PORT = 52921;
var minVscodeCompatible = "0.1.14";
var isSameCwd = (thisCwd, otherCwd = "") => {
  thisCwd = normalize(thisCwd);
  otherCwd = normalize(otherCwd);
  return thisCwd === otherCwd || thisCwd.includes(otherCwd) || otherCwd.includes(thisCwd);
};
async function* getPossibleConnections(port = DEFAULT_PORT) {
  for (const host of ["localhost", "0.0.0.0", "host.docker.internal"]) {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(
        fetch(`http://${host}:${port + i}/this`).then(async (response) => {
          if (!response.ok)
            return void 0;
          const windows2 = await response.json();
          return windows2;
        }).catch(() => void 0)
      );
    }
    const windows = await Promise.all(promises);
    for (const window of windows.flat()) {
      if (!window)
        continue;
      yield {
        id: window.id,
        host,
        port: window.port,
        vscode_cwd: window.cwd,
        vscode_version: window.vscode,
        urlScheme: window.urlScheme,
        cwd: process.cwd(),
        match: isSameCwd(process.cwd(), window.cwd),
        normalized: {
          v: normalize(window.cwd),
          p: normalize(process.cwd())
        }
      };
    }
  }
}
var hasAlertedOutdated = false;
async function* getSessions(port = DEFAULT_PORT) {
  const sessions = /* @__PURE__ */ new Set();
  let versionMismatchFlag = false;
  for await (const connection of getPossibleConnections(port)) {
    if (!connection)
      return;
    else if (connection.match && !sessions.has(connection.id)) {
      if (connection.vscode_version && !(0, import_gte.default)(connection.vscode_version, minVscodeCompatible)) {
        versionMismatchFlag = true;
      }
      sessions.add(connection.id);
      yield {
        host: connection.host,
        port: connection.port
      };
    }
  }
  if (versionMismatchFlag && !hasAlertedOutdated) {
    hasAlertedOutdated = true;
    logError(
      `VSCode Extension is out of date. Run \`npx @million/lint\` to update.`
    );
  }
}
var reset2 = async () => {
  if (store.sessionId) {
    await fetch(`${store.proxyUrl}/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-Id": store.sessionId
      }
    }).catch((err) => {
      void saveLog("error", {
        origin: "Failed to reset data",
        message: err.message,
        stack: err.stack
      });
    });
  } else {
    const ports = [];
    try {
      for await (const { port, host } of getSessions()) {
        const url = encodeURIComponent(`http://127.0.0.1:${store.port}`);
        void fetch(`http://${host}:${port}/reset?url=${url}`).catch(() => null);
        ports.push(port);
      }
    } catch (err) {
      if (err instanceof Error) {
        void saveLog("error", {
          origin: "Failed to reset data",
          message: err.message,
          stack: err.stack,
          ports
        });
      }
    }
  }
};
var healthCheck = async () => {
  const ports = [];
  const url = `http://127.0.0.1:${store.port}`;
  try {
    for await (const { port, host } of getSessions()) {
      void fetch(`http://${host}:${port}/healthcheck?url=${url}`).catch(
        (err) => {
          void saveLog("error", {
            origin: "Failed to send data to ingest server",
            message: err.message,
            stack: err.stack,
            ports
          });
        }
      );
      fetch(`http://${host}:${port}/problems`).then((res) => res.json()).then((problems) => {
        if (Array.isArray(problems)) {
          store.problems = problems;
        }
      }).catch((err) => {
        void saveLog("error", {
          origin: "Failed to fetch problems from VSCode",
          message: err.message,
          stack: err.stack,
          ports
        });
      });
      ports.push(port);
    }
  } catch (err) {
    logError(
      "Failed to send data to ingest server, please restart your dev server."
    );
    if (err instanceof Error) {
      void saveLog("error", {
        origin: "Failed to send data to ingest server",
        message: err.message,
        stack: err.stack,
        ports
      });
    }
  }
};
var report = async (payload) => {
  payload.cwd = process.cwd();
  payload.url = `http://127.0.0.1:${store.port}`;
  let version = "unknown";
  try {
    version = require_package().version;
  } catch (e) {
  }
  let react = "unknown";
  try {
    react = __require("react/package.json").version;
  } catch (e) {
  }
  const metadata = {
    ci: "dev",
    version,
    react,
    commitHash: "dev",
    buildId: "dev",
    url: "dev"
  };
  if (payload.compiler)
    payload.compiler.metadata = metadata;
  if (store.sessionId) {
    await fetch(`${store.proxyUrl}/compiler`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-Id": store.sessionId
      },
      body: JSON.stringify(payload.compiler)
    }).catch((err) => {
      void saveLog("error", {
        origin: "Failed to send compiler data to ingest server (proxy)",
        message: err.message,
        stack: err.stack
      });
    });
    return;
  }
  const ports = [];
  try {
    for await (const { port, host } of getSessions()) {
      void fetch(`http://${host}:${port}/ingest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch((err) => {
        void saveLog("error", {
          origin: "Failed to send data to ingest server",
          message: err.message,
          stack: err.stack,
          ports
        });
      });
      ports.push(port);
    }
  } catch (err) {
    logError(
      "Failed to send data to ingest server, please restart your dev server."
    );
    if (err instanceof Error) {
      void saveLog("error", {
        origin: "Failed to send data to ingest server",
        message: err.message,
        stack: err.stack,
        ports
      });
    }
  }
};

// compiler/src/core/compile.ts
init_esm_shims();
import { transformAsync } from "@babel/core";
import hermesParser from "babel-plugin-syntax-hermes-parser";

// compiler/src/core/plugin.ts
init_esm_shims();
import * as ft11 from "faster-babel-types";

// compiler/src/core/capture/metadata.ts
init_esm_shims();
import * as ft7 from "faster-babel-types";

// compiler/src/core/constants.ts
init_esm_shims();
var isReact17Compat = false;
var setReact17Compat = (value) => {
  isReact17Compat = value;
};
var ANYA_IGNORE = "million ignore";
var getRuntimeSource = () => (
  // @ts-expect-error jest is a global in test
  `${"@million/lint/runtime"}${process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test" || typeof jest !== "undefined" ? "" : "-dev"}${isReact17Compat ? "-17-compat" : ""}`
);
var ANYA_CAPTURE = {
  kind: "named",
  name: "$$",
  get source() {
    return getRuntimeSource();
  }
};
var ANYA_REGISTER_METADATA = {
  kind: "named",
  name: "registerMetadata",
  get source() {
    return getRuntimeSource();
  }
};
var BANNED_COMPONENTS = [
  "Route",
  "Routes",
  "Router",
  "Switch",
  "SwitchBase",
  "Redirect",
  "Navigate",
  "Outlet",
  "Suspense",
  "ScrollRestoration",
  "Fragment",
  "Link",
  "Layout",
  "Select"
];

// compiler/src/core/utils/checks.ts
init_esm_shims();
import * as ft from "faster-babel-types";
var getImportSpecifierName = (specifier) => {
  if (ft.isIdentifier(specifier.imported)) {
    return specifier.imported.name;
  }
  return specifier.imported.value;
};
var isComponent = (node) => {
  switch (node.type) {
    case "ArrowFunctionExpression":
    case "FunctionExpression":
    case "FunctionDeclaration":
      return true;
    default:
      return false;
  }
};
var isCapitalized = (str) => {
  return Boolean(str.length) && str[0] >= "A" && str[0] <= "Z";
};
var isHookName = (ctx, id) => {
  return Boolean(ctx.filters.hook) && ctx.filters.hook.test(id.name);
};
var HAS_JSX_TRAVERSE = {
  JSXElement(path5, state) {
    state.jsx = true;
    path5.stop();
  },
  JSXFragment(path5, state) {
    state.jsx = true;
    path5.stop();
  }
};
var hasJSX = (path5) => {
  const state = { jsx: false };
  path5.traverse(HAS_JSX_TRAVERSE, state);
  return state.jsx;
};
var getComponentType = (ctx, path5) => {
  if (!path5)
    return void 0;
  if (path5.node.type === "ArrowFunctionExpression") {
    return "function";
  }
  if (!path5.node.id) {
    return void 0;
  }
  return getTypeFromComponentName(ctx, path5, path5.node.id);
};
var getTypeFromComponentName = (ctx, path5, id) => {
  if (ctx.filters.component.test(id.name)) {
    return hasJSX(path5) ? "component" : "function";
  }
  if (isHookName(ctx, id)) {
    return "hook";
  }
  if (hasJSX(path5)) {
    return "function";
  }
  return void 0;
};
var isPathValid = (path5, key) => {
  return key(path5.node);
};
var isNestedExpression = (node) => {
  switch (node.type) {
    case "ParenthesizedExpression":
    case "TypeCastExpression":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSNonNullExpression":
    case "TSTypeAssertion":
    case "TSInstantiationExpression":
      return true;
    default:
      return false;
  }
};

// compiler/src/core/utils/get-descriptive-name.ts
init_esm_shims();
import * as ft2 from "faster-babel-types";
var getDescriptiveNamePath = (path5) => {
  let current = path5;
  while (current) {
    switch (current.node.type) {
      case "FunctionDeclaration":
      case "FunctionExpression": {
        const id = current.get("id");
        if (isPathValid(id, ft2.isIdentifier))
          return id;
        break;
      }
      case "VariableDeclarator": {
        const id = current.get("id");
        return isPathValid(id, ft2.isIdentifier) ? id : void 0;
      }
      case "ClassPrivateMethod":
      case "ClassMethod":
      case "ObjectMethod": {
        const key = current.get("key");
        if (isPathValid(key, ft2.isIdentifier)) {
          return key;
        }
        if (isPathValid(key, ft2.isPrivateName)) {
          return key.get("id");
        }
        return void 0;
      }
      default:
        break;
    }
    current = current.parentPath;
  }
  return void 0;
};
var getDescriptiveName = (path5, defaultName) => {
  let current = path5;
  while (current) {
    switch (current.node.type) {
      case "FunctionDeclaration":
      case "FunctionExpression": {
        if (ft2.isIdentifier(current.node.id)) {
          return current.node.id.name;
        }
        break;
      }
      case "VariableDeclarator":
        return ft2.isIdentifier(current.node.id) ? current.node.id.name : defaultName;
      case "ClassPrivateMethod":
      case "ClassMethod":
      case "ObjectMethod": {
        switch (current.node.key.type) {
          case "Identifier":
            return current.node.key.name;
          case "PrivateName":
            return current.node.key.id.name;
          default:
            return defaultName;
        }
      }
      default:
        break;
    }
    current = current.parentPath;
  }
  return defaultName;
};

// compiler/src/core/utils/get-import-identifier.ts
init_esm_shims();
import * as ft4 from "faster-babel-types";

// compiler/src/core/utils/generate-unique-name.ts
init_esm_shims();
import * as ft3 from "faster-babel-types";
var generateUniqueName = (path5, name) => {
  let uid;
  let i = 1;
  do {
    uid = `${name}_${i}`;
    i++;
  } while (path5.scope.hasLabel(uid) || path5.scope.hasBinding(uid) || path5.scope.hasGlobal(uid) || path5.scope.hasReference(uid));
  const program = path5.scope.getProgramParent();
  program.references[uid] = true;
  program.uids[uid] = true;
  return ft3.identifier(uid);
};

// compiler/src/core/utils/get-import-identifier.ts
var getImportIdentifier = (ctx, path5, registration) => {
  const name = registration.kind === "named" ? registration.name : "default";
  const target = `${registration.source}[${name}]`;
  const current = ctx.imports.get(target);
  if (current) {
    return current;
  }
  const programParent = path5.scope.getProgramParent();
  const uid = generateUniqueName(programParent.path, name);
  programParent.registerDeclaration(
    programParent.path.unshiftContainer(
      "body",
      ft4.importDeclaration(
        [
          registration.kind === "named" ? ft4.importSpecifier(uid, ft4.identifier(registration.name)) : ft4.importDefaultSpecifier(uid)
        ],
        ft4.stringLiteral(registration.source)
      )
    )[0]
  );
  ctx.imports.set(target, uid);
  return uid;
};

// compiler/src/core/utils/unwrap.ts
init_esm_shims();
import * as ft5 from "faster-babel-types";
var unwrapNode = (node, key) => {
  if (key(node)) {
    return node;
  }
  if (isNestedExpression(node)) {
    return unwrapNode(node.expression, key);
  }
  return void 0;
};
var unwrapPath = (path5, key) => {
  if (isPathValid(path5, key)) {
    return path5;
  }
  if (isPathValid(path5, isNestedExpression)) {
    return unwrapPath(path5.get("expression"), key);
  }
  return void 0;
};
var unwrapBody = (path5) => {
  if (path5.isFunctionDeclaration() || path5.isFunctionExpression() || path5.isArrowFunctionExpression() || path5.isProgram()) {
    if (Array.isArray(path5.node.body)) {
      return path5.node.body;
    }
    if (ft5.isBlockStatement(path5.node.body)) {
      return path5.node.body.body;
    }
  }
  return null;
};
var unwrapLoc = (loc) => {
  return [
    (loc == null ? void 0 : loc.start.line) ?? 0,
    (loc == null ? void 0 : loc.start.column) ?? 0,
    (loc == null ? void 0 : loc.end.line) ?? 0,
    (loc == null ? void 0 : loc.end.column) ?? 0
  ];
};

// compiler/src/core/utils/wrap-hmr.ts
init_esm_shims();
import * as ft6 from "faster-babel-types";

// compiler/src/core/utils/helpers.ts
init_esm_shims();
var getDevUrl = (options) => {
  var _a;
  return store.proxyUrl ? `${store.proxyUrl}/ingest` : ((_a = options.ingest) == null ? void 0 : _a.runtimeURL) || // Use runtime url if available
  `http://localhost:${store.port}/ingest`;
};

// compiler/src/core/utils/wrap-hmr.ts
var importMetaHot = ft6.memberExpression(
  ft6.memberExpression(ft6.identifier("import"), ft6.identifier("meta")),
  ft6.identifier("hot")
);
var importMetaWebpackHot = ft6.memberExpression(
  ft6.memberExpression(ft6.identifier("import"), ft6.identifier("meta")),
  ft6.identifier("webpackHot")
);
var moduleHotAccept = ft6.memberExpression(
  ft6.identifier("module"),
  ft6.identifier("hot")
);
var isCJS = ft6.binaryExpression(
  "===",
  ft6.unaryExpression("typeof", ft6.identifier("module")),
  ft6.stringLiteral("undefined")
);
var wrapHMR = (ctx, path5, expression) => {
  var _a;
  const reset3 = getImportIdentifier(ctx, path5, {
    kind: "named",
    name: "reset",
    source: getRuntimeSource()
  });
  const init3 = getImportIdentifier(ctx, path5, {
    kind: "named",
    name: "init",
    source: getRuntimeSource()
  });
  const importHot = ctx.options.framework === "webpack" ? importMetaWebpackHot : importMetaHot;
  const statements = [];
  statements.push(ft6.expressionStatement(ft6.callExpression(reset3, [])));
  statements.push(
    ft6.expressionStatement(
      ft6.callExpression(init3, [
        ft6.objectExpression([
          ft6.objectProperty(
            ft6.identifier("url"),
            ft6.stringLiteral(getDevUrl(ctx.options))
          ),
          ft6.objectProperty(
            ft6.identifier("buildId"),
            ft6.stringLiteral(getMachineId())
          ),
          ft6.objectProperty(
            ft6.identifier("apiKey"),
            ft6.stringLiteral(
              process.env.NODE_ENV === "production" ? ((_a = ctx.options.production) == null ? void 0 : _a.apiKey) || "" : "dev"
            )
          ),
          ft6.objectProperty(
            ft6.identifier("sessionId"),
            store.sessionId ? ft6.stringLiteral(store.sessionId) : ctx.addGlobal(null)
          )
        ])
      ])
    )
  );
  statements.push(ft6.expressionStatement(expression));
  const callbackId = path5.scope.generateUidIdentifier("c");
  const callback = ft6.variableDeclaration("let", [
    ft6.variableDeclarator(
      callbackId,
      ft6.arrowFunctionExpression([], ft6.blockStatement(statements))
    )
  ]);
  const acceptCallback = ft6.arrowFunctionExpression(
    [],
    ft6.blockStatement([
      ft6.expressionStatement(ft6.callExpression(callbackId, []))
    ])
  );
  const legacyHmr = ft6.ifStatement(
    moduleHotAccept,
    ft6.blockStatement([
      ft6.expressionStatement(
        ft6.callExpression(
          ft6.memberExpression(moduleHotAccept, ft6.identifier("accept")),
          [ft6.stringLiteral(ctx.options.absoluteFilename), acceptCallback]
        )
      )
    ])
  );
  const hmr = ctx.options.legacyHmr ? legacyHmr : ft6.ifStatement(
    isCJS,
    ft6.blockStatement([
      ft6.ifStatement(
        importHot,
        ft6.blockStatement([
          ft6.expressionStatement(
            ft6.callExpression(
              ft6.memberExpression(importHot, ft6.identifier("accept")),
              [
                ft6.stringLiteral(ctx.options.absoluteFilename),
                acceptCallback
              ]
            )
          )
        ])
      )
    ]),
    legacyHmr
  );
  return [
    callback,
    ft6.tryStatement(
      ft6.blockStatement([hmr]),
      ft6.catchClause(ft6.identifier("_"), ft6.blockStatement([]))
    ),
    ft6.expressionStatement(ft6.callExpression(callbackId, []))
  ];
};

// compiler/src/core/capture/metadata.ts
function registerMetadataQueue(config) {
  const register = ft7.callExpression(config.registerMetadataID, [
    config.context.addGlobal(config.key),
    ft7.numericLiteral(config.index),
    ft7.booleanLiteral(isCapitalized(config.componentName)),
    process.env.NODE_ENV === "production" ? config.context.addGlobal(null) : ft7.objectExpression([
      ft7.objectProperty(
        ft7.identifier("filename"),
        ft7.stringLiteral(
          config.context.options.absoluteFilename || "<unknown>"
        )
      ),
      ft7.objectProperty(
        ft7.identifier("componentName"),
        ft7.stringLiteral(config.componentName)
      )
    ])
  ]);
  const body = unwrapBody(config.path);
  if (!body)
    return;
  if (process.env.NODE_ENV === "production") {
    body.push(ft7.expressionStatement(register));
  } else {
    body.push.apply(body, wrapHMR(config.context, config.path, register));
  }
}
var registerMetadata = (ctx, path5, key, index, componentName, checkScope = true, captures = []) => {
  const registerMetadataID = getImportIdentifier(
    ctx,
    path5,
    ANYA_REGISTER_METADATA
  );
  const scope = path5.scope.getBlockParent().parent;
  if (checkScope && (!scope || ![
    "Program",
    "BlockStatement",
    "FunctionDeclaration",
    "FunctionExpression"
  ].includes(scope.path.type))) {
    return;
  }
  if (!ft7.isArrowFunctionExpression(path5.node) && ft7.isIdentifier(path5.node.id) && !(scope == null ? void 0 : scope.path.scope.hasBinding(path5.node.id.name))) {
    return;
  }
  ctx.queue.push({
    context: ctx,
    path: checkScope ? scope.path : path5,
    key,
    index,
    componentName,
    registerMetadataID
  });
  const filename = ctx.options.filename;
  const loc = unwrapLoc(path5.node.loc);
  const descriptiveNamePath = getDescriptiveNamePath(path5);
  let nameLoc = null;
  if (descriptiveNamePath) {
    descriptiveNamePath.traverse({
      TypeAnnotation(path6) {
        path6.remove();
      }
    });
    nameLoc = unwrapLoc(descriptiveNamePath.node.loc);
  }
  if (!store.reactData[filename]) {
    store.reactData[filename] = {
      components: /* @__PURE__ */ Object.create(null),
      externals: []
    };
  }
  const file = store.reactData[filename];
  const prev = file.components[componentName];
  file.externals = ctx.externals;
  file.components[componentName] = {
    loc: loc || (prev == null ? void 0 : prev.loc),
    nameLoc: nameLoc || (prev == null ? void 0 : prev.nameLoc),
    captures: captures || (prev == null ? void 0 : prev.captures)
  };
  if (!ctx.options.test) {
    store.report();
  }
};

// compiler/src/core/capture/transform.ts
init_esm_shims();
import * as t from "@babel/types";

// ../shared/types/raw-api/compiler.ts
init_esm_shims();

// compiler/src/core/capture/transform.ts
import * as ft9 from "faster-babel-types";

// compiler/src/core/utils/get-definition.ts
init_esm_shims();
import * as ft8 from "faster-babel-types";
var getDefinitionFromExpression = (ctx, path5, registration) => {
  const id = unwrapNode(path5.node, ft8.isIdentifier);
  if (id) {
    const binding = path5.scope.getBindingIdentifier(id.name);
    if (binding) {
      return ctx.registrations[registration].identifiers.get(binding);
    }
    return void 0;
  }
  const memberExpr = unwrapNode(path5.node, ft8.isMemberExpression);
  if (memberExpr && !memberExpr.computed && ft8.isIdentifier(memberExpr.property)) {
    const object = unwrapNode(memberExpr.object, ft8.isIdentifier);
    const property = unwrapNode(memberExpr.property, ft8.isIdentifier);
    if (object) {
      const binding = path5.scope.getBindingIdentifier(object.name);
      if (property && (binding == null ? void 0 : binding.name) === "React") {
        return ctx.preset.imports[registration].filter((r) => {
          return r.kind === "named" && r.name === property.name;
        })[0];
      }
    }
  }
  return void 0;
};
var getDefinitionFromCallee = (ctx, path5, registration) => {
  const callee = path5.get("callee");
  if (!callee.isExpression()) {
    return void 0;
  }
  return getDefinitionFromExpression(ctx, callee, registration);
};

// compiler/src/core/capture/transform.ts
var getDefaultHookDefinition = (ctx, id, object) => {
  var _a;
  let source = getRuntimeSource();
  if (object && ((_a = ctx.registrations.React) == null ? void 0 : _a.local) === object.name) {
    source = ctx.registrations.React.source;
  }
  if (isHookName(ctx, id)) {
    for (let i = 0, len = ctx.preset.imports.hooks.length; i < len; i++) {
      const hook = ctx.preset.imports.hooks[i];
      if (hook.import.kind === "named" && hook.import.name === id.name) {
        return hook;
      }
    }
    return {
      type: 4 /* Value */,
      import: {
        kind: "named",
        name: id.name,
        source
      }
    };
  }
  return void 0;
};
var getHookImportDefinitionFromIdentifier = (ctx, identifier7) => {
  const binding = identifier7.scope.getBindingIdentifier(identifier7.node.name);
  if (binding) {
    return ctx.registrations.hooks.identifiers.get(binding) || getDefaultHookDefinition(ctx, identifier7.node);
  }
  return getDefaultHookDefinition(ctx, identifier7.node);
};
var getHookImportDefinitionFromPropName = (def, propName) => {
  if (def.import.kind === "default" && propName === "default") {
    return def;
  }
  if (def.import.kind === "named" && propName === def.import.name) {
    return def;
  }
  return void 0;
};
var getHookImportDefinitionFromMemberExpression = (ctx, member) => {
  if (member.node.computed || !ft9.isIdentifier(member.node.property)) {
    return void 0;
  }
  const object = unwrapPath(member.get("object"), ft9.isIdentifier);
  if (object) {
    const binding = object.scope.getBindingIdentifier(object.node.name);
    if (binding) {
      const def = ctx.registrations.hooks.identifiers.get(member.node.property);
      if (def) {
        return getHookImportDefinitionFromPropName(
          def,
          member.node.property.name
        );
      }
      return getDefaultHookDefinition(ctx, member.node.property, binding);
    }
  }
  return getDefaultHookDefinition(ctx, member.node.property);
};
var getHookImportDefinition = (ctx, path5) => {
  const callee = path5.get("callee");
  const identifier7 = unwrapPath(callee, ft9.isIdentifier);
  if (identifier7) {
    return getHookImportDefinitionFromIdentifier(ctx, identifier7);
  }
  const member = unwrapPath(callee, ft9.isMemberExpression);
  if (member) {
    return getHookImportDefinitionFromMemberExpression(ctx, member);
  }
  return void 0;
};
var transformCustomCaptureCall = (state, path5) => {
  const callee = path5.get("callee");
  if (!callee.isExpression()) {
    return false;
  }
  const definition = getDefinitionFromExpression(
    state.context,
    callee,
    "million"
  );
  if (!definition || definition.kind !== "named" || definition.name !== "useCapture" && definition.name !== "useCount") {
    return false;
  }
  const args = path5.node.arguments;
  if (args.length !== 1) {
    return false;
  }
  args[1] = state.context.addGlobal(state.key);
  args[2] = ft9.numericLiteral(encode(unwrapLoc(path5.node.loc)));
  args[3] = ft9.numericLiteral(state.index++);
  args[4] = state.mountInfo || state.context.addGlobal(null);
  return true;
};
var getCaptureCallExpression = (ctx, capture, args) => {
  const nullId = ctx.addGlobal(null);
  ctx.options.stats.captures++;
  return ft9.callExpression(capture, [
    args.value ?? nullId,
    ft9.numericLiteral(args.kind),
    ctx.addGlobal(args.key),
    args.loc ? ft9.numericLiteral(args.loc) : nullId,
    args.secondaryLoc ? ft9.numericLiteral(args.secondaryLoc) : nullId,
    args.locs ? ft9.arrayExpression(args.locs.map((loc) => ft9.numericLiteral(loc))) : nullId,
    args.index !== null ? ft9.numericLiteral(args.index) : nullId,
    args.mountInfo || nullId
  ]);
};
var getCaptureProps = (ctx, path5, capture, key, mountInfo, seen, captures) => {
  if (!path5.node.params.length) {
    return [];
  }
  let target = path5.node.params[0];
  const loc = unwrapLoc(target.loc);
  const encodedLoc = encode(loc);
  if (ft9.isAssignmentPattern(target)) {
    target = target.left;
  }
  if (ft9.isIdentifier(target)) {
    const captureProps2 = getCaptureCallExpression(ctx, capture, {
      kind: 2 /* Props */,
      key,
      value: target,
      loc: encodedLoc,
      secondaryLoc: null,
      locs: null,
      index: 0,
      mountInfo
    });
    captures.push({
      loc,
      kind: 2 /* Props */
    });
    seen.add(captureProps2);
    return [
      ft9.expressionStatement(
        ft9.assignmentExpression("=", target, captureProps2)
      )
    ];
  }
  if (ft9.isObjectPattern(target)) {
    if (target.properties.length > 0) {
      const propsID2 = generateUniqueName(path5, "props");
      const captureProps2 = getCaptureCallExpression(ctx, capture, {
        kind: 2 /* Props */,
        key,
        value: propsID2,
        loc: encodedLoc,
        secondaryLoc: null,
        locs: null,
        index: 0,
        mountInfo
      });
      captures.push({
        loc,
        kind: 2 /* Props */
      });
      seen.add(captureProps2);
      path5.node.params[0] = propsID2;
      return [
        ft9.variableDeclaration("let", [
          ft9.variableDeclarator(target, captureProps2)
        ])
      ];
    }
    return [];
  }
  if (ft9.isRestElement(target)) {
    const identifier7 = unwrapNode(target.argument, ft9.isIdentifier);
    if (identifier7) {
      const captureProps2 = getCaptureCallExpression(ctx, capture, {
        kind: 2 /* Props */,
        key,
        value: t.memberExpression(identifier7, ft9.numericLiteral(0), true),
        loc: encodedLoc,
        secondaryLoc: null,
        locs: null,
        index: 0,
        mountInfo
      });
      captures.push({
        loc,
        kind: 2 /* Props */
      });
      seen.add(captureProps2);
      return [t.expressionStatement(captureProps2)];
    }
  }
  const propsID = generateUniqueName(path5, "props");
  const restID = generateUniqueName(path5, "rest");
  const captureProps = getCaptureCallExpression(ctx, capture, {
    kind: 2 /* Props */,
    key,
    value: propsID,
    loc: encodedLoc,
    secondaryLoc: null,
    locs: null,
    index: 0,
    mountInfo
  });
  captures.push({
    loc,
    kind: 2 /* Props */
  });
  seen.add(captureProps);
  const currentParams = path5.node.params;
  path5.node.params = [propsID, ft9.restElement(restID)];
  return [
    ft9.variableDeclaration("let", [
      ft9.variableDeclarator(
        ft9.arrayPattern(currentParams),
        ft9.arrayExpression([captureProps, ft9.spreadElement(restID)])
      )
    ])
  ];
};
var isCurrentlyInJSX = (path5) => {
  let parent = path5.parentPath;
  while (parent) {
    if (parent.isJSXSpreadAttribute()) {
      return false;
    }
    if (parent.isJSXSpreadChild()) {
      return false;
    }
    if (parent.isJSXExpressionContainer()) {
      return false;
    }
    if (parent.isJSXElement()) {
      return true;
    }
    if (parent.isJSXFragment()) {
      return true;
    }
    parent = parent.parentPath;
  }
  return false;
};
var COMPONENT_CAPTURE_TRAVERSE = {
  CallExpression(path5, state) {
    if (state.seen.has(path5.node)) {
      return;
    }
    state.seen.add(path5.node);
    const functionParent = path5.getFunctionParent();
    if (!(functionParent && functionParent === state.parent)) {
      return;
    }
    if (transformCustomCaptureCall(state, path5))
      return;
    const definition = getHookImportDefinition(state.context, path5);
    if (!definition) {
      return;
    }
    const loc = unwrapLoc(path5.node.loc);
    const encodedLoc = encode(loc);
    switch (definition.type) {
      case 1 /* Deps */: {
        if (t.isExpression(path5.node.arguments[0]) && state.type !== "function") {
          const captured = getCaptureCallExpression(
            state.context,
            state.captureID,
            {
              kind: 128 /* Function */,
              key: state.key,
              value: path5.node.arguments[0],
              loc: encodedLoc,
              secondaryLoc: null,
              locs: null,
              index: null,
              mountInfo: state.mountInfo
            }
          );
          state.captures.push({
            loc,
            kind: 128 /* Function */
          });
          path5.node.arguments[0] = captured;
        }
        const targetArgument = path5.node.arguments[definition.argument];
        if (t.isExpression(targetArgument)) {
          let locs = null;
          if (ft9.isArrayExpression(targetArgument)) {
            locs = new Array(targetArgument.elements.length);
            for (let i = 0; i < targetArgument.elements.length; i++) {
              locs[i] = encode(unwrapLoc(targetArgument.elements[i].loc));
            }
          }
          const captured = getCaptureCallExpression(
            state.context,
            state.captureID,
            {
              kind: definition.type,
              key: state.key,
              value: targetArgument,
              loc: encodedLoc,
              secondaryLoc: null,
              locs,
              index: state.index++,
              mountInfo: state.mountInfo
            }
          );
          state.captures.push({
            loc,
            kind: definition.type
          });
          state.seen.add(captured);
          path5.node.arguments[definition.argument] = captured;
        }
        path5.skip();
        break;
      }
      case 4 /* Value */: {
        const locs = [];
        if (state.type === "function")
          break;
        if (definition.import.source !== "react" || definition.import.kind === "named" && /**
         * We capture these to wrap `trackOwner` around, since captureValue is anonymous
         * and doesn't allow "wrapping"
         *
         * TODO make this scalable
         */
        ["useContext", "useSyncExternalStore"].includes(
          definition.import.name
        )) {
          if (!ft9.isV8IntrinsicIdentifier(path5.node.callee)) {
            path5.node.callee = getCaptureCallExpression(
              state.context,
              state.captureID,
              {
                kind: 1024 /* Hooks */,
                key: state.key,
                value: path5.node.callee,
                loc: encodedLoc,
                secondaryLoc: null,
                locs: null,
                index: null,
                mountInfo: state.mountInfo
              }
            );
          }
          if (path5.parentPath.isVariableDeclarator()) {
            const id = path5.parentPath.get("id");
            if (!Array.isArray(id)) {
              if (id.isObjectPattern()) {
                const properties = id.node.properties;
                for (let i = 0, len = properties.length; i < len; i++) {
                  const prop = properties[i];
                  if (ft9.isObjectProperty(prop) && ft9.isIdentifier(prop.key)) {
                    locs.push(encode(unwrapLoc(prop.loc)));
                  }
                }
              }
              if (id.isArrayPattern()) {
                for (let i = 0, len = id.node.elements.length; i < len; i++) {
                  const element = id.node.elements[i];
                  if (!element)
                    continue;
                  if (ft9.isIdentifier(element)) {
                    locs.push(encode(unwrapLoc(element.loc)));
                  }
                }
              }
            }
          }
        }
        const captured = getCaptureCallExpression(
          state.context,
          state.captureID,
          {
            kind: definition.type,
            key: state.key,
            value: path5.node,
            loc: encodedLoc,
            secondaryLoc: null,
            locs: locs.length ? locs : null,
            index: state.index++,
            mountInfo: state.mountInfo
          }
        );
        state.captures.push({
          loc,
          kind: definition.type
        });
        state.seen.add(captured);
        path5.replaceWith(captured)[0].skip();
        break;
      }
    }
  },
  // captureError (ErrorBoundary)
  // ReturnStatement() {
  //   state.path.traverse({
  //     JSXElement(path) {
  //       if (seen.has(path.node)) {
  //         return;
  //       }
  //       seen.add(path.node);
  //       const currentlyInJSX = isCurrentlyInJSX(path);
  //       const captured = getCaptureCallExpression(ctx, capture, {
  //         kind: Compiler.CaptureKind.Error,
  //         key,
  //         value: path.node,
  //         loc,
  //         secondaryLoc: null,
  //         locs: null,
  //         index: index++,
  //         profilerType: null,
  //         mountInfo,
  //       });
  //       seen.add(captured);
  //       // DO NOT SKIP
  //       path.replaceWith(
  //         currentlyInJSX ? t.jsxExpressionContainer(captured) : captured,
  //       );
  //       path.skip();
  //     },
  //   });
  // },
  JSXElement(path5, state) {
    if (state.seen.has(path5.node) || state.context.options.lite) {
      return;
    }
    state.seen.add(path5.node);
    const currentlyInJSX = isCurrentlyInJSX(path5);
    const openingElement = path5.get("openingElement");
    const name = openingElement.get("name");
    const identifier7 = unwrapPath(name, ft9.isJSXIdentifier);
    const loc = unwrapLoc(path5.node.loc);
    const encodedLoc = encode(loc);
    let foundContainerPath = false;
    let containerPath = path5.parentPath;
    let secondaryLoc = null;
    if (foundContainerPath && containerPath) {
      secondaryLoc = encode(unwrapLoc(containerPath.node.loc));
    }
    if (identifier7) {
      if (isCapitalized(identifier7.node.name) && !BANNED_COMPONENTS.includes(identifier7.node.name)) {
        const captured = getCaptureCallExpression(
          state.context,
          state.captureID,
          {
            kind: 16 /* JSX */,
            key: state.key,
            value: path5.node,
            loc: encodedLoc,
            secondaryLoc,
            locs: null,
            // useRef internally
            index: null,
            mountInfo: state.mountInfo
          }
        );
        state.captures.push({
          loc,
          kind: 16 /* JSX */
        });
        state.seen.add(captured);
        path5.replaceWith(
          currentlyInJSX ? ft9.jsxExpressionContainer(captured) : captured
        );
      }
      return;
    }
    const member = unwrapPath(name, ft9.isJSXMemberExpression);
    if (member) {
      const captured = getCaptureCallExpression(
        state.context,
        state.captureID,
        {
          kind: 16 /* JSX */,
          key: state.key,
          value: path5.node,
          loc: encodedLoc,
          secondaryLoc,
          locs: null,
          index: state.index++,
          mountInfo: state.mountInfo
        }
      );
      state.captures.push({
        loc,
        kind: 16 /* JSX */
      });
      state.seen.add(captured);
      path5.replaceWith(
        currentlyInJSX ? ft9.jsxExpressionContainer(captured) : captured
      );
    }
  },
  JSXAttribute(path5, state) {
    if (state.seen.has(path5.node)) {
      return;
    }
    const jsxId = path5.node.name;
    if (!ft9.isJSXIdentifier(jsxId))
      return;
    if (!jsxId.name.startsWith("on"))
      return;
    if (!ft9.isJSXExpressionContainer(path5.node.value))
      return;
    if (ft9.isJSXEmptyExpression(path5.node.value.expression))
      return;
    const elementId = unwrapPath(
      path5.parentPath.get("name"),
      ft9.isJSXIdentifier
    );
    if (!elementId)
      return;
    if (isCapitalized(elementId.node.name))
      return;
    state.seen.add(path5.node);
    const expressionContainer = path5.get(
      "value.expression"
    );
    const loc = unwrapLoc(expressionContainer.node.loc);
    const encodedLoc = encode(loc);
    const captured = getCaptureCallExpression(state.context, state.captureID, {
      kind: 128 /* Function */,
      key: state.key,
      value: path5.node.value.expression,
      loc: encodedLoc,
      secondaryLoc: null,
      locs: null,
      index: null,
      mountInfo: state.mountInfo
    });
    state.captures.push({
      loc,
      kind: 128 /* Function */
    });
    state.seen.add(captured);
    path5.node.value.expression = captured;
    path5.skip();
  }
};
var transformComponent = (ctx, path5, type) => {
  var _a;
  const componentName = getDescriptiveName(path5);
  if (!componentName || BANNED_COMPONENTS.includes(componentName) || // FIXME: Hack to ignore react-router-dom
  componentName.includes("Route") || ft9.isBlockStatement(path5.node.body) && ((_a = path5.node.body.directives) == null ? void 0 : _a.some(
    (c) => ft9.isDirectiveLiteral(c.value) && c.value.value.includes(ANYA_IGNORE)
  ))) {
    return;
  }
  const seen = /* @__PURE__ */ new Set();
  const captureID = getImportIdentifier(ctx, path5, ANYA_CAPTURE);
  ctx.options.stats.components++;
  const captures = [];
  const encodedFilename = encode(ctx.options.filename);
  const encodedComponentName = encode(componentName);
  const key = `${encodedFilename}.${encodedComponentName}`;
  ctx.componentKeys[componentName] = key;
  const loc = unwrapLoc(path5.node.loc);
  const encodedLoc = encode(loc);
  let mountInfo = null;
  if (type !== "function") {
    const componentNameId = ft9.identifier(componentName);
    mountInfo = generateUniqueName(path5, "_$");
    const captureMount = getCaptureCallExpression(ctx, captureID, {
      kind: 512 /* Baseline */,
      key,
      value: componentNameId,
      loc: encodedLoc,
      secondaryLoc: null,
      locs: null,
      index: null,
      mountInfo: null
    });
    captures.push({
      loc,
      kind: 512 /* Baseline */
    });
    seen.add(captureMount);
    const replacements = [
      ft9.variableDeclaration("let", [
        ft9.variableDeclarator(mountInfo, captureMount)
      ])
    ];
    if (type === "component") {
      replacements.push(
        ...getCaptureProps(
          ctx,
          path5,
          captureID,
          key,
          mountInfo,
          seen,
          captures
        )
      );
    }
    if (isPathValid(path5, ft9.isArrowFunctionExpression)) {
      const body = path5.get("body");
      if (isPathValid(body, t.isExpression)) {
        body.replaceWith(
          ft9.blockStatement([...replacements, ft9.returnStatement(body.node)])
        );
      } else if (isPathValid(body, ft9.isBlockStatement)) {
        body.unshiftContainer("body", replacements);
      }
    } else if (isPathValid(path5, ft9.isFunctionExpression) || isPathValid(path5, ft9.isFunctionDeclaration)) {
      path5.get("body").unshiftContainer("body", replacements);
    }
  }
  const componentCaptureState = {
    type,
    parent: path5,
    context: ctx,
    seen,
    key,
    index: 1,
    mountInfo,
    captures,
    captureID
  };
  path5.traverse(COMPONENT_CAPTURE_TRAVERSE, componentCaptureState);
  registerMetadata(
    ctx,
    path5,
    key,
    componentCaptureState.index,
    componentName,
    true,
    captures
  );
};

// compiler/src/core/presets.ts
init_esm_shims();
var createPreset = (preset) => {
  return preset;
};
var PRESETS = {
  react: createPreset({
    filters: {
      component: {
        source: "^[A-Z]",
        flags: ""
      },
      hook: {
        source: "^use[A-Z]",
        flags: ""
      }
    },
    imports: {
      React: void 0,
      hooks: [
        // React hooks
        {
          type: 1 /* Deps */,
          import: {
            kind: "named",
            source: "react",
            name: "useEffect"
          },
          argument: 1
        },
        {
          type: 1 /* Deps */,
          import: {
            kind: "named",
            source: "react",
            name: "useLayoutEffect"
          },
          argument: 1
        },
        {
          type: 1 /* Deps */,
          import: {
            kind: "named",
            source: "react",
            name: "useMemo"
          },
          argument: 1
        },
        {
          type: 1 /* Deps */,
          import: {
            kind: "named",
            source: "react",
            name: "useCallback"
          },
          argument: 1
        },
        {
          type: 1 /* Deps */,
          import: {
            kind: "named",
            source: "react",
            name: "useInsertionEffect"
          },
          argument: 1
        },
        {
          type: 4 /* Value */,
          import: {
            kind: "named",
            source: "react",
            name: "useState"
          }
        },
        {
          type: 4 /* Value */,
          import: {
            kind: "named",
            source: "react",
            name: "useReducer"
          }
        },
        {
          type: 4 /* Value */,
          import: {
            kind: "named",
            source: "react",
            name: "useContext"
          }
        }
      ],
      hocs: [
        {
          name: "forwardRef",
          source: "react",
          kind: "named"
        },
        {
          name: "memo",
          source: "react",
          kind: "named"
        }
      ],
      million: [
        {
          name: "init",
          source: "@million/lint/runtime",
          kind: "named"
        },
        {
          name: "useCapture",
          source: "@million/lint/runtime",
          kind: "named"
        },
        {
          name: "useCount",
          source: "@million/lint/runtime",
          kind: "named"
        },
        {
          name: "init",
          source: "@million/lint/runtime-dev",
          kind: "named"
        },
        {
          name: "useCapture",
          source: "@million/lint/runtime-dev",
          kind: "named"
        },
        {
          name: "useCount",
          source: "@million/lint/runtime-dev",
          kind: "named"
        }
      ],
      classes: [
        {
          name: "Component",
          source: "react",
          kind: "named"
        },
        {
          name: "PureComponent",
          source: "react",
          kind: "named"
        }
      ],
      hookExports: [
        {
          kind: "named",
          source: "react",
          name: "useState"
        },
        {
          kind: "named",
          source: "react",
          name: "useMemo"
        },
        {
          kind: "named",
          source: "react",
          name: "useEffect"
        },
        {
          kind: "named",
          source: "react",
          name: "useLayoutEffect"
        },
        {
          kind: "named",
          source: "react",
          name: "useInsertionEffect"
        },
        {
          kind: "named",
          source: "react",
          name: "useContext"
        },
        {
          kind: "named",
          source: "react",
          name: "useReducer"
        },
        {
          kind: "named",
          source: "react",
          name: "useCallback"
        }
        // TODO add more hooks
      ]
    }
  })
};

// compiler/src/core/ssa.ts
init_esm_shims();
import * as t2 from "@babel/types";
import * as ft10 from "faster-babel-types";
var ENABLE_SSA = false;
function isInValidExpression(path5) {
  let current = path5.parentPath;
  let prev = path5;
  while (current) {
    if (isPathValid(current, t2.isTSType)) {
      return false;
    }
    if (isPathValid(current, t2.isConditionalExpression) && (current.get("consequent").node === prev.node || current.get("alternate").node === prev.node)) {
      return false;
    }
    if (isPathValid(current, t2.isLogicalExpression) && current.get("right").node === prev.node) {
      return false;
    }
    prev = current;
    current = current.parentPath;
  }
  return true;
}
function inlineExpression(path5) {
  if (isPathValid(path5, ft10.isIdentifier)) {
    const binding = path5.scope.getBinding(path5.node.name);
    if (!binding) {
      return;
    }
    const total = binding.references + binding.constantViolations.length;
    if (total !== 1) {
      return;
    }
    switch (binding.kind) {
      case "const":
      case "let":
      case "var": {
        const ref = binding.referencePaths[0];
        if (isInValidExpression(ref) && isPathValid(binding.path, ft10.isVariableDeclarator) && binding.path.node.init && isPathValid(binding.path.get("id"), ft10.isIdentifier) && binding.path.scope.getBlockParent() === ref.scope.getBlockParent()) {
          ref.replaceWith(binding.path.node.init);
          binding.path.remove();
        }
        break;
      }
      case "hoisted":
      case "local":
      case "module":
      case "param":
      case "unknown":
        break;
    }
  }
}
var SSA_TRAVERSE = {
  Expression(path5, state) {
    if (state.parent === path5.getFunctionParent()) {
      inlineExpression(path5);
    }
  }
};
function performSSA(path5) {
  path5.traverse(SSA_TRAVERSE, { parent: path5 });
  path5.scope.crawl();
}

// compiler/src/core/state-context.ts
init_esm_shims();
function createStateContextRegistration() {
  return {
    React: void 0,
    hooks: {
      identifiers: /* @__PURE__ */ new Map(),
      namespaces: /* @__PURE__ */ new Map()
    },
    hocs: {
      identifiers: /* @__PURE__ */ new Map(),
      namespaces: /* @__PURE__ */ new Map()
    },
    million: {
      identifiers: /* @__PURE__ */ new Map(),
      namespaces: /* @__PURE__ */ new Map()
    },
    classes: {
      identifiers: /* @__PURE__ */ new Map(),
      namespaces: /* @__PURE__ */ new Map()
    },
    hookExports: {
      identifiers: /* @__PURE__ */ new Map(),
      namespaces: /* @__PURE__ */ new Map()
    }
  };
}
var StateContext = class {
  constructor(programPath, preset, options) {
    this.programPath = programPath;
    this.preset = preset;
    this.options = options;
    this.imports = /* @__PURE__ */ new Map();
    this.registrations = createStateContextRegistration();
    this.queue = [];
    this.componentKeys = /* @__PURE__ */ Object.create(null);
    this.globals = /* @__PURE__ */ new Map();
    this.externals = [];
    this.filters = {
      component: new RegExp(
        preset.filters.component.source,
        preset.filters.component.flags
      ),
      hook: preset.filters.hook ? new RegExp(preset.filters.hook.source, preset.filters.hook.flags) : void 0
    };
  }
  addGlobal(value) {
    if (this.globals.has(value))
      return this.globals.get(value);
    const id = generateUniqueName(this.programPath, "");
    this.globals.set(value, id);
    return id;
  }
};

// compiler/src/core/plugin.ts
var registerHookSpecifiers = (ctx, path5, hook) => {
  let specifier;
  for (let i = 0, len = path5.node.specifiers.length; i < len; i++) {
    specifier = path5.node.specifiers[i];
    switch (specifier.type) {
      case "ImportDefaultSpecifier": {
        if (hook.import.kind === "default") {
          ctx.registrations.hooks.identifiers.set(specifier.local, hook);
        }
        break;
      }
      case "ImportNamespaceSpecifier": {
        let current = ctx.registrations.hooks.namespaces.get(specifier.local);
        if (!current) {
          current = [];
        }
        current.push(hook);
        ctx.registrations.hooks.namespaces.set(specifier.local, current);
        break;
      }
      case "ImportSpecifier": {
        if (hook.import.kind === "named" && getImportSpecifierName(specifier) === hook.import.name || hook.import.kind === "default" && getImportSpecifierName(specifier) === "default") {
          ctx.registrations.hooks.identifiers.set(specifier.local, hook);
        }
        break;
      }
    }
  }
};
var registerSpecifiers = (ctx, path5, hoc, registration) => {
  let specifier;
  for (let i = 0, len = path5.node.specifiers.length; i < len; i++) {
    specifier = path5.node.specifiers[i];
    switch (specifier.type) {
      case "ImportDefaultSpecifier": {
        if (hoc.kind === "default") {
          ctx.registrations[registration].identifiers.set(specifier.local, hoc);
        }
        break;
      }
      case "ImportNamespaceSpecifier": {
        let current = ctx.registrations[registration].namespaces.get(
          specifier.local
        );
        if (!current) {
          current = [];
        }
        current.push(hoc);
        ctx.registrations[registration].namespaces.set(
          specifier.local,
          current
        );
        break;
      }
      case "ImportSpecifier": {
        if (hoc.kind === "named" && getImportSpecifierName(specifier) === hoc.name || hoc.kind === "default" && getImportSpecifierName(specifier) === "default") {
          ctx.registrations[registration].identifiers.set(specifier.local, hoc);
        }
        break;
      }
    }
  }
};
var extractImportIdentifiers = (ctx, path5) => {
  const mod = path5.node.source.value;
  if (mod.includes("@million/lint/runtime") && mod !== getRuntimeSource()) {
    path5.node.source.value = getRuntimeSource();
  }
  const { imports } = ctx.preset;
  const specifiers = path5.node.specifiers;
  if (mod === "react") {
    for (let i = 0, len = specifiers.length; i < len; i++) {
      const specifier = specifiers[i];
      if (specifier.type === "ImportDefaultSpecifier") {
        ctx.registrations.React = {
          local: specifier.local.name,
          kind: "default",
          source: mod
        };
      }
    }
  }
  let hook;
  for (let i = 0, len = imports.hooks.length; i < len; i++) {
    hook = imports.hooks[i];
    if (mod === hook.import.source) {
      registerHookSpecifiers(ctx, path5, hook);
    }
  }
  let hoc;
  for (let i = 0, len = imports.hocs.length; i < len; i++) {
    hoc = imports.hocs[i];
    if (mod === hoc.source) {
      registerSpecifiers(ctx, path5, hoc, "hocs");
    }
  }
  let million;
  for (let i = 0, len = imports.million.length; i < len; i++) {
    million = imports.million[i];
    if (mod === million.source) {
      registerSpecifiers(ctx, path5, million, "million");
    }
  }
  let currentClass;
  for (let i = 0, len = imports.classes.length; i < len; i++) {
    currentClass = imports.classes[i];
    if (mod === currentClass.source) {
      registerSpecifiers(ctx, path5, currentClass, "classes");
    }
  }
  let currentHookExports;
  for (let i = 0, len = imports.hookExports.length; i < len; i++) {
    currentHookExports = imports.hookExports[i];
    if (mod === currentHookExports.source) {
      registerSpecifiers(ctx, path5, currentHookExports, "hookExports");
    }
  }
};
var transformFunction = (ctx, path5, type) => {
  const unwrapped = unwrapPath(path5, isComponent);
  if (unwrapped && type) {
    if (unwrapped.node.async || unwrapped.node.generator) {
      return;
    }
    if (ENABLE_SSA) {
      performSSA(path5);
    }
    transformComponent(ctx, unwrapped, type);
  }
};
var transformInit = (ctx, path5) => {
  var _a;
  const definition = getDefinitionFromCallee(ctx, path5, "million");
  if (definition && definition.kind === "named" && definition.name === "init") {
    const prevObjectProperties = ft11.isObjectExpression(path5.node.arguments[0]) ? path5.node.arguments[0].properties : [];
    const prodUrl = `${((_a = ctx.options.production) == null ? void 0 : _a.url) ?? "https://lint.million.dev"}/api/v1/ingest/ingest`;
    path5.node.arguments[0] = ft11.objectExpression([
      ...prevObjectProperties,
      ft11.objectProperty(
        ft11.identifier("url"),
        // TEMPORARY DISABLED
        // ctx.options.framework === "next" &&
        //   process.env.NODE_ENV === "production" &&
        //   !ctx.options.production?.flags?.disableNextRewrites
        //   ? t.stringLiteral("/__anya") // Proxied endpoint
        //   :
        ft11.stringLiteral(env.IS_PRODUCTION ? prodUrl : getDevUrl(ctx.options))
      ),
      ft11.objectProperty(
        ft11.identifier("buildId"),
        ft11.stringLiteral(store.buildId ?? "dev")
      ),
      // Build Id -> Uniquely generated everytime the build is run
      ft11.objectProperty(
        ft11.identifier("commitHash"),
        ft11.stringLiteral(store.commitHash ?? "dev")
      ),
      // Commit Hash -> The commit hash of the current git branch
      ft11.objectProperty(
        ft11.identifier("apiKey"),
        ft11.stringLiteral(store.apiKey ?? "")
        // API Key -> The API key for the current project
      )
    ]);
  }
};
var transformHOC = (ctx, path5) => {
  if (path5.node.arguments.length === 0) {
    return;
  }
  const definition = getDefinitionFromCallee(ctx, path5, "hocs");
  if (definition) {
    const argument = path5.get("arguments")[0];
    const unwrapped = unwrapPath(argument, isComponent);
    if (!unwrapped) {
      return;
    }
    if (ft11.isArrowFunctionExpression(unwrapped.node) || !unwrapped.node.id) {
      transformFunction(ctx, unwrapped, "component");
    }
  }
};
var VARIABLE_DECLARATOR_TRANSFORM = {
  Identifier(path5, state) {
    const key = state.context.componentKeys[path5.node.name];
    if (key) {
      registerMetadata(
        state.context,
        state.path,
        key,
        -1,
        state.id.name,
        false
      );
      path5.stop();
    }
  }
};
var transformVariableDeclarator = (ctx, path5) => {
  if (path5.node.init && ft11.isIdentifier(path5.node.id)) {
    const unwrapped = unwrapPath(path5.get("init"), isComponent);
    if (!unwrapped) {
      return;
    }
    const type = getTypeFromComponentName(ctx, unwrapped, path5.node.id);
    if (!type) {
      return;
    }
    if (ft11.isArrowFunctionExpression(unwrapped.node) || !unwrapped.node.id) {
      transformFunction(ctx, unwrapped, type);
      path5.get("init").traverse(VARIABLE_DECLARATOR_TRANSFORM, {
        id: path5.node.id,
        context: ctx,
        path: path5
      });
    }
  }
};
var IMPORT_IDENTIFIER_TRAVERSE = {
  ImportDeclaration(path5, state) {
    extractImportIdentifiers(state, path5);
  }
};
var PROGRAM_TRAVERSE = {
  CallExpression(path5, state) {
    var _a;
    if ((_a = state.options.production) == null ? void 0 : _a.enabled) {
      transformInit(state, path5);
    }
    transformHOC(state, path5);
  },
  FunctionDeclaration(path5, state) {
    transformFunction(state, path5, getComponentType(state, path5));
  },
  FunctionExpression(path5, state) {
    transformFunction(state, path5, getComponentType(state, path5));
  },
  VariableDeclarator(path5, state) {
    transformVariableDeclarator(state, path5);
  }
  // ClassExpression(path) {
  //   transformClassComponent(ctx, path);
  // },
  // ClassDeclaration(path) {
  //   transformClassComponent(ctx, path);
  // },
};
var EXTERNALS_TRAVERSE = {
  ImportDeclaration(path5, state) {
    if (!path5.node.loc)
      return;
    state.externals.push({
      kind: "import",
      loc: unwrapLoc(path5.node.loc)
    });
  },
  ExportDeclaration(path5, state) {
    if (!path5.node.loc)
      return;
    state.externals.push({
      kind: "export",
      loc: unwrapLoc(path5.node.loc)
    });
  }
};
var PLUGIN = {
  name: "anya",
  visitor: {
    Program(programPath, state) {
      var _a, _b;
      const comments = programPath.node.leadingComments;
      if (comments) {
        for (let i = 0, len = comments.length; i < len; i++) {
          if (comments[i].value === ANYA_IGNORE) {
            return;
          }
        }
      }
      let hasUseClientDirective = false;
      for (let i = 0, len = (_a = programPath.node.directives) == null ? void 0 : _a.length; i < len; i++) {
        const directive = programPath.node.directives[i];
        const directiveValue = directive.value.value;
        if (directiveValue === "use server") {
          state.opts.rsc = true;
          return;
        }
        if (directiveValue === "use client") {
          hasUseClientDirective = true;
          break;
        }
      }
      const preset = ((_b = state.opts.PRESETS) == null ? void 0 : _b.react) || PRESETS.react;
      const ctx = new StateContext(programPath, preset, state.opts);
      programPath.traverse(IMPORT_IDENTIFIER_TRAVERSE, ctx);
      if (state.opts.rsc && !hasUseClientDirective && !ctx.registrations.hooks.identifiers.size && !ctx.registrations.hocs.identifiers.size) {
        return;
      }
      programPath.traverse(EXTERNALS_TRAVERSE, ctx);
      programPath.traverse(PROGRAM_TRAVERSE, ctx);
      if (ctx.queue.length) {
        for (let i = 0, len = ctx.queue.length; i < len; i++) {
          registerMetadataQueue(ctx.queue[i]);
        }
      }
      if (ctx.globals.size) {
        const declarators = new Array(ctx.globals.size);
        let i = 0;
        for (const [value, id] of ctx.globals) {
          declarators[i] = ft11.variableDeclarator(
            id,
            typeof value === "string" ? ft11.stringLiteral(value) : typeof value === "number" ? ft11.numericLiteral(value) : ft11.nullLiteral()
          );
          i++;
        }
        programPath.unshiftContainer(
          "body",
          ft11.variableDeclaration("let", declarators)
        );
      }
    }
  }
};
var captureBabelPlugin = () => {
  return PLUGIN;
};

// compiler/src/core/compile.ts
var compile = async (id, code, options, map) => {
  var _a;
  const parserPlugins = [
    // import { example } from 'example' with { example: true };
    [
      "importAttributes",
      {
        deprecatedAssertSyntax: false
      }
    ],
    // () => throw example
    "throwExpressions",
    // You know what this is
    "decorators",
    // const { #example: example } = this;
    "destructuringPrivate",
    // using example = myExample()
    "explicitResourceManagement",
    // import.meta
    "importMeta",
    "jsx"
  ];
  const buildPlugins = [];
  const overridePlugins = (_a = options.babel) == null ? void 0 : _a.plugins;
  if (overridePlugins) {
    for (let i = 0, len = overridePlugins.length; i < len; i++) {
      const plugin = overridePlugins[i];
      buildPlugins.unshift(plugin);
    }
  }
  buildPlugins.push([captureBabelPlugin, options]);
  const isJSXLike = /\.[mc]?[jt]sx?$/i.test(id);
  if (isJSXLike) {
    parserPlugins.unshift("jsx");
  }
  const isTSX = isJSXLike && /\.[mc]?tsx?$/i.test(id);
  if (isTSX) {
    parserPlugins.push("typescript");
  } else {
    buildPlugins.unshift(hermesParser);
  }
  const result = await transformAsync(code, {
    plugins: buildPlugins,
    ignore: [/\/(?<c>build|node_modules)\//],
    parserOpts: { plugins: parserPlugins },
    cloneInputAst: false,
    filename: id,
    ast: false,
    highlightCode: false,
    // retainLines: true, // DO NOT ENABLE THIS
    sourceFileName: id,
    sourceMaps: true,
    configFile: false,
    babelrc: false,
    inputSourceMap: map
  });
  return result ? { code: result.code || "", map: result.map } : null;
};

// compiler/src/server/index.ts
init_esm_shims();
import { serve } from "@hono/node-server";

// compiler/src/server/apm.ts
init_esm_shims();
var init2 = async (url, apiKey) => {
  var _a, _b;
  if (!env.IS_APM)
    return;
  store.url = url ?? "";
  store.apiKey = apiKey ?? "";
  (_a = store).buildId ?? (_a.buildId = getBuildId());
  (_b = store).commitHash ?? (_b.commitHash = getCommitHash());
  displayProductionIntro(store.buildId, store.commitHash, store.apiKey);
  void saveLog("log", {
    url,
    origin: "APM initialized",
    metadata: {
      url,
      apiKey,
      buildId: store.buildId,
      commitHash: store.commitHash
    }
  });
};
var reportCompiler = async () => {
  if (!env.IS_APM)
    return;
  const url = store.url;
  if (!url) {
    return;
  }
  const payload = store.get();
  const { default: ciInfo } = await import("ci-info");
  let version = "unknown";
  try {
    version = require_package().version;
  } catch (e) {
  }
  let react = "unknown";
  try {
    react = __require("react/package.json").version;
  } catch (e) {
  }
  payload.metadata = {
    ci: ciInfo.name ?? "unknown",
    version,
    react,
    commitHash: store.commitHash,
    buildId: store.buildId,
    url: store.url
  };
  const response = await fetch(`${url}/api/v1/ingest/compiler`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": store.apiKey,
      "X-BUILD-ID": store.buildId,
      "X-COMMIT-HASH": store.commitHash
    },
    body: JSON.stringify(payload)
  });
  void saveLog("log", {
    url,
    origin: "APM reported compiler",
    status: response.status,
    metadata: payload.metadata
  });
};

// compiler/src/server/ingest.ts
init_esm_shims();
import { Hono } from "hono";
import { cors } from "hono/cors";
import { hash } from "ohash";

// compiler/src/server/middleware/decompress.ts
init_esm_shims();
import { ungzip } from "pako";
var ENCODING_TYPES = ["gzip", "deflate", "snappy"];
var decompress = () => {
  return async function decompress2(ctx, next) {
    const content = ctx.req.header("Content-Encoding") ?? (ctx.req.query("z") ? "gzip" : void 0);
    const encoding = ENCODING_TYPES.find(
      (encoding2) => content == null ? void 0 : content.includes(encoding2)
    );
    if (!encoding)
      return next();
    let rawBodyString;
    if (encoding === "gzip") {
      const buffer = await ctx.req.arrayBuffer();
      rawBodyString = ungzip(buffer, { to: "string" });
    }
    if (rawBodyString) {
      try {
        ctx.req.bodyCache.json = JSON.parse(rawBodyString);
        ctx.req.bodyCache.text = rawBodyString;
      } catch (e) {
        console.error(e);
        return ctx.json({ ok: false });
      }
    }
    await next();
  };
};

// compiler/src/server/validate.ts
init_esm_shims();
var pathSeparators = [".", "/", "\\"];
var validateKey = (key) => {
  const [encodedFilename, encodedComponentName] = key.split(".");
  if (isNaN(encodedFilename) || isNaN(encodedComponentName))
    return false;
  const filename = store.encodings.get(Number(encodedFilename));
  const componentName = store.encodings.get(Number(encodedComponentName));
  if (typeof filename !== "string" || !pathSeparators.some((sep) => filename.includes(sep))) {
    return false;
  }
  return typeof componentName === "string";
};
var validateLoc = (encodedLoc) => {
  if (isNaN(encodedLoc))
    return false;
  const loc = store.encodings.get(Number(encodedLoc));
  if (!loc)
    return false;
  return Array.isArray(loc);
};
var validateRuntimePayload = (body) => {
  const seenKeys = /* @__PURE__ */ new Map();
  const seenLocs = /* @__PURE__ */ new Map();
  for (let i = 0, len = body.components.length; i < len; i++) {
    const component = body.components[i];
    const result = seenKeys.get(component.k) || validateKey(component.k);
    seenKeys.set(component.k, result);
    if (!result)
      return false;
  }
  for (let i = 0, len = body.batch.length; i < len; i++) {
    const renderItem = body.batch[i];
    const render = renderItem.r;
    const encodedLoc = render.l;
    const locResult = seenLocs.get(encodedLoc) || validateLoc(encodedLoc);
    seenLocs.set(encodedLoc, locResult);
    if (!locResult)
      return false;
    const encodedSecondaryLoc = render.l2;
    if (encodedSecondaryLoc) {
      const secondaryLocResult = seenLocs.get(encodedSecondaryLoc) || validateLoc(encodedSecondaryLoc);
      seenLocs.set(encodedSecondaryLoc, secondaryLocResult);
      if (!secondaryLocResult)
        return false;
    }
    const encodedLocs = render.ls;
    if (encodedLocs) {
      for (let i2 = 0, len2 = encodedLocs.length; i2 < len2; i2++) {
        const locResult2 = seenLocs.get(encodedLocs[i2]) || validateLoc(encodedLocs[i2]);
        seenLocs.set(encodedLocs[i2], locResult2);
        if (!locResult2)
          return false;
      }
    }
    const owner = render.o;
    const self2 = render.i;
    if (owner) {
      const result = seenKeys.get(owner) || validateKey(owner);
      seenKeys.set(owner, result);
      if (!result)
        return false;
    }
    if (self2) {
      const result = seenKeys.get(self2) || validateKey(self2);
      seenKeys.set(self2, result);
      if (!result)
        return false;
    }
  }
  return true;
};

// compiler/src/server/ingest.ts
var ingestServer = new Hono();
ingestServer.use(cors()).use(decompress()).post("/ingest", async (c) => {
  const body = await c.req.json();
  if (!body)
    return c.json({ status: "Body invalid. Please try again!" });
  if (store.sessionId)
    return c.json({ status: "Using Sessions" });
  if (process.env.NODE_ENV !== "production") {
    if (!process.env.IS_APM) {
      if (body.compilerInstanceId !== hash(process.cwd())) {
        c.json({ status: "Invalid project for active compiler server" });
      }
    }
  }
  if (!validateRuntimePayload(body)) {
    c.json({ status: "Body failed validation" });
  }
  await report({
    runtime: body,
    compiler: store.get()
  });
  return c.json({ ok: true });
}).get("/ingest/reset", async (c) => {
  void reset2();
  return c.json({ ok: true });
}).get("/ingest/healthcheck", async (c) => {
  const sessions = [];
  for await (const session of getPossibleConnections()) {
    sessions.push(session);
  }
  return c.json({ ok: sessions.length, sessions, problems: store.problems });
}).get("/version", async (c) => {
  for await (const { port, host } of getSessions()) {
    const json = await fetch(`http://${host}:${port}/version`, {
      method: "GET"
    }).then(async (r) => {
      const versionJson = await r.json().catch(null);
      if (versionJson) {
        return versionJson;
      }
    }).catch(() => null);
    if (json) {
      return c.json(json);
    }
  }
  return c.json(null);
}).get("/data", (c) => {
  return c.json(store.get());
}).get("/test-connection", async (c) => {
  const sessions = [];
  const connections = [];
  for await (const connection of getPossibleConnections()) {
    connections.push(connection);
  }
  for await (const session of getSessions()) {
    sessions.push(session);
  }
  return c.json({ sessions, connections });
}).all("*", (c) => c.text(c.req.url));

// compiler/src/server/ws.ts
init_esm_shims();

// ../shared/util/helpers.ts
init_esm_shims();
function devInvariant(value, message, prodMessage) {
  if (value) {
    return;
  }
  if (process.env.NODE_ENV !== "production") {
    throw new Error(message);
  }
  if (prodMessage) {
    console.error(message);
  }
}

// compiler/src/server/ws.ts
import { Server } from "socket.io";
import { io } from "socket.io-client";
import { hash as hash2 } from "ohash";
var pendingWork = { current: [] };
var createWsConnection = async (host, port, query) => {
  return new Promise((res, rej) => {
    const socket = io(`http://${host}:${port}`, {
      path: "/ws",
      query: {
        cwd: process.cwd(),
        ...query
      },
      transports: ["websocket"]
    });
    socket.io.once("open", () => {
      res(socket);
    });
    socket.io.once("close", () => {
      rej(new Error("closed"));
    });
    socket.io.once("reconnect_failed", () => {
      rej(new Error("reconnect_failed"));
    });
    socket.io.once("reconnect_error", () => {
      rej(new Error("reconnect_error"));
      socket.disconnect();
    });
  });
};
var socketState = /* @__PURE__ */ new Map();
var sessionsAsPromise = async () => {
  const sessions = [];
  for await (const session of getSessions()) {
    if (!sessions.some((s) => s.port === session.port)) {
      sessions.push(session);
    }
  }
  return sessions;
};
var timer = null;
var injectWebSocket = (server2) => {
  const ioServer = new Server(server2, {
    path: "/ws",
    serveClient: false,
    cors: {
      origin: "*",
      // narrow later
      methods: ["GET", "POST"]
    },
    pingInterval: 2e3,
    pingTimeout: 2e3,
    transports: ["websocket"]
  });
  ioServer.use(async (socket, next) => {
    await Promise.all(pendingWork.current);
    socket.handshake.query.serverid = hash2(process.cwd());
    const socketStateValue = { extensionSockets: [] };
    socketState.set(socket.id, socketStateValue);
    await connectToExtensionSocket(socket);
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(async () => {
      await Promise.all(pendingWork.current);
      const asyncWork = connectToExtensionSocket(socket);
      if (!pendingWork.current) {
        pendingWork.current = [];
      }
      pendingWork.current.push(asyncWork);
      void asyncWork.then(() => {
        var _a;
        pendingWork.current = ((_a = pendingWork.current) == null ? void 0 : _a.filter((work) => work !== asyncWork)) ?? [];
      });
    }, 1500);
    next();
  });
  async function connectToExtensionSocket(runtimeSocket) {
    const sessions = await sessionsAsPromise();
    await Promise.all(
      sessions.map(async (iterSession) => {
        const state = socketState.get(runtimeSocket.id);
        devInvariant(
          state,
          "must have state before connecting to extension sockets"
        );
        const existingSocket = state.extensionSockets.find(
          ({ session }) => session.port === iterSession.port
          // host does not uniquely idenitfy socket
        );
        if (existingSocket) {
          if (existingSocket.socket.disconnected) {
            state.extensionSockets = state.extensionSockets.filter(
              ({ socket }) => socket !== existingSocket.socket
            );
          }
          return null;
        }
        const newExtensionSocket = await createWsConnection(
          iterSession.host,
          iterSession.port,
          {
            tabId: runtimeSocket.handshake.query.tabId
          }
        ).catch(() => {
          return null;
        });
        if (!newExtensionSocket) {
          return null;
        }
        newExtensionSocket.on("message", (data) => {
          runtimeSocket.send(data);
        });
        newExtensionSocket.on("disconnect", () => {
          state.extensionSockets = state.extensionSockets.filter(
            ({ socket }) => socket === newExtensionSocket
          );
        });
        state.extensionSockets.push({
          session: iterSession,
          socket: newExtensionSocket
        });
      })
    );
  }
  ioServer.on("connection", async (runtimeSocket) => {
    if (pendingWork.current.length) {
      await Promise.all(pendingWork.current);
    }
    const supportsWs = await new Promise((res) => {
      const supportsWsInterval = setInterval(async () => {
        const supportsWs2 = await getSupportsWs();
        switch (supportsWs2.kind) {
          case "no-extensions": {
            return;
          }
          case "requested":
          case "responded": {
            clearInterval(supportsWsInterval);
            res(supportsWs2.support);
          }
        }
      }, 1e3);
    });
    const ackId = crypto.randomUUID();
    runtimeSocket.emit(
      "supports-ws",
      JSON.stringify({ support: supportsWs, ackId })
    );
    await new Promise((res) => {
      runtimeSocket.on("supports-ws-ack", (data) => {
        const message = JSON.parse(data);
        if (message.ackId === ackId) {
          res(null);
        }
      });
    });
    runtimeSocket.emit("serverInfo", hash2(process.cwd()));
    runtimeSocket.on("message", async (data) => {
      devInvariant(typeof data === "string", "must be a string");
      const state = socketState.get(runtimeSocket.id);
      devInvariant(state, "must have state by time of message");
      const message = JSON.parse(data);
      state.extensionSockets.forEach(({ socket }) => {
        if (message.kind === "runtime-tree-updates" || message.kind === "window-focus") {
          socket.send({
            encodings: store.get().encodings ?? [],
            ...message
          });
          return;
        }
        socket.send(JSON.parse(data));
      });
    });
    runtimeSocket.on("disconnect", () => {
      const state = socketState.get(runtimeSocket.id);
      devInvariant(state, "must have state by time of disconnection");
      if (timer) {
        clearInterval(timer);
      }
      state.extensionSockets.forEach(({ socket }) => {
        socket.disconnect();
      });
      state.extensionSockets.length = 0;
    });
  });
};
var getSupportsWs = async () => {
  let count = 0;
  for await (const { port, host } of getSessions()) {
    count++;
    const json = await fetch(`http://${host}:${port}/version`, {
      method: "GET"
    }).then(async (r) => {
      const versionJson = await r.json().catch(null);
      if (versionJson) {
        return versionJson;
      }
    }).catch(() => null);
    if (json) {
      const version = json.version;
      const WS_CUTOFF = "1.0.14";
      return {
        kind: "responded",
        support: compareSemver(version, WS_CUTOFF) !== -1
      };
    }
  }
  return count > 0 ? { kind: "requested", support: false } : { kind: "no-extensions" };
};
var compareSemver = (version1, version2) => {
  const v1 = version1.split(".").map(Number);
  const v2 = version2.split(".").map(Number);
  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = i < v1.length ? v1[i] : 0;
    const num2 = i < v2.length ? v2[i] : 0;
    if (num1 < num2) {
      return -1;
    }
    if (num1 > num2) {
      return 1;
    }
  }
  return 0;
};

// compiler/src/server/index.ts
var INITIAL_PORT = 42423;
var server;
var maxNumberOfMillionServers = 32;
var alreadyNotified = false;
var initServer;
var createBuildInstance = (options) => {
  var _a;
  const stats = {
    components: 0,
    captures: 0
  };
  if (process.ingestServer) {
    return {
      meta: {
        stats,
        time: null,
        totalTime: 0
      },
      initServer: process.ingestServer
    };
  }
  if (options.react === "17") {
    setReact17Compat(true);
  }
  options.ingest ?? (options.ingest = {
    host: "localhost",
    port: INITIAL_PORT
  });
  options.test ?? (options.test = env.IS_TESTING);
  if (env.IS_APM) {
    initServer = (async () => {
      var _a2, _b;
      await init2((_a2 = options.production) == null ? void 0 : _a2.url, (_b = options.production) == null ? void 0 : _b.apiKey);
    })();
  } else if (env.IS_DEVELOPMENT) {
    store.apiKey = ((_a = options.production) == null ? void 0 : _a.apiKey) ?? "";
    store.buildId = "dev";
    store.commitHash = "dev";
    initServer = (async () => {
      await startIngestServer(options.ingest);
      await reset2();
      displayIntro();
    })();
  }
  return {
    meta: {
      stats,
      time: null,
      totalTime: 0
    },
    initServer
  };
};
var startIngestServer = async (ingest) => {
  try {
    ingest ?? (ingest = {});
    if (server)
      return server;
    const host = (ingest == null ? void 0 : ingest.host) || "localhost";
    let port = (ingest == null ? void 0 : ingest.port) || INITIAL_PORT;
    while (!server && maxNumberOfMillionServers > 0) {
      try {
        server = await _startIngestServer(host, port);
        if (server) {
          process.ingestServer = server;
        }
      } catch (err) {
        if (err instanceof Error) {
          void saveLog("error", {
            origin: "Failed to start ingest server",
            message: err.message,
            stack: err.stack,
            numberOfTries: maxNumberOfMillionServers,
            host: (ingest == null ? void 0 : ingest.host) || "localhost",
            port
          });
          logError("Failed to start ingest server");
        }
      }
      if (server) {
        store.port = port;
        break;
      }
      port++;
      maxNumberOfMillionServers--;
    }
    if (!server && !alreadyNotified) {
      alreadyNotified = true;
      logError("Could not connect to VSCode.");
      void saveLog("error", {
        origin: "Could not connect to VSCode",
        port
      });
    }
    if (ingest) {
      ingest.port = port;
      ingest.host = host;
    }
    return server;
  } catch (err) {
    void saveLog("error", {
      origin: "Failed to start ingest server via function call",
      message: err.message,
      stack: err.stack
    });
    logError(
      "Million Lint Internal Error: please disable Million Lint in your build config and file an issue if the problem persists https://github.com/aidenybai/million/issues/new?assignees=&labels=&projects=&template=bug_report.yml"
    );
  }
};
var _startIngestServer = async (host, port) => {
  let runServer;
  return new Promise((resolve, reject) => {
    runServer = async () => {
      const $server = serve({
        fetch: ingestServer.fetch,
        hostname: host,
        port,
        serverOptions: {}
      });
      const server2 = $server.listen(port, host);
      if (!process.env.IS_APM) {
        if (process.env.NODE_ENV !== "production") {
          injectWebSocket(server2);
        }
      }
      server2.on("listening", () => {
        return resolve(server2);
      });
      server2.on("error", (err) => {
        if (!(err instanceof Error))
          return;
        reject(err);
      });
    };
    void runServer();
  }).catch(() => {
    return void 0;
  });
};

// compiler/src/store.ts
init_esm_shims();
var import_debounce = __toESM(require_debounce());
import fs3 from "fs";
import path3 from "path";

// compiler/src/core/utils/encoder.ts
init_esm_shims();
var Encoder = class {
  constructor(encoded = new Array(), cache = /* @__PURE__ */ new Map()) {
    this.encoded = encoded;
    this.cache = cache;
    this.hasChanged = true;
  }
  serialize() {
    return this.encoded;
  }
  deserialize(data) {
    if (this.encoded.length !== 0)
      return;
    for (let i = 0, len = data.length; i < len; i++) {
      this.push(data[i]);
    }
  }
  push(value) {
    this.hasChanged = true;
    const key = value.toString();
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const index = this.encoded.push(value) - 1;
    this.cache.set(key, index);
    return index;
  }
  get(index) {
    return this.encoded[index] ?? null;
  }
  all() {
    return this.encoded;
  }
  clear() {
    this.encoded.length = 0;
    this.cache.clear();
  }
};

// compiler/src/server/build-cache.ts
init_esm_shims();
import path2 from "path";
import fs2 from "fs";
var getNextCacheDir = (cwd3) => {
  return path2.join(cwd3, ".next", "cache", "webpack", "client-development");
};
var getWebpackCacheDir = (cwd3) => {
  return path2.join(cwd3, "node_modules", ".cache");
};
var getViteCacheDir = (cwd3) => {
  return path2.join(cwd3, "node_modules", ".vite");
};
var getLastModifiedTimeCache = (cwd3) => {
  const nextCacheDir = path2.join(getNextCacheDir(cwd3), "index.pack.gz");
  if (fs2.existsSync(nextCacheDir)) {
    return fs2.statSync(nextCacheDir).mtime.getTime();
  }
  return null;
};
var bustBuildCache = (cwd3) => {
  const nextCacheDir = getNextCacheDir(cwd3);
  const webpackCacheDir = getWebpackCacheDir(cwd3);
  const viteCacheDir = getViteCacheDir(cwd3);
  fs2.rmSync(nextCacheDir, { recursive: true, force: true });
  fs2.rmSync(webpackCacheDir, { recursive: true, force: true });
  fs2.rmSync(viteCacheDir, { recursive: true, force: true });
};

// compiler/src/store.ts
var cwd = process.cwd();
var Store = class {
  constructor(cacheHandler = buildCacheHandler(process.cwd(), "store.json"), report2 = (0, import_debounce.default)(
    () => {
      if (!env.IS_DEVELOPMENT)
        return;
      if (this.encodings.hasChanged) {
        this.cacheHandler.write(this.serialize());
      }
      void report({ compiler: this.get() });
    },
    1e3,
    { leading: true, trailing: false }
  )) {
    this.cacheHandler = cacheHandler;
    this.report = report2;
    /* Encoding */
    this.encodings = new Encoder();
    /* Component Data (Component Locs, Externals) */
    this.reactData = {};
    /* Debugging */
    this.failedFiles = new Array();
    this.port = 42423;
    // APM url
    this.unusedFiles = /* @__PURE__ */ new Set();
    this.problems = [];
    if (!env.IS_DEVELOPMENT)
      return;
    let data;
    try {
      data = this.cacheHandler.load();
      const mtime = getLastModifiedTimeCache(cwd);
      if (!mtime || !(data == null ? void 0 : data.mtime) || mtime !== (data == null ? void 0 : data.mtime)) {
        try {
          bustBuildCache(cwd);
        } catch (err) {
          logError(
            "Failed to bust build cache. Please manually delete your React app's cache directory (i.e .next or node_modules/.vite)"
          );
          if (err instanceof Error) {
            void saveLog("error", {
              origin: "Failed to bust build cache",
              message: err.message,
              stack: err.stack
            });
          }
        }
      }
      if (Array.isArray(data == null ? void 0 : data.unusedFiles)) {
        data.unusedFiles = new Set(data.unusedFiles);
      }
    } catch (err) {
      logError("Failed to load data from disk");
      if (err instanceof Error) {
        void saveLog("error", {
          origin: "Failed to load data from disk",
          message: err.message,
          stack: err.stack
        });
      }
    }
    if (data) {
      try {
        this.deserialize(data);
      } catch (err) {
        logError("Failed to deserialize data from disk");
        if (err instanceof Error) {
          void saveLog("error", {
            origin: "Failed to deserialize data from disk",
            message: err.message,
            stack: err.stack,
            data
          });
        }
      }
    }
    setInterval(() => {
      if (env.IS_DEVELOPMENT) {
        void healthCheck();
      }
    }, 1e3);
    process.on("exit", () => {
      if (env.IS_DEVELOPMENT) {
        this.cacheHandler.write(this.serialize());
      }
    });
  }
  get() {
    const data = {
      encodings: this.encodings.all(),
      reactData: this.reactData,
      failedFiles: this.failedFiles,
      cwd
    };
    return data;
  }
  clear() {
    this.encodings.clear();
    this.reactData = {};
  }
  serialize() {
    this.encodings.hasChanged = false;
    return {
      encodings: this.encodings.serialize(),
      reactData: this.reactData,
      unusedFiles: [...this.unusedFiles],
      mtime: getLastModifiedTimeCache(cwd)
    };
  }
  deserialize(data) {
    this.encodings.deserialize(data.encodings);
    this.reactData = data.reactData || {};
  }
};
var buildCacheHandler = (cwd3, file) => {
  return {
    write: (data) => {
      const baseDir = path3.join(cwd3, ".million");
      try {
        if (!fs3.existsSync(path3.join(baseDir))) {
          fs3.mkdirSync(path3.join(baseDir));
        }
        fs3.writeFileSync(path3.join(baseDir, file), JSON.stringify(data));
      } catch (err) {
        logError("Failed to write cache to disk");
        if (err instanceof Error) {
          void saveLog("error", {
            origin: "Failed to write cache to disk",
            message: err.message,
            stack: err.stack,
            baseDir
          });
        }
      }
    },
    load: () => {
      const baseDir = path3.join(cwd3, ".million");
      try {
        if (!fs3.existsSync(path3.join(baseDir, file))) {
          return null;
        }
        return JSON.parse(
          fs3.readFileSync(path3.join(baseDir, file), "utf8")
        );
      } catch (err) {
        logError("Failed to delete cache from disk");
        if (err instanceof Error) {
          void saveLog("error", {
            origin: "Failed to delete cache from disk",
            message: err.message,
            stack: err.stack,
            baseDir
          });
        }
        return null;
      }
    }
  };
};

// compiler/src/env.ts
init_esm_shims();
var Env = class {
  constructor() {
    /**
     * PRODUCTION
     * When the user runs `npm run build` or `yarn build`
     * ------------------------------
     * Possible combinations:
     * production (apm disabled) = no transform, no vscode connection, no apm, nothing basically
     * production (apm enabled) = transform, apm, no vscode connection
     */
    this.IS_PRODUCTION = process.env.NODE_ENV === "production";
    /**
     * DEVELOPMENT
     * Is when the React app is being built for development
     * i.e when the user runs `npm run dev` or `yarn dev`
     * ------------------------------
     * Possible combinations:
     * dev = transform, vscode connection, apm (doesn't run in production)
     */
    this.IS_DEVELOPMENT = NOT(process.env.NODE_ENV === "production") && NOT(process.env.NODE_ENV === "test");
    /**
     * TESTING
     * Is when the React app is being built for testing
     * i.e when the user runs `npm run test` or `yarn test`
     * Possible combinations:
     * test (apm enabled) = transform, apm
     * test (apm disabled) = transform, no apm
     */
    this.IS_TESTING = process.env.NODE_ENV === "test";
    /** GENERAL FLAGS */
    this.IS_APM = false;
  }
  // WHEN APM IS ENABLED AND WE ARE IN PRODUCTION
  update(options) {
    var _a, _b;
    this.IS_APM = this.IS_PRODUCTION && Boolean((_a = options.production) == null ? void 0 : _a.enabled) && Boolean((_b = options.production) == null ? void 0 : _b.apiKey);
    if (options.enabled === false) {
      this.IS_DEVELOPMENT = false;
      this.IS_APM = false;
    }
  }
  toString() {
    return JSON.stringify(this);
  }
};
var NOT = (value) => !value;

// compiler/src/index.ts
var cwd2 = process.cwd();
var DEFAULT_INCLUDE = "**/*.{mtsx,mjsx,tsx,jsx,ts,js}";
var DEFAULT_EXCLUDE = "**/node_modules/**";
var cacheDirs = [".cache/", ".vite/", ".million/", ".next/"];
var env = new Env();
var store = new Store();
var encode = (secret) => {
  return store.encodings.push(secret);
};
var transform = async (instance, meta, options, code, id, map) => {
  await instance.initServer;
  if ((options == null ? void 0 : options.skipTransform) || store.unusedFiles.has(id))
    return null;
  const relativePath = path4.relative(cwd2, id);
  let withBabelOptions = options;
  try {
    if (cacheDirs.some((dir) => id.includes(dir))) {
      return null;
    }
    if (options.dev) {
      instance.meta.time = logStart(relativePath);
    }
    withBabelOptions = Object.assign(
      {
        source: code,
        filename: relativePath,
        absoluteFilename: id,
        framework: meta.framework,
        stats: {
          components: 0,
          captures: 0
        }
      },
      options
    );
    const stats = withBabelOptions.stats || {
      components: 0,
      captures: 0
    };
    const result = await compile(id, code, withBabelOptions, map);
    instance.meta.stats.components += stats.components;
    instance.meta.stats.captures += stats.captures;
    if (!stats.captures && !store.unusedFiles.has(id)) {
      store.unusedFiles.add(id);
    }
    if (options.dev) {
      instance.meta.totalTime += logEnd(
        relativePath,
        instance.meta.time,
        withBabelOptions.stats
      );
    }
    return result;
  } catch (err) {
    if (err instanceof Error) {
      store.failedFiles.push({
        filename: relativePath,
        error: err.message
      });
      if ((options == null ? void 0 : options.telemetry) !== false) {
        void saveLog("error", {
          origin: "Failed to compile",
          message: err.message,
          stack: err.stack,
          options: withBabelOptions,
          stats: instance.meta.stats,
          totalTime: instance.meta.totalTime,
          code
        });
      }
    }
    logError(
      `Failed to compile: ${relativePath} 
 ${err.message} ${(options == null ? void 0 : options.dev) ? err.stack : ""}`
    );
  }
  return null;
};
var NOOP_UNPLUGIN = {
  name: "anya",
  transformInclude() {
    return false;
  },
  transform(code) {
    return code;
  }
};
var unplugin = createUnplugin((options, meta) => {
  var _a, _b;
  const currentOptions = options || {};
  env.update(currentOptions);
  if (currentOptions.enabled === false)
    return NOOP_UNPLUGIN;
  if (env.IS_PRODUCTION && !env.IS_APM) {
    return NOOP_UNPLUGIN;
  }
  const filter = createFilter(
    ((_a = currentOptions.filter) == null ? void 0 : _a.include) || DEFAULT_INCLUDE,
    ((_b = currentOptions.filter) == null ? void 0 : _b.exclude) || [
      DEFAULT_EXCLUDE,
      // Next.js pages dir specific
      "**/_app.{jsx,tsx,js,ts}",
      "**/_document.{jsx,tsx,js,ts}",
      "**/api/**/*",
      // Million.js specific
      "**/.million/**/*"
    ]
  );
  const instance = createBuildInstance(currentOptions);
  return {
    enforce: "pre",
    name: "anya",
    watchChange() {
      instance.meta.totalTime = 0;
      void reset2();
    },
    transformInclude(id) {
      return filter(id);
    },
    async transform(code, id) {
      return transform(instance, meta, options || {}, code, id, void 0);
    },
    async buildEnd() {
      if (options == null ? void 0 : options.skipTransform)
        return;
      await instance.initServer;
      if (env.IS_APM) {
        void reportCompiler();
      } else if (env.IS_DEVELOPMENT) {
        store.report();
      }
      logFinish(instance.meta.totalTime, instance.meta.stats);
    },
    webpack(compiler) {
      if (!env.IS_APM)
        return;
      const options2 = compiler.options;
      if (!options2.resolve) {
        options2.resolve = {};
      }
      if (!options2.resolve.alias) {
        options2.resolve.alias = {};
      }
      if (Array.isArray(options2.resolve.alias)) {
        options2.resolve.alias.push({
          alias: "react-dom$",
          name: "react-dom/profiling"
        });
      } else {
        options2.resolve.alias["react-dom$"] = "react-dom/profiling";
      }
    },
    vite: {
      resolve: env.IS_APM ? {
        alias: [
          { find: /^react-dom$/, replacement: "react-dom/profiling" }
        ]
      } : {},
      handleHotUpdate(ctx) {
        if (ctx.file.includes(".million"))
          return;
        instance.meta.totalTime = 0;
        void reset2();
        store.report();
      },
      configResolved(config) {
        repushPlugin(config.plugins, "anya", [
          // https://github.com/withastro/astro/blob/main/packages/astro/src/vite-plugin-jsx/index.ts#L173
          "astro:jsx",
          // https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react
          "vite:react-babel",
          "vite:react-jsx",
          // https://github.com/preactjs/preset-vite/blob/main/src/index.ts
          "vite:preact-jsx",
          // https://github.com/vitejs/vite-plugin-react-swc/blob/main/src/index.ts
          "vite:react-swc"
        ]);
      }
    }
  };
});
var repushPlugin = (plugins, pluginName, pluginNames) => {
  const namesSet = new Set(pluginNames);
  let baseIndex = -1;
  let targetIndex = -1;
  let targetPlugin;
  for (let i = 0, len = plugins.length; i < len; i += 1) {
    const current = plugins[i];
    if (namesSet.has(current.name) && baseIndex === -1) {
      baseIndex = i;
    }
    if (current.name === pluginName) {
      targetIndex = i;
      targetPlugin = current;
    }
  }
  if (targetPlugin && baseIndex !== -1 && targetIndex !== -1 && baseIndex < targetIndex) {
    plugins.splice(targetIndex, 1);
    plugins.splice(baseIndex, 0, targetPlugin);
  }
};

// compiler/loader.ts
async function MillionLintLoader(code, map) {
  if (typeof map === "string") {
    map = JSON.parse(map);
  }
  const callback = this.async();
  try {
    const options = this.getOptions();
    const instance = createBuildInstance(options);
    const id = this.resourcePath;
    if (id.includes("node_modules"))
      return callback(null, code);
    const result = await transform(
      instance,
      { framework: options.framework || "next" },
      options,
      code,
      id,
      map
    );
    callback(
      null,
      (result == null ? void 0 : result.code) || "",
      result ? JSON.stringify(result.map) : void 0
    );
  } catch (e) {
    callback(e);
  }
}
export {
  MillionLintLoader as default
};
