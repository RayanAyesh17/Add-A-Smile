"use client";

import { useEffect, useState } from "react";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    childrenAge: "",
    image: null,
  });

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/activities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setActivities(data.activities || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !formData.image) return;

    try {
      setSubmitting(true);
      const form = new FormData();
      Object.entries(formData).forEach(([k, v]) => v && form.append(k, v));

      const res = await fetch("/api/admin/activities", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (!res.ok) return alert("Failed to add activity");

      fetchActivities();
      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        childrenAge: "",
        image: null,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-600 animate-pulse">Loading activities...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-10 text-gray-800">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          NGO Activities
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#1A437E] text-white px-6 py-3 rounded-xl hover:bg-[#163766]"
        >
          + Add Activity
        </button>
      </div>

      {/* MODAL (SHORTER + WHITE) */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-2xl p-6 space-y-3 shadow-2xl"
          >
            <h2 className="text-xl font-semibold text-center text-gray-900">
              Add Activity
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />

            <textarea
              placeholder="Description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Age"
                value={formData.childrenAge}
                onChange={(e) =>
                  setFormData({ ...formData, childrenAge: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="text-sm text-gray-600"
            />

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-lg bg-[#1A437E] text-white hover:bg-[#163766]"
              >
                {submitting ? "Adding…" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ACTIVITIES */}
      <section className="max-w-7xl mx-auto">
        {activities.length === 0 ? (
          <p className="text-gray-500">No programs recorded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((a) => (
              <div
                key={a._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                {a.image && (
                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-44 w-full object-cover rounded-t-2xl"
                  />
                )}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {a.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {a.description}
                  </p>
                  <div className="pt-2 text-sm text-gray-500 space-y-1">
                    <p>📅 {new Date(a.date).toLocaleDateString()}</p>
                    <p>📍 {a.location || "N/A"}</p>
                    <p>👶 {a.childrenAge || "N/A"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
