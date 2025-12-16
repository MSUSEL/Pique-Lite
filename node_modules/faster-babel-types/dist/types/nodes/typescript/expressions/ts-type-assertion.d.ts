import type * as t from '@babel/types';
export declare function tsTypeAssertion(typeAnnotation: t.TSType, expression: t.Expression): t.TSTypeAssertion;
export declare function isTSTypeAssertion(node: t.Node | null | undefined): node is t.TSTypeAssertion;
export declare function assertTSTypeAssertion(node: t.Node | null | undefined): asserts node is t.TSTypeAssertion;
//# sourceMappingURL=ts-type-assertion.d.ts.map