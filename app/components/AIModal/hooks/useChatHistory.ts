import { useState, useEffect } from 'react';
import config from '@/app/shared/config/axios';
import { ICard } from '@/app/types/models';

export interface AIMessage {
  id: number;
  message: string;
  response: string;
  referenced_cards: ICard[];
  tokens_used: number;
  is_helpful: boolean | null;
  created_at: string;
}

/**
 * Хук для загрузки истории чата с сервера.
 * Загружает историю ОДИН раз при монтировании.
 * Возвращает последние 5 диалогов (вопрос + ответ).
 */
export function useChatHistory() {
  const [history, setHistory] = useState<AIMessage[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await config.get('/cards/ai/history/');
      // Берём только первые 5 сообщений (как приходит с сервера) и переворачиваем
      const firstFiveMessages = response.data.slice(0, 5).reverse();
      setHistory(firstFiveMessages);
    } catch (error) {
      console.error('Ошибка при загрузке истории:', error);
      setHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  return { history, isLoadingHistory };
}
