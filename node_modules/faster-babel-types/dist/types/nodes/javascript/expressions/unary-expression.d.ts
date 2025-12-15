import type * as t from '@babel/types';
export type UnaryExpressionOperator = 'void' | 'throw' | 'delete' | '!' | '+' | '-' | '~' | 'typeof';
export declare function unaryExpression(operator: UnaryExpressionOperator, argument: t.Expression, prefix?: boolean): t.UnaryExpression;
export declare function isUnaryExpression(node: t.Node | null | undefined): node is t.UnaryExpression;
export declare function assertUnaryExpression(node: t.Node | null | undefined): asserts node is t.UnaryExpression;
//# sourceMappingURL=unary-expression.d.ts.map