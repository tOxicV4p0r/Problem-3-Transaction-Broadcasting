const axios = require('axios').default;
const {
    broadcastAndCheckTransactionStatus,
    broadcastTransaction,
    checkTransactionStatus,
    monitorTransactionStatus,
    TX_STATUS,
} = require('./index');

jest.mock('axios');

describe('broadcastTransaction function', () => {

    describe('Parameter test', () => {
        test('should throw an error when no properly input provide', () => {
            expect(broadcastTransaction()).rejects.toThrow();
            expect(broadcastTransaction('')).rejects.toThrow();
            expect(broadcastTransaction('asdf')).rejects.toThrow();
            expect(broadcastTransaction('asdf', 'asdf')).rejects.toThrow();
        });
    });

    describe('Functional test', () => {
        axios.post.mockResolvedValue({
            data: {
                tx_hash: "095baf2733ed1af4c2abba4edc4e6c25b5c0173b8b47d336d816e1f290f35a53",
            }
        });

        test('should return transaction hash', async () => {
            const txHash = await broadcastTransaction('ETH', 1000);

            expect(typeof txHash).toBe('string');
            expect(txHash).toHaveLength(64);
        });
    });

});


describe('checkTransactionStatus function', () => {
    describe('Parameter test', () => {
        test('should throw an error when no properly input provide', () => {
            expect(checkTransactionStatus()).rejects.toThrow();
            expect(checkTransactionStatus('')).rejects.toThrow();
            expect(checkTransactionStatus(1234)).rejects.toThrow();
        });
    });

    describe('Functional test', () => {
        const mockData = {
            data: {
                tx_status: '',
            }
        }

        test('status CONFIRMED', async () => {
            mockData.data.tx_status = TX_STATUS.CONFIRMED;
            axios.get.mockResolvedValue(mockData);
            const txStatus = await checkTransactionStatus('2e8b2e734fd8abbb226149aa6452fa1589a40d8cd2d7be2702887ae8adcd1cd7');

            expect(typeof txStatus).toBe('string');
            expect(txStatus).toBe(TX_STATUS.CONFIRMED);
        });


        test('status FAILED', async () => {
            mockData.data.tx_status = TX_STATUS.FAILED;
            axios.get.mockResolvedValue(mockData);
            const txStatus = await checkTransactionStatus('2e8b2e734fd8abbb226149aa6452fa1589a40d8cd2d7be2702887ae8adcd1cd7');

            expect(typeof txStatus).toBe('string');
            expect(txStatus).toBe(TX_STATUS.FAILED);
        });

        test('status DNE', async () => {
            mockData.data.tx_status = TX_STATUS.DNE;
            axios.get.mockResolvedValue(mockData);
            const txStatus = await checkTransactionStatus('2e8b2e734fd8abbb226149aa6452fa1589a40d8cd2d7be2702887ae8adcd1cd7');

            expect(typeof txStatus).toBe('string');
            expect(txStatus).toBe(TX_STATUS.DNE);
        });

        test('status PENDING', async () => {
            mockData.data.tx_status = TX_STATUS.PENDING;
            axios.get.mockResolvedValue(mockData);
            const txStatus = await checkTransactionStatus('2e8b2e734fd8abbb226149aa6452fa1589a40d8cd2d7be2702887ae8adcd1cd7');

            expect(typeof txStatus).toBe('string');
            expect(txStatus).toBe(TX_STATUS.PENDING);
        });

    });
});

describe('monitorTransactionStatus function', () => {
    describe('Parameter test', () => {
        test('should throw an error when no properly input provide', () => {
            expect(monitorTransactionStatus()).rejects.toThrow();
            expect(monitorTransactionStatus('')).rejects.toThrow();
            expect(monitorTransactionStatus(1234)).rejects.toThrow();
        });
    });

    describe('Functional test', () => {
        const mockData = {
            data: {
                tx_status: '',
            }
        }

        test('status CONFIRMED', async () => {
            mockData.data.tx_status = TX_STATUS.CONFIRMED;
            axios.get.mockResolvedValue(mockData);
            const txStatus = await monitorTransactionStatus('2e8b2e734fd8abbb226149aa6452fa1589a40d8cd2d7be2702887ae8adcd1cd7', 2);

            expect(typeof txStatus).toBe('string');
            expect(txStatus === TX_STATUS.CONFIRMED).toBe(true);
        }, 30 * 1000);

        test('status FAILED', async () => {
            mockData.data.tx_status = TX_STATUS.FAILED;
            axios.get.mockResolvedValue(mockData);
            const txStatus = await monitorTransactionStatus('2e8b2e734fd8abbb226149aa6452fa1589a40d8cd2d7be2702887ae8adcd1cd7', 2);

            expect(typeof txStatus).toBe('string');
            expect(txStatus === TX_STATUS.FAILED).toBe(true);
        }, 30 * 1000);

        test('status DNE', async () => {
            mockData.data.tx_status = TX_STATUS.DNE;
            axios.get.mockResolvedValue(mockData);
            const txStatus = await monitorTransactionStatus('2e8b2e734fd8abbb226149aa6452fa1589a40d8cd2d7be2702887ae8adcd1cd7', 2);

            expect(typeof txStatus).toBe('string');
            expect(txStatus === TX_STATUS.DNE).toBe(true);
        }, 30 * 1000);

        test('status TIMEOUT', async () => {
            mockData.data.tx_status = TX_STATUS.PENDING;
            axios.get.mockResolvedValue(mockData);
            const txStatus = await monitorTransactionStatus('2e8b2e734fd8abbb226149aa6452fa1589a40d8cd2d7be2702887ae8adcd1cd7', 2);

            expect(typeof txStatus).toBe('string');
            expect(txStatus === TX_STATUS.TIMEOUT).toBe(true);
        }, 30 * 1000);
    });
});

describe('broadcastAndCheckTransactionStatus function', () => {
    describe('Parameter test', () => {
        test('should throw an error when no properly input provide', () => {
            expect(broadcastAndCheckTransactionStatus()).rejects.toThrow();
            expect(broadcastAndCheckTransactionStatus('')).rejects.toThrow();
            expect(broadcastAndCheckTransactionStatus('asdf')).rejects.toThrow();
            expect(broadcastAndCheckTransactionStatus('asdf', 'asdf')).rejects.toThrow();
        });
    });


    describe('Functional test', () => {
        axios.post.mockResolvedValue({
            data: {
                tx_hash: "095baf2733ed1af4c2abba4edc4e6c25b5c0173b8b47d336d816e1f290f35a53",
            }
        });

        const mockData = {
            data: {
                tx_status: '',
            }
        }

        test('should wait until transaction status is confirmed or failed then return status', async () => {
            mockData.data.tx_status = TX_STATUS.CONFIRMED;
            axios.get.mockResolvedValue(mockData);

            const response = await broadcastAndCheckTransactionStatus('BTC', 1000);

            expect(response && typeof response === 'object').toBe(true);
            expect(response).toHaveProperty('txHash');
            expect(response).toHaveProperty('txStatus');
            expect(response.txStatus !== TX_STATUS.PENDING).toBe(true);
        }, 60 * 1000);
    });
});