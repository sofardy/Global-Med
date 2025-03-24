'use client';

import React, { useState } from 'react';
import * as Icons from '../../shared/ui/Icon';

export default function IconShowcase() {
  const [copiedName, setCopiedName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create an array of all icon components with their names
  const iconsList = Object.entries(Icons).map(([name, Component]) => ({
    name,
    Component
  }));
  
  // Filter icons based on search term
  const filteredIcons = iconsList.filter(icon => 
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle icon name click to copy to clipboard
  const handleCopyName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    
    // Hide notification after 2 seconds
    setTimeout(() => {
      setCopiedName('');
    }, 2000);
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Icon Component Showcase</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search icons..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="mb-4 text-gray-600">
        Showing {filteredIcons.length} of {iconsList.length} icons
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredIcons.map(({ name, Component }) => (
          <div key={name} className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            {Component && (
              <Component color="#000000" size={36} />
            )}
            <span 
              className="mt-2 text-sm text-gray-700 truncate w-full text-center cursor-pointer hover:text-blue-600"
              onClick={() => handleCopyName(name)}
              title={`Click to copy ${name}`}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
      
      {copiedName && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 rounded-md py-2 px-4 shadow-md transition-opacity">
          Copied: {copiedName}
        </div>
      )}
    </div>
  );
}