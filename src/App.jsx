import { useState } from 'react'
import './App.css'
import {Button} from "@/components/ui/button.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>AI Trip Planner</h2>
        <Button>Explore</Button>
    </>
  )
}

export default App
