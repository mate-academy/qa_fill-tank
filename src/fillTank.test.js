'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be the function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should withdraw 'money' and change 'fuelRemains'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(2800);
    expect(customer.vehicle.fuelRemains).toBe(28);
  });

  it(`should pour full tank if 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;

    fillTank(customer, fuelPrice);

    expect(customer.money).toBe(2680);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should pour max if 'amount' > 'maxTankCapacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;
    const amount = 60;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(2680);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should round the poured amount to the tenth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 31.7;
    const amount = 16.368;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(24.3);
  });

  it(`should round purchased fuel price to the nearest hundredth  part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 31.83334;
    const amount = 16.368;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(2481.12);
  });

  it(
    `if 'money' < 'fuelPrice * amount' then`
      + ` pour value that customer can afford`,
    () => {
      const customer = {
        money: 400,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      const fuelPrice = 30;
      const amount = 20;

      fillTank(customer, fuelPrice, amount);

      expect(customer.money).toBe(1);
      expect(customer.vehicle.fuelRemains).toBe(21.3);
    }
  );

  it(`should not modify 'customer' if 'amount' < 2`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const copy = { ...customer };

    const fuelPrice = 31.83334;
    const amount = 1.9;

    fillTank(copy, fuelPrice, amount);

    expect(customer).toEqual(copy);
  });
});
