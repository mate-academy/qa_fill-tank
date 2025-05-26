'use strict';

const { fillTank } = require('./fillTank');

// Helper function to round price to two decimal places
function roundPrice(value) {
  return Math.round(value * 100) / 100;
}

// Helper function to round fuel to the nearest tenth
function roundFuel(value) {
  return Math.round(value * 10) / 10;
}

describe('fillTank', () => {
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

  it('should be declared as a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill the tank completely if no amount is specified', () => {
    fillTank(customer, 10); // Fuel price: 10 per liter

    expect(customer.vehicle.fuelRemains).toBe(40); // Full tank
    expect(customer.money).toBe(3000 - roundPrice((40 - 8) * 10));
  });

  it(
    'should only pour what the tank can accommodate'
    + ' when amount exceeds free space',
    () => {
      fillTank(customer, 10, 50); // Wants 50 liters, but only 32 fits

      expect(customer.vehicle.fuelRemains).toBe(40); // Max capacity
    }
  );

  it('should only pour what the customer can afford', () => {
    customer.money = 50; // Not enough for full refill

    fillTank(customer, 10); // Fuel price: 10 per liter

    expect(customer.vehicle.fuelRemains)
      .toBe(8 + roundFuel(50 / 10)); // Should only pour 5 liters
    expect(customer.money).toBe(0);
  });

  it('should correctly round the poured amount to the nearest tenth', () => {
    fillTank(customer, 10, 7.67); // Amount requested: 7.67 liters

    expect(customer.vehicle.fuelRemains)
      .toBe(8 + roundFuel(7.67));
  });

  it('should not pour fuel if calculated amount is less than 2 liters', () => {
    fillTank(customer, 10, 1.9); // Less than 2 liters

    expect(customer.vehicle.fuelRemains).toBe(8); // Should remain unchanged
    expect(customer.money).toBe(3000); // No transaction
  });

  it('should correctly round the price of the purchased fuel', () => {
    fillTank(customer, 7.89, 5.73);

    expect(customer.money).toBe(3000 - roundPrice(roundFuel(5.73) * 7.89));
  });

  it('should handle cases where the vehicle is already full', () => {
    customer.vehicle.fuelRemains = 40; // Full tank

    fillTank(customer, 10); // No space for more fuel

    expect(customer.vehicle.fuelRemains).toBe(40); // Should remain unchanged
    expect(customer.money).toBe(3000); // No transaction
  });
});
