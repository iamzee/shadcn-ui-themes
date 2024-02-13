import { Form, useSearchParams } from "@remix-run/react";
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
import {
  Copy,
  Moon,
  Shuffle,
  SplitSquareHorizontal,
  Square,
  Sun,
} from "lucide-react";
import { ColorSchemeToggle } from "./color-scheme-toggle";
import { ViewToggle } from "./view-toggle";
import { RadiusToggle } from "./radius-toggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

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

  return (
    <>
      {/* Laptop screens ------------- */}
      <div className="h-14 px-14 w-screen fixed bottom-0 lg:flex justify-between items-center space-x-5 bg-accent/60 hidden">
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Copy className="w-4 h-4 mr-2" />
                Copy Theme
              </Button>
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
            <Button type="submit">
              <Shuffle className="w-4 h-4 mr-2" />
              Shuffle
            </Button>
          </Form>
          <p className="text-sm font-medium text-secondary">
            Built by{" "}
            <a
              href="https://twitter.com/adeen_zeeshan"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Zeeshan Adeen
            </a>
          </p>
        </div>

        <div className="flex items-center divide-x-2 [&>*:not(:last-child)]:px-2 [&>*:last-child]:pl-2">
          <RadiusToggle />
          <ColorSchemeToggle />
          <ViewToggle />
        </div>
      </div>

      {/* Mobile screens --------- */}
      <div className="h-14 px-4 w-screen fixed bottom-0 flex items-center space-x-2 bg-accent/80 lg:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Copy className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen max-h-screen lg:max-w-[800px] z-[60]">
            <DialogHeader>
              <DialogTitle>Theme</DialogTitle>
              <DialogDescription>
                Copy and Paste the following code into your CSS file
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[500px] overflow-y-auto relative">
              <Button
                variant="outline"
                className="absolute right-0 m-5"
                onClick={() => copy(theme)}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <div className="bg-accent text-accent-foreground p-1 lg:p-5 text-sm">
                <pre>{theme}</pre>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Form method="POST">
          <Button type="submit">
            <Shuffle className="w-4 h-4" />
          </Button>
        </Form>
        <Select
          defaultValue={searchParams.get("radius") || "0.5"}
          onValueChange={(value) =>
            setSearchParams((prev) => {
              prev.set("radius", value);
              return prev;
            })
          }
        >
          <SelectTrigger className="w-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Radius</SelectLabel>
              <SelectItem value="0">0rem</SelectItem>
              <SelectItem value="0.3">0.3rem</SelectItem>
              <SelectItem value="0.5">0.5rem</SelectItem>
              <SelectItem value="0.75">0.75rem</SelectItem>
              <SelectItem value="1">1rem</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          defaultValue={searchParams.get("color-scheme") || "light"}
          onValueChange={(value) =>
            setSearchParams((prev) => {
              prev.set("color-scheme", value);
              return prev;
            })
          }
        >
          <SelectTrigger className="w-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Color Scheme</SelectLabel>
              <SelectItem value="light">
                <Sun className="w-4 h-4" />
              </SelectItem>
              <SelectItem value="dark">
                <Moon className="w-4 h-4" />
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          defaultValue={searchParams.get("view") || "single"}
          onValueChange={(value) =>
            setSearchParams((prev) => {
              prev.set("view", value);
              return prev;
            })
          }
        >
          <SelectTrigger className="w-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Color Scheme</SelectLabel>
              <SelectItem value="single">
                <Square className="w-4 h-4" />
              </SelectItem>
              <SelectItem value="split">
                <SplitSquareHorizontal className="w-4 h-4" />
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
