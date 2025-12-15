import type * as t from '@babel/types';
export declare function declareInterface(id: t.Identifier, typeParameters: t.TypeParameterDeclaration | null | undefined, interfaceExtends: t.InterfaceExtends[] | null | undefined, body: t.ObjectTypeAnnotation): t.DeclareInterface;
export declare function isDeclareInterface(node: t.Node | null | undefined): node is t.DeclareInterface;
export declare function assertDeclareInterface(node: t.Node | null | undefined): asserts node is t.DeclareInterface;
//# sourceMappingURL=declare-interface.d.ts.map