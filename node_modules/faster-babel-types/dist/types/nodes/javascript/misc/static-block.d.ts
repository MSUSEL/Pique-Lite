import type * as t from '@babel/types';
export declare function staticBlock(body: t.Statement[]): t.StaticBlock;
export declare function isStaticBlock(node: t.Node | null | undefined): node is t.StaticBlock;
export declare function assertStaticBlock(node: t.Node | null | undefined): asserts node is t.StaticBlock;
//# sourceMappingURL=static-block.d.ts.map