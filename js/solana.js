window.solana = window.solana || undefined;

async function connect() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            return { publicKey: response.publicKey.toString() };
        } catch (err) {
            return { error: 'Connection failed', details: err };
        }
    } else {
        return { error: 'Phantom wallet is not installed.' };
    }
}

async function getWalletPublicKey() {
    if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        return response.publicKey.toString();
    }
    return { error: 'No wallet connected.' };
}

window.solana.connect = connect;
window.solana.getWalletPublicKey = getWalletPublicKey;
