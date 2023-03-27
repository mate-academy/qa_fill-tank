'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('1. should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it('2. do nothing if free space < 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.5,
      },
    };

    fillTank(customer, 2, 20);

    expect(customer)
      .toEqual({
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 38.5,
        },
      });
  });

  it('3. do nothing if money less than for 2 liter', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 3,
      },
    };

    fillTank(customer, 20, 20);

    expect(customer)
      .toEqual({
        money: 30,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 3,
        },
      });
  });

  it('4. do nothing if order less than for 2 liters', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 3,
      },
    };

    fillTank(customer, 20, 1.5);

    expect(customer)
      .toEqual({
        money: 300,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 3,
        },
      });
  });

  it('5. normal pouring', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 3,
      },
    };

    fillTank(customer, 20, 10);

    expect(customer)
      .toEqual({
        money: 100,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 13,
        },
      });
  });

  it('6. amount is not given', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 700,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('7. Round the price to the nearest hundredth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10.555, 10);

    expect(customer)
      .toEqual({
        money: 894.45,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 20,
        },
      });
  });

  it('8. Round the poured amount to the tenth part.', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10.555, 10.55);

    expect(customer)
      .toEqual({
        money: 889.17,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 20.5,
        },
      });
  });
});
