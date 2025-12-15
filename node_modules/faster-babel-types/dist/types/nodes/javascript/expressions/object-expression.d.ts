import type * as t from '@babel/types';
export declare function objectExpression(properties: Array<t.ObjectMethod | t.ObjectProperty | t.SpreadElement>): t.ObjectExpression;
export declare function isObjectExpression(node: t.Node | null | undefined): node is t.ObjectExpression;
export declare function assertObjectExpression(node: t.Node | null | undefined): asserts node is t.ObjectExpression;
//# sourceMappingURL=object-expression.d.ts.map