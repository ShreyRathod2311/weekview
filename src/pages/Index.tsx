import { Button } from "@/components/ui/button";
import { Calendar, CheckSquare, BarChart3, Clock, Star, Zap, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-glow/10 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Calendar className="h-12 w-12 text-primary mx-auto animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-glow/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 backdrop-blur-sm">
                <Calendar className="h-16 w-16 text-primary" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent leading-tight">
              Weekly Calendar
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Plan, track, and manage your weekly tasks with intelligent scheduling, 
              real-time notifications, and comprehensive analytics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/calendar">
                  <Calendar className="mr-2 h-5 w-5" />
                  Open Calendar
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link to="/auth">
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-2 border-primary/20 hover:border-primary hover:bg-primary/5 font-semibold px-8 py-6 rounded-xl transition-all duration-300">
                  <Link to="/auth">
                    <Calendar className="mr-2 h-5 w-5" />
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Smart Scheduling</h3>
                <p className="text-muted-foreground">
                  Create time-blocked tasks with custom durations and intelligent conflict detection.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Priority Notifications</h3>
                <p className="text-muted-foreground">
                  Get timely alerts for important tasks 15 minutes before they begin.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Progress Analytics</h3>
                <p className="text-muted-foreground">
                  Track completion rates, time spent, and productivity trends over time.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-task-completed/10 to-task-completed/5 border border-task-completed/20">
              <div className="flex items-center space-x-4">
                <CheckSquare className="h-8 w-8 text-task-completed" />
                <div className="text-left">
                  <h4 className="text-lg font-semibold">Task Management</h4>
                  <p className="text-muted-foreground">Status tracking with visual color coding</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/5 border border-primary/20">
              <div className="flex items-center space-x-4">
                <Zap className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <h4 className="text-lg font-semibold">Cloud Sync</h4>
                  <p className="text-muted-foreground">Access your calendar from any device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}