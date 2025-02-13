import React, {useEffect, useState} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {Input} from "@/components/ui/input.jsx";
import {SelectBudgetOptions, SelectTravelList} from "@/constants/options.jsx";
import {Button} from "@/components/ui/button.jsx";

function CreateTrip() {
    const [place, setPlace] = useState()
    const [formData, setFormData] = useState([])

    const handleInputChange = (name, value) => {

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData]);

    const onGenerateTrip = () => {
        if (formData?.duration > 5) {
            console.log('Please enter duration less than 5');
        }
        console.log(formData)
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
                <Button onClick={onGenerateTrip}>Generate trip</Button>
            </div>

        </div>
    )
}

export default CreateTrip
