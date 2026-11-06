'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  function createCustomer(money, maxTankCapacity, fuelRemains) {
    return { money, vehicle: { maxTankCapacity, fuelRemains } };
  }

  it('should fill the full tank if amount is not given', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2680);
  });

  it('should fill the given amount of fuel', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2900);
  });

  it('should fill only what fits if amount is greater than free space', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 10, 100);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2680);
  });

  it('should fill only what the customer can pay for', () => {
    const customer = createCustomer(100, 40, 8);

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(0);
  });

  it('should round the poured amount down to tenths', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 10, 5.58);

    expect(customer.vehicle.fuelRemains).toBe(13.5);
    expect(customer.money).toBe(2945);
  });

  it('should round down the amount limited by money', () => {
    const customer = createCustomer(50, 40, 8);

    fillTank(customer, 3);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(24.6, 5);
    expect(customer.money).toBeCloseTo(0.2, 5);
  });

  it('should not fill if the amount is less than 2 liters', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 10, 1.9);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should not fill if the amount rounds down to less than 2 liters', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 10, 1.99);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should fill exactly 2 liters', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 10, 2);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(2980);
  });

  it('should not fill if free space is less than 2 liters', () => {
    const customer = createCustomer(3000, 40, 39);

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(39);
    expect(customer.money).toBe(3000);
  });

  it('should not fill if the customer can pay for less than 2 liters', () => {
    const customer = createCustomer(15, 40, 8);

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(15);
  });

  it('should round the price down to hundredths', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 1.111, 3);

    expect(customer.vehicle.fuelRemains).toBe(11);
    expect(customer.money).toBeCloseTo(2996.67, 5);
  });

  it('should round the price up to the nearest hundredth', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 1.116, 3);

    expect(customer.vehicle.fuelRemains).toBe(11);
    expect(customer.money).toBeCloseTo(2996.65, 5);
  });

  it('should not change the tank capacity', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 10, 10);

    expect(customer.vehicle.maxTankCapacity).toBe(40);
  });

  it('should return nothing', () => {
    const customer = createCustomer(3000, 40, 8);

    expect(fillTank(customer, 10, 10)).toBeUndefined();
  });
});
