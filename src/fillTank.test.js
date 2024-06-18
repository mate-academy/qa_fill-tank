"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  it(`should not pour if there is not enough money for 2 liters`, () => {
    const updatedCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(updatedCustomer, 3000, 20);

    expect(updatedCustomer).toEqual(customer);
  });

  it(`should pour if there is enough money for more than 2 liters`, () => {
    const updatedCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(updatedCustomer, 50, 20);

    expect(updatedCustomer.vehicle.fuelRemains).toBeGreaterThan(
      customer.vehicle.fuelRemains
    );
    expect(updatedCustomer.money).toBeLessThan(customer.money);
  });

  it("should pour the amount litres if there is enough money", () => {
    const updatedCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(updatedCustomer, 50, 10);

    expect(updatedCustomer.vehicle.fuelRemains).toBe(18);
    expect(updatedCustomer.money).toBe(2500);
  });

  it("should pour the maximum amount litres which can afford", () => {
    const updatedCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(updatedCustomer, 500, 20);

    expect(updatedCustomer.vehicle.fuelRemains).toBe(14);
    expect(updatedCustomer.money).toBe(0);
  });

  it("should not pour more than the tank capacity", () => {
    const updatedCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(updatedCustomer, 10, 40);

    expect(updatedCustomer.vehicle.fuelRemains).toBe(40);
    expect(updatedCustomer.money).toBeLessThan(customer.money);
  });
});
