import BreadCrumb from '@/components/breadcrumb';
import { Listacompleta } from '@/components/tables//listacompleta-tables/listacompleta-tables';

export default function ListacompletaPage() {
  const breadcrumbItems = [
    { title: 'Lista completa', link: '/dashboard/listacompleta' }
  ];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <Listacompleta data={[]} />
      </div>
    </>
  );
}
