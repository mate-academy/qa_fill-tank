'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill the count that user can pay', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const customerShouldBe = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 28,
      },
    };

    fillTank(customer, 50);

    expect(customer).toEqual(customerShouldBe);
  });

  it('should not to pour less than 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 1);

    expect(customer).toEqual(customer);
  });

  it('should pour not more than a tank can contain', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 100);

    const customerShouldBe = {
      money: 3400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    expect(customer).toEqual(customerShouldBe);
  });

  it('should pour full tank if the amount wasn\'t given', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    const customerShouldBe = {
      money: 3400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    expect(customer).toEqual(customerShouldBe);
  });

  it('should round poured amount by discarding number to tenth part', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8.125,
      },
    };

    fillTank(customer, 50);

    const customerShouldBe = {
      money: 3410,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39.925,
      },
    };

    expect(customer).toEqual(customerShouldBe);
  });

  it('should round the price to nearest hundredth part', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 24.51, 11.3);

    const customerShouldBe = {
      money: 4723.04,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 19.3,
      },
    };

    expect(customer).toEqual(customerShouldBe);
  });
});
