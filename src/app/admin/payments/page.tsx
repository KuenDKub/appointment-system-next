import { AdminLayout } from "@/client/components/admin/AdminLayout";
import { PaymentsManagement } from "@/client/components/admin/PaymentsManagement";

export default function AdminPaymentsPage() {
  return (
    <AdminLayout>
      <PaymentsManagement />
    </AdminLayout>
  );
}
