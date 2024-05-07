let blockchain = [];

function addTransaction() {
  const user = document.getElementById("user").value;
  const amount = document.getElementById("amount").value;

  const transaction = `${user} sends $${amount}`;

  const previousBlockHash =
    blockchain.length > 0 ? blockchain[blockchain.length - 1].blockHash : 0;
  const blockHash = hashCode([hashCode(transaction), previousBlockHash]);

  const block = {
    transactions: [transaction],
    blockHash: blockHash,
    previousBlockHash: previousBlockHash,
  };

  blockchain.push(block);

  displayBlockchain();
}

function displayBlockchain() {
  const blockchainList = document.getElementById("blockchain-list");
  blockchainList.innerHTML = "";

  blockchain.forEach((block, index) => {
    const li = document.createElement("li");
    li.textContent = `Block ${
      index + 1
    }: Transactions: ${block.transactions.join(", ")} - Previous Hash: ${
      block.previousBlockHash
    } - Current Hash: ${block.blockHash}`;
    blockchainList.appendChild(li);
  });
}

// Simple hash function
function hashCode(str) {
  if (typeof str !== "string") {
    str = String(str);
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
