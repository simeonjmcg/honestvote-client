import React from 'react';

export interface PageProps {
    children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = (props: PageProps): React.ReactElement =>
    <div>
        { props.children }
    </div>;