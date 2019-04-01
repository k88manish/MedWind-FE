import React from "react";
import { shallow } from "enzyme";
import InputModalComponent from "../InputModalComponent";

describe("InputModalComponent testing", () => {
  const handleCloseMock = jest.fn();
  const handleConfirmMock = jest.fn();
  const props = {
    show: true,
    handleClose: handleCloseMock,
    handleConfirm: handleConfirmMock,
    message: "test",
    title: "test title"
  };
  const component = shallow(<InputModalComponent {...props} />);

  it("should render properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("should call handleClose function when close button clicked", () => {
    const btn = component.find(".close-btn");
    btn.simulate("click");
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call handleConfirm function when confirm button clicked", () => {
    const btn = component.find(".confirm-btn");
    btn.simulate("click");
    expect(handleConfirmMock).toHaveBeenCalledTimes(1);
  });
});
