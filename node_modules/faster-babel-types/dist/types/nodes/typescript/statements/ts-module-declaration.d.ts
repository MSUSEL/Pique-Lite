import type * as t from '@babel/types';
export declare function tsModuleDeclaration(id: t.Identifier | t.StringLiteral, body: t.TSModuleBlock | t.TSModuleDeclaration): t.TSModuleDeclaration;
export declare function isTSModuleDeclaration(node: t.Node | null | undefined): node is t.TSModuleDeclaration;
export declare function assertTSModuleDeclaration(node: t.Node | null | undefined): asserts node is t.TSModuleDeclaration;
//# sourceMappingURL=ts-module-declaration.d.ts.map