import { AdminLayout } from "@/client/components/admin/AdminLayout";
import { NotificationsManagement } from "@/client/components/admin/NotificationsManagement";

export default function AdminNotificationsPage() {
  return (
    <AdminLayout>
      <NotificationsManagement />
    </AdminLayout>
  );
}
