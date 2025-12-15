import type * as t from '@babel/types';
export declare function classProperty(key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.BigIntLiteral | t.Expression, value?: t.Expression | null, typeAnnotation?: t.TypeAnnotation | t.TSTypeAnnotation | t.Noop | null, decorators?: t.Decorator[] | null, computed?: boolean, isStatic?: boolean): t.ClassProperty;
export declare function isClassProperty(node: t.Node | null | undefined): node is t.ClassProperty;
export declare function assertClassProperty(node: t.Node | null | undefined): asserts node is t.ClassProperty;
//# sourceMappingURL=class-property.d.ts.map