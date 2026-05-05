import Cookies from "js-cookie";

export const AUTH_TOKEN_COOKIE = "auth-token"; 

export function getAuthToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return Cookies.get(AUTH_TOKEN_COOKIE);
}

export function setAuthToken(token: string) {
  if (typeof window === "undefined") return;
  Cookies.set(AUTH_TOKEN_COOKIE, token, {
    expires: 7,
    path: "/",
    sameSite: "lax",
  });
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  Cookies.remove(AUTH_TOKEN_COOKIE, { path: "/" });
}

export function emitAuthChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("auth-changed"));
}