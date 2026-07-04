import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
const w = window.innerWidth;
const h = window.innerHeight;

//set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const stats = new Stats();
document.body.appendChild(stats.dom);
//set up Scene 
const scene = new THREE.Scene();

const fov = 75;
const aspect = w / h;
const far = 100;
const near = 0.1;
//set up Camera its z is -5
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(10, 8, 10);
camera.lookAt(0, 1.5, 0);

const roomWidth = 14;
const roomDepth = 8;
const roomHeight = 3;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;


controls.target.set(0, 1.5, 0);     // Look at room center
controls.minDistance = 5;            // Close-up limit
controls.maxDistance = 25;           // Far-away limit
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.autoRotate = false;
//controls.update();

//const geometry = new THREE.BoxGeometry(2,2,2);
//const material = new THREE.MeshStandardMaterial({color:'#8c5d75',wireframe:true});

//const mesh = new THREE.Mesh(geometry,material);


//mesh.position.set(0, 0, 0);

//const floor = new THREE.PlaneGeometry(width,height,widthsegment,heightsegment)

const loader = new THREE.TextureLoader();
const floor_texture = loader.load('floor_texture.jpg');
floor_texture.magFilter = THREE.LinearFilter;
floor_texture.minFilter = THREE.LinearMipmapLinearFilter;

// Repeat texture pattern (2x2 = repeats 4 times)
floor_texture.repeat.set(4, 4);
floor_texture.wrapS = THREE.RepeatWrapping;
floor_texture.wrapT = THREE.RepeatWrapping;


const floor_geo = new THREE.PlaneGeometry(14, 8);
const floor_material = new THREE.MeshStandardMaterial({ map: floor_texture, roughness: 0.8, metalness: 0.1, side: THREE.DoubleSide });
const floor_mesh = new THREE.Mesh(floor_geo, floor_material);
floor_mesh.rotation.x = -Math.PI / 2; // Rotate to lay flat

const front_wallgeo = new THREE.PlaneGeometry(14, 3);
const frontwall_material = new THREE.MeshStandardMaterial({ color: '#7F82BB', side: THREE.DoubleSide });
const frontwall_mesh = new THREE.Mesh(front_wallgeo, frontwall_material);
frontwall_mesh.position.set(0, 1.5, 4);



const back_wallgeo = new THREE.PlaneGeometry(14, 3);
const backwall_material = new THREE.MeshStandardMaterial({ color: '#7F82BB', side: THREE.DoubleSide });
const backwall_mesh = new THREE.Mesh(back_wallgeo, backwall_material);
backwall_mesh.position.set(0, 1.5, -4);
backwall_mesh.rotation.y = Math.PI;//180 degree;





const left_wallgeo = new THREE.PlaneGeometry(8, 3);
const leftwall_material = new THREE.MeshStandardMaterial({ color: '#7F82BB', side: THREE.DoubleSide });
const leftwall_mesh = new THREE.Mesh(left_wallgeo, leftwall_material);
leftwall_mesh.position.set(-7, 1.5, 0);
leftwall_mesh.rotation.y = Math.PI / 2;//90 degree;


const right_wallgeo = new THREE.PlaneGeometry(8, 3);
const rightwall_material = new THREE.MeshStandardMaterial({ color: '#7F82BB', side: THREE.DoubleSide });
const rightwall_mesh = new THREE.Mesh(right_wallgeo, rightwall_material);
rightwall_mesh.position.set(7, 1.5, 0);
rightwall_mesh.rotation.y = -Math.PI / 2;//90 degree;

const leftmiddle_texture = loader.load('wall_texture_2.jpg');
//leftmiddle_texture.magFilter=THREE.LinearFilter;
//leftmiddle_texture.minFilter =THREE.LinearMipmapLinearFilter;

// Better filter settings
leftmiddle_texture.magFilter = THREE.LinearFilter;
leftmiddle_texture.minFilter = THREE.LinearMipmapLinearFilter;
leftmiddle_texture.anisotropy = 16;  // Improves clarity at angles
leftmiddle_texture.encoding = THREE.sRGBColorSpace;  // Correct color space

// Disable wrapping
leftmiddle_texture.wrapS = THREE.ClampToEdgeWrapping;
leftmiddle_texture.wrapT = THREE.ClampToEdgeWrapping;


const leftmiddlewall_texture_leftside = loader.load('wall_texture_3 (2).jpg');
leftmiddlewall_texture_leftside.magFilter = THREE.LinearFilter;
leftmiddlewall_texture_leftside.minFilter = THREE.LinearMipmapLinearFilter;
leftmiddlewall_texture_leftside.anisotropy = 16;
leftmiddlewall_texture_leftside.encoding = THREE.sRGBColorSpace;

