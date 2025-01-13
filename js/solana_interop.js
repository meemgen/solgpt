let connectedPublicKey = null;

async function autoDetectAndConnect() {
  try {
    let walletType = null;

    // Attempt to connect to Phantom
    if (window.solana && window.solana.isPhantom) {
      console.log("Attempting to connect to Phantom...");
      await window.phantom.solana.connect();
      connectedPublicKey = window.solana.publicKey.toString();
      walletType = "phantom";

      Swal.fire({
        icon: 'success',
        title: 'Connected to Phantom!',
        html: `
          <p><strong>Public Key:</strong> ${connectedPublicKey}</p>
        `,
        footer: '<a href="https://phantom.app" target="_blank">Learn more about Phantom</a>',
      });
      return { walletType, connectedPublicKey, };
    }

    // Attempt to connect to Solflare
    if (typeof Solflare !== "undefined") {
      const solflare = new Solflare();
      console.log("Attempting to connect to Solflare...");
      await solflare.connect();
      if (solflare.isConnected) {
        connectedPublicKey = solflare.publicKey.toString();
        walletType = "solflare";
        Swal.fire({
          icon: 'success',
          title: 'Connected to Solflare!',
          html: `
            <p><strong>Public Key:</strong> ${connectedPublicKey}</p>
          `,
          footer: '<a href="https://solflare.com" target="_blank">Learn more about Solflare</a>',
        });
        return { walletType, connectedPublicKey, };
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
