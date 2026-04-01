import { WifiOff, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Offline = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm shadow-sm text-center">
        <CardContent className="p-8 space-y-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <WifiOff className="h-6 w-6 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-semibold">You're Offline</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            It looks like you've lost your internet connection. SafeVoice needs a connection to load case data securely.
          </p>
          <Button onClick={() => window.location.reload()} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Offline;
