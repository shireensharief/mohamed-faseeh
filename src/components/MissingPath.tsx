"use client";

import { useEffect, useState } from "react";

// The address the visitor actually tried (only known in the browser, since the
// 404 page is a single static file).
export default function MissingPath() {
  const [path, setPath] = useState("this page");
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const p = location.pathname.startsWith(base) ? location.pathname.slice(base.length) : location.pathname;
    setPath(p || "/");
  }, []);
  return <code>{path}</code>;
}
