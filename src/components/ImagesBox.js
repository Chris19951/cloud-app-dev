
import {db,storage,storageRef} from "../firebase";
import {ref,onValue} from "firebase/database";
import {pushPicture,increateHeartDB} from "../routes/Database"
import React ,{useEffect, useState, useCallback,useRef} from "react";
import {useDropzone} from 'react-dropzone'
import {uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { SearchIcon,FolderDownloadIcon,HeartIcon,ChatIcon} from '@heroicons/react/outline';

function ImagesBox() {
  const [selectedImages,setSelectedImages] = useState()
  const [selectedImage,setSelectedImage] = useState()
  const [pictures,setPictures] = useState([])
  const [error,setError] = useState(false)
  const [content,setContent] = useState(false)
  const [filterValue,setFilterValue] = useState()
  const filterRef = useRef()
  const name = useRef()
  const tag = useRef()
  const description = useRef()

  const metadata = {
    contentType: 'image/jpeg'
  }
  const onDrop = useCallback(acceptedFiles => {
        setSelectedImages(acceptedFiles[0])
        setSelectedImage(URL.createObjectURL(acceptedFiles[0]))
  })
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  function handleUpload(){
  if(name.current.value!="" && tag.current.value!=""&&
  description.current.value!=""){
    const storagePath = storageRef(storage)
      const uploadTask = uploadBytesResumable(storagePath, selectedImages, metadata)
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',(snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
          case 'storage/canceled':
          // User canceled the upload
          break;
          // ...
          case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          pushPicture(downloadURL,name.current.value,tag.current.value,description.current.value)
          setSelectedImages()
          setSelectedImage()
          setError(false)
          name.current.value=""
          tag.current.value=""
          description.current.value=""
          const overlay = document.querySelector(".overlay")
          overlay.classList.remove("active")
        });
      }
      );
    }else{
      setError("Es werden alle Eingaben benötigt !")
    }
  }
  //Seiten-Effekte
  useEffect(() => {

    onValue(ref(db, 'pictures' ), (snapshot)  =>{
      setPictures([])
      snapshot.forEach(picture => { 
        if (picture.val().pictureTag.includes(filterValue)||
        picture.val().pictureName.includes(filterValue)||
        filterValue===" "||filterValue==="  "||!filterValue){
          setPictures(pictures =>[...pictures,picture])
        } 
      })    
    })
  }, [filterValue]) 

  function removeOverlay(){
    const overlay = document.querySelector(".overlay")
    overlay.classList.remove("active")
  }

  function incrementHeart(id){
    increateHeartDB(id)
  }

  var handleFilter = event =>{
    //Wird ausgeführt, sobald sich der Inputwert des DFIlters ändert
    event.preventDefault()
    if((filterRef.current.value)!=""){
        setFilterValue(filterRef.current.value)
    }else{
        setFilterValue("")
    }
  }
  //Retrun Main
  return (
    <div className="imagesBox">
      <div className="searchBox">
        <p className="text">Bilder hochladen & herunterladen</p>
        <p className="">Eine Auswahl von hochwertigen Bildern, geteilt aus unser talentierten Community.</p>
        <SearchIcon className="searchIcon"/>
        <input onKeyUp={handleFilter} ref={filterRef} placeholder="Suche nach Bildern und Fotos" className="inputSearchBox"></input>
      </div>
      <div className="showImages">
        {pictures.map(child => 
        <div style={{backgroundImage:"url("+child.val().picturePath+")"}} className="selfPersonImg">
          {content==child.key&&<div onClick={()=> setContent()} className="contentBox"><p className="textDes">{child.val().pictureDescription}</p></div>}
          <div onClick={() =>content==child.key?setContent():""} className="compInfo">
            <div>{child.val().pictureName}</div>
            <div className="like"><ChatIcon onClick={() =>content==child.key?setContent():setContent(child.key)} className="chatIcon"/>{child.val().pictureLikes}
            <HeartIcon onClick={() => incrementHeart(child.key)} className="heartIcon"/></div>
          </div>
        </div>
        )}
      </div>
      <div className="overlay">
        <div className="uploadFormContainer">
        <div className="containerTextFrom"><p>Lade dein Bild auf unseren Blog und nehme<br /> in unserer Community teil.</p></div>
          {error&&<div className="error">{error}</div>}
          <form onSubmit={handleUpload} className="uploadForm">
            <div className='dropzoneContent'  style={{backgroundImage:"url("+'"'+selectedImage+'"'+")"}}>
              <div className='dropzoneContainer' {...getRootProps()}>
                <input {...getInputProps()}/>                
                {selectedImage?"":
                  <div className="dropbox">
                    <p>Drop your Image in JPG or JPNG</p>
                    <FolderDownloadIcon className="downIcon"/>
                  </div>
                }
              </div>
              {selectedImages&&<div  className=''></div>}
            </div>
            <input ref={name} className="inputForm" placeholder="Bildname"/>
            <input ref={tag} className="inputForm" placeholder="Bild-Tags"/>
            <input ref={description} className="inputForm content" placeholder="Beschreibung"/>
            <div className="buttonContainer">
            <div onClick={removeOverlay} className="submitButton" >Back
              </div>
              <div onClick={handleUpload} className="submitButton" >Upload!
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
  
  export default ImagesBox;


