"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardBody } from "@heroui/react";
import { Button } from "@heroui/react";
import { Chip } from "@heroui/react";
import {
  getNotificationsAction,
  markAsReadAction,
  markAllAsReadAction,
  getUnreadCountAction,
} from "@/client/actions/notification-actions";
import {
  BellIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export function RealTimeNotification() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!session?.user?.id) return;

    const loadNotifications = async () => {
      try {
        const result = await getNotificationsAction({
          page: 1,
          limit: 50,
          userId: session.user.id,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        if (result.success && "notifications" in result) {
          setNotifications(result.notifications);
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };

    const loadUnreadCount = async () => {
      try {
        const result = await getUnreadCountAction(session.user.id);
        if (result.success && "count" in result) {
          setUnreadCount(result.count);
        }
      } catch (error) {
        console.error("Error loading unread count:", error);
      }
    };

    loadNotifications();
    loadUnreadCount();

    // Poll for updates every 30 seconds
    const interval = setInterval(() => {
      loadNotifications();
      loadUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, [session?.user?.id]);

  // Manual function to add notification (for testing)
  const addManualNotification = (
    type: "success" | "warning" | "error" | "info",
    title: string,
    message: string
  ) => {
    // TODO: Implement manual notification
    console.log("Manual notification:", { type, title, message });
  };

  const markAsRead = async (id: string) => {
    try {
      await markAsReadAction(id);
      // Reload notifications
      if (session?.user?.id) {
        const result = await getNotificationsAction({
          page: 1,
          limit: 50,
          userId: session.user.id,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        if (result.success && "notifications" in result) {
          setNotifications(result.notifications);
        }
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      if (session?.user?.id) {
        await markAllAsReadAction(session.user.id);
        // Reload notifications
        const result = await getNotificationsAction({
          page: 1,
          limit: 50,
          userId: session.user.id,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        if (result.success && "notifications" in result) {
          setNotifications(result.notifications);
        }
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const removeNotification = async (id: string) => {
    try {
      // TODO: Implement remove notification
      console.log("Remove notification:", id);
    } catch (error) {
      console.error("Error removing notification:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckIcon className="w-5 h-5 text-green-500" />;
      case "warning":
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "danger";
      default:
        return "primary";
    }
  };

  if (!session) return null;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        isIconOnly
        variant="bordered"
        color="primary"
        size="sm"
        className="relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <BellIcon className="w-5 h-5" />
        {unreadCount > 0 && (
          <Chip
            size="sm"
            color="danger"
            className="absolute -top-2 -right-2 min-w-[20px] h-5 text-xs"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Chip>
        )}
      </Button>

      {/* Test Notification Button (for development) */}
      <Button
        size="sm"
        variant="bordered"
        color="secondary"
        onClick={() =>
          addManualNotification("info", "ทดสอบ", "นี่คือการแจ้งเตือนทดสอบ")
        }
        className="ml-2"
      >
        ทดสอบ
      </Button>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 sm:w-96 z-50">
          <Card className="shadow-xl border">
            <CardBody className="p-0">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">การแจ้งเตือน</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button
                      size="sm"
                      variant="bordered"
                      color="primary"
                      onClick={markAllAsRead}
                    >
                      อ่านทั้งหมด
                    </Button>
                  )}
                  <Button
                    isIconOnly
                    size="sm"
                    variant="bordered"
                    onClick={() => setShowNotifications(false)}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <BellIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">ไม่มีการแจ้งเตือน</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <div className="flex items-center space-x-2">
                                {!notification.read && (
                                  <Chip
                                    size="sm"
                                    color="primary"
                                    variant="flat"
                                  >
                                    ใหม่
                                  </Chip>
                                )}
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="bordered"
                                  onClick={() =>
                                    removeNotification(notification.id)
                                  }
                                >
                                  <XMarkIcon className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-400">
                                {notification.timestamp.toLocaleTimeString(
                                  "th-TH",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="bordered"
                                  color="primary"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  อ่านแล้ว
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Click outside to close */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
}
