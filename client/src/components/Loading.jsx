import React from 'react'

import { Typography } from "@material-tailwind/react";


function Loading() {
    return (
        <div className="loading-container flex items-center content-center h-screen animate-pulse ">
            <div className="loading-wrapper flex flex-col gap-[1rem] w-screen items-center  ">
                <Typography
                    as="div"
                    variant="h1"
                    className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>

                {[...Array(15)].map((_, index) => {
                    return (
                        <Typography
                            key={index}
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                    )
                })}
            </div>

        </div>
    )
}

export default Loading