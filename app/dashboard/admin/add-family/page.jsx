"use client";

import { useState } from "react";

export default function AddFamily() {
  const [form, setForm] = useState({
    location: "",
    needs: "",
    age: "",
    gender: "male",
    urgency: "medium",
    description: "",
    phone: "", // new field
  });

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!form.phone) {
      return alert("Please enter a phone number for the family");
    }

    try {
      const res = await fetch("/api/admin/add-family", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          needs: form.needs.split(",").map((n) => n.trim()),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to add family");
        return;
      }

      alert("Family added successfully ✅");
      setForm({
        location: "",
        needs: "",
        age: "",
        gender: "male",
        urgency: "medium",
        description: "",
        phone: "",
      });
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Add Poor Family</h1>

      <form onSubmit={submit} className="space-y-4 text-gray-600">
        <input
          placeholder="Location"
          className="w-full border border-gray-400 p-3 rounded text-gray-700 placeholder-gray-500"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <input
          placeholder="Needs (comma separated)"
          className="w-full border border-gray-400 p-3 rounded text-gray-700 placeholder-gray-500"
          value={form.needs}
          onChange={(e) => setForm({ ...form, needs: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Age"
          className="w-full border border-gray-400 p-3 rounded text-gray-700 placeholder-gray-500"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />

        <select
          className="w-full border border-gray-400 p-3 rounded text-gray-700"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select
          className="w-full border border-gray-400 p-3 rounded text-gray-700"
          value={form.urgency}
          onChange={(e) => setForm({ ...form, urgency: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          placeholder="Family Phone Number"
          className="w-full border border-gray-400 p-3 rounded text-gray-700 placeholder-gray-500"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border border-gray-400 p-3 rounded text-gray-700 placeholder-gray-500"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="w-full bg-gray-700 text-white py-3 rounded hover:bg-gray-800 transition">
          Add Family
        </button>
      </form>
    </div>
  );
}
