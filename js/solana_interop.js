let connectedPublicKey = null;

async function autoDetectAndConnect() {
  try {
    let walletType = null;
    let solBalance = 0;
    let tokenBalance = 0;
    const TOKEN_MINT_ADDRESS = "Token_Mint_Address"; // Replace with the SPL token mint address.

    // Helper function to fetch SOL balance
    async function getSolBalance(publicKey) {
      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
      const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
      return balance / solanaWeb3.LAMPORTS_PER_SOL; // Convert lamports to SOL
    }

    // Helper function to fetch SPL token balance
    async function getTokenBalance(publicKey, mintAddress) {
      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
      const accounts = await connection.getParsedTokenAccountsByOwner(
        new solanaWeb3.PublicKey(publicKey),
        { mint: new solanaWeb3.PublicKey(mintAddress) }
      );
      if (accounts.value.length > 0) {
        return accounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
      }
      return 0;
    }

    // Attempt to connect to Phantom
    if (window.solana && window.solana.isPhantom) {
      console.log("Attempting to connect to Phantom...");
      await window.phantom.solana.connect();
      connectedPublicKey = window.solana.publicKey.toString();
      walletType = "phantom";
      solBalance = await getSolBalance(connectedPublicKey);
      tokenBalance = await getTokenBalance(connectedPublicKey, TOKEN_MINT_ADDRESS);

      Swal.fire({
        icon: 'success',
        title: 'Connected to Phantom!',
        html: `
          <p><strong>Public Key:</strong> ${connectedPublicKey}</p>
          <p><strong>SOL Balance:</strong> ${solBalance} SOL</p>
          <p><strong>Token Balance:</strong> ${tokenBalance}</p>
        `,
        footer: '<a href="https://phantom.app" target="_blank">Learn more about Phantom</a>',
      });
      return { walletType, connectedPublicKey, solBalance, tokenBalance };
    }

    // Attempt to connect to Solflare
    if (typeof Solflare !== "undefined") {
      const solflare = new Solflare();
      console.log("Attempting to connect to Solflare...");
      await solflare.connect();
      if (solflare.isConnected) {
        connectedPublicKey = solflare.publicKey.toString();
        walletType = "solflare";
        solBalance = await getSolBalance(connectedPublicKey);
        tokenBalance = await getTokenBalance(connectedPublicKey, TOKEN_MINT_ADDRESS);

        Swal.fire({
          icon: 'success',
          title: 'Connected to Solflare!',
          html: `
            <p><strong>Public Key:</strong> ${connectedPublicKey}</p>
            <p><strong>SOL Balance:</strong> ${solBalance} SOL</p>
            <p><strong>Token Balance:</strong> ${tokenBalance}</p>
          `,
          footer: '<a href="https://solflare.com" target="_blank">Learn more about Solflare</a>',
        });
        return { walletType, connectedPublicKey, solBalance, tokenBalance };
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
