import { GetServerSidePropsContext } from "next";
import React from "react";

export default function HomeworkPage(props: {registration: string, id: string, hid: string}) {
    return (
        <h1>{props.registration} - {props.id} - {props.hid}</h1>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
      props: context.query,
    };
  }