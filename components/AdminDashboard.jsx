import Link from "next/link";
import {
    FaUsers,
    FaExclamationTriangle,
    FaUserShield,
    FaPlusCircle,
} from "react-icons/fa";

export default function AdminDashboard({
    stats,
    recentFamilies,
    loading,
}) {
    if (loading) {
        return <div className="p-8">Loading dashboard...</div>;
    }

    return (
        <div className="p-8 space-y-10">

            <h1 className="text-3xl font-bold text-[#1A437E]">
                Admin Dashboard
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
                    <div className="text-2xl">
                        <FaUsers className="text-[#1A437E]"   />
                    </div>
                    <div>
                        <p className="text-[#1A437E]">Total Families</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalFamilies}</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
                    <div className="text-2xl">
                        <FaExclamationTriangle className="text-[#1A437E]" />
                    </div>
                    <div>
                        <p className="text-[#1A437E]">Pending Reviews</p>
                        <p className="text-2xl font-bold text-red-600">{stats.pendingFamilies}</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
                    <div className="text-2xl">
                        <FaUserShield className="text-[#1A437E]"  />
                    </div>
                    <div>
                        <p className="text-[#1A437E]">Rich Users</p>
                        <p className="text-2xl font-bold text-green-600">{stats.richUsers}</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-[#1A437E]">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <QuickAction
                        href="/dashboard/admin/add-family"
                        icon={<FaPlusCircle className="text-[#1A437E]" />}
                        label={<span className="text-gray-600">Add Poor Family</span>}
                    />
                    <QuickAction
                        href="/dashboard/admin/rich-users"
                        icon={<FaUserShield className="text-[#1A437E]" />}
                        label={<span className="text-gray-600">View Rich Users</span>}
                    />
                    <QuickAction
                        href="/dashboard/admin/activities"
                        icon={<FaUsers className="text-[#1A437E]" />}
                        label={<span className="text-gray-600">View Activities</span>}
                    />
                </div>



            </div>

            
        </div>
    );
}

/* ---------------- components ---------------- */

function StatCard({ icon, title, value, alert }) {
    return (
        <div
            className={`bg-white p-6 rounded-xl shadow flex items-center gap-4 ${alert ? "border-l-4 border-red-500" : ""
                }`}
        >
            <div className="text-3xl text-[#1A437E]">{icon}</div>
            <div>
                <p className="text-gray-600">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}

function QuickAction({ href, icon, label }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition"
        >
            <span className="text-xl text-grey">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );
}
