"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="text-gradient">ระบบจองคิว</span>
            <br />
            ร้านสปาและทำเล็บ
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            จองคิวออนไลน์ง่ายๆ รับการแจ้งเตือนแบบเรียลไทม์
            ไม่ต้องรอคิวนานอีกต่อไป
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="btn-primary text-lg px-8 py-4"
              href="/booking"
            >
              จองคิวเลย
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="btn-secondary text-lg px-8 py-4"
              href="/queue"
            >
              ดูคิวปัจจุบัน
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
