"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalFamilies: 0,
    pendingFamilies: 0,
    richUsers: 0,
  });

  const [recentFamilies, setRecentFamilies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    Promise.all([
      fetch("/api/admin/summary", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),

      fetch("/api/admin/families", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([summaryData, familiesData]) => {
        setStats(summaryData);
        setRecentFamilies(familiesData.families.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminDashboard
      stats={stats}
      recentFamilies={recentFamilies}
      loading={loading}
    />
  );
}
