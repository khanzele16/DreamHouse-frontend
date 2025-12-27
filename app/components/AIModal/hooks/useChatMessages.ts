import { useState, useCallback } from 'react';
import config from '@/app/shared/config/axios';
import { AIMessage } from './useChatHistory';

/**
 * Хук для управления отправкой сообщений в AI-чат.
 * Управляет состоянием загрузки и локальными сообщениями.
 * Поддерживает как текстовые, так и голосовые сообщения.
 */
export function useChatMessages() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Универсальная функция отправки сообщения.
   * Используется и для текстовых, и для голосовых сообщений.
   */
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);

    // Создаём временное сообщение пользователя
    const tempUserMessage: AIMessage = {
      id: Date.now(),
      message: text,
      response: '',
      referenced_cards: [],
      tokens_used: 0,
      is_helpful: null,
      created_at: new Date().toISOString(),
    };

    // Сразу добавляем в список
    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      const response = await config.post('/cards/ai/chat/', {
        message: text,
      });

      const newMessage: AIMessage = {
        ...response.data,
        response: response.data.ai_response || response.data.response,
      };

      // Заменяем временное сообщение на реальное с ответом
      setMessages((prev) =>
        prev.map((m) => (m.id === tempUserMessage.id ? newMessage : m))
      );
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      // Удаляем временное сообщение при ошибке
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMessage.id));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return {
    messages,
    isLoading,
    sendMessage,
  };
}
