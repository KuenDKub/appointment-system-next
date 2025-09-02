"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Input,
  Switch,
  Textarea,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  getNotificationsAction,
  createNotificationAction,
  markAsReadAction,
} from "@/client/actions/notification-actions";

const notificationTypes = {
  BOOKING: { label: "การจอง", color: "primary" },
  REMINDER: { label: "เตือนล่วงหน้า", color: "warning" },
  CANCELLATION: { label: "การยกเลิก", color: "danger" },
  PROMOTION: { label: "โปรโมชั่น", color: "secondary" },
  SYSTEM: { label: "ระบบ", color: "default" },
};

export function NotificationsManagement() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompose, setShowCompose] = useState(false);
  const [composeData, setComposeData] = useState({
    title: "",
    message: "",
    type: "BOOKING",
    recipient: "all",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const result = await getNotificationsAction({
          page: 1,
          limit: 100,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        if (result.success && "notifications" in result) {
          setNotifications(result.notifications);
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
        // Set empty array on error
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadNotifications();
  }, []);

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendNotification = async () => {
    try {
      // Handle sending notification
      await createNotificationAction({
        title: composeData.title,
        message: composeData.message,
        type: "SYSTEM_UPDATE",
        userId: "all", // TODO: Implement recipient selection
        data: { recipient: composeData.recipient },
      });

      // Reload notifications
      const result = await getNotificationsAction({
        page: 1,
        limit: 100,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      if (result.success && "notifications" in result) {
        setNotifications(result.notifications);
      }

      setShowCompose(false);
      setComposeData({
        title: "",
        message: "",
        type: "BOOKING",
        recipient: "all",
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          จัดการการแจ้งเตือน
        </h1>
        <p className="text-gray-600">จัดการการแจ้งเตือนและการส่งข้อความ</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">{notifications.length}</div>
            <div className="text-blue-100">การแจ้งเตือนทั้งหมด</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">
              {notifications.filter((n) => n.status === "sent").length}
            </div>
            <div className="text-green-100">ส่งแล้ว</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">
              {notifications.filter((n) => n.status === "pending").length}
            </div>
            <div className="text-yellow-100">รอส่ง</div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Search and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          placeholder="ค้นหาการแจ้งเตือน..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          variant="bordered"
        />
        <Button
          color="primary"
          className="btn-primary"
          onClick={() => setShowCompose(true)}
        >
          ✉️ ส่งการแจ้งเตือนใหม่
        </Button>
      </motion.div>

      {/* Compose Notification Modal */}
      {showCompose && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCompose(false)}
        >
          <Card
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <h3 className="text-lg font-semibold">ส่งการแจ้งเตือนใหม่</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                placeholder="หัวข้อ"
                value={composeData.title}
                onChange={(e) =>
                  setComposeData({ ...composeData, title: e.target.value })
                }
                variant="bordered"
              />
              <Textarea
                placeholder="ข้อความ"
                value={composeData.message}
                onChange={(e) =>
                  setComposeData({ ...composeData, message: e.target.value })
                }
                variant="bordered"
                minRows={3}
              />
              <div className="flex gap-2">
                <Button
                  color="primary"
                  onClick={handleSendNotification}
                  className="flex-1"
                >
                  ส่ง
                </Button>
                <Button
                  variant="bordered"
                  onClick={() => setShowCompose(false)}
                  className="flex-1"
                >
                  ยกเลิก
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">รายการการแจ้งเตือน</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <Chip
                          color={
                            notificationTypes[
                              notification.type as keyof typeof notificationTypes
                            ]?.color as any
                          }
                          variant="flat"
                          size="sm"
                        >
                          {
                            notificationTypes[
                              notification.type as keyof typeof notificationTypes
                            ]?.label
                          }
                        </Chip>
                        <Chip
                          color={
                            notification.status === "sent"
                              ? "success"
                              : "warning"
                          }
                          variant="flat"
                          size="sm"
                        >
                          {notification.status === "sent" ? "ส่งแล้ว" : "รอส่ง"}
                        </Chip>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📅 {notification.createdAt}</span>
                        <span>
                          👥{" "}
                          {notification.recipient === "all"
                            ? "ทุกคน"
                            : notification.recipient}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="bordered" color="primary">
                        แก้ไข
                      </Button>
                      <Button size="sm" variant="bordered" color="danger">
                        ลบ
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
