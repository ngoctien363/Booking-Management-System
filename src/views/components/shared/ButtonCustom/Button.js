// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

const Button = ({children, disabled=false, ...props}) => {
  const disabledClass = 'bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
  const btnClass = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3'
  return (
    <button className={`${disabled ? disabledClass : btnClass}`} {...props} disabled={disabled}>
        {children}
    </button>
  )
}

Button.propTypes = {}

export default Button