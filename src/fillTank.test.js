'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fills tank to max capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer.money).toEqual(1400);
    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it('should does not overfill the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 50);

    expect(customer.money).toEqual(1400);
    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it('should fill in only what the client can pay', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer.money).toEqual(0);
    expect(customer.vehicle.fuelRemains).toEqual(28);
  });

  it('Should round fuel amount', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 55);

    expect(customer.vehicle.fuelRemains).toEqual(11.6);
  });

  it('should not pour the tank', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100);

    expect(customer.money).toEqual(100);
    expect(customer.vehicle.fuelRemains).toEqual(8);
  });

  it('should round customer money', () => {
    const customer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 55.35);

    expect(customer.money).toEqual(0.55);
  });
});
