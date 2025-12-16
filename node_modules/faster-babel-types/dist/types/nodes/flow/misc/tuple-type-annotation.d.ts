import type * as t from '@babel/types';
export declare function tupleTypeAnnotation(types: t.FlowType[]): t.TupleTypeAnnotation;
export declare function isTupleTypeAnnotation(node: t.Node | null | undefined): node is t.TupleTypeAnnotation;
export declare function assertTupleTypeAnnotation(node: t.Node | null | undefined): asserts node is t.TupleTypeAnnotation;
//# sourceMappingURL=tuple-type-annotation.d.ts.map