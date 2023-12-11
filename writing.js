import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { OBJLoader } from './three_class/OBJLoader.js';

export default function(){
  // SCENE  
  const scene = new THREE.Scene();
  
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
  //scene.background = new THREE.Color( 0xFFFFFF );  
  scene.background = new THREE.Color( 0x000000 );
  //scene.background = new THREE.Color( 0xFF00A2 );
  
  //scene.fog = new THREE.Fog(0x000000, 0, 0);
  
  // CAMERA
  camera.position.set( 0, 0, -25);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  // LIGHTS
  const ambiente = new THREE.AmbientLight ( 0xffffff, 0.2 )
  scene.add( ambiente);
  
  const pointLight = new THREE.PointLight( 0xFF00A2, 5, 250 ); 
  pointLight.position.set( 1, 1, 0 );
  const pointLight2 = new THREE.PointLight( 0x2FF00, 5, 250 ); 
  pointLight2.position.set( -1, 0, 0 );
  scene.add( pointLight, pointLight2 );

  
  // ANIMATE SCENE
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };
  animateScene();

  // ORBIT CONTROLS
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window ); 
  controls.minDistance = 30;
  controls.maxDistance = 30;

 // SATELLITE
  const gSphere = new THREE.SphereGeometry( 0.04, 20, 20);
  const mSphere = new THREE.MeshPhongMaterial({
        color: 0xffffff,        
  });

  const sphereL = new THREE.Mesh( gSphere, mSphere );
  const sphereR = new THREE.Mesh( gSphere, mSphere );
  const sphereL2 = new THREE.Mesh( gSphere, mSphere );
  const sphereR2 = new THREE.Mesh( gSphere, mSphere );
 
  sphereL.position.set(0, 0, -5.5);
  sphereR.position.set(0, 0, 5.5);
  sphereL2.position.set(0, 5, -10.5);
  sphereR2.position.set(7, 0, 10.5);
  
  const gLine = new THREE.CylinderGeometry(0.001,0.01,150,30);
  const mLine = new THREE.MeshPhongMaterial ({
    color: 0x303030,
  });
  const line = new THREE.Mesh(gLine, mLine);

  
  let cerebroLine = new THREE.Group();
  cerebroLine.add( sphereL, sphereL2, sphereR, sphereR2/*line*/ );
  cerebroLine.rotation.x = Math.PI/2;

  let cerebroLine2 = cerebroLine.clone();
  cerebroLine2.rotation.x = Math.PI/4;

  let cerebroLine3 = cerebroLine.clone();
  cerebroLine3.rotation.x = Math.PI/-4;

  let cerebroLine4 = cerebroLine.clone();
  cerebroLine4.rotation.x = Math.PI/-1;

  let cerebroCrow = new THREE.Group();

  cerebroCrow.add(cerebroLine, cerebroLine2, cerebroLine3, cerebroLine4 );

  let cerebroCrow2 = cerebroCrow.clone();
  let cerebroCrow3 = cerebroCrow.clone();
  cerebroCrow.rotation.y = 0;
  cerebroCrow2.rotation.y = -1.2;
  cerebroCrow3.rotation.y = 1.2;
  
  //cerebroCrow.position.x = 4;
  //cerebroCrow2.position.x = -4;

  scene.add(cerebroCrow, cerebroCrow2, cerebroCrow3);

  function animate() {
    requestAnimationFrame( animate );
    cerebroCrow.rotation.x += 0.001;
    cerebroCrow.rotation.y += 0.002;
    cerebroCrow2.rotation.x += 0.001;
    cerebroCrow2.rotation.y += 0.001;
    cerebroCrow3.rotation.x += 0.001;
    cerebroCrow3.rotation.y += 0.006;  
    bodyBrain.rotation.y += 0.0005;
    
    
    renderer.render(scene, camera );
  };

  animate(); 

};