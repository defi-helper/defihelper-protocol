const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { get, deploy } }) => {
  const erc1167 = await get('ERC1167');
  await deploy('ProxyFactory', {
    libraries: {
      ERC1167: erc1167.address,
    },
  });
});
module.exports.tags = ['Protocol'];
