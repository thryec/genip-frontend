"use client";

import React, { useState } from "react";
import {
  Search,
  Loader2,
  Atom,
  Shield,
  GitBranch,
  Wallet,
  ArrowLeft,
  CheckCircle,
  Copy,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

const VerifyPage = () => {
  const [moleculePrompt, setMoleculePrompt] = useState("");
  const [generatedSMILES, setGeneratedSMILES] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleGenerateMolecule = async () => {
    if (!moleculePrompt.trim()) return;

    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedSMILES("C1=CC=C(C=C1)C(=O)C2=CC=CC=C2"); // Example: Benzophenone
      setIsGenerating(false);
    }, 2000);
  };

  const handleVerifyIP = async () => {
    if (!generatedSMILES) return;

    setIsVerifying(true);
    setHasSearched(true);

    // Simulate verification - randomly return registered or not
    setTimeout(() => {
      const isRegistered = Math.random() > 0.5;

      if (isRegistered) {
        setVerificationResult({
          status: "registered",
          ipAssetId: "0x1a2b3c4d5e6f...",
          owner: "0x742d35Cc6634...",
          registrationDate: "2025-01-15T10:30:00Z",
          storyTxHash: "0x9f8e7d6c5b4a...",
          zkProofValid: true,
        });
      } else {
        setVerificationResult({
          status: "not_registered",
          zkProofValid: false,
        });
      }

      setIsVerifying(false);
    }, 3000);
  };

  const Navigation = () => (
    <nav className="flex items-center justify-between p-6 border-b border-gray-800/50">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <GitBranch className="w-5 h-5 text-black" />
        </div>
        <span className="text-xl font-bold">GenIP</span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-sm">
        <a href="/" className="hover:text-gray-300 transition-colors">
          HOME
        </a>
        <a href="/register" className="hover:text-gray-300 transition-colors">
          REGISTER IP
        </a>
        <a href="/dashboard" className="hover:text-gray-300 transition-colors">
          DASHBOARD
        </a>
      </div>

      <button className="flex items-center space-x-2 bg-gray-900/80 hover:bg-gray-800 px-4 py-2 rounded border border-gray-700/50 transition-colors">
        <Wallet className="w-4 h-4" />
        <span>Optional for Verification</span>
      </button>
    </nav>
  );

  return (
    <div className="bg-gray-950 text-white min-h-screen font-mono">
      <Navigation />

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <a
            href="/"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </a>

          <h1 className="text-4xl font-bold mb-4">Verify Molecular IP</h1>
          <p className="text-gray-400 text-lg">
            Check if a molecular structure has been registered on Story Protocol
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">
                Describe the Molecule to Verify
              </label>
              <textarea
                value={moleculePrompt}
                onChange={(e) => setMoleculePrompt(e.target.value)}
                placeholder="e.g., 'A benzene ring with a carbonyl group attached to another benzene ring'"
                className="w-full h-32 bg-gray-900 border border-gray-700 rounded p-4 text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none resize-none"
              />
            </div>

            <button
              onClick={handleGenerateMolecule}
              disabled={!moleculePrompt.trim() || isGenerating}
              className="w-full bg-white text-black py-3 rounded font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating SMILES...</span>
                </>
              ) : (
                <>
                  <Atom className="w-4 h-4" />
                  <span>Generate SMILES</span>
                </>
              )}
            </button>

            {generatedSMILES && (
              <div className="bg-gray-900 border border-gray-700 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Generated SMILES</span>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <code className="text-green-400 break-all">
                  {generatedSMILES}
                </code>
              </div>
            )}

            {generatedSMILES && (
              <button
                onClick={handleVerifyIP}
                disabled={isVerifying}
                className="w-full border border-gray-600 bg-gray-900/30 backdrop-blur-sm py-3 rounded font-medium hover:bg-gray-800/50 hover:border-gray-500 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Registration...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Check Registration Status</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Verification Results
              </h3>

              {!hasSearched && (
                <div className="bg-gray-900 border border-gray-700 rounded h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Generate and verify a molecule to see results</p>
                  </div>
                </div>
              )}

              {isVerifying && (
                <div className="bg-gray-900 border border-gray-700 rounded p-6">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-white mx-auto mb-4 animate-spin" />
                    <p className="text-gray-400">
                      Checking Story Protocol registry...
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Validating ZK proof
                    </p>
                  </div>
                </div>
              )}

              {verificationResult &&
                verificationResult.status === "registered" && (
                  <div className="bg-gray-900 border border-green-500/50 rounded p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <div>
                        <h4 className="font-bold text-green-400">REGISTERED</h4>
                        <p className="text-sm text-gray-400">
                          This molecule is protected on Story Protocol
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <label className="block text-gray-400 mb-1">
                          IP Asset ID
                        </label>
                        <div className="flex items-center space-x-2">
                          <code className="flex-1 bg-gray-800 px-2 py-1 rounded text-green-400">
                            {verificationResult.ipAssetId}
                          </code>
                          <button className="text-gray-400 hover:text-white">
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1">
                          Owner Address
                        </label>
                        <div className="flex items-center space-x-2">
                          <code className="flex-1 bg-gray-800 px-2 py-1 rounded text-green-400">
                            {verificationResult.owner}
                          </code>
                          <button className="text-gray-400 hover:text-white">
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1">
                          Registration Date
                        </label>
                        <p className="text-white">
                          {new Date(
                            verificationResult.registrationDate
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 pt-2 border-t border-gray-700">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">
                          ZK Proof Valid
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              {verificationResult &&
                verificationResult.status === "not_registered" && (
                  <div className="bg-gray-900 border border-red-500/50 rounded p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                      <div>
                        <h4 className="font-bold text-red-400">
                          NOT REGISTERED
                        </h4>
                        <p className="text-sm text-gray-400">
                          This molecule is not found in the registry
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-gray-400">
                        This molecular structure has not been registered on
                        Story Protocol. You can register it to claim IP
                        ownership.
                      </p>

                      <a
                        href="/register"
                        className="block w-full bg-white text-black py-2 rounded font-medium hover:bg-gray-200 transition-colors text-center"
                      >
                        Register This IP
                      </a>
                    </div>
                  </div>
                )}
            </div>

            {generatedSMILES && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Molecular Structure
                </h3>
                <div className="bg-gray-900 border border-gray-700 rounded h-48 flex items-center justify-center">
                  <div className="text-center">
                    <Atom className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      Structure visualization
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Benzophenone (C₁₃H₁₀O)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-gray-900/50 border border-gray-700 rounded p-6">
            <h3 className="font-semibold mb-3">How Verification Works</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-400">
              <div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center mb-2">
                  <span className="text-xs">1</span>
                </div>
                <p>
                  Generate SMILES string from your molecular description using
                  AI
                </p>
              </div>
              <div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center mb-2">
                  <span className="text-xs">2</span>
                </div>
                <p>Create ZK proof hash and search Story Protocol registry</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center mb-2">
                  <span className="text-xs">3</span>
                </div>
                <p>
                  Display registration status and ownership information if found
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
