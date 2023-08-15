import { AuthProvider } from "@/components/contexts/AuthContext";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ToastContainer from "@/components/hooks/ToastContainer";
import { ToastProvider } from "@/components/hooks/useToast";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AllScripts from "@/components/Scripts/AllScripts";
import { useEffect } from "react";

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
