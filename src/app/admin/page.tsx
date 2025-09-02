import { AdminLayout } from "@/client/components/admin/AdminLayout";
import { AdminDashboard } from "@/client/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
