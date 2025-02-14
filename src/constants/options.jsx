export const SelectTravelList = [
    {
        id: 1,
        title: "Just Me",
        description: "A solo traveler in exploration",
        icon: '✈',
        people: '1'
    },
    {
        id: 2,
        title: "A couple",
        description: "Two travelers in romance",
        icon: '🥂',
        people: '2 persons'
    },
    {
        id: 3,
        title: "Family",
        description: "A group of loving family",
        icon: '🏡',
        people: '3 to 5 persons'
    },
    {
        id: 4,
        title: "Friends",
        description: "Fellow adventurers",
        icon: '😬',
        people: '5 to 10 persons'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        description: "Stay conscious of costs",
        icon: '💸'
    },
    {
        id: 2,
        title: "Moderate",
        description: "Keep cost on the average side",
        icon: '💸'
    },
    {
        id: 3,
        title: "Luxury",
        description: "No worry about cost",
        icon: '💸'
    },
]

export const AI_PROMPT="Generate Travel Plan for Location: {location}, "
    + "for {totalDays} days for {traveler} with a {budget} budget. "
    + "Give me hotels options list with hotel name, address, price, hotel image url, geo coordinates, "
    + "rating, descriptions, and suggest itinerary with place name, place details, place image url, "
    + "geo coordinates, ticket pricing, time travel each of the location for {totalDays} days with "
    + "each day plan with best time to visit in JSON format"