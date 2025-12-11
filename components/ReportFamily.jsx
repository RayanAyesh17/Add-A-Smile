"use client";

import { useState } from "react";

export default function ReportFamily() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterContact: "",
    reporterPhone: "", // new
    location: "",
    needs: "",
    age: "",
    gender: "",
    urgency: "medium",
    description: "",
    phone: "", // new - family's phone
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess("Report submitted successfully!");
        setFormData({
          reporterName: "",
          reporterContact: "",
          reporterPhone: "",
          location: "",
          needs: "",
          age: "",
          gender: "",
          urgency: "medium",
          description: "",
          phone: "",
        });
        setStep(1);
      } else {
        setError(data.error || "Failed to submit report.");
      }
    } catch {
      setError("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-white to-[#FFF7E0] flex justify-center items-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl border border-gray-100">
        
        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          <div className={`flex-1 text-center font-semibold ${step === 1 ? "text-[#1A437E]" : "text-gray-400"}`}>
            Reporter Info
          </div>
          <div className={`flex-1 text-center font-semibold ${step === 2 ? "text-[#1A437E]" : "text-gray-400"}`}>
            Family Info
          </div>
        </div>

        {error && <p className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-md">{error}</p>}
        {success && <p className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-md">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  name="reporterName"
                  value={formData.reporterName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD166] text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Your Contact (Email)</label>
                <input
                  type="text"
                  name="reporterContact"
                  value={formData.reporterContact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD166] text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Your Phone Number</label>
                <input
                  type="text"
                  name="reporterPhone"
                  value={formData.reporterPhone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD166] text-gray-700"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-[#1A437E] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#2C5BA9] transition-all duration-300"
              >
                Next →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Family Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD166] text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Family Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD166] text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Family Needs</label>
                <input
                  type="text"
                  name="needs"
                  value={formData.needs}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD166] text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Family Age / Age Range</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD166] text-gray-700"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD166] text-gray-700"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Urgency Level</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD166] text-gray-700"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD166] text-gray-700"
                  rows={4}
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-300 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#FFD166] text-[#1A437E] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#F2A500] transition-all duration-300"
                >
                  {loading ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
