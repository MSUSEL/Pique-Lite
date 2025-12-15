import type * as t from '@babel/types';
export type VariableDeclarationKind = 'var' | 'let' | 'const' | 'using' | 'await using';
export declare function variableDeclaration(kind: VariableDeclarationKind, declarations: t.VariableDeclarator[]): t.VariableDeclaration;
export declare function isVariableDeclaration(node: t.Node | null | undefined): node is t.VariableDeclaration;
export declare function assertVariableDeclaration(node: t.Node | null | undefined): asserts node is t.VariableDeclaration;
//# sourceMappingURL=variable-declaration.d.ts.map