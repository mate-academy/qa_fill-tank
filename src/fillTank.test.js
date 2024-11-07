'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should be fill all tunk', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer.money).toEqual(2680);
    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it('should be fill all tunk', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 100);

    expect(customer.money).toEqual(2680);
    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it('should be fill in only what the client can pay', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1000, 32);

    expect(customer.money).toEqual(0);
    expect(customer.vehicle.fuelRemains).toEqual(11);
  });

  // eslint-disable-next-line max-len
  it('should be round the price of the purchased fuel the to the nearest hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 120, 222.1122);

    expect(customer.money).toEqual(0);
    expect(customer.vehicle.fuelRemains).toEqual(33);
  });

  it('should be do not pour at all', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2000, 20);

    expect(customer.money).toEqual(3000);
    expect(customer.vehicle.fuelRemains).toEqual(8);
  });
});
