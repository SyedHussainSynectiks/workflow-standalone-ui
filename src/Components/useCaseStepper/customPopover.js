import React from 'react'
import "./stepper.css"
import Image from 'next/image';
import samosa from "../../../public/assets/samosa.svg"

const CustomPopover = ({ content, visible, placement }) => {
    return (
        <div className={`custom-popover ${visible ? "visible" : ""} ${placement}`}>
<<<<<<< HEAD
            {/* Samosa icon on top if placement is bottom */}
            {placement === "bottom" && (
                <div className="samosa-top">
                    {/* Add your samosa icon or SVG here */}
                    <Image src={samosa} />
                </div>
            )}
            {/* Content */}
            {content}
            {/* Samosa icon on bottom if placement is top */}
            {placement === "top" && (
                <div className="samosa-bottom">
                    {/* Add your samosa icon or SVG here */}
                    <Image className="uc-tr" src={samosa} />
                </div>
            )}
        </div>
    );
};


export default CustomPopover
=======
        {/* Samosa icon on top if placement is bottom */}
        {placement === "bottom" && (
            <div className="samosa-top">
                {/* Add your samosa icon or SVG here */}
                <Image src={samosa}/>
            </div>
        )}
        {/* Content */}
        {content}
        {/* Samosa icon on bottom if placement is top */}
        {placement === "top" && (
            <div className="samosa-bottom">
                {/* Add your samosa icon or SVG here */}
                <Image src={samosa}/>
            </div>
        )}
    </div>
);
};


export default CustomPopover
>>>>>>> aa2ce9168112359b54e43831b0aa84f316c69b74
