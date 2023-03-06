import { EmojiHappyIcon, PhotographIcon,XIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import {addDoc,collection, serverTimestamp, updateDoc,doc} from "firebase/firestore"
import {useSession,signOut} from "next-auth/react"
import {db, storage} from "../firebase"
import { getDownloadURL,ref,uploadString } from 'firebase/storage'
import { isNullishCoalesce } from 'typescript'
const Input = () => {
  const {data:session} = useSession()
  const [input,setInput] = useState("");
  const [selectedFile,setSelectedFile] = useState(null);
  const filePickerRef = useRef(null)
  const [loading,setLoading] = useState(false)

  const sendPost = async ()=>{
    if(loading) return;
    setLoading(true)
    const docRef = await addDoc(collection(db,"posts"),{
      id:session.user.uid,
      text:input,
      userImg:session.user.image,
      timesstamp:serverTimestamp(),
      name:session.user.name,
      username:session.user.username,
    });
const imageRef = ref(storage,`posts/${docRef.id}/image`);
if(selectedFile){
  await uploadString(imageRef,selectedFile, "data_url").then(async()=>{
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(db, "posts",docRef.id),{
      image:downloadURL
    })
  }) 
}
    setInput(""); 
    setSelectedFile(null);
    setLoading(false);
  };
  const addImageToPost = (e)=>{
const reader = new FileReader();
if(e.target.files[0]){
  reader.readAsDataURL(e.target.files[0]);
}
reader.onload  = (readevent)=>{
  setSelectedFile(readevent.target.result);
} 
  }
  return (
    <>{session &&
      <div className='flex border-b border-gray-200 p-3 space-x-3'>
      <img onClick={signOut}  width="11" height="11" className=' h-11 w-11 rounded-full cursor-pointer hover:brightness-95' src={session.user.image}/>
      <div className='w-full divide-y divide-gray-200'>
          <div className='' >
          <textarea value={input}  onChange={(e)=>setInput(e.target.value)} className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700' rows="2" placeholder="What's happening?"></textarea>
          </div>
          {selectedFile && (
            <div className='relative'>
              <XIcon onClick={()=>setSelectedFile(null)} className="shadow-md shadow-white rounded-full h-7 text-black absolute cursor-pointer"/>
              <img src={selectedFile} alt=""  className={`${loading && "animate-pulse"}`}/>
            </div>
          )}
  <div className='flex items-center justify-between pt-2.5'>
    {!loading && (
      <>
        <div className='flex '>
        <div className='' onClick={()=>filePickerRef.current.click()}>
        <PhotographIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100'/>
<input type="file" onChange={addImageToPost}  hidden ref={filePickerRef}/>
        </div>
          <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100'/>
      </div>
      <button onClick={sendPost} disabled={!input.trim()} className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:first-letter:opacity-50s'>Tweet</button>
      </>
    )}
    
  </div>
  </div>
      </div>
    }</>

  )
}

export default Input