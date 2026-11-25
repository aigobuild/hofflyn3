import { notFound } from "next/navigation";
import { DemoRuntimeProvider } from "@/components/runtime/demo-runtime-provider";
import { MotionShell } from "@/components/motion-shell";
import { Base } from "@/components/examples/base";
import { Claude } from "@/components/examples/claude";
import { Gemini } from "@/components/examples/gemini";
import { Grok } from "@/components/examples/grok";
import { Perplexity } from "@/components/examples/perplexity";
const layouts = { base: Base, claude: Claude, gemini: Gemini, grok: Grok, perplexity: Perplexity };
export default async function Page({ params, searchParams }: {params: Promise<{layout: string}>; searchParams: Promise<{preview?: string}>}) {
  const {layout} = await params;
  const {preview} = await searchParams;
  const Component = layouts[layout as keyof typeof layouts];
  if (!Component) notFound();
  return <MotionShell layout={layout} preview={preview === "1"}><DemoRuntimeProvider><Component /></DemoRuntimeProvider></MotionShell>;
}
