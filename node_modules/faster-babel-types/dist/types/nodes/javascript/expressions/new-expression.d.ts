import type * as t from '@babel/types';
export declare function newExpression(callee: t.Expression | t.V8IntrinsicIdentifier, args: Array<t.Expression | t.SpreadElement | t.ArgumentPlaceholder>): t.NewExpression;
export declare function isNewExpression(node: t.Node | null | undefined): node is t.NewExpression;
export declare function assertNewExpression(node: t.Node | null | undefined): asserts node is t.NewExpression;
//# sourceMappingURL=new-expression.d.ts.map