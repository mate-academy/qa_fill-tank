'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('function should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it('Should return a full tank if no quantity is passed', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 2680,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('should need to feel than it fits - fill the tank full', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 40);

    expect(customer)
      .toEqual({
        money: 2680,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('should fill in how much money is enough', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 100);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 38,
        },
      });
  });

  it('should round the value down to tenths', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 5.4);

    expect(customer)
      .toEqual({

        money: 2946,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 13.4,
        },
      });
  });

  it('should not fill if less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20, 1);

    expect(customer)
      .toEqual({
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      });
  });

  it('should round up to hundredths the cost of fuel', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 3.1453, 20);

    expect(customer)
      .toEqual({
        money: 2937.09,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 28,
        },
      });
  });
});
