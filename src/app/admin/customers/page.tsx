import { AdminLayout } from "@/client/components/admin/AdminLayout";
import { CustomersManagement } from "@/client/components/admin/CustomersManagement";

export default function AdminCustomersPage() {
  return (
    <AdminLayout>
      <CustomersManagement />
    </AdminLayout>
  );
}
