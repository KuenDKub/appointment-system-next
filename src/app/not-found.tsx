export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">ไม่พบหน้าที่คุณต้องการ</p>
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
        >
          กลับหน้าหลัก
        </a>
      </div>
    </div>
  );
}
