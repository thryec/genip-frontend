"use client";

import { useState } from "react";
import {
  Plus,
  Atom,
  Copy,
  ExternalLink,
  Wallet,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Shield,
} from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";

type StatusType = "confirmed" | "pending" | "failed";

interface MockIPData {
  id: string;
  name: string;
  smiles: string;
  ipAssetId: string;
  registrationDate: string;
  status: StatusType;
  txHash: string;
  formula: string;
}

const DashboardPage = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock registered IPs
  const registeredIPs: MockIPData[] = [
    {
      id: "1",
      name: "Benzophenone Derivative",
      smiles: "C1=CC=C(C=C1)C(=O)C2=CC=CC=C2",
      ipAssetId: "0x1a2b3c4d5e6f...",
      registrationDate: "2025-01-15T10:30:00Z",
      status: "confirmed",
      txHash: "0x9f8e7d6c5b4a...",
      formula: "C₁₃H₁₀O",
    },
    {
      id: "2",
      name: "Aspirin Analog",
      smiles: "CC(=O)OC1=CC=CC=C1C(=O)O",
      ipAssetId: "0x2b3c4d5e6f7a...",
      registrationDate: "2025-01-14T15:45:00Z",
      status: "pending",
      txHash: "0xa8f7e6d5c4b3...",
      formula: "C₉H₈O₄",
    },
    {
      id: "3",
      name: "Novel Quinoline",
      smiles: "C1=CC=C2C(=C1)C=CC=N2",
      ipAssetId: "0x3c4d5e6f7a8b...",
      registrationDate: "2025-01-13T09:15:00Z",
      status: "confirmed",
      txHash: "0xb7e6d5c4b3a2...",
      formula: "C₉H₇N",
    },
  ];

  const StatusBadge = ({ status }: { status: StatusType }) => {
    const colors = {
      confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      failed: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    return (
      <span
        className={`px-2 py-1 rounded border text-xs font-medium ${colors[status]}`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  const filteredIPs = registeredIPs.filter((ip) => {
    const matchesSearch =
      ip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ip.smiles.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || ip.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (!isWalletConnected) {
    return (
      <div className="bg-gray-950 text-white min-h-screen font-mono">
        <Navigation />

        <div className="container mx-auto px-6 py-24 max-w-2xl text-center">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">
            Connect Wallet to View Dashboard
          </h1>
          <p className="text-gray-400 mb-8">
            Connect your wallet to view your registered molecular IP assets
          </p>
          <button
            onClick={() => setIsWalletConnected(true)}
            className="bg-white text-black px-8 py-3 rounded font-medium hover:bg-gray-200 transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen font-mono">
      <Navigation />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">IP Dashboard</h1>
            <p className="text-gray-400">
              Manage your registered molecular IP assets
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button className="flex items-center space-x-2 border border-gray-600 px-4 py-2 rounded hover:bg-gray-800 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <a
              href="/register"
              className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Register New IP</span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded p-6">
            <div className="text-2xl font-bold mb-1">3</div>
            <div className="text-gray-400 text-sm">Total Registered</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded p-6">
            <div className="text-2xl font-bold mb-1">2</div>
            <div className="text-gray-400 text-sm">Confirmed</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded p-6">
            <div className="text-2xl font-bold mb-1">1</div>
            <div className="text-gray-400 text-sm">Pending</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded p-6">
            <div className="text-2xl font-bold mb-1">0</div>
            <div className="text-gray-400 text-sm">Failed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or SMILES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-gray-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* IP List */}
        <div className="space-y-4">
          {filteredIPs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Atom className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No IP assets found matching your criteria</p>
            </div>
          ) : (
            filteredIPs.map((ip) => (
              <div
                key={ip.id}
                className="bg-gray-900 border border-gray-800 rounded p-6 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{ip.name}</h3>
                      <StatusBadge status={ip.status} />
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(ip.registrationDate).toLocaleDateString()}
                        </span>
                      </span>
                      <span>{ip.formula}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-gray-400 mb-1">
                      SMILES String
                    </label>
                    <code className="bg-gray-800 px-2 py-1 rounded text-green-400 text-xs break-all">
                      {ip.smiles}
                    </code>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">
                      IP Asset ID
                    </label>
                    <code className="bg-gray-800 px-2 py-1 rounded text-green-400 text-xs">
                      {ip.ipAssetId}
                    </code>
                  </div>
                </div>

                {ip.status === "confirmed" && (
                  <div className="mt-4 pt-4 border-t border-gray-800 flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">
                      Registered on Story Protocol
                    </span>
                    <span className="text-gray-500">•</span>
                    <a
                      href={`https://explorer.story.foundation/tx/${ip.txHash}`}
                      className="text-gray-400 hover:text-white"
                    >
                      View Transaction
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Empty State for new users */}
        {registeredIPs.length === 0 && (
          <div className="text-center py-24">
            <Atom className="w-16 h-16 text-gray-400 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold mb-4">No IP Assets Yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start protecting your molecular discoveries by registering your
              first IP asset
            </p>
            <a
              href="/register"
              className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded font-medium hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Register Your First IP</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
