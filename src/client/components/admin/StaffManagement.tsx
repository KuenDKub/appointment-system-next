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
  Switch,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  getStaffAction,
  toggleStaffStatusAction,
} from "@/client/actions/staff-actions";

export function StaffManagement() {
  const [staff, setStaff] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const result = await getStaffAction({
          page: 1,
          limit: 100,
          search: "",
          position: "",
          isActive: undefined,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        if (result.success && "staff" in result) {
          setStaff(result.staff);
        }
      } catch (error) {
        console.error("Error loading staff:", error);
        // Set empty array on error
        setStaff([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadStaff();
  }, []);

  const filteredStaff = staff.filter(
    (member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการพนักงาน</h1>
        <p className="text-gray-600">จัดการข้อมูลพนักงานทั้งหมดในระบบ</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">{staff.length}</div>
            <div className="text-blue-100">พนักงานทั้งหมด</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">
              {staff.filter((s) => s.isActive).length}
            </div>
            <div className="text-green-100">พนักงานที่ทำงาน</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">
              {staff.reduce((sum, s) => sum + s.totalBookings, 0)}
            </div>
            <div className="text-purple-100">การจองทั้งหมด</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">
              {(
                staff.reduce((sum, s) => sum + s.rating, 0) / staff.length
              ).toFixed(1)}
            </div>
            <div className="text-yellow-100">คะแนนเฉลี่ย</div>
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
          placeholder="ค้นหาพนักงาน..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          variant="bordered"
        />
        <Button color="primary" className="btn-primary">
          + เพิ่มพนักงานใหม่
        </Button>
      </motion.div>

      {/* Staff Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredStaff.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar
                    name={`${member.firstName} ${member.lastName}`}
                    size="md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{member.position}</p>
                  </div>
                </div>
                <Switch
                  isSelected={member.isActive}
                  onValueChange={() => {}}
                  color="success"
                />
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">📧</span>
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">📞</span>
                  <span className="text-sm">{member.phone}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {member.totalBookings}
                    </div>
                    <div className="text-xs text-gray-500">การจอง</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">
                      {member.rating}
                    </div>
                    <div className="text-xs text-gray-500">คะแนน</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="bordered"
                  color="primary"
                  className="flex-1"
                >
                  แก้ไข
                </Button>
                <Button
                  size="sm"
                  variant="bordered"
                  color="secondary"
                  className="flex-1"
                >
                  ดูตาราง
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
