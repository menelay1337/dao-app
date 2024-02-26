// File: test/Token.test.js
const { expect } = require('chai');

describe('Token Contract Unit testing.', function () {
	let token;
	let TokenFactory;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    TokenFactory = await ethers.getContractFactory('Token');
    token = await TokenFactory.deploy('MyToken', 'MTK', 100000);
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it('Should set the right name', async function () {
      expect(await token.name()).to.equal('MyToken');
    });

    it('Should set the right symbol', async function () {
      expect(await token.symbol()).to.equal('MTK');
    });

    it('Should assign the total supply of tokens to the owner', async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(100000);
    });
  });

  describe('_mintMinerReward', function () {
    it('Should mint tokens to the block coinbase', async function () {
      await token.connect(owner).setBlockReward(100);
      await token.connect(owner)._mintMinerReward();
      const minerBalance = await token.balanceOf(await ethers.provider.getBlock('latest').then(b => b.miner));
      expect(minerBalance).to.equal(100);
    });
  });


});
