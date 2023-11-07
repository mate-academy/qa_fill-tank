/* eslint-disable max-len */
'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('is declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it('returns nothing', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 100, 5))
      .toBe(undefined);
  });

  describe('1) if amount is not defined', () => {
    it('fills tank for all available money', () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100);

      expect(customer.money)
        .toBe(0);

      expect(customer.vehicle.fuelRemains)
        .toBe(38);
    });

    it('fills tank to max capacity if enough money', () => {
      const customer = {
        money: 4000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100);

      expect(customer.money)
        .toBe(800);

      expect(customer.vehicle.fuelRemains)
        .toBe(40);
    });

    it('fills tank with volume customer can buy if not enough money', () => {
      const customer = {
        money: 1000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100);

      expect(customer.money)
        .toBe(0);

      expect(customer.vehicle.fuelRemains)
        .toBe(18);
    });

    it('doesn\'t fill tank when money is enough for volume < 2', () => {
      const customer = {
        money: 150,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100);

      expect(customer.money)
        .toBe(150);

      expect(customer.vehicle.fuelRemains)
        .toBe(8);
    });
  });

  describe('2) if amount is defined', () => {
    it('doesn\'t fill tank when money is enough for volume < 2', () => {
      const customer = {
        money: 150,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100, 5);

      expect(customer.money)
        .toBe(150);

      expect(customer.vehicle.fuelRemains)
        .toBe(8);
    });

    it('doesn\'t fill tank when available volume < 2', () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 39,
        },
      };

      fillTank(customer, 100, 5);

      expect(customer.money)
        .toBe(3000);

      expect(customer.vehicle.fuelRemains)
        .toBe(39);
    });

    it('fills tank with defined fuel amount if enough money', () => {
      const customer = {
        money: 4000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100, 5);

      expect(customer.money)
        .toBe(3500);

      expect(customer.vehicle.fuelRemains)
        .toBe(13);
    });

    it('fills full tank if expected amount is greater tank volume and enough money', () => {
      const customer = {
        money: 4000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100, 40);

      expect(customer.money)
        .toBe(800);

      expect(customer.vehicle.fuelRemains)
        .toBe(40);
    });

    it('fills tank only with volume customer can buy', () => {
      const customer = {
        money: 1000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100, 40);

      expect(customer.money)
        .toBe(0);

      expect(customer.vehicle.fuelRemains)
        .toBe(18);
    });

    it('fills tank with correctly rounded amount of fuel', () => {
      const customer = {
        money: 4000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100, 30.46);

      expect(customer.money)
        .toBe(960);

      expect(customer.vehicle.fuelRemains)
        .toBe(38.4);
    });

    it('charges the correctly rounded amount of money for the fuel', () => {
      const customer = {
        money: 4000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100.655, 18.5);

      expect(customer.money)
        .toBe(2137.88);

      expect(customer.vehicle.fuelRemains)
        .toBe(26.5);
    });
  });
});
