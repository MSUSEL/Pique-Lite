import type * as t from '@babel/types';
export declare function tsConstructSignatureDeclaration(typeParameters: t.TSTypeParameterDeclaration | null | undefined, parameters: Array<t.ArrayPattern | t.Identifier | t.ObjectPattern | t.RestElement>, typeAnnotation?: t.TSTypeAnnotation | null | undefined): t.TSConstructSignatureDeclaration;
export declare function isTSConstructSignatureDeclaration(node: t.Node | null | undefined): node is t.TSConstructSignatureDeclaration;
export declare function assertTSConstructSignatureDeclaration(node: t.Node | null | undefined): asserts node is t.TSConstructSignatureDeclaration;
//# sourceMappingURL=ts-construct-signature-declaration.d.ts.map