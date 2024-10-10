import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF, useAnimations, Preload,
  ScrollControls, useScroll, Scroll,
  Text,
} from "@react-three/drei";
import CanvasLoader from "../Loader";
import gsap from "gsap";

const Computers = ({ isMobile, mouseX, mouseY,windowWidth }) => {
  const { scene, animations } = useGLTF("./clouds/scene.gltf");
  const { actions } = useAnimations(animations, scene);
  const { scene: newModelScene, animations: newModelAnimations } = useGLTF("./plane/scene.gltf"); // İkinci model
  const { actions: newModelActions } = useAnimations(newModelAnimations, newModelScene);
  const scroll = useScroll(); // Scroll verisini alıyoruz
  const [modelZ, setModelZ] = useState(10); // birinci modelin Z pozisyonunu kontrol etmek için state
  const [opacity, setOpacity] = useState(0);
  const [positionY, setPositionY] = useState(0);
  
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
      const scrollY = scroll.offset;
      const visibleAtScrollY = 0.4;

      if (scrollY >= visibleAtScrollY) {
        // Yazılar görünür hale gelsin
        setOpacity(1); 
        setPositionY(0); // Y konumu normal hale gelsin
      } else {
        setOpacity(0); // Scroll başlamadıysa gizli kalsın
        setPositionY(20); // Yukarıda beklesin
      }
      const newZPosition = -15 + scrollZ;
      setModelZ(newZPosition);
      if (newZPosition >= 11) {
        gsap.to(newModelScene, { opacity: 0, duration: 1 });
      } else {
        gsap.to(newModelScene, { opacity: 1, duration: 1 });
      }
      newModelScene.rotation.z = -positionAmount * 1;
      newModelScene.rotation.x = positionAmountY * 1;
      newModelScene.position.y = -positionAmountY * 10;
      newModelScene.position.x = positionAmount * 12;
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
      <Text
          position={[0, positionY, -30]} // X ve Y eksenini sıfır yaparak merkezliyoruz
          fontSize={windowWidth < 600 ? 0.6 : 1} // Ekran boyutuna göre font büyüklüğü
          color="white"
          opacity={opacity} // Opacity statik olabilir
        >
        Merhaba Ben Yiğit👋 React native developerım
      </Text>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ScrollControls
          pages={3}
          damping={isMobile ? 0.25 : 0.25}
          enabled={true} // Mobilde kaydırmayı etkinleştirin
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <Scroll>
            <Computers
              isMobile={isMobile}
              mouseX={mouseX} mouseY={mouseY}
              windowWidth={windowWidth} windowHeight={windowHeight}
            />
          </Scroll>
        </ScrollControls>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
