import {
  Form,
  Outlet,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import type { loader } from "./loader.server";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Copy, Moon, SplitSquareHorizontal, Square, Sun } from "lucide-react";
import copy from "copy-to-clipboard";
import { ExamplesNav } from "./example-nav";

export { loader } from "./loader.server";

export default function RandomTheme() {
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
        <Outlet />
      </div>
      <div className="h-14 w-screen fixed bottom-0 flex justify-center items-center space-x-5">
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
    "--radius",
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

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const colorScheme = searchParams.get("color-scheme") || "light";
  const view = searchParams.get("view") || "single";

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
      <Form action={location.pathname}>
        <Button type="submit">Shuffle</Button>
      </Form>
      <Button
        name="color-scheme"
        value="light"
        variant={colorScheme === "light" ? "default" : "outline"}
        onClick={() => {
          setSearchParams((prev) => {
            prev.set("color-scheme", "light");
            return prev;
          });
        }}
      >
        <Sun className="w-4 h-4" />
      </Button>

      <Button
        name="color-scheme"
        value="dark"
        variant={colorScheme === "dark" ? "default" : "outline"}
        onClick={() => {
          setSearchParams((prev) => {
            prev.set("color-scheme", "dark");
            return prev;
          });
        }}
      >
        <Moon className="w-4 h-4" />
      </Button>

      <Button
        name="view"
        value="single"
        variant={view === "single" ? "default" : "outline"}
        onClick={() => {
          setSearchParams((prev) => {
            prev.set("view", "single");
            return prev;
          });
        }}
      >
        <Square className="w-4 h-4" />
      </Button>

      <Button
        name="view"
        value="split"
        variant={view === "split" ? "default" : "outline"}
        onClick={() => {
          setSearchParams((prev) => {
            prev.set("view", "split");
            return prev;
          });
        }}
      >
        <SplitSquareHorizontal className="w-4 h-4" />
      </Button>
    </>
  );
}
