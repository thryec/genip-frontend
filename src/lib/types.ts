export interface MoleculeData {
  id: string;
  name: string;
  smiles: string;
  formula: string;
  description?: string;
  prompt?: string;
}

export interface ZKProof {
  hash: string;
  proof: any; // snarkjs proof object
  publicInputs: string[];
  isValid: boolean;
}

export interface StoryIPAsset {
  ipAssetId: string;
  owner: string;
  registrationDate: string;
  txHash: string;
  blockNumber?: number;
  status: "pending" | "confirmed" | "failed";
}

export interface RegisteredIP {
  id: string;
  molecule: MoleculeData;
  storyAsset: StoryIPAsset;
  zkProof: ZKProof;
  registrationDate: string;
  status: "pending" | "confirmed" | "failed";
}

export interface VerificationResult {
  status: "registered" | "not_registered";
  ipAssetId?: string;
  owner?: string;
  registrationDate?: string;
  storyTxHash?: string;
  zkProofValid: boolean;
  molecule?: MoleculeData;
}

export interface WalletState {
  isConnected: boolean;
  address?: string;
  chainId?: number;
  isConnecting: boolean;
  error?: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Registration flow types
export interface RegistrationStep {
  step: number;
  title: string;
  description: string;
  isComplete: boolean;
  isCurrent: boolean;
}

export interface RegistrationState {
  currentStep: number;
  molecule?: MoleculeData;
  zkProof?: ZKProof;
  storyAsset?: StoryIPAsset;
  isProcessing: boolean;
  error?: string;
}
