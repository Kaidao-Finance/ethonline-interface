import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { FactoryAddress, ipfsUri } from "../constants";
import VoucherFactoryABI from "../abi/ContractFactoryABI.json";
import { useSigner } from "wagmi";

export const useVoucherFactory = () => {
  const { data: signer } = useSigner();

  const getContract = () => {
    if (!signer) return;

    const contractAddress = FactoryAddress;

    const ContractFactory = new ethers.Contract(
      contractAddress,
      VoucherFactoryABI,
      signer
    );

    return ContractFactory;
  };

  const mintTokengatedVoucher = async (
    name: string,
    supply: string,
    tokenGatedAddress: string
  ) => {
    const contract = await getContract();
    if (!contract) return null;

    const totalSupply = parseInt(supply);

    return await contract.createTokenGatedVoucher(
      name,
      name,
      ipfsUri,
      totalSupply,
      tokenGatedAddress
    );
  };

  const mintVoucher = async (name: string, supply: string) => {
    const contract = await getContract();

    if (!contract) return;

    console.log(supply);
    console.log(typeof supply);

    const totalSupply = parseInt(supply);

    return await contract.createVoucher(name, name, ipfsUri, totalSupply);
  };

  return {
    mintTokengatedVoucher,
    mintVoucher,
  };
};
