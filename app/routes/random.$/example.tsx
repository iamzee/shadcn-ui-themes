import { useParams, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { Dashboard } from "~/shadcn-examples/dashboard";
import CardsExample from "~/shadcn-examples/cards";
import { paramsSchema } from "./params-schema";

const exampleComponentMap = {
  dashboard: <Dashboard />,
  cards: <CardsExample />,
};

type ExampleProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  light: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dark: any;
};

export const Example = ({ light, dark }: ExampleProps) => {
  const params = useParams();
  const [, example] = paramsSchema.parse(params["*"]?.split("/"));
  const [size, setSize] = useState(50);
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "single";
  const colorScheme =
    searchParams.get("color-scheme") === "dark" ? dark : light;

  if (view === "single") {
    return (
      <div className="relative h-full !overflow-y-auto rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
        <div
          style={
            {
              ...colorScheme,
            } as React.CSSProperties
          }
          className="absolute top-0 left-0 w-full"
        >
          <div
            style={{
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              borderColor: "hsl(var(--border))",
            }}
          >
            {exampleComponentMap[example]}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      className="relative h-full !overflow-y-auto rounded-[0.5rem] border bg-background shadow-md md:shadow-xl"
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
              borderColor: "hsl(var(--border))",
            }}
          >
            {exampleComponentMap[example]}
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
              borderColor: "hsl(var(--border))",
            }}
          >
            {exampleComponentMap[example]}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
