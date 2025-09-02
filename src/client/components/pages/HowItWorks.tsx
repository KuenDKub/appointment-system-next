"use client";

import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "เลือกบริการ",
    description: "เลือกบริการที่ต้องการจากรายการที่หลากหลาย",
    icon: "📋",
  },
  {
    id: 2,
    title: "เลือกเวลา",
    description: "เลือกวันที่และเวลาที่สะดวกสำหรับคุณ",
    icon: "📅",
  },
  {
    id: 3,
    title: "ยืนยันการจอง",
    description: "ตรวจสอบรายละเอียดและยืนยันการจอง",
    icon: "✅",
  },
  {
    id: 4,
    title: "รับการแจ้งเตือน",
    description: "รับการแจ้งเตือนเมื่อใกล้ถึงเวลานัดหมาย",
    icon: "🔔",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            วิธีการใช้งาน
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ง่ายๆ เพียง 4 ขั้นตอน คุณก็สามารถจองคิวได้แล้ว
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-4">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transform translate-x-1/2 z-0" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
