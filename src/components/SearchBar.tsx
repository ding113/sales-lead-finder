// src/components/SearchBar.tsx
// 从 React 库中导入必要的模块，useState 用于管理组件的状态
import React, { useState } from 'react';

// 定义 SearchBar 组件的属性接口，onSearch 是一个接受字符串参数的函数，initialValue 是一个可选的字符串
interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // onSearch 函数用于处理搜索逻辑
  initialValue?: string; // initialValue 是一个可选的初始搜索词
}

// 创建 SearchBar 组件，使用 React.FC 类型来标记为函数组件，并接收 SearchBarProps 作为属性
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  // 使用 useState 钩子来管理搜索词的状态，初始化为 initialValue 或空字符串
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // 定义一个处理表单提交的函数，e 是表单事件对象
  const handleSubmit = (e: React.FormEvent) => {
    // 阻止表单默认提交行为，以避免页面刷新
    e.preventDefault();
    // 调用传入的 onSearch 函数，并传递当前的 searchTerm 作为参数
    onSearch(searchTerm);
  };

  // 返回组件的 JSX 结构
  return (
    // 表单元素，绑定 onSubmit 事件以处理提交
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      {/* 包含输入框和按钮的容器，flex 布局 */}
      <div className="flex">
        {/* 输入框，用于输入搜索词 */}
        <input
          type="text" // 输入框的类型为文本
          value={searchTerm} // 输入框的值绑定到 searchTerm 状态
          onChange={(e) => setSearchTerm(e.target.value)} // 输入变化时更新 searchTerm 状态
          placeholder="输入产品类型、行业或地区" // 输入占位符
          className="flex-grow px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
        {/* 提交按钮 */}
        <button
          type="submit" // 按钮类型为提交
          className="px-6 py-3 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
        >
          搜索
        </button>
      </div>
    </form>
  );
};

// 导出 SearchBar 组件，以便在其他模块中使用
export default SearchBar;