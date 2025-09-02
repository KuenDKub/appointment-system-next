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
  Select,
  SelectItem,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  getUsersAction,
  updateUserRoleAction,
} from "@/client/actions/user-actions";

const userRoles = {
  ADMIN: { label: "ผู้ดูแลระบบ", color: "danger" },
  STAFF: { label: "พนักงาน", color: "primary" },
  CUSTOMER: { label: "ลูกค้า", color: "secondary" },
};

const permissions: string[] = [
  "manage_users",
  "manage_bookings",
  "manage_services",
  "manage_reports",
  "view_bookings",
  "make_bookings",
  "view_history",
];

export function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await getUsersAction({
          page: 1,
          limit: 100,
          search: "",
          role: undefined,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        if (result.success && "users" in result) {
          setUsers(result.users);
        }
      } catch (error) {
        console.error("Error loading users:", error);
        // Set empty array on error
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = filterRole === "all" || user.role === filterRole;
    return searchMatch && roleMatch;
  });

  const activeUsers = users.filter((u) => u.isActive).length;
  const totalUsers = users.length;

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          จัดการผู้ใช้งาน
        </h1>
        <p className="text-gray-600">จัดการผู้ใช้งานและสิทธิ์การเข้าถึงระบบ</p>
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
            <div className="text-3xl font-bold">{totalUsers}</div>
            <div className="text-blue-100">ผู้ใช้งานทั้งหมด</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">{activeUsers}</div>
            <div className="text-green-100">ผู้ใช้งานที่ใช้งาน</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardBody className="p-6">
            <div className="text-3xl font-bold">
              {users.filter((u) => u.role === "ADMIN").length}
            </div>
            <div className="text-purple-100">ผู้ดูแลระบบ</div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          placeholder="ค้นหาผู้ใช้งาน..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          variant="bordered"
        />
        <Select
          placeholder="บทบาท"
          selectedKeys={[filterRole]}
          onSelectionChange={(keys) =>
            setFilterRole(Array.from(keys)[0] as string)
          }
          className="max-w-xs"
          variant="bordered"
        >
          <SelectItem key="all">ทั้งหมด</SelectItem>
          <SelectItem key="ADMIN">ผู้ดูแลระบบ</SelectItem>
          <SelectItem key="STAFF">พนักงาน</SelectItem>
          <SelectItem key="CUSTOMER">ลูกค้า</SelectItem>
        </Select>
        <Button color="primary" className="btn-primary">
          + เพิ่มผู้ใช้งานใหม่
        </Button>
      </motion.div>

      {/* Users Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar
                    name={`${user.firstName} ${user.lastName}`}
                    size="md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Chip
                    color={
                      userRoles[user.role as keyof typeof userRoles]
                        ?.color as any
                    }
                    variant="flat"
                    size="sm"
                  >
                    {userRoles[user.role as keyof typeof userRoles]?.label}
                  </Chip>
                  <Switch
                    isSelected={user.isActive}
                    onValueChange={() => {}}
                    color="success"
                  />
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">🕒</span>
                  <span className="text-sm">
                    เข้าสู่ระบบล่าสุด: {user.lastLogin}
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-700">
                    สิทธิ์การเข้าถึง:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.map((permission: string) => (
                      <Chip
                        key={permission}
                        size="sm"
                        variant="flat"
                        color="default"
                      >
                        {permission}
                      </Chip>
                    ))}
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
                  ดูประวัติ
                </Button>
                <Button
                  size="sm"
                  variant="bordered"
                  color="danger"
                  className="flex-1"
                >
                  ลบ
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
