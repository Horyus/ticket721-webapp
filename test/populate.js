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
        console.log(Ticket721HUBInfos.address);
        Ticket721HUB = new Web3.eth.Contract(Ticket721HUBInfos.abi, Ticket721HUBInfos.address);
        Ticket721HUB.setProvider(Web3.currentProvider);

        const AccountManagerAddress = await Ticket721HUB.methods.account_manager().call();
        Ticket721VerifiedAccounts  = new Web3.eth.Contract(Ticket721VerifiedAccountsInfos.abi, AccountManagerAddress);

        accounts = await Web3.eth.getAccounts();
        done();
    });

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

    it("Should run a Sale as #2", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("UltraRock 2018", "T721UTR2018", 200000, 2500, "INFOS").estimateGas({from: accounts[1]});
            await Ticket721HUB.methods.runSale("UltraRock 2018", "T721UTR2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[1],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[1], 0).call();
            manifest.push({address: ret.ticket721, status: 'new'});
            done();
        } catch (e) {
            done(e);
        }
    });

    it("Should run a Sale as #2", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("ElectroRide 2018", "T721ETR2018", 200000, 2500, "INFOS").estimateGas({from: accounts[1]});
            await Ticket721HUB.methods.runSale("ElectroRide 2018", "T721ETR2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[1],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[1], 1).call();
            manifest.push({address: ret.ticket721.toLowerCase(), status: 'hot'});
            done();
        } catch (e) {
            done(e);
        }
    });

    it("Should run a Sale as #2", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("UltraTek", "T721UTT2018", 200000, 2500, "INFOS").estimateGas({from: accounts[1]});
            await Ticket721HUB.methods.runSale("UltraTek", "T721UTT2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[1],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[1], 2).call();
            manifest.push({address: ret.ticket721.toLowerCase(), status: 'hot'});
            done();
        } catch (e) {
            done(e);
        }
    });

    it("Should run a Sale as #3", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("Javascript Summit", "T721JSS2018", 200000, 2500, "INFOS").estimateGas({from: accounts[2]});
            await Ticket721HUB.methods.runSale("Javascript Summit", "T721JSS2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[2],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[2], 0).call();
            manifest.push({address: ret.ticket721.toLowerCase(), status: 'hot'});
            done();
        } catch (e) {
            done(e);
        }
    });

    it("Should run a Sale as #3", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", 200000, 2500, "INFOS").estimateGas({from: accounts[2]});
            await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[2],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[2], 1).call();
            manifest.push({address: ret.ticket721.toLowerCase(), status: 'hot'});
            done();
        } catch (e) {
            done(e);
        }
    });

    it("Should run a Sale as #3", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("Baseball Cup 2k18", "T721BBC2018", 200000, 2500, "INFOS").estimateGas({from: accounts[2]});
            await Ticket721HUB.methods.runSale("Baseball Cup 2k18", "T721BBC2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[2],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[2], 2).call();
            manifest.push({address: ret.ticket721.toLowerCase(), status: 'hot'});
            done();
        } catch (e) {
            done(e);
        }
    });

    it("Should run a Sale as #3", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", 200000, 2500, "INFOS").estimateGas({from: accounts[2]});
            await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[2],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[2], 3).call();
            manifest.push({address: ret.ticket721.toLowerCase(), status: 'hot'});
            done();
        } catch (e) {
            done(e);
        }
    });
    it("Should run a Sale as #3", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", 200000, 2500, "INFOS").estimateGas({from: accounts[2]});
            await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[2],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[2], 4).call();
            manifest.push({address: ret.ticket721.toLowerCase(), status: 'hot'});
            done();
        } catch (e) {
            done(e);
        }
    });
    it("Should run a Sale as #3", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", 200000, 2500, "INFOS").estimateGas({from: accounts[2]});
            await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[2],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[2], 5).call();
            manifest.push({address: ret.ticket721.toLowerCase(), status: 'hot'});
            done();
        } catch (e) {
            done(e);
        }
    });
    it("Should run a Sale as #3", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", 200000, 2500, "INFOS").estimateGas({from: accounts[2]});
            await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[2],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[2], 6).call();
            manifest.push({address: ret.ticket721.toLowerCase(), status: 'hot'});
            done();
        } catch (e) {
            done(e);
        }
    });
    it("Should run a Sale as #3", async (done) => {
        try {
            const gas = await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", 200000, 2500, "INFOS").estimateGas({from: accounts[2]});
            await Ticket721HUB.methods.runSale("Nice Event", "T721NE2018", new Web3.utils.BN("100000000000000000"), 2500, "INFOS").send({
                from: accounts[2],
                gas: gas * 2
            });
            const ret = await Ticket721HUB.methods.sale_ownership(accounts[2], 7).call();
            manifest.push({address: ret.ticket721.toLowerCase(), status: 'hot'});
            done();
        } catch (e) {
            done(e);
        }
    });

    it("Save manifest", async (done) => {
        Fs.writeFileSync("./manifest.json", JSON.stringify(manifest));
        done();
    });

});
