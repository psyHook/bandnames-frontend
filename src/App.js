import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket'],
  });
  return socket;
};

function App() {
  
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    // console.log(socket)
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands);
    });
  }, [socket]);

  const vote = (id) => {
    // console.log('votando :v', id)
    socket.emit('vote-band', id);
  };

  const deleteBand = (id) => {
    socket.emit('delete-band', id);
  };

  const changeNameBand = (id, name) => {
    socket.emit('change-name-band', { id, name });
  };

  const createBand = (name) => {
    socket.emit('create-band', { name });
  };

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service status:
          {online ? (
            <span className='text-success'> Online</span>
          ) : (
            <span className='text-danger'> Offline</span>
          )}
        </p>
      </div>

      <h1>Band Names</h1>
      <hr />

      <div className='row'>
        <div className='col-8'>
          <BandList
            data={bands}
            vote={vote}
            deleteBand={deleteBand}
            changeNameBand={changeNameBand}
          />
        </div>
        <div className='col-4'>
          <BandAdd createBand={createBand} />
        </div>
      </div>
    </div>
  );
}

export default App;
