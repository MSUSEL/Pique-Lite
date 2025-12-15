import type * as t from '@babel/types';
export declare function tsTypeReference(typeName: t.TSEntityName, typeParameters?: t.TSTypeParameterInstantiation | null | undefined): t.TSTypeReference;
export declare function isTSTypeReference(node: t.Node | null | undefined): node is t.TSTypeReference;
export declare function assertTSTypeReference(node: t.Node | null | undefined): asserts node is t.TSTypeReference;
//# sourceMappingURL=ts-type-reference.d.ts.map