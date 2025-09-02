# ระบบจองคิวออนไลน์ - Beauty Spa

ระบบจองคิวออนไลน์สำหรับร้านทำเล็บ สปา และบริการความงาม ที่ออกแบบมาให้ใช้งานง่าย สวยงาม และมีประสิทธิภาพ

## ✨ ฟีเจอร์หลัก

### สำหรับลูกค้า
- 🎯 **จองคิวง่ายๆ** - เลือกบริการ วันที่ และเวลาได้ใน 3 นาที
- 📱 **รองรับมือถือ** - Mobile-first design ที่ใช้งานสะดวก
- 🔔 **แจ้งเตือนอัตโนมัติ** - รับการแจ้งเตือนผ่าน Email, SMS และ Push
- 📊 **ติดตามสถานะ** - ดูสถานะการจองแบบเรียลไทม์
- 🎨 **UI/UX สวยงาม** - ธีมสดใส น่ารัก แต่ทันสมัย

### สำหรับพนักงาน/ผู้จัดการ
- 📋 **Dashboard แบบเรียลไทม์** - แสดงคิววันนี้แบบ Timeline และ Kanban
- 👥 **จัดการคิว** - ยืนยัน ยกเลิก เลื่อนคิวได้ทันที
- 📊 **รายงานและสถิติ** - วิเคราะห์ข้อมูลการจองและประสิทธิภาพ
- ⚙️ **ตั้งค่าระบบ** - ปรับแต่งเวลาบริการ และนโยบายต่างๆ

## 🚀 Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **UI Library**: HeroUI + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js v5
- **Realtime**: WebSocket (Socket.IO)
- **Notifications**: Email (SendGrid), SMS (Twilio), Web Push
- **Animations**: Framer Motion

## 📦 การติดตั้ง

### 1. Clone โปรเจค
```bash
git clone <repository-url>
cd appointment-system-next
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. ตั้งค่า Environment Variables
```bash
cp env.example .env.local
```
แก้ไขไฟล์ `.env.local` ด้วยข้อมูลจริงของคุณ

### 4. ตั้งค่าฐานข้อมูล
```bash
# สร้างฐานข้อมูล
npm run db:setup

# หรือแยกขั้นตอน
npm run db:migrate
npm run db:seed
```

### 5. รันโปรเจค
```bash
npm run dev
```

เว็บไซต์จะเปิดที่ `http://localhost:3000`

## 🗄️ โครงสร้างฐานข้อมูล

### Models หลัก
- **User** - ผู้ใช้งาน (ลูกค้า, พนักงาน, ผู้จัดการ)
- **Service** - บริการต่างๆ (ทำเล็บ, สปา, นวด)
- **Booking** - การจองคิว
- **Notification** - การแจ้งเตือน
- **BusinessSettings** - ตั้งค่าธุรกิจ

### ความสัมพันธ์
- ลูกค้าสามารถจองคิวได้หลายครั้ง
- พนักงานสามารถให้บริการได้หลายประเภท
- ระบบส่งการแจ้งเตือนอัตโนมัติตามการตั้งค่า

## 🎨 การออกแบบ UI/UX

