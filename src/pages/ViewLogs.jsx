"use client";

import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Filter,
  Play,
  Search,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import Button from "../components/common/Button";
import GlassCard from "../components/common/GlassCard";
import Header from "../components/layout/Header";
import { useAppState } from "../context/AppStateContext";
import { useAuth } from "../context/AuthContext";

const ViewLogs = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();
  const { state } = useAppState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  React.useEffect(() => {
    if (!isAuthenticated) {
      onNavigate("login");
    }
  }, [isAuthenticated, onNavigate]);

  const filteredSessions = state.testSessions.filter((session) => {
    const matchesSearch = session.specName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "passed" &&
        session.results.summary.successRate >= 80) ||
      (filterStatus === "failed" && session.results.summary.successRate < 80);

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (successRate) => {
    if (successRate >= 90) return "text-green-400 bg-green-500/20";
    if (successRate >= 70) return "text-yellow-400 bg-yellow-500/20";
    return "text-red-400 bg-red-500/20";
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen aurora-bg">
      <Header onNavigate={onNavigate} />

      <div className="pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Test Session History
            </h1>
            <p className="text-white/70 text-lg">
              View and manage your previous API testing sessions
            </p>
          </div>

          {/* Search and Filter */}
          <GlassCard className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search by API name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input w-full pl-12 pr-4 py-3 text-white placeholder-white/50"
                />
              </div>
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-white/50" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="glass-input px-4 py-3 text-white"
                >
                  <option value="all">All Sessions</option>
                  <option value="passed">Successful (≥80%)</option>
                  <option value="failed">Failed (&lt;80%)</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Sessions List */}
          {filteredSessions.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Test Sessions Found
              </h3>
              <p className="text-white/60 mb-6">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start by running your first API test to see results here"}
              </p>
              <Button onClick={() => onNavigate("tool")}>Start Testing</Button>
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {filteredSessions.map((session) => (
                <GlassCard
                  key={session.id}
                  className="p-6 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {session.specName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {session.specName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(session.timestamp)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.duration}s
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          session.results.summary.successRate
                        )}`}
                      >
                        {session.results.summary.successRate}% Success
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-400 font-semibold text-sm">
                          {session.results.summary.total}
                        </span>
                      </div>
                      <span className="text-white/70 text-sm">Total Tests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-white/70 text-sm">
                        {session.results.summary.passed} Passed
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <XCircle className="w-4 h-4 text-red-400" />
                      </div>
                      <span className="text-white/70 text-sm">
                        {session.results.summary.failed} Failed
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-white/70 text-sm">
                        {session.duration}s Duration
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <span>Session ID: {session.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                      <Button variant="secondary" size="sm">
                        Re-run Tests
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewLogs;
