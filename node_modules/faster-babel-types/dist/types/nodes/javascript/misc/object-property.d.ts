import type * as t from '@babel/types';
export declare function objectProperty(key: t.Expression | t.Identifier | t.StringLiteral | t.NumericLiteral | t.BigIntLiteral | t.DecimalLiteral | t.PrivateName, value: t.Expression | t.PatternLike, computed?: boolean, shorthand?: boolean, decorators?: t.Decorator[] | null | undefined): t.ObjectProperty;
export declare function isObjectProperty(node: t.Node | null | undefined): node is t.ObjectProperty;
export declare function assertObjectProperty(node: t.Node | null | undefined): asserts node is t.ObjectProperty;
//# sourceMappingURL=object-property.d.ts.map