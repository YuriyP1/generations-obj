import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


/**
 * Texture
 */

/**
 * Texture Loader
 */




const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)


const material = new THREE.MeshBasicMaterial({wireframe: true})
const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

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
camera.position.x = 10
camera.position.y = 10
camera.position.z = 10
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
 * Generation
 */

function generateObj(){

}

let arrayObjects = new Array();

generate(2,2,2)

function generate(x,y,z){
    const num = x*y*z
    let count = 0;
    
    for(let i = 0; i<num; i++){
        let obj = new THREE.Mesh(geometry, material)
        arrayObjects.push(obj)
    }
    console.log(arrayObjects)

let arrayX = new Array(x)
let arrayY = new Array(y)
let arrayZ = new Array(z)
for(let i = 0; i < arrayX.length; i++){
    arrayX[i] = i 
}
for(let i = 0; i < arrayY.length; i++){
    arrayY[i] = i 
}
for(let i = 0; i < arrayZ.length; i++){
    arrayZ[i] = i 
}
// let allArray = [arrayX, arrayY, arrayZ]

console.log(arrayX)
console.log(arrayY)
console.log(arrayZ)

    for(let x = 0; x < arrayX.length; x++){
        for(let y = 0; y < arrayY.length; y++){
            for(let z = 0; z < arrayZ.length; z++){
            
                // console.log(arrayObjects[obj].position.set(x,y,z))
                    arrayObjects[count].position.set(x,y,z)
                    scene.add(arrayObjects[count])
                    count ++
              
                console.log(arrayX[x],arrayY[y],arrayZ[z])
                // mesh.position.set(x,y,z)
                
            }
        }
    }
}


/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
