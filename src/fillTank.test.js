'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  const createCustomer = (money, maxTankCapacity, fuelRemains) => ({
    money,
    vehicle: {
      maxTankCapacity,
      fuelRemains,
    },
  });

  it('fills exact amount', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2500);
  });

  it('fills full tank if amount omitted', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('respects tank capacity', () => {
    const customer = createCustomer(3000, 40, 30);

    fillTank(customer, 50, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2500);
  });

  it('limits by customer money', () => {
    const customer = createCustomer(500, 40, 8);

    fillTank(customer, 50, 20);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(0);
  });

  it('rounds fuel down to tenths', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 50, 5.59);

    expect(customer.vehicle.fuelRemains).toBe(13.5);
    expect(customer.money).toBe(2725);
  });

  it('rejects amount < 2 liters', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 50, 1.9);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('rejects affordable < 2 liters', () => {
    const customer = createCustomer(95, 40, 8);

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(95);
  });

  it('rounds price to hundredths', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 3.333333, 10);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2966.67);
  });

  it('handles float edge cases', () => {
    const customer = createCustomer(53.99, 40, 8);

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(13.3);
    expect(customer.money).toBeCloseTo(0.99);
  });
});
