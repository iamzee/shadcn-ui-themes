import { useLoaderData } from "@remix-run/react";
import type { loader } from "./loader.server";
import { Dashboard } from "~/shadcn-examples/dashboard";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { useState } from "react";

export { loader } from "./loader.server";

export default function RandomTheme() {
  const { sourceColor, light, dark } = useLoaderData<typeof loader>();

  const [size, setSize] = useState(50);

  return (
    <div className="w-screen h-screen">
      <ResizablePanelGroup
        className="relative h-full !overflow-y-auto"
        direction="horizontal"
        onLayout={(sizes) => setSize(sizes[0])}
      >
        <ResizablePanel>
          <div
            style={
              {
                ...light,
                clipPath: `polygon(0 0, ${size}% 0, ${size}% 100%, 0 100%)`,
              } as React.CSSProperties
            }
            className="absolute top-0 left-0 w-full"
          >
            <div
              style={{
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
              }}
            >
              <Dashboard />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div
            style={
              {
                ...dark,
                clipPath: `polygon(${size}% 0, 100% 0, 100% 100%, ${size}% 100%)`,
              } as React.CSSProperties
            }
            className="absolute top-0 left-0 w-full"
          >
            <div
              style={{
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
              }}
            >
              <Dashboard />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
