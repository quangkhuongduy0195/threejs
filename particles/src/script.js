import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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


/**
 * Axis helper  
 */
const axisHelper = new THREE.AxesHelper(100)
// scene.add(axisHelper)


/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load('./textures/particles/10.png')
const particlesTexture2 = textureLoader.load('./textures/particles/5.png')
/**
 * Particles
 */

// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 50000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)
for (let i = 0; i < count; i++) {
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true
// particlesMaterial.color = new THREE.Color(0xff88cc)
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particlesTexture
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending
particlesMaterial.vertexColors = true


// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/// Particles 2

const particlesGeometry2 = new THREE.BufferGeometry()
const count2 = 500

const positions2 = new Float32Array(count2 * 3)
const colors2 = new Float32Array(count2 * 3)
for (let i = 0; i < count2; i++) {
    positions2[i] = (Math.random() - 0.5) * 10
    colors2[i] = Math.random()
}
particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3))
particlesGeometry2.setAttribute('color', new THREE.BufferAttribute(colors2, 3))

// Material
const particlesMaterial2 = new THREE.PointsMaterial()
particlesMaterial2.size = 0.1
particlesMaterial2.sizeAttenuation = true
// particlesMaterial2.color = new THREE.Color(0xff88cc)
particlesMaterial2.transparent = true
particlesMaterial2.alphaMap = particlesTexture2
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial2.depthWrite = false
particlesMaterial2.blending = THREE.AdditiveBlending
particlesMaterial2.vertexColors = true

// Points
const particles2 = new THREE.Points(particlesGeometry2, particlesMaterial2)
scene.add(particles2)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.z = 3
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // particles.rotation.y = elapsedTime * 0.2
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }
    particlesGeometry.attributes.position.needsUpdate = true
    particlesGeometry2.attributes.position.needsUpdate = true
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()