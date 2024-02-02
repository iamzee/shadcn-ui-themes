import { useLoaderData } from "@remix-run/react";
import type { loader } from "./loader.server";
import { Dashboard } from "~/shadcn-examples/dashboard";

export { loader } from "./loader.server";

export default function RandomTheme() {
  const { sourceColor, light, dark } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{sourceColor}</h1>
      <div style={{ ...dark } as React.CSSProperties}>
        <div
          style={{
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
          }}
        >
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
