"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalFamilies: 0,
    pendingFamilies: 0,
    richUsers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/admin/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to load summary");
        }

        const data = await res.json();

        setStats({
          totalFamilies: data.totalFamilies ?? 0,
          pendingFamilies: data.pendingFamilies ?? 0,
          richUsers: data.richUsers ?? 0,
        });
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return <AdminDashboard stats={stats} loading={false} />;
}
