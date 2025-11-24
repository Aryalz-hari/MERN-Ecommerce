import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";




function AdminProductsTile({product}){
  
    return (
      <Card className="w-full max-w-sm mx-auto">
        <div>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          </div>
          <CardContent>
            <h2 className="text-2xl font-bold mt-2 mb-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              {/* Original Price */}
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>

              {/* Sale Price */}
              {product?.salePrice > 0 && (
                <span className="text-lg font-bold">${product.salePrice}</span>
              )}
            </div>
          </CardContent>
        </div>
        <CardFooter className="flex justify-between items-center">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </CardFooter>
      </Card>
    );
}

export default AdminProductsTile;