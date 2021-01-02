import React, { useContext } from "react";
import { Header } from "react-native-elements";
import SafeAreaView from 'react-native-safe-area-view';
import Connection from '../contexts/Connection';

export default function Title(): JSX.Element {
  const { hostname, host } = useContext(Connection);
  console.log(hostname)
  return (
    <SafeAreaView>
      <Header 
        placement="left"
        leftComponent={{ text: hostname, style: { color: '#fff' } }}
        rightComponent={{ text: host, style: { color: '#fff' } }}
      />
    </SafeAreaView>
);
}
