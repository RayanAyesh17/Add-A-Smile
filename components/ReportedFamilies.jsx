"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportedFamilies() {
  const router = useRouter();
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") router.push("/auth/login");
    else fetchFamilies(token);
  }, []);

  const fetchFamilies = async (token) => {
    try {
      const res = await fetch("/api/report", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setFamilies(data.families || []);
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Loading reported families...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="px-4 py-2 bg-red-200 text-red-800 rounded-lg shadow-sm text-sm font-medium">
          {error}
        </p>
      </div>
    );

  return (
    <div className="p-10 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-[#1A437E] mb-8 tracking-wide">
        Reported Families
      </h1>

      {families.length === 0 ? (
        <p className="text-gray-600 text-lg">No reported families yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Needs</th>
                <th className="px-6 py-3 text-left">Age</th>
                <th className="px-6 py-3 text-left">Gender</th>
                <th className="px-6 py-3 text-left">Urgency</th>
                <th className="px-6 py-3 text-left">Description</th>

                {/* NEW COLUMNS */}
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Family Status</th>
                <th className="px-6 py-3 text-left">Reported By</th>
              </tr>
            </thead>

            <tbody>
              {families.map((f, idx) => (
                <tr key={f._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 text-gray-700">{f.location}</td>
                  <td className="px-6 py-4 text-gray-700">{f.needs?.join(", ")}</td>
                  <td className="px-6 py-4 text-gray-700">{f.age || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">{f.gender || "N/A"}</td>

                  <td className="px-6 py-4 font-semibold">
                    <span
                      className={
                        f.urgency === "high"
                          ? "text-red-600"
                          : f.urgency === "medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                      }
                    >
                      {f.urgency}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">{f.description || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {f.phone || f.reporterInfo?.phone || "N/A"}
                  </td>

                  {/* NEW — FAMILY STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={
                        f.status === "sponsored"
                          ? "text-green-600 font-semibold"
                          : "text-gray-600"
                      }
                    >
                      {f.status || "pending"}
                    </span>
                  </td>

                  {/* NEW — REPORTED BY */}
                  <td className="px-6 py-4 text-gray-700">
                    {f.reporterInfo.name === "Admin" ? "Admin" : "User"}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
