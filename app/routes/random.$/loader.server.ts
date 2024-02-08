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

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  try {
    // extract `sourceColor` and `example` from params (splat route)
    // if they are not present redirect to `/random/:randomColor/dashboard`
    const [sourceColor] = await paramsSchema.parseAsync(
      params["*"]?.split("/")
    );

    const theme = themeFromSourceColor(argbFromHex(sourceColor));
    const radius = new URL(request.url).searchParams.get("radius") || "0.5";
    const light = {
      "--background": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["background"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["onBackground"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--card": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["surface"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--card-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["onSurface"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--popover": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["surface"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--popover-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["onSurface"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--primary": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["primary"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--primary-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["onPrimary"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--secondary": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["secondary"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--secondary-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["onSecondary"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--muted": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["surfaceVariant"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--muted-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["outline"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--accent": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["surfaceVariant"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--accent-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["onSurfaceVariant"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--destructive": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["error"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--destructive-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["onError"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--border": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["outlineVariant"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--input": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["outlineVariant"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--ring": convert.hex
        .hsl(hexFromArgb(theme.schemes.light["primary"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--radius": `${radius}rem`,
    };

    const dark = {
      "--background": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["background"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["onBackground"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--card": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["surface"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--card-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["onSurface"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--popover": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["surface"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--popover-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["onSurface"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--primary": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["primary"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--primary-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["onPrimary"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--secondary": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["secondary"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--secondary-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["onSecondary"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--muted": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["surfaceVariant"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--muted-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["outline"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--accent": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["surfaceVariant"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--accent-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["onSurfaceVariant"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--destructive": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["error"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--destructive-foreground": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["onError"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--border": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["outlineVariant"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--input": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["outlineVariant"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--ring": convert.hex
        .hsl(hexFromArgb(theme.schemes.dark["primary"]))
        .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
        .join(" "),
      "--radius": `${radius}rem`,
    };

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
