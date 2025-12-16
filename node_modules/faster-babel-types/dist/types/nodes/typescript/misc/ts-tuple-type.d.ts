import type * as t from '@babel/types';
export declare function tsTupleType(elementTypes: Array<t.TSType | t.TSNamedTupleMember>): t.TSTupleType;
export declare function isTSTupleType(node: t.Node | null | undefined): node is t.TSTupleType;
export declare function assertTSTupleType(node: t.Node | null | undefined): asserts node is t.TSTupleType;
//# sourceMappingURL=ts-tuple-type.d.ts.map