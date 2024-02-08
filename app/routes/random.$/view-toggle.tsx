import { useSearchParams } from "@remix-run/react";
import { SplitSquareHorizontal, Square } from "lucide-react";
import { Label } from "~/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export const ViewToggle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") || "single";

  return (
    <div className="flex items-center space-x-2">
      <Label>View</Label>
      <ToggleGroup
        type="single"
        defaultValue={view}
        onValueChange={(value) =>
          setSearchParams((prev) => {
            prev.set("view", value);
            return prev;
          })
        }
      >
        <ToggleGroupItem value="single" aria-label="Toggle single view">
          <Square className="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="split" aria-label="Toggle split view">
          <SplitSquareHorizontal className="w-4 h-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
