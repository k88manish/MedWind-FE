import React from "react";
import { shallow } from "enzyme";
import PlaceListItem from "../PlaceListItem";

describe("PlaceListItem testing", () => {
  const onEditMock = jest.fn();
  const onDeleteMock = jest.fn();
  const props = {
    location: { Name: "Test Name", Address: "Test Address", Lat: "1.111111", Lng: "12312132" },
    onEdit: onEditMock,
    onDelete: onDeleteMock
  };
  const component = shallow(<PlaceListItem {...props} />);

  it("should render properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("should call onEdit function when edit button clicked", () => {
    const btn = component.find(".edit-btn");
    btn.simulate("click");
    expect(onEditMock).toHaveBeenCalledTimes(1);
  });

  it("should call onDelete function when delete button clicked", () => {
    const btn = component.find(".delete-btn");
    btn.simulate("click");
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
