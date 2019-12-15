import React from 'react';

/** Properties of View */
export interface ViewProps {
    children?: React.ReactNode;
}

/** User interface View */
export const View = (props: ViewProps) => <div>{ props.children }</div>;
