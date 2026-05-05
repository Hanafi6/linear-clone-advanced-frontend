"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AuthUser } from "@/types";
import { API, getUserById } from "@/api/ServerFunctions";

import { clearAuthToken, emitAuthChanged, getAuthToken, setAuthToken } from "@/auth/authStorage";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);
  const refreshSeq = useRef(0);

  // تحديث حالة المستخدم
  const refreshAuth = useCallback(async () => {
    const seq = ++refreshSeq.current;
    const nextToken = getAuthToken(); // token == userId في مشروعك
    setToken(nextToken);

    if (!nextToken) {
      setUser(null);
      setIsReady(true);
      return;
    }

    try {
      const dbUser = await getUserById<AuthUser>(API, nextToken);
      if (seq !== refreshSeq.current) return;
      setUser(dbUser);
    } catch {
      // لو التوكن موجود لكن اليوزر مش موجود/السيرفر واقع -> اعتبره غير مسجل
      if (seq !== refreshSeq.current) return;
      clearAuthToken();
      setToken(undefined);
      setUser(null);
    } finally {
      if (seq !== refreshSeq.current) return;
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    void refreshAuth();

    const onAuthChanged = () => void refreshAuth();
    window.addEventListener("auth-changed", onAuthChanged);
    
    return () => {
      window.removeEventListener("auth-changed", onAuthChanged);
    };
  }, [refreshAuth]);

  const login = useCallback((nextUser: AuthUser) => {
    // مصدر الحقيقة الوحيد: cookie token (هنا: userId)
    setAuthToken(nextUser.id);
    setToken(nextUser.id);
    setUser(nextUser);
    setIsReady(true);
    emitAuthChanged();
  }, []);

  const logout = useCallback(() => {
    clearAuthToken();
    setToken(undefined);
    setUser(null);
    setIsReady(true);
    emitAuthChanged();
    
    // توجيه المستخدم للوج إن بعد الخروج
    window.location.href = "/login"; 
  }, []);

  return useMemo(
    () => ({ user, isLoggedIn: !!token, isReady, login, logout, refreshAuth }),
    [user, token, isReady, login, logout, refreshAuth]
  );
}