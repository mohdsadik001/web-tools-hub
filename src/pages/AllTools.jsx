import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import ToolCard from "../components/ToolCard";

const AllTools = () => {
  const { allTools, searchQuery } = useAppContext();
  const [filteredTools, setFilteredTools] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredTools(
        allTools.filter((tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }else{
      setFilteredTools(allTools)
    }
  }, [allTools, searchQuery]);
  return (
   <div className="mt-4 md:mt-16 md:px-12 flex flex-col px-4 py-4">
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All Tools</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3  mt-6'>
            {filteredTools.filter((tool) => tool.name).map((tool,index) => (
                <ToolCard key={index} tool={tool} />
            ))}
        </div>
    </div>
  )
};

export default AllTools;
