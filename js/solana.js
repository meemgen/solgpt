<script src="https://cdnjs.cloudflare.com/ajax/libs/@solana/wallet-adapter-wallets/0.10.4/index.umd.js"></script>

let connectedPublicKey = null;

async function autoDetectAndConnect() {
try {
    // Check for Phantom wallet
    if (window.solana && window.solana.isPhantom) {
    console.log("Attempting to connect to Phantom...");
    await window.solana.connect();
    connectedPublicKey = window.solana.publicKey.toString();
    console.log("Connected with Phantom:", connectedPublicKey);
    return "phantom";
    }

    // Check for Solflare wallet
    const solflare = new Solflare();
    if (solflare) {
    console.log("Attempting to connect to Solflare...");
    await solflare.connect();
    connectedPublicKey = solflare.publicKey.toString();
    console.log("Connected with Solflare:", connectedPublicKey);
    return "solflare";
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

