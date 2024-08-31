'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should ', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fully fill fuel tank, if no amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toEqual(
      customer.vehicle.maxTankCapacity,
    );
  });

  it('should fill max possible, if client has not enought money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100);

    expect(customer.vehicle.fuelRemains).toEqual(38);
  });

  it('should not to fill tank, if total liters less than 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const before = customer.vehicle.fuelRemains;

    fillTank(customer, 3000);

    expect(customer.vehicle.fuelRemains).toEqual(before);
  });

  it('should round money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 30;

    const formattedMoney
      = customer.money
      - (customer.vehicle.maxTankCapacity - customer.vehicle.fuelRemains)
      * fuelPrice;

    fillTank(customer, fuelPrice);

    expect(customer.money).toEqual(formattedMoney);
  });
});
