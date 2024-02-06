import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import randomColor from "randomcolor";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "shuffle": {
      const color = randomColor();
      return redirect(`/random/${color.split("#")[1]}`);
    }
  }
  return null;
};
