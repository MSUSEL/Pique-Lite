import type * as t from '@babel/types';
export declare function nullableTypeAnnotation(typeAnnotation: t.FlowType): t.NullableTypeAnnotation;
export declare function isNullableTypeAnnotation(node: t.Node | null | undefined): node is t.NullableTypeAnnotation;
export declare function assertNullableTypeAnnotation(node: t.Node | null | undefined): asserts node is t.NullableTypeAnnotation;
//# sourceMappingURL=nullable-type-annotation.d.ts.map