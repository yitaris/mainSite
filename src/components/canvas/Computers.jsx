import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
   useGLTF, useAnimations, Preload,
   ScrollControls, OrbitControls, useScroll,
   Scroll
  } from "@react-three/drei";
import CanvasLoader from "../Loader";
import gsap from "gsap";

const Computers = ({ isMobile, mouseX, mouseY}) => {
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
      const positionAmount = (mouseX - window.innerWidth / 2) * 0.001;
      const positionAmountY = (mouseY - window.innerHeight / 2) * 0.001;
      const scrollZ = scroll.offset * 100; 
      const newZPosition = -15 + scrollZ; 
      setModelZ(newZPosition);
      // Eğer Z pozisyonu 11'e ulaştıysa model kaybolacak (fade out)
      if (newZPosition >= 11) {
        gsap.to(newModelScene, { opacity: 0, duration: 1 });
      } else {
        gsap.to(newModelScene, { opacity: 1, duration: 1 });
      }

      if (!isMobile) {
        newModelScene.rotation.z = -positionAmount * 1;
        newModelScene.rotation.x = positionAmountY * 1;
        newModelScene.position.y = -positionAmountY * 10;
        newModelScene.position.x = positionAmount * 12;
      }
      scene.position.z = modelZ + 20; // Z-pozisyonunu scroll'a göre ayarlıyoruz
    }
  });

  return (
    <mesh>
      <hemisphereLight intensity={4} groundColor="white" />
      <spotLight
        position={[0, 20, 20]} // Daha yukarıya ve modele doğru
        angle={0.3}
        penumbra={1}
        intensity={2}
      />
      <pointLight intensity={0.5} position={[0, 0, 0]} />
      <primitive
        object={scene}
        scale={isMobile ? 8 : 10}
        position={isMobile ? [0, 0, modelZ + 15] : [-1.5, -1.5, modelZ]}
        rotation={[0, 0, 0]}
      />
      {/* İkinci model */}
      <primitive
        object={newModelScene}
        scale={isMobile ? 2 : 3}
        position={isMobile ? [0, -1, modelZ + 2] : [0, 0, modelZ]} // Z pozisyonunu dinamik hale getiriyoruz
        rotation={[0, 0, 0]}
        castShadow
        receiveShadow
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);
  const [wheelX, setWheelX] = useState(window.innerWidth / 2);
  const [wheelY, setWheelY] = useState(window.innerHeight / 2);

  const previousTouchY = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleTouchStart = (event) => {
      if (event.touches.length > 0) {
        previousTouchY.current = event.touches[0].clientY;
      }
    };

    window.addEventListener('touchstart', handleTouchStart);

    const handleTouchMove = (event) => {
    const touchY = event.touches[0].clientY;
    const deltaY = previousTouchY.current - touchY;
    previousTouchY.current = touchY;
  };
    window.addEventListener("touchmove", handleTouchMove);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    const handleScroll = (event) => {
      setWheelX(event.clientX);
      setWheelY(event.clientY);
    };

    window.addEventListener("wheel", handleScroll);

    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart" , handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false}/>
      <ScrollControls
        pages={2}
        damping={isMobile ? 0.25 : 0.25}
        infinite={false}
        horizontal={false}
        enabled={true} // Mobilde kaydırmayı etkinleştirin
      >
            <Computers 
              isMobile={isMobile}
              mouseX={mouseX} mouseY={mouseY}
              wheelX={wheelX} wheelY={wheelY}
            />
        </ScrollControls>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
