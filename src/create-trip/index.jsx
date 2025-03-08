import React, {useEffect, useState} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {Input} from "@/components/ui/input.jsx";
import {AI_PROMPT, SelectBudgetOptions, SelectTravelList} from "@/constants/options.jsx";
import {Button} from "@/components/ui/button.jsx";
import {toast} from "sonner";
import {chatSession} from "@/service/AIModal.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {db} from "@/service/firebaseConfig.jsx";
import { doc, setDoc } from "firebase/firestore";
import {useNavigate} from "react-router";

function CreateTrip() {
    const [place, setPlace] = useState()
    const [formData, setFormData] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useNavigate()

    const handleInputChange = (name, value) => {

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => console.log(error)
    });

    const onGenerateTrip = async () => {

        const user = localStorage.getItem('user')
        if (!user) {
            setOpenDialog(true)
            return;
        }

        if (formData?.duration > 5 && !formData?.location || !formData?.budget || !formData.participants) {
            toast("Please fill all details")
            console.log('Please enter duration less than 5');
        }

        setLoading(true)
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location.label)
            .replace('{totalDays}', formData?.duration)
            .replace('{traveler}', formData?.participants)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.duration)

        const result = await chatSession.sendMessage(FINAL_PROMPT)
        setLoading(false)
        saveAITrip(result?.response?.text())
    }

    const saveAITrip = async (trip) => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        const documentId = Date.now().toString()
        await setDoc(doc(db, "AITrips", documentId), {
            userSelection: formData,
            tripData: trip,
            userEmail: user?.email,
            id: documentId,
        })
        setLoading(false)
        router('/view-trip/' + documentId)
    }

    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'application/json',
            }
        }).then((res) => {
            console.log(res)
            localStorage.setItem('user', JSON.stringify(res.data))
            setOpenDialog(false)
            onGenerateTrip()
        })
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className="font-bold text-3xl">Write your travel preferences</h2>
            <p className="mt-3 text-gray-500">You only need to provide basic information, and our trip planner will recommend you a customized itinerary</p>
            <div className="mt-20 flex flex-col gap-9">
                <div>
                    <h2 className="text-xl my-3 font-medium">What is your destination?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (value) => {setPlace(value); handleInputChange('location', value)}
                        }}
                    />
                </div>
                <div>
                    <h2 className="text-xl my-3 font-medium">How many days are your trip?</h2>
                    <Input placeholder={'Ex.5'}
                           type={'number'}
                           onChange={(e) => handleInputChange('duration', e.target.value)}/>
                </div>
            </div>

            <div>
                <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
                <div className="grid grid-cols-3 gap-5 mt-5">
                    {SelectBudgetOptions.map((item, index) => (
                        <div key={index}
                             onClick={() => handleInputChange('budget', item.title)}
                             className={`p-4 border rounded-lg hover:shadow-lg 
                             ${formData?.budget === item.title && 'shadow-lg border-black'}`}>
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold text-lg">{item.title}</h2>
                            <h2 className="text-sm text-gray-500">{item.description}</h2>
                        </div>
                    ))}
                </div>

                <div>
                    <h2 className="text-xl my-3 font-medium">Who do you plan on travelling with?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectTravelList.map((item, index) => (
                            <div key={index}
                                 onClick={() => handleInputChange('participants', item.people)}
                                 className={`p-4 border rounded-lg hover:shadow-lg
                                 ${formData?.participants === item.people && 'shadow-lg border-black'}`}>
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.description}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="my-10 justify-end flex">
                <Button disables={loading} onClick={onGenerateTrip}>
                    {loading ?
                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> : "Generate trip"
                    }
                </Button>
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/ai-trip.svg" />
                            <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
                            <p>Sign in to the app securely with Google authentication</p>

                            <Button disabled={loading} onClick={login} className="w-full mt-5 flex gap-4 items-center">
                                <FcGoogle className="h-7 w-7"/>
                                Sign In with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default CreateTrip
