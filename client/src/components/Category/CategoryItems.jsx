import React, { useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import { useParams } from 'react-router-dom'
import  Axios  from 'axios';

export default function CategoryItems() {
    const[items, setItems] = useState([])
    const {id} = useParams();

    useEffect(()=>{

        async function get(){
            try{
                const item = await Axios.get('https://api.escuelajs.co/api/v1/categories')

                const items = await Axios.get(`https://api.escuelajs.co/api/v1/categories/${id}/products`) 
                console.log(items.data[0].images)  
                setItems(items.data)
            }
            catch(err){
                console.log(err)
            }
        }

        get()
    },[])
  return (
    <div>
    <Navbar />
      <div className='grid md:grid-cols-3 grid-cols-1 gap-6 mt-5'>
     {items.map((item)=>(
        <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full rounded-lg" src={item.images} alt="Image description" />
        <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2">{item.title}</h2>
            <p className="text-gray-700 text-base">
                {item.description}
            </p>
            <p></p>
        </div>
            </div>
     ))}

      </div>
    </div>
  )
}
