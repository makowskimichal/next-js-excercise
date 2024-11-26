"use client";

import React, { useState } from 'react';
import { NavigationItem } from './types';

interface NavigationItemComponentProps {
  item: NavigationItem;
  level: number;
  onEdit: (id: string, updatedItem: NavigationItem) => void;
  onAddChild: (parentId: string, childItem: NavigationItem) => void;
}

const NavigationItemComponent: React.FC<NavigationItemComponentProps> = ({
  item,
  level,
  onEdit,
  onAddChild,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [editLabel, setEditLabel] = useState(item.label);
  const [editUrl, setEditUrl] = useState(item.url || '');
  const [childLabel, setChildLabel] = useState('');
  const [childUrl, setChildUrl] = useState('');

  const handleSave = () => {
    onEdit(item.id, { ...item, label: editLabel, url: editUrl });
    setIsEditing(false);
  };

  const handleAddChild = () => {
    if (!childLabel.trim()) {
      alert('Label is required for child navigation!');
      return;
    }
    const newChild: NavigationItem = {
      id: `${item.id}-${Date.now()}`,
      label: childLabel,
      url: childUrl,
      children: [],
    };
    onAddChild(item.id, newChild);
    setChildLabel('');
    setChildUrl('');
    setIsAddingChild(false);
  };

  return (
    <div className="flex flex-col space-y-2" style={{ marginLeft: level * 16 }}>
      <div className="flex items-center space-x-4">
        {!isEditing ? (
          <>
            <span className="font-bold">{item.label}</span>
            {item.url && <a href={item.url} className="text-blue-500 underline">{item.url}</a>}
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-black"
            >
              Edit
            </button>
            <button
              onClick={() => setIsAddingChild(!isAddingChild)}
              className="text-gray-500 hover:text-black"
            >
              {isAddingChild ? 'Cancel' : 'Add Child'}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              className="border rounded px-2"
            />
            <input
              type="text"
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
              className="border rounded px-2"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-2 rounded"
            >
              Save
            </button>
          </>
        )}
      </div>
      {isAddingChild && (
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            placeholder="Child Label"
            value={childLabel}
            onChange={(e) => setChildLabel(e.target.value)}
            className="border rounded px-2"
          />
          <input
            type="text"
            placeholder="Child URL (optional)"
            value={childUrl}
            onChange={(e) => setChildUrl(e.target.value)}
            className="border rounded px-2"
          />
          <button
            onClick={handleAddChild}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default NavigationItemComponent;
