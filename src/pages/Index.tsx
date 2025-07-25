import { Button } from "@/components/ui/button";
import { Calendar, CheckSquare, BarChart3, Clock, Star, Zap, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { RetroCard, RetroCardHeader, RetroCardTitle, RetroCardDescription, RetroCardContent, RetroCardIcon } from "@/components/ui/retro-card";
<<<<<<< HEAD
import { TypingAnimation } from "@/components/ui/typing-animation"
=======
>>>>>>> 2b1620fa45e0bff3e7ca54f989342dd106ea84d9

export function TypingAnimationDemo() {
  return (
    <TypingAnimation
      className="text-2xl md:text-2xl font-semibold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent leading-tight"
      text="Made by Shrey Rathod with ❤️"
    />
  );
}

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-glow/10 relative">
      <BackgroundPaths className="z-0" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 backdrop-blur-sm">
                <Calendar className="h-16 w-16 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent leading-tight">
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
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary/20 hover:border-primary hover:bg-primary/5 font-semibold px-8 py-6 rounded-xl transition-all duration-300"
                >
                  <Link to="/auth">
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Features Grid */}
          <TypingAnimationDemo />

<<<<<<< HEAD
          {/* Retro Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15">
            <RetroCard>
              <RetroCardHeader>
                <RetroCardIcon />
                <RetroCardTitle>Task Management</RetroCardTitle>
                <RetroCardDescription>
                  Organize your weekly tasks and stay productive.
                </RetroCardDescription>
              </RetroCardHeader>
            </RetroCard>
            <RetroCard>
              <RetroCardHeader>
                <RetroCardIcon />
                <RetroCardTitle>Analytics</RetroCardTitle>
                <RetroCardDescription>
                  Track your progress with insightful analytics.
                </RetroCardDescription>
              </RetroCardHeader>
            </RetroCard>
            <RetroCard>
              <RetroCardHeader>
                <RetroCardIcon />
                <RetroCardTitle>Reminders</RetroCardTitle>
                <RetroCardDescription>
                  Get timely reminders for your important tasks.
                </RetroCardDescription>
              </RetroCardHeader>
=======
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

          {/* Retro Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <RetroCard>
              <RetroCardHeader>
                <RetroCardIcon>
                  <CheckSquare className="h-8 w-8 text-neon-cyan" />
                </RetroCardIcon>
                <RetroCardTitle>Task Management</RetroCardTitle>
              </RetroCardHeader>
              <RetroCardContent>
                <RetroCardDescription>
                  Advanced status tracking with visual color coding, priority levels, and completion analytics. 
                  Organize your workflow with intelligent task categorization and progress monitoring.
                </RetroCardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 text-xs bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 rounded-full">
                    Priority System
                  </span>
                  <span className="px-3 py-1 text-xs bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-full">
                    Visual Coding
                  </span>
                </div>
              </RetroCardContent>
            </RetroCard>

            <RetroCard>
              <RetroCardHeader>
                <RetroCardIcon>
                  <Zap className="h-8 w-8 text-neon-purple" />
                </RetroCardIcon>
                <RetroCardTitle>Cloud Sync</RetroCardTitle>
              </RetroCardHeader>
              <RetroCardContent>
                <RetroCardDescription>
                  Seamless synchronization across all your devices with real-time updates. 
                  Never lose your data with automatic backups and instant access from anywhere.
                </RetroCardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 text-xs bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-full">
                    Real-time Sync
                  </span>
                  <span className="px-3 py-1 text-xs bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 rounded-full">
                    Auto Backup
                  </span>
                </div>
              </RetroCardContent>
>>>>>>> 2b1620fa45e0bff3e7ca54f989342dd106ea84d9
            </RetroCard>
          </div>
        </div>
      </div>
    </div>
  );
}