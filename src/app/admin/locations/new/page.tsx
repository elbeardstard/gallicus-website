import AdminSidebar from "@/components/admin/AdminSidebar";
import LocationForm from "@/components/admin/LocationForm";

export default function NewLocationPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-[#111]">
        <h1 className="text-2xl font-bold mb-1">Nouveau point de vente</h1>
        <p className="text-white/40 text-sm mb-8">Ajouter un emplacement sur la carte.</p>
        <LocationForm />
      </main>
    </div>
  );
}
