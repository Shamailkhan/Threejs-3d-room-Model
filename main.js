import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";




const w = window.innerWidth;
const h =window.innerHeight;

//set up renderer
const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);

document.body.appendChild(renderer.domElement);

const stats=new Stats();
document.body.appendChild(stats.dom);
//set up Scene 
const scene = new THREE.Scene();

const fov=75;
const aspect= w/h;
const far =100;
const near =0.1;
//set up Camera its z is -5
const camera= new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.set(10, 8, 10);
camera.lookAt(0, 1.5, 0);

const roomWidth = 14;
const roomDepth = 8;
const roomHeight = 3;

const controls= new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.dampingFactor=0.03;


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
const floor_texture =loader.load('floor_texture.jpg');
floor_texture.magFilter=THREE.LinearFilter;
floor_texture.minFilter =THREE.LinearMipmapLinearFilter;

// Repeat texture pattern (2x2 = repeats 4 times)
floor_texture.repeat.set(4, 4);
floor_texture.wrapS = THREE.RepeatWrapping;
floor_texture.wrapT = THREE.RepeatWrapping;


const back_wall_texture=loader.load('texture4.jpg');

back_wall_texture.wrapS=THREE.ClampToEdgeWrapping;
back_wall_texture.wrapT=THREE.ClampToEdgeWrapping;

back_wall_texture.encoding=THREE.sRGBColorSpace;
back_wall_texture.anisotropy=16;
back_wall_texture.magFilter=THREE.LinearFilter;
back_wall_texture.minFilter=THREE.LinearMipMapLinearFilter;
back_wall_texture.repeat.x = -1;
back_wall_texture.offset.x = 1;


const floor_geo = new THREE.PlaneGeometry(14,8);
const floor_material =new THREE.MeshStandardMaterial({map:floor_texture , roughness:0.4,metalness:0.1 ,side:THREE.DoubleSide});
const floor_mesh= new THREE.Mesh(floor_geo,floor_material);
floor_mesh.rotation.x=-Math.PI / 2; // Rotate to lay flat



const front_wallgeo=new THREE.PlaneGeometry(14,3);
const frontwall_material =new THREE.MeshStandardMaterial({color:'#cdcbcb',side:THREE.DoubleSide});
const  frontwall_mesh =new THREE.Mesh(front_wallgeo,frontwall_material);
frontwall_mesh.position.set(0,1.5,4);



const back_wallgeo=new THREE.PlaneGeometry(12,3);
const backwall_material =new THREE.MeshStandardMaterial({map:back_wall_texture,roughness:0.2,metalness:0.1, color:'#ffffff',side:THREE.BackSide});
const  backwall_mesh =new THREE.Mesh(back_wallgeo,backwall_material);
backwall_mesh.position.set(-1.0,1.5,-4);
backwall_mesh.rotation.y=Math.PI;//180 degree;


const back_wall_rightgeo=new THREE.PlaneGeometry(2.0,3);
const backwall_right_material =new THREE.MeshStandardMaterial({ color:'#5c1b1b',side:THREE.DoubleSide});
const  backwall_right_mesh =new THREE.Mesh(back_wall_rightgeo,backwall_right_material);
backwall_right_mesh.position.set(6.0,1.5,-4);
backwall_right_mesh.rotation.y=Math.PI;//180 degree;

const backwall_back_geo= new THREE.PlaneGeometry(14,3);
const backwall_back_material =new THREE.MeshStandardMaterial({color:'#333333',side:THREE.FrontSide});
const  backwall_back_mesh =new THREE.Mesh(backwall_back_geo,backwall_back_material);
backwall_back_mesh.position.set(0,1.5,-4.1);
backwall_back_mesh.rotation.y=Math.PI;//180 degree;




const left_wallgeo=new THREE.PlaneGeometry(8,3);
const leftwall_material =new THREE.MeshStandardMaterial({color:'#7F82BB',side:THREE.DoubleSide});
const  leftwall_mesh =new THREE.Mesh(left_wallgeo,leftwall_material);
leftwall_mesh.position.set(-7,1.5,0);
leftwall_mesh.rotation.y=Math.PI/2;//90 degree;


const right_wallgeo=new THREE.PlaneGeometry(8,3);
const rightwall_material =new THREE.MeshStandardMaterial({color:'#7F82BB',side:THREE.DoubleSide});
const  rightwall_mesh =new THREE.Mesh(right_wallgeo,rightwall_material);
rightwall_mesh.position.set(7,1.5,0);
rightwall_mesh.rotation.y=-Math.PI/2;//90 degree;

