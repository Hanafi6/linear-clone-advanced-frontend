"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/auth/useAuth";

// 1. الكومبوننت اللي فيه اللوجيك الحقيقي
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isReady) return;
    if (isLoggedIn) return;
    const qs = searchParams?.toString();
    const current = qs ? `${pathname}?${qs}` : pathname;
    router.replace(`/login?next=${encodeURIComponent(current)}`);
  }, [isLoggedIn, isReady, pathname, router, searchParams]);

  if (!isReady || !isLoggedIn) return null;
  return <>{children}</>;
}

// 2. الكومبوننت اللي هتصدره (Export) ويكون متغلف بالـ Suspense
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AuthGuard>{children}</AuthGuard>
    </Suspense>
  );
}