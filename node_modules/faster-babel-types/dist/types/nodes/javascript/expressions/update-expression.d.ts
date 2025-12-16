import type * as t from '@babel/types';
export type UpdateExpressionOperator = '++' | '--';
export declare function updateExpression(operator: UpdateExpressionOperator, argument: t.Expression, prefix?: boolean): t.UpdateExpression;
export declare function isUpdateExpression(node: t.Node | null | undefined): node is t.UpdateExpression;
export declare function assertUpdateExpression(node: t.Node | null | undefined): asserts node is t.UpdateExpression;
//# sourceMappingURL=update-expression.d.ts.map