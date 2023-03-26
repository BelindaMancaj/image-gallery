import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  let clientId:string = '610e5421bd53555'
   //Clinet Secret e463811854aa452a1f57355a2b4aa31dce466d1e
   interface ImageData {
    id: string
    title: string
    link: string
    in_most_viral: boolean
    cover: string
    is_album: boolean
   }

   interface ImageList{
    data: ImageData[]
   }

   const [gallery, setGallery] = useState<ImageData[]>([])
   
   const getGallery = async(): Promise<ImageList[]> =>{
   
    const gallery = await fetch("https://api.imgur.com/3/gallery/t/road",
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: "Client-ID " + clientId,
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
    })

     const imageData = await gallery.json();
     setGallery(imageData.data.items)
     console.log(imageData)
     return imageData
  }

  const tomp = gallery.filter((g) => !g.is_album)

  console.log("Tomp", tomp)
   useEffect(() =>{
    getGallery()
   }, [])


  return (
    <div className="App">
      {/**
       * Try mapping inside mapping
       */}
     {gallery.map((image: ImageData) =>{
     return(
      <div key={image.id}>
      <p>{image.title}</p>
      <img src={`https://i.imgur.com/${image.cover}.jpeg`} alt=""  width="300" height="300"/>
      </div>
     )
     }
     )}
    </div>
  );
}

export default App;
