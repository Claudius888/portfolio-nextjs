"use client";
import {
  CameraControls,
  Environment,
  Float,
  MeshReflectorMaterial,
  RenderTexture,
  Text,
  useFont,
} from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Color } from 'three';
// import { currentPageAtom } from './UI';
import { Laptop } from './Laptop';
import { useState } from 'react';
import { useSpring } from '@react-spring/core';
import { SphereCollider } from './SphereCollider';
import { degToRad, lerp } from 'three/src/math/MathUtils.js';

const bloomColor = new Color('#fff');
bloomColor.multiplyScalar(1.5);

export const Experience = () => {
  const controls = useRef();
  const meshFitCameraHome = useRef();
  const textMaterial = useRef();
  // const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  // useFrame((_, delta) => {
  //   textMaterial.current.opacity = lerp(
  //     textMaterial.current.opacity,
  //     currentPage === "home" || currentPage === "intro" ? 1 : 0,
  //     delta * 1.5
  //   );
  // });

  const [open, setOpen] = useState(false);
  // We turn this into a spring animation that interpolates between 0 and 1
  const props = useSpring({ open: Number(open) });

  const intro = async () => {
    controls.current.dolly(-23);
    controls.current.smoothTime = 1.6;
    controls.current.fitToBox(meshFitCameraHome.current, true);
    // "J:\kent\educative\educative-viewer"
  };
  // setTimeout(() => {
  //   setCurrentPage("home");
  // }, 1200);
  // fitCamera();

  // const fitCamera = async () => {
  //   if (currentPage === "store") {
  //     // controls.current.dolly(22);
  //     // controls.current.smoothTime = 1.6;
  //     // controls.current.fitToBox(meshFitCameraHome.current, false);
  //   } else {
  //     controls.current.smoothTime = 1.6;
  //     controls.current.fitToBox(meshFitCameraHome.current, true);
  //   }
  // };

  useEffect(() => {
    intro();
    const timer = setTimeout(() => {
      setOpen((state) => true);
    }, 1700);
    // props.open.to([0, 1], [1.575, -0.425])

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   fitCamera();
  //   window.addEventListener("resize", fitCamera);
  //   return () => window.removeEventListener("resize", fitCamera);
  // }, [currentPage]);

  return (
    <>
      <CameraControls ref={controls} />
      <mesh ref={meshFitCameraHome} position-z={1.5} visible={false}>
        <boxGeometry args={[7.5, 2, 2]} />
        <meshBasicMaterial color='orange' transparent opacity={0.5} />
      </mesh>
      <Text
        font={'fonts/Poppins-Black.ttf'}
        position-x={-1.3}
        position-y={-0.5}
        position-z={1}
        lineHeight={1}
        textAlign='center'
        rotation-y={degToRad(30)}
        anchorY={'bottom'}
      >
        Joshua {'\n'} SOFTWARE {'\n'} ENGINEER
        <meshBasicMaterial
          color={bloomColor}
          toneMapped={false}
          ref={textMaterial}
        >
          <RenderTexture attach={'map'}>
            <color attach='background' args={['#fff']} />
            <Environment preset='sunset' />
            <SphereCollider paramProps={{}}/>
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      <group rotation-y={degToRad(-20)} position-x={3}>
        {/* <Camping scale={0.6} html /> */}
        {/* <three.pointLight
          position={[10, 10, 10]}
          intensity={1.5}
          color={props.open.to([0, 1], ['#f0f0f0', '#d25578'])}
        /> */}

        <Laptop
          scale={0.3}
          open={open}
          hinge={props.open.to([0, 1], [1.575, -0.425])}
        />
        {/* <mesh ref={meshFitCameraStore} visible={false}>
          <boxGeometry args={[2, 1, 2]} />
          <meshBasicMaterial color="red" transparent opacity={0.5} />
        </mesh> */}
      </group>
      <mesh position-y={-0.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color='#333'
          metalness={0.5}
        />
      </mesh>
      <Environment preset='sunset' />
    </>
  );
};

useFont.preload('fonts/Poppins-Black.ttf');

{
  /* <color attach="background" args={["#fff"]} />
            <Environment preset="sunset" />
            <Float floatIntensity={4} rotationIntensity={5}>
              <Laptop
                scale={1.6}
                rotation-y={-degToRad(25)}
                rotation-x={degToRad(40)}
                position-y={-0.5}
              />
            </Float> */
}
