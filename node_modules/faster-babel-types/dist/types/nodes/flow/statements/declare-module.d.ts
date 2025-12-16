import type * as t from '@babel/types';
export type DeclareModuleKind = 'CommonJS' | 'ES';
export declare function declareModule(id: t.Identifier | t.StringLiteral, body: t.BlockStatement, kind?: DeclareModuleKind | null): t.DeclareModule;
export declare function isDeclareModule(node: t.Node | null | undefined): node is t.DeclareModule;
export declare function assertDeclareModule(node: t.Node | null | undefined): asserts node is t.DeclareModule;
//# sourceMappingURL=declare-module.d.ts.map