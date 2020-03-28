import React from 'react';
import { Button } from '../../components';
import { render, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);
describe("<Button />", () => {
    it("renders without runtime errors", () => {
        render(<Button>button</Button>);
    });
    it("calls onPress when button is clicked", async () => {
        const onPress = jest.fn();
        const { findByText } = render(<Button onPress={onPress}>button</Button>);
        const btn = await findByText("button");
        fireEvent.click(btn);
        expect(onPress).toBeCalled();
    });
});
