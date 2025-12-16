import type * as t from '@babel/types';
export declare function tsInterfaceDeclaration(id: t.Identifier, typeParameters: t.TSTypeParameterDeclaration | null | undefined, interfaceExtends: t.TSExpressionWithTypeArguments[] | null | undefined, body: t.TSInterfaceBody): t.TSInterfaceDeclaration;
export declare function isTSInterfaceDeclaration(node: t.Node | null | undefined): node is t.TSInterfaceDeclaration;
export declare function assertTSInterfaceDeclaration(node: t.Node | null | undefined): asserts node is t.TSInterfaceDeclaration;
//# sourceMappingURL=ts-interface-declaration.d.ts.map