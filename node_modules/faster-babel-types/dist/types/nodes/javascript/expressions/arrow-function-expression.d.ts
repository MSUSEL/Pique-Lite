import type * as t from '@babel/types';
export declare function arrowFunctionExpression(params: Array<t.Identifier | t.Pattern | t.RestElement>, body: t.BlockStatement | t.Expression, async?: boolean): t.ArrowFunctionExpression;
export declare function isArrowFunctionExpression(node: t.Node | null | undefined): node is t.ArrowFunctionExpression;
export declare function assertArrowFunctionExpression(node: t.Node | null | undefined): asserts node is t.ArrowFunctionExpression;
//# sourceMappingURL=arrow-function-expression.d.ts.map