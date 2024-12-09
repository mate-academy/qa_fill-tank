"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it(`should be full tank because 'amount' was not passed`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should be a full tank
      if the 'amount' is larger than the tank capacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1, 45);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should update 'fuelRemains'
      with the 'amount' of fuel the customer can pay for`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 11, 10);

    expect(customer.vehicle.fuelRemains).toBe(19);
  });

  it(`should leave a 'fuelRemains'
      if the customer can't pay for < 2 litres`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 90, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it(`'refueled fuel' should be rounded to the nearest tenth`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 2.5);

    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it(`'the cost of fuel' should be rounded to the nearest hundredth
      (to the nearest value)`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 49.99, 2.25);

    expect(customer.money).toBe(890.02);
  });

  it(`the tank should already be full`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 3.99, 40);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });
});
