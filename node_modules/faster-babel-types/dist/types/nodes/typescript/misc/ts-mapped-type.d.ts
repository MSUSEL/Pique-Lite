import type * as t from '@babel/types';
export declare function tsMappedType(typeParameter: t.TSTypeParameter, typeAnnotation?: t.TSType | null | undefined, nameType?: t.TSType | null | undefined): t.TSMappedType;
export declare function isTSMappedType(node: t.Node | null | undefined): node is t.TSMappedType;
export declare function assertTSMappedType(node: t.Node | null | undefined): asserts node is t.TSMappedType;
//# sourceMappingURL=ts-mapped-type.d.ts.map