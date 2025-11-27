import ProductFilter from '@/components/common/filter';
import React from 'react'
    function ShopListing () {
  return (
<div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
  <ProductFilter/>
  <div></div>
</div>
  )
}

export default ShopListing;