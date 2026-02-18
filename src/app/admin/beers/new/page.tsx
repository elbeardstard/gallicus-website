import AdminSidebar from "@/components/admin/AdminSidebar";
import BeerForm from "@/components/admin/BeerForm";

export default function NewBeerPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-[#111]">
        <h1 className="text-2xl font-bold mb-1">Nouvelle bière</h1>
        <p className="text-white/40 text-sm mb-8">Ajouter une bière au catalogue.</p>
        <BeerForm />
      </main>
    </div>
  );
}
