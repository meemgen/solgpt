let connectedPublicKey = null;

async function connectAndGetPublicKey() {
  try {
    let walletType = null;

    // Function to display success message
    const showSuccessMessage = (walletName, publicKey) => {
      Swal.fire({
        icon: 'success',
        title: `Connected to ${walletName}!`,
        html: `<p><strong>Public Key:</strong> ${publicKey}</p>`,
        footer: `<a href="https://${walletName.toLowerCase()}.app" target="_blank">Learn more about ${walletName}</a>`,
      });
    };

    // Check and connect to Phantom wallet
    if (window.solana && window.solana.isPhantom) {
      console.log("Attempting to connect to Phantom...");
      await window.solana.connect();
      connectedPublicKey = window.solana.publicKey.toString();
      walletType = "Phantom";
      showSuccessMessage(walletType, connectedPublicKey);
      return { walletType, connectedPublicKey };
    }

    // Check and connect to Solflare wallet
    if (typeof Solflare !== "undefined") {
      console.log("Attempting to connect to Solflare...");
      const solflare = new Solflare();
      await solflare.connect();
      if (solflare.isConnected) {
        connectedPublicKey = solflare.publicKey.toString();
        walletType = "Solflare";
        showSuccessMessage(walletType, connectedPublicKey);
        return { walletType, connectedPublicKey };
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

  } catch (error) {
    console.error("Error during wallet connection:", error);
    Swal.fire({
      icon: 'error',
      title: 'Connection Failed',
      text: 'Failed to connect to wallet. Please try again.',
    });
    return null;
  }
}
