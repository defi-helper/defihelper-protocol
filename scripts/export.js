const glob = require('tiny-glob');
const fs = require('fs');
const { parse } = require('path');

try {
  fs.accessSync('networks');
} catch (e) {
  fs.mkdirSync('networks/abi', { recursive: true });
}

glob('artifacts/build-info/*.json').then(async (files) => {
  const contractsAbi = await files.reduce(async (res, path) => {
    const prev = await res;
    const buildInfo = JSON.parse((await fs.promises.readFile(path)).toString('utf-8'));
    const contracts = Object.values(buildInfo.output.contracts).reduce(
      (res, contracts) => Object.entries(contracts).reduce((res, [name, { abi }]) => ({ ...res, [name]: abi }), res),
      {},
    );

    return {
      ...prev,
      ...contracts,
    };
  }, Promise.resolve({}));

  await Promise.all(
    Object.entries(contractsAbi).map(async ([name, abi]) => {
      return fs.promises.writeFile(`networks/abi/${name}.json`, JSON.stringify({ abi }, null, 4));
    }),
  );
});

glob('deployments/*').then(async (networks) => {
  const contracts = await networks.reduce(async (res, path) => {
    const prev = await res;
    const chainId = (await fs.promises.readFile(`${path}/.chainId`)).toString('utf-8');
    const contractFiles = await glob(`${path}/*.json`);
    const contracts = await contractFiles.reduce(async (res, file) => {
      const prev = await res;
      const name = parse(file).name;
      const { address, receipt } = JSON.parse((await fs.promises.readFile(file)).toString('utf-8'));

      return {
        ...prev,
        [name]: {
          address,
          deployBlockNumber: receipt.blockNumber,
        },
      };
    }, Promise.resolve({}));

    return {
      ...prev,
      [chainId]: contracts,
    };
  }, Promise.resolve({}));
  await fs.promises.writeFile('networks/contracts.json', JSON.stringify(contracts, null, 4));
});
