"use client";
import * as THREE from "three"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { BallCollider, Physics, RigidBody, CylinderCollider } from "@react-three/rapier"

THREE.ColorManagement.enabled = true
const baubleMaterial = new THREE.MeshLambertMaterial({ color: "#c0a0a0", emissive: "red" })
const greenaBaubleMaterial = new THREE.MeshLambertMaterial({ color: "#0055A4", emissive: "black" })
const redBaubleMaterial = new THREE.MeshLambertMaterial({ color: "#EF4135", emissive: 'black' })

const capMaterial = new THREE.MeshStandardMaterial({ metalness: 0.75, roughness: 0.15, color: "#8a492f", emissive: "#600000", envMapIntensity: 20 })
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)
const baubles = [...Array(13)].map(() => ({ scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)] }))
const littleBaubles = [...Array(5)].map(() => ({ scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)] }))


function Bauble({ vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread }) {
  const { nodes } = useGLTF("/models/cap.glb")
  const api = useRef()
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    api.current && api.current?.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiply({ x: -50 * delta * scale, y: -150 * delta * scale, z: -50 * delta * scale }),
    )
  })
  return (
    <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2} position={[r(20), r(20) - 25, r(20) - 10]} ref={api} colliders={false} dispose={null}>
      <BallCollider args={[scale]} />
      <CylinderCollider rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.2 * scale]} args={[0.15 * scale, 0.275 * scale]} />
      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry} material={baubleMaterial} />
      <mesh castShadow scale={2.5 * scale} position={[0, 0, -1.8 * scale]} geometry={nodes.Mesh_1.geometry} material={capMaterial} />
    </RigidBody>
  )
}

function GreenBauble({ vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, baubleColor='' }) {
    const { nodes } = useGLTF("/models/cap.glb")
    const api = useRef()
    useFrame((state, delta) => {
      delta = Math.min(0.1, delta)
      api.current && api.current?.applyImpulse(
        vec
          .copy(api.current.translation())
          .normalize()
          .multiply({ x: -50 * delta * scale, y: -150 * delta * scale, z: -50 * delta * scale }),
      )
    })
    const bubbleMaterial = baubleColor === 'red' ? redBaubleMaterial : greenaBaubleMaterial
    return (
      <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2} position={[r(20), r(20) - 25, r(20) - 10]} ref={api} colliders={false} dispose={null}>
        <BallCollider args={[scale]} />
        <CylinderCollider rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.2 * scale]} args={[0.15 * scale, 0.275 * scale]} />
        <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry} material={bubbleMaterial} />
        <mesh castShadow scale={2.5 * scale} position={[0, 0, -1.8 * scale]} geometry={nodes.Mesh_1.geometry} material={capMaterial} />
      </RigidBody>
    )
  }

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    vec.lerp({ x: (mouse.x * viewport.width) / 2, y: (mouse.y * viewport.height) / 2, z: 0 }, 0.2)
    ref.current?.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  )
}


export const SphereCollider = ({ paramProps }) => (
    <>
      <ambientLight intensity={1} />
      <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="black" castShadow shadow-mapSize={[512, 512]} />
      <directionalLight position={[0, 5, -4]} intensity={4} />
      {/* <directionalLight position={[0, -15, -0]} intensity={4} color="red" /> */}
      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {littleBaubles.map((props, i) => <Bauble key={i} {...props} />) /* prettier-ignore */}
        {baubles.map((props, i) => <GreenBauble key={i} {...props} />) /* prettier-ignore */}   
        {baubles.map((props, i) => <GreenBauble key={i} baubleColor={'red'} {...props} />) /* prettier-ignore */}        
      </Physics>
    </>
  )


useGLTF.preload('/models/cap.glb')