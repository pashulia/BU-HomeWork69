const { task, types } = require("hardhat/config");

task("deploy", "Deploy contract")
.addParam("target", "Constructor argument - target")
.addParam("percent", "Constructor argument - percent", 0, types.int)
.addParam("value", "Send ether's  amount", 0, types.int)
.addParam("account", "Account how send transaction", 0, types.json)
.setAction(async (taskArgs) => {
    const ContractFactory = await ethers.getContractFactory("HomeWork4");
    const contract = await ContractFactory.connect(taskArgs.account)
        .deploy(taskArgs.target, taskArgs.percent, { value: taskArgs.value });
    await contract.deployed();
    console.log(contract.address);
    return contract.address;
})

task("addPayment", "Call contract functions addPayment")
.addParam("contractAddress", "Contract address")
.addParam("target", "Constructor argument - target")
.addParam("value", "Send ether's  amount", 0, types.int)
.addParam("account", "Account how send transaction", 0, types.json)
.setAction(async (taskArgs) => {
    const ContractFactory = await ethers.getContractFactory("HomeWork4");
    const contract = await ContractFactory.attach(taskArgs.contractAddress);
    const tx = await contract.connect(taskArgs.account).addPayment(taskArgs.target, { value: taskArgs.value });
    await tx.wait();
    console.log(`addPayment: ${tx.hash}`);
    return tx.hash;
})

task("sendPayment", "Call contract functions sendPayment")
.addParam("contractAddress", "Contract address")
.addParam("sender", "Constructor argument - sender")
.addParam("account", "Account how send transaction", 0, types.json)
.setAction(async (taskArgs) => {
    const ContractFactory = await ethers.getContractFactory("HomeWork4");
    const contract = await ContractFactory.attach(taskArgs.contractAddress);
    const tx = await contract.connect(taskArgs.account).sendPayment(taskArgs.sender);
    await tx.wait();
    console.log(`sendPayment: ${tx.hash}`);
    return tx.hash;
})

task("getPayment", "Call contract functions getPayment")
.addParam("contractAddress", "Contract address")
.addParam("sender", "Constructor argument - sender")
.addParam("account", "Account how send transaction", 0, types.json)
.setAction(async (taskArgs) => {
    const ContractFactory = await ethers.getContractFactory("HomeWork4");
    const contract = await ContractFactory.attach(taskArgs.contractAddress);
    const result = await contract.connect(taskArgs.account).getPayment(taskArgs.sender);
    console.log(`getPayment: ${result[0]}, ${result[1]}`);
    return result;
})