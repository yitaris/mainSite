
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      as='div'
      style={{
        position: "fixed",   // Tüm ekranı kaplamak için sabit konum
        top: 0,
        left: 0,
        width: "100vw",      // Tam ekran genişliği
        height: "100vh",     // Tam ekran yüksekliği
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#4b4a70", // Opak arka plan
        zIndex: 1000,        // Diğer her şeyin üstünde olacak
        pointerEvents: "none", // Site ile tüm etkileşimleri devre dışı bırak
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: "40px",
          marginRight: "20px",
        }}
      >
        Yitaris</h1>
      <p
        style={{
          fontSize: "30px",
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: "40px",
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
