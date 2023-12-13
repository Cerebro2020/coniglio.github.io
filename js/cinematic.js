import * as THREE from 'three';

import { FirstPersonControls } from './three_class/FirstPersonControls.js';
import { FlakesTexture } from './three_class/FlakesTexture.js';
//import { RGBELoader } from './three_class/RGBELoader.js';
//import { BooleanKeyframeTrack } from './three_class/three.module.js';

export default function(choose){

    //SCENE
    const scene = new THREE.Scene();

    //CAMERA  
    const camera = new THREE.PerspectiveCamera( 35 , window.innerWidth / window.innerHeight, 0.1, 1000 );
    let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
    
    //RENDERER
    const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}) ;
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    //TEXTURE    
    const loader = new THREE.TextureLoader();
    const height2 = loader.load('static/images/texture2.jpg');
    const textureT = new THREE.CanvasTexture(new FlakesTexture());
    const tFloor = loader.load('static/images/TextureF.jpg');
    textureT.wrapS = THREE.RepeatWrapping;
    textureT.wrapT = THREE.RepeatWrapping;
    textureT.repeat.x = 10;
    textureT.repeat.y = 6;
    let textureGrey = loader.load('static/images/textureT.jpg');
    
    const alphaF = loader.load('static/images/texture5.jpg');
    const alphaPL = loader.load('static/images/PetalL.jpg');
    const alphaPR = loader.load('static/images/PetalR.jpg');

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
    //scene.fog = new THREE.FogExp2( 0x000000, 0.003 ); 
    const clock = new THREE.Clock();

    // CAMERA
    camera.position.set( 0, 9, -140);
    camera.lookAt(new THREE.Vector3( 0, player.height, 0));
    //camera.setLens( 15 );
    camera.setFocalLength ( 35 );

    // CONTROLS
    const controls = new FirstPersonControls( camera, renderer.domElement );
    controls.lookAt(new THREE.Vector3( 0, 18, 40));
    /*controls.target = new THREE.Vector3( 0, 15, 100 );*/
    controls.movementSpeed = 10;
    controls.lookSpeed = 0.03;
    controls.constrainVertical = true; 
    controls.verticalMin = 0.1; 
    controls.lookVertical = 0;    
    
    // AMBIENT LIGHT
    const light = new THREE.AmbientLight( 0xffffff, 1 ); 
    scene.add( light );

    //POINT LIGHT
    const lightP = new THREE.PointLight( 0xcccccc, 1, 300 );
    lightP.position.set( 5, 20, -4 );
    //scene.add( lightP );

    //LIGHT
    let firstLight = new THREE.DirectionalLight( 0xffffff, 2, 100 );
    firstLight.position.set( 0, 20, -10 ).normalize();
    firstLight.castShadow = true; // default false
    firstLight.shadow.mapSize.width = 512; // default
    firstLight.shadow.mapSize.height = 512; // default
    firstLight.shadow.camera.near = 0.5; // default
    firstLight.shadow.camera.far = 500; // default
    /*scene.add( firstLight );*/

    // ANIMATE SCENE
    function animateScene(){
        requestAnimationFrame( animateScene );
        //scene.rotation.y += 0.001 ;
        controls.update(clock.getDelta());    
        renderer.render( scene, camera );        
    }
    animateScene();
    let videoB, vTexture1;
    let videoG, vTexture2;
    let videoSnake, snakeTexture;
    let videoLupin, lupinTexture;

    videoB = document.getElementById( 'butterfly' );
    videoB.play();

    videoG = document.getElementById( 'genomachines' );    
    videoG.play();

    videoSnake = document.getElementById( 'snake');
    videoSnake.play();

    videoLupin = document.getElementById( 'lupin');
    videoLupin.play();

    vTexture1 = new THREE.VideoTexture(videoB);
    vTexture2 = new THREE.VideoTexture(videoG);
    snakeTexture = new THREE.VideoTexture( videoSnake );
    lupinTexture = new THREE.VideoTexture(videoLupin);

    //REYCASTER
    

    // FLOOR
    let floor;
    floor = new THREE.Mesh(
        new THREE.PlaneGeometry( 400, 400, 500, 500 ),
        new THREE.MeshPhongMaterial({
        color: 'grey',  
        /*map: vTexture1,
        map: lupinTexture,*/
        side: THREE.DoubleSide,        
         //map: tFloor,
         //aoMap: alphaF,
         //aoMapIntensity: 0.5,
        bumpMap: alphaF, 
        displacementMap: height2,
        displacementScale: -10,        
        shininess: 100,
        })
    );
    floor.castShadow = true;
     floor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
     floor.position.set(0, 0, 0);
     scene.add( floor );

    //SPHERE
    /*const gSphere = new THREE.SphereGeometry( 10, 32, 32 );
    const mSphere = new THREE.MeshPhysicalMaterial( {         
        color: 'white',        
        map: snakeTexture,
        roughness: 0.01,
        clearcoat: 0.5,
        metalness: 0.5,                  
    } );
    
    const sphere = new THREE.Mesh(gSphere, mSphere);
    sphere.rotation.set( 0, 0, 0 );
    sphere.position.set( 0, 0, -80 );
   
    const sphere2 = sphere.clone();
    sphere2.position.set(0 , 4.5, -20 );
  
    const sphere3 = sphere.clone();
    sphere3.position.set(0 , 9, 40 );   

    scene.add( sphere, sphere2, sphere3 );*/

    //SCHERMO
    

    const gschermo = new THREE.BoxGeometry( 32, 18, 0.4 );

    function creaSchermo(texture, posX, posY, posZ) {
        const mSchermo = new THREE.MeshPhysicalMaterial({         
            color: 'white',
            map: texture,        
        });
        
        const schermo = new THREE.Mesh( gschermo, mSchermo);
        schermo.position.set( posX, posY, -60 );
    
        const puntoScreen = new THREE.PointLight(0Xffffff, 1, 40);    
        puntoScreen.position.set( posX, posY + 15, -64);
        puntoScreen.rotation.z = Math.PI/2;
    
        let screen = new THREE.Group();
        screen.add(schermo, puntoScreen);
        screen.position.set(0, 0, posZ);  
        scene.add(screen);
    }
    
    /*creaSchermo( vTexture1, 30, 9, -20 );
    creaSchermo( vTexture2, -30, 9, 20 );
    creaSchermo( snakeTexture, 30, 9, 40 );*/
    
    //AUDIO    
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const audioLoader = new THREE.AudioLoader();
    const backgroundSound = new THREE.Audio( listener );
    audioLoader.load('audio/436557__k2tr__major-drone02.wav', function( buffer ) {
        backgroundSound.setBuffer( buffer );
        backgroundSound.setLoop( true );
        backgroundSound.setVolume( 0.4 );
        backgroundSound.play();
    });
};
