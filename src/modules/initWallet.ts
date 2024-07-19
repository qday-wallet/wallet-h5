// main.ts
import {
  POIList,
  startRailgunEngine,
  getProver,
  Groth16,
  SnarkJSGroth16,
} from "@railgun-community/wallet";
import LevelDB from 'level-js';
import { createArtifactStore } from './create-artifact-store'; // We'll get to this in Step 2: Build a persistent store

const initializeEngine = async (): Promise<void> => {
  // Name for your wallet implementation.
  // Encrypted and viewable in private transaction history.
  // Maximum of 16 characters, lowercase.
  const walletSource = 'quickstart demo';
  
  // LevelDOWN compatible database for storing encrypted wallets.
  const dbPath = 'engine.db';
  const db = new LevelDB(dbPath);
  
  // Whether to forward Engine debug logs to Logger.
  const shouldDebug = true;
  
  // Persistent store for downloading large artifact files required by Engine.
  const artifactStore = createArtifactStore();
  
  // Whether to download native C++ or web-assembly artifacts.
  // True for mobile. False for nodejs and browser.
  const useNativeArtifacts = false;
  
  // Whether to skip merkletree syncs and private balance scans. 
  // Only set to TRUE in shield-only applications that don't 
  // load private wallets or balances.
  const skipMerkletreeScans = false;
  
  // Array of aggregator node urls for Private Proof of Innocence (Private POI), in order of priority.
  // Only one is required. If multiple urls are provided, requests will fall back to lower priority aggregator nodes if primary request fails.
  // Please reach out in the RAILGUN builders groups for information on the public aggregator nodes run by the community.
  //
  // Private POI is a tool to give cryptographic assurance that funds
  // entering the RAILGUN smart contract are not from a known list
  // of transactions or actors considered undesirable by respective wallet providers.
  // For more information: https://docs.railgun.org/wiki/assurance/private-proofs-of-innocence
  // (additional developer information coming soon).
  const poiNodeURLs: string[] | undefined = [];
  
  // Add a custom list to check Proof of Innocence against.
  // Leave blank to use the default list for the aggregator node provided.
  const customPOILists: POIList[] | undefined = []
  
  // Set to true if you would like to view verbose logs for private balance and TXID scans
  const verboseScanLogging = false;
  
  await startRailgunEngine(
    walletSource,
    db,
    shouldDebug,
    artifactStore,
    useNativeArtifacts,
    skipMerkletreeScans,
    poiNodeURLs,
    customPOILists,
    verboseScanLogging
  )
}

// App launch
try {
  initializeEngine();
    const groth16 = (global as unknown as { snarkjs: { groth16: SnarkJSGroth16 } })
        .snarkjs.groth16;
        
  getProver().setSnarkJSGroth16(groth16);
} catch (err) {
  // Handle err
}