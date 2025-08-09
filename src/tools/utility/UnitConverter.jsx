import { useAppContext } from '../../Context/AppContext'

const UnitConverter = () => {
    const { navigate } = useAppContext();
  return (
       
        <div className='w-full grid grid-cols-1 gap-2 md:grid-cols-5'>
            <button onClick={()=> navigate('tools/utility/unit-converter/length')}     className='border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full'>Length Converter</button>
            <button onClick={()=> navigate('tools/utility/unit-converter/tempreture')} className='border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full'>Tempreture Converter</button>
            <button onClick={()=> navigate('tools/utility/unit-converter/time')}       className='border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full'>Time Converter</button>
            <button onClick={()=> navigate('tools/utility/unit-converter/area')}       className='border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full'>Area Converter</button>
            <button onClick={()=> navigate('tools/utility/unit-converter/mass')}       className='border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full'>Mass Converter</button>
        </div>
  )
}

export default UnitConverter