import { AdminLayout } from "@/client/components/admin/AdminLayout";
import { SettingsManagement } from "@/client/components/admin/SettingsManagement";

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <SettingsManagement />
    </AdminLayout>
  );
}
