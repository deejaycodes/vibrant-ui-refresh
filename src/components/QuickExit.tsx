import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickExit = () => {
  const handleExit = () => {
    window.open("https://www.google.com", "_self");
    window.location.replace("https://www.google.com");
  };

  return (
    <div className="bg-destructive text-destructive-foreground px-4 py-2 flex items-center justify-between text-sm">
      <span className="font-medium">
        If you are in danger, exit this site quickly.
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleExit}
        className="text-destructive-foreground hover:bg-destructive/80 font-bold gap-1"
      >
        <X className="h-4 w-4" />
        Exit Site
      </Button>
    </div>
  );
};

export default QuickExit;
