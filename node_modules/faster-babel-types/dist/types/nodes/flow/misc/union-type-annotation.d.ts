import type * as t from '@babel/types';
export declare function unionTypeAnnotation(types: t.FlowType[]): t.UnionTypeAnnotation;
export declare function isUnionTypeAnnotation(node: t.Node | null | undefined): node is t.UnionTypeAnnotation;
export declare function assertUnionTypeAnnotation(node: t.Node | null | undefined): asserts node is t.UnionTypeAnnotation;
//# sourceMappingURL=union-type-annotation.d.ts.map