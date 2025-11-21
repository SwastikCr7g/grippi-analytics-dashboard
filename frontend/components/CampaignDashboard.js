'use client'; // <-- REQUIRED: Marks this as a Client Component because it uses hooks (useState, useSWR)

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import { API_BASE_URL } from '../utils/config';

// Function to handle data fetching (used by SWR)
const fetcher = (url) => fetch(url).then((res) => res.json());

// Main Component
export default function CampaignDashboard() {
  // 1. STATE MANAGEMENT
  // State to hold the current filter selection ('All', 'Active', or 'Paused')
  const [filterStatus, setFilterStatus] = useState('All');

  // 2. DATA FETCHING (using SWR)
  // Construct the API URL based on the filterStatus
  // If filter is 'All', the URL is /campaigns
  // If filter is 'Active' or 'Paused', the URL includes the query parameter: /campaigns?status=Active
  const url = useMemo(() => {
    if (filterStatus === 'All') {
      return `${API_BASE_URL}/campaigns`;
    }
    return `${API_BASE_URL}/campaigns?status=${filterStatus}`;
  }, [filterStatus]);
  
  // Use SWR for fetching data, handling loading, and caching
  const { data, error, isLoading } = useSWR(url, fetcher);

  // 3. RENDER LOGIC
  
  // Check for loading/error states
  if (error) return <div className="text-red-500 p-4">Failed to load campaigns. Please ensure the backend server is running on {API_BASE_URL} (Port 8000).</div>;
  if (isLoading) return <div className="text-gray-600 p-4">Loading campaign data...</div>;

  const campaigns = data || [];

  // Function to format cost as currency
  const formatCost = (cost) => {
    // The cost comes as a string (Decimal from FastAPI)
    const costValue = parseFloat(cost);
    return costValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Campaign Analytics Dashboard</h1>

      {/* Filter Dropdown */}
      <div className="mb-6 flex items-center">
        <label htmlFor="status-filter" className="mr-3 font-medium text-gray-700">Filter by Status:</label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-700"
        >
          <option value="All">All Campaigns</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
        </select>
        <span className="ml-4 text-sm text-gray-500">
          Showing {campaigns.length} result(s).
        </span>
      </div>

      {/* Campaign Table (using Tailwind CSS for readable layout) */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Campaign Name</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-right">Clicks</th>
              <th className="py-3 px-6 text-right">Cost</th>
              <th className="py-3 px-6 text-right">Impressions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {campaigns.map((campaign) => (
              <tr 
                key={campaign.id} 
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  {campaign.name}
                </td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 text-xs font-semibold rounded-full ${
                    campaign.status === 'Active' 
                      ? 'bg-green-200 text-green-700' 
                      : 'bg-yellow-200 text-yellow-700'
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-right">
                  {campaign.clicks.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-right font-semibold">
                  {formatCost(campaign.cost)}
                </td>
                <td className="py-3 px-6 text-right">
                  {campaign.impressions.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}