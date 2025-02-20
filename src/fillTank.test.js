'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  let customer;

  beforeEach(() => {
    customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should fill full tank if no 'amount' given`, () => {
    fillTank(customer, 2);

    expect(customer).toEqual({
      money: 236,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill up to maxTankCapacity if amount > maxTankCapacity', () => {
    fillTank(customer, 2, 40);

    expect(customer).toEqual({
      money: 236,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should only fill the amount the customer can pay', () => {
    fillTank(customer, 12, 30);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 33,
      },
    });
  });

  it('should round the poured amount to the tenth part', () => {
    fillTank(customer, 3.74, 11.58);

    expect(customer).toEqual({
      money: 256.99,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 19.5,
      },
    });
  });

  it('should round the price to the nearest hundredth part', () => {
    fillTank(customer, 2.356, 11);

    expect(customer).toEqual({
      money: 274.08,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 19,
      },
    });
  });

  it('should not pour if amount < 2 liters', () => {
    fillTank(customer, 3, 1.8);

    expect(customer).toEqual({
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it('should not overflow the tank', () => {
    fillTank(customer, 3, 40);

    expect(customer).toEqual({
      money: 204,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });
});
