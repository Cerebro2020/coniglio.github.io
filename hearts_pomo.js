import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';
import { OBJLoader } from './three_class/OBJLoader.js';

export default function(choose,quadri){

  // SCENE  
  const scene = new THREE.Scene();

  // CAMERA //////
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
  camera.position.set( 0, 0, 200);  
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  /*camera.setFocalLength ( 70 );*/
  camera.setFocalLength ( 25 );

  // RENDERER
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});  

  // CONTROLS //////
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window ); 
  controls.minDistance =  10;    
  controls.maxDistance = 200;
  //controls.maxPolarAngle = 1.5;

  // RENDERER
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
    
  // RESIZE WINDOW //////
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  } );

  // SCENE & FOG //////
  scene.background = new THREE.Color(  0x000000 );  
  //scene.fog = new THREE.Fog( 0xffffff, 20, 200 );

  // LIGHTS //////
  //AMBIENT
  const ambient = new THREE.AmbientLight( 0xffffff, 1.5 );  
  scene.add( ambient);
  //HEMISPHERE    
  const eLight = new THREE.HemisphereLight( 0xffffff, 0x000000, 5 );
  eLight.castShadow = true;
  scene.add(eLight);
  //SPOTS
  const sLight = new THREE.SpotLight( 0xff0000, 0.8, 0, 6, 1, 10 );
  sLight.position.set( -50, 150, 0 );
  sLight.castShadow = true;
  scene.add( sLight ); 
  // SPOT HELPER
  const spotHelper = new THREE.SpotLightHelper( sLight );
  //scene.add(spotHelper );
  //POINTS 
  const pLight = new THREE.PointLight( 0xffffff, 10, 500 );
  pLight.castShadow = true;
  pLight.position.set( 0, 0, 0);
  const pHelper = new THREE.PointLightHelper(pLight);  
  scene.add( pLight, pHelper );
 

  // ANIMATE SCENE //////
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };

 // BACKGROUND SOUND 
 /*const listenerBcg = new THREE.AudioListener();
 camera.add(listenerBcg);

 const audioLoader = new THREE.AudioLoader();

 const backgroundSound = new THREE.Audio( listenerBcg );
 audioLoader.load('audio/hearts/gardenbcg.mp3', function( buffer ) {
   backgroundSound.setBuffer( buffer );
   backgroundSound.setLoop( true );
   backgroundSound.setVolume( 0.8 );
   backgroundSound.play();
  });*/

  animateScene();

  //TEXTURES
  const pelleLoader = new THREE.TextureLoader();
  const pelleTexture = pelleLoader.load('images/textures/hearts/pelle_3.jpg');
  pelleTexture.wrapS = THREE.RepeatWrapping;
  pelleTexture.wrapT = THREE.RepeatWrapping;
  pelleTexture.repeat.set( 2, 2 ); 

  const porosoLoader = new THREE.TextureLoader();
  const porosoTexture = pelleLoader.load('images/textures/hearts/porous_1.jpg');
  porosoTexture.wrapS = THREE.RepeatWrapping;
  porosoTexture.wrapT = THREE.RepeatWrapping;
  porosoTexture.repeat.set( 1, 1 ); 

  const acurvesLoader = new THREE.TextureLoader();
  const alphaCurves = acurvesLoader.load('images/alpha/Alpha_petal.jpg'); 
  //alphaCurves.wrapS = THREE.RepeatWrapping;
  //alphaCurves.wrapT = THREE.RepeatWrapping;
  //alphaCurves.repeat.set( 10, 10 ); 



    
  // GRUPPO EMOZIONI //////
  let emotionGroup = new THREE.Group();
  const emozioni=_.map(choose,(v,k)=>{

    const formeGeometriche = {
      'sfera': new THREE.SphereGeometry( 0.8, 25, 25 ),
      'piramide': new THREE.ConeGeometry( 1, 2, 4 ),      
      'cubo': new THREE.BoxGeometry( 1.2, 1.2, 1.2 ),
      'cilindro': new THREE.CylinderGeometry( 0.5, 0.5, 1, 6 ),
      'octaedro': new THREE.OctahedronGeometry( 1, 1 )
    };
 
    const nomiFormeGeometriche = ['cilindro','sfera', 'cubo','piramide'  ];
 
    const colori = [
      'DEC414', 'FEF600', 'FEBE00', 'FE8600', 'FE4900',
      'FE005B', 'FF0000', 'FB46FF', 'CB9AFF', '9AB5FF',
      '5C8291', '5F7883', '2B5E73', '1F3D49', '384145',
      'C4D58A', 'C8DB7B', 'ACC158', '8DA269', 'AFDF00'
    ];
   
    // Definisci i gruppi di colori
    const gruppiColori = [
      colori.slice(0, 5),  // Primi 5 colori
      colori.slice(5, 10), // Successivi 5 colori
      colori.slice(10, 15), // Successivi 5 colori
      colori.slice(15, 20)  // Ultimi 5 colori
    ];
    
    const coloreCorrente = new THREE.Color(v[1]).getHexString().toUpperCase();
 
    let forma;
 
    for (let i = 0; i < gruppiColori.length; i++) {
      console.log(`Checking group ${i}:`, gruppiColori[i]);
      console.log(`Current color:`, coloreCorrente);
      console.log(`Is color in group?`, gruppiColori[i].includes(coloreCorrente));
      if (gruppiColori[i].includes(coloreCorrente)) {
        forma = formeGeometriche[nomiFormeGeometriche[i]];         
        break; 
      }
    }

    if (!forma) {
      forma = formeGeometriche['octaedro'];
    }

    // EMOTION MATERIAL
    const emoMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(v[1]),
      roughness: 1,
      //*metalness: 0,     
    }); 
     
    //  EMOTION 1
    const emotion1 = new THREE.Mesh( forma, emoMaterial);  
    emotion1.position.set(-7.1, 13.5, -0.3 );
    emotion1.rotation.set( 0, 0, 0);
    emotion1.scale.set( 1.4, 1.4, 1.4 );           
    
    //  EMOTION 2
    let newMat = emoMaterial.clone()
    newMat.color = new THREE.Color(v[2] ? v[2] : v[1]);
    let forma2;
 
    for (let i = 0; i < gruppiColori.length; i++) {
      const coloreCorrente2 = newMat.color.getHexString().toUpperCase();
      if (gruppiColori[i].includes(coloreCorrente2)) {
        forma2 = formeGeometriche[nomiFormeGeometriche[i]];         
        break; 
      }
    }

    if (!forma2) {
      forma2 = formeGeometriche['octaedro'];
    }

    const emotion2 = new THREE.Mesh(forma2, newMat);  
    emotion2.position.set( -6.1, 12.5, -0.3 );
    emotion2.rotation.set( 0, 0, -Math.PI/3 );
    emotion2.scale.set( 1.2, 1.2, 1.2 );      
   
    // EMOTION 3 
    newMat = emoMaterial.clone();
    newMat.color = new THREE.Color(v[3] ? v[3] : v[1]);

    let forma3;
    for (let i = 0; i < gruppiColori.length; i++) {
      const coloreCorrente2 = newMat.color.getHexString().toUpperCase();
      if (gruppiColori[i].includes(coloreCorrente2)) {
        forma3 = formeGeometriche[nomiFormeGeometriche[i]];         
        break;
      }
    }
  
    if (!forma3) {
      forma2 = formeGeometriche['octaedro'];
    }

    const emotion3 = new THREE.Mesh(forma3, newMat);  
    emotion3.position.set( -7.7, 11.6, -0.3 );
    emotion3.rotation.set( 0, 0, Math.PI/1.5 );
    emotion3.scale.set( 1, 1, 1 );            
        
    const ret = emotionGroup.clone(true);
    ret.add(emotion1, emotion2, emotion3,/*centro*/);
    scene.add(ret);

    // CODICE PRECEDENTE PRIMA DI BING//
    ret.position.set( 2, k/3 + (0.2*Math.PI/Math.cos(k-+8)), 0); //+ 2 aumeta distanza tra sfere
    ret.rotation.set( 0, k/3, 0 );
    ret.scale.set( 1.2, 1.2, 1.2 );

    // EMOZIONI CLONATE
    const ret2 = ret.clone();
    ret2.position.set( -30, k/5 + (0.2*Math.PI/Math.cos(k+4)), 20 ); //+ 2 aumeta distanza tra sfere
    ret2.rotation.set( 0, k/-3, 0 );      
    scene.add(ret2); 
    
    // CLONE     
    const gcentro = new THREE.CylinderGeometry( 0.1, 0.1, 2, 25 );
    const mcentro = new THREE.MeshStandardMaterial({
      color: 0xac2598,
      roughness: 0,
      metalness: 0,
      transparent: true,  
      opacity: 0,    
    });
 
    let centro = new THREE.Mesh(gcentro, mcentro);
    centro.position.set( 0, 0, 0 );

    const emotionC1 = emotion1.clone();
     
    emotionC1.scale.set( 0.6, 0.6, 0.6 );
    emotionC1.position.set( -10, 0, 1.4 );  

    const emotionC2 = emotion2.clone();
    emotionC2.scale.set( 0.5, 0.5, 0.5 );
    emotionC2.rotation.set( 0, 0, 0 );
    emotionC2.position.set( -10, 0, 0.6 );

    const emotionC3 = emotion3.clone();
    emotionC3.scale.set( 0.4 ,0.4, 0.4);
    emotionC3.rotation.set( 0, 0, 0 );
    emotionC3.position.set( -10, 0, 0 );

    const retC = new THREE.Group();

    retC.add(emotionC1, emotionC2, emotionC3);   
          
    centro.add(retC);    

    retC.rotation.set( 0, k/-3.3, 0 );    
    retC.scale.set( 1, 1, 1 );
    retC.position.set( 40, k, -40 ); 

    scene.add(retC);

  })
  
  
  // TREE
  const loaderTree = new GLTFLoader();

  loaderTree.load(
    /*'3d/Tree/tree_06.glb'*/
    '3d/Tree/toon_tree.glb',
    function (gltf) {
      const tree = gltf.scene;
      tree.position.set(0, 0.4, 0);
      tree.rotation.set(0, Math.PI/-2, 0);
      //tree.scale.set(6, 4.5, 6);
      tree.scale.set(2, 2, 2);

      tree.traverse(function (node) {
        if (node.isMesh) {

          // Definisci il tuo materiale qui
          const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: gardenTexture2,
           
          });

          node.material = material;
          node.castShadow = true;
        }
      });

      scene.add(tree);
   
    },
    
    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
      console.error(error);      
    }

  );


  // RINO
  const loaderRino = new OBJLoader();
  let rino;
  
  // LOAD A RESOURCE
  loaderRino.load('3d/crisalide/crisalideOBJ.obj',
    function ( objectR ) {
        objectR.position.set( 52.5, 4.3, 17 );
        objectR.rotation.set( 0, 0, 0 );      
        try{
        const matRino = new THREE.MeshPhysicalMaterial({
          color: 0x0DABE9,
          roughness:0.0,
          metalness:0.5,          
          transparent: true,
          opacity: 0.3,
          

          })     
        
        objectR.children[0].material=matRino;
        }catch(e){
        console.log(e);
        }
        rino = objectR;     
        console.log( 'body was loaded', rino );
        
        //scene.add( rino );      
        
        rino.scale.set( 0.5, 0.5, 0.5 );        
        
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

  const gPomo = new THREE.SphereGeometry( 50, 150, 150 );
  const mPomo = new THREE.MeshPhysicalMaterial({
    color:0X555555,
    map: porosoTexture,
    envMap: porosoTexture, 
    roughnessMap: porosoTexture,
    displacementMap: porosoTexture,
    displacementScale: 20,
    alphaHash: true,
    alphaTest: 0.5,
    alphaMap: porosoTexture,


    roughness: 1,
    metalness: 0,

  }); 

  const pomo = new THREE.Mesh(gPomo, mPomo);
  pomo.castShadowShadow = true,
  pomo.receiveShadow = true;
  //scene.add(pomo);
  
};