import type * as t from '@babel/types';
export declare function classAccessorProperty(key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.BigIntLiteral | t.Expression | t.PrivateName, value?: t.Expression | null | undefined, typeAnnotation?: t.TypeAnnotation | t.TSTypeAnnotation | t.Noop | null | undefined, decorators?: t.Decorator[] | null | undefined, computed?: boolean, isStatic?: boolean): t.ClassAccessorProperty;
export declare function isClassAccessorProperty(node: t.Node | null | undefined): node is t.ClassAccessorProperty;
export declare function assertClassAccessorProperty(node: t.Node | null | undefined): asserts node is t.ClassAccessorProperty;
//# sourceMappingURL=class-accessor-property.d.ts.map