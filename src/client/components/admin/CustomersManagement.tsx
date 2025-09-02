"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Input,
  Avatar,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  getCustomersAction,
  getCustomerStatsAction,
} from "@/client/actions/customer-actions";

export function CustomersManagement() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const result = await getCustomersAction({
          page: 1,
          limit: 100,
          search: "",
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        if (result.success && "customers" in result) {
          setCustomers(result.customers);
        }
      } catch (error) {
        console.error("Error loading customers:", error);
        // Set empty array on error
        setCustomers([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "active" ? "success" : "default";
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการลูกค้า</h1>
        <p className="text-gray-600">จัดการข้อมูลลูกค้าทั้งหมดในระบบ</p>
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
            <div className="text-3xl font-bold">{customers.length}</div>
            <div className="text-blue-100">ลูกค้าทั้งหมด</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">
              {customers.filter((c) => c.status === "active").length}
            </div>
            <div className="text-green-100">ลูกค้าที่ใช้งาน</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">
              {customers.reduce((sum, c) => sum + c.totalBookings, 0)}
            </div>
            <div className="text-purple-100">การจองทั้งหมด</div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Search and Add */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          placeholder="ค้นหาลูกค้า..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          variant="bordered"
        />
        <Button color="primary" className="btn-primary">
          + เพิ่มลูกค้าใหม่
        </Button>
      </motion.div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">รายชื่อลูกค้า</h2>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-medium">ลูกค้า</th>
                    <th className="text-left p-3 font-medium">ข้อมูลติดต่อ</th>
                    <th className="text-left p-3 font-medium">การจอง</th>
                    <th className="text-left p-3 font-medium">เยี่ยมล่าสุด</th>
                    <th className="text-left p-3 font-medium">สถานะ</th>
                    <th className="text-left p-3 font-medium">การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <Avatar
                            name={`${customer.firstName} ${customer.lastName}`}
                            size="sm"
                          />
                          <div>
                            <div className="font-medium">
                              {customer.firstName} {customer.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="text-sm">{customer.email}</div>
                          <div className="text-sm text-gray-500">
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {customer.totalBookings}
                          </div>
                          <div className="text-xs text-gray-500">ครั้ง</div>
                        </div>
                      </td>
                      <td className="p-3 text-sm">{customer.lastVisit}</td>
                      <td className="p-3">
                        <Chip
                          color={getStatusColor(customer.status) as any}
                          variant="flat"
                          size="sm"
                        >
                          {customer.status === "active"
                            ? "ใช้งาน"
                            : "ไม่ใช้งาน"}
                        </Chip>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="bordered" color="primary">
                            แก้ไข
                          </Button>
                          <Button
                            size="sm"
                            variant="bordered"
                            color="secondary"
                          >
                            ดูประวัติ
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
