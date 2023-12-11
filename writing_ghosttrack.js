import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { OBJLoader } from './three_class/OBJLoader.js';

export default function(){
  // SCENE  
  const scene = new THREE.Scene();
  var gridHelper = new THREE.GridHelper(100, 100);
  //scene.add(gridHelper);  
  
  // CAMERA
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

  // SCENE & FOG  
  scene.background = new THREE.Color( 0xff0000 );
  /*scene.fog = new THREE.Fog(0x000000, 0, 0);*/
  
  // CAMERA
  camera.position.set( 0, 0, 72);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 15 );

  // LIGHTS
  const ambiente = new THREE.AmbientLight ( 0xffffff, 1)
  scene.add( ambiente);
  const pointLight = new THREE.PointLight( 0xffffff, 1, 250);     
  pointLight.position.set( -1, 5, 10 ); 
  const pointHelper = new THREE.PointLightHelper(pointLight, 1);
  scene.add( pointLight, /*pointHelper*/ );

  
  // ANIMATE SCENE
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };
  animateScene();

  // ORBIT CONTROLS
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window ); 
  controls.minDistance = 2;
  controls.maxDistance = 72;

  // VIDEO
  var video = document.createElement('video');
  video.src = "/video/writing/traccia_fantasma (1).mp4";
  video.loop = true;
  video.style.display = 'none';  // Nasconde l'elemento video
  document.body.appendChild(video);  // Aggiunge l'elemento video al corpo del documento

  video.load();
  video.play();

  var vTexture = new THREE.VideoTexture(video);
  vTexture.minFilter = THREE.LinearFilter;
  vTexture.magFilter = THREE.LinearFilter;
  vTexture.format = THREE.RGBAFormat;

  // SPHERE
  const gSphere = new THREE.SphereGeometry(80, 32, 32);
  const mSphere = new THREE.MeshPhysicalMaterial({ 
    map: vTexture, 
    side: THREE.DoubleSide,    
  });  

  const sphere = new THREE.Mesh(gSphere, mSphere);

  let coef = 20;

  // SCHERMO
  const gBox = new THREE.BoxGeometry( 1.6*(coef), 0.9*(coef), 1.6*(coef), 200, 200, 200);
  const mBox = new THREE.MeshPhysicalMaterial({ 
    map: vTexture, 
    side: THREE.DoubleSide,    
  });

  const schermo = new THREE.Mesh(gBox, mBox); 
  schermo.rotation.set( 0, 0.8, 0 );
  scene.add(sphere, schermo);




  







  
    
    
 
 

};