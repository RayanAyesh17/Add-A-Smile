"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RichUsers() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/auth/login");
    } else {
      fetchRichUsers(token);
    }
  }, []);

  const fetchRichUsers = async (token) => {
    try {
      const res = await fetch("/api/admin/rich-users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to fetch users");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUsers(data.users);
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
        <p className="text-lg text-gray-600 animate-pulse">Loading donors...</p>
      </div>
    );

  return (
    <div className="min-h-screen p-10 max-w-6xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-wide">
        Signed-Up Donors
      </h1>

      {error && (
        <p className="mb-6 px-4 py-3 bg-red-200 text-red-800 rounded-lg shadow-sm text-sm font-medium">
          {error}
        </p>
      )}

      {users.length === 0 ? (
        <p className="text-gray-600 text-lg">No donors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {u.name}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium text-gray-600">Email:</span>{" "}
                {u.email}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium text-gray-600">Phone:</span>{" "}
                {u.phone}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">Role:</span>{" "}
                {u.role}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
