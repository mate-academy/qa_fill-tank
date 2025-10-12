'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;

  beforeEach(() => {
    customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
  });

  it('should fill tank up to the free space when amount is Infinity', () => {
    fillTank(customer, 2); // fuelPrice = 2
    expect(customer.vehicle.fuelRemains).toBe(50); // 10 + 40 free space
    expect(customer.money).toBeCloseTo(20); // 100 - 40*2 = 20
  });

  it('should not fill tank if calculated amount < 2 liters', () => {
    customer.money = 3;
    fillTank(customer, 2); // canBuy = 1.5 < 2
    expect(customer.vehicle.fuelRemains).toBe(10); // unchanged
    expect(customer.money).toBe(3); // unchanged
  });

  it('should respect the amount parameter if less than free space and money allows', () => {
    fillTank(customer, 2, 5); // request 5 liters
    expect(customer.vehicle.fuelRemains).toBe(15); // 10 + 5
    expect(customer.money).toBe(90); // 100 - 5*2
  });

  it('should round fuel to nearest 0.1', () => {
    customer.money = 10;
    customer.vehicle.fuelRemains = 0;
    fillTank(customer, 3); // canBuy = 10/3 ≈ 3.333
    expect(customer.vehicle.fuelRemains).toBe(3.3); // rounded down
  });

  it('should round price to 2 decimal places', () => {
    customer.money = 10;
    customer.vehicle.fuelRemains = 0;
    fillTank(customer, 3); // fuel 3.3 * 3 = 9.9
    expect(customer.money).toBeCloseTo(0.1); // 10 - 9.9
  });
});
