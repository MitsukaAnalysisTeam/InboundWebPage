import { getHistoryEvents } from '@/domain/services/dataService';

export const getHistory = (): ReturnType<typeof getHistoryEvents> => {
  return getHistoryEvents();
};