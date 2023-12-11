import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';

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
  
  // SCENE & FOG
  scene.background = new THREE.Color(  0x000000  );
  

  // Carica le immagini per lo sfondo cubico
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
  'images/statics/Planets/planets_B (1).jpeg', 
  'images/statics/Planets/planets_B (2).jpg',
  'images/statics/Planets/planets_B (3).jpg', 
  'images/statics/Planets/planets_B (4).jpg', 
  'images/statics/Planets/planets_B (5).jpg', 
  'images/statics/Planets/planets_B (6).jpg',  
]);

// Imposta lo sfondo della scena come la texture cubica
scene.background = texture;

  // CAMERA
  camera.position.set( 0, 0, -20);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  // ORBIT CONTROLS
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window ); 
  controls.minDistance = 1;
  controls.maxDistance = 20;

  // LIGHTS
  const ambiente = new THREE.AmbientLight ( 0xffffff, 1 );
  const punto = new THREE.PointLight ( 0xffffff, 1 );
  punto.position.set( -5, 5, -5);
  scene.add( ambiente, /*punto*/);

  // GEOMETRY
    
  const gCube = new THREE.BoxGeometry( 5, 5, 5 );
  /*const gCube = new THREE.SphereGeometry( 8, 32, 32);*/
  const material = new THREE.MeshLambertMaterial({
    envMap: texture,               
  });

  let cube = new THREE.Mesh(gCube, material);  
  let cube2 = cube.clone();
  let cube3 = cube.clone();
  let cube4 = cube.clone();
  /*cube.position.set(0 , 0, 0); */
  cube.position.set( 3, 0, 0 );
  cube2.position.set( 3, 6, 0);
  cube3.position.set( -3, 0, 0 );
  cube4.position.set( -3, 6, 0);
  scene.add( cube, cube2, cube3, cube4 );

    
  // ANIMATE SCENE
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };
  
  animateScene();

}
