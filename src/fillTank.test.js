'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('should fill full tank if amount is not provided', () => {
    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('should fill max tank if amount > maxTankCapacity', () => {
    fillTank(customer, 10, 45);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('should have enough money', () => {
    fillTank(customer, 1000, 5);

    expect(customer.vehicle.fuelRemains).toBe(11);
  });

  it('should not fill tank if amount < 2', () => {
    customer.money = 15;

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(15);
  });

  it('should fill specific amount if it fits and is affordable', () => {
    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(3000 - 10 * 10);
  })

  // write tests here
});
