import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import convert from "color-convert";
import randomColor from "randomcolor";
import { ZodError } from "zod";
import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { paramsSchema } from "./params-schema";

const shadcnVariableMaterialThemeMap = {
  "--background": "background",
  "--foreground": "onBackground",
  "--card": "surface",
  "--card-foreground": "onSurface",
  "--popover": "surface",
  "--popover-foreground": "onSurface",
  "--primary": "primary",
  "--primary-foreground": "onPrimary",
  "--secondary": "secondary",
  "--secondary-foreground": "onSecondary",
  "--muted": "surfaceVariant",
  "--muted-foreground": "outline",
  "--accent": "surfaceVariant",
  "--accent-foreground": "onSurfaceVariant",
  "--destructive": "error",
  "--destructive-foreground": "onError",
  "--border": "outlineVariant",
  "--input": "outlineVariant",
  "--ring": "primary",
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  try {
    // extract `sourceColor` and `example` from params (splat route)
    // if they are not present redirect to `/random/:randomColor/dashboard`
    const [sourceColor] = await paramsSchema.parseAsync(
      params["*"]?.split("/")
    );

    const theme = themeFromSourceColor(argbFromHex(sourceColor));
    const radius = new URL(request.url).searchParams.get("radius") || "0.5";
    const light = Object.keys(shadcnVariableMaterialThemeMap).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: convert.hex
          .hsl(
            hexFromArgb(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              theme.schemes.light[shadcnVariableMaterialThemeMap[curr]]
            )
          )
          .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
          .join(" "),
      }),
      { "--radius": `${radius}rem` }
    );

    const dark = Object.keys(shadcnVariableMaterialThemeMap).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: convert.hex
          .hsl(
            hexFromArgb(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              theme.schemes.dark[shadcnVariableMaterialThemeMap[curr]]
            )
          )
          .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
          .join(" "),
      }),
      { "--radius": `${radius}rem` }
    );

    return {
      light,
      dark,
    };
  } catch (err) {
    if (err instanceof ZodError) {
      const sourceColor = randomColor();
      return redirect(`/random/${sourceColor.split("#")[1]}/dashboard`);
    }
    throw new Response("something went wrong!!");
  }
};
