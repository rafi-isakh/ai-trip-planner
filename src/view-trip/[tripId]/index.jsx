import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import {db} from "@/service/firebaseConfig.jsx";
import {doc, getDoc} from "firebase/firestore"
import {toast} from "sonner";
import InfoSection from "@/view-trip/components/InfoSection.jsx";
import Hotels from "@/view-trip/components/Hotels.jsx";
import Itinerary from "@/view-trip/components/Itinerary.jsx";
import Footer from "@/view-trip/components/Footer.jsx";

function ViewTrip() {

    const {tripId} = useParams()
    const [trip, setTrip] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTripData = async () => {
            const docRef = doc(db, 'AITrips', tripId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document: ", docSnap.data())
                setTrip(docSnap.data())
            }
            else {
                console.log("Document not found.")
                toast("No trip found.")
            }
            setLoading(false)
        }

        if (tripId) {
            getTripData()
        }
    },[tripId])

    if (loading) {
        return <div>Loading...</div>;  // Render a loading indicator
    }

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            <InfoSection trip={trip} />
            <Hotels trip={trip} />
            <Itinerary trip={trip} />
            <Footer />
        </div>
    )
}

export default ViewTrip
