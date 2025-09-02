import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.service.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.businessSettings.deleteMany();

  // Create business settings
  const businessSettings = await prisma.businessSettings.create({
    data: {
      name: "สปาสวยงาม",
      address: "123 ถนนสุขุมวิท กรุงเทพฯ 10110",
      phone: "02-123-4567",
      email: "info@spa-beauty.com",
      website: "https://spa-beauty.com",
      logo: "/images/logo.png",
      settings: {
        businessHours: "09:00-20:00",
        timezone: "Asia/Bangkok",
        currency: "THB",
        taxRate: 7.0,
        allowOnlineBooking: true,
        requireConfirmation: true,
        maxAdvanceBookingDays: 30,
        cancellationPolicy: "ยกเลิกได้ 24 ชั่วโมงก่อนเวลา",
        reminderHours: 2,
      },
    },
  });

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@spa.com",
      username: "admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create staff users
  const staffPassword = await bcrypt.hash("staff123", 12);
  const staffUser1 = await prisma.user.create({
    data: {
      email: "staff1@spa.com",
      username: "staff1",
      password: staffPassword,
      role: "STAFF",
    },
  });

  const staffUser2 = await prisma.user.create({
    data: {
      email: "staff2@spa.com",
      username: "staff2",
      password: staffPassword,
      role: "STAFF",
    },
  });

  // Create customer users
  const customerPassword = await bcrypt.hash("customer123", 12);
  const customerUser1 = await prisma.user.create({
    data: {
      email: "customer1@email.com",
      username: "customer1",
      password: customerPassword,
      role: "CUSTOMER",
    },
  });

  const customerUser2 = await prisma.user.create({
    data: {
      email: "customer2@email.com",
      username: "customer2",
      password: customerPassword,
      role: "CUSTOMER",
    },
  });

  // Create staff records
  const staff1 = await prisma.staff.create({
    data: {
      userId: staffUser1.id,
      firstName: "สมหญิง",
      lastName: "มือทอง",
      phone: "082-345-6789",
      position: "ช่างทำเล็บ",
      bio: "ช่างทำเล็บมืออาชีพ มีประสบการณ์มากกว่า 5 ปี",
      isActive: true,
    },
  });

  const staff2 = await prisma.staff.create({
    data: {
      userId: staffUser2.id,
      firstName: "สมศรี",
      lastName: "นวดเก่ง",
      phone: "083-456-7890",
      position: "ช่างนวด",
      bio: "ช่างนวดมืออาชีพ มีประสบการณ์มากกว่า 8 ปี",
      isActive: true,
    },
  });

  // Create customers
  const customer1 = await prisma.customer.create({
    data: {
      userId: customerUser1.id,
      firstName: "สมปอง",
      lastName: "ใจดี",
      phone: "084-567-8901",
      preferences: {
        favoriteServices: ["ทำเล็บเจล"],
        preferredStaff: [staff1.id],
        preferredTime: "14:00",
        allergies: ["ไม่มี"],
        notes: "ชอบสีสันสดใส",
      },
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      userId: customerUser2.id,
      firstName: "สมใจ",
      lastName: "สุขดี",
      phone: "085-678-9012",
      preferences: {
        favoriteServices: ["นวดสปา"],
        preferredStaff: [staff2.id],
        preferredTime: "10:00",
        allergies: ["ไม่มี"],
        notes: "ชอบนวดแรงๆ",
      },
    },
  });

  // Create services
  const service1 = await prisma.service.create({
    data: {
      name: "ทำเล็บเจล",
      description: "ทำเล็บสวยงามด้วยเทคนิคสมัยใหม่ ใช้เจลคุณภาพสูง",
      duration: 60,
      price: 500,
      category: "เล็บ",
      isActive: true,
      image: "/images/services/gel-nails.jpg",
    },
  });

  const service2 = await prisma.service.create({
    data: {
      name: "สปาเท้า",
      description: "ผ่อนคลายเท้าด้วยการนวดและสปา ใช้ครีมคุณภาพสูง",
      duration: 90,
      price: 800,
      category: "สปา",
      isActive: true,
      image: "/images/services/foot-spa.jpg",
    },
  });

  const service3 = await prisma.service.create({
    data: {
      name: "นวดตัว",
      description: "นวดผ่อนคลายกล้ามเนื้อทั้งตัว ใช้เทคนิคนวดไทยโบราณ",
      duration: 120,
      price: 1200,
      category: "นวด",
      isActive: true,
      image: "/images/services/body-massage.jpg",
    },
  });

  // Assign staff to services
  await prisma.staffService.create({
    data: {
      staffId: staff1.id,
      serviceId: service1.id,
    },
  });

  await prisma.staffService.create({
    data: {
      staffId: staff1.id,
      serviceId: service2.id,
    },
  });

  await prisma.staffService.create({
    data: {
      staffId: staff2.id,
      serviceId: service2.id,
    },
  });

  await prisma.staffService.create({
    data: {
      staffId: staff2.id,
      serviceId: service3.id,
    },
  });

  // Create bookings
  const booking1 = await prisma.booking.create({
    data: {
      customerId: customer1.id,
      serviceId: service1.id,
      staffId: staff1.id,
      date: new Date("2024-01-15"),
      startTime: new Date("2024-01-15T14:00:00"),
      endTime: new Date("2024-01-15T15:00:00"),
      status: "CONFIRMED",
      notes: "ชอบสีสันสดใส",
      totalPrice: 500,
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      customerId: customer2.id,
      serviceId: service2.id,
      staffId: staff2.id,
      date: new Date("2024-01-20"),
      startTime: new Date("2024-01-20T10:00:00"),
      endTime: new Date("2024-01-20T11:30:00"),
      status: "PENDING",
      notes: "ชอบนวดแรงๆ",
      totalPrice: 800,
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      customerId: customer1.id,
      serviceId: service3.id,
      staffId: staff2.id,
      date: new Date("2024-01-18"),
      startTime: new Date("2024-01-18T16:00:00"),
      endTime: new Date("2024-01-18T18:00:00"),
      status: "COMPLETED",
      notes: "นวดแรงๆ ตามที่ชอบ",
      totalPrice: 1200,
    },
  });

  // Create notifications
  await prisma.notification.create({
    data: {
      userId: customerUser1.id,
      title: "การจองใหม่",
      message: "คุณได้จองบริการทำเล็บเจลสำหรับวันที่ 15 มกราคม เวลา 14:00",
      type: "BOOKING_CONFIRMATION",
      isRead: false,
      data: {
        bookingId: booking1.id,
        serviceName: "ทำเล็บเจล",
        date: "2024-01-15",
        time: "14:00",
      },
    },
  });

  await prisma.notification.create({
    data: {
      userId: customerUser2.id,
      title: "การจองล่วงหน้า",
      message: "คุณได้จองบริการสปาเท้าสำหรับวันที่ 20 มกราคม เวลา 10:00",
      type: "BOOKING_REMINDER",
      isRead: false,
      data: {
        bookingId: booking2.id,
        serviceName: "สปาเท้า",
        date: "2024-01-20",
        time: "10:00",
      },
    },
  });

  await prisma.notification.create({
    data: {
      userId: staffUser1.id,
      title: "การจองใหม่",
      message: "คุณสมปองได้จองบริการทำเล็บเจลสำหรับวันที่ 15 มกราคม",
      type: "BOOKING_CONFIRMATION",
      isRead: false,
      data: {
        bookingId: booking1.id,
        customerName: "คุณสมปอง",
        serviceName: "ทำเล็บเจล",
        date: "2024-01-15",
        time: "14:00",
      },
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`📊 Created ${await prisma.user.count()} users`);
  console.log(`👥 Created ${await prisma.staff.count()} staff members`);
  console.log(`👤 Created ${await prisma.customer.count()} customers`);
  console.log(`💅 Created ${await prisma.service.count()} services`);
  console.log(`📅 Created ${await prisma.booking.count()} bookings`);
  console.log(`🔔 Created ${await prisma.notification.count()} notifications`);
  console.log(`🏢 Created business settings`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
