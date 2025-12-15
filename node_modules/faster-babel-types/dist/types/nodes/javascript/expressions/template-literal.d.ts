import type * as t from '@babel/types';
export declare function templateLiteral(quasis: t.TemplateElement[], expressions: Array<t.Expression | t.TSType>): t.TemplateLiteral;
export declare function isTemplateLiteral(node: t.Node | null | undefined): node is t.TemplateLiteral;
export declare function assertTemplateLiteral(node: t.Node | null | undefined): asserts node is t.TemplateLiteral;
//# sourceMappingURL=template-literal.d.ts.map