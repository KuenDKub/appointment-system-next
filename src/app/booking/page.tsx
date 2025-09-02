"use client";

import { useState, useEffect } from "react";
import { getServicesAction } from "@/client/actions/service-actions";
import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { motion } from "framer-motion";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const result = await getServicesAction({
          page: 1,
          limit: 100,
          search: "",
          category: "",
          isActive: true,
        });
        if (result.success && "services" in result) {
          setServices(result.services);
        }
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadServices();
  }, []);

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    // TODO: Implement booking submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            จองคิวบริการ
          </h1>
          <p className="text-lg text-gray-600">เลือกบริการและเวลาที่ต้องการ</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เลือกบริการ
                </label>
                <Select
                  placeholder="เลือกบริการ"
                  selectedKeys={formData.service ? [formData.service] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setFormData({ ...formData, service: selected });
                  }}
                >
                  {services.map((service) => (
                    <SelectItem key={service.id}>
                      {service.name} - {service.duration} นาที - ฿
                      {service.price}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  วันที่
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เวลา
                </label>
                <Select
                  placeholder="เลือกเวลา"
                  selectedKeys={formData.time ? [formData.time] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setFormData({ ...formData, time: selected });
                  }}
                >
                  {timeSlots.map((time) => (
                    <SelectItem key={time}>{time}</SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมายเหตุ (ไม่บังคับ)
                </label>
                <Textarea
                  placeholder="ระบุความต้องการพิเศษหรือหมายเหตุ"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                color="primary"
                size="lg"
                className="w-full"
                disabled={!formData.service || !formData.date || !formData.time}
              >
                ยืนยันการจอง
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
