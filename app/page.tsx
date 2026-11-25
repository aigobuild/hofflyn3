import { DemoRuntimeProvider } from "@/components/runtime/demo-runtime-provider";
import { MotionShell } from "@/components/motion-shell";
import { Claude } from "@/components/examples/claude";

export default function Page() {
  return <MotionShell layout="claude" preview={false}><DemoRuntimeProvider><Claude /></DemoRuntimeProvider></MotionShell>;
}
