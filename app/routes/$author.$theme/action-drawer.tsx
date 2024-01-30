import { ChevronsUpDown, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export function ActionDrawer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="fixed bottom-0 w-screen bg-background border-t p-5 space-y-5 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <ToggleGroup type="single" defaultValue="light">
          <ToggleGroupItem value="light" aria-label="Toggle light">
            <Sun className="w-4 h-4 mr-2" />
            Light
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" aria-label="Toggle dark">
            <Moon className="w-4 h-4 mr-2" />
            Dark
          </ToggleGroupItem>
        </ToggleGroup>
        <Button>Get this theme</Button>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2"></CollapsibleContent>
    </Collapsible>
  );
}
