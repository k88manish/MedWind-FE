import React from "react";
import { shallow } from "enzyme";
import ModalComponent from "../ModalComponent";

describe("ModelComponent testing", () => {
  const handleCloseMock = jest.fn();
  const props = {
    show: true,
    handleClose: handleCloseMock,
    message: "test",
    title: "test title"
  };
  const component = shallow(<ModalComponent {...props} />);

  it("should render properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("should call handleClose function when", () => {
    const btn = component.find(".close-btn");
    btn.simulate("click");
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
});
