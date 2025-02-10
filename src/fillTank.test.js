/* eslint-disable max-len */
'use strict';

const { fillTank } = require('./fillTank');

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

  it('should fill up the tank completely if no amount is given', () => {
    fillTank(customer, 50); // fuelPrice = 50, no amount provided
    expect(customer.vehicle.fuelRemains).toBe(40); // Full tank
    expect(customer.money).toBe(1400); // 32L × 50 = 1600, remaining: 3000 - 1600 = 1400
  });

  it('should not overfill the tank if amount exceeds max capacity', () => {
    fillTank(customer, 50, 50); // Tries to fill 50L, but max is 32L
    expect(customer.vehicle.fuelRemains).toBe(40); // Full tank
    expect(customer.money).toBe(1400); // 32L × 50 = 1600
  });

  it('should only fill up as much as the customer can afford', () => {
    customer.money = 500; // Not enough for a full tank
    fillTank(customer, 50); // fuelPrice = 50, no amount provided
    expect(customer.vehicle.fuelRemains).toBe(18); // 10L added (500/50 = 10L)
    expect(customer.money).toBe(0); // Spent everything
  });

  it('should round fuel amount to the nearest tenth', () => {
    fillTank(customer, 50, 3.79); // 3.79L should be rounded down to 3.7L
    expect(customer.vehicle.fuelRemains).toBe(11.7); // 8 + 3.7
    expect(customer.money).toBe(3000 - (3.7 * 50)); // Price rounded to nearest 0.01
  });

  it('should not fill up if the rounded amount is less than 2 liters', () => {
    fillTank(customer, 50, 1.9); // 1.9L is rounded to 1.9L, should not be poured
    expect(customer.vehicle.fuelRemains).toBe(8); // No fuel added
    expect(customer.money).toBe(3000); // No money spent
  });

  it('should round the price correctly to the nearest hundredth', () => {
    fillTank(customer, 49.99, 5); // 5L × 49.99 = 249.95
    expect(customer.money).toBe(2750.05); // 3000 - 249.95 = 2750.05
  });

  it('should handle a case where customer has just enough money for rounding', () => {
    customer.money = 99.99; // Just under the threshold for 2L at 50 per L
    fillTank(customer, 50); // Should not fill because 99.99 / 50 = 1.99L < 2L
    expect(customer.vehicle.fuelRemains).toBe(8); // No change
    expect(customer.money).toBe(99.99); // No money spent
  });

  it('should handle cases where the tank is already full', () => {
    customer.vehicle.fuelRemains = 40; // Full tank
    fillTank(customer, 50);
    expect(customer.vehicle.fuelRemains).toBe(40); // No change
    expect(customer.money).toBe(3000); // No money spent
  });
});
