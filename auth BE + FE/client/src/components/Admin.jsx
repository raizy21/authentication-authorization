import React from "react";

function Admin() {
  return (
    <div className="min-h-screen flex flex-col py-4 items-center">
      <h1 className="text-2xl">Admin Dashboard</h1>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, Admin!</h2>
        <p className="text-gray-700">
          This is your dashboard where you can manage the application.
        </p>
      </div>
    </div>
  );
}

export default Admin;
