import React, { useState, useEffect } from 'react';

export const BandList = ({ data, vote, deleteBand, changeNameBand }) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const changeName = (event, id) => {
    const newName = event.target.value;

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const onLostFocus = (id, name) => {
    console.log(id, name);

    //TODO: Disparar el evento de sockets
    changeNameBand( id, name )
  };

  const createRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className='btn btn-primary' onClick={() => vote(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className='form-control'
            value={band.name}
            onChange={(event) => changeName(event, band.id)}
            onBlur={() => onLostFocus(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className='btn btn-danger'
            onClick={() => deleteBand(band.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className='table table-stripped'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
