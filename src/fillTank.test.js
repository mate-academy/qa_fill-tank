'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should fill the tank with the maximum amount if no amount is given',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };
      const fuelPrice = 1.5;

      fillTank(customer, fuelPrice);
      expect(customer.vehicle.fuelRemains).toEqual(40);
      expect(customer.money).toEqual(2952);
    });

  it('should fill the tank with the max amount if no amount is given',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };
      const fuelPrice = 1.5;
      const amount = 20;

      fillTank(customer, fuelPrice, amount);
      expect(customer.vehicle.fuelRemains).toEqual(28);
      expect(customer.money).toEqual(2970);
    });

  it('should fill the tank with the max amount that the customer can afford',
    () => {
      const customer = {
        money: 50,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };
      const fuelPrice = 2;

      fillTank(customer, fuelPrice);
      expect(customer.vehicle.fuelRemains).toEqual(33);
      expect(customer.money).toEqual(0);
    });

  it('should not pour any fuel if the rounded amount is less than 2 liters',
    () => {
      const customer = {
        money: 100,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };
      const fuelPrice = 1.5;
      const amount = 1;

      fillTank(customer, fuelPrice, amount);
      expect(customer.vehicle.fuelRemains).toEqual(8);
      expect(customer.money).toEqual(100);
    });

  it('should handle exceeding tank capacity', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 2;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);
    expect(customer.vehicle.fuelRemains).toEqual(40);
    expect(customer.money).toEqual(136);
  });

  it('should pour only what the client can pay', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 5;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toEqual(18);
    expect(customer.money).toEqual(0);
  });

  it('should round the poured amount to the nearest tenth part',
    () => {
      const customer = {
        money: 100,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };
      const fuelPrice = 2.5;
      const amount = 11.7;

      fillTank(customer, fuelPrice, amount);
      expect(customer.vehicle.fuelRemains).toEqual(19.7);
      expect(customer.money).toEqual(70.75);
    });

  it('should round the fuel price to the nearest hundredth part', () => {
    const customer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 2.3;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toEqual(40);
    expect(customer.money).toEqual(76.4);
  });
});
