"use client";

import { useState } from "react";
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

const mockPayments = [
  {
    id: "1",
    customerName: "คุณสมหญิง",
    service: "ทำเล็บ",
    amount: "฿500",
    method: "CASH",
    status: "COMPLETED",
    date: "2024-01-15",
    time: "14:30",
    invoiceNumber: "INV-001",
  },
  {
    id: "2",
    customerName: "คุณสมชาย",
    service: "สปาเท้า",
    amount: "฿800",
    method: "CREDIT_CARD",
    status: "PENDING",
    date: "2024-01-15",
    time: "15:00",
    invoiceNumber: "INV-002",
  },
  {
    id: "3",
    customerName: "คุณสมศรี",
    service: "นวดตัว",
    amount: "฿1,200",
    method: "BANK_TRANSFER",
    status: "COMPLETED",
    date: "2024-01-15",
    time: "16:00",
    invoiceNumber: "INV-003",
  },
];

const paymentMethods = {
  CASH: { label: "เงินสด", color: "success" },
  CREDIT_CARD: { label: "บัตรเครดิต", color: "primary" },
  BANK_TRANSFER: { label: "โอนเงิน", color: "secondary" },
  QR_CODE: { label: "QR Code", color: "warning" },
};

const paymentStatus = {
  PENDING: { label: "รอชำระ", color: "warning" },
  COMPLETED: { label: "เสร็จสิ้น", color: "success" },
  FAILED: { label: "ล้มเหลว", color: "danger" },
  REFUNDED: { label: "คืนเงิน", color: "default" },
};

export function PaymentsManagement() {
  const [payments] = useState(mockPayments);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");

  const filteredPayments = payments.filter((payment) => {
    const statusMatch =
      filterStatus === "all" || payment.status === filterStatus;
    const methodMatch =
      filterMethod === "all" || payment.method === filterMethod;
    return statusMatch && methodMatch;
  });

  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce(
      (sum, p) => sum + parseInt(p.amount.replace("฿", "").replace(",", "")),
      0
    );

  const pendingPayments = payments.filter((p) => p.status === "PENDING").length;

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          จัดการการชำระเงิน
        </h1>
        <p className="text-gray-600">จัดการการชำระเงินและการออกใบแจ้งหนี้</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">
              ฿{totalRevenue.toLocaleString()}
            </div>
            <div className="text-green-100">รายได้รวม</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">{payments.length}</div>
            <div className="text-blue-100">การชำระเงินทั้งหมด</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">{pendingPayments}</div>
            <div className="text-yellow-100">รอชำระ</div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          placeholder="ค้นหาลูกค้าหรือเลขที่ใบแจ้งหนี้..."
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
          <SelectItem key="PENDING">รอชำระ</SelectItem>
          <SelectItem key="COMPLETED">เสร็จสิ้น</SelectItem>
          <SelectItem key="FAILED">ล้มเหลว</SelectItem>
          <SelectItem key="REFUNDED">คืนเงิน</SelectItem>
        </Select>
        <Select
          placeholder="วิธีการชำระ"
          selectedKeys={[filterMethod]}
          onSelectionChange={(keys) =>
            setFilterMethod(Array.from(keys)[0] as string)
          }
          className="max-w-xs"
          variant="bordered"
        >
          <SelectItem key="all">ทั้งหมด</SelectItem>
          <SelectItem key="CASH">เงินสด</SelectItem>
          <SelectItem key="CREDIT_CARD">บัตรเครดิต</SelectItem>
          <SelectItem key="BANK_TRANSFER">โอนเงิน</SelectItem>
          <SelectItem key="QR_CODE">QR Code</SelectItem>
        </Select>
        <Button color="primary" className="btn-primary">
          📄 สร้างใบแจ้งหนี้
        </Button>
      </motion.div>

      {/* Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">รายการการชำระเงิน</h2>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-medium">ลูกค้า</th>
                    <th className="text-left p-3 font-medium">บริการ</th>
                    <th className="text-left p-3 font-medium">จำนวนเงิน</th>
                    <th className="text-left p-3 font-medium">วิธีการชำระ</th>
                    <th className="text-left p-3 font-medium">สถานะ</th>
                    <th className="text-left p-3 font-medium">วันที่</th>
                    <th className="text-left p-3 font-medium">
                      เลขที่ใบแจ้งหนี้
                    </th>
                    <th className="text-left p-3 font-medium">การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3">{payment.customerName}</td>
                      <td className="p-3">{payment.service}</td>
                      <td className="p-3 font-bold text-green-600">
                        {payment.amount}
                      </td>
                      <td className="p-3">
                        <Chip
                          color={
                            paymentMethods[
                              payment.method as keyof typeof paymentMethods
                            ]?.color as any
                          }
                          variant="flat"
                          size="sm"
                        >
                          {
                            paymentMethods[
                              payment.method as keyof typeof paymentMethods
                            ]?.label
                          }
                        </Chip>
                      </td>
                      <td className="p-3">
                        <Chip
                          color={
                            paymentStatus[
                              payment.status as keyof typeof paymentStatus
                            ]?.color as any
                          }
                          variant="flat"
                          size="sm"
                        >
                          {
                            paymentStatus[
                              payment.status as keyof typeof paymentStatus
                            ]?.label
                          }
                        </Chip>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          <div>{payment.date}</div>
                          <div className="text-gray-500">{payment.time}</div>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-sm">
                        {payment.invoiceNumber}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="bordered" color="primary">
                            ดูรายละเอียด
                          </Button>
                          <Button
                            size="sm"
                            variant="bordered"
                            color="secondary"
                          >
                            ส่งใบแจ้งหนี้
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
