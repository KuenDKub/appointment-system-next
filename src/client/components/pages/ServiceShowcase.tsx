"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    name: "ทำเล็บ",
    description: "ทำเล็บสวยงามด้วยเทคนิคสมัยใหม่",
    price: "฿300-800",
    duration: "45-90 นาที",
    icon: "💅",
  },
  {
    id: 2,
    name: "สปาเท้า",
    description: "ผ่อนคลายเท้าด้วยการนวดและสปา",
    price: "฿500-1,200",
    duration: "60-90 นาที",
    icon: "🦶",
  },
  {
    id: 3,
    name: "นวดตัว",
    description: "นวดผ่อนคลายกล้ามเนื้อทั้งตัว",
    price: "฿800-2,000",
    duration: "90-120 นาที",
    icon: "💆‍♀️",
  },
  {
    id: 4,
    name: "ฟาเซียล",
    description: "ดูแลผิวหน้าด้วยผลิตภัณฑ์คุณภาพ",
    price: "฿600-1,500",
    duration: "60-90 นาที",
    icon: "✨",
  },
];

export function ServiceShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            บริการของเรา
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            บริการครบครันด้วยทีมงานมืออาชีพ พร้อมอุปกรณ์ที่ทันสมัย
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-2">
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.name}
                  </h3>
                </CardHeader>
                <CardBody className="text-center pt-0">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-pink-600">
                      {service.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      ⏱️ {service.duration}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
