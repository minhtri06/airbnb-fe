import Counter from '@/components/inputs/Counter'
import { useState } from 'react'

const GuestInput = () => {
  const [numOfAdults, setNumOfAdults] = useState(0)
  const [numOfChildren, setNumOfChildren] = useState(0)
  const [numOfInfants, setNumOfInfants] = useState(0)
  const [numOfPets, setNumOfPets] = useState(0)

  return (
    <div
      className="absolute top-20 right-0 px-10 py-5 w-1/2 bg-white rounded-3xl 
        flex flex-col shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)]"
    >
      <Counter
        title="Adults"
        subTitle="Ages 13 or above"
        number={numOfAdults}
        setNumber={setNumOfAdults}
      />
      <hr />
      <Counter
        title="Children"
        subTitle="Ages 2–12"
        number={numOfChildren}
        setNumber={setNumOfChildren}
      />
      <hr />
      <Counter
        title="Infants"
        subTitle="Under 2"
        number={numOfInfants}
        setNumber={setNumOfInfants}
      />
      <hr />
      <Counter
        title="Pets"
        subTitle="Bringing a service animal?"
        number={numOfPets}
        setNumber={setNumOfPets}
      />
    </div>
  )
}

export default GuestInput
