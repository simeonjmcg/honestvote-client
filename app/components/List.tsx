import React from "react";
import { List as ListMaterial } from "@material-ui/core";

export interface ListProps<Data> {
    data: Data[];
    renderRow: (row: Data, index?: number) => React.ReactElement | null;
    keyExtractor?: (item: Data, index: number) => string;
}

export function List <D extends {}>({ data, renderRow }: ListProps<D>) {
    return <ListMaterial>{data.map((row, index) => renderRow(row, index))}</ListMaterial>;
}