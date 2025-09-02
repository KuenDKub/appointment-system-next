"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { motion } from "framer-motion";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement forgot password logic
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-4">📧</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ตรวจสอบอีเมลของคุณ
        </h2>
        <p className="text-gray-600 mb-6">
          เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว
        </p>
        <Button variant="bordered" onClick={() => setIsSubmitted(false)}>
          ส่งใหม่
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ลืมรหัสผ่าน?</h2>
        <p className="text-gray-600">
          กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับรีเซ็ตรหัสผ่าน
        </p>
      </div>

      <Input
        type="email"
        label="อีเมล"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        variant="bordered"
      />

      <Button type="submit" className="w-full btn-primary" size="lg">
        ส่งลิงก์รีเซ็ตรหัสผ่าน
      </Button>
    </motion.form>
  );
}
