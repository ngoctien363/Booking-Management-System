export default function FormAction({
    loading,
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                disabled={loading}
                type={action}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1da1f2] hover:bg-[#7dd3fc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:outline-blue-500 mt-10"
                onSubmit={handleSubmit}
            >

                {text}
            </button>
            :
            <></>
        }
        </>
    )
}