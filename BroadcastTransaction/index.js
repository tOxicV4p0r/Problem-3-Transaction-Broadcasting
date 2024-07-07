const axios = require('axios').default;

const baseUrl = 'https://mock-node-wgqbnxruha-as.a.run.app';

// Set predefined constants
const TX_STATUS = {
    CONFIRMED: 'CONFIRMED',
    FAILED: 'FAILED',
    PENDING: 'PENDING',
    DNE: 'DNE',
    TIMEOUT: 'TIMEOUT',
};

/**
 * Broadcast a transaction and wait to get the response
 * @param {string} symbol - Transaction symbol, e.g., BTC
 * @param {number} price - Symbol price, e.g., 100000
 * @param {number} timestamp - Timestamp of price retrieval
 * @returns {Promise<string>} Transaction hash
 */
async function broadcastTransaction(symbol, price, timestamp = Date.now()) {
    // Validate input
    if (!symbol || !price || typeof symbol !== 'string' || typeof price !== 'number') {
        throw new Error('Invalid argument');
    }

    const payload = { symbol, price, timestamp };

    try {
        const response = await axios.post(`${baseUrl}/broadcast`,
            payload,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const { tx_hash = null } = response.data;
        if (!tx_hash) {
            throw new Error('Error broadcast transaction : hash is ', tx_hash);
        }

        return tx_hash;

    } catch (err) {
        console.error('Error broadcast transaction : ', err);
        throw new Error('Error broadcast transaction : ', err);
    }
}

/**
 * Check status of the transaction then return status
 * @param {string} txHash - Transaction hash
 * @returns {Promise<string>} Promise that return the status of the transaction
 */
async function checkTransactionStatus(txHash) {
    if (!txHash || typeof txHash !== 'string') {
        throw new Error('Invalid argument');
    }

    try {
        const response = await axios.get(`${baseUrl}/check/${txHash}`);
        const { tx_status = null } = response.data;
        if (!tx_status) {
            throw new Error('Error check transaction status : TX status is ', tx_status);
        }

        return tx_status
    } catch (err) {
        console.error('Error check transaction status : ', err);
        throw new Error('Error check transaction status : ', err);
    }
}

/**
 * Check status of transaction.
 * @param {string} txHash - Transaction hash
 * @param {number} maxRetry - Maximum retry
 * @returns {Promise<string>} Promise that wait until its status is confirmed or failed
 */
async function monitorTransactionStatus(txHash, maxRetry = 12) {
    if (!txHash || typeof txHash !== 'string') {
        throw new Error('Invalid argument');
    }

    // Wait until confirmed or failed or reach 'maxRetry'
    let txStatus = '';
    do {
        txStatus = await checkTransactionStatus(txHash);
        if (txStatus === TX_STATUS.PENDING) {
            await delay(5000);
        }

        maxRetry -= 1;
        if (maxRetry < 1) {
            return TX_STATUS.TIMEOUT;
        }
    } while (txStatus === TX_STATUS.PENDING);

    return txStatus;
}

/**
 * Broadcast a transaction and wait until its status is confirmed or failed.
 * @param {string} symbol - Transaction symbol
 * @param {number} price - Symbol price
 * @param {number} timestamp - Timestamp of price retrieval
 * @returns {Promise<object>} Promise that return object transaction hash and status
 */
async function broadcastAndCheckTransactionStatus(symbol, price, timestamp = Date.now()) {
    if (!symbol || !price || typeof symbol !== 'string' || typeof price !== 'number') {
        throw new Error('Invalid argument');
    }

    console.log('Transaction is broadcasting...');
    const txHash = await broadcastTransaction(symbol, price, timestamp);

    const txStatus = await monitorTransactionStatus(txHash);

    return { txHash, txStatus };
}

/**
 * Delay
 * @param {number} ms - A number represent milisecond
 * @returns {Promise<void>} Resolve when reach the timeout
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    broadcastAndCheckTransactionStatus,
    broadcastTransaction,
    checkTransactionStatus,
    monitorTransactionStatus,
    delay,
    TX_STATUS,
}