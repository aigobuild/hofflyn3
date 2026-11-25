"use client";

import { useEffect, useState } from "react";
import { useAuiState } from "@assistant-ui/react";
import { useShallow } from "zustand/react/shallow";

function useFileSrc(file: File | undefined) {
  const [entry, setEntry] = useState<{ file: File; url: string }>();

  useEffect(() => {
    if (!file) {
      setEntry(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setEntry({ file, url: objectUrl });
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return entry !== undefined && entry.file === file ? entry.url : undefined;
}

export function useAttachmentSrc() {
  const { file, src } = useAuiState(
    useShallow((state) => {
      if (state.attachment.type !== "image") return {};
      if (state.attachment.file) return { file: state.attachment.file };
      const src = state.attachment.content?.find((item) => item.type === "image")?.image;
      return src ? { src } : {};
    }),
  );

  return useFileSrc(file) ?? src;
}
