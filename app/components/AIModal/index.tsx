"use client";

import { useState, useEffect, useRef } from "react";
import { X, Mic, MicOff, Send } from "lucide-react";
import config from "@/app/shared/config/axios";
import { ICard } from "@/app/types/models";
import { CardItemPreview } from "@/app/components/CardItemPreview";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface AIMessage {
  id: number;
  message: string;
  response: string;
  referenced_cards: ICard[];
  tokens_used: number;
  is_helpful: boolean | null;
  created_at: string;
}

interface AIModalProps {
  onClose: () => void;
}

export function AIModal({ onClose }: AIModalProps) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<AIMessage[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Блокируем скролл body при открытии модалки
    document.body.style.overflow = 'hidden';

    // Загружаем историю чатов
    loadHistory();

    // Инициализируем Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionConstructor = 
        (window as typeof window & { 
          webkitSpeechRecognition?: new () => SpeechRecognition;
          SpeechRecognition?: new () => SpeechRecognition;
        }).webkitSpeechRecognition || 
        (window as typeof window & { 
          webkitSpeechRecognition?: new () => SpeechRecognition;
          SpeechRecognition?: new () => SpeechRecognition;
        }).SpeechRecognition;
      
      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'ru-RU';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      // Восстанавливаем скролл body при закрытии модалки
      document.body.style.overflow = '';
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const response = await config.get('/cards/ai/history/');
      setHistory(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке истории:', error);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Распознавание речи не поддерживается вашим браузером');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = inputText;
    setInputText("");

    try {
      const response = await config.post('/cards/ai/chat/', {
        message: userMessage,
      });

      const newMessage: AIMessage = {
        ...response.data,
        response: response.data.ai_response || response.data.response,
      };
      
      setMessages((prevMessages) => {
        const exists = prevMessages.some(m => m.id === newMessage.id);
        return exists ? prevMessages : [...prevMessages, newMessage];
      });
      
      await loadHistory();
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      alert('Не удалось отправить сообщение. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  const allMessages = [...history, ...messages]
    .filter((msg, index, self) => 
      index === self.findIndex(m => m.id === msg.id)
    )
    .sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl h-[90vh] sm:h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          backgroundColor: "var(--bg-primary)",
          transition: "background-color 0.3s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div
          className="flex items-center justify-between p-4 sm:p-6 border-b"
          style={{ 
            borderColor: "var(--border-color)",
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
          }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-[28px] sm:h-[28px]"
              >
                <path 
                  d="M12 2L2 7L12 12L22 7L12 2Z" 
                  fill="white" 
                  opacity="0.9"
                />
                <path 
                  d="M2 12L12 17L22 12" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  opacity="0.8"
                />
                <path 
                  d="M2 17L12 22L22 17" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  opacity="0.6"
                />
              </svg>
            </div>
            <div>
              <h2
                className="text-lg sm:text-xl font-[family-name:var(--font-stetica-bold)]"
                style={{ color: "var(--text-primary)" }}
              >
                ИИ-Помощник по недвижимости
              </h2>
              <p
                className="text-xs sm:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Умный подбор квартир и домов
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ color: "var(--text-secondary)" }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Область сообщений */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
          {allMessages.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-xl">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" 
                    fill="white"
                    opacity="0.95"
                  />
                  <circle cx="8" cy="9" r="1.5" fill="rgba(139, 92, 246, 1)"/>
                  <circle cx="12" cy="9" r="1.5" fill="rgba(139, 92, 246, 1)"/>
                  <circle cx="16" cy="9" r="1.5" fill="rgba(139, 92, 246, 1)"/>
                  <path 
                    d="M8 12C8 12 9 14 12 14C15 14 16 12 16 12" 
                    stroke="rgba(139, 92, 246, 1)" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3
                className="text-2xl font-[family-name:var(--font-stetica-bold)] mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Начните диалог с ИИ
              </h3>
              <p
                className="text-base max-w-md mx-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                Опишите квартиру вашей мечты, и я помогу найти идеальные варианты
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setInputText("Покажи квартиры для семьи в Махачкале")}
                  className="px-4 py-2 rounded-xl text-sm hover:shadow-md"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  Квартира для семьи
                </button>
                <button
                  onClick={() => setInputText("Новостройки с хорошим ремонтом")}
                  className="px-4 py-2 rounded-xl text-sm hover:shadow-md"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  Новостройки
                </button>
              </div>
            </div>
          )}

          {allMessages.map((msg, index) => (
            <div key={`msg-${msg.id}-${index}`} className="space-y-4">
              {/* Сообщение пользователя */}
              <div className="flex justify-end">
                <div
                  className="max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-md"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                    color: "white",
                  }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>

              {/* Ответ ИИ */}
              <div className="flex justify-start">
                <div className="flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="sm:w-[20px] sm:h-[20px]"
                    >
                      <path d="M12 3L2 8L12 13L22 8L12 3Z" fill="white" opacity="0.9"/>
                      <path d="M2 13L12 18L22 13" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                      <path d="M2 18L12 23L22 18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                    </svg>
                  </div>
                  <div
                    className="rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-sm"
                    style={{
                      backgroundColor: "var(--card-bg)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-primary)" }}>
                      {msg.response}
                    </p>
                  </div>
                </div>
              </div>

              {msg.referenced_cards && msg.referenced_cards.length > 0 && (
                <div className="ml-8 sm:ml-11">
                  <p
                    className="text-sm font-[family-name:var(--font-stetica-bold)] mb-3 sm:mb-4 flex items-center gap-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.6"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Рекомендованные объекты ({msg.referenced_cards.length})
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {msg.referenced_cards.slice(0, 4).map((card) => (
                      <div key={card.id}>
                        <CardItemPreview card={card} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 3L2 8L12 13L22 8L12 3Z" fill="white" opacity="0.9"/>
                    <path d="M2 13L12 18L22 13" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                    <path d="M2 18L12 23L22 18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                </div>
                <div
                  className="rounded-2xl px-5 py-4"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <div className="flex gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: "var(--accent-primary)" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: "var(--accent-primary)" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: "var(--accent-primary)" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Поле ввода */}
        <div
          className="p-3 sm:p-6 border-t"
          style={{ 
            borderColor: "var(--border-color)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div className="flex gap-2 sm:gap-3 items-center">
            <button
              onClick={toggleListening}
              className={`p-3 sm:p-3.5 rounded-2xl transition-colors shadow-lg flex-shrink-0 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gradient-to-br from-purple-500 to-blue-500 hover:opacity-90"
              }`}
              disabled={isLoading}
              title={isListening ? "Остановить запись" : "Начать запись"}
            >
              {isListening ? (
                <MicOff className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              ) : (
                <Mic className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Опишите квартиру вашей мечты..."
                rows={1}
                className="w-full rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:ring-2 resize-none text-sm sm:text-base"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  border: "2px solid var(--border-color)",
                  minHeight: "48px",
                  maxHeight: "120px",
                  lineHeight: "1.5",
                }}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || isLoading}
              className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg flex-shrink-0"
              title="Отправить сообщение"
            >
              <Send className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </button>
          </div>
          {isListening && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--accent-primary)" }}
              >
                Слушаю... Говорите сейчас
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
