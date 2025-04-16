import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  Button,
  DialogBody
} from "@material-tailwind/react";

export default function ConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} handler={onClose} className="flex flex-col items-center">
      <DialogBody className="text-center" >
        เมื่อเปลี่ยนสถานะโพสต์ โพสต์ของคุณจะไม่ถูกมองเห็นในหน้าหลักแต่ยังคงอยู่ในโปรไฟล์ของคุณ
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={onClose} className="mr-1">
          <span className="text-2xl">ยกเลิก</span>
        </Button>
        <Button variant="gradient" onClick={onConfirm}>
          <span className="text-2xl">ยืนยัน</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
