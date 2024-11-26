"use client";

import React, { useState } from 'react';
import { NavigationItem } from './types';
import { v4 as uuid } from 'uuid';

interface NavigationFormProps {
  onAdd: (item: NavigationItem, parentId?: string) => void;
}

const NavigationForm: React.FC<NavigationFormProps> = ({ onAdd }) => {
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [parentId, setParentId] = useState<string | null>(null);

  const handleAdd = () => {
    if (label.trim() === '') return alert('Label is required!');
    const newItem: NavigationItem = { id: uuid(), label, url };
    onAdd(newItem, parentId || undefined);
    setLabel('');
    setUrl('');
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="border rounded px-2 mr-2"
      />
      <input
        type="text"
        placeholder="URL (optional)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded px-2 mr-2"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
    </div>
  );
};

export default NavigationForm;
