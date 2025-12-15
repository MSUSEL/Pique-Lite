import type * as t from '@babel/types';
export type BinaryExpressionOperator = '+' | '-' | '/' | '%' | '*' | '**' | '&' | '|' | '>>' | '>>>' | '<<' | '^' | '==' | '===' | '!=' | '!==' | 'in' | 'instanceof' | '>' | '<' | '>=' | '<=' | '|>';
export declare function binaryExpression(operator: BinaryExpressionOperator, left: t.Expression | t.PrivateName, right: t.Expression): t.BinaryExpression;
export declare function isBinaryExpression(node: t.Node | null | undefined): node is t.BinaryExpression;
export declare function assertBinaryExpression(node: t.Node | null | undefined): asserts node is t.BinaryExpression;
//# sourceMappingURL=binary-expression.d.ts.map