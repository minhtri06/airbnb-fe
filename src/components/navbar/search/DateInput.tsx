import useSearchStore from '@/hooks/contexts/useSearchStore'
import moment from 'moment'
import { DateRangePicker } from 'react-date-range'

interface DateInputProps {
  selectedInput: 'location' | 'book-in' | 'book-out' | 'who'
  setSelectedInput: (value: 'location' | 'book-in' | 'book-out' | 'who') => void
}

const DateInput: React.FC<DateInputProps> = ({
  selectedInput,
  setSelectedInput,
}) => {
  const {
    params: { bookIn, bookOut },
    setParams,
  } = useSearchStore()

  const bookingRange = {
    startDate: bookIn || moment().toDate(),
    endDate: bookOut || moment().add(2, 'days').toDate(),
    key: 'selection',
  }

  const handleSelectDate = (ranges: any) => {
    if (selectedInput === 'book-in') {
      setSelectedInput('book-out')
    }
    setParams({
      bookIn: ranges.selection.startDate,
      bookOut: ranges.selection.endDate,
    })
  }

  return (
    <div
      className="p-8 bg-white h-fit w-fit m-auto rounded-3xl 
      shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)]"
    >
      <DateRangePicker
        ranges={[bookingRange]}
        minDate={new Date()}
        maxDate={moment().add(3, 'months').toDate()}
        rangeColors={['#fd5b61']}
        onChange={handleSelectDate}
        startDatePlaceholder="Book in"
        endDatePlaceholder="Book out"
      />
    </div>
  )
}

export default DateInput
