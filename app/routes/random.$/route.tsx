import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { loader } from "./loader.server";
import { Demo } from "./demo";
import { ActionBar } from "./action-bar";
import { Header } from "./header";

export { loader } from "./loader.server";
export { action } from "./action.server";
export { meta } from "./meta";

export default function RandomPage() {
  const { light, dark } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const colorScheme =
    searchParams.get("color-scheme") === "dark" ? dark : light;

  return (
    <div
      className={`relative ${searchParams.get("color-scheme") || "light"}`}
      style={
        {
          ...colorScheme,
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          borderColor: "hsl(var(--border))",
        } as React.CSSProperties
      }
    >
      <div className="h-14 w-screen fixed top-0">
        <Header />
      </div>
      <div className="w-screen h-screen px-4 py-14 lg:p-14">
        <Demo light={light} dark={dark} />
      </div>
      <ActionBar light={light} dark={dark} />
    </div>
  );
}
