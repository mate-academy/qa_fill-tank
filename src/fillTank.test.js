'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should not return anything', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 5, 10)).toBeUndefined();
  });

  it('should fill the tank with the requested amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 5, 10);

    expect(customer).toEqual({
      money: 2950,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    });
  });

  it('should fill the tank completely if amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 5);

    expect(customer).toEqual({
      money: 2840,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should pour only the amount that fits in the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 5, 40);

    expect(customer).toEqual({
      money: 2840,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should pour only the amount the customer can afford', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 5, 30);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 28,
      },
    });
  });

  it('should round the poured amount down to one decimal place', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 3);

    expect(customer.money).toBeCloseTo(0.1);
  });

  it('should not pour fuel if the poured amount is less than 2 liters', () => {
    const customer = {
      money: 5,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 3);

    expect(customer).toEqual({
      money: 5,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    });
  });

  it('should pour fuel when the poured amount is exactly 2 liters', () => {
    const customer = {
      money: 6,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 3);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 7,
      },
    });
  });

  it('should round the fuel price to two decimal places', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 3.333, 2);

    expect(customer).toEqual({
      money: 93.33,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 7,
      },
    });
  });

  it('should respect both tank capacity and customer balance', () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 5, 20);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    });
  });
});
