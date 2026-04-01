import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Leaderboard } from "./pages/Leaderboard";
import { Discover } from "./pages/Discover";
import { Rewards } from "./pages/Rewards";
import { Toast } from "./components/layout/Toast";

function App() {
  return (
    <div className="flex h-screen bg-bg-primary">
      <div className="w-full max-w-md mx-auto flex flex-col">
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
        <Toast />
      </div>
    </div>
  );
}

export default App;
