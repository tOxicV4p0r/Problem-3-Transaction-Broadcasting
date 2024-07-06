# Transaction Broadcasting and Monitoring

## Description
This module can broadcast a transaction of cryptocurrency price and monitor its status until it is confirmed or failed. It supports multiple currencies like `ETH` and `BTC` and so on.

## Features
- Broadcasts transactions with `symbol`, `price`, and `timestamp`, then waits until the transaction is either confirmed or failed before returning the transaction hash and status.

## Example usage 
Broadcasting and Monitoring a Transaction:
   ```javascript
    const { broadcastAndCheckTransactionStatus } = require('./BroadcastTransaction');

    (async () => {
        // Example of broadcasting an Bitcoin price
        const { txHash, txStatus } = await broadcastAndCheckTransactionStatus('BTC', 1000000);
        // Example response
        // {
        //      txHash: '849be0c867ae16b4bbd052282b9d0d202f123ff0ca0dd090660e77d61c649322',
        //      txStatus: 'CONFIRMED'
        // }
        console.log(`Transaction status: ${txStatus}`);
        console.log(`Transaction hash: ${txHash}`);

    })();
   ```
## Transaction Status
Each transaction status returned by the module indicates a different state of the transaction in the blockchain network.
* `PENDING` Transaction is awaiting processing.
* `CONFIRMED` Transaction has been processed and confirmed.
* `FAILED` Transaction failed to process.
* `DNE` Transaction does not exist.
* `TIMEOUT` Exceeds the maximum waiting time without a confirmed or failed status.

## Integrate To Existing Project
1. For this module, you need `axios` for making HTTP requests
    ```bash
    npm install axios

2. Add the Module Files

    Download the `BroadcastTransaction` folder into your project's directory.

3. Import the Module

    Import the functions from the module.
    ```javascript
    const { broadcastAndCheckTransactionStatus } = require('./BroadcastTransaction');


## Installation (new project)

To get started with this project, you need to have `Node.js` installed on your machine, then follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/tOxicV4p0r/Problem-3-Transaction-Broadcasting.git

2. Install the required dependencies:
   ```bash
   npm install

## Running the Project

   ```bash
   npm start
   ```
or
   ```bash
    node index.js
   ```
## Testing the Project
   ```bash
   npm test
   ```