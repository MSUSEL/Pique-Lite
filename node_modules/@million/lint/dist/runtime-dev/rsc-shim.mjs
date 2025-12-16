// runtime/src/rsc-shim.ts
var NO_OP_SELF_RETURN = (value) => value;
var reset = NO_OP_SELF_RETURN;
var registerMetadata = NO_OP_SELF_RETURN;
var init = NO_OP_SELF_RETURN;
var useCapture = NO_OP_SELF_RETURN;
var useCount = NO_OP_SELF_RETURN;
var $$ = NO_OP_SELF_RETURN;
var MillionLintProvider = (props) => props.children;
var useCallbackExperiment = NO_OP_SELF_RETURN;
var useMemoExperiment = NO_OP_SELF_RETURN;
var memoExperiment = NO_OP_SELF_RETURN;

export { $$, MillionLintProvider, init, memoExperiment, registerMetadata, reset, useCallbackExperiment, useCapture, useCount, useMemoExperiment };
