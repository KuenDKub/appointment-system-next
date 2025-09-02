"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, Button, Input, Divider, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState<"customer" | "admin">("customer");
  
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect if already signed in
  if (session) {
    if (session.user?.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        userType,
        redirect: false,
      });

      if (result?.error) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else {
        // Redirect based on user type
        if (userType === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1 className="text-2xl font-bold text-gray-900">
              เข้าสู่ระบบ
            </h1>
            <p className="text-gray-600">
              เข้าสู่ระบบเพื่อใช้งานระบบจองคิว
            </p>
          </CardHeader>
          <CardBody className="space-y-6">
            {/* User Type Selection */}
            <div className="flex gap-2">
              <Button
                variant={userType === "customer" ? "solid" : "bordered"}
                color={userType === "customer" ? "primary" : "default"}
                onClick={() => setUserType("customer")}
                className="flex-1"
              >
                👤 ลูกค้า
              </Button>
              <Button
                variant={userType === "admin" ? "solid" : "bordered"}
                color={userType === "admin" ? "primary" : "default"}
                onClick={() => setUserType("admin")}
                className="flex-1"
              >
                👑 ผู้ดูแลระบบ
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="อีเมล"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="bordered"
                placeholder="your@email.com"
              />
              <Input
                label="รหัสผ่าน"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="bordered"
                placeholder="••••••••"
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
                {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </Button>
            </form>

            <Divider />

            <div className="text-center space-y-2">
              <Link 
                href="/auth/forgot-password"
                className="text-sm text-pink-600 hover:text-pink-700 transition-colors"
              >
                ลืมรหัสผ่าน?
              </Link>
              <div className="text-sm text-gray-600">
                ยังไม่มีบัญชี?{" "}
                <Link 
                  href="/auth/signup"
                  className="text-pink-600 hover:text-pink-700 transition-colors"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
} 
 
 