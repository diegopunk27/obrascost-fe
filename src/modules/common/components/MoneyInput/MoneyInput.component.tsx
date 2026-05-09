import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { NumericFormat } from 'react-number-format';

interface Props extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
}

const MoneyInput = ({ value, onChange, ...rest }: Props) => (
  <NumericFormat
    {...(rest as Record<string, unknown>)}
    value={value}
    onValueChange={(values) => onChange(values.value)}
    thousandSeparator="."
    decimalSeparator=","
    decimalScale={2}
    allowNegative={false}
    prefix="$ "
    customInput={TextField}
  />
);

export default MoneyInput;
