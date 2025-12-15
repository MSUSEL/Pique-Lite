import type * as t from '@babel/types';
export declare function optionalMemberExpression(object: t.Expression, property: t.Expression | t.Identifier, computed?: boolean, optional?: boolean): t.OptionalMemberExpression;
export declare function isOptionalMemberExpression(node: t.Node | null | undefined): node is t.OptionalMemberExpression;
export declare function assertOptionalMemberExpression(node: t.Node | null | undefined): asserts node is t.OptionalMemberExpression;
//# sourceMappingURL=optional-member-expression.d.ts.map