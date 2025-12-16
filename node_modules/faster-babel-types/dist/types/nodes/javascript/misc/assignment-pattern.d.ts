import type * as t from '@babel/types';
export declare function assignmentPattern(left: t.Identifier | t.ObjectPattern | t.ArrayPattern | t.MemberExpression | t.TSAsExpression | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TSNonNullExpression, right: t.Expression): t.AssignmentPattern;
export declare function isAssignmentPattern(node: t.Node | null | undefined): node is t.AssignmentPattern;
export declare function assertAssignmentPattern(node: t.Node | null | undefined): asserts node is t.AssignmentPattern;
//# sourceMappingURL=assignment-pattern.d.ts.map