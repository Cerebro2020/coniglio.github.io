import * as THREE from 'three';
import {FirstPersonControls} from './three_class/FirstPersonControls.js';
import {FlyControls} from './three_class/FlyControls.js';
import { OBJLoader } from './three_class/OBJLoader.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';

export default function(){

  const clock = new THREE.Clock();
  window.resetCamera = resetCamera;

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

  // SCENE & FOG
  scene.background = new THREE.Color( 0x000000 );  
  //scene.fog = new THREE.Fog(0x000000, 10, 80);
  const gridHelper = new THREE.GridHelper( 200,50 );  
  //scene.add(gridHelper);
    
  // CAMERA
  camera.position.set( 0, 9, -115 ) ;
  camera.lookAt(new THREE.Vector3( 0, player.height, 10));
  camera.lookAt( 0, 60, 800); 
  camera.setFocalLength ( 35 );

  // CONTROLS

 const controls = new FirstPersonControls(camera, renderer.domElement);  
  controls.movementSpeed = 10;
  controls.lookSpeed = 0.01;
  controls.constrainVertical = true; 
  controls.verticalMin = 0.1; 
  controls.lookVertical = 0;

  // LIGHTS
  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 0.1 )
  scene.add( ambiente);

  let int = 1;
  let dist = 70;
  let decay = 0.2;
  let pointcolor = 0Xffffff;
  let yp = 15;

  //POINT
  const pointLight = new THREE.PointLight( pointcolor, int, dist, decay); 
  pointLight.position.set( 0, yp, -100 );
  const pointLight2 = new THREE.PointLight( pointcolor, int, dist, decay);    
  pointLight2.position.set( 0, yp, -30);
  const pointLight3 = new THREE.PointLight( pointcolor, int, dist, decay); 
  pointLight3.position.set( 0, yp, 40 );
  const pointLight4 = new THREE.PointLight( pointcolor, int, dist, decay); 
  pointLight4.position.set( 0, yp, 110 ); 

  const helper1 = new THREE.PointLightHelper(pointLight);
  const helper2 = new THREE.PointLightHelper(pointLight2);
  const helper3 = new THREE.PointLightHelper(pointLight3);
  const helper4 = new THREE.PointLightHelper(pointLight4);
  
  //scene.add( helper1, helper2,helper3, helper4);
  scene.add( pointLight, pointLight2,pointLight3,pointLight4 );

  let initialCameraPosition = new THREE.Vector3();
  initialCameraPosition.copy(camera.position);
  // Crea una funzione per resettare la camera
  function resetCamera() {
    camera.position.copy(initialCameraPosition);  
  } 

  //AUDIO
  // POETRY 1
  var listenerAlbero = new THREE.AudioListener();
  camera.add(listenerAlbero);  
  var soundAlbero = new THREE.Audio(listenerAlbero); 
  var loaderAlbero = new THREE.AudioLoader(); 

  loaderAlbero.load('audio/neutropoli/Albero.m4a', function(buffer) {
    soundAlbero.setBuffer(buffer);
    soundAlbero.setLoop(true);
    //sound.setVolume(0.5);
    soundAlbero.play();
  });

  // POETRY 2
  var listenerFotogramma = new THREE.AudioListener();
  camera.add(listenerFotogramma);  
  var soundFotogramma = new THREE.Audio(listenerAlbero); 
  var loaderFotogramma = new THREE.AudioLoader(); 
  
  loaderFotogramma.load('audio/neutropoli/Fotogramna.m4a', function(buffer) {
  soundFotogramma.setBuffer(buffer);
  soundFotogramma.setLoop(true);
  //sound.setVolume(0.5);
  soundFotogramma.play();
  });

  
 // BACKGROUND 
 const listenerBcg = new THREE.AudioListener();
 camera.add(listenerBcg);

 const audioLoader = new THREE.AudioLoader();

 const backgroundSound = new THREE.Audio( listenerBcg );
 audioLoader.load('audio/neutropoli/Milano metro bcg.mp3', function( buffer ) {
   backgroundSound.setBuffer( buffer );
   backgroundSound.setLoop( true );
   backgroundSound.setVolume( 0.1 );
   backgroundSound.play();
 });

 const listenerBcg2 = new THREE.AudioListener();
 camera.add(listenerBcg2);

 const audioLoader2 = new THREE.AudioLoader();

 const backgroundSound2 = new THREE.Audio( listenerBcg2 );
 audioLoader2.load('audio/neutropoli/Milano bcg.mp4', function( buffer ) {
   backgroundSound2.setBuffer( buffer );
   backgroundSound2.setLoop( true );
   backgroundSound2.setVolume( 0 );
   backgroundSound2.play();
 });

 // AUDIO DISTANCE  
  resetCamera();
    
  function animateScene(){
    requestAnimationFrame( animateScene );   
    controls.update(clock.getDelta());
    renderer.render( scene, camera );

    var distance = camera.position.distanceTo(cube.position); 
    var distance2 = camera.position.distanceTo(cube2.position);

    var volume = 1 - Math.min(distance / 24, 1); 
    var volume2 = 1 - Math.min(distance2 / 24, 1); 

    soundAlbero.setVolume(volume);
    soundFotogramma.setVolume(volume2)
  };
      
  // SUBWAY
  const loaderSubway = new OBJLoader();
  let subway;
   
  // LOAD A RESOURCE
  loaderSubway.load('3d/subway/Subway02.obj',
    function ( object ) {
      object.position.set( 7, 9, -50 );
      object.rotation.set( 0, -Math.PI/2, 0 );      
      try{
      const matSubway=new THREE.MeshPhysicalMaterial({
        color: 0X000000,
        roughness: 0.5,
        metalness: 0.9,                   
        })     
      
      object.children[0].material=matSubway;
      }catch(e){
      console.log(e);
      }
      subway=object;     
      console.log( 'body was loaded', subway );
      scene.add( subway );      
      subway.scale.set( 3, 3, 3);
      
      // SUBEAY 2       
      let subway2 = subway.clone();
      subway2.position.set( 7, 9, 86 );          
      scene.add( subway2 );
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

  // FEMALE    
  const loaderHousewife = new OBJLoader();
  let housewife;
     
  // LOAD A RESOURCE
  loaderHousewife.load('3d/humans/housewife.obj',
    function ( objHousewife ) {
      objHousewife.position.set( -5, -4, -50 );
      objHousewife.rotation.set( 0, Math.PI/2.2, 0 );      
      try{
        const matHousewife = new THREE.MeshPhysicalMaterial({
         color: 0xffffff,
          metalness: 0,
          roughness: 0,
          transparency: 1,  
          transparent: true,  
          side: THREE.FrontSide,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1                  
        })     
        
        objHousewife.children[0].material=matHousewife;
      }catch(e){
        console.log(e);
      }
      housewife=objHousewife;     
      console.log( 'body was loaded', housewife );
      scene.add( housewife );      
      housewife.scale.set( 0.22, 0.22, 0.22);
        
      // HOUSEWIFE 2       
      //let subway2 = subway.clone();
      //subway2.position.set( 7, 9, 86 );          
      //scene.add( subway2 );
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
  
  

  const gCube = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
  const mCube = new THREE.MeshPhysicalMaterial({
    color: 0Xff5555,
  });

  const cube = new THREE.Mesh(gCube, mCube);
  scene.add(cube);
  cube.position.set( -5, 11, -60 );
  cube.rotation.set( 0, 1, 1 );


  const cube2 = new THREE.Mesh(gCube, mCube);
  scene.add(cube2);
  cube2.position.set( 5, 8, -10 );
  cube2.rotation.set( 0, 1, 1 );

  

  animateScene();

};

