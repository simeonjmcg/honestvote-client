import React from 'react';

export interface ListItemProps {
    children?: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = (props: ListItemProps): React.ReactElement =>
    <div>
        { props.children }
    </div>;