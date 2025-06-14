"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Loader2,
  Atom,
  Shield,
  GitBranch,
  Wallet,
  ArrowLeft,
  CheckCircle,
  Copy,
  ExternalLink,
} from "lucide-react";

const RegisterPage = () => {
  const [step, setStep] = useState(1); // 1: Input, 2: Processing, 3: Success
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [moleculePrompt, setMoleculePrompt] = useState("");
  const [generatedSMILES, setGeneratedSMILES] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  const handleGenerateMolecule = async () => {
    if (!moleculePrompt.trim()) return;

    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedSMILES("C1=CC=C(C=C1)C(=O)C2=CC=CC=C2"); // Example: Benzophenone
      setIsGenerating(false);
    }, 2000);
  };

  const handleRegisterIP = async () => {
    if (!isWalletConnected) {
      setIsWalletConnected(true);
      return;
    }

    setIsRegistering(true);
    setStep(2);

    // Simulate registration process
    setTimeout(() => {
      setRegistrationData((prevState: any) => ({
        ...(prevState || {}),
        ipAssetId: "0x1a2b3c4d5e6f...",
        storyTxHash: "0x9f8e7d6c5b4a...",
        zkProofHash: "0x5a4b3c2d1e0f...",
        timestamp: new Date().toISOString(),
      }));
      setStep(3);
      setIsRegistering(false);
    }, 4000);
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
        <a href="/verify" className="hover:text-gray-300 transition-colors">
          VERIFY IP
        </a>
        <a href="/dashboard" className="hover:text-gray-300 transition-colors">
          DASHBOARD
        </a>
      </div>

      <button
        onClick={() => setIsWalletConnected(!isWalletConnected)}
        className="flex items-center space-x-2 bg-gray-900/80 hover:bg-gray-800 px-4 py-2 rounded border border-gray-700/50 transition-colors"
      >
        <Wallet className="w-4 h-4" />
        <span>{isWalletConnected ? "Connected" : "Connect Wallet"}</span>
      </button>
    </nav>
  );

  if (step === 1) {
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

            <h1 className="text-4xl font-bold mb-4">Register Molecular IP</h1>
            <p className="text-gray-400 text-lg">
              Describe your molecule and we'll register it confidentially on
              Story Protocol
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">
                  Describe Your Molecule
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
                    <span className="text-sm font-medium">
                      Generated SMILES
                    </span>
                    <button className="text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <code className="text-green-400 break-all">
                    {generatedSMILES}
                  </code>
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Molecular Structure
                </h3>
                <div className="bg-gray-900 border border-gray-700 rounded h-64 flex items-center justify-center">
                  {generatedSMILES ? (
                    <div className="text-center">
                      <Atom className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">
                        Structure visualization would appear here
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Benzophenone (C₁₃H₁₀O)
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <Atom className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Generate a molecule to see preview</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Registration Process</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                      1
                    </div>
                    <span className="text-gray-400">
                      Generate ZK proof of molecular structure
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                      2
                    </div>
                    <span className="text-gray-400">
                      Create IP asset on Story Protocol
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                      3
                    </div>
                    <span className="text-gray-400">
                      Register ownership with privacy preservation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {generatedSMILES && (
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="bg-gray-900/50 border border-gray-700 rounded p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Shield className="w-5 h-5 text-gray-300 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Privacy Notice</h4>
                    <p className="text-gray-400 text-sm">
                      Your molecular structure will be hashed using
                      zero-knowledge proofs. Only you will know the actual
                      compound, while ownership is verifiably yours on-chain.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRegisterIP}
                  className="w-full bg-white text-black py-3 rounded font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>
                    {isWalletConnected
                      ? "Register IP on Story Protocol"
                      : "Connect Wallet to Register"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="bg-gray-950 text-white min-h-screen font-mono">
        <Navigation />

        <div className="container mx-auto px-6 py-12 max-w-2xl">
          <div className="text-center">
            <div className="mb-8">
              <Loader2 className="w-16 h-16 text-white mx-auto mb-4 animate-spin" />
              <h1 className="text-3xl font-bold mb-4">Registering Your IP</h1>
              <p className="text-gray-400">
                Creating zero-knowledge proof and registering on Story
                Protocol...
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded p-6 text-left space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>ZK proof generated successfully</span>
              </div>
              <div className="flex items-center space-x-3">
                <Loader2 className="w-6 h-6 animate-spin text-white" />
                <span>Creating Story Protocol IP asset...</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>
                <span className="text-gray-500">
                  Confirming blockchain transaction
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              This process typically takes 30-60 seconds
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen font-mono">
      <Navigation />

      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            IP Successfully Registered!
          </h1>
          <p className="text-gray-400">
            Your molecular structure is now protected on Story Protocol
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Story Protocol IP Asset ID
            </label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-800 px-3 py-2 rounded text-green-400">
                {registrationData?.ipAssetId}
              </code>
              <button className="text-gray-400 hover:text-white">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Transaction Hash
            </label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-800 px-3 py-2 rounded text-green-400">
                {registrationData?.storyTxHash}
              </code>
              <button className="text-gray-400 hover:text-white">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              ZK Proof Hash
            </label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-800 px-3 py-2 rounded text-green-400">
                {registrationData?.zkProofHash}
              </code>
              <button className="text-gray-400 hover:text-white">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              setStep(1);
              setGeneratedSMILES("");
              setMoleculePrompt("");
            }}
            className="flex-1 border border-gray-600 py-3 rounded font-medium hover:bg-gray-800 transition-colors"
          >
            Register Another IP
          </button>
          <a
            href="/dashboard"
            className="flex-1 bg-white text-black py-3 rounded font-medium hover:bg-gray-200 transition-colors text-center"
          >
            View Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
