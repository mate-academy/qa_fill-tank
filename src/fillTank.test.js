/* eslint-disable max-len */
'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should exist as a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('fills the tank to maximum when no amount is specified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const goalCustomer = {
      money: 2968,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 1);

    expect(customer).toEqual(goalCustomer);
  });

  it('limits the filled amount when requested amount exceeds tank capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const goalCustomer = {
      money: 2968,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 1, 100);

    expect(customer).toEqual(goalCustomer);
  });

  it('never pours more fuel than the customer can afford', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const goalCustomer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    };

    fillTank(customer, 1, 32);

    expect(customer).toEqual(goalCustomer);
  });

  it('rounds the poured fuel amount down to one decimal place', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const goalCustomer = {
      money: 997.9,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10.1,
      },
    };

    fillTank(customer, 1, 2.12324234234);

    expect(customer).toEqual(goalCustomer);
  });

  it('does not pour fuel when the calculated amount is below 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const goalCustomer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1.3, 1.999);

    expect(customer).toEqual(goalCustomer);
  });

  it('rounds the fuel cost to the nearest hundredth', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const goalCustomer = {
      money: 987.57,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    };

    fillTank(customer, 1.243424, 10);

    expect(customer).toEqual(goalCustomer);
  });
});
