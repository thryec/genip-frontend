import Link from "next/link";
import { GitBranch } from "lucide-react";
import { WalletConnect } from "@/components/wallet/WalletConnect";

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = () => {
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/register", label: "REGISTER IP" },
    { href: "/verify", label: "VERIFY IP" },
    { href: "/dashboard", label: "DASHBOARD" },
  ];

  return (
    <nav
      className={`flex items-center justify-between p-6 border-b border-gray-800/50`}
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
            key={link.href}
            href={link.href}
            className="text-gray-400 hover:text-gray-300 transition-colors"
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
