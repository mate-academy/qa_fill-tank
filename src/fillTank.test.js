'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('is declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('does nothing when amount < 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 1.95);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it('full tank if amount not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40);

    expect(customer).toEqual({
      money: 1720,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('amount not given and fill for < 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.01,
      },
    };

    fillTank(customer, 40);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.01,
      },
    });
  });

  it('fill only what can be paid for', () => {
    const customer = {
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40, 30);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    });
  });

  it('does not overfill', () => {
    const customer = {
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 40, 30);

    expect(customer).toEqual({
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('nothing if the tank is full', () => {
    const customer = {
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 40, 30);

    expect(customer).toEqual({
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('fills rounded amount (truncates to 0.1)', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 45.24, 10);

    expect(customer).toEqual({
      money: 1547.6,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('amount === 2', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 45.24, 2);

    expect(customer).toEqual({
      money: 1909.52,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 32,
      },
    });
  });
});
