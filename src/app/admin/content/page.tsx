import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAllContentRaw } from "@/lib/data/content";
import ContentEditor from "./ContentEditor";

export default async function AdminContentPage() {
  const content = await getAllContentRaw();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="admin-main flex-1 p-8">
        <h1 className="text-2xl font-bold mb-1">Contenu du site</h1>
        <p className="admin-text-muted text-sm mb-8">Textes, heures d&apos;ouverture, coordonnées et réseaux sociaux.</p>
        <ContentEditor initialContent={content} />
      </main>
    </div>
  );
}
