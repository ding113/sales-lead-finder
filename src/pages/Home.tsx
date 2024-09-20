// src/pages/Home.tsx

// 从 React 库中导入 React
import React from 'react';

// 从 react-router-dom 库中导入 useNavigate 钩子
import { useNavigate } from 'react-router-dom';

// 导入 SearchBar 组件
import SearchBar from '../components/SearchBar';

// 定义一个 Home 函数组件，类型为 React.FC（函数组件）
const Home: React.FC = () => {
  // 使用 useNavigate 钩子获取导航函数
  const navigate = useNavigate();

  // 定义处理搜索的函数，接收搜索词作为参数
  const handleSearch = (searchTerm: string) => {
    // 使用 navigate 函数导航到搜索结果页面，路径中包含编码后的搜索词
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  // 返回 JSX 元素，表示页面的结构和内容
  return (
    // 包裹内容的外层 div，应用了一些 Tailwind CSS 样式
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-200">
      {/* 内层 div，用于居中内容和限制宽度 */}
      <div className="text-center w-full px-4 max-w-4xl mx-auto">
        {/* 页面的标题，应用了一些 Tailwind CSS 样式 */}
        <h1 className="text-5xl sm:text-6xl font-bold text-blue-600 mb-4">销售易</h1>
        {/* 页面的副标题，应用了一些 Tailwind CSS 样式 */}
        <p className="text-xl sm:text-2xl mb-8 text-gray-600">找到您的理想客户</p>
        {/* 搜索栏组件，传递 handleSearch 函数作为 onSearch 属性 */}
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

// 导出 Home 组件，供其他模块使用
export default Home;