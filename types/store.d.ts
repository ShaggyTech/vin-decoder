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
  state: RootState;
}

export interface RootState {
  counter: number;
  drawerItems: DrawerItem[];
  drawer: boolean;
  rightDrawer: boolean;
  history: HistoryItem[];
}
