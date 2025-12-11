"use client";

import { useEffect, useState } from "react";

export default function AdminSponsoredPage() {
  const [loading, setLoading] = useState(true);
  const [sponsored, setSponsored] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSponsored();
  }, []);

  const fetchSponsored = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/sponsored", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to load sponsored families");
      }

      const data = await res.json();
      setSponsored(data.sponsored || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load sponsored families");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-10 text-lg text-gray-600">Loading sponsored families...</p>;

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-[#1A437E]">Sponsored Families</h1>

      {error && <p className="mb-6 text-red-500 font-medium">{error}</p>}

      {sponsored.length === 0 ? (
        <p className="text-gray-500 italic">No sponsored families yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-[#1A437E] text-white">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">Donor</th>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">Email</th>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">Family Age</th>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">Family Gender</th>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">Needs</th>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sponsored.map((s) => (
                <tr
                  key={s._id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-8 py-5 text-gray-800">{s.donor?.name || "N/A"}</td>
                  <td className="px-8 py-5 text-gray-600">{s.donor?.email || "N/A"}</td>
                  <td className="px-8 py-5 text-gray-700">{s.family?.age || "N/A"}</td>
                  <td className="px-8 py-5 text-gray-700">{s.family?.gender || "N/A"}</td>
                  <td className="px-8 py-5 text-gray-700">{s.family?.needs?.join(", ") || "N/A"}</td>
                  <td className="px-8 py-5 text-gray-500 italic">{s.family?.description || "No description"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
