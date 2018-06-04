import contract from 'truffle-contract'
import MemorializeArtifact from '../../build/contracts/Memorialize'
import GetWeb3 from '../utils/getWeb3';

let web3Instance;

let setWeb3Instance = function() {
    return new Promise((resolve, reject) => {
        if (web3Instance) {
            resolve();
        } else {
            GetWeb3
            .then(results => {
                web3Instance = results.web3;
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
        }
    })
}



let getMemorializeInstance = function () {
    return new Promise((resolve, reject) => {
        const Memorialize = contract(MemorializeArtifact)
        Memorialize.setProvider(web3Instance.currentProvider)
        web3Instance.eth.getAccounts((error, accounts) => {
            const account = accounts[0]
            Memorialize.deployed().then((instance) => {
                resolve({ instance, account })
            })
        })
    })
}

let obituaryContract = function (name, obituary, survivedBy, pictureHash, ipfsInfo) {
    return new Promise((resolve, reject) => {
        let instance, account;
        getMemorializeInstance()
            .then(result => ({instance, account} = result))
            .then(() => instance.submitObituary(name, obituary, survivedBy, pictureHash, ipfsInfo, {from: account, gas: 3000000}))
            .then(deadPersons => {

                instance.getObituaries(account).call()
                    .then(obituaries => {
                        resolve({ data: JSON.parse(obituaries.toString()) })
                    })
            })
    })
};


let getObituaries = function () {
    return new Promise((resolve, reject) => {
        let instance, account;
        getMemorializeInstance()
            .then(result => ({instance, account} = result))
            .then(() => instance.getObituaries(account).call())
            .then(obituaries => {
                resolve(obituaries && JSON.parse(obituaries.toString()))
            })
    })
}


export {
    obituaryContract,
    getObituaries,
    setWeb3Instance
}