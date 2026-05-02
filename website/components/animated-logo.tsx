"use client";

import Link from "next/link";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";

export function AnimatedLogo() {
  return (
    <Link href="/" className="flex items-center justify-center mb-8">
      <Mirage size="60" speed="7" color="#f26522" />
    </Link>
  );
}
