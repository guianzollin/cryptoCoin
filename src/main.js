const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(
        index,
        timestamp,
        data,
        previousHash = ''
    ) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return SHA256(
            this.index + 
            this.timestamp + 
            JSON.stringify(this.data) + 
            this.previousHash
        ).toString();
    }
}

class BlockChain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(
            0,
            "01/10/2024",
            "Genesis block",
            "0"
        );
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {

            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let cryptoCoin = new BlockChain;

cryptoCoin.addBlock(new Block(
        1,
        "01/10/2024",
        {
            amount: 100
        }
    )
);

cryptoCoin.addBlock(new Block(
        2,
        "01/10/2024",
        {
            amount: 200
        }
    )
);

console.log(cryptoCoin);
console.log(cryptoCoin.isChainValid());

cryptoCoin.chain[1].data = { amount: 1000000 };
cryptoCoin.chain[1].hash = cryptoCoin.chain[1].calculateHash();

console.log(cryptoCoin);
console.log(cryptoCoin.isChainValid());