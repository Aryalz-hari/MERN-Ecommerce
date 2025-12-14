import ProductFilter from '@/components/shopping-view/filter';
import { sortOptions } from '@/config';
import { Button } from '@/components/ui/button';
import { DropdownMenu, 
  DropdownMenuContent,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowUpDownIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import ProductDetailsDialog from '@/components/shopping-view/product-details';
import { useSearchParams } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
function createSearchParamsHelper(filterParams){
const queryParams=[];
for (const [key, value] of Object.entries(filterParams)) {
  if (Array.isArray(value) && value.length > 0) {
    const paramValue = value.join(",");

    queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
  }
}

console.log(queryParams, "queryParams");

return queryParams.join("&");
};

function ShopListing () {
  const location = useLocation();
  const dispatch= useDispatch();
  const{user}= useSelector((state)=>state.auth)
  const { productList,productDetails} = useSelector(
    (state) => state.shopProducts
  );
  const [filters, setFilters]= useState({});
  const [sort,setSort]= useState({});
  const [openDetailsDialog, setOpenDetailsDialog]= useState(false)
  const[searchParams, setSearchParams]= useSearchParams();

  function handleSort(value){
    console.log(value);
    setSort(value);
  }
 function handleFilter(getSectionId,getCurrentOption){
  console.log(getCurrentOption,getSectionId);
  let cpyFilters={...filters};
  const indexOfCurrentSection= Object.keys(cpyFilters).indexOf(getSectionId);

  if(indexOfCurrentSection===-1){
    cpyFilters={
      ...cpyFilters,
      [getSectionId]:[getCurrentOption],
    };
    
  }else {
    const indexOfCurrentOption=cpyFilters[getSectionId].indexOf(getCurrentOption);
    if(indexOfCurrentOption===-1)
      cpyFilters[getSectionId].push(getCurrentOption)
    else
      cpyFilters[getSectionId].splice(indexOfCurrentOption,1)
  }
  setFilters(cpyFilters);
  sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  console.log(cpyFilters, "filters");
 }
function handleAddtoCart(getCurrentProductId){
console.log(getCurrentProductId,'carted product')
dispatch(addToCart({ userId:user?.id, productId:getCurrentProductId, quantity:1 })).then((data) =>{
if (data?.payload?.success) {
  dispatch(fetchCartItems(user?.id));
  toast('Added to Cart');
}}
);
}
useEffect(() => {
  const storedFilters = sessionStorage.getItem("filters");
  const parsedFilters = storedFilters ? JSON.parse(storedFilters) : {};

  dispatch(
    fetchAllFilteredProducts({
      filterParams: parsedFilters,
      sortParams: null,
    })
  );
}, [dispatch, location.key]);

useEffect(()=>{
setSort('price-lowtohigh');
setFilters(JSON.parse(sessionStorage.getItem('filters'))||{})
},[])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

 useEffect(() => {
   if (filters !== null && sort !== null)
     dispatch(
       fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
     );
 }, [dispatch, sort, filters]);
 
 function handleGetProductDetails(getCurrentProductId){
console.log(getCurrentProductId);
dispatch(fetchProductDetails(getCurrentProductId))
 }


 useEffect(()=>{
if(productDetails!==null)
  setOpenDetailsDialog(true)
 },[productDetails])


  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter}/>
      <div className="bg-background rounded-lg w-full shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Products</h2>
          <div className="flex items-center gap-3 ">
            <span className="text-muted-foreground text-[20px]">
              {productList?.length}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center  gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[20px]">Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
    </div>
  );
}

export default ShopListing;