import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignInCard, SignInCardContent, SignInCardDescription, SignInCardFooter, SignInCardHeader, SignInCardTitle } from '@/components/ui/sign-in-card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/calendar');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const redirectUrl = `${window.location.origin}/calendar`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Sign Up Successful!",
        description: "Please check your email to confirm your account.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-glow/10 flex items-center justify-center p-4 relative">
      <BackgroundPaths className="z-0" />
      <SignInCard className="w-full max-w-md relative z-10">
        <SignInCardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 backdrop-blur-sm">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </div>
          <SignInCardTitle>Create Account</SignInCardTitle>
          <SignInCardDescription>
            Join Weekly Calendar and start organizing your tasks
          </SignInCardDescription>
        </SignInCardHeader>
        
        <SignInCardContent className="space-y-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Create a password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
                minLength={8}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-white font-semibold transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Creating account...
                </div>
              ) : (
                <>
                  Create Account
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </>
              )}
            </Button>
          </form>
        </SignInCardContent>

        <SignInCardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/auth" 
              className="text-primary hover:text-primary-glow font-medium transition-colors duration-200 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </SignInCardFooter>
      </SignInCard>
    </div>
  );
}