import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row md:min-h-screen'>
        <div className='p-7   shadow-[4px_0_10px_rgba(0,0,0,0.12)]
  md:shadow-[0_4px_10px_rgba(0,0,0,0.12)]'>
         <form className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'> Search Term:</label>
                <input
                id='searchTerm'
                placeholder='Search...' 
                className='bg-white rounded-lg p-3 w-full' 
                type="text" 
                />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label font-semibold>Type:</label>
              <div className='flex gap-2 '>
                 <input 
                 type="checkbox" 
                 id='all' 
                 className='w-5' />
                 <span>Rent & Sale</span>
              </div>

              <div className='flex gap-2'>
                 <input 
                 type="checkbox" 
                 id='rent' 
                 className='w-5' />
                 <span>Rent</span>
              </div>

              <div className='flex gap-2'>
                 <input 
                 type="checkbox" 
                 id='sale' 
                 className='w-5' />
                 <span>Sale</span>
              </div>

              <div className='flex gap-2'>
                 <input 
                 type="checkbox" 
                 id='offer' 
                 className='w-5' />
                 <span>Offer</span>
              </div>
            </div>

            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Amenities:</label>
              <div className='flex gap-2 '>
                 <input 
                 type="checkbox" 
                 id='parking' 
                 className='w-5' />
                 <span>Parking</span>
              </div>

              <div className='flex gap-2'>
                 <input 
                 type="checkbox" 
                 id='furnished' 
                 className='w-5' />
                 <span>Furnished</span>
              </div>

            </div>

            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Sort:</label>
              <select id="sort-order" className='border-0 rounded-lg p-3 bg-white focus:outline-none'>
                <option>Price high to low</option>
                <option>Price low to high</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>

            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
         </form>
        </div>



        <div className=''>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results :</h1>
        </div>
    </div>
  )
}
