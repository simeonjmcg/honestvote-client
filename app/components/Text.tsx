import React from 'react';

export interface TextProps {
    children?: React.ReactNode;
}

export const Text = (props: TextProps) => <div>{ props.children }</div>;
