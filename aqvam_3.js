import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';

export default function(){

  
  window.resetCamera = resetCamera;

  // SCENE  
  const scene = new THREE.Scene();
  const gridHelper = new THREE.GridHelper( 100, 100 );
  scene.fog = new THREE.Fog( 0xffffff, 0.01, 600 );
  //scene.add( gridHelper );

  //CAMERA
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );

  //PLAYER
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };

  //RENDERER
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}); 


  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
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
  scene.background = new THREE.Color(  0xffffff  );  
  
  const clock = new THREE.Clock();
  
  // CAMERA
  camera.position.set( 0,100, 0 );
  //camera.rotation.z = Math.PI/2;
  camera.lookAt(new THREE.Vector3( 0, player.height, 0));
  //camera.setLens( 35 );
  camera.setFocalLength ( 35 );  

   // CONTROLS //////
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window );
  controls.minDistance =  0;    
  controls.maxDistance = 200;
  controls.maxPolarAngle = 1.5;

  let initialCameraPosition = new THREE.Vector3();
  initialCameraPosition.copy(camera.position);
  // Crea una funzione per resettare la camera
  function resetCamera() {
    camera.position.copy(initialCameraPosition);  
  } 

  // LIGHTS
  const ambiente = new THREE.AmbientLight ( 0xffffff, 0.5)
  scene.add( ambiente);

  const sun = new THREE.PointLight(0xffffff, 0.5, 1000);
  sun.position.set( 0, 40, 0);
  sun.castShadow = true;
  let sunHelper = new THREE.PointLightHelper(sun);
  scene.add(sun, /*sunHelper*/);

  const sun2 = new THREE.PointLight(0xffffff, 0.5, 1000);
  sun2.position.set( -40, 20, 0);
  sun2.castShadow = true;
  let sunHelper2 = new THREE.PointLightHelper(sun2);
  scene.add(sun2, /*sunHelper2*/);

  const sun3 = new THREE.PointLight(0xffffff, 0.5, 1000);
  sun3.position.set( 40, 20, 0);
  sun3.castShadow = true;
  let sunHelper3 = new THREE.PointLightHelper(sun3);
  scene.add(sun3, /*sunHelper3*/);

  const sun4 = new THREE.PointLight(0xffffff, 0.5, 1000);
  sun4.position.set( 0, -20, -40);
  sun4.castShadow = true;
  let sunHelper4 = new THREE.PointLightHelper(sun4);
  scene.add(sun4, /*sunHelper4*/);

  const sun5 = new THREE.PointLight(0xffffff, 0.5, 1000);
  sun5.position.set( 0, -20, 40);
  sun5.castShadow = true;
  let sunHelper5 = new THREE.PointLightHelper(sun5);
  scene.add(sun5, /*sunHelper5*/);

  // TEXTURES
  const loader = new THREE.TextureLoader();
  const bumper = loader.load('images/textures/hearts/scrostato.jpg'); 

  // RANDOM ARRAY COLORS
  const colorsArray = [
      // Giallo al Rosso
      "ffff00", "ffcc00", "ff9900", "ff6600", "ff3300",
      "ff0000", "ff3300", "ff6600", "ff9900", "ffcc00",
      "ffff00", "ffcc00", "ff9900", "ff6600", "ff3300",
      "ff0000", "ff3300", "ff6600", "ff9900", "ffcc00",
      // Rosso al Blu
      "ff0000", "cc0000", "990000", "660000", "330000",
      "0000ff", "330000", "660000", "990000", "cc0000",
      "ff0000", "cc0000", "990000", "660000", "330000",
      "0000ff", "330000", "660000", "990000", "cc0000",
      // Blu al Verde
      "0000ff", "0000cc", "000099", "000066", "000033",
      "00ff00", "000033", "000066", "000099", "0000cc",
      "0000ff", "0000cc", "000099", "000066", "000033",
      "00ff00", "000033", "000066", "000099", "0000cc",
      // Verde al Giallo
      "00ff00", "33ff00", "66ff00", "99ff00", "ccff00",
      "ffff00", "ccff00", "99ff00", "66ff00", "33ff00",
      "00ff00", "33ff00", "66ff00", "99ff00", "ccff00",
      "ffff00", "ccff00", "99ff00", "66ff00", "33ff00",
         // Giallo al Rosso
      "ffff00", "ffcc00", "ff9900", "ff6600", "ff3300",
      "ff0000", "ff3300", "ff6600", "ff9900", "ffcc00",
      "ffff00", "ffcc00", "ff9900", "ff6600", "ff3300",
      "ff0000", "ff3300", "ff6600", "ff9900", "ffcc00",
      // Rosso al Blu
      "ff0000", "cc0000", "990000", "660000", "330000",
      "0000ff", "330000", "660000", "990000", "cc0000",
      "ff0000", "cc0000", "990000", "660000", "330000",
      "0000ff", "330000", "660000", "990000", "cc0000",
      // Blu al Verde
      "0000ff", "0000cc", "000099", "000066", "000033",
      "00ff00", "000033", "000066", "000099", "0000cc",
      "0000ff", "0000cc", "000099", "000066", "000033",
      "00ff00", "000033", "000066", "000099", "0000cc",
      // Verde al Giallo
      "00ff00", "33ff00", "66ff00", "99ff00", "ccff00",
      "ffff00", "ccff00", "99ff00", "66ff00", "33ff00",
      "00ff00", "33ff00", "66ff00", "99ff00", "ccff00",
      "ffff00", "ccff00", "99ff00", "66ff00", "33ff00",
    ];

  // ANIMATE SCENE ///////////////
  function animateScene(){
    requestAnimationFrame( animateScene );
    controls.update(clock.getDelta());
    //stats.update();
    renderer.render( scene, camera );
  };

  animateScene();

  let alt = 10;
  
  // BACTERIUM GEOMETRIES/////////////////
  const gTentacleU = new THREE.CylinderGeometry( 0.1, 0.2,  alt, 3 );  
  const gTentacleD = new THREE.CylinderGeometry( 0.3, 0.4,  alt, 6 );
  const gTentacleC = new THREE.CylinderGeometry( 0.5, 0.8,  alt, 9 );
  const gTentacleM = new THREE.CylinderGeometry( 0.7, 1.2,  alt, 12 );
  const gTentacleDM = new THREE.CylinderGeometry( 0.9, 1.6,  alt, 15 );
  const gTentacleCM = new THREE.CylinderGeometry( 2, 2,  alt, 18 );

  const gBody = new THREE.SphereGeometry(15.9, 32, 5);
  const gBodyCylinder = new THREE.CylinderGeometry(10,10, 1, 64);

  const gCenterB = new THREE.SphereGeometry(0.01, 20, 20);
  const gCenterS = new THREE.SphereGeometry(0.01, 20, 20); 

  for(let i=0; i<150; i++){  

    // BACTERIUM MATERIAL ///////////// 
    // CENTER
    const mCenter = new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      roughness: 0,
      metalness: 0,
      transparent: true,
      opacity: 1,    
    });

    // MATERIAL
    const material = new THREE.MeshPhysicalMaterial({   
      roughness: 0,
      metalness: 0, 
      flatShading: true,   
    });
  
    const mBacterium = material.clone();
    mBacterium.color = new THREE.Color/*(0xf0ff0f)*/(("#"+ colorsArray[i]));
 
    const body = new THREE.Mesh( gBody, mBacterium );
    body.castShadow = true;
    body.receiveShadow = true;

    const TentacleU = new THREE.Mesh( gTentacleU, mCenter );
    TentacleU.castShadow = true;
    TentacleU.receiveShadow = true;

    const TentacleD = new THREE.Mesh( gTentacleD, mCenter );
    TentacleD.castShadow = true;
    TentacleD.receiveShadow = true;

    const TentacleC = new THREE.Mesh( gTentacleC, mCenter );
    TentacleC.castShadow = true;
    TentacleC.receiveShadow = true;

    const TentacleM = new THREE.Mesh( gTentacleM, mCenter );
    TentacleM.castShadow = true;
    TentacleM.receiveShadow = true;

    const TentacleDM = new THREE.Mesh( gTentacleDM, mCenter );
    TentacleDM.castShadow = true;
    TentacleDM.receiveShadow = true;

    const TentacleCM = new THREE.Mesh( gTentacleCM, mCenter );    
    TentacleCM.castShadow = true;
    TentacleCM.receiveShadow = true;

    let y10 = 10

    let yU = y10 + 10;
    let yD = y10 + 10;
    let yC = y10 + 10;
    let yM = y10 + 10;
    let yDM = y10 + 10;
    let yCM = y10 + 1;

    TentacleU.position.y = yU;
    TentacleD.position.y = yD;
    TentacleC.position.y = yC;
    TentacleM.position.y = yM;
    TentacleDM.position.y = yDM;
    TentacleCM.position.y = yCM;
    
    const centerBacteriumU = new THREE.Mesh(gCenterB, mCenter);
    const centerBacteriumD = new THREE.Mesh(gCenterB, mCenter);
    const centerBacteriumC = new THREE.Mesh(gCenterB, mCenter);
    const centerBacteriumM = new THREE.Mesh(gCenterB, mCenter);
    const centerBacteriumDM = new THREE.Mesh(gCenterB, mCenter);
    const centerBacteriumCM = new THREE.Mesh(gCenterB, mCenter);    

    centerBacteriumU.add( TentacleU );
    centerBacteriumD.add( TentacleD );
    centerBacteriumC.add( TentacleC );
    centerBacteriumM.add( TentacleM );
    centerBacteriumDM.add( TentacleDM );
    centerBacteriumCM.add( TentacleCM );

    centerBacteriumU.rotation.set( 0, 0, -1.2);
    centerBacteriumD.rotation.set( 0, 0, -0.8 );
    centerBacteriumC.rotation.set( 0, 0, -0.4 );
    centerBacteriumM.rotation.set( 0, 0, 0 );
    centerBacteriumDM.rotation.set( 0, 0, 0.4 );
    centerBacteriumCM.rotation.set( 0, 0, 0.8 ); 
    

    //scene.add(centerBacteriumU, centerBacteriumD, centerBacteriumC,centerBacteriumM, centerBacteriumDM,centerBacteriumCM);

    body.rotation.set( 0, Math.PI/2, Math.PI/2 );
    body.scale.set( 1, 0.5, 1,);    
    scene.add(body);

    const tentacoliS = new THREE.Group();
    tentacoliS.add(centerBacteriumU, centerBacteriumD, centerBacteriumC,centerBacteriumM, centerBacteriumDM,centerBacteriumCM);

    const tentacoliD = tentacoliS.clone();
    tentacoliD.rotation.set( 0, Math.PI, Math.PI );

    const batterio = new THREE.Group();
    batterio.add( body, /*tentacoliD,*/ tentacoliS );
    batterio.rotation.set( Math.PI/2 , Math.PI/3, -Math.PI/2 ); 
    batterio.scale.set(0.1,0.1,0.1);
    
    // QUI SI CALCOLA IL RAGGIO DEL
    batterio.position.set( 0, 0, 40);

    
    const centroScena = new THREE.Mesh(gCenterS, mCenter);
    scene.add(centroScena);    

    centroScena.add(batterio);

    centroScena.rotation.set( 0, i*0.04, Math.PI/2 );
    scene.add(centroScena);
  };

  //PLANE/////////
  const planeG = new THREE.BoxGeometry( 1000, 1000, 0.1, 100, 100 );
  const planeM = new THREE.MeshPhysicalMaterial({
    color: 0Xf5f5f5,    
    roughness: 0,
    metalness:0,
    //flatShading: true,
    //displacementMap: bumper,
    //displacementScale: 10,        

  });

  const newPlane = new THREE.Mesh( planeG, planeM );
  newPlane.position.set( 0,  -50, 0 );
  newPlane.rotation.x = Math.PI/2;
  newPlane.castShadow = true;
  newPlane.receiveShadow = true;
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