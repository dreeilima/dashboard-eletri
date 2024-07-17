import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
export default function AgendamentosPage() {
  const breadcrumbItems = [
    { title: 'Agendamentos', link: '/dashboard/agendamentos' }
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
      </div>
    </ScrollArea>
  );
}
