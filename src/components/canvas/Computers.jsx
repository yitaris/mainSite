import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Preload, ScrollControls, OrbitControls, useScroll } from "@react-three/drei";
import CanvasLoader from "../Loader";
import gsap from "gsap";

const Computers = ({ isMobile, mouseX, mouseY }) => {
  const { scene, animations } = useGLTF("./clouds/scene.gltf");
  const { actions } = useAnimations(animations, scene);
  const { scene: newModelScene, animations: newModelAnimations } = useGLTF("./plane/scene.gltf"); // İkinci model
  const { actions: newModelActions } = useAnimations(newModelAnimations, newModelScene);
  const scroll = useScroll(); // Scroll verisini alıyoruz
  const [modelZ, setModelZ] = useState(10); // birinci modelin Z pozisyonunu kontrol etmek için state

  useEffect(() => {
    if (actions) {
      actions[Object.keys(actions)[0]]?.reset().play();
    }
    if (newModelActions) {
      newModelActions[Object.keys(newModelActions)[0]]?.reset().play();
    }
  }, [actions, newModelActions]);

  useFrame(() => {
    if (scene && newModelScene) {
      const rotationAmount = (mouseX - window.innerWidth / 2) * 0.001;
      const rotationAmounty = (mouseY - window.innerHeight / 2) * 0.001;
      
      // Scroll verisini kullanarak ikinci modelin Z-pozisyonunu ayarlıyoruz
      const scrollZ = scroll.offset * 100; // Scroll ile Z-ekseni üzerindeki hareket miktarı
      const newZPosition = -15 + scrollZ; // Başlangıç pozisyonu -15, scroll arttıkça artacak
      setModelZ(newZPosition); // Z-ekseni pozisyonunu güncelle

      // Eğer Z pozisyonu 11'e ulaştıysa model kaybolacak (fade out)
      if (newZPosition >= 11) {
        gsap.to(newModelScene, { opacity: 0, duration: 1 });
      } else {
        gsap.to(newModelScene, { opacity: 1, duration: 1 });
      }

      newModelScene.rotation.z = -rotationAmount;
      newModelScene.rotation.x = rotationAmounty;
      newModelScene.position.y = -rotationAmounty * 15;
      newModelScene.position.x = rotationAmount * 15;
      scene.position.z = modelZ + 20; // Z-pozisyonunu scroll'a göre ayarlıyoruz
      console.log(modelZ)
    }
  });
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={0.5} position={[0, 0, 0]} />
      <primitive
        object={scene}
        scale={isMobile ? 2.75 : 10}
        position={isMobile ? [0, -3, -2.2] : [-1.5, -1.5, modelZ]}
        rotation={[0, 0, 0]}
      />
      {/* İkinci model */}
      <primitive
        object={newModelScene}
        scale={isMobile ? 0.75 : 3}
        position={isMobile ? [1, 1, 0] : [0, 0, modelZ]} // Z pozisyonunu dinamik hale getiriyoruz
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false}/>
         <ScrollControls pages={2} damping={0.25}>
           <Computers isMobile={isMobile} mouseX={mouseX} mouseY={mouseY} />
          </ScrollControls>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
