import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
export default function EletricistasPage() {
  const breadcrumbItems = [
    { title: 'Lista Eletricistas', link: '/dashboard/eletricistas' }
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
      </div>
    </ScrollArea>
  );
}
