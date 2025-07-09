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

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('fill the full tank, if no `amount` and enough `money`', () => {
    fillTank(customer, 10);

    expect(customer.money).toBe(2680);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('fill for all `money`, if no `amount` and not enough `money`', () => {
    fillTank(customer, 100);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it('fill enough, if `amount` greater than the tank can accommodate', () => {
    fillTank(customer, 100, 1000);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it('not pour, if the poured amount is less than 2 liters', () => {
    fillTank(customer, 1600, 2);

    expect(customer.money).toBe(3000);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('round the poured amount by discarding number to the tenth part', () => {
    fillTank(customer, 155, 55);

    expect(customer.money).toBe(8.5);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(27.3);
  });

  it('round the price of the purchased fuel the to the hundredth part', () => {
    fillTank(customer, 155.25, 55);

    expect(customer.money).toBeCloseTo(3.67, 5);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(27.3);
  });
});
