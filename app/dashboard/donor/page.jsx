"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DonorDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [families, setFamilies] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "donor") {
      router.push("/auth/login");
    } else {
      fetchFamilies(token);
    }
  }, []);

  const fetchFamilies = async (token) => {
    try {
      const [adminRes, reportRes] = await Promise.all([
        fetch("/api/admin/add-family", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/report", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const adminData = adminRes.ok ? await adminRes.json() : { families: [] };
      const reportData = reportRes.ok ? await reportRes.json() : { families: [] };

      let allFamilies = [...(adminData.families || []), ...(reportData.families || [])];
      allFamilies = allFamilies.filter(f => f.status !== "sponsored");
      setFamilies(allFamilies);
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleSponsor = async (familyId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/donor/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ familyId }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Failed to send request");
      }

      setSuccessMessage(
        "Your request to sponsor this family was sent successfully! Please wait for the response."
      );

      setTimeout(() => setSuccessMessage(""), 4000);

      setFamilies(prev => prev.filter(f => f._id !== familyId));
    } catch (err) {
      console.error(err);
      setError("Server error, try again later");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#E0F2FE] via-white to-[#FFF7E0]">
        <p className="text-[#1A437E] font-medium">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-white to-[#FFF7E0] relative">
      {/* Success message */}
      {successMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-md z-50 text-center max-w-xs sm:max-w-md">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <header className="bg-[#1A437E] text-white shadow-md p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Donor Dashboard</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-[#FFD166] text-[#1A437E] px-4 sm:px-6 py-2 rounded-full font-semibold shadow hover:bg-[#F2A500] transition-all duration-300"
        >
          Back to Home
        </button>
      </header>

      <main className="p-4 sm:p-8 max-w-6xl mx-auto">
        {error && (
          <p className="mb-6 px-4 py-2 bg-red-100 text-red-700 rounded-md text-center sm:text-left">
            {error}
          </p>
        )}

        {families.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No families available for sponsorship yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md table-auto">
              <thead className="bg-[#1A437E] text-white">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold">Age</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold">Gender</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold">Needs</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold">Description</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {families.map((f) => (
                  <tr key={f._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 sm:px-6 py-3 text-gray-700 whitespace-nowrap">{f.age || "N/A"}</td>
                    <td className="px-4 sm:px-6 py-3 text-gray-700 whitespace-nowrap">{f.gender || "N/A"}</td>
                    <td className="px-4 sm:px-6 py-3 text-gray-700">{f.needs?.length ? f.needs.join(", ") : "N/A"}</td>
                    <td className="px-4 sm:px-6 py-3 text-gray-700">{f.description || "No description available"}</td>
                    <td className="px-4 sm:px-6 py-3">
                      <button
                        onClick={() => handleSponsor(f._id)}
                        className="w-full sm:w-auto bg-[#FFD166] text-[#1A437E] font-semibold px-3 sm:px-4 py-2 rounded-full shadow hover:bg-[#F2A500] transition-all duration-300 text-sm sm:text-base"
                      >
                        Sponsor →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