leftmiddlewall_texture_leftside.wrapS = THREE.RepeatWrapping;
leftmiddlewall_texture_leftside.wrapT = THREE.RepeatWrapping;




// Repeat texture pattern (2x2 = repeats 4 times)
//leftmiddle_texture.repeat.set(4, 4);
//leftmiddle_texture.wrapS = THREE.RepeatWrapping;
//leftmiddle_texture.wrapT = THREE.RepeatWrapping;
//back side of the  left middle wall 
const leftmiddle_wallgeo = new THREE.PlaneGeometry(7, 3);
//const leftmiddlewall_material =new THREE.MeshStandardMaterial({map:leftmiddle_texture , roughness:0.2,metalness:0.1,side:THREE.DoubleSide});

const leftmiddlewall_material_back = new THREE.MeshStandardMaterial({
    map: leftmiddle_texture,
    color: 0xFFFFFF,           // Pure white base color
    roughness: 0.2,            // Reduce from 0.2 for less matte
    metalness: 0,              // Keep at 0
    side: THREE.BackSide,

});

const leftmiddlewall_mesh_back = new THREE.Mesh(leftmiddle_wallgeo, leftmiddlewall_material_back);
leftmiddlewall_mesh_back.position.set(-2.5, 1.5, 0);
leftmiddlewall_mesh_back.rotation.y = Math.PI;//180 degree;

//back side of the  left middle wall 

const frontside_middle_left_wallmaterial = new THREE.MeshStandardMaterial({
    map: leftmiddlewall_texture_leftside,
    color: '#FFFFFF', // match your other wall color
    side: THREE.BackSide,
    roughness: 0.2,
    metalness: 0,
});
const leftmiddlewall_front = new THREE.Mesh(leftmiddle_wallgeo, frontside_middle_left_wallmaterial);
leftmiddlewall_front.position.set(-2.5, 1.5, -0.001);


//front side 
const rightmiddle_wallgeo = new THREE.PlaneGeometry(4.0, 3);
const rightmiddlewall_material_front = new THREE.MeshStandardMaterial({ color: '#7a4545', side: THREE.BackSide });
const rightmiddlewall_mesh_front = new THREE.Mesh(rightmiddle_wallgeo, rightmiddlewall_material_front);
rightmiddlewall_mesh_front.position.set(5.0, 1.5, 0);
rightmiddlewall_mesh_front.rotation.y = Math.PI;//180 degree;

//back side 

const rightmiddlewall_material_back = new THREE.MeshStandardMaterial({ color: '#45557a', side: THREE.BackSide });
const rightmiddlewall_mesh_back = new THREE.Mesh(rightmiddle_wallgeo, rightmiddlewall_material_back);
rightmiddlewall_mesh_back.position.set(5.0, 1.5, -0.001);





//left
const middlebottom_wallgeo = new THREE.PlaneGeometry(4, 3);
const middlebottomwall_material_left = new THREE.MeshStandardMaterial({ color: '#c0beb6', side: THREE.BackSide });
const middlebottomwall_mesh_left = new THREE.Mesh(middlebottom_wallgeo, middlebottomwall_material_left);
middlebottomwall_mesh_left.position.set(1, 1.5, 2);
middlebottomwall_mesh_left.rotation.y = Math.PI / 2;//90 degree;

//right
const middlebottomwall_material_right = new THREE.MeshStandardMaterial({ color: '#46294d', side: THREE.FrontSide });
const middlebottomwall_mesh_right = new THREE.Mesh(middlebottom_wallgeo, middlebottomwall_material_right);
middlebottomwall_mesh_right.position.set(1.001, 1.5, 2);
middlebottomwall_mesh_right.rotation.y = Math.PI / 2;//90 degree;



//right 
const topmiddle_wallgeo = new THREE.PlaneGeometry(4, 3);
const topmiddlewall_material_left = new THREE.MeshStandardMaterial({ color: '#F4F3EF', side: THREE.BackSide });
const topmiddlewall_mesh_left = new THREE.Mesh(topmiddle_wallgeo, topmiddlewall_material_left);
topmiddlewall_mesh_left.position.set(5, 1.5, -2);
topmiddlewall_mesh_left.rotation.y = Math.PI / 2;//90 degree;




//right 

const topmiddlewall_material_right = new THREE.MeshStandardMaterial({ color: '#7b553b', side: THREE.FrontSide });
const topmiddlewall_mesh_right = new THREE.Mesh(topmiddle_wallgeo, topmiddlewall_material_right);
topmiddlewall_mesh_right.position.set(5.001, 1.5, -2);
topmiddlewall_mesh_right.rotation.y = Math.PI / 2;//90 degree;





