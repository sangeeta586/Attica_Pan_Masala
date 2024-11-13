import React from 'react'

function AddNewProduct() {
    const haldleOnSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        const ProductName = e.target.ProductName.value;
        const Category = e.target.Category.value;
        const Brand = e.target.Brand.value;
        const Price = e.target.Price.value;
        const ProductDetails = e.target.ProductDetails.value;


    }
    return (

        <>

            <div className=' pt-6 mb-4 text-4xl item-center font-bold 
                           text-center text-gray-900'>
                <h3 >Add Product</h3>
            </div>
            {/* <div className=' mx-auto max-w-screen-md' > */}
            <div className=" border border-black rounded-lg py-5 px-6 mx-auto max-w-screen-md">

                <form onSubmit={haldleOnSubmit}>
                    <div className="flex flex-row">
                        <div className="w-1/2 pr-2 ">
                            <label htmlFor="ProductName"
                                className="block my-2 text-left  
                                          text-sm font-medium text-gray-900">
                                Product Name
                            </label>
                            <input type="text"
                                name='ProductName'
                                id='ProductName'
                                className="shadow-sm bg-gray-50 border 
                                          border-gray-300 text-gray-900  
                                          text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Product Name"
                                required />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label htmlfor="Category"
                                className="block my-2 text-left text-sm  
                                          font-medium text-gray-900">
                                Category
                            </label>
                            <input type="text"
                                name='Category'
                                id='Category'
                                className="shadow-sm bg-gray-50 border  
                                          border-gray-300 text-gray-900  
                                          text-sm rounded-lg block w-full p-2.5"
                                placeholder="Category" />
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="w-1/2 pr-2 ">
                            <label htmlfor="Brand"
                                className="block my-2 text-left  
                                          text-sm font-medium text-gray-900">
                                Brand
                            </label>
                            <input type="text"
                                name='Brand'
                                id=' Brand'
                                className="shadow-sm bg-gray-50 border 
                                          border-gray-300 text-gray-900  
                                          text-sm rounded-lg block w-full p-2.5"
                                placeholder="Brand"
                                required />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label htmlfor="Price"
                                className="block my-2 text-left text-sm  
                                          font-medium text-gray-900">
                                Price
                            </label>
                            <input type="text"
                                name='Price'
                                id='Price'
                                className="shadow-sm bg-gray-50 border  
                                          border-gray-300 text-gray-900  
                                          text-sm rounded-lg block w-full p-2.5"
                                placeholder="Price" />
                        </div>
                    </div>

                    <div >
                        <label htmlfor=" ProductDetails"
                            className="block my-2 text-left  
                                      text-sm font-medium text-gray-900 ">
                            Product Details
                        </label>
                        <textarea rows="6"
                            name=' ProductDetails'
                            id=' ProductDetails'
                            className="block p-2.5 w-full text-sm  
                                         text-gray-900 bg-gray-50 rounded-lg  
                                         shadow-sm border border-gray-300 "
                            placeholder="e.g. the colour of the product is blck  ...." />
                    </div>


                    <div className="pt-5 flex items-center justify-center w-full">
                        <label htmlfor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file"
                                name='dropzone-file' type="file" className="hidden" />
                        </label>
                    </div>



                    <div className='mt-6 item-center'>
                        <button type="submit"
                            className="mt-2 p-6  text-white   
                                   rounded-lg border-green-600  
                                   bg-purple-600 hover:scale-105">
                            Add product
                        </button>
                    </div>
                </form>
            </div>


            {/* </div> */}

        </>
    )
}

export default AddNewProduct