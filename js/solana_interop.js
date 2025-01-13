let connectedPublicKey = null;

async function autoDetectAndConnect() {
  try {
    // Check for Phantom wallet
    if (window.solana && window.solana.isPhantom) {
      console.log("Attempting to connect to Phantom...");
      await window.solana.connect(); // Auto-connect if previously approved
      connectedPublicKey = window.solana.publicKey.toString();
      console.log("Connected with Phantom:", connectedPublicKey);
      return "phantom";
    }

    // Check for Solflare wallet
    if (typeof Solflare !== "undefined") {
      const solflare = new Solflare();
      console.log("Attempting to connect to Solflare...");
      await solflare.connect();
      if (solflare.isConnected) {
        connectedPublicKey = solflare.publicKey.toString();
        console.log("Connected with Solflare:", connectedPublicKey);
        return "solflare";
      }
    }

    // No wallet found
    alert("No Solana wallet detected! Please install Phantom or Solflare.");
    return null;
  } catch (err) {
    console.error("Error during wallet connection:", err);
    alert("Failed to connect to wallet. Please try again.");
    return null;
  }
}
