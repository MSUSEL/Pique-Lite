import type * as t from '@babel/types';
export declare function callExpression(callee: t.Expression | t.V8IntrinsicIdentifier, args: Array<t.Expression | t.SpreadElement | t.ArgumentPlaceholder>): t.CallExpression;
export declare function isCallExpression(node: t.Node | null | undefined): node is t.CallExpression;
export declare function assertCallExpression(node: t.Node | null | undefined): asserts node is t.CallExpression;
//# sourceMappingURL=call-expression.d.ts.map