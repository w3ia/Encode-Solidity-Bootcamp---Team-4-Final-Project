import React, { useState } from "react";
import style from '../styles/MyProjectInput.module.css'

export default function MyProjectInput() {
  const [formInput, setFormInput] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // submit proposal;
    alert(`Submitting Proposal with IPFS url: ${formInput}`);
    setFormInput("");
  };

  return (
    <form className={style.project} onSubmit={submitHandler}>
      <div className="form-control w-full mt-10">
        <label className="label">
          <span className="label-text">Submit Your Project</span>
        </label>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter IPFS URL . . ."
            className="input input-bordered w-full inline"
            value={formInput}
            onChange={(event) => setFormInput(event.target.value)}
            required
          />
          <button className="btn btn-outline btn-primary inline ml-2 px-8">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
