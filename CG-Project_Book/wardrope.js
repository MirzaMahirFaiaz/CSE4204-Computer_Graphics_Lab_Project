<!DOCTYPE html>
<html>
<head>    
    <meta charset="utf-8">
    <title>A Wardrobe [18.01.04.063, 18.01.04.072]</title>
    <style>
        body {
            margin: 0;
        }
    </style>
</head>

<body>
	<script src="threeJs/three.js"></script>
    <script id="fragmentShader" type="x-shader/x-fragment">      
        void main()	{          
            gl_FragColor = vec4(0.224, 0.126, 0.095, 1.0);
        }
    </script>
	
	<script id="fragmentShader2" type="x-shader/x-fragment">      
        void main()	{          
            gl_FragColor = vec4(0.31, 0.176, 0.129, 1.0);
        }
    </script>
	
	<script>	
		const canv = document.querySelector("#parent");
		const sizes = {
		  width: window.innerWidth,
		  height: window.innerHeight,
		};
		var camlok = {  height: 0.9,speed: 0.015 };
		//init function
		function init() {
		  scene = new THREE.Scene();
		  camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height,0.1,1000);
		  //texture loader
		  var texture_floor = new THREE.TextureLoader().load("textures/floor4.jpg");
		  var texture_wd = new THREE.TextureLoader().load("textures/Wardrove2.jpeg");
		  var texture_dr1 = new THREE.TextureLoader().load("textures/Drawer1.jpeg");
		  var texture_dr2 = new THREE.TextureLoader().load("textures/Drawer2.jpeg");
		  var texture_door = new THREE.TextureLoader().load("textures/Door.jpeg");

		  texture_floor.wrapS = THREE.RepeatWrapping;
		  texture_floor.wrapT = THREE.RepeatWrapping;
		  texture_floor.repeat.set(5, 5);
		  //Wardrobe
		  wardrobe = new THREE.Mesh(
			new THREE.BoxGeometry(2.7, 2, 0.20),
			new THREE.MeshPhongMaterial({
				color: 0xffffff,
				map: texture_wd
				})
		  );
		  scene.add(wardrobe);
		  wardrobe.position.set(0,1,0);
		  wardrobe.receiveShadow = true;
		  wardrobe.castShadow = true;
		  //Drawer 
			drawer1 = new THREE.Mesh(
				new THREE.BoxGeometry(1.7, 0.5, 0.15),
				new THREE.MeshBasicMaterial({
					color: 0xFFFFFF,
					map: texture_dr1
				})
			);
			scene.add(drawer1);
			drawer1.position.set(0.4,1.55,-0.035);
		   
			drawer2 = new THREE.Mesh(
				new THREE.BoxGeometry(1.7, 0.5, 0.15),
				new THREE.MeshBasicMaterial({
					color: 0xFFFFFF,
					map: texture_dr2
				})
			);
			scene.add(drawer2);
			drawer2.position.set(0.4,0.95,-0.035);

			drawer3 = new THREE.Mesh(
				new THREE.BoxGeometry(1.7, 0.5, 0.15),
				new THREE.MeshBasicMaterial({
					color: 0xFFFFFF,
					map: texture_dr2
				})
			);
			scene.add(drawer3);
			drawer3.position.set(0.4,0.35,-0.035);
			
			//Door
			door1 = new THREE.Mesh(
				new THREE.BoxGeometry(0.7, 1.69, 0.15),
				new THREE.MeshBasicMaterial({
					color: 0xFFFFFF,
					map: texture_door
				})
			);
			scene.add(door1);
			door1.position.set(-0.9,0.95,-0.035);

			//Bottom

			bot1 = new THREE.Mesh(
				new THREE.BoxGeometry(2.8, 0.1, 0.25),
				new THREE.ShaderMaterial({
					fragmentShader: document.getElementById('fragmentShader').textContent
			})
			);
			scene.add(bot1);
			bot1.position.set(0.005,0.04,-0.035);
			
			//Top

			top1 = new THREE.Mesh(
				new THREE.BoxGeometry(2.75, 0.05, 0.12),
				new THREE.ShaderMaterial({
					fragmentShader: document.getElementById('fragmentShader2').textContent
			})
			);
			scene.add(top1);
			top1.position.set(0.005,2.04,-0.035);

			//Floor
			floor = new THREE.Mesh(
				new THREE.PlaneGeometry(100, 100),
				new THREE.MeshPhongMaterial({
					color: "linen",
					wireframe: false,
					map: texture_floor
				})
			);
			floor.rotation.x -= Math.PI / 2;
			floor.receiveShadow = true;
			scene.add(floor);
			
		    //AmbientLight
		    ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
		    scene.add(ambientLight);
		    //pointLight
		    light = new THREE.PointLight(0xffffff, 1, 100);
		    light.position.set(-3, 6, -3);
		    light.castShadow = true;
		    light.shadow.camera.near = 0.5; 
		    light.shadow.camera.far = 10; 
		    light.shadowMapWidth = 1024; 
		    light.shadowMapHeight = 1024;
		    light.shadow.mapSize.width = 1024;
		    light.shadow.mapSize.height = 1024;

		    scene.add(light);
		    //camera
		    camera.position.set(0, camlok.height, -1.5);
		    camera.lookAt(new THREE.Vector3(0, camlok.height, 0));
		    //renderer
		    renderer = new THREE.WebGLRenderer({ antialias: true });
		    renderer.setSize(sizes.width, sizes.height);
		    renderer.setPixelRatio(window.devicePixelRatio);
		    renderer.shadowMap.enabled = true;
		    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		    renderer.setClearColor("skyblue");
		    document.body.appendChild(renderer.domElement);
		    renderer.physicallyCorrectLights = false;

		    resizeRendererToDisplaySize(renderer);
			
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		    animate();
		}

		function resizeRendererToDisplaySize(renderer) {
		  const canvas = renderer.domElement;
		  const width = canvas.clientWidth;
		  const height = canvas.clientHeight;
		  const needResize = canvas.width !== width || canvas.height !== height;
		  if (needResize)
			renderer.setSize(width, height, false);
		  return needResize;
		}

		var keyboard = {}, degree = 0, click = 0;
		function animate() {
			setTimeout( function() {requestAnimationFrame( animate );}, 1000/100 );
			//Up Arrow
			if (keyboard[38]) {
				camera.position.x -= Math.sin(camera.rotation.y) * camlok.speed;
				camera.position.z -= -Math.cos(camera.rotation.y) * camlok.speed;
			}
			//Down Arrow
			if (keyboard[40]) {
				camera.position.x += Math.sin(camera.rotation.y) * camlok.speed;
				camera.position.z += -Math.cos(camera.rotation.y) * camlok.speed;
			}
			//left Arrow
			if (keyboard[37]) {
				camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * camlok.speed;
				camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * camlok.speed;
			}
			//Right Arrow
			if (keyboard[39]) {
				camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * camlok.speed;
				camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * camlok.speed;
			}
			//Left turn(l)
			if (keyboard[76]) {
				camera.rotation.y -= Math.PI * 0.01;
			}
			//Right turn(r)
			if (keyboard[82]) {
				camera.rotation.y += Math.PI * 0.01;
			}
			//lightAnimation
			if (degree < 360) {
				degree += 0.5;
			} 
			else {
				degree = 0;
			}
			light.position.x = Math.sin(degree * Math.PI / 180) * 3;
			light.position.z = Math.cos(degree * Math.PI / 180) * 3;

			renderer.render(scene, camera);
		}

		function keyDown(event) {
		  keyboard[event.keyCode] = true;
		}

		function keyUp(event) {
		  keyboard[event.keyCode] = false;
		}

		function onClick(event) {			
			if (click < 6) 
				click += 1;
			else
				click = 1;
			//texture loader
			var texture_wd = new THREE.TextureLoader().load("textures/Wardrove2.jpeg");
			var texture_dr1 = new THREE.TextureLoader().load("textures/Drawer1.jpeg");
			var texture_dr2 = new THREE.TextureLoader().load("textures/Drawer2.jpeg");

			switch (click) {
				case 1:
					drawer = new THREE.Mesh(
						new THREE.BoxGeometry(1.7, 0.5, 0.15),
						new THREE.MeshBasicMaterial({
							color: 0xffffff,
							map: texture_dr1
						})
					);
					drawer.name="drawer";
					scene.add(drawer);
					drawer.position.set(0.4,1.55,-0.12);
					break;
				case 2:
					scene.remove(scene.getObjectByName('drawer'));
					break;
				case 3:
					drawer = new THREE.Mesh(
						new THREE.BoxGeometry(1.7, 0.5, 0.15),
						new THREE.MeshBasicMaterial({
							color: 0xffffff,
							map: texture_dr2
						})
					);
					drawer.name="drawer";
					scene.add(drawer);
					drawer.position.set(0.4,0.95,-0.12);
					break;
				case 4:
					scene.remove(scene.getObjectByName('drawer'));
					break;
				case 5:
					drawer = new THREE.Mesh(
						new THREE.BoxGeometry(1.7, 0.5, 0.15),
						new THREE.MeshBasicMaterial({
							color: 0xffffff,
							map: texture_dr2
						})
					);
					drawer.name="drawer";
					scene.add(drawer);
					drawer.position.set(0.4,0.35,-0.15);
					break;
				case 6:
					scene.remove(scene.getObjectByName('drawer'));
					break;
				default:
			}		
		}
	//eventListener
	window.addEventListener('keydown', keyDown);
	window.addEventListener('keyup', keyUp);
	window.addEventListener('click', onClick);
	window.onload = init;
</script>   
</body>
</html>