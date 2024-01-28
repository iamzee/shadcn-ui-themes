import { LoaderFunctionArgs } from "@remix-run/node";
import { readFile } from "fs";
import { join } from "path";
import { z } from "zod";
import { promisify } from "util";
import postcss from "postcss";

const readFileAsync = promisify(readFile);

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // extract `author` and `theme` from the url
  const { author, theme } = z
    .object({
      author: z.string(),
      theme: z.string(),
    })
    .parse(params);

  // read css file
  const pathToTheme = join(process.cwd(), "themes", author, theme);
  const fileData = await readFileAsync(pathToTheme + ".css");

  // convert it to javascript object
  const ast = postcss.parse(fileData.toString());

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

  const darkNodes = ruleNodes.find((n) => n.selector === ".light")?.nodes;
  const darkDeclNodes = darkNodes?.filter(
    (n) => n.type === "decl"
  ) as postcss.Declaration[];
  const darkObj = darkDeclNodes.reduce(
    (prev, curr) => ({ ...prev, [curr.prop]: curr.value }),
    {}
  );

  return {
    light: lightObj,
    dark: darkObj,
  };
};
