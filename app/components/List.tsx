import React from 'react';

export interface ListProps<Data = any> {
    data: Data[];
    renderRow: (row: Data, index?: number) => React.ReactNode;
}

export const List = <D extends {}>(props: ListProps<D>): React.ReactElement =>
    <div>
        {props.data.map((row, index) => props.renderRow(row, index))}
    </div>;