import type * as t from '@babel/types';
export declare function memberExpression(object: t.Expression, property: t.Expression | t.Identifier | t.PrivateName, computed?: boolean, optional?: boolean): t.MemberExpression;
export declare function isMemberExpression(node: t.Node | null | undefined): node is t.MemberExpression;
export declare function assertMemberExpression(node: t.Node | null | undefined): asserts node is t.MemberExpression;
//# sourceMappingURL=member-expression.d.ts.map