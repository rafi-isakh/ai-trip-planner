import React from 'react'
import { IoMdShare } from "react-icons/io";
import {Button} from "@/components/ui/button.jsx";

function InfoSection({trip}) {
    return (
        <div>
            <img src="/placeholder.png" className="h-[340px] w-full object-cover rounded-2xl" />
            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">📆 {trip.userSelection?.duration} days</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">💵 {trip.userSelection?.budget} budget</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">👥 {trip.userSelection?.participants} person</h2>
                    </div>
                </div>
                <Button><IoMdShare /></Button>
            </div>
        </div>
    )
}

export default InfoSection
