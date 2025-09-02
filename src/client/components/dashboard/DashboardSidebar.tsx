"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Card,
  CardBody,
  Button
} from "@heroui/react";
import { 
  HomeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  BellIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";

const navigationItems = [
  {
    name: "แดชบอร์ด",
    href: "/admin",
    icon: HomeIcon,
    color: "primary",
  },
  {
    name: "การจองคิว",
    href: "/admin/bookings",
    icon: CalendarDaysIcon,
    color: "secondary",
  },
  {
    name: "ลูกค้า",
    href: "/admin/customers",
    icon: UserGroupIcon,
    color: "success",
  },
  {
    name: "พนักงาน",
    href: "/admin/staff",
    icon: UsersIcon,
    color: "warning",
  },
  {
    name: "บริการ",
    href: "/admin/services",
    icon: WrenchScrewdriverIcon,
    color: "accent",
  },
  {
    name: "รายงาน",
    href: "/admin/reports",
    icon: ChartBarIcon,
    color: "primary",
  },
  {
    name: "การแจ้งเตือน",
    href: "/admin/notifications",
    icon: BellIcon,
    color: "secondary",
  },
  {
    name: "การชำระเงิน",
    href: "/admin/payments",
    icon: CreditCardIcon,
    color: "success",
  },
  {
    name: "ผู้ใช้",
    href: "/admin/users",
    icon: UsersIcon,
    color: "accent",
  },
  {
    name: "ตั้งค่า",
    href: "/admin/settings",
    icon: Cog6ToothIcon,
    color: "warning",
  },
];

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <Card className="h-screen rounded-none border-r border-gray-200 bg-white">
      <CardBody className="p-0">
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="p-4 border-b border-gray-200">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full"
            >
              {isCollapsed ? "→" : "←"}
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "solid" : "light"}
                    color={isActive ? (item.color as any) : "default"}
                    className={`w-full justify-start h-12 ${
                      isActive 
                        ? `bg-${item.color}-500 text-white` 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    startContent={
                      <Icon className={`w-5 h-5 ${
                        isActive ? "text-white" : `text-${item.color}-500`
                      }`} />
                    }
                  >
                    {!isCollapsed && item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Quick Stats */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200">
              <div className="space-y-3">
                <div className="text-center p-3 bg-primary-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-600">12</p>
                  <p className="text-xs text-primary-600">คิววันนี้</p>
                </div>
                <div className="text-center p-3 bg-success-50 rounded-lg">
                  <p className="text-2xl font-bold text-success-600">8</p>
                  <p className="text-xs text-success-600">เสร็จสิ้น</p>
                </div>
                <div className="text-center p-3 bg-warning-50 rounded-lg">
                  <p className="text-2xl font-bold text-warning-600">4</p>
                  <p className="text-xs text-warning-600">รอดำเนินการ</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}




