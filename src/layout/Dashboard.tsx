import React, { useEffect, useState } from "react";
import Logout from "../components/auth/Logout";
import Backdrop from "../components/generics/Backdrop";
import Modal from "../components/modal/Modal";
import Table from "../components/table/Table";
import { headers, initialUser } from "../constants/constant";
import jsonData from "../constants/data.json";
import { User } from "../constants/types";
import axiosInstance from "../utils/axios";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<User>(initialUser);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //fetchApi
    //.then((res) => {
    // setData(res.data);
    //}).catch((e) => console.log(e));

    axiosInstance
      .get("/patients")
      .then((response) => {
        console.log("GET Response:", response.data);
      })
      .catch((error) => {
        console.error("GET Error:", error);
      });

    //Remove this line and import line after api implementation
    setData(jsonData);
  }, []);

  const onFormSubmit = async (info: User) => {
    setModalData(info);
    setLoading(true);
    // submitApi
    // .then((res) => {
    //   cancel();
    //   setData(res.data);
    // })
    // .catch((e) => {
    //   window.alert('Server Error');
    // });
    setLoading(false);
  };

  const cancel = () => {
    setShowModal(false);
    setModalData(initialUser);
  };

  return (
    <div>
      <Logout />
      {showModal && <Backdrop onClick={cancel} isLoading={isLoading} />}
      {showModal && (
        <Modal
          user={modalData}
          onSubmitInfo={(info) => onFormSubmit(info)}
          onClickCancel={cancel}
        />
      )}
      <Table
        headers={headers}
        data={data}
        onAddClick={() => setShowModal(true)}
        onEditClick={(info) => {
          setShowModal(true);
          setModalData(info);
        }}
      />
    </div>
  );
};

export default Dashboard;
