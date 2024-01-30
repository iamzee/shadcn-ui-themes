import type { loader } from "./loader.server";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ExamplesNav } from "./examples-nav";
import {
  PageActions,
  PageHeader,
  // PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header";
import { ActionDrawer } from "./action-drawer";

export { loader } from "./loader.server";

export default function AuthorTheme() {
  const { currTheme } = useLoaderData<typeof loader>();

  return (
    // injecting theme css variables ---
    <div style={{ ...currTheme.light }}>
      <div className="relative">
        {/* TODO: add `container` to tailwind.config.js */}
        <div className="container relative">
          <PageHeader>
            {/* <Announcement /> */}
            <PageHeaderHeading className="hidden md:block">
              Check out some examples
            </PageHeaderHeading>
            <PageHeaderHeading className="md:hidden">
              Examples
            </PageHeaderHeading>
            {/* FIXME: react-wrap-balancer throwing some error */}
            {/* <PageHeaderDescription>
              Dashboard, cards, authentication. Some examples built using the
              components. Use this as a guide to build your own.
            </PageHeaderDescription> */}
            <PageActions>
              {/* <Link
                href="/docs"
                className={cn(buttonVariants(), "rounded-[6px]")}
              >
                Get Started
              </Link>
              <Link
                href="/components"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-[6px]"
                )}
              >
                Components
              </Link> */}
            </PageActions>
          </PageHeader>
          <section>
            <ExamplesNav />
            <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
              <Outlet />
            </div>
          </section>
        </div>
        <ActionDrawer />
      </div>
    </div>
  );
}
