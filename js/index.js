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
  const textureP = loader.load ('./images/bcg/Sfondo.jpg'); 
  textureP.wrapS = THREE.RepeatWrapping;
  textureP.WrapT = THREE.RepeatWrapping;

  const textureP2 = loader.load ('./images/bcg/Sfondo2.jpg');
  const textureP3 = loader.load ('./images/bcg/SfondoS.jpg');
  const textureSpace = loader.load ('./images/equirectangulars/space.jpg');

// VIDEO  
// VIDEO 1
var video1 = document.createElement('video');
video1.src = "./video/cinematic/00_Lupin.mp4";
video1.style.display = 'none'; 
video1.loop = true; 
document.body.appendChild(video1);  

video1.load();
video1.play();

var vTexture1 = new THREE.VideoTexture(video1);
vTexture1.minFilter = THREE.LinearFilter;
vTexture1.magFilter = THREE.LinearFilter;
vTexture1.format = THREE.RGBAFormat;

// VIDEO 2
var video2 = document.createElement('video');
video2.src = "./video/cinematic/butterfly_spot.mp4";
video2.style.display = 'none'; 
video2.loop = true; 
document.body.appendChild(video2);  

video2.load();
video2.play();

var vTexture2 = new THREE.VideoTexture(video2);
vTexture2.minFilter = THREE.LinearFilter;
vTexture2.magFilter = THREE.LinearFilter;
vTexture2.format = THREE.RGBAFormat;


  // SCENE & FOG
  scene.background = new THREE.Color( 0xcc0082 );
  scene.background = new THREE.Color( 0x000000 );
  //scene.background = new THREE.Color( 0x00A2FF );

  const gridHelper = new THREE.GridHelper( 200,200 );
  //gridHelper.position.set(0, 20,0);
  
  //scene.add(gridHelper);

  //scene.fog = new THREE.Fog(0x000000, 0, 0);  
  // CAMERA
  camera.position.set( 0, 0, 0);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  // LIGHTS
  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 2 )
  scene.add( ambiente);
  //POINT
  const pointLight = new THREE.PointLight( 0xffffff, 1, 250); 
  pointLight.position.set(0,80,0);
  const pointLight2 = new THREE.PointLight( 0xffffff, 1, 250);    
  pointLight2.position.set(0,-80,1);
  const pointLight3 = new THREE.PointLight( 0xffffff, 0.1, 250); 
  pointLight3.position.set( 0, -40, 1 ); 
  //scene.add( pointLight, pointLight2, /*pointLight3*/ );

  const dLight = new THREE.DirectionalLight( 0xffffff, 2);
  dLight.position.set( 10, 0, -5);  
  const dLight2 = new THREE.DirectionalLight( 0xffffff, 2);
  dLight2.position.set( -10, 5, 0);
  /*scene.add( dLight, dLight2 );*/
  
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
      object.position.set( 15, 0.5, -50 );
      object.rotation.set( 0, -Math.PI/2, 0 );      
      try{
      const matRabbit=new THREE.MeshPhysicalMaterial({
        color: 0xC1FF4D,
        roughness:0.0,
        metalness:0.5,
        map: vTexture1,                                    
        })     
      
      object.children[0].material=matRabbit;
      }catch(e){
      console.log(e);
      }
      rabbit=object;     
      console.log( 'body was loaded', rabbit );
      scene.add( rabbit );      
      rabbit.scale.set( 2, 2, 2);

    
      //RABBIT PROJECTS       
      let rabbit2 = rabbit.clone();
      rabbit2.position.set( -7, -15.5, -35 );
      rabbit2.rotation.set( 0, 0, 0 );  
      rabbit2.scale.set(0.8,0.8,0.8);
       
      scene.add( rabbit2 );
      
      //RABBIT 3       
      let rabbit3 = rabbit.clone();
      rabbit3.position.set( -12, -30, -63 );
      rabbit3.scale.set(0.8,0.8,0.8);
      rabbit3.rotation.set( 0, -5, 0 );     
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
   
  //PIANETA 1
  const gPianeta = new THREE.SphereGeometry( 4.2, 32, 32 );
  const mPianeta = new THREE.MeshPhysicalMaterial({
    color: 0xac2ac2,
    roughness: 0,
    metalness: 0,
    map: vTexture2,     
  });

  const mPianeta2 = new THREE.MeshPhysicalMaterial({
      color: 0xac2ac2,
      roughness: 0,
      metalness: 0,
      map: vTexture2,     
    });  

  let pianeta = new THREE.Mesh( gPianeta, mPianeta2 );
  pianeta.position.set( 15 , -3.5, -50);
  let pianeta2 = pianeta.clone(); 
  pianeta2.position.set(-20 , -28, -78); 
  let pianeta3 = pianeta.clone(); 
  pianeta3.position.set(-10.5 , -2, -27); 
  
  scene.add(pianeta,/* pianeta2, pianeta3*/);

  //PROJECTS
  // CUBE
  const gBox = new THREE.BoxGeometry( 3, 3, 3 );
  const mBox = new THREE.MeshPhysicalMaterial({
    color: 0xC1FF4D,
        roughness:0.0,
        metalness:0.5,
        map: vTexture2,    
  });

  const Box = new THREE.Mesh( gBox, mBox );  
  Box.position.set( -3, -13.5,-36);
  Box.rotation.set( -1, -1, 0 );
  //scene.add( Box );
     

  // RESEARCHES ////
  const gSproject = new THREE.SphereGeometry( 10, 40, 40 ); 
    
  const mSproject = new THREE.MeshNormalMaterial({    
    side: THREE.DoubleSide,
    //map: textureP2,      
  });
  
  const Sproject = new THREE.Mesh( gSproject, /*mSproject*/mPianeta2 );
  Sproject.position.set( 21, -34, -70);    
  //scene.add( Sproject );

  const cloneSproject = Sproject.clone();
  Sproject.position.set( 40, -25, -140); 
  //scene.add( cloneSproject ); 

  const gBoxColored = new THREE.BoxGeometry( 5, 5, 5);
  const mBoxColored = new THREE.MeshPhysicalMaterial({
    color: 0x0055ff,      
    roughness: 0,
    metalness: 0,
    bumpMap: textureP3,      
  });
    
  let BoxColored = new THREE.Mesh( gBoxColored, mBoxColored );
  BoxColored.rotation.set( Math.PI/2, Math.PI/4, Math.PI/4 );
  BoxColored.position.set( -10, -24, -60 ); 
  //scene.add( BoxColored );
   
  // WITH ////
  let box2 = Box.clone();
  box2.position.set( -2, -50, -74);
  box2.rotation.z = -0.1;
  box2.rotation.y = 0.4;
  //scene.add( box2 );

  let contactSphere = Sproject.clone();
  contactSphere.position.set( -36, -49, -140); 
  //scene.add( contactSphere ); 

  // CONTACT ////
  let box3 = Box.clone();
  box3.position.set( 10, -49, -70);
  box3.rotation.set( 1, -0.1, -0.4); 
  box3.scale.set( 0.4, 0.4, 0.4 );    
  //scene.add( box3 );

  const gTana = new THREE.TorusGeometry(5, 1, 30, 64, 7, 10);
  const mTana = new THREE.MeshPhysicalMaterial({
    color: 0x4c9880,
    
        roughness:0.0,
        metalness:0.5,
        map: vTexture1, 
  })

  const tana = new THREE.Mesh(gTana, mTana);
  tana.position.set(0,-45,-80);
  tana.rotation.set(0, 2, 0);

  //scene.add(tana);

};