import React, {useEffect, useState} from 'react'
import { IoMdShare } from "react-icons/io";
import {Button} from "@/components/ui/button.jsx";
import {GetPlaceDetails, PHOTO_REF_URL} from "@/service/GlobalApi.jsx";

function InfoSection({trip}) {

    const [photoUrl, setPhotoUrl] = useState('')
    useEffect(() => {
        trip && GetPlacePhoto()
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then( response => {
            const url = PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[1].name)
            setPhotoUrl(url)
            fetch(url)
                .then(res => res.blob())
                .then(imageBlob => {
                    const imageUrl = URL.createObjectURL(imageBlob)
                    setPhotoUrl(imageUrl)
                })
        })
    }
    return (
        <div>
            <img src={photoUrl ? photoUrl : "/placeholder.png"} className="h-[340px] w-full object-cover rounded-2xl" />
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
