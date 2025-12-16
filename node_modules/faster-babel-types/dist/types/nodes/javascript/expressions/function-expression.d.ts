import type * as t from '@babel/types';
export declare function functionExpression(id: t.Identifier | null | undefined, params: Array<t.Identifier | t.Pattern | t.RestElement>, body: t.BlockStatement, generator?: boolean, async?: boolean): t.FunctionExpression;
export declare function isFunctionExpression(node: t.Node | null | undefined): node is t.FunctionExpression;
export declare function assertFunctionExpression(node: t.Node | null | undefined): asserts node is t.FunctionExpression;
//# sourceMappingURL=function-expression.d.ts.map