import type * as t from '@babel/types';
export declare function tsTypePredicate(parameterName: t.Identifier | t.TSThisType, typeAnnotation?: t.TSTypeAnnotation | null | undefined, asserts?: boolean | null | undefined): t.TSTypePredicate;
export declare function isTSTypePredicate(node: t.Node | null | undefined): node is t.TSTypePredicate;
export declare function assertTSTypePredicate(node: t.Node | null | undefined): asserts node is t.TSTypePredicate;
//# sourceMappingURL=ts-type-predicate.d.ts.map