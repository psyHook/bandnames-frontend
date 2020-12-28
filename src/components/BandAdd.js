import React, { useState } from "react";

export const BandAdd = ({ createBand }) => {
  const [valor, setValor] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (valor.trim().length > 0) {
      //TODO: Llamar la funcion para emitir evento
      createBand( valor );
    }
  };

  return (
    <>
      <h3>Add Band</h3>

      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo Nombre de Banda"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </form>
    </>
  );
};
