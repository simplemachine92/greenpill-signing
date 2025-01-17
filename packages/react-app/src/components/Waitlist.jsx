import styled from "styled-components";
import { Select, Spin, Space, Table, Input, List } from "antd";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import { Link } from "react-router-dom";
import { Footer, Quotes, AboutTheBook, GitcoinBar, Address, BottomLinks, Address2 } from ".";

const { utils } = require("ethers");

export default function Waitlist({
  yourLocalBalance,
  mainnetProvider,
  price,
  address,
  firebaseConfig,
  events,
  readContracts,
}) {
  // Get a list of tokens from a tokenlist -> see tokenlists.org!

  const [ready, setReady] = useState(false);
  const [value2, setValue2] = useState("");

  const [dataSource2, setDataSource2] = useState(events);

  useEffect(async () => {
    const copy = events;
    console.log("events", copy);
    for (const v of copy) {
      const total = await readContracts.ProofOfStake_Pages.udonationTotal(v.args[0]);
      v.donototal = utils.formatEther(total._hex);
    }
    setDataSource2(copy);
    setReady(true);
  }, [events, readContracts]);

  const FilterByNameInput2 = (
    <input
      placeholder="Search"
      type="table"
      className="w-full bg-green-400 sm:text-xl"
      value={value2}
      onChange={e => {
        const currValue = e.target.value;
        setValue2(currValue);
        const filteredData = events.filter(entry => entry.args[0].includes(currValue));
        setDataSource2(filteredData);

        // Check if an input ENS resolves
        if (e.target.value.startsWith("0")) {
        } else {
          mainnetProvider.resolveName(e.target.value).then(function (address2) {
            if (address2 == null) {
              setDataSource2(events);
            } else {
              const filteredData2 = events.filter(entry => entry.args[0].includes(address2));
              setDataSource2(filteredData2);
            }
          });
        }
      }}
    />
  );

  const columns2 = [
    {
      title: FilterByNameInput2,
      dataIndex: "args",
      render: record =>
        record != undefined ? <Address2 value={record[0]} fontSize={14} ensProvider={mainnetProvider} /> : <Spin />,
      key: "1",
    },

    {
      title: "ETH",
      dataIndex: "donototal",
      render: value => {
        return (
          <div className="text-2xs sm:text-sm md:text-base lg:text-lg mx-auto text-black">{value.substring(0, 6)}</div>
        );
      },
      sorter: (a, b) => a.args[1] - b.args[1],
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Block",
      dataIndex: "blockNumber",
      render: value => {
        return <div className="text-2xs sm:text-sm md:text-base lg:text-lg mx-auto text-black">{value}</div>;
      },
      sorter: (b, c) => b.blockNumber - c.blockNumber,
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "descend",
      key: "2",
    },
  ];

  return (
    <div className="bg-headerBackground bg-contain bg-top-right bg-no-repeat">
      <div className="">
        {ready ? (
          <div className="mx-auto px-2 sm:px-3 md:px-4 lg:px-5">
            <h5 className="mt-3 mb-2 sm:mb-3 md:mb-4 font-bold text-sm sm:text-base md:text-lg lg:text-4xl">
              ✨ Top Donors ✨
            </h5>
            <Table
              className="mx-auto sm:p-5"
              pagination={{ pageSize: 10 }}
              columns={columns2}
              dataSource={dataSource2}
            />
          </div>
        ) : (
          <div className="mx-auto px-5">
            <h5 className="mt-3 mb-2 sm:mb-3 md:mb-4 font-bold text-sm sm:text-base md:text-lg lg:text-4xl">
              ✨ Top Donors ✨
            </h5>
            <svg
              className="w-full sm:p-5 mx-auto animate-pulse"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect rx="5" ry="5" width="6000" height="1000" fill="gray" />
            </svg>
          </div>
        )}
      </div>

      {/* <Quotes /> */}
      <Footer />
    </div>
  );
}
