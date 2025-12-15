import * as _babel_core from '@babel/core';
import * as _vite from 'vite';
import * as _unplugin from 'unplugin';
import * as Compiler from '@million/shared/types/raw-api/compiler';

interface NamedImportDefinition {
    kind: "named";
    name: string;
    source: string;
}
interface DefaultImportDefinition {
    kind: "default";
    local: string;
    source: string;
}
type ImportDefinition = NamedImportDefinition | DefaultImportDefinition;
interface DepsHookImportDefinition {
    type: Compiler.CaptureKind.Deps;
    argument: number;
    import: ImportDefinition;
}
interface ReducerHookImportDefinition {
    type: Compiler.CaptureKind.Value;
    import: ImportDefinition;
}
interface ValueHookIDefinition {
    type: Compiler.CaptureKind.Value;
    import: ImportDefinition;
}
type HookImportDefinition = DepsHookImportDefinition | ReducerHookImportDefinition | ValueHookIDefinition;
interface RawRegExp {
    source: string;
    flags: string;
}
interface Preset {
    filters: {
        component: RawRegExp;
        hook?: RawRegExp;
    };
    imports: {
        React?: ImportDefinition;
        hooks: Array<HookImportDefinition>;
        hocs: Array<ImportDefinition>;
        classes: Array<ImportDefinition>;
        million: Array<ImportDefinition>;
        hookExports: Array<ImportDefinition>;
    };
}
declare const PRESETS: {
    react: Preset;
};

interface Options {
    /**
     * Include or exclude files from compilation.
     * @property {string|RegExp|Array<string|RegExp>} [filter.include] - RegExp, glob pattern or array of them to include in compilation.
     * @property {string|RegExp|Array<string|RegExp>} [filter.exclude] - RegExp, glob pattern or array of them to exclude from compilation.
     */
    filter?: {
        include?: string | RegExp | Array<string | RegExp>;
        exclude?: string | RegExp | Array<string | RegExp>;
    };
    enabled?: boolean;
    PRESETS?: typeof PRESETS;
    /**
     * Enable or disable telemetry.
     * https://million.dev/docs/code-policy
     */
    telemetry?: boolean;
    /**
     * Enable or disable RSC (React Server Components).
     */
    rsc?: boolean;
    /**
     * Enable or disable legacy HMR (Hot Module Replacement).
     */
    legacyHmr?: boolean;
    /**
     * Skip transforming files (use this if you use a webpack loader)
     */
    skipTransform?: boolean;
    /**
     * Use this if you want a faster build and run time
     */
    lite?: boolean;
    /**
     * Log debug information
     */
    dev?: "debug" | boolean;
    /**
     * Disable next dev --turbo (default: true)
     */
    turbo?: boolean;
    stats?: {
        components: number;
        captures: number;
    };
    babel?: {
        plugins: Array<babel.PluginItem>;
    };
    framework?: string;
    optimizeDOM?: boolean;
    /**
     * React version to use.
     * @default 18
     */
    react?: "17" | "18" | "19";
    experimental?: {
        stabilize?: boolean;
    };
    test?: boolean;
    proxy?: {
        enabled: boolean;
        url?: string;
        password?: string;
    };
    ingest?: {
        runtimeURL?: string;
        host?: string;
        port?: number;
        ignoreMatching?: boolean;
    };
    production?: {
        enabled: boolean;
        url?: string;
        apiKey: string;
        flags?: {
            disableNextRewrites?: boolean;
        };
    };
}
interface BabelOptions extends Options {
    source?: string;
    isJSX?: boolean;
    filename?: string;
    absoluteFilename?: string;
}

declare const esbuild: (options?: Options | undefined) => _unplugin.EsbuildPlugin;
declare const rollup: (options?: Options | undefined) => _unplugin.RollupPlugin<any> | _unplugin.RollupPlugin<any>[];
declare const vite: (options?: Options | undefined) => _vite.Plugin<any> | _vite.Plugin<any>[];
declare const next: (options?: Options) => (nextConfig?: any) => any;
declare const unplugin: _unplugin.UnpluginInstance<Options | undefined, boolean>;
declare const craco: (options: Options) => {
    options: Options;
    plugin: {
        overrideWebpackConfig: ({ webpackConfig, pluginOptions }: any) => any;
        overrideDevServerConfig: ({ devServerConfig }: any) => any;
    };
};
declare const astro: (options?: Options) => {
    name: string;
    hooks: {
        "astro:config:setup": (astro: any) => void;
    };
};
declare const babel$1: () => _babel_core.PluginObj<_babel_core.PluginPass>;
declare const rspack: (options?: Options | undefined) => RspackPluginInstance;
declare const webpack: (options?: Options | undefined) => WebpackPluginInstance;
declare const rewire: (config: any, _env: unknown, options: Options) => any;
declare const compile: (id: string, code: string, options: BabelOptions, map: any) => Promise<{
    code: string;
    map: {
        version: number;
        sources: string[];
        names: string[];
        sourceRoot?: string | undefined;
        sourcesContent?: string[] | undefined;
        mappings: string;
        file: string;
    } | null | undefined;
} | null>;
declare const _default: {
    vite: (options?: Options | undefined) => _vite.Plugin<any> | _vite.Plugin<any>[];
    rollup: (options?: Options | undefined) => _unplugin.RollupPlugin<any> | _unplugin.RollupPlugin<any>[];
    esbuild: (options?: Options | undefined) => _unplugin.EsbuildPlugin;
    next: (options?: Options) => (nextConfig?: any) => any;
    unplugin: _unplugin.UnpluginInstance<Options | undefined, boolean>;
    craco: (options: Options) => {
        options: Options;
        plugin: {
            overrideWebpackConfig: ({ webpackConfig, pluginOptions }: any) => any;
            overrideDevServerConfig: ({ devServerConfig }: any) => any;
        };
    };
    astro: (options?: Options) => {
        name: string;
        hooks: {
            "astro:config:setup": (astro: any) => void;
        };
    };
    babel: () => _babel_core.PluginObj<_babel_core.PluginPass>;
    rspack: (options?: Options | undefined) => RspackPluginInstance;
    webpack: (options?: Options | undefined) => WebpackPluginInstance;
    rewire: (config: any, _env: unknown, options: Options) => any;
    compile: (id: string, code: string, options: BabelOptions, map: any) => Promise<{
        code: string;
        map: {
            version: number;
            sources: string[];
            names: string[];
            sourceRoot?: string | undefined;
            sourcesContent?: string[] | undefined;
            mappings: string;
            file: string;
        } | null | undefined;
    } | null>;
};

export { astro, babel$1 as babel, compile, craco, _default as default, esbuild, next, rewire, rollup, rspack, unplugin, vite, webpack };
