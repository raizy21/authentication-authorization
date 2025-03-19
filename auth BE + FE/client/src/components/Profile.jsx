import React from "react";

function Profile() {
  return (
    <div className="min-h-screen flex flex-col py-4 items-center">
      <h1 className="text-2xl">Profile Page</h1>
      <div className="p-6">
        <p className="text-lg">Email: user@example.com</p>
        <p className="text-lg">Role: user</p>
      </div>
    </div>
  );
}

export default Profile;
