import * as React from 'react';
import { MountInfo } from '@million/shared/types/raw-api/runtime';
import { Fiber } from 'react-reconciler';

/**
 * Do not destructure exports or import React from "react" here.
 * From empirical ad-hoc testing, this breaks in certain scenarios.
 */

/**
 * A react-internal {@link Fiber} provider. This component binds React children to the React Fiber tree. This
 * should only be used in production to correctly extract fibers.
 *
 * Modified from its-fine:
 *
 * @see https://github.com/pmndrs/its-fine/blob/598b81f02778c22ed21121c2b1a786bdefb14e23/src/index.tsx#L89
 */
declare class MillionLintProvider extends React.Component<{
    children?: React.ReactNode;
}> {
    private _reactInternals;
    render(): string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.FunctionComponentElement<React.ProviderProps<Fiber>> | null | undefined;
}

/**
 * IMPORTANT: @million/lint/devtools must run before React, since React will check for the
 * existence of __REACT_DEVTOOLS_GLOBAL_HOOK__ in order to inject internals.
 *
 * You can check /packages/anya/dist/runtime/index.mjs to validate this.
 *
 * https://github.com/facebook/react/blob/ba6a9e94edf0db3ad96432804f9931ce9dc89fec/packages/react-reconciler/src/ReactFiberDevToolsHook.js#L53
 */

/**
 * Do not move this to a separate file, export const enum doesn't work.
 *
 * If you change the contents of this enum, sync changes with:
 * - type CaptureValueKind: packages/shared/types/raw-api/runtime.ts
 * - enum CaptureKind: packages/shared/types/raw-api/compiler.ts
 */
declare const enum CaptureKind {
    Null = 0,// idk
    Deps = 1,
    Props = 2,
    Value = 4,
    State = 8,
    JSX = 16,
    JSXMount = 32,
    JSXUpdate = 64,
    Function = 128,
    Error = 256,
    Baseline = 512,
    Hooks = 1024,
    Note = 2048
}
declare let $$: (value: any, kind: CaptureKind, key: string, loc: number | null, secondaryLoc: number | null, locs: Array<number> | null, index: number | null, mountInfo: MountInfo | null) => any;
/**
 * Track when values change. See the change count within VSCode.
 */
declare let useCapture: (value: any, key?: string, loc?: number, index?: number, mountInfo?: MountInfo) => any;
/**
 * Count how many times a value is seen (doesn't track if it changes).
 * See the change count within VSCode or in the console.
 */
declare let useCount: (message: string, key?: string, loc?: number, index?: number, mountInfo?: MountInfo) => any;
declare let useCallbackExperiment: <T extends Function>(callback: T, deps: React.DependencyList, shouldMemo: boolean) => T;
declare let useMemoExperiment: <T>(factory: () => T, deps: React.DependencyList, shouldMemo: boolean) => T;
declare let memoExperiment: <P extends object>(Component: React.FunctionComponent<P>, propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean, shouldMemo?: boolean) => React.NamedExoticComponent<P> | React.FunctionComponent<P>;
declare let reset: () => void;
declare let registerMetadata: (key: string, size: number, isComponent: boolean, _DEV: {
    filename: string;
    componentName: string;
    screenshot?: string;
} | null) => void;
declare let init: (options?: {
    url?: string;
    buildId?: string;
    commitHash?: string;
    apiKey?: string;
    testOnly?: boolean;
}) => void;

export { $$, MillionLintProvider, init, memoExperiment, registerMetadata, reset, useCallbackExperiment, useCapture, useCount, useMemoExperiment };
