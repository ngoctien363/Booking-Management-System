import {Link} from 'react-router-dom';
import logo from '../../../assets/logo.png'

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    style={{width: '5.5rem', height: '5.5rem'}}
                    className="h-14 w-14 rounded-lg"
                    src={logo}/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-white mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-sky-400/100 hover:text-sky-400/75">
                {linkName}
            </Link>
            </p>
        </div>
    )
}