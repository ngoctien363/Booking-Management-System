import React from 'react'

export default function BtnStatus({text, children, ...props}) {
  return (
    <React.Fragment>
        {text ? <div className="inline-block w-4 h-4 mr-2 bg-green-400 rounded-full" {...props}></div> : <div className="inline-block w-4 h-4 mr-2 bg-yellow-300 rounded-full"></div>}
    </React.Fragment>
  )
}
