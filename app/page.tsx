"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  return (
    <main>
      <input type="text"></input>
      <Button>Click me</Button>
    </main>
  );
}
