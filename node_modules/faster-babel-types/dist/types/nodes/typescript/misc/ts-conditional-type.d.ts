import type * as t from '@babel/types';
export declare function tsConditionalType(checkType: t.TSType, extendsType: t.TSType, trueType: t.TSType, falseType: t.TSType): t.TSConditionalType;
export declare function isTSConditionalType(node: t.Node | null | undefined): node is t.TSConditionalType;
export declare function assertTSConditionalType(node: t.Node | null | undefined): asserts node is t.TSConditionalType;
//# sourceMappingURL=ts-conditional-type.d.ts.map