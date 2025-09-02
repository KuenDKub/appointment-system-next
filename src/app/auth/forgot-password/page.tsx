import { ForgotPasswordForm } from "@/client/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ลืมรหัสผ่าน?
          </h1>
          <p className="text-gray-600">
            ไม่ต้องกังวล เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของคุณ
          </p>
        </div>
        
        <ForgotPasswordForm />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            จำรหัสผ่านได้แล้ว?{" "}
            <a
              href="/auth/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              เข้าสู่ระบบ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
