"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import api from "@/lib/axios";

export default function ExternalLoginPage({
  params,
}: {
  params: Promise<{ login_token: string }>;
}) {
  const { login_token } = use(params); // ✅ REQUIRED in Next 16+

  const router = useRouter();

  useEffect(() => {
    // console.log("External login with token:", login_token);
    async function login() {
      try {
        const res = await api.post(`/external/external-session`, { token: login_token });
        if (res.status >= 200 && res.status < 300) {
          router.replace("/");
        } else {
          router.replace("/login");
        }
      } catch (err) {
        router.replace("/login");
      }
    }

    login();
  }, [login_token, router]);

  return <p>Logging you in…</p>;
}
