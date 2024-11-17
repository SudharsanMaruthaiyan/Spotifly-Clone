import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
// import { albumsData, songsData } from '../../assets/assets'
import AlbumItem from '../AlbumItem/AlbumItem'
import SongItem from '../SongItem/SongItem'
import { PlayerContext } from '../../Context/PlayerContext'

const DisplayHome = () => {
  // const [albumsData, setAlbumsData] = useState([]);
  // const [songsData, setSongsData] = useState([]);
  // const url = "http://localhost:4000";
  // const getSongsData = async ()=>{
  //   try {
  //     const response = await axios.get(`${url}/api/song/list`);
  //     setSongsData(response.data.songs);
  //     console.log(response.data)
  //   } catch (error) {
  //     close.log("Error Occur")
  //   }
  // }
  // const getAlbumsData = async ()=>{
  //   try {
  //     const response = await axios.get(`${url}/api/album/list`);
  //     setAlbumsData(response.data.Album);
  //     console.log(response.data)
  //   } catch (error) {
  //     close.log("Error Occur")
  //   }
  // }

  // useEffect(()=>{
  //   getSongsData();
  //   getAlbumsData();
  // },[])
  const {songsData, albumsData} = useContext(PlayerContext)
  return (
    <>
        <Navbar/>
        <div className=' mb-4'>
          <h1 className=' my-5 font-bold text-2xl'>Featured Charts</h1>
          <div className=' flex overflow-auto items-center'>
            {
              albumsData.map((items,index)=>{
                return(
                  <>
                    <AlbumItem key={index} name={items.name} desc={items.desc} id={items._id} image={items.image}/>
                  </>
                )
              })
            }
          </div>
        </div>
        <div className=' mb-4'>
          <h1 className=' my-5 font-bold text-2xl'>Today's Biggest hit's</h1>
          <div className=' flex overflow-auto'>
            {
              songsData.map((items,index)=>{
                return(
                  <>
                    <SongItem key={index} name={items.name} desc={items.desc} id={items._id} image={items.image}/>
                  </>
                )
              })
            }
          </div>
        </div>
    </>
  )
}

export default DisplayHome