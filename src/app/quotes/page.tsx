"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLang, useLocalizePath } from "@/lib/useLang";

export default function QuotesRedirect() {
  const router = useRouter();
  const lp = useLocalizePath();
  const lang = useLang();
  const target = lp("/home-insurance/form");

  useEffect(() => {
    router.push(target);
  }, [router, target]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>{lang === "es" ? "Redirigiendo al formulario de cotización..." : "Redirecting to quote form..."}</p>
    </div>
  );
}
