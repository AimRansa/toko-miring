import { Suspense } from 'react';
import Table from './Table';
import Skeleton from './Skeleton';

export default function Page() {
  return (
    <section className="bg-white shadow-md rounded-lg p-4 space-y-4">
      <Suspense fallback={<Skeleton />}>
        <Table />
      </Suspense>
    </section>
  );
}
