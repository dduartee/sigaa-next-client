import { Bond } from "@types";
import Head from "next/head";
import React from "react";

export default function News({ data }: { data: Bond[] }) {
  return (
    <div>
      <Head>
        <title>Notícias | sigaa-next-client</title>
      </Head>
    </div>
  );
}
