import type * as t from '@babel/types';
export declare function tsConstructorType(typeParameters: t.TSTypeParameterDeclaration | null | undefined, parameters: Array<t.ArrayPattern | t.Identifier | t.ObjectPattern | t.RestElement>, typeAnnotation?: t.TSTypeAnnotation | null | undefined): t.TSConstructorType;
export declare function isTSConstructorType(node: t.Node | null | undefined): node is t.TSConstructorType;
export declare function assertTSConstructorType(node: t.Node | null | undefined): asserts node is t.TSConstructorType;
//# sourceMappingURL=ts-constructor-type.d.ts.map