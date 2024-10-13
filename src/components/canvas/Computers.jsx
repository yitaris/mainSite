import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Preload, ScrollControls, Scroll, useScroll, } from "@react-three/drei";
import { Vector2, Raycaster } from "three";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile, mouseX, mouseY, windowWidth, windowHeight, setBackgroundColor,}) => {
  const phoneGLB = useGLTF("./phone/phone.glb");
  const phoneGLB2 = useGLTF("./phone/phone2.glb");
  const phoneGLB3 = useGLTF("./phone/phone3.glb");

  const scroll = useScroll();
  const scrollY = scroll.offset * 9;
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('');
  const [number1 ,setNumber1] = useState(0);
  const [number2 ,setNumber2] = useState(0);
  const [number3 ,setNumber3] = useState(0);

  const raycaster = new Raycaster();
  const mouse = new Vector2();

  // Her telefon için pozisyon ve rotasyon state'leri
  const [targetXPosition, setTargetXPosition] = useState({
    phone1: isMobile ? windowWidth / 1000 : windowWidth / 480,
    phone2: isMobile ? windowWidth / 500 : windowWidth / 350,
    phone3: isMobile ? windowWidth / 350 : windowWidth / 300,
  });
  const [currentXPosition, setCurrentXPosition] = useState({
    phone1: isMobile ? windowWidth / 1000 : windowWidth / 480,
    phone2: isMobile ? windowWidth / 500 : windowWidth / 350,
    phone3: isMobile ? windowWidth / 350 : windowWidth / 300,
  });
  const [targetRotation, setTargetRotation] = useState({
    phone1: -0.5,
    phone2: -0.5,
    phone3: -0.5,
  });
  const [currentRotation, setCurrentRotation] = useState({
    phone1: -0.5,
    phone2: -0.5,
    phone3: -0.5,
  });
  const [targetScale, setTargetScale] = useState({
    phone1: isMobile ? 0.8 : 1.2,
    phone2: isMobile ? 0.8 : 1.2,
    phone3: isMobile ? 0.8 : 1.2,
  });
  const [currentScale, setCurrentScale] = useState({
    phone1: isMobile ? 0.8 : 1.2,
    phone2: isMobile ? 0.8 : 1.2,
    phone3: isMobile ? 0.8 : 1.2,
  });

  useFrame(({ camera }) => {

    const scrollOFF = scroll.offset * 100;
    const maxScroll = 98;

    if (scrollOFF >= maxScroll && isAtTop) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      })
      setIsAtTop(false);
      setScrollDirection('down');
    } else if (scrollOFF < maxScroll && !isAtTop) {
      window.scrollTo({
        top: 0, // Sayfanın üstüne gitmek için
        behavior: "smooth",
      });
      setIsAtTop(true); // Artık üstteyiz
      setScrollDirection('up'); // Yönü yukarı olarak belirliyoruz
    }

    mouse.x = (mouseX / window.innerWidth) * 2 - 1;
    mouse.y = -(mouseY / window.innerHeight) * 2 - 1;
    raycaster.setFromCamera(mouse, camera);

    setCurrentXPosition((prevState) => ({
      phone1: prevState.phone1 + (targetXPosition.phone1 - prevState.phone1) * 0.05,
      phone2: prevState.phone2 + (targetXPosition.phone2 - prevState.phone2) * 0.05,
      phone3: prevState.phone3 + (targetXPosition.phone3 - prevState.phone3) * 0.05,
    }));
    setCurrentRotation((prevRotations) => ({
      phone1: prevRotations.phone1 + (targetRotation.phone1 - prevRotations.phone1) * 0.05,
      phone2: prevRotations.phone2 + (targetRotation.phone2 - prevRotations.phone2) * 0.05,
      phone3: prevRotations.phone3 + (targetRotation.phone3 - prevRotations.phone3) * 0.05,
    }));
    setCurrentScale((prev) => ({
      phone1: prev.phone1 + (targetScale.phone1 - prev.phone1) * 0.05,
      phone2: prev.phone2 + (targetScale.phone2 - prev.phone2) * 0.05,
      phone3: prev.phone3 + (targetScale.phone3 - prev.phone3) * 0.05,
    }));
  });

  // Tıklama olayında rotasyonu ve pozisyonu değiştir
  const handleMouseClick = (objectName) => {
    if (objectName === "phone1") {
      setTargetXPosition((prevState) => ({
        ...prevState,
        phone1: isMobile
          ? (prevState.phone1 === windowWidth / 1000 ? -windowWidth / 400 : windowWidth / 1000)
          : (prevState.phone1 === windowWidth / 480 ? 0 : windowWidth / 480)
      }));
      setTargetRotation((prevRotations) => ({
        ...prevRotations,
        phone1: prevRotations.phone1 === -0.5 ? 0 : -0.5,
      }));
      setTargetScale((pervScale) => ({
        ...pervScale,
        phone1: isMobile
          ? (pervScale.phone1 === 0.8 ? 1.1 : 0.8)
          : (pervScale.phone1 === 1.2 ? 1.6 : 1.2)
      }))
      setNumber1((prevNumber) => {
        const newNumber = prevNumber + 1;
        if (newNumber % 2 === 0) {
          setBackgroundColor(["#fff", "#fff"]);
        } else {
          setBackgroundColor(["#BE3144", "#44000D"]);
        }
        return newNumber;
      });
    } else if (objectName === "phone2") {
      setTargetXPosition((prevState) => ({
        ...prevState,
        phone2: isMobile
          ? (prevState.phone2 === windowWidth / 500 ? -windowWidth / 400 : windowWidth / 500)
          : (prevState.phone2 === windowWidth / 350 ? 0 : windowWidth / 350)
      }));
      setTargetRotation((prevRotations) => ({
        ...prevRotations,
        phone2: prevRotations.phone2 === -0.5 ? 0 : -0.5,
      }));
      setTargetScale((pervScale) => ({
        ...pervScale,
        phone2: isMobile
          ? (pervScale.phone2 === 0.8 ? 1.1 : 0.8)
          : (pervScale.phone2 === 1.2 ? 1.6 : 1.2)
      }))
      setNumber1((prevNumber) => {
        const newNumber = prevNumber + 1;
        if (newNumber % 2 === 0) {
          setBackgroundColor(["#fff", "#fff"]);
        } else {
          setBackgroundColor(["#007880", "#1E3E62"]);
        }
        return newNumber;
      });
    } else if (objectName === "phone3") {
      setTargetXPosition((prevState) => ({
        ...prevState,
        phone3: isMobile
          ? (prevState.phone3 === windowWidth / 350 ? -windowWidth / 400 : windowWidth / 350)
          : (prevState.phone3 === windowWidth / 300 ? 0 : windowWidth / 300)
      }));
      setTargetRotation((prevRotations) => ({
        ...prevRotations,
        phone3: prevRotations.phone3 === -0.5 ? 0 : -0.5,
      }));
      setTargetScale((pervScale) => ({
        ...pervScale,
        phone3: isMobile
          ? (pervScale.phone3 === 0.8 ? 1.1 : 0.8)
          : (pervScale.phone3 === 1.2 ? 1.6 : 1.2)
      }))
      setNumber1((prevNumber) => {
        const newNumber = prevNumber + 1;
        if (newNumber % 2 === 0) {
          setBackgroundColor(["#fff", "#fff"]);
        } else {
          setBackgroundColor(["#FFDD93", "#D49B54"]);
        }
        return newNumber;
      });
    } else {
    }
  };

  return (
    <>
      <primitive
        object={phoneGLB.scene}
        scale={currentScale.phone1}
        position={[currentXPosition.phone1, -1, -8]}
        rotation={[0, currentRotation.phone1, 0]}
        onPointerDown={(event) => {
          event.stopPropagation();
          handleMouseClick("phone1");
        }}
      />
      <primitive
        object={phoneGLB2.scene}
        scale={currentScale.phone2}
        position={[currentXPosition.phone2, -1, -8]}
        rotation={[0, currentRotation.phone2, 0]}
        onPointerDown={(event) => {
          event.stopPropagation();
          handleMouseClick("phone2");
        }}
      />
      <primitive
        object={phoneGLB3.scene}
        scale={currentScale.phone3}
        position={[currentXPosition.phone3, -1, -8]}
        rotation={[0, currentRotation.phone3, 0]}
        onPointerDown={(event) => {
          event.stopPropagation();
          handleMouseClick("phone3");
        }}
      />
    </>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [backgroundColor, setBackgroundColor] = useState(["#fff", "#fff"]);

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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

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
      style={{ background: `linear-gradient(to right, ${backgroundColor[0]}, ${backgroundColor[1]})`}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ScrollControls
          pages={0}
          damping={isMobile ? 0.25 : 0.25}
          enabled={true}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <Scroll>
            <Computers
              isMobile={isMobile}
              mouseX={mouseX} mouseY={mouseY}
              windowWidth={windowWidth} windowHeight={windowHeight}
              setBackgroundColor={setBackgroundColor}
            />
          </Scroll>
        </ScrollControls>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
