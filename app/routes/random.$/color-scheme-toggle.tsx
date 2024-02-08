import { useSearchParams } from "@remix-run/react";
import { Moon, Sun } from "lucide-react";
import { Label } from "~/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export const ColorSchemeToggle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const colorScheme = searchParams.get("color-scheme") || "light";

  return (
    <div className="flex items-center space-x-2">
      <Label>Color Scheme</Label>
      <ToggleGroup
        type="single"
        defaultValue={colorScheme}
        onValueChange={(value) =>
          setSearchParams((prev) => {
            prev.set("color-scheme", value);
            return prev;
          })
        }
      >
        <ToggleGroupItem value="light" aria-label="Toggle light">
          <Sun className="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Toggle dark">
          <Moon className="w-4 h-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
