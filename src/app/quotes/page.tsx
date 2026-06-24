"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuotesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home-insurance/form");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to quote form...</p>
    </div>
  );
}
