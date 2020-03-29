import { Commit } from 'vuex';
import { ResultsObjectType } from '@/types';

export type DrawerItem = {
  icon: string;
  title: string;
  to: string;
};
export type HistoryItem = {
  VIN: string;
  results: ResultsObjectType;
};

export interface HistoryPayload {
  action: string;
  item: HistoryItem;
}
export interface RootActionContext {
  commit: Commit;
  state: StoreStateRoot;
}

export interface StoreStateRoot {
  counter: number;
  drawerItems: Array<DrawerItem>;
  drawer: boolean;
  rightDrawer: boolean;
  history: Array<HistoryItem>;
}
