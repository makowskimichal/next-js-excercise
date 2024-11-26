"use client";

import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import NavigationItemComponent from './NavigationItem';
import { NavigationItem } from './types';

interface NavigationListProps {
  navigation: NavigationItem[];
  onReorder: (newOrder: NavigationItem[]) => void;
  onEdit: (id: string, updatedItem: NavigationItem) => void;
}

const NavigationList: React.FC<NavigationListProps> = ({ navigation, onReorder, onEdit }) => {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = navigation.findIndex((item) => item.id === active.id);
      const newIndex = navigation.findIndex((item) => item.id === over.id);
      onReorder(arrayMove(navigation, oldIndex, newIndex));
    }
  };

  const renderNavigationItems = (items: NavigationItem[], level = 0) => (
    <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
      {items.map((item) => (
        <div key={item.id}>
          <NavigationItemComponent
            item={item}
            level={level}
            onEdit={onEdit}
            onAddChild={(parentId, childItem) => {
              const addChild = (items: NavigationItem[]): NavigationItem[] =>
                items.map((nav) =>
                  nav.id === parentId
                    ? { ...nav, children: [...(nav.children || []), childItem] }
                    : { ...nav, children: addChild(nav.children || []) }
                );
              onReorder(addChild(navigation));
            }}
          />
          {item.children && (
            <div className="ml-6">
              {renderNavigationItems(item.children, level + 1)}
            </div>
          )}
        </div>
      ))}
    </SortableContext>
  );
  

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {renderNavigationItems(navigation)}
    </DndContext>
  );
};

export default NavigationList;
