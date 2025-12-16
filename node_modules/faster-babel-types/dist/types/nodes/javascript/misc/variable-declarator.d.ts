import type * as t from '@babel/types';
export declare function variableDeclarator(id: t.LVal, init?: t.Expression | null | undefined): t.VariableDeclarator;
export declare function isVariableDeclarator(node: t.Node | null | undefined): node is t.VariableDeclarator;
export declare function assertVariableDeclarator(node: t.Node | null | undefined): asserts node is t.VariableDeclarator;
//# sourceMappingURL=variable-declarator.d.ts.map