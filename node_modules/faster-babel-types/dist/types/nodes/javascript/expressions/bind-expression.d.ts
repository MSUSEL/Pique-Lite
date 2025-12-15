import type * as t from '@babel/types';
export declare function bindExpression(object: t.Expression, callee: t.Expression): t.BindExpression;
export declare function isBindExpression(node: t.Node | null | undefined): node is t.BindExpression;
export declare function assertBindExpression(node: t.Node | null | undefined): asserts node is t.BindExpression;
//# sourceMappingURL=bind-expression.d.ts.map