'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it("doesn't return anything", () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    expect(fillTank(customer)).toBe(undefined);
  });

  it('orders full tank if amount is not passed', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toEqual(
      customer.vehicle.maxTankCapacity
    );
  });

  it("fills full tank if 'amount' > 'maxTankCapacity'", () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 50, 50);

    expect(customer.vehicle.fuelRemains).toEqual(
      customer.vehicle.maxTankCapacity
    );
  });

  it('fills only the amount that customer can pay for', () => {
    const customer = {
      money: 1000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 50, 30);

    expect(customer.money).toEqual(
      customer.money - Math.max(customer.money - 50 * 30, 0)
    );

    expect(customer.vehicle.fuelRemains).toEqual(
      customer.vehicle.fuelRemains + customer.money / 50
    );
  });

  it("doesn't buy fuel if 'amount' < 2", () => {
    const customer = {
      money: 1000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 50, 1);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('rounds the pured amount to the tenth part', () => {
    const customer = {
      money: 1500, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 50, 20.889);

    expect(customer.vehicle.fuelRemains).toEqual(8 + 20.8);
  });

  it('rounds the price of purchased fuel to the nearest 0.01', () => {
    const customer = {
      money: 3000.2, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 40.51, 17.8);

    expect(customer.money).toEqual(2279.12);
  });
});
