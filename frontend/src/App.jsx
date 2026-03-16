import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DataEnrichmentView from "./components/views/DataEnrichmentView";
import WelcomeView from "./components/views/WelcomeView";
import MyListsView from "./components/views/MyListsView";
import PeopleView from "./components/views/People/PeopleView";
import CompaniesView from "./components/views/CompaniesView";
import Sequence from "./components/views/Engage/Sequence/Sequence";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Emails from "./components/views/Engage/Emails/Emails";
import Calls from "./components/views/Engage/Call/Calls";
import UserTeam from "./components/views/AdminSettingViews/UserTeam";
import SystemActivity from "./components/views/AdminSettingViews/SystemActivity";
import Security from "./components/views/AdminSettingViews/Security";
import PlanOverview from "./components/views/AdminSettingViews/PlanOverview";
import Integrations from "./components/views/AdminSettingViews/Integrations";
import AdminSettings from "./components/views/AdminSetting";
import AllSetting from "./components/views/AdminSettingViews/AllSetting";
import Meetings from "./components/views/WinDeals/Meetings/Meetings";
import Conversations from "./components/views/WinDeals/Conversations/Conversations";
import DealsOverview from "./components/views/WinDeals/Deals/Overview";
import CreateLeadView from "./components/views/People/CreateLeadView";
import ProtectedRoute from "./components/ProtectedRoute";
import PersonPage from "./components/views/People/PersonPage";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath =
    location.pathname === "/" ? "home" : location.pathname.substring(1);

  // --- FIX IS HERE ---
  // Hide Navbar for BOTH Login AND Signup pages
  const showNavbar =
    location.pathname !== "/login" && location.pathname !== "/signup";

  const handleSidebarNavigation = (viewName) => {
    switch (viewName.toLowerCase()) {
      case "home":
        navigate("/");
        break;
      case "data-enrichment":
      case "enrichment":
        navigate("/data-enrichment");
        break;
      case "lists":
        navigate("/lists");
        break;
      case "people":
        navigate("/people");
        break;
      case "companies":
        navigate("/companies");
        break;
      case "sequence":
      case "sequences":
        navigate("/sequence");
        break;
      case "email":
      case "emails":
        navigate("/emails");
        break;
      case "call":
      case "calls":
        navigate("/calls");
        break;
      case "meetings":
        navigate("/meetings");
        break;
      case "conversations":
        navigate("/conversations");
        break;
      case "deals":
        navigate("/deals");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar is hidden on Login/Signup */}
      {showNavbar && (
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          setCurrentView={handleSidebarNavigation}
          currentView={currentPath}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopBar is hidden on Login/Signup */}
        {showNavbar && (
          <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        <main className="flex-1 overflow-auto">
          <Routes>
            {/* These routes will now be full screen because showNavbar is false */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<WelcomeView />} />
              <Route path="/data-enrichment" element={<DataEnrichmentView />} />
              <Route path="/lists" element={<MyListsView />} />
              <Route path="/people" element={<PeopleView />} />
              <Route path="/people/:id" element={<PersonPage />} />
              <Route path="/people/create" element={<CreateLeadView />} />
              <Route path="/companies" element={<CompaniesView />} />
              <Route path="/sequence" element={<Sequence />} />
              <Route path="/emails" element={<Emails />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/conversations" element={<Conversations />} />
              <Route path="/deals" element={<DealsOverview />} />
              <Route path="/admin/users" element={<UserTeam />} />
              <Route
                path="/admin/system-activity"
                element={<SystemActivity />}
              />
              <Route path="/admin/security" element={<Security />} />
              <Route path="/admin/plan-overview" element={<PlanOverview />} />
              <Route path="/admin/integrations" element={<Integrations />} />
              <Route path="/admin/settings" element={<AllSetting />} />
              <Route path="*" element={<PeopleView />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}
