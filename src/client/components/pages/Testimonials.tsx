"use client";

import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "คุณสมหญิง",
    service: "ทำเล็บ",
    rating: 5,
    comment: "บริการดีมาก ระบบจองคิวสะดวก ไม่ต้องรอนานเลย",
    avatar: "👩‍🦰",
  },
  {
    id: 2,
    name: "คุณสมชาย",
    service: "สปาเท้า",
    rating: 5,
    comment: "นวดเท้าได้ดีมาก ผ่อนคลายสุดๆ แนะนำเลย",
    avatar: "👨‍🦱",
  },
  {
    id: 3,
    name: "คุณสมศรี",
    service: "ฟาเซียล",
    rating: 5,
    comment: "ผิวหน้าดีขึ้นมาก ผลิตภัณฑ์คุณภาพดี",
    avatar: "👩‍🦳",
  },
];

export function Testimonials() {
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
            ความประทับใจจากลูกค้า
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ลูกค้าของเราพึงพอใจกับบริการและระบบจองคิวออนไลน์
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardBody className="text-center p-6">
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.service}
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
