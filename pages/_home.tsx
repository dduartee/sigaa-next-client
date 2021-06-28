import React from "react";
export default function Home({ data }) {
  return data.map((value, index) => {
    console.log(value);
  });
}
