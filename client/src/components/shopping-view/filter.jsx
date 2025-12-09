import { Fragment } from "react";
import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
 function ProductFilter({filters, handleFilter}){
    return (
      <div className="bg-background rounded-lg shadow-sm ">
        <div className="p-4 border-b">
          <h2 className="font-bold text-2xl">Filters</h2>
        </div>
        <div className="p-y space-y-4 w-full">
          {Object.keys(filterOptions).map((keyItem) => (
            <Fragment>
              <div>
                <h3 className="text-2xl font-bold capitalize ">{keyItem}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label className="flex items-center gap-2 font-medium  text-[20px]">
                      <Checkbox
                        className="border-2 border-gray-700"
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
              <Separator />
            </Fragment>
          ))}
        </div>
      </div>
    );
 }
 export default ProductFilter;