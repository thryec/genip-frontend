import { useState, useEffect, useCallback, useRef } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  formatEther,
  type Address,
} from "viem";
import { WalletState } from "@/lib/types";
import { CHAINS } from "@/lib/constants";

// Story Protocol Testnet chain configuration
const storyTestnet = {
  id: 1315,
  name: "Story Protocol Testnet",
  network: "story-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://aeneid.storyrpc.io"] },
    public: { http: ["https://aeneid.storyrpc.io"] },
  },
  blockExplorers: {
    default: { name: "StoryScan", url: "https://aeneid.storyscan.xyz" },
  },
};

// Wallet connection types
type WalletType = "metamask" | "injected" | "walletconnect";

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
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const publicClient = useRef(
    createPublicClient({
      chain: storyTestnet,
      transport: http(),
    })
  );

  const walletClient = useRef<any>(null);

  // Check if wallet is available
  const isWalletAvailable = useCallback((): boolean => {
    return (
      typeof window !== "undefined" && typeof window.ethereum !== "undefined"
    );
  }, []);

  // Format address for display
  const formatAddress = useCallback((address?: string, chars = 4): string => {
    if (!address) return "";
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  }, []);

  // Get accounts from wallet
  const getAccounts = useCallback(async (): Promise<Address[]> => {
    if (!isWalletAvailable()) return [];

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      return accounts as Address[];
    } catch (error) {
      console.error("Failed to get accounts:", error);
      return [];
    }
  }, [isWalletAvailable]);

  // Get current chain ID
  const getCurrentChainId = useCallback(async (): Promise<number> => {
    if (!isWalletAvailable()) return 0;

    try {
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      return parseInt(chainId, 16);
    } catch (error) {
      console.error("Failed to get chain ID:", error);
      return 0;
    }
  }, [isWalletAvailable]);

  // Fetch balance
  const fetchBalance = useCallback(async (address: Address) => {
    try {
      const balance = await publicClient.current.getBalance({ address });
      setBalance(formatEther(balance));
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setBalance("0");
    }
  }, []);

  // Update wallet state
  const updateWalletState = useCallback(async () => {
    if (!isWalletAvailable()) return;

    try {
      const accounts = await getAccounts();
      const chainId = await getCurrentChainId();

      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletState((prev) => ({
          ...prev,
          isConnected: true,
          address,
          chainId,
          error: undefined,
        }));

        setIsCorrectNetwork(chainId === storyTestnet.id);

        // Create wallet client
        walletClient.current = createWalletClient({
          chain: storyTestnet,
          transport: custom(window.ethereum),
        });

        // Fetch balance
        await fetchBalance(address);
      } else {
        setWalletState((prev) => ({
          ...prev,
          isConnected: false,
          address: undefined,
          chainId: undefined,
        }));
        setIsCorrectNetwork(false);
        setBalance("0");
      }
    } catch (error) {
      console.error("Failed to update wallet state:", error);
      setWalletState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update wallet state",
      }));
    }
  }, [isWalletAvailable, getAccounts, getCurrentChainId, fetchBalance]);

  // Connect wallet
  const connect = useCallback(
    async (walletType: WalletType = "injected") => {
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

        // Update state
        await updateWalletState();

        // Save connection preference
        localStorage.setItem("wallet_connected", "true");
        localStorage.setItem("wallet_type", walletType);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        setWalletState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to connect wallet",
          isConnecting: false,
        }));
      } finally {
        setWalletState((prev) => ({ ...prev, isConnecting: false }));
      }
    },
    [isWalletAvailable, updateWalletState]
  );

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setWalletState({
      isConnected: false,
      isConnecting: false,
      address: undefined,
      chainId: undefined,
      error: undefined,
    });

    setBalance("0");
    setIsCorrectNetwork(false);
    walletClient.current = null;

    // Clear localStorage
    localStorage.removeItem("wallet_connected");
    localStorage.removeItem("wallet_type");
  }, []);

  // Switch to Story Protocol network
  const switchToStoryNetwork = useCallback(async () => {
    if (!isWalletAvailable()) return;

    setIsSwitching(true);

    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${storyTestnet.id.toString(16)}` }],
      });
    } catch (switchError: any) {
      // If the network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${storyTestnet.id.toString(16)}`,
                chainName: storyTestnet.name,
                rpcUrls: storyTestnet.rpcUrls.default.http,
                blockExplorerUrls: [storyTestnet.blockExplorers.default.url],
                nativeCurrency: storyTestnet.nativeCurrency,
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add network:", addError);
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
    } finally {
      setIsSwitching(false);
      // Update wallet state after network change
      setTimeout(updateWalletState, 1000);
    }
  }, [isWalletAvailable, updateWalletState]);

  // Sign message
  const signMessage = useCallback(
    async (message: string): Promise<string> => {
      if (!walletClient.current || !walletState.address) {
        throw new Error("Wallet not connected");
      }

      try {
        const signature = await walletClient.current.signMessage({
          account: walletState.address,
          message,
        });
        return signature;
      } catch (error) {
        console.error("Failed to sign message:", error);
        throw error;
      }
    },
    [walletState.address]
  );

  // Send transaction
  const sendTransaction = useCallback(
    async (transaction: any) => {
      if (!walletClient.current || !walletState.address) {
        throw new Error("Wallet not connected");
      }

      try {
        const hash = await walletClient.current.sendTransaction({
          account: walletState.address,
          ...transaction,
        });
        return hash;
      } catch (error) {
        console.error("Failed to send transaction:", error);
        throw error;
      }
    },
    [walletState.address]
  );

  // Setup event listeners
  useEffect(() => {
    if (!isWalletAvailable()) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        updateWalletState();
      }
    };

    const handleChainChanged = (chainId: string) => {
      const newChainId = parseInt(chainId, 16);
      setWalletState((prev) => ({ ...prev, chainId: newChainId }));
      setIsCorrectNetwork(newChainId === storyTestnet.id);
      updateWalletState();
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
  }, [isWalletAvailable, disconnect, updateWalletState]);

  // Auto-connect on mount if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      const wasConnected = localStorage.getItem("wallet_connected");
      if (wasConnected === "true" && isWalletAvailable()) {
        const accounts = await getAccounts();
        if (accounts.length > 0) {
          await updateWalletState();
        } else {
          localStorage.removeItem("wallet_connected");
        }
      }
    };

    autoConnect();
  }, [isWalletAvailable, getAccounts, updateWalletState]);

  return {
    // State
    ...walletState,
    balance,
    isCorrectNetwork,
    isSwitching,

    // Utilities
    formatAddress: formatAddress(walletState.address),
    fullAddress: walletState.address,
    isWalletAvailable: isWalletAvailable(),

    // Actions
    connect,
    disconnect,
    switchToStoryNetwork,
    signMessage,
    sendTransaction,

    // Clients (for advanced usage)
    publicClient: publicClient.current,
    walletClient: walletClient.current,
  };
};

// Hook for checking wallet requirements
export const useWalletRequirements = () => {
  const { isConnected, isCorrectNetwork, switchToStoryNetwork, connect } =
    useWallet();

  const checkRequirements = useCallback(async (): Promise<boolean> => {
    if (!isConnected) {
      await connect();
      return false; // Will need to re-check after connection
    }

    if (!isCorrectNetwork) {
      await switchToStoryNetwork();
      return false; // Will need to re-check after switch
    }

    return true;
  }, [isConnected, isCorrectNetwork, switchToStoryNetwork, connect]);

  return {
    isReady: isConnected && isCorrectNetwork,
    checkRequirements,
    needsConnection: !isConnected,
    needsNetworkSwitch: isConnected && !isCorrectNetwork,
  };
};
