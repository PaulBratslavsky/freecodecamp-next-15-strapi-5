import React from "react";
import { HeadingProps } from "@/types";

export function Heading({ heading, linkId }: HeadingProps) {
  return (
    <h3 className="article-headline" id={linkId}>
      {heading}
    </h3>
  );
}
