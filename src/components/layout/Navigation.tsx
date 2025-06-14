import React from "react";
import Link from "next/link";
import { GitBranch, Loader2 } from "lucide-react";
import { WalletConnect } from "@/components/wallet/WalletConnect";

interface NavigationProps {
  currentPage?: "home" | "register" | "verify" | "dashboard";
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage = "home",
  className = "",
}) => {
  const navLinks = [
    { href: "/", label: "HOME", key: "home" },
    { href: "/register", label: "REGISTER IP", key: "register" },
    { href: "/verify", label: "VERIFY IP", key: "verify" },
    { href: "/dashboard", label: "DASHBOARD", key: "dashboard" },
  ];

  return (
    <nav
      className={`flex items-center justify-between p-6 border-b border-gray-800/50 ${className}`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <GitBranch className="w-5 h-5 text-black" />
        </div>
        <span className="text-xl font-bold">GenIP</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 text-sm">
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={`hover:text-gray-300 transition-colors ${
              currentPage === link.key
                ? "text-white border-b border-gray-500 pb-1"
                : "text-gray-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Wallet Connection */}
      <WalletConnect />
    </nav>
  );
};
