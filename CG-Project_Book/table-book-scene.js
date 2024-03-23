
// Import necessary Three.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 4;
  camera.position.y = 1;
  
  // Create a renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Create room
  const roomGeometry = new THREE.BoxGeometry(10, 5, 10);
  const wallTexture = new THREE.TextureLoader().load('texture/wall-texture.jpg');
  const floorTexture = new THREE.TextureLoader().load('texture/floor-texture.avif');
  
  const roomMaterials = [
      new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // Right face - red color
      new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // Left face - green color
      new THREE.MeshBasicMaterial({ color: 0xE8EAE5, side: THREE.BackSide }), // Top face - blue color
      new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.BackSide }), // Bottom face - yellow color
      new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // Front face - magenta color
      new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide })  // Back face - cyan color
  ];
  const room = new THREE.Mesh(roomGeometry, roomMaterials);
  room.position.set(0, 1, 0);
  scene.add(room);


  
  // Create table top
  const tableTopGeometry = new THREE.BoxGeometry(4, 0.2, 2);
  const tableTopTexture = new THREE.TextureLoader().load('texture/table-texture.jpg');
  const tableTopMaterial = new THREE.MeshBasicMaterial({ map: tableTopTexture });
  const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
  
  
  // Create table legs
  const legGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
  const legMaterial = new THREE.MeshBasicMaterial({ map: tableTopTexture });
  const leg1 = new THREE.Mesh(legGeometry, legMaterial);
  leg1.position.set(-1.8, -1, -0.8);
  
  
  const leg2 = leg1.clone();
  leg2.position.set(1.8, -1, -0.8);
  scene.add(leg2);
  
  const leg3 = leg1.clone();
  leg3.position.set(-1.8, -1, 0.8);
  scene.add(leg3);
  
  const leg4 = leg1.clone();
  leg4.position.set(1.8, -1, 0.8);
  scene.add(leg4);
  
  const group = new THREE.Group();
  group.add( tableTop, leg1, leg2, leg3, leg4 );




  
  //adding the book model
  const loader = new GLTFLoader();
  
  var book = null;
  loader.load( 'model/scene.gltf', function ( gltf ) {
      book = gltf.scene;
      var scale = 0.02;
      book.scale.set(scale, scale, scale);
      book.position.set(0.9, 0.1, 0);
      scene.add( book );

  
  }, undefined, function ( error ) {
  
      console.error( error );
  
  } );














        
  //book



// Create front cover
const frontCoverMaterial = new THREE.MeshBasicMaterial({
    map: mainBookFrontTexture,
    side: THREE.FrontSide,  // Render only the front side
});
const frontCoverGeometry = new THREE.BoxGeometry(1, 1.2, 0.1);

// Set the pivot point to the right side
frontCoverGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(1.5, 1.2, 0));

const frontCover = new THREE.Mesh(frontCoverGeometry, frontCoverMaterial);
scene.add(frontCover);

// Create back cover
const backCoverMaterial = new THREE.MeshBasicMaterial({
    map: mainBookBackTexture,
    side: THREE.BackSide,  // Render only the back side
});
const backCoverGeometry = new THREE.BoxGeometry(1, 1.2, 0.1);

// Set the pivot point to the right side
backCoverGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(1.5, 1.2, 0));

const backCover = new THREE.Mesh(backCoverGeometry, backCoverMaterial);
scene.add(backCover);

// Create book pages
const pageMaterial = new THREE.MeshBasicMaterial({ map: mainBookPageTexture, side: THREE.DoubleSide, transparent: true, opacity: 0 });
const pageGeometry = new THREE.BoxGeometry(1, 1.2, 0.1);

// Set the pivot point to the right side
pageGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(1.5, 1.2, 0));

const pages = new THREE.Mesh(pageGeometry, pageMaterial);
scene.add(pages);

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Handle mouse click
document.addEventListener('click', () => {
    toggleBook();
});

// Toggle book cover open/close
function toggleBook() {
    const targetOpacity = pages.material.opacity === 0 ? 1 : 0;

    // Animate the book pages opacity
    new TWEEN.Tween(pages.material)
        .to({ opacity: targetOpacity }, 1000)
        .start();

    // Animate the front cover rotation (rotate.y)
    new TWEEN.Tween(frontCover.rotation)
        .to({ y: targetOpacity === 1 ? -Math.PI : 0 }, 1000)  // Open: -Math.PI, Close: 0
        .start();
    
    // Animate the back cover rotation (rotate.y)
    
}









  
  
  // Create a light source
  const light = new THREE.PointLight(0xffffff, 60, 40);
  light.position.set(0, 2, 2);
  scene.add(light);
  scene.add(BookOpengroup);
  scene.add( group );

  var lightRadius = 3; // Distance from the book
  var lightAngle = 0; // Initial angle for the light position rotation






  
 

var keyboard = {}, degree =0;
// Animation loop
function animate() {
    requestAnimationFrame(animate);
    //scene.rotation.y += 0.01;

    
    // Update camera position based on keyboard input
    if (keyboard[37]) { // LEFT arrow key
        camera.position.x -= 0.1;
    }
    if (keyboard[39]) { // RIGHT arrow key
        camera.position.x += 0.1;
    }
    if (keyboard[38]) { // UP arrow key
        camera.position.z -= 0.1;
    }
    if (keyboard[40]) { // DOWN arrow key
        camera.position.z += 0.1;
    }
    
   // camera.lookAt(book.position); // Make camera always look at the book

    // Update light position to rotate around the book
    lightAngle += 0.01; // Adjust rotation speed as needed
    light.position.x = Math.cos(lightAngle) * lightRadius + book.position.x;
    light.position.z = Math.sin(lightAngle) * lightRadius + book.position.z;


    renderer.render(scene, camera);
}

document.addEventListener('keydown', function (event) {
    keyboard[event.keyCode] = true;
});

document.addEventListener('keyup', function (event) {
    keyboard[event.keyCode] = false;
});


animate();



