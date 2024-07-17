import BreadCrumb from '@/components/breadcrumb';
import VisitasPage from '@/components/tables/visitas-tables/visitas-table';
import { ScrollArea } from '@/components/ui/scroll-area';
export default function ListaPage() {
  const breadcrumbItems = [{ title: 'Visitas', link: '/dashboard/visitas' }];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <VisitasPage />
      </div>
    </ScrollArea>
  );
}
