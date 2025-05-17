'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill a full tank if no amount is provided', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 20); // 20 грн/літр
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1600);
  });

  it('should not fill if less than 2 liters can be added (even if amount is higher)', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 10, 5); // хоче 5 літрів, але влізе лише 1
    expect(customer.vehicle.fuelRemains).toBe(39); // не заправляє
    expect(customer.money).toBe(5000);
  });

  it('should not fill more than customer can pay for', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 25, 5);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(10);
  });

  it('should round down volume to 0.1 liter', () => {
    const customer = {
      money: 13,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 3, 5); // може купити 4.3 л
    expect(customer.vehicle.fuelRemains).toBe(14.3);
    expect(customer.money).toBeCloseTo(0.1, 1);
  });

  it('should round total cost to 0.01', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 7.333, 10); // 10 * 7.333 = 73.33
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBeCloseTo(26.67, 2);
  });

  it('should not fill if after rounding volume < 2 liters', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 5); // може купити 2 л → ок
    expect(customer.vehicle.fuelRemains).toBe(7);
    expect(customer.money).toBe(0);
  });

  it('should not fill if after rounding volume < 2 liters (edge case)', () => {
    const customer = {
      money: 9.9,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 5); // 9.9 / 5 = 1.98 → округлюється до 1.9
    expect(customer.vehicle.fuelRemains).toBe(5);
    expect(customer.money).toBe(9.9);
  });

  it('should not overfill even if amount is big', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };

    fillTank(customer, 10, 20); // хоче 20 л, влізе лише 5
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(950);
  });
});
