import type * as t from '@babel/types';
export declare function tsCallSignatureDeclaration(typeParameters: t.TSTypeParameterDeclaration | null | undefined, parameters: Array<t.ArrayPattern | t.Identifier | t.ObjectPattern | t.RestElement>, typeAnnotation?: t.TSTypeAnnotation | null | undefined): t.TSCallSignatureDeclaration;
export declare function isTSCallSignatureDeclaration(node: t.Node | null | undefined): node is t.TSCallSignatureDeclaration;
export declare function assertTSCallSignatureDeclaration(node: t.Node | null | undefined): asserts node is t.TSCallSignatureDeclaration;
//# sourceMappingURL=ts-call-signature-declaration.d.ts.map