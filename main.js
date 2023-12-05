import * as THREE from 'three';
import Movements from './component/movement';
import allobjects from "./component/web3";
import {Web3} from "web3";
import ABI from "./artifacts/contracts/Metaverse.sol/Metaverse.json"



const scene = new THREE.Scene();
scene.background=new THREE.Color(0xFFFFFF);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambient_light = new THREE.AmbientLight(0x404040);
const direction_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(direction_light);
scene.add(ambient_light);

const geometry_area = new THREE.BoxGeometry(100, 1, 100);
const material_area = new THREE.MeshPhongMaterial({ color: 0xffffff });
const area = new THREE.Mesh(geometry_area, material_area);
scene.add(area);

allobjects.then((result) => {
  result.nft.forEach((object, index) => {
    if (index <= result.supply.toString()) {

      if(object.name=="cube"){
        const geometry = new THREE.BoxGeometry(object.w.toString(), object.h.toString(), object.d.toString());
        const material = new THREE.MeshPhongMaterial( { color: 0xFFA500 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        cube.position.set(object.x.toString(), object.y.toString(), object.z.toString());
      }
      if(object.name=="cone"){
        const geometry = new THREE.ConeGeometry(object.w.toString(), object.h.toString(), object.d.toString());
        const material = new THREE.MeshPhongMaterial( { color:0xff0000  } );
        const cone = new THREE.Mesh( geometry, material );
        scene.add( cone );
        cone.position.set(object.x.toString(), object.y.toString(), object.z.toString());
      }
      if(object.name=="cylinder"){
        const geometry = new THREE.CylinderGeometry(object.w.toString(), object.h.toString(), object.d.toString(),object.w2.toString());
        const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
        const cylinder = new THREE.Mesh( geometry, material );
        scene.add( cylinder );
        cylinder.position.set(object.x.toString(), object.y.toString(), object.z.toString());
      }
    }

  });
});

async function buyNFT(){
  let nftshape=document.querySelector("#nftbuy").value;
  let x=document.querySelector("#nftx").value;
  let z=document.querySelector("#nftz").value;
  if (typeof globalThis.ethereum=="undefined"){
    rej("You should install Metamask");
  }
   const web3=new Web3(globalThis.ethereum);
   const contractAddress="0xbC52dC7F4064EAe9d9A3503C196332ca11b5d77b";
   const contract=new web3.eth.Contract(ABI.abi,contractAddress);
  if(nftshape>=1 && nftshape<=3){
    web3.eth.requestAccounts().then((accounts) => {
      contract.methods.mint(nftshape,x,z).send({from: accounts[0],value: "1001",}).then((data) => {
          alert("Congratulation you have minted a NFT");
        });
    });
  }
  else{
    alert("Invalid Enter right shape Number and dimension");s
  }
}
let buy=document.querySelector("#nftbuy1");
buy.addEventListener("click", buyNFT);

let fullView=true;
let nfts=false;


const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.set(0,3,0);//z limit 49 to -49   
let object=cube;

function full(){
  fullView=true;
  nfts=false;
}
function nft(){
  fullView=false;
  nfts=true;
}
const fullv = document.querySelector("#fullview");
fullv.addEventListener("click", full);
const nftsv = document.querySelector("#nftview");
nftsv.addEventListener("click", nft);

camera.position.set(10, 3, 40);


function animate() {
	object.rotation.x += 0.05;
  object.rotation.y += 0.05;
  object.rotation.z += 0.05;
  requestAnimationFrame(animate);

  if(fullView){
    if (Movements.isPressed(37)) {
      //left
      camera.position.x -= 0.5;
    }
    if (Movements.isPressed(38)) {
      //up
      camera.position.x += 0.5;
      camera.position.y += 0.5;
    }
    if (Movements.isPressed(39)) {
      //right
      camera.position.x += 0.5;
    }
    if (Movements.isPressed(40)) {
      //down
      camera.position.x -= 0.5;
      camera.position.y -= 0.5;
    }
  }
  if(nfts){
    camera.position.set(50, 50, 50);

    if (Movements.isPressed(37)) {
      //left
      object.position.x -= 0.5;
    }
    if (Movements.isPressed(38)) {
      //up
      //cube.position.x += 0.5;
      object.position.z -= 0.5;
    }
    if (Movements.isPressed(39)) {
      //right
      object.position.x += 0.5;
    }
    if (Movements.isPressed(40)) {
      //down
     // cube.position.x -= 0.5;
      object.position.z += 0.5;
    }
  }

 
    camera.lookAt(area.position);
    renderer.render(scene, camera);
}
animate();

