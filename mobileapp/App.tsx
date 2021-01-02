import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Decrease from './components/Decrease';
import Display from './components/Display';
import Increase from './components/Increase';
import MuteToggle from './components/MuteToggle';
import Title from './components/Title';
import Connection from './contexts/Connection';
import CurrentVolume from './contexts/CurrentVolume';
import { SafeAreaProvider } from 'react-native-safe-area-view';

export default function App() {
  const [host, setHost] = useState<string>("http://192.168.1.100:8080");
  const [hostname, setHostname] = useState<string>("");
  const [volume, setVolume] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    fetch(host + "/status")
      .then((res) => res.json())
      .then((vol: VolumeStatus) => {
        setVolume(vol.Volume);
        setMuted(vol.Muted);
      });
    
      fetch(host + "/computer")
        .then((res) => res.json())
        .then((host: HostInfo) => {
          setHostname(host.Name);
        })
  }, [host]);

  console.log(hostname);
  return (
    <SafeAreaProvider>
      <Connection.Provider value={{ host, hostname }}>
        <Title />
        <View style={styles.container}>
          <CurrentVolume.Provider value={{ volume, updateVolume: setVolume, muted, updateMuted: setMuted }}>
            <Increase />
            <View style={{ height: 20 }} />
            <Display />
            <View style={{ height: 20 }} />
            <Decrease />
            <View style={{ height: 20 }} />
            <MuteToggle/>
          </CurrentVolume.Provider>
        </View>
      </Connection.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
