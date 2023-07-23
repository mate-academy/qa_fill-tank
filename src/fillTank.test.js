'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  // const customer = {
  //   money: 3000,
  //   vehicle: {
  //     maxTankCapacity: 40,
  //     fuelRemains: 8,
  //   },
  // };

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should not return nothing', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 40, 8)).toEqual(undefined);
  });

  it('if the amount is not given, then full tank is ordered', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it('should pour only what will fit', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 50);

    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it('should fill in only what the client can pay', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1500, 20);

    expect(customer.vehicle.fuelRemains).toEqual(10);
  });

  it('should round the amount by discarding number to the tenth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 20.556);

    expect(customer.vehicle.fuelRemains).toEqual(28.5);
  });

  it('If amount is less than 2 liters, should do not pour at all', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 1);

    expect(customer.vehicle.fuelRemains).toEqual(8);
  });

  it('should round the price to the nearest hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50.555, 20);

    expect(customer.money).toEqual(1988.9);
  });
});
