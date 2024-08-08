'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  test('should not return anything', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;

    expect(fillTank(customer, fuelPrice)).toBeUndefined();
  });

  it("should withdraw 'money' and fill 'fuelRemains'", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;
    const amount = 30;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(2700);
    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it("should ordered the full tank if 'amount' is not given", () => {
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

  it('should pour only what the tank can accomodate', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;
    const amount = 40;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(2680);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill only what customer can afford',
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

  it(`should not modify 'customer' if 'amount' less than 2`, () => {
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

  it(`should round purchased fuel price to the nearest hundredth part`, () => {
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
});
