import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Item { 'id' : bigint, 'name' : string, 'completed' : boolean }
export interface _SERVICE {
  'addItem' : ActorMethod<[string], Item>,
  'deleteItem' : ActorMethod<[bigint], boolean>,
  'getItems' : ActorMethod<[], Array<Item>>,
  'toggleItemCompletion' : ActorMethod<[bigint], [] | [Item]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
