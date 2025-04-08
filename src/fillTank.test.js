'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('заправляє повний бак, якщо не передано amount', () => {
    fillTank(customer, 50); // Full tank should add 32 liters (40 - 8)

    expect(customer.vehicle.fuelRemains).toBe(40);

    // Cost = 32 * 50 = 1600.00
    expect(customer.money).toBe(1400);
  });

  it('заправляє amount, якщо його достатньо для бака і грошей', () => {
    fillTank(customer, 40, 10); // 10л * 40 = 400
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2600);
  });

  it('заливає лише стільки, скільки вміщається в бак', () => {
    fillTank(customer, 30, 50); // В бак поміщається 32л
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 32 * 30); // 960
  });

  it('заливає лише стільки, скільки може собі дозволити клієнт', () => {
    customer.money = 100; // fuelPrice = 50 => max 2л
    fillTank(customer, 50, 10);
    expect(customer.vehicle.fuelRemains).toBe(10); // +2
    expect(customer.money).toBe(0); // 2*50=100
  });

  it('округлює паливо до десятих і вартість до сотих', () => {
    customer.money = 105; // fuelPrice = 50 => 2.1 л
    fillTank(customer, 50, 10);
    expect(customer.vehicle.fuelRemains).toBe(10.1); // 8 + 2.1
    expect(customer.money).toBeCloseTo(105 - 2.1 * 50, 2);
  });

  it('не заправляє, якщо вийшло менше 2 літрів', () => {
    customer.money = 90; // 90 / 50 = 1.8
    fillTank(customer, 50, 10);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(90);
  });

  it('не перевищує місткість бака навіть якщо грошей більше', () => {
    customer.money = 10000;
    fillTank(customer, 20, 100); // amount > tank
    expect(customer.vehicle.fuelRemains).toBe(40); // 8 + 32
    expect(customer.money).toBe(10000 - 32 * 20); // 10000 - 640
  });

  it('не заправляє якщо грошей нема', () => {
    customer.money = 0;
    fillTank(customer, 20, 10);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(0);
  });

  it('округлює вартість до двох знаків після крапки', () => {
    customer.money = 1000;
    fillTank(customer, 33.333, 5); // 5 * 33.333 = 166.665 => ~166.67
    expect(customer.money).toBeCloseTo(833.33, 2);
  });
});

