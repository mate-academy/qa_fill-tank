"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it("should be declared", () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it("should round the poured amount to the tenth part", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 4.8;

    fillTank(customer, fuelPrice, 20.78);

    expect(customer.vehicle.fuelRemains).toStrictEqual(28.7);
  });

  it("should order a full tank if the amount is not given", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 4.8;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toStrictEqual(40);
  });

  it("should pour only what fuel fits if the amount > tank", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 4.8;

    fillTank(customer, fuelPrice, 50);

    expect(customer.vehicle.fuelRemains).toStrictEqual(40);
  });

  it("should not pour if the amount is less than 2", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 4.8;
    const initialMoney = customer.money;

    expect(fillTank(customer, fuelPrice, 1)).toBeUndefined();

    expect(customer.money).toBe(initialMoney);
  });

  it("should round the price to the nearest hundredth part", () => {
    const customerForPriceTest = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPriceThousandthPart = 4.809;

    fillTank(customerForPriceTest, fuelPriceThousandthPart, 10);

    expect(customerForPriceTest.money).toStrictEqual(2951.91);
  });
});
