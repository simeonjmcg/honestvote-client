import React from 'react';

export interface ListProps<Data = any> {
    data: Data[];
    renderRow: (row: Data, index?: number) => React.ReactElement | null;
    keyExtractor?: (item: Data, index: number) => string;
}

export const List = <D extends {}>({ data, renderRow }: ListProps<D>) =>
    <div>{data.map((row, index) => renderRow(row, index))}</div>;