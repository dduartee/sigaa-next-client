import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
export default function CodePage({
  registration,
  code,
}: {
  registration: string;
  code: string;
}) {
  const router = useRouter();
  return <>{code}</>;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  };
}
