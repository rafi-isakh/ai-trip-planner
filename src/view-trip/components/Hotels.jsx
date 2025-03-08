import React from 'react'
import HotelCardItem from "@/view-trip/components/HotelCardItem.jsx";

function Hotels({trip}) {

    const tripData = JSON.parse(trip?.tripData)
    return (
        <div>
            <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {tripData[0]?.travelPlan?.hotelOptions.map((hotel) => (
                    <HotelCardItem hotel={hotel} />
                ))}
            </div>
        </div>
    )
}

export default Hotels
