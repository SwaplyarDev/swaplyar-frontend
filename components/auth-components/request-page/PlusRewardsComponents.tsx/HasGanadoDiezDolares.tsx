import React from 'react';
import Image from 'next/image';
export default function HasGanadoDiezDolares() {
  return (
    <div className="flex flex-col">
      <Image src={'/images/has-ganado-10-dolares.png'} fill alt="Has ganado 10 dolares" />
      <h2>
        Has ganado $10 USD <p>de</p> Plus Rewards
      </h2>
      <p>tu regalo se activará automáticamente. </p>
      <p>¡Sigue avanzando!</p>
    </div>
  );
}
