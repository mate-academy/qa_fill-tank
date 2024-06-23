'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeDefined();
  });

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  test('should fullfill the tank if amount undefined', () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(45);
    expect(customer.money).toBe(750);
  });

  test('should not fullfill the tank if money less then 2 litres costs', () => {
    const customer = {
      money: 90,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(90);
  });

  test('should not fullfill if the tank is full or 2 litres less', () => {
    const customer = {
      money: 90,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 43.05,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(43.05);
    expect(customer.money).toBe(90);
  });

  test('should fullfill the tank if amount more then tank capacity', () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(45);
    expect(customer.money).toBe(1250);
  });

  test('should round down fuel value to .1', () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 40.04,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(44.94);
  });

  test('should round fuel cost to .01', () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 25.25, 10.5);

    expect(customer.money).toBe(1234.87);
  });

  test('should fullfill only amount can be paid', () => {
    const customer = {
      money: 60,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 25, 10);

    expect(customer.vehicle.fuelRemains).toBe(12.4);
    expect(customer.money).toBe(0);
  });
});
