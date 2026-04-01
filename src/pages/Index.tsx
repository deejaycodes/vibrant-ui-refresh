import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto h-14 w-14 rounded-xl bg-primary flex items-center justify-center">
          <Shield className="h-7 w-7 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">SafeVoice</h1>
          <p className="text-muted-foreground">
            Partner portal for case management and survivor support.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/login">
            <Button size="lg" className="w-full sm:w-auto">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">Register Organisation</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
