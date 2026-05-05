import { dehydrate, HydrationBoundary, QueryClient, type QueryKey } from '@tanstack/react-query';
import type { ReactNode } from 'react';

// تعريف شكل الـ Query الواحدة
interface QueryConfig {
  queryKey: QueryKey;
  queryFn: () => Promise<unknown>;
}

interface Props {
  // هنا بنقوله: يا إما تبعت Query واحدة أو Array من الـ Queries
  queries: QueryConfig | QueryConfig[];
  children: ReactNode;
}

export default async function PrefetchBoundary({ queries, children }: Props) {
  const queryClient = new QueryClient();

  // تحويلها لـ Array لو كانت واحدة بس عشان نمشي عليها بـ Loop موحد
  const queriesArray = Array.isArray(queries) ? queries : [queries];

  // تشغيل كل الـ Queries مع بعض (Parallel) عشان السرعة
  await Promise.all(
    queriesArray.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({
        queryKey,
        queryFn,
      })
    )
  );

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}