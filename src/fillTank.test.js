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

  it('should fill full tank if amount is not given', () => {
    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('should fill full tank if amount > maxTankCapacity', () => {
    fillTank(customer, 10, 50);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('should fill in only what the client can pay', () => {
    fillTank(customer, 100, 50);

    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it('should round amount to the tenth part', () => {
    fillTank(customer, 100, 20.85);

    expect(customer.vehicle.fuelRemains).toBe(28.8);
  });

  it('should round amount to the nearest hundredth part', () => {
    fillTank(customer, 100.05, 5);

    expect(customer.money).toBe(2499.75);
  });

  it('should not fill in if rounded amount less than 2 liters', () => {
    fillTank(customer, 10, 1);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });
});
