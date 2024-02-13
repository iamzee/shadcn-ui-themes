import { NavLink } from "@remix-run/react";
import { cn } from "~/utils/cn";
import { Badge } from "~/components/ui/badge";
import { siteConfig } from "~/utils/site-config";

export const Header = () => {
  return (
    <div className="w-full h-full flex items-center px-14 lg:justify-between justify-center">
      <div className="flex items-center space-x-2">
        🎨
        <span className="font-bold inline-block text-primary ml-2">
          {siteConfig.title}
        </span>
      </div>
      <span className="font-medium underline underline-offset-2 text-secondary hidden lg:block">
        <q>{siteConfig.description}</q>
      </span>
      <div className="text-sm space-x-5 hidden lg:block">
        <NavLink
          to="/random"
          className={({ isActive }) =>
            cn(
              "transition-colors hover:text-foreground/80",
              isActive ? "text-foreground font-medium" : "text-foreground/60"
            )
          }
        >
          Random Themes
        </NavLink>
        <span
          // to="/playground"
          className={cn(
            "transition-colors hover:text-foreground/80 opacity-60 hidden"
            // isActive ? "text-foreground font-medium" : "text-foreground/60"
          )}
        >
          Playground <Badge variant="outline">Coming soon</Badge>
        </span>
      </div>
    </div>
  );
};