const leftmiddle_texture=loader.load('wall_texture_2.jpg');
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


const leftmiddlewall_texture_leftside= loader.load('wall_texture_3 (2).jpg');
leftmiddlewall_texture_leftside.magFilter= THREE.LinearFilter;
leftmiddlewall_texture_leftside.minFilter= THREE.LinearMipmapLinearFilter;
leftmiddlewall_texture_leftside.anisotropy=16;
leftmiddlewall_texture_leftside.encoding=THREE.sRGBColorSpace;

leftmiddlewall_texture_leftside.wrapS=THREE.RepeatWrapping;
leftmiddlewall_texture_leftside.wrapT=THREE.RepeatWrapping;




// Repeat texture pattern (2x2 = repeats 4 times)
//leftmiddle_texture.repeat.set(4, 4);
//leftmiddle_texture.wrapS = THREE.RepeatWrapping;
//leftmiddle_texture.wrapT = THREE.RepeatWrapping;
//back side of the  left middle wall 
const leftmiddle_wallgeo=new THREE.PlaneGeometry(7,3);
//const leftmiddlewall_material =new THREE.MeshStandardMaterial({map:leftmiddle_texture , roughness:0.2,metalness:0.1,side:THREE.DoubleSide});

const leftmiddlewall_material_back = new THREE.MeshStandardMaterial({
  map: leftmiddle_texture,
  color: 0xFFFFFF,           // Pure white base color
  roughness: 0.2,            // Reduce from 0.2 for less matte
  metalness: 0,              // Keep at 0
  side: THREE.BackSide,
 
});

const leftmiddlewall_mesh_back =new THREE.Mesh(leftmiddle_wallgeo,leftmiddlewall_material_back);
leftmiddlewall_mesh_back.position.set(-2.5,1.5,0);
leftmiddlewall_mesh_back.rotation.y=Math.PI;//180 degree;

//back side of the  left middle wall 

const frontside_middle_left_wallmaterial = new THREE.MeshStandardMaterial({
  map:leftmiddlewall_texture_leftside,
  color: '#FFFFFF', // match your other wall color
  side: THREE.BackSide,
  roughness:0.2,
  metalness:0,
});
const leftmiddlewall_front = new THREE.Mesh(leftmiddle_wallgeo, frontside_middle_left_wallmaterial);
leftmiddlewall_front.position.set(-2.5, 1.5, -0.001);


//front side 
const rightmiddle_wallgeo=new THREE.PlaneGeometry(4.0,3);
const rightmiddlewall_material_front =new THREE.MeshStandardMaterial({color:'#7a4545',side:THREE.BackSide});
const rightmiddlewall_mesh_front =new THREE.Mesh(rightmiddle_wallgeo,rightmiddlewall_material_front);
rightmiddlewall_mesh_front.position.set(5.0,1.5,0);
rightmiddlewall_mesh_front.rotation.y=Math.PI;//180 degree;

//back side 

const rightmiddlewall_material_back =new THREE.MeshStandardMaterial({color:'#45557a',side:THREE.BackSide});
const rightmiddlewall_mesh_back =new THREE.Mesh(rightmiddle_wallgeo,rightmiddlewall_material_back);
rightmiddlewall_mesh_back.position.set(5.0,1.5,-0.001);





//left
const middlebottom_wallgeo=new THREE.PlaneGeometry(4,3);
const middlebottomwall_material_left =new THREE.MeshStandardMaterial({color:'#c0beb6',side:THREE.BackSide});
const  middlebottomwall_mesh_left =new THREE.Mesh(middlebottom_wallgeo,middlebottomwall_material_left);
middlebottomwall_mesh_left.position.set(1, 1.5, 2);
middlebottomwall_mesh_left.rotation.y=Math.PI/2;//90 degree;

//right
const middlebottomwall_material_right =new THREE.MeshStandardMaterial({color:'#46294d',side:THREE.FrontSide});
const  middlebottomwall_mesh_right =new THREE.Mesh(middlebottom_wallgeo,middlebottomwall_material_right);
middlebottomwall_mesh_right.position.set(1.001, 1.5, 2);
middlebottomwall_mesh_right.rotation.y=Math.PI/2;//90 degree;


const Top_middleWall_texture=loader.load('wall_panel.jpg');
Top_middleWall_texture.minFilter=THREE.LinearMipMapLinearFilter;
Top_middleWall_texture.magFilter=THREE.LinearFilter;

Top_middleWall_texture.wrapS=THREE.RepeatWrapping;
Top_middleWall_texture.wrapT=THREE.RepeatWrapping;

