import { AdminLayout } from "@/client/components/admin/AdminLayout";
import { UsersManagement } from "@/client/components/admin/UsersManagement";

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <UsersManagement />
    </AdminLayout>
  );
}
