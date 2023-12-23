'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should left the same for amount = 0', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const expected = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 1;
    const amount = 0;

    fillTank(customer, fuelPrice, amount);
    expect(customer).toEqual(expected);
  });

  it('should pour only what will fit for amount >accommodation of tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const expected = {
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };
    const fuelPrice = 10;
    const amount = 40;

    fillTank(customer, fuelPrice, amount);
    expect(customer).toEqual(expected);
  });

  it('should full tank for no amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const expected = {
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };
    const fuelPrice = 10;

    fillTank(customer, fuelPrice);
    expect(customer).toEqual(expected);
  });

  it('should  fill in only what the client can pay', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const expected = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    };
    const fuelPrice = 200;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);
    expect(customer).toEqual(expected);
  });

  it('should do not pour at all If amount < 2', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const expected = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 200;
    const amount = 1;

    fillTank(customer, fuelPrice, amount);
    expect(customer).toEqual(expected);
  });

  it('should round the amount by discarding number to the tenth part', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const expected = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10.5,
      },
    };
    const fuelPrice = 200;
    const amount = 2.5967;

    fillTank(customer, fuelPrice, amount);
    expect(customer).toEqual(expected);
  });

  it('should round price to the nearest hundredth part', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const expected = {
      money: 1793.31,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    };
    const fuelPrice = 20.66868689;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);
    expect(customer).toEqual(expected);
  });
});
