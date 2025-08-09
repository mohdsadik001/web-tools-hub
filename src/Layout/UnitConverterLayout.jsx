import UnitConverter from '../tools/utility/UnitConverter'
import { Outlet } from 'react-router-dom'

const UnitConverterLayout = () => {
  return (
    <div className="mt-2 md:mt-16 flex flex-col px-6 md:px-16 lg:px-24 xl:px-32 py-4">
        <div className="flex flex-col items-end w-max">
        <p className="text-lg md:text-2xl font-medium uppercase">Unit Converters</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
        <div className='flex flex-col gap-4 mt-2 md:mt-8'>
          <div>
            <UnitConverter/>
          </div>
        <div className='w-[100%] border-1 border-gray-400 h-[70vh] p-2 md:p-4 min-w-70 rounded'>
                <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default UnitConverterLayout