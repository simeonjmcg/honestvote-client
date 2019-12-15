import React from 'react';

export interface ListItemProps {
    children?: React.ReactNode;
}

export const ListItem = ({ children }: ListItemProps) =>
    <div>{ children }</div>;