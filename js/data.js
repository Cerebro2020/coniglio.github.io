import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';
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
  const textureP4 = loader.load ('images/bcg/SfondoI.jpg');

  // SCENE & FOG
  scene.background = /*new THREE.Color( 0xFF00A2 );
  //rgb(193, 255, 77)*/ textureP4;
  const gridHelper = new THREE.GridHelper( 200,50 );
  
 // scene.add(gridHelper);

  //scene.fog = new THREE.Fog(0x000000, 0, 0);  
  // CAMERA
  camera.position.set( 0, 0, 0);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  // LIGHTS
  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 0 )
  scene.add( ambiente);
  //POINT
  const pointLight = new THREE.PointLight( 0xffffff, 0.5, 50); 
  pointLight.position.set(0,80,0);
  const pointLight2 = new THREE.PointLight( 0xffffff, 0.5, 50);    
  pointLight2.position.set(0,-80,1);
  const pointLight3 = new THREE.PointLight( 0xffffff, 0.5, 50); 
  pointLight3.position.set( 0, -40, 1 ); 
  //scene.add( pointLight, pointLight2, /*pointLight3*/ ); 
  
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

  // HEARTS
  const loaderHeart = new GLTFLoader();
   
  loaderHeart.load(
    '3d/heart/heart.glb',
    function (gltfg) {
      const heart = gltfg.scene;
      heart.position.set( -3.6, -0.4, -26 );      
      heart.rotation.set( 0, 0, 0 );
      heart.scale.set( 10, 10, 10 );

      heart.traverse(function (node) {
        if (node.isMesh) {          
          const material = new THREE.MeshNormalMaterial({
            //color: 0xFF00A2,  
            map: textureP2,            
          });
         
          node.material = material;          
          node.castShadow = true;
          node.receiveShadow = true;        
        }    
      });

      scene.add(heart);   
    },    

    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
      console.error(error);      
    } 

  );
   
  //PIANETA 1
  const gPianeta = new THREE.SphereGeometry( 5, 32, 32 );
  const mPianeta = new THREE.MeshNormalMaterial({
    /*color: 0x000000,*/
  });

  let pianeta = new THREE.Mesh( gPianeta, mPianeta );
  pianeta.position.set(4 , -3, -28);
  let pianeta2 = pianeta.clone(); 
  pianeta2.position.set(-9 , 8, -58); 
  let pianeta3 = pianeta.clone(); 
  pianeta3.position.set(-12 , -2, -27); 
  
  scene.add(pianeta, pianeta2, pianeta3);


  //PROJECTS
  // CUBE
  const gBox = new THREE.BoxGeometry( 3, 3, 3 );
  const mBox = new THREE.MeshPhysicalMaterial({
    color: 0xC1FF4D,
    roughness:0.0,
    metalness:0.5, 
  });
  const Box = new THREE.Mesh( gBox, mBox );
  scene.add( Box );
  Box.position.set( 3, -15,-30);
  Box.rotation.set( -1, -1, 0 );
     

    // RESEARCHES ////
    const gSproject = new THREE.SphereGeometry( 10, 40, 40 ); 
    
    const mSproject = new THREE.MeshNormalMaterial({
      //color: 0x0055ff,
      //side: THREE.DoubleSide,
      //map: textureP2,      
    });
    const Sproject = new THREE.Mesh( gSproject, mSproject );
    Sproject.position.set( 9, -34, -70);    
    scene.add( Sproject );

    const gBoxColored = new THREE.BoxGeometry( 5, 5, 5);
    const mBoxColored = new THREE.MeshPhysicalMaterial({
      color: 0x0055ff,      
      //map: textureP,     
    });
    
    let BoxColored = new THREE.Mesh( gBoxColored, mBoxColored );
    BoxColored.rotation.set( Math.PI/2, Math.PI/4, Math.PI/4 );
    BoxColored.position.set( -3, -30, -60 ); 
    scene.add( BoxColored );
   
    // WITH ////
    let box2 = Box.clone();
    box2.position.set( -2, -40, -54);
    box2.rotation.z = -0.1;
    box2.rotation.y = 0.4;
    scene.add( box2 );

    // CONTACT ////
    let box3 = Box.clone();
    box3.position.set( 2, -59, -70);
    box3.rotation.set( 1, -0.1, -0.4); 
    box3.scale.set( 0.4, 0.4, 0.4 );    
    scene.add( box3 );

};