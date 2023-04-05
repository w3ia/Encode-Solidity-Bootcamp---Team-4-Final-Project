import React from "react";
import styles from '../styles/MyProjectTable.module.css'

const exampleData = [
  { id: 1, url: "https://ipfs.nftstorage.link/", status: "Passed" },
  { id: 2, url: "https://ipfs.nftstorage.link/", status: "" },
  { id: 3, url: "https://ipfs.nftstorage.link/", status: "" },
  { id: 4, url: "https://ipfs.nftstorage.link/", status: "" },
];

export default function MyProjectTable() {
  return (
    <div className={styles.projectTable}>
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>IPFS URL</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {exampleData.map((proposal) => {
            return (
              <tr className="hover">
                <th>{proposal.id}</th>
                <td>{proposal.url}</td>
                <td>{proposal.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
