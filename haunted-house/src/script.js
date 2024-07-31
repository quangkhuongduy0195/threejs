import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Sky } from 'three/addons/objects/Sky.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Axis helper
const axisHelper = new THREE.AxesHelper(100)
// scene.add(axisHelper)   

// Textures

const textureLoader = new THREE.TextureLoader()


// Foor
const floorAlphaTexture = textureLoader.load('./floor/alpha.webp')

const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorArmTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')


floorColorTexture.colorSpace = THREE.SRGBColorSpace
// floorArmTexture.colorSpace = THREE.sRGBColorSpace
// floorNormalTexture.colorSpace = THREE.sRGBColorSpace
// floorDisplacementTexture.colorSpace = THREE.sRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorArmTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorArmTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorArmTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping


// Walls Textures
const wallsColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
const wallsArmTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')
const wallsNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')

wallsColorTexture.colorSpace = THREE.SRGBColorSpace

wallsColorTexture.repeat.set(1, 1)
wallsArmTexture.repeat.set(1, 1)
wallsNormalTexture.repeat.set(1, 1)

wallsColorTexture.wrapS = THREE.RepeatWrapping
wallsArmTexture.wrapS = THREE.RepeatWrapping
wallsNormalTexture.wrapS = THREE.RepeatWrapping

wallsColorTexture.wrapT = THREE.RepeatWrapping
wallsArmTexture.wrapT = THREE.RepeatWrapping
wallsNormalTexture.wrapT = THREE.RepeatWrapping



// Roof textures
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofArmTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')


roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3, 2)
roofArmTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofArmTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping



// Door Textures
const doorAlphaTexture = textureLoader.load('./door/alpha.webp')
const doorColorTexture = textureLoader.load('./door/color.webp')
const doorNormalTexture = textureLoader.load('./door/normal.webp')
const doorHeightTexture = textureLoader.load('./door/height.webp')
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp')
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// Bushes Texture
const bushesColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
const bushesNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')
const bushesArmTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
bushesColorTexture.colorSpace = THREE.SRGBColorSpace

bushesColorTexture.repeat.set(2, 1)
bushesArmTexture.repeat.set(2, 1)
bushesNormalTexture.repeat.set(2, 1)

bushesColorTexture.wrapS = THREE.RepeatWrapping
bushesArmTexture.wrapS = THREE.RepeatWrapping
bushesNormalTexture.wrapS = THREE.RepeatWrapping


// Graves Texture
const gravesColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const gravesNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')
const gravesArmTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')

gravesColorTexture.colorSpace = THREE.SRGBColorSpace

gravesColorTexture.repeat.set(0.3, 0.4)
gravesArmTexture.repeat.set(0.3, 0.4)
gravesNormalTexture.repeat.set(0.3, 0.4)


/**
 * House
 */

const houseMeasurements = {
    width: 4,
    depth: 4,
    height: 2.5
}

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);
const floor = new THREE.Mesh(
    floorGeometry, 
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorArmTexture,
        roughnessMap: floorArmTexture,  
        metalnessMap: floorArmTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.2,
    })
)
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('Floor Displacement scale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('Floor Displacement Bias')


// Hourse container
const house = new THREE.Group()
// house.position.y = houseMeasurements.height / 2
scene.add(house)

// walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(houseMeasurements.width, houseMeasurements.height, houseMeasurements.depth),
    new THREE.MeshStandardMaterial({
        map: wallsColorTexture,
        aoMap: wallsArmTexture,
        roughnessMap: wallsArmTexture,  
        metalnessMap: wallsArmTexture,
        normalMap: wallsNormalTexture,
    })
)
walls.position.y = houseMeasurements.height / 2 
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofArmTexture,
        roughnessMap: roofArmTexture,  
        metalnessMap: roofArmTexture,
        normalMap: roofNormalTexture,
    })
)
roof.position.y = houseMeasurements.height + 1.5/2
roof.rotation.y = Math.PI/4
house.add(roof)


// door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: doorAlphaTexture,
        transparent: true,
        map: doorColorTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture,
        aoMap: doorAmbientOcclusionTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
    })
)
door.position.y = 1
door.position.z = 2.01
house.add(door)

// Bushes 
const bushesGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushesMaterial = new THREE.MeshStandardMaterial({
    map: bushesColorTexture,
    aoMap: bushesArmTexture,
    roughnessMap: bushesArmTexture,  
    metalnessMap: bushesArmTexture,
    normalMap: bushesNormalTexture,
})
const bushes1 = new THREE.Mesh(bushesGeometry, bushesMaterial)
bushes1.scale.set(0.5, 0.5, 0.5)
bushes1.position.set(0.8, 0.2, 2.2)
bushes1.rotation.x = -0.75

const bushes2 = new THREE.Mesh(bushesGeometry, bushesMaterial)
bushes2.scale.set(0.25, 0.25, 0.25)
bushes2.position.set(1.4, 0.1, 2.1)
bushes2.rotation.x = -0.75

const bushes3 = new THREE.Mesh(bushesGeometry, bushesMaterial)
bushes3.scale.set(0.4, 0.4, 0.4)
bushes3.position.set(-0.8, 0.1, 2.2)
bushes3.rotation.x = -0.75

const bushes4 = new THREE.Mesh(bushesGeometry, bushesMaterial)
bushes4.scale.set(0.15, 0.15, 0.15)
bushes4.position.set(-1, 0.05, 2.6)
bushes4.rotation.x = -0.75


house.add(bushes1, bushes2, bushes3, bushes4)  

//Graves

const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const gravesMaterial = new THREE.MeshStandardMaterial({
    map: gravesColorTexture,
    aoMap: gravesArmTexture,
    roughnessMap: gravesArmTexture,  
    metalnessMap: gravesArmTexture,
    normalMap: gravesNormalTexture,
})

const graves = new THREE.Mesh(gravesGeometry, gravesMaterial)
// graves.position.set(0, 0, 2.2)
// scene.add(graves)


for (let i = 0; i < 30; i++) {

    const angle = Math.random() * 2 * Math.PI
    
    const radius = Math.random() * 4 + 3
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const y =  Math.random() * 0.4

    const grave = new THREE.Mesh(gravesGeometry, gravesMaterial)
    grave.position.set(x, y, z)
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    graves.add(grave)
}
scene.add(graves)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)


// Door Light 
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
scene.add(doorLight)

// Ghost

const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)

scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Shadow
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap    

// Cast and receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true
roof.castShadow = true  
bushes1.castShadow = true
bushes2.castShadow = true
bushes3.castShadow = true
bushes4.castShadow = true
door.castShadow = true


walls.receiveShadow = true 
roof.receiveShadow = true
floor.receiveShadow = true
bushes1.receiveShadow = true
bushes2.receiveShadow = true
bushes3.receiveShadow = true
bushes4.receiveShadow = true
door.receiveShadow = true


for (const grave of graves.children) {
    grave.receiveShadow = true
    grave.castShadow = true
}


// Mapping

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20


ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

// Sky
const sky = new Sky()
sky.scale.setScalar(100)
scene.add(sky)


sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)


// Fog

// scene.fog = new THREE.Fog('#073540', 10, 13)
scene.fog = new THREE.FogExp2('#073540', 0.1)

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update ghosts
    const ghostAngle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghostAngle) * 4
    ghost1.position.z = Math.sin(ghostAngle) * 4
    ghost1.position.y = Math.sin(ghostAngle) * Math.sin(ghostAngle * 2.34) * Math.sin(ghostAngle * 3.45)


    const ghost2Angle = -elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.2
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()