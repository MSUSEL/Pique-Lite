import type * as t from '@babel/types';
export declare function tsLiteralType(literal: t.NumericLiteral | t.StringLiteral | t.BooleanLiteral | t.BigIntLiteral | t.TemplateLiteral | t.UnaryExpression): t.TSLiteralType;
export declare function isTSLiteralType(node: t.Node | null | undefined): node is t.TSLiteralType;
export declare function assertTSLiteralType(node: t.Node | null | undefined): asserts node is t.TSLiteralType;
//# sourceMappingURL=ts-literal-type.d.ts.map