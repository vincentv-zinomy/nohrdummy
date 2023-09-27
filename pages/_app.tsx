import DashboardLayout from "@/components/Layout/DashboardLayout";
import { AuthProvider } from "@/components/contexts/AuthContext";
import ToastContainer from "@/components/hooks/ToastContainer";
import { ToastProvider } from "@/components/hooks/useToast";
import { useRouter } from "next/router";

import AllScripts from "@/components/Scripts/AllScripts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

declare global {
  interface Window {
    $crisp: any;
    dataLayer: any;
    gtag: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noAuthRoutes = [
    "/terms-of-service",
    "/privacy-policy",
    "/refund-policy",
  ];

  if (
    router.pathname === "/" ||
    router.pathname.startsWith("/blog") ||
    router.pathname.startsWith("/products") ||
    router.pathname.startsWith("/products/leadfix") ||
    router.pathname.startsWith("/resources") ||
    router.pathname.startsWith("/resources/blog") ||
    router.pathname.startsWith("/resources/apps") ||
    router.pathname.startsWith("/solutions") ||
    router.pathname.startsWith("/inbox") ||
    noAuthRoutes.includes(router.pathname)
  ) {
    return (
      <ToastProvider>
        <AllScripts />
        <Component {...pageProps} />
        <ToastContainer />
      </ToastProvider>
    );
  }

  return (
    <AuthProvider>
      <AllScripts />
      <ToastProvider>
        <DashboardLayout>
          <Component {...pageProps} />
          <ToastContainer />
        </DashboardLayout>
      </ToastProvider>
    </AuthProvider>
  );
}
