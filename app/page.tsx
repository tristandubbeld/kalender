"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import formatDate from "date-fns/format";

export default function IndexPage() {
  const today = new Date();
  const todayURL = `/${formatDate(today, "yyyy/MM/dd")}`;

  useEffect(() => {
    redirect(todayURL);
  }, [todayURL]);

  return (
    <main>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        Redirecting to today&apos;s date...
      </section>
    </main>
  );
}
