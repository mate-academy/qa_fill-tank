'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  function createCustomer(money = 3000, maxTankCapacity = 40, fuelRemains = 8) {
    return {
      money,
      vehicle: {
        maxTankCapacity,
        fuelRemains,
      },
    };
  }

  it('fills full tank if amount is not passed', () => {
    const customer = createCustomer();

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('fills only free tank space if requested amount is too big', () => {
    const customer = createCustomer();

    fillTank(customer, 50, 100);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('fills only amount customer can pay for', () => {
    const customer = createCustomer(500, 40, 8);

    fillTank(customer, 60, 20);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(16.3, 10);
    expect(customer.money).toBeCloseTo(2, 10);
  });

  it('rounds poured amount down to tenth', () => {
    const customer = createCustomer();

    fillTank(customer, 50, 10.19);

    expect(customer.vehicle.fuelRemains).toBe(18.1);
    expect(customer.money).toBe(2495);
  });

  it('does not fill fuel if rounded amount is less than 2 liters', () => {
    const customer = createCustomer();

    fillTank(customer, 50, 1.99);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('rounds purchased fuel price to nearest hundredth', () => {
    const customer = createCustomer(1000, 100, 0);

    fillTank(customer, 52.749, 2.05);

    expect(customer.vehicle.fuelRemains).toBe(2);
    expect(customer.money).toBeCloseTo(894.5, 10);
  });
});
