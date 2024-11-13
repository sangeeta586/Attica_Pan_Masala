import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import AddNewProduct from "../../Components/AddNewProduct";

export function Modal() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button
        onClick={handleOpen}
        className="px-6 py-4 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
      >
        Add Product
      </Button>
      <Dialog open={open} handler={handleOpen} width="max-w-2xl" className="w-1/2 left-1/4 top-48 bg-gray-100" >
        <DialogHeader></DialogHeader>
        <DialogBody className="overflow-hidden">
          <Typography className="">
            <AddNewProduct />
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}