Top_middleWall_texture.encoding=THREE.sRGBColorSpace;
Top_middleWall_texture.anisotropy=16;

//new THREE.PointLight(color, intensity, distance, decay)
const Top_middle_Wall_pointLight =new THREE.PointLight("#FFFFFF",1.0,8,2);
Top_middle_Wall_pointLight.position.set(3.0,2.0,-2);
Top_middle_Wall_pointLight.castShadow=true;

//right 

const topmiddle_wallgeo=new THREE.PlaneGeometry(4,3);
const topmiddlewall_material_left =new THREE.MeshStandardMaterial({map:Top_middleWall_texture,roughness:0.2,metalness:0.1,color:'#FFFFFF',side:THREE.BackSide});
const  topmiddlewall_mesh_left =new THREE.Mesh(topmiddle_wallgeo,topmiddlewall_material_left);
topmiddlewall_mesh_left.position.set(5, 1.5, -2);
topmiddlewall_mesh_left.rotation.y=Math.PI/2;//90 degree;




//right 

const topmiddlewall_material_right =new THREE.MeshStandardMaterial({color:'#7b553b',side:THREE.FrontSide});
const  topmiddlewall_mesh_right =new THREE.Mesh(topmiddle_wallgeo,topmiddlewall_material_right);
topmiddlewall_mesh_right.position.set(5.001, 1.5, -2);
topmiddlewall_mesh_right.rotation.y=Math.PI/2;//90 degree;





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
table_texture.magFilter=THREE.LinearFilter;
table_texture.minFilter = THREE.LinearMipmapLinearFilter;
table_texture.repeat.set(2,2);
table_texture.wrapS=THREE.RepeatWrapping;
table_texture.wrapT=THREE.RepeatWrapping;







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
    map:table_texture,
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
    [ insetX,  insetZ],
    [-insetX,  insetZ],
    [ insetX, -insetZ],
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



const sofa_texture = loader.load('sofa_fabric_3.jpg');
sofa_texture.magFilter = THREE.LinearFilter;
sofa_texture.minFilter = THREE.LinearMipmapLinearFilter;
sofa_texture.wrapS = THREE.RepeatWrapping;
sofa_texture.wrapT = THREE.RepeatWrapping;
sofa_texture.repeat.set(2, 1);

function createSofa({
  width = 2.2,
  depth = 0.9,
  seatHeight = 0.45,
  backHeight = 0.55,
  armWidth = 0.2,
  color = '#7a6a58',
  x = 0,
  y = 0,
  z = 0,
  rotationY = 0,
} = {}) {
  const sofa = new THREE.Group();

  const sofaMat = new THREE.MeshStandardMaterial({
    map: sofa_texture,
    color: '#ffffff',
    roughness: 0.9,
    metalness: 0.0,
  });

  // Seat base
  const seatGeo = new THREE.BoxGeometry(width, seatHeight, depth);
  const seat = new THREE.Mesh(seatGeo, sofaMat);
  seat.position.set(0, seatHeight / 2, 0);
  seat.castShadow = true;
  seat.receiveShadow = true;
  sofa.add(seat);

  // Backrest
  const backGeo = new THREE.BoxGeometry(width, backHeight, 0.2);
  const back = new THREE.Mesh(backGeo, sofaMat);
  back.position.set(0, seatHeight + backHeight / 2, -depth / 2 + 0.1);
  back.castShadow = true;
  sofa.add(back);

  // Armrests
  const armGeo = new THREE.BoxGeometry(armWidth, seatHeight + 0.25, depth);
  [width / 2 - armWidth / 2, -width / 2 + armWidth / 2].forEach((ax) => {
    const arm = new THREE.Mesh(armGeo, sofaMat);
    arm.position.set(ax, (seatHeight + 0.25) / 2, 0);
    arm.castShadow = true;
    sofa.add(arm);
  });

  // Legs
  const legGeo = new THREE.BoxGeometry(0.06, 0.12, 0.06);
  const legMat = new THREE.MeshStandardMaterial({ color: '#2b1d14', roughness: 0.6 });
  const insetX = width / 2 - 0.15;
  const insetZ = depth / 2 - 0.1;
  [[insetX, insetZ], [-insetX, insetZ], [insetX, -insetZ], [-insetX, -insetZ]].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(lx, -0.06, lz);
    leg.castShadow = true;
    sofa.add(leg);
  });

  sofa.position.set(x, y, z);
  sofa.rotation.y = rotationY;
  return sofa;
}


// ---------- Chairs ----------
 
