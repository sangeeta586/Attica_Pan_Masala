import React, { useState } from 'react'

const CartOrder = () => {
  const [Product1, setProduct1] = useState(0);
  const [Product2, setProduct2] = useState(0);
  const [Product3, setProduct3] = useState(0);
  const [Product4, setProduct4] = useState(0);
  
  return (
    <div>
                <div className="px-20 py-10 items-center justify-center content-center">
          <div className='flex items-center gap-20 '>
            <img className='w-60 h-60' src={image} alt="Product Image" />
            <div className='flex flex-col gap-4'>
              <div className="flex items-center gap-4">
                <h1 className='text-xl font-semibold'>{h}</h1>
                <h1 className='text-xl font-semibold'>{p}</h1>
              </div>
              {/* <select value={selectedOption} onChange={handleOptionChange} className="border border-gray-300 rounded-lg px-2 py-1 w-14">
                <option value="Option 1"> 1</option>
                <option value="Option 2"> 2</option>
                <option value="Option 3">3</option>
              </select> */}
              <button onClick={()=>setProduct1(Product1+1)}>+</button>
              {Product1}
              <button>-</button>
            </div>
          </div>
         
        </div>
    </div>
  )
}

export default CartOrder