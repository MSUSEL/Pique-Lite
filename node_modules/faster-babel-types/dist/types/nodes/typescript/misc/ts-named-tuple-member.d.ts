import type * as t from '@babel/types';
export declare function tsNamedTupleMember(label: t.Identifier, elementType: t.TSType, optional?: boolean): t.TSNamedTupleMember;
export declare function isTSNamedTupleMember(node: t.Node | null | undefined): node is t.TSNamedTupleMember;
export declare function assertTSNamedTupleMember(node: t.Node | null | undefined): asserts node is t.TSNamedTupleMember;
//# sourceMappingURL=ts-named-tuple-member.d.ts.map