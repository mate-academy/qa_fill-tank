'use strict';

const { fillTank } = require('./fillTank'); // підключення функції

describe('fillTank', () => {
  it('should fill the tank correctly', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 20);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(60);
  });

  it('should not exceed the tank capacity', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };

    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 20);

    expect(customer.vehicle.fuelRemains).toBe(50); // не більше за місткість
    expect(customer.money).toBe(90);
  });

  it('should not allow filling if fuel is less than 2 liters', () => {
    const customer = {
      money: 5,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };

    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 1);

    expect(customer.vehicle.fuelRemains).toBe(45); // не заповнило
    expect(customer.money).toBe(5); // гроші не витрачені
  });
});
