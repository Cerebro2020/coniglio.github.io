import * as THREE from 'three';
//import {OrbitControls} from './three_class/OrbitControls.js';
import { FirstPersonControls } from './three_class/FirstPersonControls.js';
import { OBJLoader } from './three_class/OBJLoader.js';
//import Stats  from './three_class/stats.module.js';

export default function(){
  // BASE  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}) ;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
 
  // RESIZE WINDOW
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  } );

  // LOADER
  const loader = new THREE.TextureLoader();
  const bumper = loader.load('static/images/Bump/BuMapConcrete.jpg'); 

  // Random Array
  const colorsArray = [
    "63b598", "ce7d78", "ea9e70", "a48a9e", "c6e1e8", "648177", "0d5ac1",
    "f205e6", "1c0365", "14a9ad", "4ca2f9", "a4e43f", "d298e2", "6119d0",
    "d2737d", "c0a43c", "f2510e", "651be6", "79806e", "61da5e", "cd2f00",
    "9348af", "01ac53", "c5a4fb", "996635", "b11573", "4bb473", "75d89e",
    "2f3f94", "2f7b99", "da967d", "34891f", "b0d87b", "ca4751", "7e50a8",
    "c4d647", "e0eeb8", "11dec1", "289812", "566ca0", "ffdbe1", "2f1179",
    "935b6d", "916988", "513d98", "aead3a", "9e6d71", "4b5bdc", "0cd36d",
    "250662", "cb5bea", "228916", "ac3e1b", "df514a", "539397", "880977",
    "f697c1", "ba96ce", "679c9d", "c6c42c", "5d2c52", "48b41b", "e1cf3b",
    "5be4f0", "57c4d8", "a4d17a", "225b8", "be608b", "96b00c", "088baf",
    "f158bf", "e145ba", "ee91e3", "05d371", "5426e0", "4834d0", "802234",
    "6749e8", "0971f0", "8fb413", "b2b4f0", "c3c89d", "c9a941", "41d158",
    "fb21a3", "51aed9", "5bb32d", "807fb", "21538e", "89d534", "d36647",
    "7fb411", "0023b8", "3b8c2a", "986b53", "f50422", "983f7a", "ea24a3",
    "79352c", "521250", "c79ed2", "d6dd92", "e33e52", "b2be57", "fa06ec",
    "1bb699", "6b2e5f", "64820f", "1c271", "21538e", "89d534", "d36647",
    "7fb411", "0023b8", "3b8c2a", "986b53", "f50422", "983f7a", "ea24a3",
    "79352c", "521250", "c79ed2", "d6dd92", "e33e52", "b2be57", "fa06ec",
    "1bb699", "6b2e5f", "64820f", "1c271", "9cb64a", "996c48", "9ab9b7",
    "06e052", "e3a481", "0eb621", "fc458e", "b2db15", "aa226d", "792ed8",
    "73872a", "520d3a", "cefcb8", "a5b3d9", "7d1d85", "c4fd57", "f1ae16",
    "8fe22a", "ef6e3c", "243eeb", "1dc18", "dd93fd", "3f8473", "e7dbce",
    "421f79", "7a3d93", "635f6d", "93f2d7", "9b5c2a", "15b9ee", "0f5997",
    "409188", "911e20", "1350ce", "10e5b1", "fff4d7", "cb2582", "ce00be",
    "32d5d6", "17232", "608572", "c79bc2", "00f87c", "77772a", "6995ba",
    "fc6b57", "f07815", "8fd883", "060e27", "96e591", "21d52e", "d00043",
    "b47162", "1ec227", "4f0f6f", "1d1d58", "947002", "bde052", "e08c56",
    "28fcfd", "bb09b", "36486a", "d02e29", "1ae6db", "3e464c", "a84a8f",
    "911e7e", "3f16d9", "0f525f", "ac7c0a", "b4c086", "c9d730", "30cc49",
    "3d6751", "fb4c03", "640fc1", "62c03e", "d3493a", "88aa0b", "406df9",
    "615af0", "4be47", "2a3434", "4a543f", "79bca0", "a8b8d4", "00efd4",
    "7ad236", "7260d8", "1deaa7", "06f43a", "823c59", "e3d94c", "dc1c06",
    "f53b2a", "b46238", "2dfff6", "a82b89", "1a8011", "436a9f", "1a806a",
    "4cf09d", "c188a2", "67eb4b", "b308d3", "fc7e41", "af3101", "ff065",
    "71b1f4", "a2f8a5", "e23dd0", "d3486d", "00f7f9", "474893", "3cec35",
    "1c65cb", "5d1d0c", "2d7d2a", "ff3420", "5cdd87", "a259a4", "e4ac44",
    "1bede6", "8798a4", "d7790f", "b2c24f", "de73c2", "d70a9c", "25b67",
    "88e9b8", "c2b0e2", "86e98f", "ae90e2", "1a806b", "436a9e", "0ec0ff",
    "f812b3", "b17fc9", "8d6c2f", "d3277a", "2ca1ae", "9685eb", "8a96c6",
    "dba2e6", "76fc1b", "608fa4", "20f6ba", "07d7f6", "dce77a", "77ecca"]
 

  // SCENE & FOG
  scene.background = new THREE.Color(  0x000000  );
  
  scene.fog = new THREE.FogExp2( 0xaaaaaa, 0.002, );
  const clock = new THREE.Clock();
  
  // CAMERA
  camera.position.set( 0, 0, -100 );
  camera.rotation.z = Math.PI/2;
  camera.lookAt(new THREE.Vector3( 0, player.height, 0));
  //camera.setLens( 35 );
  camera.setFocalLength ( 35 );

  // LIGHTS
  const ambiente = new THREE.AmbientLight ( 0xffffff, 0.4)
  scene.add( ambiente);

  const dLight = new THREE.DirectionalLight( 0xffffff, 0.5);
  dLight.position.set( 10, 0, -5);
  dLight.castShadow = true;
  dLight.shadow.mapSize.width = 512; 
  dLight.shadow.mapSize.height = 512;
  scene.add( dLight);

  const dLight2 = new THREE.DirectionalLight( 0xffffff, 0.1);
  dLight2.position.set( -10, 0, -5);
  dLight2.castShadow = true;
  dLight2.shadow.mapSize.width = 512; 
  dLight2.shadow.mapSize.height = 512;
  scene.add( dLight2);
  
  // FIRST PERSON CONTROLS
  const controls = new FirstPersonControls( camera, renderer.domElement );
  controls.lookAt(new THREE.Vector3( 0, player.height, 0));
  controls.movementSpeed = 15;
  controls.lookSpeed = 0.02;
  controls.autoForward = false; 

  // ANIMATE SCENE ///////////////
  function animateScene(){
    requestAnimationFrame( animateScene );
    controls.update(clock.getDelta());
    //stats.update();
    renderer.render( scene, camera );
  };

  animateScene();

  // BODY CELL INVISIBLE/////////////////
  const gBody = new THREE.SphereGeometry(2.1, 20, 20);  
  const mBody = new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x010101,
    specular:0x999999,
    shininess: 50,
    flatShading: true,
    //bumpMap: bumper,
    //bumpScale: 0.8,
    transparent: true,
    opacity: 1,
  });
     
  // TENTACLE ELEMENT /////////////
  const gTentacle = new THREE.ConeGeometry(0.1, 2, 3);
  const mTentacle = new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x000000,
    specular:0x999999,
    shininess: 50,
    flatShading: true,   
    transparent: true,
    opacity: 1,
  });

  for(let i=0; i<30; i++){  
  
    let newMat = mTentacle.clone();
    newMat.color = new THREE.Color(("#"+ colorsArray[i]));

    const cellBody = new THREE.Mesh(gBody, newMat);

    cellBody.castShadow = true; 
    cellBody.receiveShadow = true;

    cellBody.scale.set(0.9,0.9,0.5);
    cellBody.rotation.set(0,0,0);
    cellBody.position.set(0,0,0);
    
    let tentacle = new THREE.Mesh(gTentacle, newMat);
    tentacle.castShadow = true; 
    tentacle.receiveShadow = true;
        
    const gTentacleD = new THREE.ConeGeometry(0.2, 2, 6);
    let tentacleD = new THREE.Mesh(gTentacleD, newMat);
    tentacleD.castShadow = true; 
    tentacleD.receiveShadow = true;

    const gTentacleH = new THREE.ConeGeometry(0.3, 2, 12);
    let tentacleH = new THREE.Mesh(gTentacleH, newMat);
    tentacleH.castShadow = true; 
    tentacleH.receiveShadow = true;

    const gTentacleK = new THREE.ConeGeometry(0.4, 2, 24);
    let tentacleK = new THREE.Mesh(gTentacleK, newMat);
    tentacleK.castShadow = true; 
    tentacleK.receiveShadow = true;

    const gTentacleDk = new THREE.ConeGeometry(0.5, 3, 48);
    let tentacleDK = new THREE.Mesh(gTentacleDk, newMat);
    tentacleDK.castShadow = true; 
    tentacleDK.receiveShadow = true;

    let pT = 3;
    let pTd = 3;
    let pTh = 3;
    let pTk = 3;
    let pTdk = Math.floor(Math.random()*3.6);

    tentacle.position.set(0,pT,0);
    tentacleD.position.set(0,pTd,0);
    tentacleH.position.set(0,pTh,0);
    tentacleK.position.set(0,pTk,0);
    tentacleDK.position.set(0,pTdk,0);

    let bacteria = new THREE.Group();
    bacteria.add(tentacle, cellBody);
    bacteria.rotation.set(0,0,-0.8);

    let bacteriaD = new THREE.Group();
    bacteriaD.add(tentacleD, cellBody);
    bacteriaD.rotation.set(0,0,-0.4);
    
    let bacteriaH = new THREE.Group();
    bacteriaH.add(tentacleH, cellBody);
    bacteriaH.rotation.set(0,0,0);

    let bacteriaK = new THREE.Group();
    bacteriaK.add(tentacleK, cellBody);
    bacteriaK.rotation.set(0,0,0.4);

    let bacteriaDk = new THREE.Group();
    bacteriaDk.add(tentacleDK, cellBody);
    bacteriaDk.rotation.set(0,0,0.8);

    const gBodyTorus = new THREE.TorusGeometry(1.5,0.56,10, 20);
    let Torus = new THREE.Mesh(gBodyTorus, newMat);
    Torus.scale.set(1,1,0.8);

    let batterio = new THREE.Group();
    batterio.add(bacteria, bacteriaD, bacteriaH, 
    bacteriaK, bacteriaDk, Torus);
    
    let batterioClone = batterio.clone();
    batterioClone.position.set(0,0,i*2); 

   // let batterioCloneDown = batterioClone.clone();
    //batterioCloneDown.rotation.set(Math.PI,Math.PI,0);

    scene.add(batterioClone, /*batterioCloneDown*/);
  };

  //PLANE/////////
  const planeG = new THREE.BoxGeometry( 1000, 1000, 0.1, 100, 100 );
  const planeM = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    //roughness: 0.03,
    //metalness:0.7,
    clearcoat: 0.1,
    //flatShading: false,  
  });

  const newPlane = new THREE.Mesh( planeG, planeM );
  newPlane.position.set(0,-5,0);
  newPlane.rotation.x = Math.PI/2;
  //newPlane.receiveShadow = true;
  scene.add(newPlane);

  //AUDIO///////////
  const listener = new THREE.AudioListener();
  camera.add(listener);
  const audioLoader = new THREE.AudioLoader();
  const backgroundSound = new THREE.Audio( listener );
  audioLoader.load('audio/436557__k2tr__major-drone02.mp3', function( buffer ) {
  backgroundSound.setBuffer( buffer );
  backgroundSound.setLoop( true );
  backgroundSound.setVolume( 0.4 );
  //backgroundSound.play();
  });
};