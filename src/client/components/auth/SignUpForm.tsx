"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/react";
import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import { Checkbox } from "@heroui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  UserIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { signUpAction } from "@/client/actions/auth-actions";

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    marketingConsent: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      setIsLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError("ต้องยอมรับเงื่อนไขการใช้งาน");
      setIsLoading(false);
      return;
    }

    try {
      // ใช้ Server Action
      const result = await signUpAction({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (!result.success) {
        throw new Error("เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }

      setSuccess("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");

      // Redirect ไปหน้า signin หลังจาก 2 วินาที
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาดในการสมัครสมาชิก"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center text-gray-800">
          สร้างบัญชีใหม่
        </h2>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              label="ชื่อ"
              placeholder="ชื่อของคุณ"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
              variant="bordered"
              color="primary"
              startContent={<UserIcon className="w-4 h-4 text-gray-400" />}
            />

            <Input
              type="text"
              label="นามสกุล"
              placeholder="นามสกุลของคุณ"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
              variant="bordered"
              color="primary"
              startContent={<UserIcon className="w-4 h-4 text-gray-400" />}
            />
          </div>

          <Input
            type="email"
            label="อีเมล"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            variant="bordered"
            color="primary"
            startContent={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
          />

          <Input
            type="tel"
            label="เบอร์โทรศัพท์"
            placeholder="081-234-5678"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
            variant="bordered"
            color="primary"
            startContent={<PhoneIcon className="w-5 h-5 text-gray-400" />}
          />

          <Input
            type={showPassword ? "text" : "password"}
            label="รหัสผ่าน"
            placeholder="รหัสผ่านของคุณ"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
            variant="bordered"
            color="primary"
            startContent={<ShieldCheckIcon className="w-5 h-5 text-gray-400" />}
            endContent={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
            }
          />

          <Input
            type={showConfirmPassword ? "text" : "password"}
            label="ยืนยันรหัสผ่าน"
            placeholder="ยืนยันรหัสผ่านของคุณ"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            required
            variant="bordered"
            color="primary"
            startContent={<ShieldCheckIcon className="w-5 h-5 text-gray-400" />}
            endContent={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="focus:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
            }
          />

          <div className="space-y-3">
            <Checkbox
              isSelected={formData.acceptTerms}
              onValueChange={(value) => handleInputChange("acceptTerms", value)}
              color="primary"
            >
              <span className="text-sm text-gray-700">
                ฉันยอมรับ{" "}
                <a
                  href="/terms"
                  className="text-indigo-600 hover:text-indigo-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  เงื่อนไขการใช้งาน
                </a>{" "}
                และ{" "}
                <a
                  href="/privacy"
                  className="text-indigo-600 hover:text-indigo-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  นโยบายความเป็นส่วนตัว
                </a>
              </span>
            </Checkbox>

            <Checkbox
              isSelected={formData.marketingConsent}
              onValueChange={(value) =>
                handleInputChange("marketingConsent", value)
              }
              color="primary"
            >
              <span className="text-sm text-gray-700">
                ฉันยินยอมรับการส่งข้อมูลข่าวสารและโปรโมชั่นทางอีเมล
              </span>
            </Checkbox>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-500 text-sm text-center bg-green-50 p-3 rounded-lg">
              {success}
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            สมัครสมาชิก
          </Button>
        </form>
      </CardBody>

      <CardFooter>
        <div className="w-full text-center">
          <p className="text-xs text-gray-500">
            การสมัครสมาชิกถือว่าคุณยอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัวของเรา
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
