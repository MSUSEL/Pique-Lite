import type * as t from '@babel/types';
export declare function assignmentExpression(operator: string, left: t.LVal | t.OptionalMemberExpression, right: t.Expression): t.AssignmentExpression;
export declare function isAssignmentExpression(node: t.Node | null | undefined): node is t.AssignmentExpression;
export declare function assertAssignmentExpression(node: t.Node | null | undefined): asserts node is t.AssignmentExpression;
//# sourceMappingURL=assignment-expression.d.ts.map