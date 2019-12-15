import React from 'react';

export interface PageProps {
    children?: React.ReactNode;
}

export const Page = ({ children }: PageProps) =>
    <div>{ children }</div>;