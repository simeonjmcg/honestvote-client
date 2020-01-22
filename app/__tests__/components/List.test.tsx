import React from 'react';
import { List, ListItem } from '../../components';
import { render } from "@testing-library/react";

describe("<List />", () => {
    it("renders without runtime errors", () => {
        render(<List data={[]} renderRow={() => null}/>);
    });
    it("renders full list", () => {
        const data = [{ id: 1, item: "item" }, { id: 2, item: "item" }, { id: 3, item: "item" }];
        const {getAllByText} = render(<List data={data} renderRow={(o, i) => <ListItem key={i} title={o.item} />}/>);
        expect(getAllByText("item")).toHaveLength(3);
    });
});
