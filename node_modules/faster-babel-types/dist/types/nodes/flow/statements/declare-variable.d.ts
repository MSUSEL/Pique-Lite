import type * as t from '@babel/types';
export declare function declareVariable(id: t.Identifier): t.DeclareVariable;
export declare function isDeclareVariable(node: t.Node | null | undefined): node is t.DeclareVariable;
export declare function assertDeclareVariable(node: t.Node | null | undefined): asserts node is t.DeclareVariable;
//# sourceMappingURL=declare-variable.d.ts.map