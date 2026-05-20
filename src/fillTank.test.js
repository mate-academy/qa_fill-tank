'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should ', () => {});

  // write tests here
  it('should fill full tank when amount is not provided', () => {
    const customer = {
      money: 1000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 10 },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(700);
  });
});
