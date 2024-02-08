import { ActionFunctionArgs, redirect } from "@remix-run/node";
import randomColor from "randomcolor";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const example = String(formData.get("example"));
  const sourceColor = randomColor();
  const url = new URL(request.url);
  return redirect(
    `/random/${sourceColor.split("#")[1]}/${example}${url.search}`
  );
};
