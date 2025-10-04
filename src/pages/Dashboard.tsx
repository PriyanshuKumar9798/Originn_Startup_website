import React, { useEffect, useState } from "react";

interface UserData {
  founderName?: string;
  companyName?: string;
}

const Dashboard: React.FC = () => {
  const [founderName, setFounderName] = useState<string>("");
  const [startupName, setStartupName] = useState<string>("");

  const notices: string[] = [
    "Welcome to Originn! Make sure to complete your startup profile.",
    "New campaign guidelines have been updated. Please review them.",
    "Reminder: Your subscription will expire in 5 days.",
  ];

  const guidelines: string[] = [
    "Complete your startup profile and KYC verification.",
    "Upload an engaging pitch deck and media content.",
    "Keep campaign updates frequent to build backer trust.",
    "Set realistic funding goals and perks for your backers.",
    "Share your campaign on social media to attract more supporters.",
  ];

  useEffect(() => {
    // Fetch data based on the currently logged-in user's email
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    if (currentUserEmail) {
      const userDataString = localStorage.getItem(currentUserEmail);
      if (userDataString) {
        try {
          const userData: UserData = JSON.parse(userDataString);
          setFounderName(userData.founderName || "Founder");
          setStartupName(userData.companyName || "");
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
      style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
    >
      {/* Dashboard Header */}
      <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            Welcome, {founderName}!
          </h2>

          {startupName && (
            <p className="mt-2 text-gray-600 text-lg">
              Dashboard for <span className="font-semibold text-gray-900">{startupName}</span>
            </p>
          )}
      </div>


      {/* Admin Notices */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="font-semibold text-yellow-800 mb-4 text-lg">📢 Admin Notices</h3>
        <ul className="list-disc list-inside space-y-2 text-yellow-900">
          {notices.map((notice, idx) => (
            <li key={idx} className="hover:text-yellow-700 transition">{notice}</li>
          ))}
        </ul>
      </div>

      {/* Guidelines */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="font-semibold mb-4 text-lg text-gray-900">📌 Guidelines for a Successful Campaign</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {guidelines.map((item, idx) => (
            <li
              key={idx}
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#192a51")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5568")}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;