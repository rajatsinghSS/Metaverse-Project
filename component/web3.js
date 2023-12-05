import {Web3} from "web3";
import ABI from "../artifacts/contracts/Metaverse.sol/Metaverse.json"

const allObjects=new Promise((res,rej)=>{  
  async function meta(){
      if (typeof globalThis.ethereum=="undefined"){
        rej("You should install Metamask");
      }
  
       const web3=new Web3(globalThis.ethereum);
       const contractAddress="0xbC52dC7F4064EAe9d9A3503C196332ca11b5d77b";
       const contract=new web3.eth.Contract(ABI.abi,contractAddress);

    web3.eth.requestAccounts().then((accounts) => {
      contract.methods.totalSupply().call({ from: accounts[0] }).then((supply) => {
          contract.methods.getObjects().call({ from: accounts[0] }).then((data) => {
              res({ supply: supply, nft: data });
           });
        });
    });
  }
  
    meta();
  })

  export default allObjects;