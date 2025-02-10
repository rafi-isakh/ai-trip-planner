import React from 'react'
import {Button} from "@/components/ui/button.jsx";

function Header() {
    return (
        <div className="p3 shadow-sm flex justify-between items-center px-5">
            <img src='/ai-trip.svg'  alt="logo"/>
            <div>
                <Button>Sign In</Button>
            </div>
        </div>
    )
}

export default Header
