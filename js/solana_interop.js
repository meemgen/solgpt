let connectedPublicKey = null;

async function autoDetectAndConnect() {
  try {
    // Attempt to connect to Phantom
    if (window.solana && window.solana.isPhantom) {
      console.log("Attempting to connect to Phantom...");
      await window.phantom.solana.connect();
      connectedPublicKey = window.solana.publicKey.toString();
      Swal.fire({
        icon: 'success',
        title: 'Connected!',
        text: `Connected to Phantom with Public Key: ${connectedPublicKey}`,
      });
      return "phantom";
    }

    // Attempt to connect to Solflare
    if (typeof Solflare !== "undefined") {
      const solflare = new Solflare();
      console.log("Attempting to connect to Solflare...");
      await solflare.connect();
      if (solflare.isConnected) {
        connectedPublicKey = solflare.publicKey.toString();
        Swal.fire({
          icon: 'success',
          title: 'Connected!',
          text: `Connected to Solflare with Public Key: ${connectedPublicKey}`,
        });
        return "solflare";
      }
    }

    // No wallet detected
    Swal.fire({
      icon: 'error',
      title: 'No Wallet Detected',
      text: 'No Solana wallet detected! Please install Phantom or Solflare.',
      footer: '<a href="https://phantom.app" target="_blank">Download Phantom</a> | <a href="https://solflare.com" target="_blank">Download Solflare</a>',
    });
    return null;
  } catch (err) {
    console.error("Error during wallet connection:", err);
    Swal.fire({
      icon: 'error',
      title: 'Connection Failed',
      text: 'Failed to connect to wallet. Please try again.',
    });
    return null;
  }
}
