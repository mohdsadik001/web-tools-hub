import { useAppContext } from "../Context/AppContext";

const Footer = () => {
  const {navigate} = useAppContext();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div onClick={()=> navigate('/')} className="flex items-center gap-2 mb-4 cursor-pointer">
              <div className="w-24 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-md">Webtools</span>
              </div>
              <span className="text-xl font-bold">Hub</span>
            </div>
            <p className="text-gray-400 text-sm">
              All online tools in one place. No need to bookmark them separately.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Text Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Image Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CSS Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Coding Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 10015.io. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer