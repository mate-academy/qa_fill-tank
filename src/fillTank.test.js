'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should not return anything', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 50)).toBeUndefined();
  });

  it('should not fill the tank without money', () => {
    const noMoneyCustomer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(noMoneyCustomer, 50);

    expect(noMoneyCustomer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });
  });

  it('should not fill the full fuel tank', () => {
    const fullTankCustomer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 60,
      },
    };

    fillTank(fullTankCustomer, 100, 10);

    expect(fullTankCustomer).toEqual({
      money: 1500,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 60,
      },
    });
  });

  it('should fill the tank for required amount of fuel', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 25, 4);

    expect(customer).toEqual({
      money: 2900,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    });
  });

  it('should fill the tank to full', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 25);

    expect(customer).toEqual({
      money: 2200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should not fill to full tank if not enough money', () => {
    const customer = {
      money: 750,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 25);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    });
  });

  it('should not fill the tank if ordered amount less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 1);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it('rounds the price of purchased fuel to the nearest hundredth part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 11.111, 5);

    expect(customer).toEqual({
      money: 44.44,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 13,
      },
    });
  });

  it('should round ordered amount to the tenth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 11.11);

    expect(customer).toEqual({
      money: 445,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 19.1,
      },
    });
  });
});
