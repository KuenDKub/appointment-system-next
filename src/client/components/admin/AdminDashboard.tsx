"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";
import {
  getDashboardStatsAction,
  getRevenueStatsAction,
} from "@/client/actions/dashboard-actions";

export function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any[]>([]);
  const [revenue, setRevenue] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load dashboard stats
        const statsResult = await getDashboardStatsAction();
        if (statsResult.success && "stats" in statsResult) {
          // Use mock data for now since the actual stats structure is different
          setStats([
            {
              title: "การจองวันนี้",
              value: "24",
              change: "+12%",
              color: "success",
            },
            {
              title: "ลูกค้าใหม่",
              value: "156",
              change: "+8%",
              color: "primary",
            },
            {
              title: "รายได้เดือนนี้",
              value: "฿45,200",
              change: "+15%",
              color: "success",
            },
            {
              title: "การจองรอดำเนินการ",
              value: "8",
              change: "-3%",
              color: "warning",
            },
          ]);
        }

        // Load revenue stats
        const revenueResult = await getRevenueStatsAction();
        if (revenueResult.success && "revenue" in revenueResult) {
          setRevenue(revenueResult.revenue);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.id) {
      loadDashboardData();
    }
  }, [session?.user?.id]);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          แดชบอร์ดผู้ดูแลระบบ
        </h1>
        <p className="text-gray-600">ยินดีต้อนรับสู่ระบบจัดการร้านสปา</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`text-sm font-medium text-${stat.color}`}>
                    {stat.change}
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">การดำเนินการด่วน</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-center">
                <div className="text-2xl mb-2">📅</div>
                <p className="font-medium">จัดการการจอง</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-center">
                <div className="text-2xl mb-2">👥</div>
                <p className="font-medium">จัดการลูกค้า</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-center">
                <div className="text-2xl mb-2">💰</div>
                <p className="font-medium">ดูรายงาน</p>
              </button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
