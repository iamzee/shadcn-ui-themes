import { useSearchParams } from "@remix-run/react";
import { Label } from "~/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export const RadiusToggle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const radius = searchParams.get("radius") || "0.5";

  return (
    <div className="flex items-center space-x-2">
      <Label className="text-primary">Radius</Label>
      <ToggleGroup
        type="single"
        defaultValue={radius}
        onValueChange={(value) =>
          setSearchParams((prev) => {
            prev.set("radius", value);
            return prev;
          })
        }
      >
        <ToggleGroupItem value="0" aria-label="Toggle radius 0rem">
          0
        </ToggleGroupItem>
        <ToggleGroupItem value="0.3" aria-label="Toggle radius 0.3rem">
          0.3
        </ToggleGroupItem>
        <ToggleGroupItem value="0.5" aria-label="Toggle radius 0.5rem">
          0.5
        </ToggleGroupItem>
        <ToggleGroupItem value="0.75" aria-label="Toggle radius 0.75rem">
          0.75
        </ToggleGroupItem>
        <ToggleGroupItem value="1" aria-label="Toggle radius 1rem">
          1
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
