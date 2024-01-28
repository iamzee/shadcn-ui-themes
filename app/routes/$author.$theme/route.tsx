import { useLoaderData } from "@remix-run/react";
import type { loader } from "./loader.server";

export { loader } from "./loader.server";

export default function AuthorTheme() {
  const { light } = useLoaderData<typeof loader>();

  return (
    <div style={light}>
      <h1 style={{ background: "hsl(var(--primary))" }}>Hello world</h1>
    </div>
  );
}
