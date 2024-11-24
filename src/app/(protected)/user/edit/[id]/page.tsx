"use client";

import React from "react";

export default function UserPage() {
  const status = "loading";
  if (status === "loading") {
    if (status === "loading") {
      if (status === "loading") {
        if (status === "loading") {
          if (status === "loading") {
            if (status === "loading") {
              return <div>Loading...</div>;
            }
          }
        }
      }
    }
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p>Welcome to your personal dashboard!</p>
      </div>
    </div>
  );
}
