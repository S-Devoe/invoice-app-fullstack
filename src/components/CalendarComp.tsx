import { motion } from "framer-motion";
import Calendar from "react-calendar";
import { RefObject } from "react";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

interface Props {
  onChange: (date: Date) => void;
  calendarRef: RefObject<HTMLInputElement>;
  date: Date;
}

const CalendarComp: React.FC<Props> = ({ calendarRef, date, onChange }) => {
  return (
    <CalendarContainer
      as={motion.div}
      initial={{ scale: 0.65 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
    >
      <Calendar
        // showNeighboringMonth={false}
        minDetail={"decade"}
        inputRef={calendarRef}
        minDate={new Date()}
        next2Label={null}
        prev2Label={null}
        onChange={(date: Date) => onChange(date)}
        value={date}
      />
    </CalendarContainer>
  );
};
export default CalendarComp;

const CalendarContainer = styled.div`
  width: 90%;
  max-width: 30rem;
  background-color: ${({ theme }) => theme.color.form.bg};
  position: absolute;
  top: 6rem;
  left: 5%;
  z-index: 15;
  padding: 1.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.25) 0px 7px 29px 0px;
  

  .react-calendar {
    width: auto;
    border: none;
    font-family: inherit;
    background-color: ${({ theme }) => theme.color.form.bg};

    &__navigation__label {
      color: ${({ theme }) => theme.color.calendar.text};
      font-weight: bold;
      border: none;
    }

    &__navigation__arrow {
      color: #7c5dfa;
      font-size: 1.3rem;
      margin-top: -0.2rem;
      font-weight: bold;
      border: none;
    }

    &__navigation button:enabled:hover,
    &__navigation button:enabled:focus {
      background: none;
    }
    &__navigation button[disabled] {
      background: none;
    }

    &__month-view__weekdays__weekday {
      color: ${({ theme }) => theme.color.calendar.text};
    }
    &__month-view__days__day--weekend {
      color: ${({ theme }) => theme.color.calendar.text};
    }

    &__tile {
      max-width: 100%;
      text-align: center;
      border: none;
      background: none;
      font-weight: 500;
      color: ${({ theme }) => theme.color.calendar.text};
    }

    &__tile:disabled {
      background: none;
      color: ${({ theme }) => theme.color.calendar.disabled};
      cursor: pointer;
    }
    &__tile:enabled:hover,
    &__tile:enabled:focus {
      background: none;
    }
    &__tile--now {
      background: none;
    }

    &__tile--now:enabled:hover,
    &__tile--now:enabled:focus {
      background: none;
    }
    &__tile--hasActive {
      background: none;
    }
    &__tile--hasActive:enabled:hover,
    &__tile--hasActive:enabled:focus {
      background: none;
    }
    &__tile--active {
      background: none;
      color: #7c5dfa;
      font-weight: bold;
    }
    &__tile--active:enabled:hover,
    &__tile--active:enabled:focus {
      background: none;
    }
    &--selectRange &__tile--hover {
      background-color: none;
    }
  }

  @media screen and (min-width: 768px) {
    min-width: 20rem;
    width: 100%;
    max-width: 50rem;
    left: .5rem;
    margin-right: -10px;
  }
`;


