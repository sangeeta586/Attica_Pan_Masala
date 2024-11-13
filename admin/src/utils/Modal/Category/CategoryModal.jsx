import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import AddNewCategory from "./AddNewCategory";
import Styles from "../../../Styles/Styles.css";
import { useWindowSize } from 'react-use';

export function CategoryModal() {
  const [open, setOpen] = React.useState(false);
  const { width } = useWindowSize();

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="px-6 py-4 rounded-lg hover:scale-105 AddBtn"
      >
        Add Category
      </Button>
      <Dialog 
        open={open} 
        handler={handleOpen} 
        className={`z-50 ${width < 768 ? 'w-[calc(100%-20px)] left-0 transform -translate-x-1/2 top-1/4' : 'max-w-lg left-1/2 transform -translate-x-1/2 mx-auto top-1/4'}`}
        style={{
          position: 'fixed',
          maxHeight: '80%',
          overflow: 'auto',
          background: '#e5e7eb',
        }}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="Bg"></DialogHeader>
        <DialogBody className="overflow-hidden Bg">
          <Typography className="w-full">
            <AddNewCategory />
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2 Bg">
          <Button className="CancleBtn BtnRound BtnCancle bg-red-400" variant="text" color="blue-gray" onClick={handleOpen}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default CategoryModal;


