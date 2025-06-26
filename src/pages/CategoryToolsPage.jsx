import { useParams } from "react-router-dom";

const CategoryToolsPage = () => {
  const { category } = useParams();

  // Filter your tools list based on the `category`
  const filteredTools = allTools.filter(tool => tool.category === category);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 capitalize">{category} Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default CategoryToolsPage;
