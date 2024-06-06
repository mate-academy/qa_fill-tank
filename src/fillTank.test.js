'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it(`modifies 'money' and 'fuelRemains' fields of the customer`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 30);

    expect(customer)
      .toEqual({
        money: 1800,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 38,
        },
      });
  });

  it(`if the 'amount' is not given, then full tank is ordered`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40);

    expect(customer)
      .toEqual({
        money: 1720,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`if the 'amount' is greater than the tank capacity, `
      + `pour only what will fit`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 50);

    expect(customer)
      .toEqual({
        money: 1720,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`fill in only what can be paid`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 30);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 33,
        },
      });
  });

  it(`don't fill in if 'amount' is less than 2 litters`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 1.99);

    expect(customer)
      .toEqual({
        money: 1000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      });
  });

  it(`round the poured amount to the tenth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 20.77);

    expect(customer)
      .toEqual({
        money: 793,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 28.7,
        },
      });
  });

  it(`round the price of the purchased fuel `
      + `to the nearest hundredth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40.787, 20);

    expect(customer)
      .toEqual({
        money: 184.26,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 28,
        },
      });
  });

  it(`don't fill in if 'money' is not enough`, () => {
    const customer = {
      money: 80,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 3);

    expect(customer)
      .toEqual({
        money: 80,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      });
  });

  it(`do not fill in if it is needed to fill less than 2 liters`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.1,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer)
      .toEqual({
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 38.1,
        },
      });
  });
});
