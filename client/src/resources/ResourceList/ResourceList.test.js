import React from "react";
import { shallow } from "enzyme";
import ResourceList from "./ResourceList";

describe("ResourceList", () => {
  const resources = [
    { name: "Some Title", description: "A description", url: "http://example.org", created: 123 },
    { name: "Other Title", description: "Some other context text", url: "http://example.org", created: 122 },
    { name: "Something Else", description: "A different description", url: "http://example.org", created: 121 },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ResourceList resources={resources}/>);
  });

  it("renders the resources", () => {
    wrapper.update();
    expect(wrapper.find("Resource").length).toEqual(resources.length);
  });

  it("renders a search box", () => {
    expect(wrapper.find("Search").length).toEqual(1);
  });

  describe("when search performed", () => {
    it("should filter the resources by title", () => {
      wrapper.find("Search").props().search("title");
      wrapper.update();
      expect(wrapper.find("Resource").length).toEqual(2);
    });

    it("should filter the resources by description", () => {
      wrapper.find("Search").props().search("description");
      wrapper.update();
      expect(wrapper.find("Resource").length).toEqual(2);
    });
  });

  describe("when sort changed", () => {
    it("should re-order the resources", () => {
      wrapper.find("Sort").props().sort((r1, r2) => r1.name > r2.name);
      wrapper.update();
      expect(wrapper.find("Resource").map((r) => r.props().resource.name))
        .toEqual(["Other Title", "Some Title", "Something Else"]);
    });
  });
});
