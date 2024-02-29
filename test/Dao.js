const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dao", function () {
  let daoNFT;
  let dao;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const DaoNFT = await ethers.getContractFactory("DaoNFT");
    daoNFT = await DaoNFT.deploy("DAOname", "SYM");
    await daoNFT.deployed();

    const Dao = await ethers.getContractFactory("Dao");
    dao = await Dao.deploy(daoNFT.address);
    await dao.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should add and remove staff correctly", async function () {
    // Add staff
    await dao.addStuff(addr1.address, "Employee1", "Role1");
    expect(await dao.getEmployees()).to.include(addr1.address);

    // Remove staff
    await dao.removeStuff(addr1.address);
    expect(await dao.getEmployees()).to.not.include(addr1.address);
  });

  it("Should allow only director to add or remove staff", async function () {
    // Add staff as non-director
    await expect(dao.connect(addr1).addStuff(addr1.address, "Employee1", "Role1")).to.be.revertedWith("Not enough permission.");

    // Remove staff as non-director
    await expect(dao.connect(addr1).removeStuff(addr1.address)).to.be.revertedWith("You're not permitted to remove staff.");
  });
it("Should return correct employee information", async function () {
    // Add staff
    await dao.addStuff(addr1.address, "Employee1", "Role1");    

    // Check employee information
    const [name, role] = await dao.getEmployee(addr1.address);
    expect(name).to.equal("Employee1");
    expect(role).to.equal("Role1");
  });
  it("Should allow director to add staff", async function () {
    // Add staff as director
    await dao.addStuff(addr1.address, "Employee1", "Role1");

    // Check if staff is added
    expect(await dao.getEmployees()).to.include(addr1.address);
});

it("Should reject adding staff with duplicate address", async function () {
    // Add staff
    await dao.addStuff(addr1.address, "Employee1", "Role1");

    // Attempt to add staff with duplicate address
    await expect(dao.addStuff(addr1.address, "Employee2", "Role2")).to.be.revertedWith("This employee already has token.");
});

});
