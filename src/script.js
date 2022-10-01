import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

/**
 * FORM
 */
const {form} = document.forms
const explodeBtn = document.getElementById('explode')
console.log(form)


explodeBtn.onclick = function() {
    explode(arrayObjects)
  };
function formValue(event){
    event.preventDefault()
    let X, Y, Z
    const {x,y,z} = form

    const values = {
    valueX: x.value,
    valueY: y.value,
    valueZ: z.value
    }

    X = Number(x.value)
    Y = Number(y.value)
    Z = Number(z.value)
    generate(X,Y,Z)
    console.log(values.valueX, values.valueY, values.valueZ)
}

form.addEventListener('submit', formValue)


/**
 * Texture
 */
 const textureLoader = new THREE.TextureLoader()

 const waterTexture = textureLoader.load('water.jpg')
 const groundTexture = textureLoader.load('ground.jpg')
 const fireTexture = textureLoader.load('fire.jpg')

/**
 * Texture Loader
 */




const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
 const geometryCylinder = new THREE.CylinderGeometry(0.2, 0.5, 1,10);
const geometrySphere = new THREE.SphereGeometry(1/2)
const geometryIcosahedron = new THREE.IcosahedronGeometry(0.5);
const geometryTetrahedron = new THREE.TetrahedronGeometry(0.5);


const geometries = [geometryCylinder, geometrySphere, geometryIcosahedron, geometryTetrahedron]

function randomGeometry(){
let random = Math.floor(Math.random()*geometries.length)

// console.log(random)
let obj = geometries[random]
// console.log(obj)

return geometries[random]
}
// console.log('--------')
// console.log(geometries.length)
// const randomMesh = async () => {

//     let random = Math.round(Math.random()*geometries.length)
//     return geometries[random]
  
//   };

// console.log(randomMesh())
const watermaterial = new THREE.MeshBasicMaterial({map: waterTexture})
const groundMaterial = new THREE.MeshBasicMaterial({map: groundTexture})
const fireMaterial = new THREE.MeshBasicMaterial({map: fireTexture})

const materials = [watermaterial, groundMaterial, fireMaterial]

function randomMaterial(){
    let random = Math.floor(Math.random()*materials.length)
    
    // console.log(random)
    let obj = materials[random]
    // console.log(obj)
    
    return materials[random]
    }
// const mesh = new THREE.Mesh(geometry, material)
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



const hemisphereLight = new THREE.HemisphereLight(0xffffff, 1)
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




 window.addEventListener('dblclick', ()=>{

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }else if(canvas.webkitFullscreenElement)
        {
            canvas.webkitFullscreenElement()
        }
    }else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})




/**
 * GSAP
 */
// generate(3,3,3)
// explode(arrayObjects)
function explode (arrayObjects){
    arrayObjects.forEach(obj => {
       

        gsap.to(obj.rotation, {
            duration: 0.5,
            delay: 0,
            ease: "power1.out",
            y: Math.cos(Math.PI/2),
            x: ((Math.random() < 0.5) ? -1 : 1)*Math.random()*20,
           
        }

        )
        
        gsap.to(obj.position, {
            duration: 2,
            delay: 0,
            ease: "expo.out",
            y: ((Math.random() < 0.5) ? -1 : 1)*Math.random()*10,
            x: ((Math.random() < 0.5) ? -1 : 1)*Math.random()*10,
            z: ((Math.random() < 0.5) ? -1 : 1)*Math.random()*10,
        }

        )
    
    })
}


// generate(4,3,2)
/**
 * Generation
 */
let arrayObjects = new Array();


function generate(x,y,z){
    const num = x*y*z
    let count = 0;
    
    console.log('x', x, 'y',y, 'z', z)
    if(arrayObjects){
        arrayObjects.forEach(obj => {
            scene.remove(obj)
        })
        arrayObjects.length = 0

    }

    for(let i = 0; i<num; i++){
        // let obj = new THREE.Mesh(geometry, material)

        let obj = new THREE.Mesh(randomGeometry(),randomMaterial())
        
        arrayObjects.push(obj)
    }
    console.log(arrayObjects)

   
let arrayX = new Array(x)
let arrayY = new Array(y)
let arrayZ = new Array(z)

console.log('arrayZ', arrayZ)
for(let i = 0; i < arrayX.length; i++){
    arrayX[i] = i 
}
for(let i = 0; i < arrayY.length; i++){
    arrayY[i] = i 
}
for(let i = 0; i < arrayZ.length; i++){
    arrayZ[i] = i 
}

    for(let x = 0; x < arrayX.length; x++){
        for(let y = 0; y < arrayY.length; y++){
            for(let z = 0; z < arrayZ.length; z++){
            
                // console.log(arrayObjects[obj].position.set(x,y,z))
                    arrayObjects[count].position.set(x,y,z)
                    // console.log(arrayObjects[count])
                    scene.add(arrayObjects[count])
                    count ++
              
                // console.log(arrayX[x],arrayY[y],arrayZ[z])
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
