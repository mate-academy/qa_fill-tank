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

  it('should fill the tank completely if no amount is given', () => {
    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should fill only the given amount if there is space in the tank', () => {
    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2500);
  });

  it('should fill only what fits in the tank', () => {
    fillTank(customer, 50, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should not overfill the tank even if the customer has enough money',
    () => {
      customer.money = 10000;
      fillTank(customer, 50, 100);

      expect(customer.vehicle.fuelRemains).toBe(40);
      expect(customer.money).toBe(10000 - (32 * 50));
    });

  it('should fill only what the customer can afford', () => {
    customer.money = 500;
    fillTank(customer, 50, 20);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(0);
  });

  it('should not fill if the amount is less than 2 liters after rounding',
    () => {
      fillTank(customer, 50, 1.9);

      expect(customer.vehicle.fuelRemains).toBe(8);
      expect(customer.money).toBe(3000);
    });

  it('should round the amount of fuel down to the nearest tenth', () => {
    fillTank(customer, 50, 10.78);

    expect(customer.vehicle.fuelRemains).toBe(18.7);
    expect(customer.money).toBe(2465);
  });

  it('should round the price to the nearest hundredth', () => {
    customer.money = 1000;
    fillTank(customer, 35, 25);

    const expectedTotalCost = Number((25 * 35).toFixed(2));
    const expectedRemaining = Number((1000 - expectedTotalCost).toFixed(2));

    expect(customer.money).toBe(expectedRemaining);
  });
});
