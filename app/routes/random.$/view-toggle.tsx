import { useSearchParams } from "@remix-run/react";
import { SplitSquareHorizontal, Square } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export const ViewToggle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") || "single";

  return (
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
  );
};
