/* eslint-disable max-len */
'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should update money and fuelRemains of customer', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 2800,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 30,
        },
      });
  });

  it('should fill the tank fully if amount not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 2700,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('should fill the tank fully if amount is greater than the tank can accommodate', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 10, 30);

    expect(customer)
      .toEqual({
        money: 2800,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('should fill the tank only what the client can pay', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 30);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 25,
        },
      });
  });

  it('should do not pour at all, if the poured amount is less than 2 liters', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer)
      .toEqual({
        money: 200,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 5,
        },
      });
  });

  it('should do not pour at all, if the poured amount is less than 2 liters', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer)
      .toEqual({
        money: 200,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 5,
        },
      });
  });

  it('should do not pour at all, if a customer can pay less than 2 liters', () => {
    const customer = {
      money: 19,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 19,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 5,
        },
      });
  });

  it('should do not pour at all, if if the tank can accomodate less then 2 liters', () => {
    const customer = {
      money: 1900,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 1900,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 39,
        },
      });
  });

  it('should round the poured amount by discarding number to the tenth part', () => {
    const customer = {
      money: 140,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 14,
      },
    };

    fillTank(customer, 10, 9.47);

    expect(customer)
      .toEqual({
        money: 46,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 23.4,
        },
      });
  });

  it('should round the price of the purchased fuel the to the nearest hundredth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 11.775, 10);

    expect(customer)
      .toEqual({
        money: 882.25,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 25,
        },
      });
  });
});
