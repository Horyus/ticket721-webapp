//describe("SimpleStorage", function() {
//  this.timeout(0);
//  before(function(done) {
//    this.timeout(0);
//    var contractsConfig = {
//      "SimpleStorage": {
//        args: [100]
//      }
//    };
//    EmbarkSpec.deployAll(contractsConfig, () => { done() });
//  });
//
//  it("should set constructor value", async function() {
//    let result = await SimpleStorage.methods.storedData().call();
//    assert.equal(result, 100);
//  });
//
//  it("set storage value", async function() {
//    await SimpleStorage.methods.set(150).send();
//    let result = await SimpleStorage.methods.get().call();
//    assert.equal(result, 150);
//  });
//
//});

config({
    node: "http://localhost:8545"
});

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});

const Ticket721HUBInfos = require("../dist/contracts/Ticket721HUB.json");
const Ticket721VerifiedAccountsInfos = require("../dist/contracts/Ticket721VerifiedAccounts");
const _Web3 = require("web3");
const Web3 = new _Web3(new _Web3.providers.HttpProvider("http://localhost:8545"));

const Fs = require("fs");

let Ticket721HUB;
let Ticket721VerifiedAccounts;
let accounts;

let manifest = [];

describe("Register Accounts as verified users", () => {

    it("Loads Ticket721HUB", async (done) => {
        Ticket721HUB = new Web3.eth.Contract(Ticket721HUBInfos.abi, Ticket721HUBInfos.address);
        Ticket721HUB.setProvider(Web3.currentProvider);

        const AccountManagerAddress = await Ticket721HUB.methods.account_manager().call();
        Ticket721VerifiedAccounts  = new Web3.eth.Contract(Ticket721VerifiedAccountsInfos.abi, AccountManagerAddress);

        accounts = await Web3.eth.getAccounts();
        done();
    }, 50000);

    it("Add account #2 as verified identity", async (done) => {
        try {
            await Ticket721VerifiedAccounts.methods.registerProfile("NumberOne").send({from: accounts[1]});
            await Ticket721VerifiedAccounts.methods.validateProfile(accounts[1]).send({from: accounts[0]});
            done();
        } catch (e) {
            done(e);
        }
    });

    it("Add account #3 as verified identity", async (done) => {

        try {
            await Ticket721VerifiedAccounts.methods.registerProfile("NumberTwo").send({from: accounts[2]});
            await Ticket721VerifiedAccounts.methods.validateProfile(accounts[2]).send({from: accounts[0]});
            done();
        } catch (e) {
            done(e);
        }
    });

    const runSale = async (id, account, idx, status, done) => {
        try {
            const config = require("./" + id + "/infos.json");
            const image = Fs.readFileSync("./test/" + id + "/" + config.image);
            const ipfs_image = (await ipfs.files.add(image))[0].hash;
            console.log(ipfs_image);
            const deploy = new Buffer(JSON.stringify({
                ...config,
                image: ipfs_image,
            }, null, 4));
            const infos = (await ipfs.files.add(deploy))[0].hash;
            console.log(infos);
            console.log(config);
            const gas = await Ticket721HUB.methods.runSale(config.title, id, new Web3.utils.BN(config.price), config.cap, infos).estimateGas({from: accounts[account]});
            await Ticket721HUB.methods.runSale(config.title, id, new Web3.utils.BN(config.price), config.cap, infos).send({
                from: accounts[account],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[account], idx).call();
            manifest.push({address: ret, status: status});
            done();
        } catch (e) {
            done(e);
        }
    };

    it("Should run a Sale as #2", runSale.bind(null, "T721UTR2018", 1, 0, 'new')).timeout(50000);
    it("Should run a Sale as #2", runSale.bind(null, "T721ETR2018", 1, 1, 'hot')).timeout(50000);
    it("Should run a Sale as #2", runSale.bind(null, "T721ETR2019", 1, 2, 'hot')).timeout(50000);
    it("Should run a Sale as #2", runSale.bind(null, "T721UTT", 1, 3, 'soon')).timeout(50000);


    it("Save manifest", async (done) => {
        Fs.writeFileSync("./manifest.json", JSON.stringify(manifest));
        done();
    });

});
