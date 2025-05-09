import historyData from '@/infrastructure/data/history.json';
import { HistoryEvent } from './history';

export const getHistory = (): HistoryEvent[] => {
  return historyData.history;
}; 