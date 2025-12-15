import type * as t from '@babel/types';
export declare function genericTypeAnnotation(id: t.Identifier | t.QualifiedTypeIdentifier, typeParameters?: t.TypeParameterInstantiation | null | undefined): t.GenericTypeAnnotation;
export declare function isGenericTypeAnnotation(node: t.Node | null | undefined): node is t.GenericTypeAnnotation;
export declare function assertGenericTypeAnnotation(node: t.Node | null | undefined): asserts node is t.GenericTypeAnnotation;
//# sourceMappingURL=generic-type-annotation.d.ts.map