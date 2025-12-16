/**
 * IMPORTANT: KEEP EXPORTS IN SYNC WITH ./index.ts
 *
 * This file will only run if it's imported by a "use server" module.
 * This is to prevent the runtime from being compiled on the client and replace
 * it with no-ops.
 *
 * @see https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md#react-server-conditional-exports
 */
declare let reset: (value: unknown) => unknown;
declare let registerMetadata: (value: unknown) => unknown;
declare let init: (value: unknown) => unknown;
declare let useCapture: (value: unknown) => unknown;
declare let useCount: (value: unknown) => unknown;
declare let $$: (value: unknown) => unknown;
declare let MillionLintProvider: (props: {
    children: any;
}) => any;
declare let useCallbackExperiment: (value: unknown) => unknown;
declare let useMemoExperiment: (value: unknown) => unknown;
declare let memoExperiment: (value: unknown) => unknown;

export { $$, MillionLintProvider, init, memoExperiment, registerMetadata, reset, useCallbackExperiment, useCapture, useCount, useMemoExperiment };
