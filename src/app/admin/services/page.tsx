import { AdminLayout } from "@/client/components/admin/AdminLayout";
import { ServicesManagement } from "@/client/components/admin/ServicesManagement";

export default function AdminServicesPage() {
  return (
    <AdminLayout>
      <ServicesManagement />
    </AdminLayout>
  );
}
