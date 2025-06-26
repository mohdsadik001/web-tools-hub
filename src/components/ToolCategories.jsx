import { useAppContext } from "../Context/AppContext";

const ToolCategories = ({ categories }) => {
  const {navigate} = useAppContext();
  const handleClick = (categorySlug) => {
    navigate(`/tools/${categorySlug}`);
  };
  return (
    <div  className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tool Categories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div onClick={() => handleClick(category.slug)} key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.count} tools available
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolCategories;