import { Fiber, FiberRoot } from 'react-reconciler';
import * as React from 'react';

interface Change {
    name: string;
    prevValue: unknown;
    nextValue: unknown;
    unstable: boolean;
}
interface Render {
    type: 'props' | 'context' | 'state' | 'misc';
    name: string | null;
    time: number;
    count: number;
    trigger: boolean;
    forget: boolean;
    changes: Change[] | null;
    label?: string;
}

interface PendingOutline {
    rect: DOMRect;
    domNode: HTMLElement;
    renders: Render[];
}
interface ActiveOutline {
    outline: PendingOutline;
    alpha: number;
    frame: number;
    totalFrames: number;
    resolve: () => void;
    text: string | null;
}

type States = {
    kind: 'inspecting';
    hoveredDomElement: HTMLElement | null;
    propContainer: HTMLDivElement;
} | {
    kind: 'inspect-off';
    propContainer: HTMLDivElement;
} | {
    kind: 'focused';
    focusedDomElement: HTMLElement;
    propContainer: HTMLDivElement;
} | {
    kind: 'uninitialized';
};

interface Options {
    /**
     * Enable/disable scanning
     *
     * Please use the recommended way:
     * enabled: process.env.NODE_ENV === 'development',
     *
     * @default true
     */
    enabled?: boolean;
    /**
     * Include children of a component applied with withScan
     *
     * @default true
     */
    includeChildren?: boolean;
    /**
     * Enable/disable geiger sound
     *
     * @default true
     */
    playSound?: boolean;
    /**
     * Log renders to the console
     *
     * @default false
     */
    log?: boolean;
    /**
     * Show toolbar bar
     *
     * @default true
     */
    showToolbar?: boolean;
    /**
     * Render count threshold, only show
     * when a component renders more than this
     *
     * @default 0
     */
    renderCountThreshold?: number;
    /**
     * Clear aggregated fibers after this time in milliseconds
     *
     * @default 5000
     */
    resetCountTimeout?: number;
    /**
     * Maximum number of renders for red indicator
     *
     * @default 20
     */
    maxRenders?: number;
    /**
     * Report data to getReport()
     *
     * @default false
     */
    report?: boolean;
    /**
     * Always show labels
     *
     * @default false
     */
    alwaysShowLabels?: boolean;
    onCommitStart?: () => void;
    onRender?: (fiber: Fiber, render: Render) => void;
    onCommitFinish?: () => void;
    onPaintStart?: (outlines: PendingOutline[]) => void;
    onPaintFinish?: (outlines: PendingOutline[]) => void;
}
interface Internals {
    onCommitFiberRoot: (rendererID: number, root: FiberRoot) => void;
    isInIframe: boolean;
    isPaused: boolean;
    componentAllowList: WeakMap<React.ComponentType<any>, Options> | null;
    options: Options;
    scheduledOutlines: PendingOutline[];
    activeOutlines: ActiveOutline[];
    onRender: ((fiber: Fiber, render: Render) => void) | null;
    reportDataByFiber: WeakMap<Fiber, {
        count: number;
        time: number;
        badRenders: Render[];
        displayName: string | null;
    }>;
    reportData: Record<string, {
        count: number;
        time: number;
        type: unknown;
        badRenders: Render[];
    }>;
    fiberRoots: WeakSet<Fiber>;
    inspectState: States;
}
type Listener<T> = (value: T) => void;
interface StoreMethods<T extends object> {
    subscribe: <K extends keyof T>(key: K, listener: Listener<T[K]>) => () => void;
    set: <K extends keyof T>(key: K, value: T[K]) => void;
    setState: (state: Partial<T>) => void;
    emit: <K extends keyof T>(key: K, value: T[K]) => void;
    subscribeMultiple: (subscribeTo: (keyof T)[], listener: Listener<T>) => () => void;
}
type Store<T extends object> = T & StoreMethods<T>;
declare const ReactScanInternals: Store<Internals>;
declare const getReport: () => Record<string, {
    count: number;
    time: number;
    type: unknown;
    badRenders: Render[];
}>;
declare const setOptions: (options: Options) => void;
declare const getOptions: () => Options;
declare const start: () => void;
declare const withScan: <T>(component: React.ComponentType<T>, options?: Options) => React.ComponentType<T>;
declare const scan: (options?: Options) => void;
declare const useScan: (options: Options) => void;
declare const onRender: (type: unknown, _onRender: (fiber: Fiber, render: Render) => void) => void;
declare const getRenderInfo: (type: unknown) => {
    count: number;
    time: number;
    type: unknown;
    badRenders: Render[];
} | null;

export { type Internals, type Options, ReactScanInternals, type StoreMethods, getOptions, getRenderInfo, getReport, onRender, scan, setOptions, start, useScan, withScan };
