import {cleanup, fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import mockData from "../db.json"
import App from "./App";
import {AppService} from "./services/app.service";
import {WON} from "./common/constants";

describe('App', () => {
  const appService = new AppService()

  beforeEach(() => {
    jest.spyOn(appService, 'fetchProjects')
        .mockImplementation(
            () => new Promise((res) => setTimeout(() => res(mockData), 200))
        );
  });
  afterEach(() => {
    appService.fetchProjects.mockRestore();
    cleanup()
  });

  it('orders cards by earliest correctly', async () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    await waitFor(() => {
      const earliestButton = getByTestId("earliest-button")
      fireEvent.click(earliestButton);
      expect(getAllByTestId("date")[0]).toBeInTheDocument();
    });

    for (let i = 0; i < getAllByTestId("date").length - 1; i++) {
      const date1 = new Date(getAllByTestId("date")[i].innerHTML);
      const date2 = new Date(getAllByTestId("date")[i + 1].innerHTML);

      expect(date1.getTime()).toBeLessThanOrEqual(date2.getTime());
    }
  });

  it('orders cards by latest correctly', async () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    await waitFor(() => {
      const earliestButton = getByTestId("latest-button")
      fireEvent.click(earliestButton);
      expect(getAllByTestId("date")[0]).toBeInTheDocument();
    });

    for (let i = 0; i < getAllByTestId("date").length - 1; i++) {
      const date1 = new Date(getAllByTestId("date")[i].innerHTML);
      const date2 = new Date(getAllByTestId("date")[i + 1].innerHTML);

      expect(date2.getTime()).toBeLessThanOrEqual(date1.getTime());
    }
  });

  it('filter by status correctly', async () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    await waitFor(() => {
      const wrapperNode = getByTestId("status-selector")
      fireEvent.change(wrapperNode, { target: { value: WON } });

      expect(getAllByTestId("status")[0]).toBeInTheDocument();
    });


    for (let i = 0; i < getAllByTestId("status").length - 1; i++) {
      const text = getAllByTestId("status")[i];
      expect(text).toHaveTextContent(WON);
    }
  })

  it('filter by searching project name', async () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    await waitFor(() => {
      const wrapperNode = getByTestId("search-bar")

      fireEvent.change(wrapperNode, { target: { value: "T" } });

      expect(getAllByTestId("name")[0]).toBeInTheDocument();
      expect(getAllByTestId("name")).toHaveLength(21)
    });
  })
});
