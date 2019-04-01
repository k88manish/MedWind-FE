import React from "react";
import { shallow } from "enzyme";
import App from "../App";

const locationsResponse = [{ _id: "a", Name: "a", Lat: "a", Lng: "a", Address: "a" }];

const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};

describe("App Screen test", () => {
  fetch.once(JSON.stringify(locationsResponse));
  const component = shallow(<App />);
  it("should render correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("on ComponentDidMount it should call getAllLocation function - positive scenario", () => {
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/location");
    expect(component.state("locations")).toEqual(locationsResponse);
  });

  it("on ComponentDidMount it should call getAllLocation function - negative scenario", async () => {
    fetch.resetMocks();
    fetch.once(JSON.stringify({ error: "Missing Required fields" }), { status: 500 });
    const wrapper = shallow(<App />);
    await flushPromises();
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/location");
    expect(wrapper.state("message")).toEqual("Missing Required fields");
  });

  it("on Place input change", () => {
    component.find(".place-input").simulate("change", { target: { value: "xyz" } });
    expect(component.state("place")).toEqual("xyz");
  });

  it("on add button click should add new location to map", async () => {
    fetch.resetMocks();
    const newLocation = { ...locationsResponse[0], _id: "b" };
    fetch.once(JSON.stringify(newLocation));
    component.find(".add_btn").simulate("click");
    await flushPromises();
    expect(component.state("locations")).toHaveLength(2);
  });

  it("onEdit confirm it should reload all the locations", async () => {
    fetch.resetMocks();
    component.setState({ locationToEdit: locationsResponse[0] });
    fetch.once(JSON.stringify(locationsResponse[0])).once(JSON.stringify([Object.assign(locationsResponse[0], { Name: "new Place" })]));
    component
      .find("InputModalComponent")
      .first()
      .props()
      .handleConfirm("new place");
    await flushPromises();
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[0][0]).toEqual("/location/a");
    expect(component.state("locations")).toHaveLength(1);
  });

  it("onEdit show input model", async () => {
    component.setState({ showInputModal: false });
    component
      .find("PlaceListItem")
      .first()
      .props()
      .onEdit(locationsResponse[0]);
    expect(component.state("showInputModal")).toEqual(true);
  });

  it("onDelete it should reload all the locations", async () => {
    fetch.resetMocks();
    fetch.once(JSON.stringify(locationsResponse[0])).once(JSON.stringify([]));
    component
      .find("PlaceListItem")
      .first()
      .props()
      .onDelete(locationsResponse[0]);
    await flushPromises();
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[0][0]).toEqual("/location/a");
    expect(component.state("locations")).toHaveLength(0);
  });
});
