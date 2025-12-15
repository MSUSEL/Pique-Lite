import type * as t from '@babel/types';
export declare function objectTypeProperty(key: t.Identifier | t.StringLiteral, value: t.FlowType, variance?: t.Variance | null | undefined): t.ObjectTypeProperty;
export declare function isObjectTypeProperty(node: t.Node | null | undefined): node is t.ObjectTypeProperty;
export declare function assertObjectTypeProperty(node: t.Node | null | undefined): asserts node is t.ObjectTypeProperty;
//# sourceMappingURL=object-type-property.d.ts.map