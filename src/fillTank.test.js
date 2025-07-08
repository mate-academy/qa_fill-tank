'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  function createCustomer({
    money = 100,
    fuelRemains = 0,
    maxTankCapacity = 50,
  } = {}) {
    return {
      money,
      vehicle: {
        fuelRemains,
        maxTankCapacity,
      },
    };
  }

  it('should be a function', () => {
    expect(typeof fillTank).toBe('function');
  });

  it('should fill with requested amount if enough money and space', () => {
    const customer = createCustomer();

    fillTank(customer, 2, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(80);
  });

  it('should fill only free space if amount exceeds tank capacity', () => {
    const customer = createCustomer({ fuelRemains: 45 });

    fillTank(customer, 2, 10);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(90);
  });

  it('should fill only affordable amount if not enough money', () => {
    const customer = createCustomer({ money: 5 });

    fillTank(customer, 2, 10);

    expect(customer.vehicle.fuelRemains).toBe(2.5);
    expect(customer.money).toBe(0);
  });

  it('should use the lowest of free space, money and requested amount', () => {
    const customer = createCustomer({
      money: 3,
      fuelRemains: 48,
    });

    fillTank(customer, 2, 5);

    expect(customer.vehicle.fuelRemains).toBe(48);
    expect(customer.money).toBe(3);
  });

  it('should not fill if rounded fuel is less than 2 liters', () => {
    const customer = createCustomer({ money: 3 });

    fillTank(customer, 2);

    expect(customer.vehicle.fuelRemains).toBe(0);
    expect(customer.money).toBe(3);
  });

  it('should round fuel down to nearest 0.1', () => {
    const customer = createCustomer({ money: 21.7 });

    fillTank(customer, 2);

    expect(customer.vehicle.fuelRemains).toBe(10.8);

    expect(customer.money).toBeCloseTo(
      21.7 - 10.8 * 2,
      2,
    );
  });

  it('should round money to 2 decimal places', () => {
    const customer = createCustomer({ money: 100 });

    fillTank(
      customer,
      1.333,
      10,
    );

    expect(customer.vehicle.fuelRemains).toBe(10);

    expect(customer.money).toBeCloseTo(
      86.67,
      2,
    );
  });

  it('should use Infinity as default amount', () => {
    const customer = createCustomer({ money: 20 });

    fillTank(customer, 2);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should not allow tank to overflow over max capacity', () => {
    const customer = createCustomer({
      fuelRemains: 49.9,
      money: 100,
    });

    fillTank(customer, 1, 5);

    expect(customer.vehicle.fuelRemains).toBe(49.9);
  });
});
