import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Decrease from './components/Decrease';
import Display from './components/Display';
import Increase from './components/Increase';
import MuteToggle from './components/MuteToggle';
import Title from './components/Title';
import CurrentVolume from './contexts/CurrentVolume';

function App() {
  const [hostname, setHostname] = useState<string>("");
  const [volume, setVolume] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    fetch("/status")
      .then((res) => res.json())
      .then((vol: VolumeStatus) => {
        setVolume(vol.Volume);
        setMuted(vol.Muted);
      });
    
      fetch("/computer")
        .then((res) => res.json())
        .then((host: HostInfo) => {
          setHostname(host.Name);
        })
  }, []);
  return (
    <CurrentVolume.Provider value={{
      volume,
      muted,
      updateVolume: setVolume,
      updateMuted: setMuted,
    }}>
      <Grid container spacing={3} style={{ paddingTop: 20 }}>
        <Grid item xs={12}>
          <Title text={hostname}/>
        </Grid>
        <Grid item xs={12}>
          <Increase/>
        </Grid>
        <Grid item xs={12}>
          <Display/>
        </Grid>
        <Grid item xs={12}>
          <Decrease/>
        </Grid>
        <Grid item xs={12}>
          <MuteToggle/>
        </Grid>
      </Grid>
    </CurrentVolume.Provider>
  );
}

export default App;
