// import { useEffect, useState } from "react";

// // Tipado de los estados
// const CountdownTimer = () => {
//   // El estado `time` es de tipo `number` (segundos)
//   const [time, setTime] = useState<number>(5 * 60); // 5 minutos en segundos
//   const [isActive, setIsActive] = useState<boolean>(true); // Estado de actividad de la cuenta regresiva

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;

//     if (isActive && time > 0) {
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (time === 0) {
//       clearInterval(interval!); // Eliminamos el intervalo cuando el tiempo llega a cero
//     }

//     return () => {
//       if (interval) clearInterval(interval); // Limpieza del intervalo
//     };
//   }, [isActive, time]);

//   // Función para formatear el tiempo en `MM:SS`
//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
//   };

//   // Cálculo de la barra de progreso
//   const progressBarWidth = (time / (5 * 60)) * 100; // Calculamos el ancho de la barra en función del tiempo restante

//   // Función para obtener el color de la barra de progreso
//   const getProgressBarColor = (time: number): string => {
//     if (time > 180) return "#4caf50"; // Verde
//     if (time > 60) return "#ff9800"; // Naranja
//     return "#f44336"; // Rojo
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <div style={{ fontSize: "3rem", fontWeight: "bold" }}>
//         {formatTime(time)}
//       </div>
//       <div
//         style={{
//           height: "10px",
//           width: "100%",
//           backgroundColor: "#ddd",
//           borderRadius: "5px",
//           marginTop: "10px",
//         }}
//       >
//         <div
//           style={{
//             height: "100%",
//             width: `${progressBarWidth}%`,
//             backgroundColor: getProgressBarColor(time),
//             borderRadius: "5px",
//             transition: "width 1s linear", // Suaviza el cambio de la barra
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default CountdownTimer;
