"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    FaPlusCircle,
    FaUsers,
    FaUserShield,
    FaChartLine,
    FaSignOutAlt,
    FaHandsHelping,
    FaBell
} from "react-icons/fa";
import Link from "next/link";

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { label: "Add a Family", icon: <FaPlusCircle />, path: "/dashboard/admin/add-family" },
        { label: "Reported Families", icon: <FaUsers />, path: "/dashboard/admin/reported-families" },
        { label: "Donors", icon: <FaUserShield />, path: "/dashboard/admin/rich-users" },
        { label: "Program Activities", icon: <FaChartLine />, path: "/dashboard/admin/activities" },
        { label: "Sponsored Families", icon: <FaHandsHelping />, path: "/dashboard/admin/sponsored-families" },
        { label: "Requests", icon: <FaBell />, path: "/dashboard/admin/requests" },
    ];

    const logout = () => {
        localStorage.clear();
        router.push("/");
    };

    return (
        <aside className="w-64 min-h-screen bg-[#1A437E] text-white flex flex-col">

            {/* Logo */}
            <Link href="/dashboard/admin/dashboard">
                <div className="p-6 text-2xl font-bold border-b border-white/20 cursor-pointer hover:bg-white/10 transition">
                    Admin Panel
                </div>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => router.push(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
              ${pathname === item.path
                                ? "bg-[#FFD166] text-[#1A437E] font-semibold"
                                : "hover:bg-white/10"
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/20">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-all"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </aside>
    );
}
