import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import AddNewItem from "./AddNewItem";
import { useWindowSize } from 'react-use';

export function ItemModal() {
  const [open, setOpen] = React.useState(false);
  const { width } = useWindowSize();

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="px-6 py-4 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
      >
        Add Item
      </Button>
      <Dialog 
        open={open} 
        handler={handleOpen} 
        className={`z-50 ${width < 768 ? 'w-[calc(100%-20px)] left-0 transform -translate-x-1/2 top-[10vh]' : 'max-w-lg left-1/2 transform -translate-x-1/2 mx-auto top-1/4'}`}
        style={{
          position: 'fixed',
          // top: '30%',
          maxHeight: '80%',
          overflow: 'auto',
          background: '#e5e7eb',
        }}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader></DialogHeader>
        <DialogBody className="overflow-hidden">
          <Typography className="w-full">
          <AddNewItem />
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

export default ItemModal;