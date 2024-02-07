import { Form, useLoaderData } from "@remix-run/react";
import type { loader } from "./loader.server";
import { Dashboard } from "~/shadcn-examples/dashboard";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Copy } from "lucide-react";
import copy from "copy-to-clipboard";

export { loader } from "./loader.server";

export default function RandomTheme() {
  const { light, dark } = useLoaderData<typeof loader>();

  const [size, setSize] = useState(50);

  return (
    <div
      className="relative"
      style={
        {
          ...light,
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
        } as React.CSSProperties
      }
    >
      <div className="w-screen h-screen p-14">
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
      <div className="h-14 w-screen fixed bottom-0 flex justify-center items-center">
        <ActionBar light={light} dark={dark} />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ActionBar({ light, dark }: { light: any; dark: any }) {
  const properties = [
    "--background",
    "--foreground",
    "--card",
    "--card-foreground",
    "--popover",
    "--popover-foreground",
    "--primary",
    "--primary-foreground",
    "--secondary",
    "--secondary-foreground",
    "--muted",
    "--muted-foreground",
    "--accent",
    "--accent-foreground",
    "--destructive",
    "--destructive-foreground",
    "--border",
    "--input",
    "--ring",
  ];

  const theme = `
@layer base {
  .light {
    ${properties
      .reduce((pre, curr) => pre + "\n" + `    ${curr}: ${light[curr]};`, "")
      .substring(5)}
  }

  .dark {
    ${properties
      .reduce((pre, curr) => pre + "\n" + `    ${curr}: ${dark[curr]};`, "")
      .substring(5)}
  }
}
  `;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Copy Theme</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] z-[60]">
          <DialogHeader>
            <DialogTitle>Theme</DialogTitle>
            <DialogDescription>
              Copy and Paste the following code into your CSS file
            </DialogDescription>
          </DialogHeader>
          <div className="sm:max-h-[500px] overflow-y-auto relative">
            <Button
              variant="outline"
              className="absolute right-0 m-5"
              onClick={() => copy(theme)}
            >
              <Copy className="w-4 h-4" />
            </Button>
            <div className="bg-accent text-accent-foreground p-5 text-sm">
              <pre>{theme}</pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Form>
        <Button type="submit">Shuffle</Button>
      </Form>
    </>
  );
}
