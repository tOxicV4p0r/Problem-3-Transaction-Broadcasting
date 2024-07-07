# Transaction Broadcasting and Monitoring

## Description
This module can broadcast a transaction of cryptocurrency price and monitor its status until it is confirmed or failed. It supports multiple currencies like `ETH` and `BTC` and so on.

## Features
- Broadcasts transactions with `symbol`, `price`, and `timestamp`, then waits until the transaction is either confirmed or failed before returning the transaction hash and status.

## Installation
#### Prerequisite
- Node.js 18+
### New Project
To get started with this project, you need to have `Node.js` installed on your machine, then follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/tOxicV4p0r/Problem-3-Transaction-Broadcasting.git

2. Install the required dependencies:
   ```bash
   npm install
##### Running the Project

```bash
npm start
```
or
```bash
node index.js
```

### Integrate To Existing Project
This module is not committed to source control. In order to use the module, you need to do the following steps.
1. To integrate into your existing project, for this module, you need to install `axios` for making HTTP requests
    ```bash
    npm install axios

2. Add the Module Files

    Download the `BroadcastTransaction` folder into your project's directory.

3. Import the Module

    ```javascript
    // CommonJS
    const { broadcastAndCheckTransactionStatus } = require('./BroadcastTransaction');

## Usage
Load the functions from the module.
> Note: You can import the library using import or require approach.
```javascript
// CommonJS
const { broadcastAndCheckTransactionStatus } = require('./BroadcastTransaction');

// ES6
import { broadcastAndCheckTransactionStatus } from './BroadcastTransaction';
```
### Syntax
#### broadcastAndCheckTransactionStatus(symbol,price,[,timestamp])

```
 symbol - Transaction symbol
 price - Symbol price
 timestamp (option) - Timestamp of price retrieval
```

#### Response Schema
```javascript
{
    // `txHash` is the transaction hash from the blockchain network
    txHash: '849be0c867ae16b4bbd052282b9d0d202f123ff0ca0dd090660e77d61c649322',
    // `txStatus` is the status message from the blockchain network
    txStatus: 'CONFIRMED'
}
```
### Example
>Async/Await
```javascript
(async () => {
    const response = await broadcastAndCheckTransactionStatus('BTC', 1111);
    console.log(response);
})();
```
```javascript
// Example
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
    // Transaction status: CONFIRMED
    console.log(`Transaction hash: ${txHash}`);
    // Transaction hash: 849be0c867ae16b4bbd052282b9d0d202f123ff0ca0dd090660e77d61c649322

})();
```

>Promise
```javascript
broadcastAndCheckTransactionStatus('BTC', 1111)
    .then((response)=>{
        // handle success
        console.log(response);
    })
    .catch((error)=>{
        // handle error
        console.error(error);
    });
```




### Transaction Status
Each transaction status returned by the module indicates a different state of the transaction in the blockchain network.

| Status | Definition |
| ------ | ------ |
| PENDING | Transaction is awaiting blockchain network processing. |
| CONFIRMED | Transaction has been processed and confirmed. |
| FAILED | Transaction failed to process. |
| DNE | Transaction does not exist. |
| TIMEOUT | Exceeds the maximum waiting time from the API server without a confirmed or failed status (default 60 seconds). |


