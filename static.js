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
  const textureP3 = loader.load ('images/statics/textures/texture_planet_3.jpg');
  textureP3.wrapS = THREE.RepeatWrapping;
  textureP3.wrapT = THREE.RepeatWrapping;
  textureP3.repeat.set( 4, 4); 

  const bumpP3 = loader.load ('images/statics/textures/bump_planet_3.jpg');
  bumpP3.wrapS = THREE.RepeatWrapping;
  bumpP3.wrapT = THREE.RepeatWrapping;
  bumpP3.repeat.set( 4, 4); 

  // SCENE & FOG
  scene.background = new THREE.Color( 0x000000);
  const gridHelper = new THREE.GridHelper( 200,50 );  
  //scene.add(gridHelper);
 
  // CAMERA
  camera.position.set( 0, 0, 0);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  // LIGHTS
  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 1 )
  scene.add( ambiente);
  ambiente.castShadow = true;

  //POINT
  const pointLight = new THREE.PointLight( 0xffffff, 0.3, 200);
  pointLight.position.set( 0, 0, -50 );
  const helper1 = new THREE.PointLightHelper(pointLight); 
  //scene.add(helper1);

  const pointLight2 = new THREE.PointLight( 0xffffff, 0.3, 200);    
  pointLight2.position.set( 0 ,-10, -40 );
  const helper2 = new THREE.PointLightHelper(pointLight2); 
  //scene.add(helper2);

  const pointLight3 = new THREE.PointLight( 0xffffff, 0.3, 200); 
  pointLight3.position.set( 0, -20, -30 ); 
  const helper3 = new THREE.PointLightHelper(pointLight3); 
  //scene.add(helper3);

  pointLight.castShadow = true;
  pointLight2.castShadow = true;
  pointLight3.castShadow = true;

  
  scene.add( pointLight, pointLight2, pointLight3 );
  
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
    camera.position.set( 0, t*0.01, 0 );    
  }

  document.body.onscroll = moveCamera;
      
  // RABBIT EMBRYO
  const loaderRabbit = new OBJLoader();
  let rabbit;
  let sc = 1.2;
   
  // LOAD A RESOURCE
  loaderRabbit.load('3d/rabbit/Rabbit.obj',
    function ( object ) {
      object.position.set( -20, -5, -60 );
      object.rotation.set( 0, Math.PI/2, 0 ); 
      object.castShadow = true; 
      object.receiveShadow = true;      
      try{
      const matRabbit=new THREE.MeshPhysicalMaterial({
        color: 0xC1FF4D,
        roughness:0.0,
        metalness:0.5,                    
        })     
      
      object.children[0].material=matRabbit;
      }catch(e){
      console.log(e);
      }
      rabbit=object;     
      console.log( 'body was loaded', rabbit );                 
      rabbit.scale.set( sc, sc, sc );
     
      //RABBIT 2  ALGOREIGN    
      let rabbit2 = rabbit.clone();
      rabbit2.position.set( -12.5, -30, -30 );
      rabbit2.rotation.set( 0, 0, 0 );  
      rabbit2.scale.set( sc, sc, sc );
       
      scene.add( rabbit, rabbit2 );
      
      //RABBIT 3       
      let rabbit3 = rabbit.clone();
      rabbit3.position.set( 12.5, -20, -40  );
      rabbit3.rotation.set( 0, Math.PI/2, 0 ); 
      rabbit3.scale.set( sc, sc, sc );    
      scene.add( rabbit3 );

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
     
  // TUBO
  const gSfera = new THREE.CylinderGeometry( 30, 30, 120, 64, 64 );
  const sMaterial = new THREE.MeshPhysicalMaterial({    
    roughness:0.5,
    metalness:0.5,
    map: textureP3,    
    side: THREE.DoubleSide,
    bumpMap: bumpP3,
    bumpScale: 2,
    displacementMap: bumpP3,
    displacementScale: -2,                       
  })     

  let pianeta = new THREE.Mesh( gSfera, sMaterial );
  pianeta.position.set(0 , -15, -5 );  
  pianeta.rotation.set( -1, 0, 0 );

  pianeta.castShadow = true;
  pianeta.receiveShadow = true;

  scene.add(pianeta);
  
  // CUBE
  const gBox = new THREE.BoxGeometry( 5, 5, 5 );
  const box = new THREE.Mesh( gBox, sMaterial );
  scene.add( box );
  box.position.set( 7, -80, -90 );
  //Box.rotation.set( -1, -1, 0 );

  //ICOSAEDRO
  const gIcosaedro = new THREE.IcosahedronGeometry( 3, -100, 0 );
  const icosaedro = new THREE.Mesh(gIcosaedro, sMaterial);
  icosaedro.position.set( 14, 0, -90 );
  scene.add(icosaedro);

  //ICOSAEDRO
  const gOctadron = new THREE.OctahedronGeometry( 3, -120, 0 );
  const octadron = new THREE.Mesh(gOctadron, sMaterial);
  octadron.position.set( 21, 0, -90 );
  octadron.rotation.set(0,1,1);
  scene.add( octadron );
};