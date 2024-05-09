'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  const createCustomer = () => {
    return {
      money: 5000, // customer account balance
      vehicle: {
        maxTankCapacity: 50, // fuel tank volume
        fuelRemains: 10, // Remaining fuel in the tank
      },
    };
  };

  it('no amount was given', () => {
    const customer = createCustomer();

    fillTank(customer, 100);

    // refills fuel completely
    expect(customer).toEqual({
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 50,
      },
    });
  });

  it('amount > maxTankCapacity', () => {
    const customer = createCustomer();

    fillTank(customer, 100, 100);

    // refills as much fuel as can fit in the tank
    expect(customer).toEqual({
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 50,
      },
    });
  });

  it('ordered more than can afford', () => {
    const customer = createCustomer();

    fillTank(customer, 1000, 10);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15,
      },
    });
  });

  it(`nothing changes if the amount < 2 liters`, () => {
    const customer = createCustomer();

    fillTank(customer, 100, 1);

    expect(customer).toEqual({
      money: 5000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    });
  });

  it('rounds the poured amount to the tenth', () => {
    const customer = createCustomer();

    fillTank(customer, 100, 9.5555);

    expect(customer).toEqual({
      money: 4050,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 19.5,
      },
    });
  });

  it('rounds the price to the hundredth', () => {
    const customer = createCustomer();

    fillTank(customer, 99.5555555, 10);

    expect(customer).toEqual({
      money: 4004.44,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    });
  });

  it('returns nothing', () => {
    const customer = createCustomer();

    const result = fillTank(customer, 100);

    expect(result).toEqual(undefined);
  });
});
