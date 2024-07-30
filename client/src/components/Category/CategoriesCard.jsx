import Axios from 'axios'
import { useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';

export default function CategoriesCard() {
const [items, setItems] = useState([])

function viewDetail (id) { 
  console.log(id)
  redirect('/categories',{id})
 }

useEffect(()=>{

async function get(){
  try{
    const items = await Axios.get('https://api.escuelajs.co/api/v1/categories')
    setItems(items.data)
  } 

  catch(err){
    console.log(err)
  }
}
get()
   
},[])


  return (
    <div className='grid gap-12 md:grid-cols-3  grid-cols-1 m-3 p-3 overflow-hidden'>
    {items.map((item )=>(
      <Link to={`/categories/${item.id}` } key={item.id} className=' h-96 w-80'>
        <h1>{item.name}</h1>
        <div className='h-60'>
          <img src={item.image}/>
      </div>

      </Link>
    )
    )}
    </div>
  )
}
