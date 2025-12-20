import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
    >
      <CardContent className="grid p-4 gap-4 ">
        <Label className="text-sm md:text-base">
          Address: {addressInfo?.address}
        </Label>
        <Label className="text-sm md:text-base">
          City: {addressInfo?.city}
        </Label>
        <Label className="text-sm md:text-base">
          pincode: {addressInfo?.pincode}
        </Label>
        <Label className="text-sm md:text-base">
          Phone: {addressInfo?.phone}
        </Label>
        <Label className="text-sm md:text-base">
          Notes: {addressInfo?.notes}
        </Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between ">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
