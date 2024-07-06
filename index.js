const { broadcastAndCheckTransactionStatus } = require('./BroadcastTransaction');

(async () => {
    console.log(await broadcastAndCheckTransactionStatus('ETH', 1111));
    console.log(await broadcastAndCheckTransactionStatus('BTC', 2222));
})();