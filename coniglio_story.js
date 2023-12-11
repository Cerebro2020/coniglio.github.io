import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { OBJLoader } from './three_class/OBJLoader.js';

export default function(){
  // SCENE  
  const scene = new THREE.Scene();
  //CAMERA
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
  //RENDERER
  const renderer = new THREE.WebGLRenderer({    
    alpha:true, 
    antialias:true}) ;
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

  // TEXTURS
  const loader = new THREE.TextureLoader();
  const textureP = loader.load ('images/bcg/Sfondo.jpg'); 
  textureP.wrapS = THREE.RepeatWrapping;
  textureP.WrapT = THREE.RepeatWrapping;

  const textureP2 = loader.load ('images/bcg/Sfondo2.jpg');
  const textureP3 = loader.load ('images/bcg/SfondoS.jpg');

  // SCENE & FOG
  scene.background = new THREE.Color( /*0xFF00A2*/0xffffff );
  //rgb(193, 255, 77)  //textureP3;
  const gridHelper = new THREE.GridHelper( 200,50 );
  
 // scene.add(gridHelper);

  //scene.fog = new THREE.Fog(0x000000, 0, 0);  
  // CAMERA
  camera.position.set( 0, 0, 0);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  // LIGHTS

  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 1 )
  scene.add( ambiente);

  //POINT
  const pointLight = new THREE.PointLight( 0xffffff, 1, 250); 
  pointLight.position.set(0,80,0);

  const pointLight2 = new THREE.PointLight( 0xffffff, 1, 250);    
  pointLight2.position.set(0,-80,1);
    
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

  //SCROLLING
  function moveCamera () {
    const t = document.body.getBoundingClientRect().top;
    camera.position.set( 0, t*0.02, t * 0.02 );    
  }

  document.body.onscroll = moveCamera;
      
  // RABBIT
  const loaderRabbit = new OBJLoader();
  let rabbit;
   
  // LOAD A RESOURCE
  loaderRabbit.load('3d/rabbit/Rabbit.obj',
    function ( object ) {
      object.position.set( 14, 0, -40 );
      object.rotation.set( 0, -Math.PI/2, 0 );      
      try{
      const matRabbit = new THREE.MeshPhysicalMaterial({
        color: 0xC1FF4D,
        roughness:0.0,
        metalness:0.5,
        transparent: true,
        opacity: 0.5,                    
        })     
      
      object.children[0].material=matRabbit;
      }catch(e){
      console.log(e);
      }
      rabbit=object;     
      console.log( 'body was loaded', rabbit );
      scene.add( rabbit );      
           
      //RABBIT CLONE       
      let rabbit2 = rabbit.clone();
      rabbit2.position.set( -14, 0, -40 );
      rabbit2.rotation.set( 0, -Math.PI/2, 0 );     
             
      scene.add( rabbit2 );

    },
    // called when loading is in progresses
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
      console.log( 'An error happened' );
    }
  );
   
  //PIANETA 1
  const gPianeta = new THREE.SphereGeometry( 1, 32, 32 );
  const mPianeta = new THREE.MeshPhysicalMaterial({
    color: 0xC1FF4D,
    roughness:0.0,
    metalness:0.5,
    transparent: true,
    opacity: 0.5,                       
  }) 

  let pianeta = new THREE.Mesh( gPianeta, mPianeta );
  pianeta.position.set( -12 , -5, -40 );

  let pianeta2 = pianeta.clone(); 
  pianeta2.position.set( 12 , 10, -40 ); 
    
  scene.add(pianeta, pianeta2);

  // CUBE
  const gBox = new THREE.BoxGeometry( 1, 1, 1 );
  

  const Box = new THREE.Mesh( gBox, mPianeta );
  scene.add( Box );
  Box.position.set( -12, -10,-40);
  Box.rotation.set( 1, 1, 1 );     
};