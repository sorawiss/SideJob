import React from "react";
import {
    Dialog,
    Card,
    CardBody,
    Typography,
    Input,
} from "@material-tailwind/react";

export function LocationDialog( { formData, handleChange } ) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <>
            <button onClick={handleOpen} > {formData.location ? formData.location : "📍 สถานที่"} </button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            สถานที่
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            ใส่สถาณที่งานของคุณเพื่อให้ผู้อื่นได้รับรู้
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            สถาณที่
                        </Typography>
                        <Input label="สถาณที่" size="lg" name="location" onChange={handleChange} />
                    </CardBody>

                    <button onClick={handleOpen} className="
                    w-full bg-primarydark text-white h-[3rem] rounded-[16px] " >ยืนยัน</button>
                    

                </Card>
            </Dialog>
        </>
    );
}