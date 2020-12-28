import { createContext } from "react";

const CurrentVolume = createContext<{
  volume: number;
  updateVolume: (vol: number) => void;
  muted: boolean;
  updateMuted: (status: boolean) => void;
}>({
  volume: 0,
  updateVolume: () => {},
  muted: false,
  updateMuted: () => {},
});

export default CurrentVolume;