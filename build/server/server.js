import { createRequestHandler } from "@netlify/vite-plugin-react-router/serverless";
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { clsx } from "clsx";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const normalPalette = {
  background: {
    severe: "#f3000d80",
    high: "#ff8c0080",
    elevated: "#ffee0080",
    guarded: "#008ff580",
    low: "#00a43380"
  },
  font: {
    severe: "red",
    high: "orange",
    elevated: "yellow",
    guarded: "#0671CE",
    low: "green"
  },
  badge: {
    severe: "#CD161C",
    high: "#CC4E00",
    elevated: "#9E6C00",
    guarded: "#1D4EC6",
    low: "green"
  }
};
const colorBlindPalette = {
  background: {
    // Add transparency to keep text/icons readable on badges
    severe: "#DC267F80",
    // Magenta
    high: "#FE610080",
    // Orange  
    elevated: "#FFB00080",
    // Yellow
    guarded: "#785EF080",
    // Purple
    low: "#648FFF80"
    // Blue
  },
  font: {
    severe: "#0F172A",
    // High-contrast neutral for readability
    high: "#0F172A",
    elevated: "#0F172A",
    guarded: "#0F172A",
    low: "#0F172A"
  },
  badge: {
    severe: "#DC267F",
    // Magenta
    high: "#FE6100",
    // Orange  
    elevated: "#FFB000",
    // Yellow
    guarded: "#785EF0",
    // Purple
    low: "#648FFF"
    // Blue
  }
};
function getPalette(mode) {
  return mode === "colorblind" ? colorBlindPalette : normalPalette;
}
const ColorModeContext = createContext(void 0);
function setCSSCustomProperties(mode) {
  const palette = getPalette(mode);
  const root2 = document.documentElement;
  root2.style.setProperty("--risk-severe-background", palette.background.severe);
  root2.style.setProperty("--risk-high-background", palette.background.high);
  root2.style.setProperty("--risk-elevated-background", palette.background.elevated);
  root2.style.setProperty("--risk-guarded-background", palette.background.guarded);
  root2.style.setProperty("--risk-low-background", palette.background.low);
  root2.style.setProperty("--risk-severe-font", palette.font.severe);
  root2.style.setProperty("--risk-high-font", palette.font.high);
  root2.style.setProperty("--risk-elevated-font", palette.font.elevated);
  root2.style.setProperty("--risk-guarded-font", palette.font.guarded);
  root2.style.setProperty("--risk-low-font", palette.font.low);
  root2.style.setProperty("--risk-severe-badge", palette.badge.severe);
  root2.style.setProperty("--risk-high-badge", palette.badge.high);
  root2.style.setProperty("--risk-elevated-badge", palette.badge.elevated);
  root2.style.setProperty("--risk-guarded-badge", palette.badge.guarded);
  root2.style.setProperty("--risk-low-badge", palette.badge.low);
  root2.style.setProperty("--severe-color", palette.background.severe);
  root2.style.setProperty("--high-color", palette.background.high);
  root2.style.setProperty("--elevated-color", palette.background.elevated);
  root2.style.setProperty("--guarded-color", palette.background.guarded);
  root2.style.setProperty("--low-color", palette.background.low);
}
function ColorModeProvider({ children }) {
  const [colorMode, setColorModeState] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("colorMode");
      return stored || "normal";
    }
    return "normal";
  });
  const setColorMode = (mode) => {
    setColorModeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("colorMode", mode);
    }
    setCSSCustomProperties(mode);
  };
  const toggleColorMode = () => {
    const newMode = colorMode === "normal" ? "colorblind" : "normal";
    setColorMode(newMode);
  };
  useEffect(() => {
    setCSSCustomProperties(colorMode);
  }, [colorMode]);
  const value = {
    colorMode,
    toggleColorMode,
    setColorMode
  };
  return /* @__PURE__ */ jsx(ColorModeContext.Provider, { value, children });
}
const DEFAULT_RISK_LEVEL_RANGES = {
  severe: {
    normalRange: [-10, 0.2],
    diagnosticRange: [1.5, Infinity]
  },
  high: {
    normalRange: [0.2, 0.4],
    diagnosticRange: [0.8, 1.5]
  },
  elevated: {
    normalRange: [0.4, 0.6],
    diagnosticRange: [0.5, 0.8]
  },
  guarded: {
    normalRange: [0.6, 0.8],
    diagnosticRange: [0.2, 0.5]
  },
  low: {
    normalRange: [0.8, 1],
    diagnosticRange: [0, 0.2]
  }
};
const RiskLevelSettingsContext = createContext(void 0);
function RiskLevelSettingsProvider({ children }) {
  const [riskLevelRanges, setRiskLevelRanges] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("riskLevelRanges");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          Object.keys(parsed).forEach((level) => {
            const levelKey = level;
            if (parsed[levelKey].normalRange[0] === null) {
              parsed[levelKey].normalRange[0] = -Infinity;
            }
            if (parsed[levelKey].normalRange[1] === null) {
              parsed[levelKey].normalRange[1] = Infinity;
            }
            if (parsed[levelKey].diagnosticRange[0] === null) {
              parsed[levelKey].diagnosticRange[0] = -Infinity;
            }
            if (parsed[levelKey].diagnosticRange[1] === null) {
              parsed[levelKey].diagnosticRange[1] = Infinity;
            }
          });
          return parsed;
        } catch (e) {
          console.error("Failed to parse stored risk level ranges:", e);
        }
      }
    }
    return DEFAULT_RISK_LEVEL_RANGES;
  });
  const [isCustomized, setIsCustomized] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("riskLevelRanges") !== null;
    }
    return false;
  });
  const updateRiskLevelRange = (level, range) => {
    setRiskLevelRanges((prev) => {
      const updated = {
        ...prev,
        [level]: range
      };
      if (typeof window !== "undefined") {
        const serializable = JSON.parse(JSON.stringify(updated, (key, value2) => {
          if (value2 === Infinity) return null;
          if (value2 === -Infinity) return null;
          return value2;
        }));
        localStorage.setItem("riskLevelRanges", JSON.stringify(serializable));
      }
      setIsCustomized(true);
      return updated;
    });
  };
  const updateMultipleRiskLevelRanges = (updates) => {
    setRiskLevelRanges((prev) => {
      const updated = {
        ...prev,
        ...updates
      };
      if (typeof window !== "undefined") {
        const serializable = JSON.parse(JSON.stringify(updated, (key, value2) => {
          if (value2 === Infinity) return null;
          if (value2 === -Infinity) return null;
          return value2;
        }));
        localStorage.setItem("riskLevelRanges", JSON.stringify(serializable));
      }
      setIsCustomized(true);
      return updated;
    });
  };
  const resetToDefaults = () => {
    setRiskLevelRanges(DEFAULT_RISK_LEVEL_RANGES);
    setIsCustomized(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("riskLevelRanges");
    }
  };
  const value = {
    riskLevelRanges,
    updateRiskLevelRange,
    updateMultipleRiskLevelRanges,
    resetToDefaults,
    isCustomized
  };
  return /* @__PURE__ */ jsx(RiskLevelSettingsContext.Provider, { value, children });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("title", {
        children: "Pique LITE"
      }), /* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx("div", {
        id: "root",
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function Root() {
  return /* @__PURE__ */ jsx(ColorModeProvider, {
    children: /* @__PURE__ */ jsx(RiskLevelSettingsProvider, {
      children: /* @__PURE__ */ jsx(Outlet, {})
    })
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "container mx-auto p-4 pt-16",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-17LQJOx7.js", "imports": ["/assets/chunk-WWGJGFF6-BCIRVkgp.js", "/assets/index-7XWJIbu3.js"], "css": ["/assets/entry-DIVE3Gic.css"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BiI9stlR.js", "imports": ["/assets/chunk-WWGJGFF6-BCIRVkgp.js", "/assets/index-7XWJIbu3.js", "/assets/alert-CoBVaBv8.js", "/assets/index-DrFIHQv6.js"], "css": ["/assets/entry-DIVE3Gic.css", "/assets/root-DomeeVDT.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_dashboard": { "id": "routes/_dashboard", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_dashboard-DxWmRpOS.js", "imports": ["/assets/chunk-WWGJGFF6-BCIRVkgp.js", "/assets/label-BZkvCuQu.js", "/assets/index-DrFIHQv6.js", "/assets/index-CsXi809y.js", "/assets/dialog-CTi7W3tF.js", "/assets/table-CqbiqE0n.js", "/assets/index-Cvv0bEWi.js", "/assets/use-projects-B9NiZiC5.js", "/assets/ProjectManagerDialog-D_08tBna.js", "/assets/index-7XWJIbu3.js", "/assets/settings-BDhozJf4.js", "/assets/folder-CKJiprKw.js", "/assets/index-BdQq_4o_.js", "/assets/checkbox-BfMwIv62.js", "/assets/circle-alert-BSpPkgqL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_dashboard.versionDetails.project.$projectId.version.$versionId": { "id": "routes/_dashboard.versionDetails.project.$projectId.version.$versionId", "parentId": "routes/_dashboard", "path": "versionDetails/project/:projectId/version/:versionId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_dashboard.versionDetails.project._projectId.version._versionId-D0iecWp3.js", "imports": ["/assets/chunk-WWGJGFF6-BCIRVkgp.js", "/assets/tabs-cK7g8EsR.js", "/assets/table-CqbiqE0n.js", "/assets/label-BZkvCuQu.js", "/assets/index-Cvv0bEWi.js", "/assets/index-DrFIHQv6.js", "/assets/LineChart-BGFRXiLz.js", "/assets/index-7XWJIbu3.js", "/assets/alert-CoBVaBv8.js", "/assets/dialog-CTi7W3tF.js", "/assets/slider-BR_bbMgh.js", "/assets/index-BdQq_4o_.js", "/assets/index-CsXi809y.js", "/assets/info-9XoGbIt8.js", "/assets/rotate-ccw-okqcmQ62.js", "/assets/settings-BDhozJf4.js"], "css": ["/assets/_dashboard.versionDetails.project._projectId.version-Cyry1ZBb.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_dashboard.project.$projectId": { "id": "routes/_dashboard.project.$projectId", "parentId": "routes/_dashboard", "path": "project/:projectId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_dashboard.project._projectId-EpzoZeI5.js", "imports": ["/assets/chunk-WWGJGFF6-BCIRVkgp.js", "/assets/ProjectDetailsView-BR0rBaQt.js", "/assets/tabs-cK7g8EsR.js", "/assets/index-DrFIHQv6.js", "/assets/alert-CoBVaBv8.js", "/assets/label-BZkvCuQu.js", "/assets/index-7XWJIbu3.js", "/assets/index-Cvv0bEWi.js", "/assets/table-CqbiqE0n.js", "/assets/LineChart-BGFRXiLz.js", "/assets/switch-DtfHkXr6.js", "/assets/folder-CKJiprKw.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_dashboard.overview": { "id": "routes/_dashboard.overview", "parentId": "routes/_dashboard", "path": "overview", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_dashboard.overview-C6cn7TCE.js", "imports": ["/assets/chunk-WWGJGFF6-BCIRVkgp.js", "/assets/use-projects-B9NiZiC5.js", "/assets/tabs-cK7g8EsR.js", "/assets/checkbox-BfMwIv62.js", "/assets/label-BZkvCuQu.js", "/assets/table-CqbiqE0n.js", "/assets/slider-BR_bbMgh.js", "/assets/LineChart-BGFRXiLz.js", "/assets/folder-CKJiprKw.js", "/assets/ProjectDetailsView-BR0rBaQt.js", "/assets/alert-CoBVaBv8.js", "/assets/info-9XoGbIt8.js", "/assets/index-DrFIHQv6.js", "/assets/index-Cvv0bEWi.js", "/assets/index-CsXi809y.js", "/assets/index-7XWJIbu3.js", "/assets/index-BdQq_4o_.js", "/assets/switch-DtfHkXr6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_dashboard.settings": { "id": "routes/_dashboard.settings", "parentId": "routes/_dashboard", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_dashboard.settings-Dy9_CLP-.js", "imports": ["/assets/chunk-WWGJGFF6-BCIRVkgp.js", "/assets/alert-CoBVaBv8.js", "/assets/tabs-cK7g8EsR.js", "/assets/switch-DtfHkXr6.js", "/assets/label-BZkvCuQu.js", "/assets/slider-BR_bbMgh.js", "/assets/rotate-ccw-okqcmQ62.js", "/assets/circle-alert-BSpPkgqL.js", "/assets/index-DrFIHQv6.js", "/assets/index-Cvv0bEWi.js", "/assets/index-7XWJIbu3.js", "/assets/index-BdQq_4o_.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-BQQHxko3.js", "imports": ["/assets/chunk-WWGJGFF6-BCIRVkgp.js", "/assets/ProjectManagerDialog-D_08tBna.js", "/assets/label-BZkvCuQu.js", "/assets/dialog-CTi7W3tF.js", "/assets/index-CsXi809y.js", "/assets/table-CqbiqE0n.js", "/assets/index-7XWJIbu3.js", "/assets/index-DrFIHQv6.js", "/assets/index-BdQq_4o_.js", "/assets/checkbox-BfMwIv62.js", "/assets/circle-alert-BSpPkgqL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-gKgxGxdI.js", "imports": ["/assets/chunk-WWGJGFF6-BCIRVkgp.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-234dd0e7.js", "version": "234dd0e7", "sri": void 0 };
const route1 = { default: () => null };
const route2 = { default: () => null };
const route3 = { default: () => null };
const route4 = { default: () => null };
const route5 = { default: () => null };
const route6 = { default: () => null };
const route7 = { default: () => null };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = false;
const isSpaMode = true;
const prerender = [];
const routeDiscovery = { "mode": "initial" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_dashboard": {
    id: "routes/_dashboard",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_dashboard.versionDetails.project.$projectId.version.$versionId": {
    id: "routes/_dashboard.versionDetails.project.$projectId.version.$versionId",
    parentId: "routes/_dashboard",
    path: "versionDetails/project/:projectId/version/:versionId",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_dashboard.project.$projectId": {
    id: "routes/_dashboard.project.$projectId",
    parentId: "routes/_dashboard",
    path: "project/:projectId",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_dashboard.overview": {
    id: "routes/_dashboard.overview",
    parentId: "routes/_dashboard",
    path: "overview",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_dashboard.settings": {
    id: "routes/_dashboard.settings",
    parentId: "routes/_dashboard",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
const build = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assets: serverManifest,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
}, Symbol.toStringTag, { value: "Module" }));
const _virtual_netlifyServer = createRequestHandler({
  build
});
export {
  _virtual_netlifyServer as default
};
