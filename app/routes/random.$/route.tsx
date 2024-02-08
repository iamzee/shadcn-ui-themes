import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { loader } from "./loader.server";
import { ExamplesNav } from "./example-nav";
import { Example } from "./example";
import { ActionBar } from "./action-bar";

export { loader } from "./loader.server";
export { action } from "./action.server";

export default function RandomPage() {
  const { light, dark } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const colorScheme =
    searchParams.get("color-scheme") === "dark" ? dark : light;

  return (
    <div
      className="relative"
      style={
        {
          ...colorScheme,
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          borderColor: "hsl(var(--border))",
        } as React.CSSProperties
      }
    >
      <div className="h-14 w-screen fixed top-0">Header</div>
      <div className="w-screen h-screen p-14 pb-28">
        <ExamplesNav />
        <Example light={light} dark={dark} />
      </div>
      <div className="h-14 w-screen fixed bottom-0 flex justify-center items-center space-x-5">
        <ActionBar light={light} dark={dark} />
      </div>
    </div>
  );
}
