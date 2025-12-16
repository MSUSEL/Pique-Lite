import type * as t from '@babel/types';
export declare function interfaceDeclaration(id: t.Identifier, typeParameters: t.TypeParameterDeclaration | null | undefined, interfaceExtends: t.InterfaceExtends[] | null | undefined, body: t.ObjectTypeAnnotation): t.InterfaceDeclaration;
export declare function isInterfaceDeclaration(node: t.Node | null | undefined): node is t.InterfaceDeclaration;
export declare function assertInterfaceDeclaration(node: t.Node | null | undefined): asserts node is t.InterfaceDeclaration;
//# sourceMappingURL=interface-declaration.d.ts.map