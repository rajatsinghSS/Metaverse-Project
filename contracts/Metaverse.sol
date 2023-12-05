// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
//Deploying contracts with the account: 0x551b31d84FF0Fb2995cE4c1462F83B06695A213A
//metaverse address: 0xbC52dC7F4064EAe9d9A3503C196332ca11b5d77b

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Metaverse is ERC721,Ownable{
    constructor() ERC721 ("META","MTA") Ownable(msg.sender){}

    uint256 private supply;

    uint public maxSupply=100;
    uint public cost=1000 wei;

    struct Object{
        string name;
        int8 w;
        int8 h;
        int8 d;
        int8 x;
        int8 y;
        int8 z;
        int8 w2;
    }
    mapping (address=>Object[]) NFTOwners;
    Object[] public objects;

    function getObjects() public view returns(Object[] memory){
        return objects;
    }

    function totalSupply() public view returns(uint){
        return supply;
    }

    function mint(int8 shape,int8 position,int8 position1) public payable{
        require(supply<=maxSupply,"Supply exceeds maximum");
        require(msg.value>=cost,"Insufficient Payment");
        require(shape >= 1 && shape <= 3,"Invaid shape serial number");
        require(position >= -50 && position <= 50,"Invaid shape serial number");
        require(position1 >= -50 && position1 <= 50,"Invaid shape serial number");
        supply++;
        _safeMint(msg.sender, supply);
        if(shape==1){
            Object memory _newObject=Object("cube",1,1,1,position,3,position1,0);
            objects.push(_newObject);
        }
        if(shape==2){
            Object memory _newObject=Object("cone",1,3,32,position,3,position1,0);
            objects.push(_newObject);
        }
        if(shape==3){
            Object memory _newObject=Object("cylinder",1,1,3,position,3,position1,32);
            objects.push(_newObject);
        }
        position--;
    }

    function withdraw() external payable onlyOwner{
        address payable _owner=payable(owner());
        _owner.transfer(address(this).balance);
    }

    function getOwnerObjects()public view returns(Object[] memory){
        return NFTOwners[msg.sender];
    } 
}