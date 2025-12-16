import type * as t from '@babel/types';
export declare function objectTypeIndexer(id: t.Identifier | null | undefined, key: t.FlowType, value: t.FlowType, variance?: t.Variance | null): t.ObjectTypeIndexer;
export declare function isObjectTypeIndexer(node: t.Node | null | undefined): node is t.ObjectTypeIndexer;
export declare function assertObjectTypeIndexer(node: t.Node | null | undefined): asserts node is t.ObjectTypeIndexer;
//# sourceMappingURL=object-type-indexer.d.ts.map