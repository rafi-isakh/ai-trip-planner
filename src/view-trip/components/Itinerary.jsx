import React from 'react'
import PlaceCardItem from "@/view-trip/components/PlaceCardItem.jsx";

function Itinerary({ trip }) {

    const tripData = JSON.parse(trip?.tripData)
    const itinerary = tripData[0]?.travelPlan?.itinerary

    const dailyPlan = []
    Object.entries(itinerary).forEach(([, value]) => {
        dailyPlan.push(value)
    })
    console.log(dailyPlan)
    return (
        <div>
            <h2 className="font-bold text-lg">Places to Visit</h2>
            <div>
                {dailyPlan.map((item, index) => (
                    <div key={index}>
                        <h2 className="font-medium text-lg">Day {index + 1}</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {item.places.map((place, index) => (
                                <div key={index} className="my-3">
                                    <h2 className="font-medium text-sm text-orange-600">{item.bestTimeToVisit}</h2>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Itinerary
