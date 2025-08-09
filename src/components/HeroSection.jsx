import { useAppContext } from "../Context/AppContext";

const HeroSection = () => {
  const { navigate } = useAppContext();
  return (
    <div className="bg-gradient-to-br from-green-50 to-indigo-100 py-6 md:py-20 h-screen md:h-[92vh overflow-scroll">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            All <span className="text-primary">Online Tools</span> in "One Box"
          
          </h1>
          <p className="text-xl text-gray-600 mb-4 mt-8">
            No need to bookmark the tools you like separately
          </p>
          <p className="text-lg text-gray-500 mb-8">
            WebTools Hub is a "free all-in-one toolbox" solution created to ease
            your life by preventing bookmark mess.
          </p>

          <div className="flex justify-center gap-4 mb-8 mt-8">
            <button
            onClick={() => navigate('/tools')}
             className="bg-primary text-white px-18 py-3 rounded-lg hover:bg-primary-dull transition-colors cursor-pointer">
              Explore Tools →
            </button>
        
          </div>

          

          {/* Category Icons */}
          <div className="flex flex-col justify-start items-start gap-6 mt-12 md:flex-row md:flex-wrap lg:flex-nowrap md:gap-18 text-nowrap md:mt-30 text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-blue-600 text-xl">📝</span>
              </div>
              <span className="text-xl">Text Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-purple-100 rounded flex items-center justify-center">
                <span className="text-purple-600 text-xl">📏</span>
              </div>
              <span className="text-xl">Conversion Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center">
                <span className="text-green-600 text-xl">🎨</span>
              </div>
              <span className="text-xl">Color</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-yellow-100 rounded flex items-center justify-center">
                <span className="text-yellow-600 text-xl">💻</span>
              </div>
              <span className="text-xl">Web</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                <span className="text-red-600 text-xl">🔧</span>
              </div>
              <span className="text-xl">Generators</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
