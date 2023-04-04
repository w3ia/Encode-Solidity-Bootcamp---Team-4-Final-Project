import styles from "../styles/Cohort.module.css";

export default function Cohort() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>
          <span>Cohort</span>
        </h1>
        <p>Todo List cohort projects</p>
      </header>
      <div className="overflow-x-auto">
        <button className="btn btn-success">Open</button>
        <button className="btn btn-error">Close</button>

      </div>
<div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        
        <th>Project ID</th>
        <th>Project URL</th>
        <th>Project Status</th>
        <th>Closing Date</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        
        <td>0990</td>
        <td>https://ipfs.nftstorage.link/</td>
        <td>4/5 Passes</td>
        <td>2023/04/02</td>
      </tr>
      {/* row 2 */}
      <tr>
        
        <td>0991</td>
        <td>https://ipfs.nftstorage.link/</td>
        <td>0/5 Passes</td>
                <td>2023/04/10</td>

      </tr>
      
      {/* row 4 */}
      <tr>
      
        <td>1000</td>
        <td>https://ipfs.nftstorage.link/</td>
        <td>2/5 Passes</td>
                <td>2023/04/03</td>

      </tr>
      {/* row 5 */}
      <tr>
        
        <td>1002</td>
        <td>https://ipfs.nftstorage.link/</td>
        <td>1/5 Passes</td>
                <td>2023/04/06</td>

      </tr>
      {/* row 6 */}
      <tr>
        
        <td>1010</td>
        <td>https://ipfs.nftstorage.link/</td>
        <td>3/5 Passes</td>
                <td>2023/04/01</td>

      </tr>
    </tbody>
  </table>
</div>

<div className="flex-none">
  <input type="text" placeholder="Enter Project ID" className="input input-bordered input-primary w-full max-w-xs" />
          <button className="btn btn-success">Open</button>

</div>
    </div>
  );
}