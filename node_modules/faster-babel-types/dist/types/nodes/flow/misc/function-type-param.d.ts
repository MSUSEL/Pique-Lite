import type * as t from '@babel/types';
export declare function functionTypeParam(name: t.Identifier | null | undefined, typeAnnotation: t.FlowType): t.FunctionTypeParam;
export declare function isFunctionTypeParam(node: t.Node | null | undefined): node is t.FunctionTypeParam;
export declare function assertFunctionTypeParam(node: t.Node | null | undefined): asserts node is t.FunctionTypeParam;
//# sourceMappingURL=function-type-param.d.ts.map