'use strict';

describe(`'fillTank' function`, () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it('should return nothing', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 40))
      .toBeUndefined();
  });

  it(`should fill full tank if amount wasn't passed`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains)
      .toBe(45);
  });

  it(`should fill only full tank if amount > maxTankCapacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 50);

    expect(customer)
      .toEqual({
        money: 2680,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`should fill not more fuel than client can buy`, () => {
    const customer = {
      money: 240,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 35);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 45,
          fuelRemains: 34,
        },
      });
  });

  it(`shouldn't do anything if customer can`
      + ` buy less then 2 liters of fuel`, () => {
    const customer = {
      money: 40,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 25, 50);

    expect(customer)
      .toEqual({
        money: 40,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      });
  });

  it(`shouldn't do anything if there is no space`
      + ` for 2 litres of fuel in the tank`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 25);

    expect(customer)
      .toEqual({
        money: 2000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 39,
        },
      });
  });

  it(`shouldn't do anything if amount < 2 liters`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 25, 1);

    expect(customer)
      .toEqual({
        money: 2000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 30,
        },
      });
  });

  it(`should round the total price to hundredth`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 29.888, 10);

    expect(customer)
      .toEqual({
        money: 201.12,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`should round down fuel amount to tenth`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 34, 9.85);

    expect(customer)
      .toEqual({
        money: 166.8,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 39.8,
        },
      });
  });
});
