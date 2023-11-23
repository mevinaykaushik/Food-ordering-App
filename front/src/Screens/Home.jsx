import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'


import Search from '../Components/Search'

const Home = () => {
  const[search,setSearch]=useState("");

  const [foodCat, setfoodCat] = useState([])
  const [foodItem, setfoodItem] = useState([])

  const loadData=async ()=>{
    let response =await fetch("http://localhost:5000/api/foodData",{
      method:'POST',
      headers:{
      'Content-Type':'application/json'
      }
    })
    response=await response.json();
    // console.log(response[0],response[1]);
    setfoodItem(response[0]);
    setfoodCat(response[1]);



  }

  useEffect(() => {
   loadData();
    
  }, []);

  return(
    <div>
        
        
      
{/* // Search functanility */}
<div className="m-3">
  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
    <input
      type="search"
      className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
      placeholder="Search"
      value={search}
      aria-label="Search"
      aria-describedby="button-addon1"
      onChange={(e)=>setSearch(e.target.value)}
      />

  
    <button
      className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out bg-slate-400 hover:bg-green-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
      type="button"
      id="button-addon1"
      data-te-ripple-init
      data-te-ripple-color="light">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5">
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>






{/* 
//----------------------------------------------------------------------------- */}

<div className=''>
  {foodCat.length > 0 ? (
    foodCat.map((data) => {
      const filteredItems = foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search));

      if (filteredItems.length === 0) {
        return null; // Skip rendering if there are no items for this category
      }

      return (
        <div key={data._id} className='mb-4'>
          <div className='text-2xl font-bold mb-2'>{data.CategoryName}</div>
          <hr />
          <div className='flex flex-wrap'>
            {filteredItems.map((filteredItem) => (
              <div key={filteredItem._id} className='w-full md:w-1/2 lg:w-1/3 p-2'>
                <Card
                  foodItem={filteredItem}
                  options={filteredItem.options[0]}
                 
                />
              </div>
            ))}
          </div>
        </div>
      );
    })
  ) : "No data available"}
</div>



        

        <div><Footer/></div>
    </div>
  )
}

export default Home