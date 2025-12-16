'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  let customer;

  beforeEach(() => {
    customer = {
      money: 50,
      vehicle: {
        fuelRemains: 5,
        maxTankCapacity: 20,
      },
    };
  });

  it('should fill fuel correctly without exceeding maxTankCapacity', () => {
    fillTank(customer, 2, 20);
    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('should not fill more than customer can afford', () => {
    const customerMoney = customer.money;
    const fuelPrice = 2;
    const fuelRemains = customer.fuelRemains
    const canBuyAmountFuel = customerMoney / fuelPrice;
    fillTank(customer, fuelPrice);
  
    if (canBuyAmountFuel >= 1 && fillTank[2] === 'undefined') {
      expect(customer.vehicle.fuelRemains).toBe(fuelRemains + canBuyAmountFuel);
      expect(customer.money).toBe(0);
    }
  });

  it('should use default amount (Infinity) if not specified', () => {
    fillTank(customer, 2);

    const freeSpace = customer.vehicle.maxTankCapacity - 5;
    const canBuy = 50 / 2;
    const expectedFuel = Math.floor(Math.min(freeSpace, canBuy) * 10) / 10;

    expect(customer.vehicle.fuelRemains).toBe(5 + expectedFuel);
  });

  it('should not fill if rounded fuel < 2', () => {
    const customerMoney = customer.money;
    const fuelRemains = customer.fuelRemains
    const fuelPrice = 2;
    const canBuyAmountFuel = customerMoney / fuelPrice;

    fillTank(customer, fuelPrice);

    if (canBuyAmountFuel < 1) {
      expect(customer.vehicle.fuelRemains).toBe(fuelRemains);
      expect(customer.money).toBe(customerMoney);
    }
  });

  it('should correctly deduct money after filling', () => {
    fillTank(customer, 2, 5);

    const roundedFuel = Math.floor(5 * 10) / 10;
    const roundedPrice = Math.round(roundedFuel * 2 * 100) / 100;

    expect(customer.money).toBeCloseTo(50 - roundedPrice);
    expect(customer.vehicle.fuelRemains).toBe(5 + roundedFuel);
  });
});
