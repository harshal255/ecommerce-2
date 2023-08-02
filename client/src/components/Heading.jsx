/* eslint-disable react/prop-types */



const Heading = ({mainTitle,smallTitle}) => {
    return (
        <>
            <h2 className='font-bold md:text-2xl text-base  text-center mt-5 flex items-center justify-center'> <hr className="mx-4  md:ml-8 md:mr-4 w-16 h-[3px] bg-black border-0 rounded  " />{mainTitle}<hr className="mx-4 md:ml-4 md:mr-8 w-16 h-[3px]  bg-black border-0 rounded  " /></h2>
            <div className='italic text-gray-600 text-center'>{smallTitle}</div>
        </>
    )
}

export default Heading
