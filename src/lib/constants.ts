export const CHAINS = {
  STORY_TESTNET: {
    id: 1315,
    name: "Story Protocol Testnet",
    rpcUrl: "https://aeneid.storyrpc.io",
    blockExplorer: "https://aeneid.storyscan.xyz",
  },
} as const;

export const CONTRACT_ADDRESSES = {
  MOLECULE_REGISTRY: "0x1234567890123456789012345678901234567890",
  ZK_VERIFIER: "0x0987654321098765432109876543210987654321",
  STORY_IP_ASSET_REGISTRY: "0x1111222233334444555566667777888899990000",
} as const;

export const API_ENDPOINTS = {
  GENERATE_MOLECULE: "/api/generate-molecule",
  REGISTER_IP: "/api/register",
  VERIFY_IP: "/api/verify",
  GET_USER_IPS: "/api/user-ips",
} as const;

export const REGISTRATION_STEPS = [
  {
    step: 1,
    title: "Molecule Input",
    description: "Describe and generate molecular structure",
  },
  {
    step: 2,
    title: "ZK Proof Generation",
    description: "Create cryptographic proof of ownership",
  },
  {
    step: 3,
    title: "Story Protocol Registration",
    description: "Register IP asset on blockchain",
  },
  {
    step: 4,
    title: "Confirmation",
    description: "Verify registration and receive certificate",
  },
] as const;

export const MOLECULE_EXAMPLES = [
  "A benzene ring with a carbonyl group attached to another benzene ring",
  "Aspirin molecule with acetyl and carboxyl groups",
  "A quinoline structure with nitrogen in the ring",
  "Caffeine molecule with purine base structure",
  "Ibuprofen with propionic acid backbone",
] as const;

export const STATUS_COLORS = {
  pending: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
  },
  confirmed: {
    bg: "bg-green-500/20",
    text: "text-green-400",
    border: "border-green-500/30",
  },
  failed: {
    bg: "bg-red-500/20",
    text: "text-red-400",
    border: "border-red-500/30",
  },
} as const;

export const MESSAGES = {
  WALLET_NOT_CONNECTED: "Please connect your wallet to continue",
  MOLECULE_GENERATION_FAILED: "Failed to generate molecule. Please try again.",
  REGISTRATION_SUCCESS: "IP successfully registered on Story Protocol!",
  VERIFICATION_FAILED: "Unable to verify IP. Please check your input.",
  NETWORK_ERROR: "Network error. Please check your connection.",
} as const;
