import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UtensilsCrossed, UserPlus } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! You can now sign in.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background font-body flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <UtensilsCrossed className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">Savory Bites</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-1">Join us and start ordering</p>
        </div>

        <form onSubmit={handleSignup} className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <div>
            <Label>I am a</Label>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  role === "user"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:bg-secondary"
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  role === "admin"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:bg-secondary"
                }`}
              >
                Admin
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            <UserPlus className="h-4 w-4 mr-2" />
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
