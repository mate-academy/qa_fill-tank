'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('fills to full tank if no amount is specified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer).toEqual({
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('fills only up to tank capacity if amount exceeds capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 60);

    expect(customer).toEqual({
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('fills only as much as the customer can afford', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 60);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 28,
      },
    });
  });

  it('rounds poured fuel down to nearest tenth', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 50, 5.56);

    expect(customer).toEqual({
      money: 2725,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 25.5,
      },
    });
  });

  it('does not pour if final amount is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 50, 1.99);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    });
  });

  it('rounds total price to nearest hundredth', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 33.55, 2.5);

    expect(customer).toEqual({
      money: 2916.12,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 22.5,
      },
    });
  });
});
