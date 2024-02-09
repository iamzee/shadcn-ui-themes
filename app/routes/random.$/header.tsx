import { ShadcnLogo } from "~/components/shadcn-logo";
import { NavLink } from "@remix-run/react";
import { cn } from "~/utils/cn";
import { Badge } from "~/components/ui/badge";

export const Header = () => {
  return (
    <div className="w-full h-full flex items-center px-14 justify-between">
      <div className="flex items-center space-x-2">
        <ShadcnLogo />
        <span className="font-bold inline-block text-primary">
          shadcn/ui themes
        </span>
      </div>
      <span className="font-medium underline underline-offset-2 text-secondary">
        Generate beautiful random themes for your shadcn UI
      </span>
      <div className="text-sm space-x-5">
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
            "transition-colors hover:text-foreground/80 opacity-60"
            // isActive ? "text-foreground font-medium" : "text-foreground/60"
          )}
        >
          Playground <Badge variant="outline">Coming soon</Badge>
        </span>
      </div>
    </div>
  );
};
