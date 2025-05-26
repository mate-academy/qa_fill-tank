'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  function createCustomer(money, maxTank, remains) {
    return {
      money,
      vehicle: { maxTankCapacity: maxTank, fuelRemains: remains }
    };
  }

  it('fills full tank if amount not given and enough money', () => {
    const customer = createCustomer(1000, 40, 10);
    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(700);
  });

  it('fills only what fits if amount too large', () => {
    const customer = createCustomer(1000, 50, 48);
    fillTank(customer, 10, 10);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(980);
  });

  it('fills only what customer can afford', () => {
    const customer = createCustomer(25, 40, 10);
    fillTank(customer, 10, 5);
    expect(customer.vehicle.fuelRemains).toBe(12.5);
    expect(customer.money).toBe(0);
  });

  it('rounds down fuel to nearest tenth', () => {
    const customer = createCustomer(100, 40, 10);
    fillTank(customer, 3.33, 9.99);
    expect(customer.vehicle.fuelRemains).toBe(19.9);
    expect(customer.money).toBeCloseTo(100 - roundPrice(9.9 * 3.33), 2);
  });

  it('does not fill if final rounded amount < 2L', () => {
    const customer = createCustomer(5, 40, 10);
    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(5);
  });

  it('rounds price to nearest hundredth', () => {
    const customer = createCustomer(100, 40, 10);
    fillTank(customer, 3.333, 5);
    expect(customer.vehicle.fuelRemains).toBe(15);
    expect(customer.money).toBeCloseTo(100 - 16.67, 2);
  });
});

function roundPrice(price) {
  return Math.round(price * 100) / 100;
}
