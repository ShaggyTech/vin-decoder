/* Types */
import { HistoryItem } from '@/store/history';

/* Returns the index if the given history item exists, or -1 if it does not exist */
export const getHistoryItemIndex = (
  vinValue: string,
  history: HistoryItem[]
): number => {
  const isExistingItem = (historyItem: HistoryItem): boolean => {
    return vinValue === historyItem.VIN;
  };
  return history.findIndex(isExistingItem);
};
