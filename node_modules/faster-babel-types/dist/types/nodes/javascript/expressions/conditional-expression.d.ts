import type * as t from '@babel/types';
export declare function conditionalExpression(test: t.Expression, consequent: t.Expression, alternate: t.Expression): t.ConditionalExpression;
export declare function isConditionalExpression(node: t.Node | null | undefined): node is t.ConditionalExpression;
export declare function assertConditionalExpression(node: t.Node | null | undefined): asserts node is t.ConditionalExpression;
//# sourceMappingURL=conditional-expression.d.ts.map