'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill the full tank when no amount is given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should fill only what the customer can pay for', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100);
    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(customer.money).toBe(0);
  });

  it('should not fill if less than 2 liters can be filled', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 100);
    expect(customer.vehicle.fuelRemains).toBe(39);
    expect(customer.money).toBe(100);
  });

  it('should pour only what the tank can accommodate', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 50, 10);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2750);
  });

  it('should round down to the nearest tenth of a liter', () => {
    const customer = {
      money: 1000,
      vehicle:
        {
          maxTankCapacity: 40, fuelRemains: 0,
        },
    };

    fillTank(customer, 50, 7.987);
    expect(customer.vehicle.fuelRemains).toBe(7.9);
  });

  it('should round the fuel cost to the nearest hundredth', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 63.759, 10);
    expect(customer.vehicle.fuelRemains).toBe(10);
  });
});
