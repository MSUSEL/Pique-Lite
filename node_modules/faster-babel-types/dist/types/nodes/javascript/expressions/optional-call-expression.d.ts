import type * as t from '@babel/types';
export declare function optionalCallExpression(callee: t.Expression, args: Array<t.Expression | t.SpreadElement | t.ArgumentPlaceholder>, optional: boolean): t.OptionalCallExpression;
export declare function isOptionalCallExpression(node: t.Node | null | undefined): node is t.OptionalCallExpression;
export declare function assertOptionalCallExpression(node: t.Node | null | undefined): asserts node is t.OptionalCallExpression;
//# sourceMappingURL=optional-call-expression.d.ts.map