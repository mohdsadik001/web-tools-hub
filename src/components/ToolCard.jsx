import { useAppContext } from "../Context/AppContext";

const ToolCard = ({ tool }) => {
    const { navigate } = useAppContext();
  return (
    <div onClick={() => {
        navigate(`/tools/${tool.category}/${tool.slug}`)
    }}
    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-primary text-xl flex-shrink-0">
          {tool.image}
        </div>
        <div className="flex justify-between h-full flex-col">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-dull transition-colors">
            {tool.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
          <span className="text-xs text-primary align-bottom">Open →</span>
        </div>
      </div>
    </div>
  );
};


export default ToolCard