// Converts a chair's local offset (relative to a table's own center/orientation)
// into a world position + facing rotation, accounting for the table's rotationY.
function localOffsetToWorld(lx, lz, tableX, tableZ, tableRotY) {
  const wx = tableX + lx * Math.cos(tableRotY) + lz * Math.sin(tableRotY);
  const wz = tableZ - lx * Math.sin(tableRotY) + lz * Math.cos(tableRotY);
  // Chair's default "front" faces +z (0 rotation). Point it back toward the table center.
  const facingRotY = tableRotY + Math.atan2(-lx, -lz);
  return { x: wx, z: wz, rotationY: facingRotY };
}
 
// Builds an array of {lx, lz} local chair slots around a rectangular table.
// mode 'perimeter' -> one chair centered on each of the 4 sides.
// mode 'longsides' -> `perSide` chairs spaced along the two long (width) sides only.
function getChairSlots({ width, depth, offset = 0.5, mode = 'perimeter', perSide = 2 }) {
  const halfW = width / 2;
  const halfD = depth / 2;
  const slots = [];
 
  if (mode === 'perimeter') {
    slots.push({ lx: 0, lz: halfD + offset });    // front
    slots.push({ lx: 0, lz: -(halfD + offset) }); // back
    slots.push({ lx: halfW + offset, lz: 0 });    // right
    slots.push({ lx: -(halfW + offset), lz: 0 }); // left
  } else if (mode === 'longsides') {
    const usableWidth = width * 0.7;
    for (let i = 0; i < perSide; i++) {
      const t = perSide === 1 ? 0 : i / (perSide - 1) - 0.5; // -0.5..0.5
      const lx = t * usableWidth;
      slots.push({ lx, lz: halfD + offset });
      slots.push({ lx, lz: -(halfD + offset) });
    }
  }
 
  return slots;
}
 
function addChairsAroundTable({ table, chairFactory, slotOptions = {}, chairOptions = {} }) {
  const slots = getChairSlots({ width: table.width, depth: table.depth, ...slotOptions });
  const group = new THREE.Group();
 
  slots.forEach(({ lx, lz }) => {
    const { x, z, rotationY } = localOffsetToWorld(lx, lz, table.x, table.z, table.rotationY || 0);
    const chair = chairFactory({ ...chairOptions, x, y: table.y || 0, z, rotationY });
    group.add(chair);
  });
 
  return group;
}
// Office-style task chair with padded seat/back, a central pedestal column and a 5-star wheeled base.
function createOfficeChair({
  seatWidth = 0.5,
  seatDepth = 0.48,
  seatHeight = 0.48,
  backHeight = 0.55,
  color = '#2b2b2b',
  frameColor = '#1a1a1a',
  x = 0,
  y = 0,
  z = 0,
  rotationY = 0,
} = {}) {
  const chair = new THREE.Group();
 
  const padMat = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.1 });
  const frameMat = new THREE.MeshStandardMaterial({ color: frameColor, roughness: 0.4, metalness: 0.6 });
 
  // Seat cushion
  const seatGeo = new THREE.BoxGeometry(seatWidth, 0.08, seatDepth);
  const seat = new THREE.Mesh(seatGeo, padMat);
  seat.position.set(0, seatHeight, 0);
  seat.castShadow = true;
  seat.receiveShadow = true;
  chair.add(seat);
 
  // Backrest (slightly reclined)
  const backGeo = new THREE.BoxGeometry(seatWidth * 0.9, backHeight, 0.08);
  const back = new THREE.Mesh(backGeo, padMat);
  back.position.set(0, seatHeight + backHeight / 2, -seatDepth / 2 + 0.05);
  back.rotation.x = -0.12;
  back.castShadow = true;
  chair.add(back);
 
  // Armrests
  const armGeo = new THREE.BoxGeometry(0.05, 0.22, seatDepth * 0.6);
  [seatWidth / 2 - 0.02, -(seatWidth / 2 - 0.02)].forEach((ax) => {
    const arm = new THREE.Mesh(armGeo, frameMat);
    arm.position.set(ax, seatHeight + 0.15, 0);
    arm.castShadow = true;
    chair.add(arm);
  });
 
  // Central pedestal column
  const pedestalHeight = seatHeight - 0.08;
  const pedestalGeo = new THREE.CylinderGeometry(0.03, 0.03, pedestalHeight, 12);
  const pedestal = new THREE.Mesh(pedestalGeo, frameMat);
  pedestal.position.set(0, pedestalHeight / 2 + 0.05, 0);
  pedestal.castShadow = true;
  chair.add(pedestal);
 
  // 5-star wheeled base
  const starRadius = 0.28;
  const legCount = 5;
  const legGeo = new THREE.BoxGeometry(starRadius, 0.03, 0.05);
  const wheelGeo = new THREE.SphereGeometry(0.035, 8, 8);
  for (let i = 0; i < legCount; i++) {
    const angle = (i / legCount) * Math.PI * 2;
    const legArm = new THREE.Mesh(legGeo, frameMat);
    legArm.position.set(
      Math.cos(angle) * starRadius / 2,
      0.05,
      Math.sin(angle) * starRadius / 2
    );
    legArm.rotation.y = angle;
    legArm.castShadow = true;
    chair.add(legArm);
 
    const wheel = new THREE.Mesh(wheelGeo, frameMat);
    wheel.position.set(Math.cos(angle) * starRadius, 0.035, Math.sin(angle) * starRadius);
    wheel.castShadow = true;
    chair.add(wheel);
  }
 
  chair.position.set(x, y, z);
  chair.rotation.y = rotationY;
  return chair;
}


