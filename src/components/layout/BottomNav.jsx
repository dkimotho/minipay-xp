import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Zap,
  Compass,
  Gift,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", icon: BarChart3, label: "Dashboard" },
  { path: "/leaderboard", icon: Zap, label: "Leaderboard" },
  { path: "/discover", icon: Compass, label: "Discover" },
  { path: "/rewards", icon: Gift, label: "Rewards" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-bg-tertiary">
      <div className="flex justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 relative transition-colors ${
                isActive ? "text-accent-green" : "text-gray-500"
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-green" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
