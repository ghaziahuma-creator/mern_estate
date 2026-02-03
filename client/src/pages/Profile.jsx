import {useSelector} from 'react-redux'
import { useRef, useState } from 'react'
import axios from "axios";

// cloudinary.v2.config({
//   cloud_name: 'durevuy5x',
//   api_key: '182928236674457',
//   api_secret: 'UU4exW-vNlqVcpLDZ4d3Vv8jJFs',
// });


export default function Profile() {
  const fileRef= useRef(null);
  const {currentUser} = useSelector((state)=>state.user)
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [formData, setFormData] = useState({});
console.log(formData);

  const uploadPreset = "uploads_cloud";
  const cloudName = "durevuy5x";

    const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Prepare FormData
    const formDataUpload  = new FormData();
    formDataUpload .append("file", file);
    formDataUpload .append("upload_preset", uploadPreset);

    try {
      // Upload to Cloudinary
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formDataUpload 
      );

      console.log(res.data);
      const imageUrl = res.data.secure_url;
       setFormData((prev) => ({
      ...prev,
      avatar: imageUrl,
    }));
       // This is the uploaded image URL
      // Here, you can also update your backend with the new avatar URL
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed!");
    }
  };

  return (
   <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>
      Profile</h1>
   <form className='flex flex-col gap-4'>
    <input type="file" ref={fileRef} hidden accept='image/*' onChange={handleImageChange}/>
   <img onClick={()=>fileRef.current.click()} src={formData.avatar? (formData.avatar) : (currentUser.avatar)} alt="Profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
   <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg bg-white border-none' />
   <input type="text" placeholder='email' id='email' className='border p-3 rounded-lg bg-white border-none' />
   <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg bg-white border-none' />

   <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
   </form>
   <div className='flex justify-between mt-5'>
     <span className='text-red-700 cursor-pointer'>Delete account</span>
     <span className='text-red-700 cursor-pointer'>Sign Out</span>
   </div>
   </div>
  )
}
