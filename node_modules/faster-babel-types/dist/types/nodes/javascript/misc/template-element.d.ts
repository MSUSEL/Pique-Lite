import type * as t from '@babel/types';
export declare function templateElement(value: {
    raw: string;
    cooked?: string;
}, tail?: boolean): t.TemplateElement;
export declare function isTemplateElement(node: t.Node | null | undefined): node is t.TemplateElement;
export declare function assertTemplateElement(node: t.Node | null | undefined): asserts node is t.TemplateElement;
//# sourceMappingURL=template-element.d.ts.map