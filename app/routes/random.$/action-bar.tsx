import { Form, useParams, useSearchParams } from "@remix-run/react";
import { paramsSchema } from "./params-schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import copy from "copy-to-clipboard";
import { Copy, Moon, SplitSquareHorizontal, Square, Sun } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ActionBar = ({ light, dark }: { light: any; dark: any }) => {
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

  const [searchParams, setSearchParams] = useSearchParams();
  const colorScheme = searchParams.get("color-scheme") || "light";
  const view = searchParams.get("view") || "single";
  const params = useParams();
  const [, example] = paramsSchema.parse(params["*"]?.split("/"));

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
      <Form method="POST">
        <input type="hidden" name="example" value={example} />
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
};
