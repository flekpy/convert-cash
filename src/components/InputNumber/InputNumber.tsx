type IInputProps = React.InputHTMLAttributes<HTMLInputElement>

export function InputNumber({ ...props }: IInputProps): JSX.Element {
  return (
    <input
      {...props}
      type="number"
      minLength={1}
      maxLength={79}
      placeholder="0"
      autoCorrect="off"
      autoComplete="off"
      spellCheck={false}
      inputMode="decimal"
      pattern="^[0-9]*[.,]?[0-9]*$"
    />
  )
}
