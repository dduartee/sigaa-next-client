import { useRouter } from "next/router";
import React from "react";

export default function HomeworkPage() {
  const router = useRouter();
  const { registration, id, hid } = router.query;
    return (
        <h1>{registration} - {id} - {hid}</h1>
    )
}
