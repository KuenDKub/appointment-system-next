"use client";

import { Button, Input, Textarea } from "@heroui/react";
import { motion } from "framer-motion";

export function ContactSection() {
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
            ติดต่อเรา
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            มีคำถามหรือต้องการความช่วยเหลือ? ติดต่อเราได้เลย
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                ส่งข้อความถึงเรา
              </h3>
              <form className="space-y-4">
                <Input
                  type="text"
                  label="ชื่อ"
                  placeholder="ชื่อของคุณ"
                  variant="bordered"
                />
                <Input
                  type="email"
                  label="อีเมล"
                  placeholder="your@email.com"
                  variant="bordered"
                />
                <Input
                  type="tel"
                  label="เบอร์โทรศัพท์"
                  placeholder="081-234-5678"
                  variant="bordered"
                />
                <Textarea
                  label="ข้อความ"
                  placeholder="เขียนข้อความของคุณที่นี่..."
                  variant="bordered"
                  minRows={4}
                />
                <Button type="submit" className="btn-primary w-full" size="lg">
                  ส่งข้อความ
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                ข้อมูลติดต่อ
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">ที่อยู่</p>
                    <p className="text-gray-600">
                      123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">เบอร์โทรศัพท์</p>
                    <p className="text-gray-600">02-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    ✉️
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">อีเมล</p>
                    <p className="text-gray-600">info@spa-appointment.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    🕒
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">เวลาทำการ</p>
                    <p className="text-gray-600">
                      จันทร์-อาทิตย์ 9:00-21:00 น.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
