import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Users, ChevronRight , Activity , LockKeyhole, Blocks, Settings, HandCoins } from "lucide-react";

export default function AdminSettings({ isOpen }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef(null); // Ref for the Sidebar Button
  const menuRef = useRef(null);   // 👈 NEW: Ref for the Popup Menu

  // Logic to calculate where the menu should appear
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (showMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom - 100, 
        left: rect.right + 10
      });
    }
  }, [showMenu]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // 1. If clicking the trigger button, ignore (toggle handles it)
      if (buttonRef.current && buttonRef.current.contains(event.target)) return;
      
      // 2. 👈 NEW FIX: If clicking INSIDE the menu (the portal), ignore
      // This allows the specific button onClick to fire before the menu closes
      if (menuRef.current && menuRef.current.contains(event.target)) return;

      setShowMenu(false);
    }
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleNavigation = (path) => {
    console.log("Navigating to:", path);
    navigate(path);
    setShowMenu(false);
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors relative
          ${showMenu ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}
        `}
      >
        <div className="flex items-center">
           <span className="truncate">Admin Settings</span>
        </div>
        <ChevronRight 
          size={14} 
          className={`transition-transform duration-300 ${showMenu ? "rotate-180" : ""}`} 
        />
      </button>

      {/* FLYOUT MENU (Rendered via Portal) */}
      {showMenu && createPortal(
        <div 
          ref={menuRef} // 👈 ATTACH THE REF HERE
          className="fixed w-56 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          style={{
            left: "228px",
             bottom: "20px", 
             position: "fixed"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Team & WorkSpace setup
            </p>
          </div>

          <div className="p-1 space-y-0.5">
            <MenuOption 
              icon={<Users size={16} />} 
              label="User and Teams" 
              onClick={() => handleNavigation('/admin/users')} 
            />
            <MenuOption 
              icon={<Activity size={16} />} 
              label="System Activity" 
              onClick={() => handleNavigation('/admin/system-activity')} 
            />
            <MenuOption 
              icon={<LockKeyhole size={16} />} 
              label="Security" 
              onClick={() => handleNavigation('/admin/security')} 
            />
            <MenuOption 
              icon={<HandCoins size={16} />} 
              label="Plan Overview" 
              onClick={() => handleNavigation('/admin/plan-overview')} 
            />
            <MenuOption 
              icon={<Blocks  size={16} />} 
              label="Integrations" 
              onClick={() => handleNavigation('/admin/integrations')} 
            />
            <MenuOption 
              icon={<Settings size={16} />} 
              label="All Settings" 
              onClick={() => handleNavigation('/admin/settings')} 
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function MenuOption({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors text-left"
    >
      <span className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors">
        {icon}
      </span>
      {label}
    </button>
  );
}