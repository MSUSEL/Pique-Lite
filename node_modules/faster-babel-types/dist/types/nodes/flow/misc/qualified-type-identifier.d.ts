import type * as t from '@babel/types';
export declare function qualifiedTypeIdentifier(id: t.Identifier, qualification: t.Identifier | t.QualifiedTypeIdentifier): t.QualifiedTypeIdentifier;
export declare function isQualifiedTypeIdentifier(node: t.Node | null | undefined): node is t.QualifiedTypeIdentifier;
export declare function assertQualifiedTypeIdentifier(node: t.Node | null | undefined): asserts node is t.QualifiedTypeIdentifier;
//# sourceMappingURL=qualified-type-identifier.d.ts.map