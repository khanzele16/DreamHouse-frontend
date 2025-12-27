"use client";

import { useEffect } from "react";
import { X, Bell } from "lucide-react";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "@/app/shared/redux/api/notifications";

interface NotificationBellProps {
  onClose?: () => void;
}

export function NotificationBell({ onClose }: NotificationBellProps) {
  const { data: notifications = [], isLoading } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleNotificationClick = async (id: number, isRead: boolean) => {
    if (!isRead) {
      try {
        await markAsRead(id).unwrap();
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Только что";
    if (diffMins < 60) return `${diffMins} мин назад`;
    if (diffHours < 24) return `${diffHours} ч назад`;
    if (diffDays < 7) return `${diffDays} дн назад`;
    return date.toLocaleDateString("ru-RU");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          backgroundColor: "var(--bg-primary)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center gap-3">
            <div>
              <h3
                className="text-xl font-[family-name:var(--font-stetica-medium)]"
                style={{ color: "var(--text-primary)" }}
              >
                Последние уведомления
              </h3>
              {unreadCount > 0 && (
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {unreadCount} непрочитанных
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Список уведомлений */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="p-12 text-center">
              <div 
                className="inline-block w-10 h-10 border-4 border-t-transparent rounded-full"
                style={{ 
                  borderColor: "var(--accent-primary)",
                  borderTopColor: "transparent"
                }}
              ></div>
              <p
                className="mt-4 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Загрузка уведомлений...
              </p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-12 text-center">
              <div 
                className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                <Bell className="w-10 h-10" style={{ color: "var(--text-secondary)" }} />
              </div>
              <p
                className="text-lg font-[family-name:var(--font-stetica-bold)] mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Нет уведомлений
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Здесь будут появляться важные обновления
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id, notification.is_read)}
                  className="w-full text-left p-4 rounded-xl border"
                  style={{
                    backgroundColor: notification.is_read
                      ? "var(--card-bg)"
                      : "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="flex gap-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "var(--accent-primary)" }}
                    >
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className="text-sm font-[family-name:var(--font-stetica-bold)]"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {notification.title}
                        </h4>
                        {!notification.is_read && (
                          <span 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "var(--accent-primary)" }}
                          ></span>
                        )}
                      </div>
                      <p
                        className="text-sm mb-2"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {notification.message}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {formatTime(notification.created_at)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
