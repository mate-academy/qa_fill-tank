'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill full tank when amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const ret = fillTank(customer, 50); // price per liter = 50

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(3000 - 32 * 50, 2);
    expect(ret).toBeUndefined();
  });

  it('should not overfill the tank when requested amount is too big', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    const ret = fillTank(customer, 100, 10); // wants 10 liters, but only 5 fit

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(5000 - 5 * 100);
    expect(ret).toBeUndefined();
  });

  it('should fill only what the customer can pay for', () => {
    const customer = {
      money: 100, // can afford ~3.333 liters at 30/l
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 8,
      },
    };

    const ret = fillTank(customer, 30, 20); // request 20 liters, can pay ~3.333

    // Rounded down to 3.3 liters
    expect(customer.vehicle.fuelRemains).toBeCloseTo(11.3, 1);
    expect(customer.money).toBeCloseTo(100 - 3.3 * 30, 2);
    expect(ret).toBeUndefined();
  });

  it('should round poured amount down to the nearest tenth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 8,
      },
    };

    const ret = fillTank(customer, 30, 20);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(11.3, 1);
    expect(customer.money).toBeCloseTo(100 - 3.3 * 30, 2);
    expect(ret).toBeUndefined();
  });

  it('should not fill if poured amount is less than 2 liters', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const ret = fillTank(customer, 30, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(50);
    expect(ret).toBeUndefined();
  });

  it('should round total fuel price to nearest hundredth', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const ret = fillTank(customer, 33.333, 5);

    expect(customer.money).toBeCloseTo(3000 - 166.67, 2);
    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(ret).toBeUndefined();
  });
});
