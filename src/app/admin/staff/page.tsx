import { AdminLayout } from "@/client/components/admin/AdminLayout";
import { StaffManagement } from "@/client/components/admin/StaffManagement";

export default function AdminStaffPage() {
  return (
    <AdminLayout>
      <StaffManagement />
    </AdminLayout>
  );
}
