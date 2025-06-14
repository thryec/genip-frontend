import React from "react";
import Link from "next/link";
import { Wallet, Loader2, AlertCircle, GitBranch } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

interface WalletConnectProps {
  showFullAddress?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  showFullAddress = false,
  size = "md",
  variant = "default",
  className = "",
}) => {
  const {
    isConnected,
    address,
    isConnecting,
    error,
    connect,
    disconnect,
    formatAddress,
  } = useWallet();

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantClasses = {
    default: "bg-gray-900/80 hover:bg-gray-800 border border-gray-700/50",
    outline: "border border-gray-600 hover:bg-gray-800/50",
    ghost: "hover:bg-gray-800/50",
  };

  const baseClasses = `
    flex items-center space-x-2 rounded font-medium 
    transition-colors backdrop-blur-sm
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  if (isConnecting) {
    return (
      <button
        disabled
        className={`${baseClasses} opacity-70 cursor-not-allowed`}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Connecting...</span>
      </button>
    );
  }

  if (error) {
    return (
      <button
        onClick={connect}
        className={`${baseClasses} border-red-500/50 text-red-400`}
      >
        <AlertCircle className="w-4 h-4" />
        <span>Retry</span>
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-2">
        {/* Connected Status */}
        <button
          onClick={disconnect}
          className={`${baseClasses} border-green-500/30 bg-green-500/10`}
          title="Click to disconnect"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <Wallet className="w-4 h-4" />
          <span>{showFullAddress ? address : formatAddress}</span>
        </button>
      </div>
    );
  }

  return (
    <button onClick={connect} className={baseClasses}>
      <Wallet className="w-4 h-4" />
      <span>Connect Wallet</span>
    </button>
  );
};

// Mobile Navigation Component
export const MobileNavigation: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
}> = ({ isOpen, onClose, currentPage }) => {
  const navLinks = [
    { href: "/", label: "HOME", key: "home" },
    { href: "/register", label: "REGISTER IP", key: "register" },
    { href: "/verify", label: "VERIFY IP", key: "verify" },
    { href: "/dashboard", label: "DASHBOARD", key: "dashboard" },
  ];

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-gray-950">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={onClose}
          >
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold">GenIP</span>
          </Link>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={onClose}
              className={`block px-6 py-4 text-lg hover:bg-gray-800/50 transition-colors ${
                currentPage === link.key
                  ? "text-white bg-gray-800/30"
                  : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Wallet Connection */}
        <div className="p-6 border-t border-gray-800/50">
          <WalletConnect
            size="lg"
            variant="outline"
            className="w-full justify-center"
          />
        </div>
      </div>
    </div>
  );
};
