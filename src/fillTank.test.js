'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should return nothing', () => {
    expect(
      fillTank(
        {
          vehicle: {
            maxTankCapacity: 40,
            fuelRemains: 5,
          },
          money: 3000,
        },
        0,
        0,
      ),
    ).toEqual(undefined);
  });

  it('should throw an error if customer is not valid', () => {
    const unknownCustomer = {
      name: 'Baban',
    };
    const fuelPrice = 89;

    expect(() => {
      fillTank(unknownCustomer, fuelPrice);
    }).toThrow();
  });

  it('should pour only amount that customer can pay', () => {
    const customer = {
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 5,
      },
      money: 20,
    };
    const fuelPrice = 2;
    const amount = 95;

    fillTank(customer, fuelPrice, amount);

    const tankAfterFilling = customer.vehicle.fuelRemains;

    expect(tankAfterFilling).toBeLessThanOrEqual(15);
  });

  it('should not overflow a tank', () => {
    const customer = {
      vehicle: {
        maxTankCapacity: 500,
        fuelRemains: 5,
      },
      money: Infinity,
    };
    const fuelPrice = 50;
    const amount = Infinity;

    fillTank(customer, fuelPrice, amount);

    const fullTank = customer.vehicle.maxTankCapacity;
    const loadedTank = customer.vehicle.fuelRemains;

    expect(fullTank).toEqual(loadedTank);
  });

  it('should correctly round the price of the purchased fuel', () => {
    const customer = {
      vehicle: {
        maxTankCapacity: 500,
        fuelRemains: 100,
      },
      money: 100000,
    };
    const fuelPrice = 3.33333333333333333;
    const amount = 15;

    const expectedFuelPrice = Math.round(fuelPrice * amount * 100) / 100;
    const expectedMoneyLeft = customer.money - expectedFuelPrice;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toEqual(expectedMoneyLeft);
  });

  it('should do nothing if amount < 2 liters', () => {
    const tinyAmount = 1.82;
    const customer = {
      vehicle: {
        maxTankCapacity: 500,
        fuelRemains: 100,
      },
      money: 100000,
    };
    const fuelPrice = 3.33333333333333333;

    const fuelRemainsBefore = customer.vehicle.fuelRemains;

    fillTank(customer, fuelPrice, tinyAmount);

    const fuelRemainsAfter = customer.vehicle.fuelRemains;

    expect(fuelRemainsBefore).toEqual(fuelRemainsAfter);
  });

  it('should work when amount is omitted', () => {
    const customer = {
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 90,
      },
      money: 500,
    };
    const fuelPrice = 5;
    const poured = customer.vehicle.maxTankCapacity
      - customer.vehicle.fuelRemains;
    const expectedPrice = Math.round(fuelPrice * poured * 100) / 100;

    const expectedFuelRemainsAfterFilling = customer.vehicle.maxTankCapacity;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toEqual(
      expectedFuelRemainsAfterFilling,
    );
    expect(expectedPrice).toEqual(Math.round(fuelPrice * poured * 100) / 100);
  });

  it('should verify poured amount by discarding number to the tenth part'
    , () => {
      const customer = {
        vehicle: {
          maxTankCapacity: 13,
          fuelRemains: 10.125,
        },
        money: 10000,
      };
      const fuelPrice = 20;
      const pouredLitresTruncated = Math.floor((customer.vehicle.maxTankCapacity
        - customer.vehicle.fuelRemains) * 10) / 10;
      const moneyBefore = customer.money;

      fillTank(customer, fuelPrice);

      const priceForFilling = pouredLitresTruncated * fuelPrice;

      expect(customer.money).toBe(moneyBefore - priceForFilling);
    });

  // write tests here
});
