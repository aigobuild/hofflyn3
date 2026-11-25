"use client";
import { useEffect } from "react";

export default function WhizzyPreview() {
  useEffect(() => {
    if (parent === window || !document.referrer) return;
    const editor = new URL(document.referrer);
    if (!["http://localhost:3000", "http://127.0.0.1:3000"].includes(editor.origin)) return;
    if (document.querySelector("script[data-whizzy-editor]")) return;
    const script = document.createElement("script");
    script.dataset.whizzyEditor = "true";
    script.src = editor.origin + "/editor-tools/annotation.js";
    document.body.append(script);
  }, []);
  return null;
}
