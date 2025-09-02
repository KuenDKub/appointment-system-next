"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Chip,
} from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signUpAction } from "@/client/actions/auth-actions";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUpAction({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      } else {
        setError("เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }
    } catch (error: any) {
      setError(error.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl text-center">
            <CardBody className="p-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                สมัครสมาชิกสำเร็จ!
              </h1>
              <p className="text-gray-600 mb-4">
                บัญชีของคุณได้ถูกสร้างเรียบร้อยแล้ว
              </p>
              <Chip color="success" variant="flat">
                กำลังเปลี่ยนเส้นทางไปหน้าล็อกอิน...
              </Chip>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="text-4xl mb-2">🎀</div>
            <h1 className="text-2xl font-bold text-gray-900">สมัครสมาชิก</h1>
            <p className="text-gray-600">
              สร้างบัญชีใหม่เพื่อเริ่มใช้งานระบบจองคิว
            </p>
          </CardHeader>
          <CardBody className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ชื่อ"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  required
                  variant="bordered"
                  placeholder="ชื่อ"
                />
                <Input
                  label="นามสกุล"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  required
                  variant="bordered"
                  placeholder="นามสกุล"
                />
              </div>

              <Input
                label="อีเมล"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                variant="bordered"
                placeholder="your@email.com"
              />

              <Input
                label="เบอร์โทรศัพท์"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                variant="bordered"
                placeholder="081-234-5678"
              />

              <Input
                label="รหัสผ่าน"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                variant="bordered"
                placeholder="••••••••"
                minLength={8}
              />

              <Input
                label="ยืนยันรหัสผ่าน"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                required
                variant="bordered"
                placeholder="••••••••"
                minLength={8}
              />

              {error && (
                <Chip color="danger" variant="flat" className="w-full">
                  {error}
                </Chip>
              )}

              <Button
                type="submit"
                color="primary"
                className="w-full btn-primary"
                size="lg"
                isLoading={isLoading}
              >
                {isLoading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
              </Button>
            </form>

            <Divider />

            <div className="text-center">
              <p className="text-sm text-gray-600">
                มีบัญชีอยู่แล้ว?{" "}
                <Link
                  href="/auth/signin"
                  className="text-pink-600 hover:text-pink-700 transition-colors"
                >
                  เข้าสู่ระบบ
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