// Simple wood/fabric chair with a curved (bent) backrest, suited to smaller tables.
function createCurvedBackChair({
  seatWidth = 0.42,
  seatDepth = 0.42,
  seatHeight = 0.45,
  backHeight = 0.42,
  legThickness = 0.04,
  color = '#6b4c3a',
  x = 0,
  y = 0,
  z = 0,
  rotationY = 0,
} = {}) {
  const chair = new THREE.Group();
 
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.05 });
 
  // Seat
  const seatGeo = new THREE.BoxGeometry(seatWidth, 0.05, seatDepth);
  const seat = new THREE.Mesh(seatGeo, mat);
  seat.position.set(0, seatHeight, 0);
  seat.castShadow = true;
  seat.receiveShadow = true;
  chair.add(seat);
 
  // Curved backrest: an open partial cylinder shell that cups around the sitter's back.
  const backRadius = seatWidth / 2 + 0.05;
  const thetaLength = 2.3; // ~130 degrees of arc
  const thetaStart = Math.PI / 2 - thetaLength / 2;
  const backGeo = new THREE.CylinderGeometry(
    backRadius, backRadius, backHeight, 20, 1, true, thetaStart, thetaLength
  );
  const back = new THREE.Mesh(backGeo, mat);
  back.position.set(0, seatHeight + backHeight / 2, -(seatDepth / 2 + backRadius - 0.08));
  back.castShadow = true;
  chair.add(back);
 
  // Legs
  const legGeo = new THREE.BoxGeometry(legThickness, seatHeight, legThickness);
  const insetX = seatWidth / 2 - legThickness / 2 - 0.02;
  const insetZ = seatDepth / 2 - legThickness / 2 - 0.02;
  [[insetX, insetZ], [-insetX, insetZ], [insetX, -insetZ], [-insetX, -insetZ]].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(legGeo, mat);
    leg.position.set(lx, seatHeight / 2, lz);
    leg.castShadow = true;
    chair.add(leg);
  });
 
  chair.position.set(x, y, z);
  chair.rotation.y = rotationY;
  return chair;
}



const table1Chairs = addChairsAroundTable({
  table: { width: 5.0, depth: 2.0, x: -3.2, z: 2, rotationY: 0 },
  chairFactory: createOfficeChair,
  slotOptions: { mode: 'longsides', perSide: 3, offset: 0.4 },
  chairOptions: { color: '#3a3a3a' },
});
scene.add(table1Chairs);



const table2Chairs = addChairsAroundTable({
  table: { width: 1.6, depth: 1.6, x: -4.5, z: -2, rotationY: Math.PI / 4 },
  chairFactory: createCurvedBackChair,
  slotOptions: { mode: 'perimeter', offset: 0.35 },
  chairOptions: { color: '#6b4c3a' },
});
scene.add(table2Chairs);


scene.add(ambientLight); 
scene.add(floor_mesh);
scene.add(frontwall_mesh);
scene.add(backwall_mesh);
scene.add(backwall_right_mesh);
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
scene.add(backwall_back_mesh);
scene.add(Top_middle_Wall_pointLight);
const table1 = createTable({ width:5.0,depth:2.0 ,x: -3.2, z: 2 });
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

const sofa1=createSofa({width:3.5,x:1.5,z:-3});


scene.add(sofa1);


function AnimateFrame(t=0)
{
    requestAnimationFrame(AnimateFrame);
   // mesh.rotation.y=t*0.001;
    renderer.render(scene,camera);
    stats.update();
    controls.update();
}




AnimateFrame();




