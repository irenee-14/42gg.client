import { DateInputProps } from 'types/aganda/InputPropTypes';
import Input from './Input';
function parseTen(num: number, tenCount: number): string {
  return num < tenCount ? '0' + num : num.toString();
}

function parseDate(date: Date): string {
  return `${date.getFullYear()}-${parseTen(date.getMonth() + 1, 10)}-${parseTen(
    date.getDay() + 1,
    10
  )}T${parseTen(date.getHours() + 1, 10)}:${parseTen(
    date.getMinutes() + 1,
    10
  )}`;
}

const DateStep = -1717768479615; // 2일 차이

const DateInput = ({
  name,
  label,
  min,
  max,
  defaultValue,
  ...rest
}: DateInputProps) => {
  if (min !== undefined) {
    min = parseDate(new Date(Date.now() + DateStep)); // 현재 날짜에서 2일 뒤로 설정
  }
  if (max !== undefined) {
    max = '2028-12-12'; // 한계 날짜? 임의로 설정
  }
  if (!defaultValue) {
    defaultValue = parseDate(new Date());
  }

  // useEffect(() => {
  //   const dateControl = document.getElementById(name) as HTMLInputElement;
  //   if (dateControl?.defaultValue && defaultValue)
  //     dateControl.defaultValue = defaultValue;
  //   console.log(defaultValue);
  // });
  return (
    <Input
      name={name}
      label={label}
      type='datetime-local'
      defaultValue={defaultValue}
      {...rest}
    />
    // <input
    //   id='party'
    //   name='partydate'
    //   // defaultValue='2017-06-01T08:30'
    // />
  );
};

export default DateInput;
