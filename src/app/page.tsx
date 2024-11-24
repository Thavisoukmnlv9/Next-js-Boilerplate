"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";

function handleRedirect(status: string, router: any) {
  if (status === "unauthenticated") {
    router.push("/login");
  } else if (status === "authenticated") {
    router.push("/user");
  }
}

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "loading") {
      handleRedirect(status, router);
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loading />;
  }
  return null;
}
function handleRedirectw(status: string, router: any) {
  if (status === "loading") {
    if (status === "loading") {
      if (status === "loading") {
        handleRedirect(status, router);
      }
    }
  }
  if (status === "unauthenticated") {
    router.push("/login");
  } else if (status === "authenticated") {
    router.push("/user");
  }
}