### ธีมสี
- **Primary**: สีชมพูอ่อน (#ec4899) - สื่อถึงความสวยงามและนุ่มนวล
- **Secondary**: สีฟ้าอ่อน (#0ea5e9) - สื่อถึงความน่าเชื่อถือ
- **Accent**: สีม่วงอ่อน (#d946ef) - สื่อถึงความหรูหรา
- **Success/Warning/Error**: สีที่เหมาะสมสำหรับสถานะต่างๆ

### หลักการออกแบบ
- **Mobile-first** - ออกแบบสำหรับมือถือเป็นหลัก
- **Accessibility** - รองรับการใช้งานสำหรับทุกคน
- **Micro-interactions** - เอฟเฟกต์เล็กๆ ที่ทำให้ UX น่าสนใจ
- **Thai Language Support** - รองรับภาษาไทยอย่างสมบูรณ์

## 📱 หน้าหลัก

### 1. Hero Section
- ข้อความหลักที่ดึงดูด
- ปุ่ม Call-to-Action ชัดเจน
- Feature highlights 3 ข้อ

### 2. Service Showcase
- แสดงบริการทั้งหมดในรูปแบบ Grid
- รูปภาพ, ราคา, เวลา, คะแนน
- ปุ่มจองสำหรับแต่ละบริการ

### 3. How It Works
- ขั้นตอนการใช้งาน 4 ขั้นตอน
- ไอคอนและคำอธิบายที่เข้าใจง่าย
- ข้อมูลติดต่อสำหรับความช่วยเหลือ

### 4. Testimonials
- ความประทับใจจากลูกค้า
- คะแนนรีวิวและความคิดเห็น
- สถิติที่น่าสนใจ

### 5. Contact Section
- ข้อมูลติดต่อครบถ้วน
- แบบฟอร์มติดต่อ
- แผนที่และช่องทางโซเชียล

## 🎛️ CMS (Content Management System)

### Admin Dashboard (`/admin`)
- **ภาพรวมระบบ** - สถิติการจองคิว, รายได้, ลูกค้าใหม่, อัตราการเสร็จสิ้น
- **การจองคิว** - จัดการการจองทั้งหมด, เปลี่ยนสถานะ, ค้นหาและกรอง, เพิ่มการจองใหม่
- **จัดการลูกค้า** - ข้อมูลลูกค้า, ประวัติการจอง, สถิติการใช้จ่าย, การค้นหาและกรอง
- **จัดการบริการ** - เพิ่ม/แก้ไข/ลบบริการ, ตั้งราคา, กำหนดเวลา, การเชื่อมโยงพนักงาน
- **จัดการพนักงาน** - ข้อมูลพนักงาน, กำหนดบริการ, ตารางงาน, ประสบการณ์และคะแนน
- **รายงานและสถิติ** - วิเคราะห์ข้อมูล, แผนภูมิ, การรายงาน, ส่งออกรายงาน
- **การแจ้งเตือน** - จัดการการแจ้งเตือน, ตั้งค่าเวลา, เทมเพลต, บันทึกการส่ง
- **การชำระเงิน** - ติดตามการชำระเงิน, รายงานการเงิน, การคืนเงิน, การวิเคราะห์
- **จัดการผู้ใช้** - บัญชีผู้ใช้, บทบาทและสิทธิ์, การจัดการสิทธิ์, กิจกรรมผู้ใช้
- **ตั้งค่าระบบ** - ตั้งค่าธุรกิจ, เวลาทำการ, นโยบายต่างๆ, การแจ้งเตือน, การชำระเงิน

### ฟีเจอร์ CMS
- **Real-time Dashboard** - ข้อมูลสดแบบเรียลไทม์ พร้อมสถิติและกราฟ
- **Responsive Design** - รองรับทุกขนาดหน้าจอ (Mobile-first)
- **Advanced Search & Filters** - ค้นหาและกรองข้อมูลขั้นสูงตามหลายเงื่อนไข
- **Bulk Operations** - ดำเนินการหลายรายการพร้อมกัน
- **Export & Import** - ส่งออกและนำเข้าข้อมูล (Excel, PDF, CSV)
- **User Management** - จัดการสิทธิ์ผู้ใช้งาน บทบาท และการเข้าถึง
- **Role-based Access Control** - ระบบสิทธิ์ตามบทบาท (Admin, Manager, Staff, Reception)
- **Audit Logs** - บันทึกการเปลี่ยนแปลงทั้งหมดและการเข้าสู่ระบบ
- **Multi-language Support** - รองรับภาษาไทยและภาษาอังกฤษ
- **Advanced Analytics** - กราฟและสถิติขั้นสูงสำหรับการวิเคราะห์ธุรกิจ

## 🔧 การพัฒนา

### Scripts ที่มีประโยชน์
```bash
# Development
npm run dev          # รันโปรเจคในโหมดพัฒนา
npm run build        # Build สำหรับ production
npm run start        # รัน production build

# Database
npm run db:migrate   # รัน database migrations
npm run db:studio    # เปิด Prisma Studio
npm run db:seed      # เพิ่มข้อมูลตัวอย่าง
npm run db:reset     # รีเซ็ตฐานข้อมูล
npm run db:fresh     # รีเซ็ตและเพิ่มข้อมูลใหม่

# Setup
npm run setup        # ติดตั้งทั้งหมดในครั้งเดียว
npm run fresh-start  # รีเซ็ตและเริ่มต้นใหม่
```

### โครงสร้างไฟล์
```
src/
├── app/                    # Next.js App Router
├── client/                 # Client-side components
│   ├── components/         # React components
│   ├── hooks/             # Custom hooks
│   ├── providers/          # Context providers
│   └── lib/               # Client utilities
├── server/                 # Server-side code
│   ├── actions/            # Server actions
│   ├── controllers/        # API controllers
│   └── lib/                # Server utilities
├── schemas/                # Zod validation schemas
├── types/                  # TypeScript types
└── shared/                 # Shared utilities
```

## 📧 การแจ้งเตือน

### ช่องทาง
- **Email** - ผ่าน SendGrid
- **SMS** - ผ่าน Twilio
- **Web Push** - ผ่าน VAPID

### เวลาแจ้งเตือน
- เมื่อจองเสร็จ (confirmation)
- เตือนล่วงหน้า 24 ชั่วโมง
- เตือนล่วงหน้า 2 ชั่วโมง
- เตือนล่วงหน้า 15 นาที
- แจ้งเมื่อต้องเช็คอิน

## 🧪 การทดสอบ

### E2E Testing
- ใช้ Playwright สำหรับการทดสอบ end-to-end
- ทดสอบ flow การจองคิวทั้งหมด
- ทดสอบการแจ้งเตือนและ realtime updates

### Unit Testing
- ใช้ Jest สำหรับการทดสอบ unit
- ทดสอบ business logic และ utilities

## 🚀 การ Deploy

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables ที่ต้องตั้ง
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret key สำหรับ authentication
- `SENDGRID_API_KEY` - API key สำหรับส่ง email
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token

## 🤝 การมีส่วนร่วม

1. Fork โปรเจค
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจคนี้อยู่ภายใต้ MIT License - ดูรายละเอียดในไฟล์ [LICENSE](LICENSE)

## 📞 ติดต่อ

- **Email**: info@beautyspa.com
- **Phone**: 02-123-4567
- **Line**: @beautyspa

---

สร้างด้วย ❤️ โดยทีมพัฒนา Beauty Spa System
