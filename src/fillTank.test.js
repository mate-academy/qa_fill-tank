'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill a full tank if amount is not given', () => {
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

  it('should not overfill the tank even if amount is large', () => {
    const customer = {
      money: 10000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };

    fillTank(customer, 100, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(9800);
  });

  it('should only fill what the customer can pay for', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 60, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(100);
  });

  it('should not fill anything if amount < 2L after rounding', () => {
    const customer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 100, 5);

    expect(customer.vehicle.fuelRemains).toBe(20);
    expect(customer.money).toBe(150);
  });

  // eslint-disable-next-line max-len
  it('should fill partial amount if amount exceeds tank and money limits', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };

    fillTank(customer, 100, 20);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(500);
  });
});
