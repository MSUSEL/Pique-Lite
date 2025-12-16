interface HighlightOptions {
    showLineNumbers?: boolean;
}
declare function highlight(code: string, options?: HighlightOptions): string;

export { type HighlightOptions, highlight };
