'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill the maximum capacity if no amount is given'
   + ' updating fuelRemains and money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toEqual(40);
    expect(customer.money).toEqual(2936);
  });

  it('if the given amount exceeds tank capacity'
  + ' updating fuelRemains and money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 2;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toEqual(40);
    expect(customer.money).toEqual(2936);
  });

  it('should fill the tank only with what the customer can afford'
  + ' updating fuelRemains and money', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 5;
    const amount = 30;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toEqual(28);
    expect(customer.money).toEqual(0);
  });

  it('should round the poured amount to the tenth part'
  + ' updating fuelRemains and money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 7.777);

    expect(customer.vehicle.fuelRemains).toEqual(15.7);
    expect(customer.money).toEqual(2984.6);
  });

  it('should not pour fuel if the rounded amount is less than 2 liters'
  + ' updating fuelRemains and money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 0.5);

    expect(customer.vehicle.fuelRemains).toEqual(8);
    expect(customer.money).toEqual(3000);
  });
});
