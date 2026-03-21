'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
  let customer;
  const fuelPrice = 50;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('should add fuel and deduct money correctly ', () => {
    fillTank(customer, fuelPrice, 10);
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2500);
  });

  it('should fill to max capacity if amount is larger than free space', () => {
    fillTank(customer, fuelPrice, 1000);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should not fill if resulting amount is less than 2 liters', () => {
    fillTank(customer, fuelPrice, 1.99);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should not fill if amount limited by money is less than 2 liters', () => {
    customer.money = 90;
    fillTank(customer, fuelPrice, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(90);
  });

  it('should limit fuel by customer money', () => {
    customer.money = 100;
    fillTank(customer, fuelPrice, 10);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should round fuel amount down to one decimal place', () => {
    customer.money = 123;
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(10.4);
    expect(customer.money).toBe(3);
  });

  it('should round the price to the nearest hundredth', () => {
    fillTank(customer, 33.3333, 10);
    expect(customer.money).toBe(2666.67);
  });
});
