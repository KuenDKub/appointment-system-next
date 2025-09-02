"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { getDashboardStatsAction } from "@/client/actions/dashboard-actions";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Button } from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";
import { Avatar } from "@heroui/react";
import { Chip } from "@heroui/react";
import { RealTimeNotification } from "@/client/components/notifications/RealTimeNotification";
import {
  UserIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export function CustomerDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const loadStats = async () => {
      if (session?.user?.id) {
        const result = await getDashboardStatsAction();
        if (result.success && "stats" in result) {
          setStats(result.stats);
        }
      }
    };
    loadStats();
  }, [session?.user?.id]);

  // Mock data - ในอนาคตจะดึงจาก API
  const mockBookings = [
    {
      id: "1",
      serviceName: "ทำเล็บเจล",
      date: "2024-01-15",
      time: "14:00",
      status: "CONFIRMED",
      staffName: "คุณสมหญิง",
      price: 350,
    },
    {
      id: "2",
      serviceName: "นวดสปา",
      date: "2024-01-20",
      time: "10:00",
      status: "PENDING",
      staffName: "คุณสมชาย",
      price: 800,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "success";
      case "PENDING":
        return "warning";
      case "CANCELLED":
        return "danger";
      case "COMPLETED":
        return "primary";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "ยืนยันแล้ว";
      case "PENDING":
        return "รอยืนยัน";
      case "CANCELLED":
        return "ยกเลิก";
      case "COMPLETED":
        return "เสร็จสิ้น";
      default:
        return status;
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar
                name={session.user?.name || "User"}
                size="md"
                color="primary"
              />
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  สวัสดี, {session.user?.name || "User"}!
                </h1>
                <p className="text-sm text-gray-600">จัดการการจองคิว</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RealTimeNotification />
              <Button isIconOnly variant="bordered" color="primary" size="sm">
                <CogIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="bg-white shadow-sm border-b hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Avatar
                name={session.user?.name || "User"}
                size="lg"
                color="primary"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  สวัสดี, {session.user?.name || "User"}!
                </h1>
                <p className="text-gray-600">จัดการการจองคิวและข้อมูลส่วนตัว</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="bordered"
                color="primary"
                startContent={<CogIcon className="w-5 h-5" />}
              >
                ตั้งค่า
              </Button>
              <Button
                variant="bordered"
                color="danger"
                startContent={<ArrowRightOnRectangleIcon className="w-5 h-5" />}
                onClick={handleSignOut}
              >
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        {/* Mobile Quick Actions */}
        <div className="lg:hidden mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Button
              color="primary"
              className="w-full h-12"
              startContent={<CalendarIcon className="w-5 h-5" />}
            >
              จองคิวใหม่
            </Button>
            <Button
              variant="bordered"
              color="primary"
              className="w-full h-12"
              startContent={<CogIcon className="w-5 h-5" />}
            >
              ตั้งค่า
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Card - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <h2 className="text-lg font-semibold">ข้อมูลส่วนตัว</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-center space-x-3">
                  <UserIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    {session.user?.name || "User"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{session.user?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">081-234-5678</span>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    color="primary"
                    variant="bordered"
                    className="w-full"
                    startContent={<CogIcon className="w-4 h-4" />}
                  >
                    แก้ไขข้อมูลส่วนตัว
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-2">
            <Tabs
              selectedKey="bookings"
              className="w-full"
              variant="bordered"
              color="primary"
              size="lg"
              classNames={{
                tabList:
                  "gap-4 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-primary",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-primary",
              }}
            >
              <Tab
                key="bookings"
                title={
                  <div className="flex items-center gap-2 px-4">
                    <CalendarIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">การจองคิวของฉัน</span>
                    <span className="sm:hidden">จองคิว</span>
                  </div>
                }
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">การจองคิวล่าสุด</h3>
                    <Button color="primary" size="sm">
                      จองคิวใหม่
                    </Button>
                  </div>

                  {mockBookings.length === 0 ? (
                    <Card>
                      <CardBody className="text-center py-8">
                        <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          ยังไม่มีการจองคิว
                        </h3>
                        <p className="text-gray-500 mb-4">
                          เริ่มต้นการจองคิวบริการของเราได้เลย
                        </p>
                        <Button color="primary">จองคิวใหม่</Button>
                      </CardBody>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {mockBookings.map((booking) => (
                        <Card
                          key={booking.id}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardBody className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-gray-900 text-base">
                                  {booking.serviceName}
                                </h4>
                                <Chip
                                  color={getStatusColor(booking.status)}
                                  variant="flat"
                                  size="sm"
                                >
                                  {getStatusText(booking.status)}
                                </Chip>
                              </div>

                              <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                  <div className="flex items-center space-x-2">
                                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                                    <span>{booking.date}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <ClockIcon className="w-4 h-4 text-gray-400" />
                                    <span>{booking.time}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <UserIcon className="w-4 h-4 text-gray-400" />
                                  <span>{booking.staffName}</span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                <div className="text-lg font-semibold text-primary">
                                  ฿{booking.price}
                                </div>
                                <Button
                                  size="sm"
                                  variant="bordered"
                                  color="primary"
                                >
                                  ดูรายละเอียด
                                </Button>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </Tab>

              <Tab
                key="history"
                title={
                  <div className="flex items-center gap-2 px-4">
                    <ClockIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">ประวัติการใช้งาน</span>
                    <span className="sm:hidden">ประวัติ</span>
                  </div>
                }
              >
                <div className="text-center py-8">
                  <ClockIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    ยังไม่มีประวัติการใช้งาน
                  </h3>
                  <p className="text-gray-500">
                    ประวัติการจองคิวและบริการจะแสดงที่นี่
                  </p>
                </div>
              </Tab>

              <Tab
                key="favorites"
                title={
                  <div className="flex items-center gap-2 px-4">
                    <MapPinIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">บริการที่ชื่นชอบ</span>
                    <span className="sm:hidden">ชื่นชอบ</span>
                  </div>
                }
              >
                <div className="text-center py-8">
                  <MapPinIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    ยังไม่มีบริการที่ชื่นชอบ
                  </h3>
                  <p className="text-gray-500">
                    บริการที่คุณชื่นชอบจะแสดงที่นี่
                  </p>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
