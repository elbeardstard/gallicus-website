import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAllContentRaw } from "@/lib/data/content";
import ContentEditor from "./ContentEditor";

export default async function AdminContentPage() {
  const content = await getAllContentRaw();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-[#111]">
        <h1 className="text-2xl font-bold mb-1">Contenu du site</h1>
        <p className="text-white/40 text-sm mb-8">Textes, heures d&apos;ouverture, coordonnées et réseaux sociaux.</p>
        <ContentEditor initialContent={content} />
      </main>
    </div>
  );
}
