import { createContext, useEffect, useRef, useState } from "react";
// import { songsData } from "../assets/assets";
import axios from 'axios'
export const PlayerContext = createContext();

const PlayerContextProvider = (props)=>{
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [albumsData, setAlbumsData] = useState([]);
    const [songsData, setSongsData] = useState([]);
    const url = "http://localhost:4000";

    const [track, setTrack] = useState(songsData[0]);
    const [playerStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime : {
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    });

    const play = ()=>{
        audioRef.current.play();
        setPlayerStatus(true)
    }
    const pause = ()=>{
        audioRef.current.pause();
        setPlayerStatus(false);
    }

    const playWithId = async (id)=>{
        // await setTrack(songsData[id]);
        // await audioRef.current.play();
        // setPlayerStatus(true);
        await songsData.map((item)=>{
            if(id === item._id){
                setTrack(item);
            }
        })
        await audioRef.current.play();
        setPlayerStatus(true)
    }

    const previous = async ()=>{
        // if(track.id>0){
        //     await setTrack(songsData[track.id - 1]);
        //     await audioRef.current.play();
        //     setPlayerStatus(true)
        // }
        songsData.map(async (item,index)=>{
            if (track._id === item._id && index > 0) {
                await setTrack(songsData[index-1]);
                await audioRef.current.play();
                setPlayerStatus(true);
            }
        })
    }

    const next = async ()=>{
        songsData.map(async(item,index)=>{
            if(track._id ===  item._id && index < songsData.length){
                await setTrack(songsData[index + 1]);
                await audioRef.current.play();
                setPlayerStatus(true)
            }
        })
    }

    const seekSongs = async (e)=>{
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration  )
    }

    const getSongsData = async ()=>{
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0])
            console.log(response.data)
        } catch (error) {
            console.log("Error Occur")
        }
    }

    const getAlbumsData = async ()=>{
        try {
        const response = await axios.get(`${url}/api/album/list`);
        setAlbumsData(response.data.Album);
        console.log(response.data)
        } catch (error) {
        console.log("Error Occur")
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate = () =>{
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100))+"%";
                setTime(
                    {currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute:Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime:{
                        second: Math.floor(audioRef.current.duration % 60),
                        minute:Math.floor(audioRef.current.duration / 60),
                    }}
                )
            }
        })
    },[audioRef])

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playerStatus,
        setPlayerStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSongs,
        songsData,
        albumsData
    }

    useEffect(()=>{
        getSongsData();
        getAlbumsData();
    },[])

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;