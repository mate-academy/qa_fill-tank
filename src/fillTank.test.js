/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it("If the `amount` is not given, then full tank is ordered", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20);

    expect(customer).toEqual({
      money: 2360,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it("Pour only what will fit, if the `amount` is greater than the tank can accommodate", () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 2,
      },
    };

    fillTank(customer, 60, 40);

    expect(customer).toEqual({
      money: 20,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 35,
      },
    });
  });

  it("Always fill in only what the client can pay", () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 40, 60);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 55,
      },
    });
  });

  it("Round the poured amount by discarding number to the tenth part", () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 28, 15.552);

    expect(customer).toEqual({
      money: 1566,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 25.5,
      },
    });
  });

  it("If the poured amount is less than 2 liters, do not pour at all", () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 34,
      },
    };

    fillTank(customer, 89, 1);

    expect(customer).toEqual({
      money: 4000,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 34,
      },
    });
  });

  it("Round the price of the purchased fuel the to the nearest hundredth part", () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 48,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 65.869, 14);

    expect(customer).toEqual({
      money: 3077.83,
      vehicle: {
        maxTankCapacity: 48,
        fuelRemains: 34,
      },
    });
  });
});
