import { useLoaderData } from "@remix-run/react";
import type { loader } from "./loader.server";

export { loader } from "./loader.server";

export default function AuthorTheme() {
  const { allThemes, currTheme } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Current Theme</h1>
      <p>{JSON.stringify(currTheme, null, 2)}</p>
      <hr />
      <h1>All Themes</h1>
      {Object.keys(allThemes).map((key) => (
        <div key={key}>
          <h2>{key}</h2>
          <p>{JSON.stringify(allThemes[key], null, 2)}</p>
        </div>
      ))}
    </div>
  );
}
