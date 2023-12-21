import React from "react";
interface Props {
  title: string;
}
const Header: React.FC<Props> = ({ title }) => {
  return <header>{title}</header>;
};

export default Header;
