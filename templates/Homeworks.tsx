import { Bond } from "@types";
import Head from "next/head";
import React from "react";

export default function Homeworks({ data }: { data: Bond[] }) {
  return (
    <div>
      <Head>
        <title>Tarefas | sigaa-next-client</title>
      </Head>
    </div>
  );
}
