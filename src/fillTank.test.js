'use strict';

const fillTank = require('./fillTank');

test('fills full tank when amount is not provided', () => {
  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  fillTank(customer, 50);

  expect(customer.vehicle.fuelRemains).toBe(40);
  expect(customer.money).toBe(3000 - 32 * 50);
});

test('does not overfill the tank when requested amount exceeds capacity', () => {
  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 30,
    },
  };

  fillTank(customer, 10, 20);

  expect(customer.vehicle.fuelRemains).toBe(40);
  expect(customer.money).toBe(3000 - 10 * 10);
});

test('fills only the amount the customer can afford, discarding to the tenth part', () => {
  const customer = {
    money: 100,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 0,
    },
  };

  fillTank(customer, 30, 10);

  expect(customer.vehicle.fuelRemains).toBe(3.3);
  expect(customer.money).toBe(1);
});

test('rounds poured fuel amount by discarding to the tenth part', () => {
  const customer = {
    money: 100,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 0,
    },
  };

  fillTank(customer, 33);

  expect(customer.vehicle.fuelRemains).toBe(3.0);
});

test('does not pour fuel if calculated amount is less than 2 liters', () => {
  const customer = {
    money: 50,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 0,
    },
  };

  fillTank(customer, 30);

  expect(customer.vehicle.fuelRemains).toBe(0);
  expect(customer.money).toBe(50);
});

test('rounds fuel price cost to the nearest hundredth', () => {
  const customer = {
    money: 100,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 0,
    },
  };

  fillTank(customer, 33.333, 3);

  expect(customer.money).toBe(0);
});

test('returns nothing', () => {
  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  const result = fillTank(customer, 50);

  expect(result).toBeUndefined();
});
