"use client";

import { useState, useEffect } from "react";
import { Card, Chip, Progress } from "@heroui/react";
import { motion } from "framer-motion";

interface QueueItem {
  id: string;
  customerName: string;
  service: string;
  estimatedTime: string;
  status: "waiting" | "in-progress" | "completed";
}

export default function QueuePage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    {
      id: "1",
      customerName: "คุณสมหญิง",
      service: "ทำเล็บ",
      estimatedTime: "15:30",
      status: "in-progress",
    },
    {
      id: "2",
      customerName: "คุณสมชาย",
      service: "ทำสปา",
      estimatedTime: "16:00",
      status: "waiting",
    },
    {
      id: "3",
      customerName: "คุณสมศรี",
      service: "นวด",
      estimatedTime: "16:30",
      status: "waiting",
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const waitingCount = queueItems.filter(
    (item) => item.status === "waiting"
  ).length;
  const inProgressCount = queueItems.filter(
    (item) => item.status === "in-progress"
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "warning";
      case "in-progress":
        return "primary";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting":
        return "รอ";
      case "in-progress":
        return "กำลังดำเนินการ";
      case "completed":
        return "เสร็จสิ้น";
      default:
        return "ไม่ทราบสถานะ";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">คิวปัจจุบัน</h1>
          <p className="text-lg text-gray-600">ติดตามสถานะคิวของคุณ</p>
          <div className="text-2xl font-mono text-gray-700 mt-4">
            {currentTime.toLocaleTimeString("th-TH")}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {waitingCount}
              </div>
              <div className="text-gray-600">รอในคิว</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {inProgressCount}
              </div>
              <div className="text-gray-600">กำลังดำเนินการ</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {queueItems.length}
              </div>
              <div className="text-gray-600">ทั้งหมด</div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">รายการคิว</h2>
            <div className="space-y-4">
              {queueItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {item.customerName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.service} • ประมาณ {item.estimatedTime}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Chip
                      color={getStatusColor(item.status) as any}
                      variant="flat"
                      size="sm"
                    >
                      {getStatusText(item.status)}
                    </Chip>

                    {item.status === "in-progress" && (
                      <Progress
                        size="sm"
                        value={65}
                        color="primary"
                        className="w-20"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
