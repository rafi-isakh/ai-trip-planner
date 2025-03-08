import React, {useEffect, useState} from 'react'
import {Link} from "react-router";
import {GetPlaceDetails, PHOTO_REF_URL} from "@/service/GlobalApi.jsx";

function HotelCardItem({hotel}) {
    const [photoUrl, setPhotoUrl] = useState('')
    useEffect(() => {
        hotel && GetPlacePhoto()
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
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

    const handleError = () => {
        setPhotoUrl("/placeholder.png")
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName} target='_blank'>
            <div className="hover:scale-105 transition-all cursor-pointer">
                <img src={photoUrl ? photoUrl : "/placeholder.png"} className={photoUrl ? 'rounded-lg h-[125px] object-cover' : 'rounded-lg object-cover'} />
                <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium">{hotel?.hotelName}</h2>
                    <h2 className="text-xs text-gray-500">📍 {hotel?.address}</h2>
                    <h2 className="text-sm ">💲 {hotel?.price}</h2>
                    <h2 className="text-sm ">⭐ {hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem
