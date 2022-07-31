import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Body from "./body";
import Right from "./right";
import SpotifyWebApi from "spotify-web-api-node";
import { useRecoilState } from "recoil";
import { playState, playingTrackState } from "../atoms/playerAtom";
import { useSession } from "next-auth/react";
import Player from "./player";
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "http://localhost:3000/api/auth/callback/spotify",
});

const Dashboard = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);
  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-max lg:pb-10">
      <Sidebar />
      <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
