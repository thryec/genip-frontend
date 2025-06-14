// src/app/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Shield,
  Zap,
  GitBranch,
  Calendar,
  Atom,
} from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen overflow-hidden font-mono">
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          {/* Molecular structure inspired elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-gray-600 rounded-full"></div>
          <div className="absolute top-32 left-20 w-4 h-4 bg-gray-400 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-gray-600 rounded-lg rotate-45"></div>
          <div className="absolute top-60 right-32 w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gray-700 rounded-full"></div>
          <div className="absolute bottom-60 left-1/3 w-2 h-2 bg-gray-400 rounded-full"></div>

          {/* Connection lines (like molecular bonds) */}
          <div className="absolute top-28 left-24 w-16 h-px bg-gradient-to-r from-gray-500 to-transparent rotate-45"></div>
          <div className="absolute top-48 right-28 w-12 h-px bg-gradient-to-r from-gray-500 to-transparent -rotate-45"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/20 to-transparent">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(156, 163, 175, 0.1) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-900/80 border border-gray-700/50 rounded-full px-6 py-2 text-sm flex items-center space-x-2 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-gray-300" />
              <span>Built on</span>
              <span className="font-semibold text-white">Story Protocol</span>
              <span>•</span>
              <span>Zero-Knowledge Proofs</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Next-Gen
              <br />
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Molecular IP
              </span>
              <br />
              on Story Protocol
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Secure molecular discoveries with programmable IP infrastructure.
              Register, verify, and manage IP rights with zero-knowledge
              privacy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <button className="bg-white text-black px-8 py-4 rounded font-medium hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2 group shadow-lg">
                  <span>Register IP on Story</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href="/verify">
                <button className="border border-gray-600/50 bg-gray-900/30 backdrop-blur-sm px-8 py-4 rounded font-medium hover:bg-gray-800/50 hover:border-gray-500 transition-colors">
                  Verify IP
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative border-t border-gray-800/50 py-20 bg-gray-900/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Powered by Story Protocol
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Next-generation IP infrastructure meets molecular science
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-gray-900/60 border border-gray-800/50 rounded p-8 hover:border-gray-700/50 transition-all duration-300 backdrop-blur-sm hover:bg-gray-900/80 group">
              <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-all duration-300">
                <GitBranch className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Story Protocol IP Assets
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Leverage programmable IP infrastructure for molecular
                structures. Create, manage, and monetize IP rights with
                blockchain transparency.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900/60 border border-gray-800/50 rounded p-8 hover:border-gray-700/50 transition-all duration-300 backdrop-blur-sm hover:bg-gray-900/80 group">
              <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-all duration-300">
                <Shield className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Zero-Knowledge Privacy
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Prove molecular ownership without revealing structures. Advanced
                cryptography keeps your compounds confidential.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900/60 border border-gray-800/50 rounded p-8 hover:border-gray-700/50 transition-all duration-300 backdrop-blur-sm hover:bg-gray-900/80 group">
              <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-all duration-300">
                <Zap className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                AI-Powered Interface
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Natural language to molecular structures. Generate
                SMILES/SELFIES with AI and visualize compounds instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-gray-400">Confidential Registration</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                ∞
              </div>
              <div className="text-gray-400">Molecular Structures</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                ZK
              </div>
              <div className="text-gray-400">Cryptographic Proof</div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="relative py-20 border-t border-gray-800/50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">See GenIP in Action</h2>
          <p className="text-gray-400 mb-8">
            Experience the future of molecular IP protection with our live demo
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/register">
              <div className="bg-gray-900/50 border border-gray-800 rounded p-6 hover:border-gray-700 transition-all duration-300 group cursor-pointer">
                <Atom className="w-12 h-12 text-gray-300 mx-auto mb-4 group-hover:text-white transition-colors" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                  Register Your IP
                </h3>
                <p className="text-gray-400 text-sm">
                  Try registering a molecular structure with our AI-powered
                  interface
                </p>
              </div>
            </Link>

            <Link href="/verify">
              <div className="bg-gray-900/50 border border-gray-800 rounded p-6 hover:border-gray-700 transition-all duration-300 group cursor-pointer">
                <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4 group-hover:text-white transition-colors" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                  Verify Ownership
                </h3>
                <p className="text-gray-400 text-sm">
                  Check if a molecular structure is already registered
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold">GenIP</span>
            </Link>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a
                href="https://docs.story.foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>Documentation</span>
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/bpolania/GenIP"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>GitHub</span>
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://story.foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>Story Protocol</span>
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>
              © 2025 GenIP. Securing molecular innovation with zero-knowledge
              proofs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
