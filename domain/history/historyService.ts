import historyData from '@/infrastructure/data/history.json';
import { HistoryEvent } from '@/domain/types';

export const getHistory = (): HistoryEvent[] => {
  return historyData;
}; 