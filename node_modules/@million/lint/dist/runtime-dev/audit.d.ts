export { default as prettyMs } from 'pretty-ms';

declare const compileMarkdown: (strings: Array<string>, trace?: string) => string[];

/**
 * This is a separate module from @million/lint/runtime
 *
 * TODO(aiden): document this
 */

declare const logAudit: () => void;

export { compileMarkdown, logAudit };
