"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Input, Switch, Textarea, Select, SelectItem } from "@heroui/react";
import { motion } from "framer-motion";

const mockSettings = {
  business: {
    name: "สปาและร้านทำเล็บสวย",
    address: "123 ถนนสุขุมวิท, กรุงเทพฯ 10110",
    phone: "02-123-4567",
    email: "info@spa.com",
    website: "www.spa.com",
    businessHours: "09:00-21:00",
    timezone: "Asia/Bangkok",
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    reminderTime: "24",
    autoConfirm: false,
  },
  system: {
    maintenanceMode: false,
    allowOnlineBooking: true,
    requireApproval: true,
    maxAdvanceBooking: "30",
    cancellationPolicy: "ยกเลิกได้ 24 ชั่วโมงล่วงหน้า",
  },
  appearance: {
    primaryColor: "#8B5CF6",
    logo: "/logo.png",
    theme: "light",
    language: "th",
  },
};

export function SettingsManagement() {
  const [settings, setSettings] = useState(mockSettings);
  const [activeTab, setActiveTab] = useState("business");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Handle saving settings
    console.log("Saving settings:", settings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSettings(mockSettings);
    setIsEditing(false);
  };

  const tabs = [
    { id: "business", label: "ข้อมูลธุรกิจ", icon: "🏢" },
    { id: "notifications", label: "การแจ้งเตือน", icon: "🔔" },
    { id: "system", label: "ระบบ", icon: "⚙️" },
    { id: "appearance", label: "การแสดงผล", icon: "🎨" },
  ];

  const renderBusinessSettings = () => (
    <div className="space-y-4">
      <Input
        label="ชื่อร้าน"
        value={settings.business.name}
        onChange={(e) => setSettings({
          ...settings,
          business: { ...settings.business, name: e.target.value }
        })}
        variant="bordered"
        isDisabled={!isEditing}
      />
      <Textarea
        label="ที่อยู่"
        value={settings.business.address}
        onChange={(e) => setSettings({
          ...settings,
          business: { ...settings.business, address: e.target.value }
        })}
        variant="bordered"
        isDisabled={!isEditing}
        minRows={2}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="เบอร์โทรศัพท์"
          value={settings.business.phone}
          onChange={(e) => setSettings({
            ...settings,
            business: { ...settings.business, phone: e.target.value }
          })}
          variant="bordered"
          isDisabled={!isEditing}
        />
        <Input
          label="อีเมล"
          value={settings.business.email}
          onChange={(e) => setSettings({
            ...settings,
            business: { ...settings.business, email: e.target.value }
          })}
          variant="bordered"
          isDisabled={!isEditing}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="เว็บไซต์"
          value={settings.business.website}
          onChange={(e) => setSettings({
            ...settings,
            business: { ...settings.business, website: e.target.value }
          })}
          variant="bordered"
          isDisabled={!isEditing}
        />
        <Input
          label="เวลาทำการ"
          value={settings.business.businessHours}
          onChange={(e) => setSettings({
            ...settings,
            business: { ...settings.business, businessHours: e.target.value }
          })}
          variant="bordered"
          isDisabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">การแจ้งเตือนทางอีเมล</span>
          <Switch
            isSelected={settings.notifications.emailNotifications}
            onValueChange={(checked) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, emailNotifications: checked }
            })}
            isDisabled={!isEditing}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">การแจ้งเตือนทาง SMS</span>
          <Switch
            isSelected={settings.notifications.smsNotifications}
            onValueChange={(checked) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, smsNotifications: checked }
            })}
            isDisabled={!isEditing}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">การแจ้งเตือนแบบ Push</span>
          <Switch
            isSelected={settings.notifications.pushNotifications}
            onValueChange={(checked) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, pushNotifications: checked }
            })}
            isDisabled={!isEditing}
          />
        </div>
      </div>
      <Input
        label="เวลาเตือนล่วงหน้า (ชั่วโมง)"
        value={settings.notifications.reminderTime}
        onChange={(e) => setSettings({
          ...settings,
          notifications: { ...settings.notifications, reminderTime: e.target.value }
        })}
        variant="bordered"
        isDisabled={!isEditing}
        type="number"
      />
      <div className="flex items-center justify-between">
        <span className="font-medium">ยืนยันการจองอัตโนมัติ</span>
        <Switch
          isSelected={settings.notifications.autoConfirm}
          onValueChange={(checked) => setSettings({
            ...settings,
            notifications: { ...settings.notifications, autoConfirm: checked }
          })}
          isDisabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">โหมดบำรุงรักษา</span>
        <Switch
          isSelected={settings.system.maintenanceMode}
          onValueChange={(checked) => setSettings({
            ...settings,
            system: { ...settings.system, maintenanceMode: checked }
          })}
          isDisabled={!isEditing}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium">อนุญาตให้จองออนไลน์</span>
        <Switch
          isSelected={settings.system.allowOnlineBooking}
          onValueChange={(checked) => setSettings({
            ...settings,
            system: { ...settings.system, allowOnlineBooking: checked }
          })}
          isDisabled={!isEditing}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium">ต้องได้รับการอนุมัติ</span>
        <Switch
          isSelected={settings.system.requireApproval}
          onValueChange={(checked) => setSettings({
            ...settings,
            system: { ...settings.system, requireApproval: checked }
          })}
          isDisabled={!isEditing}
        />
      </div>
      <Input
        label="การจองล่วงหน้าสูงสุด (วัน)"
        value={settings.system.maxAdvanceBooking}
        onChange={(e) => setSettings({
          ...settings,
          system: { ...settings.system, maxAdvanceBooking: e.target.value }
        })}
        variant="bordered"
        isDisabled={!isEditing}
        type="number"
      />
      <Textarea
        label="นโยบายการยกเลิก"
        value={settings.system.cancellationPolicy}
        onChange={(e) => setSettings({
          ...settings,
          system: { ...settings.system, cancellationPolicy: e.target.value }
        })}
        variant="bordered"
        isDisabled={!isEditing}
        minRows={3}
      />
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-4">
      <Input
        label="สีหลัก"
        value={settings.appearance.primaryColor}
        onChange={(e) => setSettings({
          ...settings,
          appearance: { ...settings.appearance, primaryColor: e.target.value }
        })}
        variant="bordered"
        isDisabled={!isEditing}
        type="color"
        className="w-20"
      />
      <Select
        label="ธีม"
        selectedKeys={[settings.appearance.theme]}
        onSelectionChange={(keys) => setSettings({
          ...settings,
          appearance: { ...settings.appearance, theme: Array.from(keys)[0] as string }
        })}
        variant="bordered"
        isDisabled={!isEditing}
      >
        <SelectItem key="light">สว่าง</SelectItem>
        <SelectItem key="dark">มืด</SelectItem>
        <SelectItem key="auto">อัตโนมัติ</SelectItem>
      </Select>
      <Select
        label="ภาษา"
        selectedKeys={[settings.appearance.language]}
        onSelectionChange={(keys) => setSettings({
          ...settings,
          appearance: { ...settings.appearance, language: Array.from(keys)[0] as string }
        })}
        variant="bordered"
        isDisabled={!isEditing}
      >
        <SelectItem key="th">ไทย</SelectItem>
        <SelectItem key="en">English</SelectItem>
      </Select>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "business":
        return renderBusinessSettings();
      case "notifications":
        return renderNotificationSettings();
      case "system":
        return renderSystemSettings();
      case "appearance":
        return renderAppearanceSettings();
      default:
        return renderBusinessSettings();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              การตั้งค่าระบบ
            </h1>
            <p className="text-gray-600">จัดการการตั้งค่าระบบและการกำหนดค่าต่างๆ</p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button color="primary" onClick={() => setIsEditing(true)}>
                ✏️ แก้ไข
              </Button>
            ) : (
              <>
                <Button color="success" onClick={handleSave}>
                  💾 บันทึก
                </Button>
                <Button variant="bordered" onClick={handleCancel}>
                  ❌ ยกเลิก
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "solid" : "bordered"}
            color={activeTab === tab.id ? "primary" : "default"}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2"
          >
            <span>{tab.icon}</span>
            {tab.label}
          </Button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </CardHeader>
          <CardBody>
            {renderTabContent()}
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
