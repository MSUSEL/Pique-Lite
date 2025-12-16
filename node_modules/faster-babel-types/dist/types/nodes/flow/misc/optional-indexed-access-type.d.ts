import type * as t from '@babel/types';
export declare function optionalIndexedAccessType(objectType: t.FlowType, indexType: t.FlowType): t.OptionalIndexedAccessType;
export declare function isOptionalIndexedAccessType(node: t.Node | null | undefined): node is t.OptionalIndexedAccessType;
export declare function assertOptionalIndexedAccessType(node: t.Node | null | undefined): asserts node is t.OptionalIndexedAccessType;
//# sourceMappingURL=optional-indexed-access-type.d.ts.map