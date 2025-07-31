'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 8,
      },
    };
  });

  it(`fills only what customer can pay`, () => {
    const fuelPrice = 350;

    fillTank(customer, fuelPrice, 22);

    expect(customer.vehicle.fuelRemains).toBe(16.5);
    expect(customer.money).toBe(25);
  });

  it(`fills tank up if amount isn't given and customer can pay`, () => {
    const fuelPrice = 100;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
    expect(customer.money).toBe(800);
  });

  it(`fills what fits if amount > 'maxTankCapacity'`
    + `and customer can pay`, () => {
    const fuelPrice = 15.25;

    fillTank(customer, fuelPrice, 60);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
    expect(customer.money).toBe(2664.5);
  });

  it(`doesn't fill if 'amount' is < 2`, () => {
    const fuelPrice = 15.25;

    fillTank(customer, fuelPrice, 1.4);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });
});
