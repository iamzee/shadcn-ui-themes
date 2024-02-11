import { ActionFunctionArgs, redirect } from "@remix-run/node";
import randomColor from "randomcolor";

export const action = async ({ request }: ActionFunctionArgs) => {
  const sourceColor = randomColor();
  const url = new URL(request.url);
  return redirect(`/random/${sourceColor.split("#")[1]}${url.search}`);
};
