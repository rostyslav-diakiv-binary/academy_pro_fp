import React, { Component } from "react";
import "./App.css";
import { dateOrders, DateOrder } from "./data";
import {
  arrayDifference,
  checkIfContainsSpecifiedProps,
  capitalizeProperty,
  addDollarSignToProperty,
  byDate,
  groupByWithPropsTyped,
  sumRecursively,
  multiplyRecursively,
  groupBy
} from "./functions";

class App extends Component {
  render() {
    const validOrders = dateOrders.filter(
      checkIfContainsSpecifiedProps(["date", "name", "price"])
    );
    const invalidOrders = arrayDifference(dateOrders, validOrders);

    const resultMatrix: { [key: string]: Partial<DateOrder>[] } = validOrders
      .map(capitalizeProperty("name"))
      .map(addDollarSignToProperty("price"))
      .sort(byDate("date"))
      .reduce(groupByWithPropsTyped("date", ["name", "price"]), {});

    const resultMatrix2 = validOrders
      .map(capitalizeProperty("name"))
      .map(addDollarSignToProperty("price"))
      .sort(byDate("date"));

    const resultMatrix3 = groupBy(resultMatrix2, "date");
    for (let k in resultMatrix3) {
      resultMatrix3[k].forEach((element: DateOrder) => {
        delete element.date;
      });
    }
    console.log(resultMatrix3);

    console.log(sumRecursively(1, 2, 4, 6, 8, 9, 0));
    console.log(multiplyRecursively(1, 2, 3, 4, 5, 6));

    return (
      <div className="App">
        <header className="App-header">
          <table id="valid-board">
            <tbody>
              {Object.keys(resultMatrix).map((item: string, index: number) => {
                return (
                  <tr key={index} id={`row${index}`}>
                    <th>{item}</th>
                    {resultMatrix[item].map(
                      (dataItem: any, dataItemIndex: number) => {
                        return (
                          <td
                            key={`${index}-${dataItemIndex}`}
                            id={`cell${index}-${dataItemIndex}`}
                          >
                            {dataItem.name} - {dataItem.price}
                          </td>
                        );
                      }
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>Invalid Orders: </p>
          {invalidOrders.map((item, index) => {
            return (
              <p>
                {item.date} - {item.name} - {item.price}
              </p>
            );
          })}
        </header>
      </div>
    );
  }
}

export default App;
