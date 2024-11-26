"use client";

import React, { useState } from 'react';
import NavigationList from './components/NavigationList';
import NavigationForm from './components/NavigationForm';
import { NavigationItem } from './components/types';

const Home: React.FC = () => {
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);

  const addNavigation = (item: NavigationItem, parentId?: string) => {
    if (parentId) {
      const addToParent = (items: NavigationItem[]): NavigationItem[] =>
        items.map((nav) => {
          if (nav.id === parentId) {
            return { ...nav, children: [...(nav.children || []), item] };
          }
          return { ...nav, children: addToParent(nav.children || []) };
        });
      setNavigation((prev) => addToParent(prev));
    } else {
      setNavigation((prev) => [...prev, item]);
    }
  };

  const editNavigation = (id: string, updatedItem: NavigationItem) => {
    const updateItem = (items: NavigationItem[]): NavigationItem[] =>
      items.map((nav) =>
        nav.id === id
          ? updatedItem
          : { ...nav, children: updateItem(nav.children || []) }
      );
    setNavigation((prev) => updateItem(prev));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Navigation Editor</h1>
      <NavigationForm onAdd={addNavigation} />
      <NavigationList navigation={navigation} onReorder={setNavigation} onEdit={editNavigation} />
    </div>
  );
};

export default Home;
