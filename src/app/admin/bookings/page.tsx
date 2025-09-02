import { AdminLayout } from "@/client/components/admin/AdminLayout";
import { BookingsManagement } from "@/client/components/admin/BookingsManagement";

export default function AdminBookingsPage() {
  return (
    <AdminLayout>
      <BookingsManagement />
    </AdminLayout>
  );
}
