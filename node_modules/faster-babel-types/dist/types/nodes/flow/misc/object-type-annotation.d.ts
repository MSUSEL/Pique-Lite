import type * as t from '@babel/types';
export declare function objectTypeAnnotation(properties: Array<t.ObjectTypeProperty | t.ObjectTypeSpreadProperty>, indexers?: t.ObjectTypeIndexer[], callProperties?: t.ObjectTypeCallProperty[], internalSlots?: t.ObjectTypeInternalSlot[], exact?: boolean): t.ObjectTypeAnnotation;
export declare function isObjectTypeAnnotation(node: t.Node | null | undefined): node is t.ObjectTypeAnnotation;
export declare function assertObjectTypeAnnotation(node: t.Node | null | undefined): asserts node is t.ObjectTypeAnnotation;
//# sourceMappingURL=object-type-annotation.d.ts.map