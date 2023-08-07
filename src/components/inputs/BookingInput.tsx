import moment from 'moment'
import { DateRangePicker } from 'react-date-range'

interface BookingInputProps {
  bookIn: Date | null
  bookOut: Date | null
  bookingOnChange: (startDate: Date, endDate: Date) => void
}

const BookingInput: React.FC<BookingInputProps> = ({
  bookIn,
  bookOut,
  bookingOnChange,
}) => {
  const bookingRange = {
    startDate: bookIn || moment().toDate(),
    endDate: bookOut || moment().toDate(),
    key: 'selection',
  }

  const handleSelectDate = (ranges: any) => {
    const startDate = moment(ranges.selection.startDate)
    const endDate = moment(ranges.selection.endDate)
    if (startDate.diff(endDate, 'days') === 0) {
      endDate.add(1, 'day')
    }
    bookingOnChange(startDate.toDate(), endDate.toDate())
  }

  return (
    <div
      className="p-8 bg-white h-fit w-fit rounded-3xl 
        shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)]"
    >
      <DateRangePicker
        ranges={[bookingRange]}
        minDate={new Date()}
        maxDate={moment().add(3, 'months').toDate()}
        rangeColors={['#374151']}
        onChange={handleSelectDate}
        startDatePlaceholder="Book in"
        endDatePlaceholder="Book out"
      />
    </div>
  )
}

export default BookingInput
