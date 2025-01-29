/* eslint-disable quotes */
'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should return undefind', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 20, 1)).toBeUndefined();
  });

  it("should fill full tank if no 'amount' given", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it("should doing nothing if 'amount' = 0", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20, 0);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it("should fill only to 'maxTankCapacity", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20, 45);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it(`shouldn't  fill only what the client can pay for`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 20, 30);

    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it(`shouldn't fill if 'amount' < 2`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 20, 1);

    expect(customer.vehicle.fuelRemains).toBe(5);
  });

  it("shouldn't fill if client can pay for less than 2 'amount'", () => {
    const customer = {
      money: 20,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 20, 20);

    expect(customer.vehicle.fuelRemains).toBe(5);
  });

  it("should round the price to the nearest hundredth", () => {
    const customer = {
      money: 20,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 3.55676578, 13);

    expect(customer.vehicle.fuelRemains).toBe(10.6);
  });

  it('should round the fuel to the nearest tenth', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 3, 10.565656);

    expect(customer.vehicle.fuelRemains).toBe(15.5);
  });
});
