"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Select,
  SelectItem,
  Progress,
} from "@heroui/react";
import { motion } from "framer-motion";

const mockData = {
  totalRevenue: "฿125,400",
  totalBookings: 156,
  averageRating: 4.7,
  customerSatisfaction: 92,
  topServices: [
    { name: "ทำเล็บ", revenue: "฿45,200", percentage: 36 },
    { name: "สปาเท้า", revenue: "฿38,800", percentage: 31 },
    { name: "นวดตัว", revenue: "฿28,400", percentage: 23 },
    { name: "ฟาเซียล", revenue: "฿13,000", percentage: 10 },
  ],
  monthlyRevenue: [
    { month: "ม.ค.", revenue: "฿18,200" },
    { month: "ก.พ.", revenue: "฿22,400" },
    { month: "มี.ค.", revenue: "฿25,800" },
    { month: "เม.ย.", revenue: "฿28,600" },
    { month: "พ.ค.", revenue: "฿30,400" },
  ],
};

export function ReportsManagement() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          รายงานและสถิติ
        </h1>
        <p className="text-gray-600">ดูข้อมูลสถิติและรายงานต่างๆ ของร้าน</p>
      </motion.div>

      {/* Period Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Select
          placeholder="เลือกช่วงเวลา"
          selectedKeys={[selectedPeriod]}
          onSelectionChange={(keys) =>
            setSelectedPeriod(Array.from(keys)[0] as string)
          }
          className="max-w-xs"
          variant="bordered"
        >
          <SelectItem key="week">สัปดาห์นี้</SelectItem>
          <SelectItem key="month">เดือนนี้</SelectItem>
          <SelectItem key="quarter">ไตรมาสนี้</SelectItem>
          <SelectItem key="year">ปีนี้</SelectItem>
        </Select>
        <Button color="primary" className="btn-primary">
          📊 ส่งออกรายงาน
        </Button>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">{mockData.totalRevenue}</div>
            <div className="text-blue-100">รายได้รวม</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">{mockData.totalBookings}</div>
            <div className="text-green-100">การจองทั้งหมด</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">{mockData.averageRating}</div>
            <div className="text-purple-100">คะแนนเฉลี่ย</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">
              {mockData.customerSatisfaction}%
            </div>
            <div className="text-yellow-100">ความพึงพอใจ</div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Top Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">บริการยอดนิยม</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {mockData.topServices.map((service, index) => (
                <div key={service.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-pink-600 font-bold">
                      {service.revenue}
                    </span>
                  </div>
                  <Progress
                    value={service.percentage}
                    color="primary"
                    className="w-full"
                    size="sm"
                  />
                  <div className="text-right text-sm text-gray-500">
                    {service.percentage}% ของรายได้รวม
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">รายได้รายเดือน</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {mockData.monthlyRevenue.map((month, index) => (
                <div
                  key={month.month}
                  className="flex justify-between items-center"
                >
                  <span className="font-medium">{month.month}</span>
                  <span className="text-green-600 font-bold">
                    {month.revenue}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Customer Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">ข้อมูลลูกค้า</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">68%</div>
                <div className="text-gray-600">ลูกค้าเก่า</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">32%</div>
                <div className="text-gray-600">ลูกค้าใหม่</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">4.2</div>
                <div className="text-gray-600">การจองเฉลี่ยต่อคน</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
