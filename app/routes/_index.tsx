import { redirect } from "@remix-run/node";
import randomColor from "randomcolor";

export const loader = () => {
  const sourceColor = randomColor();
  return redirect(`/random/${sourceColor.split("#")[1]}/dashboard`);
};

export default function IndexPage() {
  return <div></div>;
}