const ambientLight = new THREE.AmbientLight('#FFFFFF', 1.5);
const directionalLight = new THREE.DirectionalLight('#FFFFFF', 2.0);
directionalLight.position.set(10, 15, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);
const pointLight = new THREE.PointLight('#FFFFFF', 0.8);
pointLight.position.set(-10, 5, 5);
scene.add(pointLight);


//creating a table funtion  going to use group so multiple 
// premittive act as single object 

// a simple box geometry for table top 
//not using plane geometry because it represent 2D plane surface
//box geogetry is solid 3D volumn with depth



//build table top 
//width left-to-right size of tabletop
// top thickness is how thick the slab is top to bottom
//depth front to back size of tabletop

//const table_texture=loader.load('./table_texture2.jpg');
const table_texture = loader.load(
    'table_texture.jpg',
    () => console.log('Texture loaded'),
    undefined,
    (err) => console.error('Texture failed', err)
);
table_texture.magFilter = THREE.LinearFilter;
table_texture.minFilter = THREE.LinearMipmapLinearFilter;
table_texture.repeat.set(2, 2);
table_texture.wrapS = THREE.RepeatWrapping;
table_texture.wrapT = THREE.RepeatWrapping;







function createTable({
    width = 2.4,          // tabletop width (x-axis)
    depth = 1.2,          // tabletop depth (z-axis)
    height = 0.75,        // total table height (floor to top surface)
    topThickness = 0.08,  // thickness of the tabletop slab
    legThickness = 0.08,  // width/depth of each leg
    topColor = '#8B5A2B', // tabletop color
    legColor = '#5C3A21', // leg color
    x = 0,                // world position x
    y = 0,                // world position y (usually 0 = floor level)
    z = 0,                // world position z
    rotationY = 0,        // rotate the whole table around Y axis (radians)
} = {}) {
    const table = new THREE.Group();

    // --- Tabletop ---
    const topGeo = new THREE.BoxGeometry(width, topThickness, depth);
    const topMat = new THREE.MeshStandardMaterial({
        map: table_texture,
        color: '#ffffff8e',
        roughness: 0.6,
        metalness: 0.05,
    });
    const top = new THREE.Mesh(topGeo, topMat);
    // BoxGeometry is centered on its own origin, so offset by half
    // the thickness to make `height` represent the top SURFACE height.
    top.position.set(0, height - topThickness / 2, 0);
    top.castShadow = true;
    top.receiveShadow = true;
    table.add(top);

    // --- Legs ---
    const legHeight = height - topThickness;
    const legGeo = new THREE.BoxGeometry(legThickness, legHeight, legThickness);
    const legMat = new THREE.MeshStandardMaterial({
        color: legColor,
        roughness: 0.7,
        metalness: 0.05,
    });

    const insetX = width / 2 - 0.15;
    const insetZ = depth / 2 - 0.15;
    const legOffsets = [
        [insetX, insetZ],
        [-insetX, insetZ],
        [insetX, -insetZ],
        [-insetX, -insetZ],
    ];

    legOffsets.forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(lx, legHeight / 2, lz);
        leg.castShadow = true;
        leg.receiveShadow = true;
        table.add(leg);
    });

    table.position.set(x, y, z);
    table.rotation.y = rotationY;

    return table;
}







scene.add(ambientLight);
scene.add(floor_mesh);
scene.add(frontwall_mesh);
scene.add(backwall_mesh);
scene.add(leftwall_mesh);
scene.add(rightwall_mesh);
scene.add(leftmiddlewall_mesh_back);
scene.add(leftmiddlewall_front);
scene.add(middlebottomwall_mesh_right);
scene.add(topmiddlewall_mesh_left);
scene.add(rightmiddlewall_mesh_front);
scene.add(rightmiddlewall_mesh_back);
scene.add(middlebottomwall_mesh_left);
scene.add(topmiddlewall_mesh_right);

const table1 = createTable({ width: 5.0, depth: 2.0, x: -3.2, z: 2 });
scene.add(table1);

const table2 = createTable({
    width: 1.6,
    depth: 1.6,
    topColor: '#3b2a1a',
    legColor: '#241a10',
    x: -4.5,
    z: -2,
    rotationY: Math.PI / 4,
});
scene.add(table2);
function AnimateFrame(t = 0) {
    requestAnimationFrame(AnimateFrame);
    // mesh.rotation.y=t*0.001;
    renderer.render(scene, camera);
    stats.update();
    controls.update();
}

AnimateFrame();




