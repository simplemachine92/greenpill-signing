import { Skeleton, Typography } from "antd";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import Blockies from "react-blockies";
import { useLookupAddress } from "eth-hooks/dapps/ens";

// changed value={address} to address={address}

const { Text } = Typography;

/** 
  ~ What it does? ~

  Displays an address with a blockie image and option to copy address

  ~ How can I use? ~

  <Address
    address={address}
    ensProvider={mainnetProvider}
    blockExplorer={blockExplorer}
    fontSize={fontSize}
  />

  ~ Features ~

  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
  - Provide fontSize={fontSize} to change the size of address text
* */

const blockExplorerLink = (address, blockExplorer) => `${blockExplorer || "https://etherscan.io/"}address/${address}`;

export default function Address2(props) {
  const { currentTheme } = useThemeSwitcher();
  const address = props.value || props.address;
  const ens = useLookupAddress(props.ensProvider, address);
  const ensSplit = ens && ens.split(".");
  const validEnsCheck = ensSplit && ensSplit[ensSplit.length - 1] === "eth";
  const etherscanLink = blockExplorerLink(address, props.blockExplorer);
  let displayAddress = address?.substr(0, 5) + "..." + address?.substr(-4);

  if (validEnsCheck) {
    displayAddress = ens;
  } else if (props.size === "short") {
    displayAddress += "..." + address.substr(-4);
  } else if (props.size === "long") {
    displayAddress = address;
  }

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    );
  }

  if (props.minimized) {
    return (
      <span>
        <a
          style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
          target="_blank"
          href={etherscanLink}
          rel="noopener noreferrer"
        >
          <Blockies seed={address.toLowerCase()} size={8} scale={2} />
        </a>
      </span>
    );
  }

  return (
    <span>
      <span className="hidden justify-start items-center sm:flex">
        <Blockies seed={address.toLowerCase()} size={8} scale={2} />
      </span>
      <span>
        {props.onChange ? (
          <Text editable={{ onChange: props.onChange }}>
            <a
              style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
              target="_blank"
              href={etherscanLink}
              rel="noopener noreferrer"
            >
              {displayAddress}
            </a>
          </Text>
        ) : (
          <Text>
            <div className="hidden sm:flex">
              <a
                style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
                target="_blank"
                href={etherscanLink}
                rel="noopener noreferrer"
              >
                {displayAddress}
              </a>
            </div>
            <div className="flex-auto sm:hidden">
              <Blockies seed={address.toLowerCase()} size={8} scale={1} />
              <a
                className="text-2xs"
                style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
                target="_blank"
                href={etherscanLink}
                rel="noopener noreferrer"
              >
                {displayAddress}
              </a>
            </div>
          </Text>
        )}
      </span>
    </span>
  );
}
