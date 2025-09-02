"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOutAction } from "@/client/actions/auth-actions";
import { useRouter, usePathname } from "next/navigation";
import {
  Card,
  CardBody,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "แดชบอร์ด", href: "/admin", icon: "📊" },
  { name: "จัดการการจอง", href: "/admin/bookings", icon: "📅" },
  { name: "จัดการบริการ", href: "/admin/services", icon: "💅" },
  { name: "จัดการลูกค้า", href: "/admin/customers", icon: "👥" },
  { name: "จัดการพนักงาน", href: "/admin/staff", icon: "👷" },
  { name: "รายงาน", href: "/admin/reports", icon: "📈" },
  { name: "การแจ้งเตือน", href: "/admin/notifications", icon: "🔔" },
  { name: "การชำระเงิน", href: "/admin/payments", icon: "💳" },
  { name: "ผู้ใช้งาน", href: "/admin/users", icon: "👤" },
  { name: "การตั้งค่า", href: "/admin/settings", icon: "⚙️" },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOutAction();
    router.push("/");
  };

  const isActiveRoute = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardBody className="text-center p-8">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ต้องเข้าสู่ระบบ
            </h1>
            <p className="text-gray-600 mb-6">
              กรุณาเข้าสู่ระบบเพื่อเข้าถึงส่วนผู้ดูแลระบบ
            </p>
            <Button
              color="primary"
              onClick={() => router.push("/auth/signin")}
              className="w-full"
            >
              เข้าสู่ระบบ
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <div className="text-2xl font-bold text-pink-600">🎀 สปาแอดมิน</div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={isActiveRoute(item.href) ? "solid" : "light"}
                color={isActiveRoute(item.href) ? "primary" : "default"}
                className={`w-full justify-start ${
                  isActiveRoute(item.href) ? "bg-pink-100 text-pink-700" : ""
                }`}
                onClick={() => {
                  router.push(item.href);
                  setSidebarOpen(false);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <Dropdown placement="top-end">
              <DropdownTrigger>
                <Button variant="light" className="w-full justify-start">
                  <Avatar
                    name={session.user?.name || "User"}
                    size="sm"
                    className="mr-3"
                  />
                  <div className="text-left">
                    <div className="font-medium text-sm">
                      {session.user?.name || "User"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {session.user?.email || "user@example.com"}
                    </div>
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User actions">
                <DropdownItem key="profile">โปรไฟล์</DropdownItem>
                <DropdownItem key="settings">การตั้งค่า</DropdownItem>
                <Divider />
                <DropdownItem
                  key="signout"
                  color="danger"
                  onClick={handleSignOut}
                >
                  ออกจากระบบ
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <Button
              variant="light"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </Button>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                ยินดีต้อนรับ, {session.user?.name || "User"}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
