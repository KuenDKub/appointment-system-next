"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  getBookingsAction,
  confirmBookingAction,
  completeBookingAction,
  cancelBookingAction,
} from "@/client/actions/booking-actions";

const statusColors = {
  PENDING: "warning",
  CONFIRMED: "primary",
  COMPLETED: "success",
  CANCELLED: "danger",
  NO_SHOW: "default",
};

export function BookingsManagement() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const result = await getBookingsAction({
          page: 1,
          limit: 100,
          status: undefined,
          dateFrom: undefined,
          dateTo: undefined,
        });
        if (result.success && "bookings" in result) {
          setBookings(result.bookings);
        }
      } catch (error) {
        console.error("Error loading bookings:", error);
        // Set empty array on error
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadBookings();
  }, []);

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filterStatus);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการการจอง</h1>
        <p className="text-gray-600">จัดการการจองทั้งหมดในระบบ</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          placeholder="ค้นหาลูกค้า..."
          className="max-w-xs"
          variant="bordered"
        />
        <Select
          placeholder="สถานะ"
          selectedKeys={[filterStatus]}
          onSelectionChange={(keys) =>
            setFilterStatus(Array.from(keys)[0] as string)
          }
          className="max-w-xs"
          variant="bordered"
        >
          <SelectItem key="all">ทั้งหมด</SelectItem>
          <SelectItem key="PENDING">รอดำเนินการ</SelectItem>
          <SelectItem key="CONFIRMED">ยืนยันแล้ว</SelectItem>
          <SelectItem key="COMPLETED">เสร็จสิ้น</SelectItem>
          <SelectItem key="CANCELLED">ยกเลิก</SelectItem>
        </Select>
        <Button color="primary" className="btn-primary">
          + เพิ่มการจองใหม่
        </Button>
      </motion.div>

      {/* Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">รายการการจอง</h2>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-medium">ลูกค้า</th>
                    <th className="text-left p-3 font-medium">บริการ</th>
                    <th className="text-left p-3 font-medium">พนักงาน</th>
                    <th className="text-left p-3 font-medium">วันที่</th>
                    <th className="text-left p-3 font-medium">เวลา</th>
                    <th className="text-left p-3 font-medium">สถานะ</th>
                    <th className="text-left p-3 font-medium">ราคา</th>
                    <th className="text-left p-3 font-medium">การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3">{booking.customerName}</td>
                      <td className="p-3">{booking.service}</td>
                      <td className="p-3">{booking.staff}</td>
                      <td className="p-3">{booking.date}</td>
                      <td className="p-3">{booking.time}</td>
                      <td className="p-3">
                        <Chip
                          color={
                            statusColors[
                              booking.status as keyof typeof statusColors
                            ] as any
                          }
                          variant="flat"
                          size="sm"
                        >
                          {booking.status}
                        </Chip>
                      </td>
                      <td className="p-3 font-medium">{booking.price}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="bordered" color="primary">
                            แก้ไข
                          </Button>
                          <Button size="sm" variant="bordered" color="danger">
                            ยกเลิก
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
