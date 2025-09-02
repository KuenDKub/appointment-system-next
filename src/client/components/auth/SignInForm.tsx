"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInAction } from "@/client/actions/auth-actions";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/react";
import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [activeTab, setActiveTab] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Customer form state
  const [customerForm, setCustomerForm] = useState({
    email: "",
    password: "",
  });

  // Admin form state
  const [adminForm, setAdminForm] = useState({
    username: "",
    password: "",
  });

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signInAction(
        customerForm.email,
        customerForm.password
      );

      if (result?.error) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else {
        // Redirect to customer dashboard or booking page
        router.push("/dashboard");
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signInAction(adminForm.username, adminForm.password);

      if (result?.error) {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      } else {
        // Redirect to admin dashboard
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerInputChange = (field: string, value: string) => {
    setCustomerForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdminInputChange = (field: string, value: string) => {
    setAdminForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="pb-0">
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          className="w-full"
          variant="bordered"
          color="primary"
          size="lg"
          classNames={{
            tabList:
              "gap-4 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary",
          }}
        >
          <Tab
            key="customer"
            title={
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <span>ลูกค้า</span>
              </div>
            }
          >
            <div className="pt-4">
              <form onSubmit={handleCustomerSubmit} className="space-y-4">
                <Input
                  type="email"
                  label="อีเมล"
                  placeholder="your@email.com"
                  value={customerForm.email}
                  onChange={(e) =>
                    handleCustomerInputChange("email", e.target.value)
                  }
                  required
                  variant="bordered"
                  color="primary"
                  startContent={<UserIcon className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  type={showPassword ? "text" : "password"}
                  label="รหัสผ่าน"
                  placeholder="รหัสผ่านของคุณ"
                  value={customerForm.password}
                  onChange={(e) =>
                    handleCustomerInputChange("password", e.target.value)
                  }
                  required
                  variant="bordered"
                  color="primary"
                  startContent={
                    <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
                  }
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

                {error && (
                  <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  เข้าสู่ระบบ
                </Button>
              </form>
            </div>
          </Tab>

          <Tab
            key="admin"
            title={
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                <span>ผู้ดูแลระบบ</span>
              </div>
            }
          >
            <div className="pt-4">
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <Input
                  type="text"
                  label="ชื่อผู้ใช้"
                  placeholder="username หรือ email"
                  value={adminForm.username}
                  onChange={(e) =>
                    handleAdminInputChange("username", e.target.value)
                  }
                  required
                  variant="bordered"
                  color="secondary"
                  startContent={<UserIcon className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  type={showPassword ? "text" : "password"}
                  label="รหัสผ่าน"
                  placeholder="รหัสผ่านของคุณ"
                  value={adminForm.password}
                  onChange={(e) =>
                    handleAdminInputChange("password", e.target.value)
                  }
                  required
                  variant="bordered"
                  color="secondary"
                  startContent={
                    <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
                  }
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

                {error && (
                  <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  color="secondary"
                  className="w-full"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  เข้าสู่ระบบ
                </Button>
              </form>
            </div>
          </Tab>
        </Tabs>
      </CardHeader>

      <CardFooter className="pt-0">
        <div className="w-full text-center">
          <p className="text-sm text-gray-600">
            ลืมรหัสผ่าน?{" "}
            <a
              href="/auth/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              รีเซ็ตรหัสผ่าน
            </a>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
