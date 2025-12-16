import type * as t from '@babel/types';
export declare function declareClass(id: t.Identifier, typeParameters: t.TypeParameterDeclaration | null | undefined, interfaceExtends: t.InterfaceExtends[] | null | undefined, body: t.ObjectTypeAnnotation): t.DeclareClass;
export declare function isDeclareClass(node: t.Node | null | undefined): node is t.DeclareClass;
export declare function assertDeclareClass(node: t.Node | null | undefined): asserts node is t.DeclareClass;
//# sourceMappingURL=declare-class.d.ts.map