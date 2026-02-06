import {useSelector} from 'react-redux'
import { useRef, useState } from 'react'
import axios from "axios";
 import {deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess} from '../redux/user/userSlice'
 import { useDispatch } from 'react-redux';
 import {Link} from 'react-router-dom'

// cloudinary.v2.config({
//   cloud_name: 'durevuy5x',
//   api_key: '182928236674457',
//   api_secret: 'UU4exW-vNlqVcpLDZ4d3Vv8jJFs',
// });


export default function Profile() {
  const fileRef= useRef(null);
  const {currentUser, loading, error} = useSelector((state)=>state.user)
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess]=useState(false);
 const dispatch = useDispatch();
  

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
  
  const handleChange=(e)=>{
     setFormData((prev) => ({
    ...prev,
    [e.target.id]: e.target.value,
  }));
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
       dispatch(updateUserStart());
       
       const res = await fetch(`/api/user/update/${currentUser._id}`,
      {
         method: 'POST',
         headers: {
          'Content-Type' : 'application/json',
         },
         body:JSON.stringify(formData),
         credentials: 'include',
       })
       const data = await res.json();
       if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
       }
       dispatch(updateUserSuccess(data));
       setUpdateSuccess(true);
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }
  const handleDeleteUser = async ()=>{
    try{
     dispatch(deleteUserStart());
     const res = await fetch(`/api/user/delete/${currentUser._id}`,
      {
        method:'DELETE',
      }
     );
     const data= await res.json();
     if(data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;
     }
     dispatch(deleteUserSuccess(data));
    }catch(error){
      dispatch(deleteUserFailure(error.message))
  }

  }

  const handleSignOut=async()=>{
    try{
      dispatch(signOutUserStart());
const res= await fetch('api/auth/signout');
const data= await res.json();
if(data.success === false){
  dispatch(signOutUserFailure(data.message));
  return;
}
dispatch(signOutUserSuccess(data));
    }catch(error){
       dispatch(signOutUserFailure(data.message));
    }
  }
  return (
   <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>
      Profile</h1>
   <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    <input type="file" ref={fileRef} hidden accept='image/*' onChange={handleImageChange}/>
   <img onClick={()=>fileRef.current.click()} src={formData.avatar? (formData.avatar) : (currentUser.avatar)} alt="Profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
   <input type="text" defaultValue={currentUser.username} placeholder='username' id='username' className='border p-3 rounded-lg bg-white border-none' onChange={handleChange}/>
   <input type="text" defaultValue={currentUser.email} placeholder='email' id='email' className='border p-3 rounded-lg bg-white border-none' onChange={handleChange} />
   <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg bg-white border-none' onChange={handleChange} />

   <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95 disabled:opacity-80 '>
    {loading? 'Loading...': 'Update'}
    </button>
    <Link className='bg-green-700 text-white rounded-lg p-3 text-center uppercase hover:opacity-95 disabled:opacity-80' to={"/create-listing"}>
    Create Listing
    </Link>
   </form>
   <div className='flex justify-between mt-5'>
     <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
     <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
   </div>
   <p className='text-red-700 mt-5'>{error ? error: ''}</p>
   <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated succesfully !': ''}</p>
   </div>
  )
}
