import React, {useEffect, useState} from 'react'
import { Link } from 'react-router'
import {Button} from "@/components/ui/button.jsx";
import { FaMapLocationDot } from "react-icons/fa6";
import {GetPlaceDetails, PHOTO_REF_URL} from "@/service/GlobalApi.jsx";

function PlaceCardItem({place}) {
    const [photoUrl, setPhotoUrl] = useState('')
    useEffect(() => {
        place && GetPlacePhoto()
    }, [place]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place?.placeName
        }

        await GetPlaceDetails(data).then( response => {
            const url = PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[0].name)
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
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank'>
            <div
                className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
                <img src={photoUrl ? photoUrl : "/placeholder.png"} alt={place?.placeName} className="w-[130px] h-[130px] rounded-xl object-cover" />
                <div>
                    <h2 className="font-bold text-lg">{place?.placeName}</h2>
                    <p className="text-sm text-gray-400">{place.placeDetails}</p>
                    <h2 className="mt-2">🕙 {place.timeTravel}</h2>
                    {/*<Button size="sm"><FaMapLocationDot /></Button>*/}
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem
