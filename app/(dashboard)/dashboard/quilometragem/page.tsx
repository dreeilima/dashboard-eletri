import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
export default function ListaPage() {
  const breadcrumbItems = [
    { title: 'Km-Rodado', link: '/dashboard/quilometragem' }
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
      </div>
    </ScrollArea>
  );
}
