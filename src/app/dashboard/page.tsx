"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";

const mockBookings = [
  {
    id: "1",
    service: "ทำเล็บ",
    date: "2024-01-20",
    time: "14:00",
    status: "CONFIRMED",
    staff: "คุณสมชาย",
  },
  {
    id: "2",
    service: "สปาเท้า",
    date: "2024-01-25",
    time: "15:00",
    status: "PENDING",
    staff: "คุณสมหญิง",
  },
];

const mockServices = [
  {
    id: "1",
    name: "ทำเล็บ",
    price: "฿500",
    duration: "60 นาที",
    description: "ทำเล็บสวยงามด้วยเทคนิคสมัยใหม่",
  },
  {
    id: "2",
    name: "สปาเท้า",
    price: "฿800",
    duration: "90 นาที",
    description: "ผ่อนคลายเท้าด้วยการนวดและสปา",
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🎀 สวัสดี, {session.user?.name || "ลูกค้า"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="bordered"
                color="primary"
                onClick={() => router.push("/")}
              >
                กลับหน้าหลัก
              </Button>
              <Button
                color="danger"
                variant="bordered"
                onClick={() => router.push("/api/auth/signout")}
              >
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">การดำเนินการด่วน</h2>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      color="primary"
                      className="h-20 text-lg"
                      onClick={() => router.push("/booking")}
                    >
                      📅 จองคิวใหม่
                    </Button>
                    <Button
                      color="secondary"
                      className="h-20 text-lg"
                      onClick={() => router.push("/services")}
                    >
                      💅 ดูบริการ
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">การจองล่าสุด</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    {mockBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium">{booking.service}</h3>
                          <p className="text-sm text-gray-600">
                            {booking.date} เวลา {booking.time}
                          </p>
                          <p className="text-sm text-gray-500">
                            พนักงาน: {booking.staff}
                          </p>
                        </div>
                        <Chip
                          color={
                            booking.status === "CONFIRMED"
                              ? "success"
                              : "warning"
                          }
                          variant="flat"
                        >
                          {booking.status === "CONFIRMED"
                            ? "ยืนยันแล้ว"
                            : "รอดำเนินการ"}
                        </Chip>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">ข้อมูลโปรไฟล์</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">อีเมล</p>
                      <p className="font-medium">{session.user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">สถานะ</p>
                      <Chip color="success" variant="flat" size="sm">
                        ใช้งาน
                      </Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Popular Services */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">บริการยอดนิยม</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    {mockServices.map((service) => (
                      <div
                        key={service.id}
                        className="p-3 border border-gray-200 rounded-lg"
                      >
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-gray-600">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-pink-600 font-bold">
                            {service.price}
                          </span>
                          <span className="text-xs text-gray-500">
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
