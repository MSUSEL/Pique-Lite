import type * as t from '@babel/types';
export declare function functionTypeAnnotation(typeParameters: t.TypeParameterDeclaration | null | undefined, params: t.FunctionTypeParam[], rest: t.FunctionTypeParam | null | undefined, returnType: t.FlowType): t.FunctionTypeAnnotation;
export declare function isFunctionTypeAnnotation(node: t.Node | null | undefined): node is t.FunctionTypeAnnotation;
export declare function assertFunctionTypeAnnotation(node: t.Node | null | undefined): asserts node is t.FunctionTypeAnnotation;
//# sourceMappingURL=function-type-annotation.d.ts.map