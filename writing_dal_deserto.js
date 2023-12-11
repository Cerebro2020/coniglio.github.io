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
  scene.background = new THREE.Color( 0x000000 );
  /*scene.fog = new THREE.Fog(0x000000, 0, 0);*/
  
  // CAMERA
  camera.position.set( 0, 0, 10);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 15 );

  // LIGHTS
  const ambiente = new THREE.AmbientLight ( 0xffffff, 1)
  scene.add( ambiente);
  const pointLight = new THREE.PointLight( 0xffffff, 1, 250);     
  pointLight.position.set( -1, 5, 10 ); 
  const pointHelper = new THREE.PointLightHelper(pointLight, 1);
 //scene.add( pointLight, /*pointHelper*/ );
  
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
  controls.maxDistance = 50;

  // VIDEO
  var video = document.createElement('video');
  video.src = "/video/writing/Film_MPV.mp4";
  video.style.display = 'none';  // Nasconde l'elemento video
  video.loop = true; 
  document.body.appendChild(video);  // Aggiunge l'elemento video al corpo del documento

  video.load();
  video.play();

  var vTexture = new THREE.VideoTexture(video);
  vTexture.minFilter = THREE.LinearFilter;
  vTexture.magFilter = THREE.LinearFilter;
  vTexture.format = THREE.RGBAFormat;
  vTexture.wrapS = THREE.RepeatWrapping;
  vTexture.wrapT = THREE.RepeatWrapping;
  vTexture.repeat.set( 2, 1 );

  // VIDEO 2
  var video2 = document.createElement('video');
  video2.src = "/video/writing/Film_MPV.mp4";
  video2.style.display = 'none';  // Nasconde l'elemento video
  video2.loop = true; 
  document.body.appendChild(video2);  // Aggiunge l'elemento video al corpo del documento
 
  video2.load();
  video2.play();
 
  var vTexture2 = new THREE.VideoTexture(video2);
  vTexture2.minFilter = THREE.LinearFilter;
  vTexture2.magFilter = THREE.LinearFilter;
  vTexture2.format = THREE.RGBAFormat;
  vTexture2.wrapS = THREE.RepeatWrapping;
  vTexture2.wrapT = THREE.RepeatWrapping;
  vTexture2.repeat.set( 1, 1 );
 
 
  
  // SCHERMO
  const gRoom = new THREE.CylinderGeometry( 64, 64, 64, 38, 1, true );
  const mRoom = new THREE.MeshPhysicalMaterial({ 
    map: vTexture, 
    side: THREE.DoubleSide, 
     
  });

  const schermo = new THREE.Mesh(gRoom, mRoom); 
  schermo.position.set( 0, 0, 0);
  schermo.rotation.set( 0, -Math.PI/2, 0 );

  // SCHERMO UP
  const gRoom2 = new THREE.CylinderGeometry( 64, 64, 64, 38, 1  );
  const mRoom2 = new THREE.MeshPhysicalMaterial({ 
    map: vTexture2, 
    side: THREE.DoubleSide, 
     
  });

  const schermoUp = new THREE.Mesh(gRoom2, mRoom2);
  schermoUp.position.set( 0, -32, 0 );
  schermoUp.scale.set( 1, 0.01, 1 );
  schermoUp.rotation.set( 0, -Math.PI/2, 0 );
  scene.add(schermoUp); 
  
  const schermoDown = schermoUp.clone();
  schermoDown.position.set(0,32,0);
  //schermoDown.rotation.set( 0, -Math.PI/2, 0 );
  scene.add(schermoDown); 

  // SPHERE
  const gSphere = new THREE.SphereGeometry( 200, 128, 128 );
  const mSphere = new THREE.MeshPhysicalMaterial({ 
    map: vTexture2, 
    side: THREE.DoubleSide,       
  });

  const sphere = new THREE.Mesh(gSphere, mSphere); 
  sphere.position.set( 0, 0, 0 );
  sphere.rotation.set( 1, 0, 1);

  scene.add( schermo /*, sphere*/ );

};