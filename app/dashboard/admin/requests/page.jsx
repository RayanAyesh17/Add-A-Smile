"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRequestsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`/api/admin/requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: action }),
      });

      setRequests(requests.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error updating request: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading requests...</p>
      </div>
    );

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-[#1A437E]">
        Sponsorship Requests
      </h1>

      {error && <p className="mb-6 text-red-500 font-medium">{error}</p>}

      {requests.length === 0 ? (
        <p className="text-gray-500 italic">No pending requests.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-[#1A437E] text-white">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">
                  Donor
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">
                  Email
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">
                  Family Age
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">
                  Family Gender
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">
                  Needs
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-8 py-5 text-gray-800">{r.donor?.name}</td>
                  <td className="px-8 py-5 text-gray-600">{r.donor?.email}</td>
                  <td className="px-8 py-5 text-gray-700">{r.family?.age}</td>
                  <td className="px-8 py-5 text-gray-700">{r.family?.gender}</td>
                  <td className="px-8 py-5 text-gray-700">
                    {r.family?.needs?.join(", ")}
                  </td>
                  <td className="px-8 py-5 space-x-3">
                    <button
                      onClick={() => handleAction(r._id, "accepted")}
                      className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 transition-colors duration-200"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(r._id, "rejected")}
                      className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 transition-colors duration-200"
                    >
                      Reject
                    </button>
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
