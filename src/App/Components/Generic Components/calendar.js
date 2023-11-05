<<<<<<< HEAD
//IMPORTS REFERENTES AO CALENDÁRIO
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";


//CALENDAR COMPONENT
export function DateRangeCalendarCurrentMonthCalendarPositionProp() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateRangeCalendar"]}>
          <DateRangeCalendar currentMonthCalendarPosition={2} enableFuture />
        </DemoContainer>
      </LocalizationProvider>
    );
  }
=======
// //IMPORTS REFERENTES AO CALENDÁRIO
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";


// //CALENDAR COMPONENT
// export function DateRangeCalendarCurrentMonthCalendarPositionProp() {
//     return (
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={["DateRangeCalendar"]}>
//           <DateRangeCalendar currentMonthCalendarPosition={2} enableFuture />
//         </DemoContainer>
//       </LocalizationProvider>
//     );
//   }
>>>>>>> aecb534166b45c5950fef30be0bf2837de9dc6fa
  