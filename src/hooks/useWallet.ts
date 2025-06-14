// src/hooks/useWallet.ts
import { useState, useEffect } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  formatEther,
  type Address,
} from "viem";
import { WalletState } from "@/lib/types";

// Story Protocol Testnet chain configuration
const storyTestnetConfig = {
  id: 1315,
  name: "Story Protocol Testnet",
  network: "story-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "IP",
    symbol: "IP",
  },
  rpcUrls: {
    default: {
      http: ["https://aeneid.storyrpc.io/"],
    },
    public: {
      http: ["https://aeneid.storyrpc.io/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Story Explorer",
      url: "https://aeneid.story.foundation/",
    },
  },
} as const;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    isConnecting: false,
    address: undefined,
    chainId: undefined,
    error: undefined,
  });

  const [balance, setBalance] = useState<string>("0");
  const [walletClient, setWalletClient] = useState<any>(null);
  const [publicClient, setPublicClient] = useState<any>(null);

  // Initialize clients when wallet is connected
  useEffect(() => {
    if (walletState.isConnected && window.ethereum) {
      const client = createWalletClient({
        chain: storyTestnetConfig,
        transport: custom(window.ethereum),
      });

      const pubClient = createPublicClient({
        chain: storyTestnetConfig,
        transport: http("https://aeneid.storyrpc.io/"),
      });

      setWalletClient(client);
      setPublicClient(pubClient);
    }
  }, [walletState.isConnected]);

  // Fetch balance when address or public client changes
  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicClient || !walletState.address) return;

      try {
        const balance = await publicClient.getBalance({
          address: walletState.address,
        });
        setBalance(formatEther(balance));
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        setBalance("0");
      }
    };

    fetchBalance();
  }, [publicClient, walletState.address]);

  // Format address for display
  const formatAddress = (address?: string, chars = 4): string => {
    if (!address) return "";
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  };

  // Check if wallet is available
  const isWalletAvailable = (): boolean => {
    return (
      typeof window !== "undefined" && typeof window.ethereum !== "undefined"
    );
  };

  // Connect wallet
  const connect = async () => {
    if (!isWalletAvailable()) {
      setWalletState((prev) => ({
        ...prev,
        error:
          "No wallet found. Please install MetaMask or another Web3 wallet.",
      }));
      return;
    }

    setWalletState((prev) => ({
      ...prev,
      isConnecting: true,
      error: undefined,
    }));

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      // Get current chain ID
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      setWalletState({
        isConnected: true,
        isConnecting: false,
        address: accounts[0] as Address,
        chainId: parseInt(chainId, 16),
        error: undefined,
      });

      // Save connection preference
      localStorage.setItem("wallet_connected", "true");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setWalletState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to connect wallet",
        isConnecting: false,
      }));
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setWalletState({
      isConnected: false,
      isConnecting: false,
      address: undefined,
      chainId: undefined,
      error: undefined,
    });

    setBalance("0");
    setWalletClient(null);
    setPublicClient(null);

    // Clear localStorage
    localStorage.removeItem("wallet_connected");
    localStorage.removeItem("wallet_type");
  };

  // Switch to Story Protocol network
  const switchToStoryNetwork = async () => {
    if (!isWalletAvailable()) return;

    try {
      // Try to switch to Story Protocol testnet
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x523" }], // 1315 in hex
      });

      setWalletState((prev) => ({ ...prev, chainId: 1315 }));
    } catch (switchError: any) {
      // Network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x523",
                chainName: "Story Protocol Testnet",
                rpcUrls: ["https://aeneid.storyrpc.io/"],
                nativeCurrency: {
                  name: "IP",
                  symbol: "IP",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://aeneid.story.foundation/"],
              },
            ],
          });
          setWalletState((prev) => ({ ...prev, chainId: 1315 }));
        } catch (addError) {
          console.error("Failed to add Story Protocol network:", addError);
          setWalletState((prev) => ({
            ...prev,
            error: "Failed to add Story Protocol network",
          }));
        }
      } else {
        console.error("Failed to switch network:", switchError);
        setWalletState((prev) => ({
          ...prev,
          error: "Failed to switch to Story Protocol network",
        }));
      }
    }
  };

  // Send transaction
  const sendTransaction = async (
    to: Address,
    value: bigint,
    data?: `0x${string}`
  ) => {
    if (!walletClient || !walletState.address) {
      throw new Error("Wallet not connected");
    }

    try {
      const hash = await walletClient.sendTransaction({
        account: walletState.address,
        to,
        value,
        data,
        chain: storyTestnetConfig,
      });
      return hash;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  };

  // Write to contract
  const writeContract = async (contractConfig: any) => {
    if (!walletClient || !walletState.address) {
      throw new Error("Wallet not connected");
    }

    try {
      const hash = await walletClient.writeContract({
        account: walletState.address,
        chain: storyTestnetConfig,
        ...contractConfig,
      });
      return hash;
    } catch (error) {
      console.error("Contract write failed:", error);
      throw error;
    }
  };

  // Read from contract
  const readContract = async (contractConfig: any) => {
    if (!publicClient) {
      throw new Error("Public client not initialized");
    }

    try {
      const result = await publicClient.readContract(contractConfig);
      return result;
    } catch (error) {
      console.error("Contract read failed:", error);
      throw error;
    }
  };

  // Wait for transaction receipt
  const waitForTransaction = async (hash: `0x${string}`) => {
    if (!publicClient) {
      throw new Error("Public client not initialized");
    }

    try {
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
        timeout: 60_000, // 60 seconds
      });
      return receipt;
    } catch (error) {
      console.error("Failed to wait for transaction:", error);
      throw error;
    }
  };

  // Sign message
  const signMessage = async (message: string): Promise<string> => {
    if (!walletClient || !walletState.address) {
      throw new Error("Wallet not connected");
    }

    try {
      const signature = await walletClient.signMessage({
        account: walletState.address,
        message,
      });
      return signature;
    } catch (error) {
      console.error("Failed to sign message:", error);
      throw error;
    }
  };

  // Check for existing connection and setup event listeners on mount
  useEffect(() => {
    if (!isWalletAvailable()) return;

    // Check if already connected
    const checkConnection = async () => {
      const wasConnected = localStorage.getItem("wallet_connected");
      if (wasConnected === "true") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({
              method: "eth_chainId",
            });

            setWalletState({
              isConnected: true,
              isConnecting: false,
              address: accounts[0] as Address,
              chainId: parseInt(chainId, 16),
              error: undefined,
            });
          } else {
            localStorage.removeItem("wallet_connected");
          }
        } catch (error) {
          console.error("Failed to check connection:", error);
          localStorage.removeItem("wallet_connected");
        }
      }
    };

    checkConnection();

    // Event listeners
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setWalletState((prev) => ({
          ...prev,
          address: accounts[0] as Address,
        }));
      }
    };

    const handleChainChanged = (chainId: string) => {
      setWalletState((prev) => ({
        ...prev,
        chainId: parseInt(chainId, 16),
      }));
    };

    const handleDisconnect = () => {
      disconnect();
    };

    // Add event listeners
    window.ethereum?.on("accountsChanged", handleAccountsChanged);
    window.ethereum?.on("chainChanged", handleChainChanged);
    window.ethereum?.on("disconnect", handleDisconnect);

    return () => {
      // Remove event listeners
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
      window.ethereum?.removeListener("disconnect", handleDisconnect);
    };
  }, []);

  return {
    // State
    ...walletState,
    balance,

    // Computed properties
    isCorrectNetwork: walletState.chainId === 1315,
    isOnStoryNetwork: walletState.chainId === 1315,
    formatAddress: formatAddress(walletState.address),
    fullAddress: walletState.address,
    isWalletAvailable: isWalletAvailable(),

    // Clients (for advanced usage)
    walletClient,
    publicClient,

    // Actions
    connect,
    disconnect,
    switchToStoryNetwork,
    sendTransaction,
    writeContract,
    readContract,
    waitForTransaction,
    signMessage,

    // Legacy aliases for compatibility
    connectWallet: connect,
    disconnectWallet: disconnect,
    getBalance: async () => {
      if (!publicClient || !walletState.address) return null;
      try {
        const balance = await publicClient.getBalance({
          address: walletState.address,
        });
        return balance;
      } catch (error) {
        console.error("Failed to get balance:", error);
        return null;
      }
    },
  };
};

// Hook for checking wallet requirements
export const useWalletRequirements = () => {
  const { isConnected, isCorrectNetwork, switchToStoryNetwork, connect } =
    useWallet();

  const checkRequirements = async (): Promise<boolean> => {
    if (!isConnected) {
      await connect();
      return false; // Will need to re-check after connection
    }

    if (!isCorrectNetwork) {
      await switchToStoryNetwork();
      return false; // Will need to re-check after switch
    }

    return true;
  };

  return {
    isReady: isConnected && isCorrectNetwork,
    checkRequirements,
    needsConnection: !isConnected,
    needsNetworkSwitch: isConnected && !isCorrectNetwork,
  };
};
