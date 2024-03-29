const ButtonPill = ({children, ...props}) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-3" {...props}>
        {children}
    </button>
  )
}

ButtonPill.propTypes = {}

export default ButtonPill