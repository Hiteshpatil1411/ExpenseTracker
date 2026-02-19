import React, { useRef, useState } from 'react'
import { LuUser, LuUpload,LuTrash } from 'react-icons/lu'
const ProfilePhotoSelector = ({image,setImage}) => {
    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleImageChange= (event)=>{
        const file = event.target.files[0];
        if(file){
            //Update The image state
            setImage(file)
             // Generate a prev1ew URL for the selected image
             
            const preview = URL.createObjectURL(file);
            console.log(preview)
            setPreviewUrl(preview)
        }

    }
    const handleRemoveImage=()=>{
        setImage(null);
        setPreviewUrl(null);
        // inputRef.current.value=null;
    }
    const onChosseFile= ()=>{
        inputRef.current.click();
    
    }
  return (
    <>
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="images/*"
                ref={inputRef}
                onChange={(e)=>handleImageChange(e)}
                className="hidden"
            />

        {!image ? (
            <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full cursor-pointer relative" >
                <LuUser  className="text-primary text-4xl" />
                <button
                    type="button"
                    className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                    onClick={onChosseFile} >
                        <LuUpload size={16}/>
                        </button> 
            </div>):
                (<div className="relative">
                    <img src={previewUrl} alt="Preview" className="w-20 h-20 rounded-full object-cover border-1 border-blue-300" />
                    <button
                    type='button'
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex absolute items-center justify-center -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"  >
                        <LuTrash size={16} />
                        </button>
                </div>
        )}
        </div>
    </>
  )
}

export default ProfilePhotoSelector
