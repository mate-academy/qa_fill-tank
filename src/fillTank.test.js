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

  it('should fill full tank if amount is not provided', () => {
    fillTank(customer, 50); // цена за литр = 50

    // свободное место = 32, может купить = 60 литров
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 32 * 50);
  });

  it('should fill only specified amount if possible', () => {
    fillTank(customer, 10, 20);

    // свободное место = 32, может купить = 300 литров, amount = 20
    expect(customer.vehicle.fuelRemains).toBe(8 + 20);
    expect(customer.money).toBe(3000 - 200);
  });

  it('should not overfill beyond tank capacity', () => {
    fillTank(customer, 10, 100);

    // свободное место = 32, amount = 100, может купить 300 литров
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 320);
  });

  it('should not fill more than customer can pay for', () => {
    customer.money = 50; // мало денег
    fillTank(customer, 20, 10);

    // денег хватает только на 2.5 литра → округляем до 2.5
    // но потом округляется до 2.5 (>= 2, значит можно)
    expect(customer.vehicle.fuelRemains).toBe(8 + 2.5);
    expect(customer.money).toBe(50 - 50); // 2.5 * 20 = 50
  });

  it('should not fill if less than 2 liters affordable', () => {
    customer.money = 30; // хватает только на 1.5 литра
    fillTank(customer, 20, 10);

    // должно ничего не измениться
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(30);
  });

  it('should round fuel down to tenths', () => {
    customer.money = 333; // хватит на 16.65 литров
    fillTank(customer, 20, 20);

    // округляем 16.65 → 16.6
    expect(customer.vehicle.fuelRemains).toBe(8 + 16.6);
    // цена: 16.6 * 20 = 332.0 → округляем до сотых
    expect(customer.money).toBeCloseTo(1, 2);
  });

  it('should round price to 2 decimals', () => {
    customer.money = 100;
    fillTank(customer, 33.33, 5);

    // сколько может купить = 100 / 33.33 ≈ 3.003 л → округляется 3.0
    expect(customer.vehicle.fuelRemains).toBe(11);
    // цена = 3 * 33.33 = 99.99 → округляется до 99.99
    expect(customer.money).toBeCloseTo(0.01, 2);
  });
});
