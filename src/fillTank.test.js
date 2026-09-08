'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(typeof fillTank).toBe('function');
  });

  it('should return nothing', () => {
    const customer = createNewCustomer();

    expect(fillTank(customer, 50)).toBeUndefined();
  });

  it('should fill the full tank if the amount is not given', () => {
    const customer = createNewCustomer();

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
    expect(customer.money).toBe(1400);
  });

  it('should pour only what fits', () => {
    const customer = createNewCustomer();

    fillTank(customer, 50, 100);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
    expect(customer.money).toBe(1400);
  });

  it('should pour only what the customer can pay for when no amount', () => {
    const customer = createNewCustomer();

    fillTank(customer, 100);

    expect(customer.vehicle.fuelRemains).toBe(38);
    expect(customer.money).toBe(0);
  });

  it('should pour what the customer can pay when amount is given', () => {
    const customer = createNewCustomer();

    fillTank(customer, 200, 30);

    expect(customer.vehicle.fuelRemains).toBe(23);
    expect(customer.money).toBe(0);
  });

  it('should round the poured amount down to the tenth part', () => {
    const customer = createNewCustomer();

    fillTank(customer, 50, 12.78);

    expect(customer.vehicle.fuelRemains).toBe(20.7);
    expect(customer.money).toBe(2365);
  });

  it('should discard the amount digits, not round them to the nearest', () => {
    const customer = createNewCustomer();

    fillTank(customer, 50, 12.75);

    expect(customer.vehicle.fuelRemains).toBe(20.7);
  });

  it('should not pour at all if the poured amount is less than 2 l', () => {
    const customer = createNewCustomer();

    fillTank(customer, 100, 1);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should pour when the amount is exactly 2 liters', () => {
    const customer = createNewCustomer();

    fillTank(customer, 10, 2);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(2980);
  });

  it('should round the price to the nearest hundredth part', () => {
    const customer = createNewCustomer();

    fillTank(customer, 2.345, 2.1);

    expect(customer.money).toBe(2995.08);
  });
});

function createNewCustomer() {
  return {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };
}
