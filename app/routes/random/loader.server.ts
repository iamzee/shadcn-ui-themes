import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import convert from "color-convert";
import randomColor from "randomcolor";
import _ from "lodash";

export const loader = () => {
  const color = randomColor();
  const theme = themeFromSourceColor(argbFromHex(color));
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
      .hsl(hexFromArgb(theme.schemes.light["tertiary"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--secondary-foreground": convert.hex
      .hsl(hexFromArgb(theme.schemes.light["onTertiary"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--muted": convert.hex
      .hsl(hexFromArgb(theme.schemes.light["surfaceVariant"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--muted-foreground": convert.hex
      .hsl(hexFromArgb(theme.schemes.light["onSurfaceVariant"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--accent": convert.hex
      .hsl(hexFromArgb(theme.schemes.light["secondary"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--accent-foreground": convert.hex
      .hsl(hexFromArgb(theme.schemes.light["onSecondary"]))
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
      .hsl(hexFromArgb(theme.schemes.light["outline"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--input": convert.hex
      .hsl(hexFromArgb(theme.schemes.light["outline"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--ring": convert.hex
      .hsl(hexFromArgb(theme.schemes.light["scrim"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--radius": `${_.sample([0, 0.3, 0.5, 0.75, 1])}rem`,
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
      .hsl(hexFromArgb(theme.schemes.dark["tertiary"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--secondary-foreground": convert.hex
      .hsl(hexFromArgb(theme.schemes.dark["onTertiary"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--muted": convert.hex
      .hsl(hexFromArgb(theme.schemes.dark["onSurfaceVariant"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--muted-foreground": convert.hex
      .hsl(hexFromArgb(theme.schemes.dark["surfaceVariant"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--accent": convert.hex
      .hsl(hexFromArgb(theme.schemes.dark["secondary"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--accent-foreground": convert.hex
      .hsl(hexFromArgb(theme.schemes.dark["onSecondary"]))
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
      .hsl(hexFromArgb(theme.schemes.dark["outline"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--input": convert.hex
      .hsl(hexFromArgb(theme.schemes.dark["outline"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--ring": convert.hex
      .hsl(hexFromArgb(theme.schemes.dark["scrim"]))
      .map((v, i) => (i === 1 || i === 2 ? `${v}%` : v))
      .join(" "),
    "--radius": `${_.sample([0, 0.3, 0.5, 0.75, 1])}rem`,
  };

  return {
    light,
    dark,
  };
};
