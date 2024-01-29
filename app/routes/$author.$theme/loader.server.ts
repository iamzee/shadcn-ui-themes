import { LoaderFunctionArgs } from "@remix-run/node";
import { readFile } from "fs";
import { join } from "path";
import { z } from "zod";
import { promisify } from "util";
import postcss from "postcss";
import { glob } from "glob";

const readFileAsync = promisify(readFile);

const themeDir = join(process.cwd(), "themes");

const getCssFromFile = async (filePath: string) => {
  const fileData = await readFileAsync(filePath);
  return fileData.toString();
};

// TODO: parse it using zod before returning
const cssToJs = (css: string) => {
  const ast = postcss.parse(css);

  const ruleNodes = ast.nodes.filter(
    (n) => n.type === "rule"
  ) as postcss.Rule[];
  const lightNodes = ruleNodes.find((n) => n.selector === ".light")?.nodes;
  const lightDeclNodes = lightNodes?.filter(
    (n) => n.type === "decl"
  ) as postcss.Declaration[];
  const lightObj = lightDeclNodes.reduce(
    (prev, curr) => ({ ...prev, [curr.prop]: curr.value }),
    {}
  );

  const darkNodes = ruleNodes.find((n) => n.selector === ".dark")?.nodes;
  const darkDeclNodes = darkNodes?.filter(
    (n) => n.type === "decl"
  ) as postcss.Declaration[];
  const darkObj = darkDeclNodes.reduce(
    (prev, curr) => ({ ...prev, [curr.prop]: curr.value }),
    {}
  );
  return { light: lightObj, dark: darkObj };
};

const getCurrTheme = async (author: string, theme: string) => {
  const currThemePath = join(themeDir, author, theme);
  const css = await getCssFromFile(currThemePath + ".css");
  return cssToJs(css);
};

const getAllThemes = async () => {
  const allThemePaths = await glob(`${themeDir}/**/*.css`);
  const cssArr = await Promise.all(
    allThemePaths.map((path) => getCssFromFile(path))
  );

  const data: {
    [key: string]: object;
  } = {};

  for (let i = 0; i < allThemePaths.length; i++) {
    const path = allThemePaths[i];
    const pathArr = path.split("/");
    const author = pathArr[pathArr.length - 2];
    const theme = pathArr[pathArr.length - 1].split(".")[0];

    const key = `${author}/${theme}`;
    data[key] = cssToJs(cssArr[i]);
  }

  return data;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // extract `author` and `theme` from the url
  const { author, theme } = z
    .object({
      author: z.string(),
      theme: z.string(),
    })
    .parse(params);

  const allThemes = await getAllThemes();
  const currTheme = await getCurrTheme(author, theme);

  return {
    allThemes,
    currTheme,
  };
};
