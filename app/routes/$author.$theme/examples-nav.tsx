import { NavLink, Link } from "@remix-run/react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "~/utils/cn";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

const examples = [
  {
    name: "Mail",
    href: "mail",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/mail",
  },
  {
    name: "Dashboard",
    href: "dashboard",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/dashboard",
  },
  {
    name: "Cards",
    href: "cards",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/cards",
  },
  {
    name: "Tasks",
    href: "tasks",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/tasks",
  },
  {
    name: "Playground",
    href: "playground",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/playground",
  },
  {
    name: "Forms",
    href: "forms",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/forms",
  },
  {
    name: "Music",
    href: "music",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/music",
  },
  {
    name: "Authentication",
    href: "authentication",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/authentication",
  },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {examples.map((example) => (
            <NavLink
              to={example.href}
              key={example.href}
              className={({ isActive }) =>
                cn(
                  "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                  isActive
                    ? "bg-muted font-medium text-primary"
                    : "text-muted-foreground"
                )
              }
            >
              {example.name}
            </NavLink>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}

interface ExampleCodeLinkProps {
  pathname: string | null;
}

export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
  const example = examples.find((example) =>
    pathname?.startsWith(example.href)
  );

  if (!example?.code) {
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <Link
      to={example?.code}
      target="_blank"
      rel="nofollow"
      className="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
    >
      View code
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  );
}
