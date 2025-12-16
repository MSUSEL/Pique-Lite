import type * as t from '@babel/types';
export type LogicalExpressionOperator = '||' | '&&' | '??';
export declare function logicalExpression(operator: LogicalExpressionOperator, left: t.Expression, right: t.Expression): t.LogicalExpression;
export declare function isLogicalExpression(node: t.Node | null | undefined): node is t.LogicalExpression;
export declare function assertLogicalExpression(node: t.Node | null | undefined): asserts node is t.LogicalExpression;
//# sourceMappingURL=logical-expression.d.ts.map