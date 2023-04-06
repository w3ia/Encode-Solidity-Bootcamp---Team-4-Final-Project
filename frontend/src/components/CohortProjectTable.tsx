import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  useAccount,
  useContract,
  usePrepareContractWrite,
  useContractWrite,
  useContractReads,
  useContractRead,
  useSigner,
} from "wagmi";
import {
  GOV_CONTRACT_ADDRESS,
  GOV_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_ABI,
  PRO_CONTRACT_ADDRESS,
  PRO_ABI,
} from "../constants/contracts";
import styles from "../styles/MyProjectTable.module.css";
import MyProjectStatus from "./MyProjectStatus";

const exampleData = [{ id: "", url: "", student: "" }];

export default function CohortProjectTable() {
  const [tableData, setTableData] = useState(exampleData);
  const { data: signer, isError, isLoading } = useSigner();

  const propC = useContract({
    address: PRO_CONTRACT_ADDRESS,
    abi: PRO_ABI,
    signerOrProvider: signer,
  });

  const updateHandler = async () => {
    if (propC) {
      let data = await propC.getAllProposals();
      // console.log(data);
      // let dataTxReceipt = data.wait();
      // console.log(dataTxReceipt)
      let object = data.map((item: any) => {
        return {
          id: item[0].toString(),
          url: item[1],
          student: item[2],
        };
      });
      setTableData(object)
    }
  };

  useEffect(() => {
    updateHandler();
  }, []);

  return (
    <div className={styles.projectTable}>
      <div className="max-w-screen-2xl mx-auto">
        <table className="table table-fixed w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="w-1/3">ID</th>
              <th className="w-1/4">IPFS URL</th>
              <th className="w-2/5">Student</th>
              <th className="w-1/4">Project Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((proposal) => {
              return (
                <tr key={proposal.id} className="hover">
                  <td className="whitespace-nowrap overflow-x-scroll">
                    {proposal.id}
                  </td>
                  <td className="whitespace-nowrap overflow-x-scroll">{proposal.url}</td>
                  <td className="whitespace-nowrap overflow-x-scroll">{proposal.student}</td>
                  <td className="text-center"><MyProjectStatus projectId={proposal.id}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          className="btn btn-outline btn-accent px-8 mt-5"
          onClick={updateHandler}
        >
          Update Table
        </button>
      </div>
    </div>
  );
}
