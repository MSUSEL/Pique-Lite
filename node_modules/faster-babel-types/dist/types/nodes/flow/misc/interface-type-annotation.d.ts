import type * as t from '@babel/types';
export declare function interfaceTypeAnnotation(interfaceExtends: t.InterfaceExtends[] | null | undefined, body: t.ObjectTypeAnnotation): t.InterfaceTypeAnnotation;
export declare function isInterfaceTypeAnnotation(node: t.Node | null | undefined): node is t.InterfaceTypeAnnotation;
export declare function assertInterfaceTypeAnnotation(node: t.Node | null | undefined): asserts node is t.InterfaceTypeAnnotation;
//# sourceMappingURL=interface-type-annotation.d.ts.map