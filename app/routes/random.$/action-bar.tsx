import { Form, useParams } from "@remix-run/react";
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
import { Copy, Shuffle } from "lucide-react";
import { ColorSchemeToggle } from "./color-scheme-toggle";
import { ViewToggle } from "./view-toggle";
import { RadiusToggle } from "./radius-toggle";

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
  const params = useParams();
  const [, example] = paramsSchema.parse(params["*"]?.split("/"));

  return (
    <>
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
          <input type="hidden" name="example" value={example} />
          <Button type="submit">
            <Shuffle className="w-4 h-4 mr-2" />
            Shuffle
          </Button>
        </Form>
      </div>

      <div className="flex items-center divide-x-2 [&>*:not(:last-child)]:px-2 [&>*:last-child]:pl-2">
        <RadiusToggle />
        <ColorSchemeToggle />
        <ViewToggle />
      </div>
    </>
  );
};
