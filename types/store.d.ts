import { Commit } from 'vuex';
import { ResultsObjectType } from '@/types';

export interface RootActionContext {
  commit: Commit;
  state: StoreStateRoot;
}

export interface StoreStateRoot {
  counter: number;
  history: Array<HistoryItem>;
}

export type HistoryItem = {
  VIN: string;
  results: ResultsObjectType;
};

export interface HistoryPayload {
  action: string;
  item: HistoryItem;
}
