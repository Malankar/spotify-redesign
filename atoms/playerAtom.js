import { atom } from "recoil";

export const playState = atom({
  key: "playState",
  default: false,
});
export const playingTrackState = atom({
  key: "playingTrackState",
  default: "",
});
//Here playing track is to track which track is playing
//and playstate is for if it is playing or paused
