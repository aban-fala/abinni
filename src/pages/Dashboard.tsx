import React, { useCallback, useEffect, useState } from "react";
import Logout from "../components/auth/Logout";
import Backdrop from "../components/generics/Backdrop";
import Modal from "../components/modal/Modal";
import Table from "../components/table/Table";
import { HEADERS, initialPatient } from "../constants/constant";
import { Header, Patient, PatientToShow } from "../constants/types";
import axiosInstance from "../utils/axios";
import { useSpinnerController } from "../components/spinner/Spinner";
import { useCheckAuth } from "../utils/checkAuth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Dashboard: React.FC = () => {
  const [headers, setHeaders] = useState(HEADERS);
  const [data, setData] = useState<Patient[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<Patient>(initialPatient);
  const [isLoading, setLoading] = useState(false);
  const [showSpinner, hideSpinner] = useSpinnerController();
  const navigate = useNavigate();
  useCheckAuth();

  const fetchData = useCallback(async () => {
    try {
      showSpinner();
      const fetchResponse = await axiosInstance.get("/patients");
      const newData = fetchResponse.data.patients;
      const newHeaders = HEADERS;
      newData.forEach((item: PatientToShow) => {
        if (item.additionals) {
          for (const key in item.additionals) {
            item[key] = item.additionals[key];
            //Add this key to the table headers
            newHeaders.findIndex((header: Header) => header.id === key) ===
              -1 && newHeaders.push({ id: key, header: key });
          }
        }
      });
      console.log("GET Response:", newData);
      setHeaders(newHeaders);
      setData(newData);
    } catch (error) {
      console.error("GET Error:", error);
    } finally {
      hideSpinner();
    }
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        showSpinner();
        const idToken = await user?.getIdToken();
        axiosInstance.defaults.headers["Authorization"] = idToken;
        console.info(
          "User detected",
          idToken,
          axiosInstance.defaults.headers["Authorization"]
        );
        hideSpinner();
        fetchData();
      } else {
        axiosInstance.defaults.headers["Authorization"] = "";
        console.info("No user detected");
        navigate("/login");
      }
    });
  }, [fetchData]);

  const onFormSubmit = async (info: Patient) => {
    setModalData(info);
    console.log("info to submit", info);
    showSpinner();
    try {
      if (info.id) {
        //update
        await axiosInstance.put(`patient/${info.id}`, info);
      } else {
        //create
        await axiosInstance.post("patient", info);
      }
      await fetchData();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      hideSpinner();
    }
  };

  const cancel = () => {
    setShowModal(false);
    setModalData(initialPatient);
  };

  return (
    <div>
      <Logout />
      {showModal && <Backdrop onClick={cancel} isLoading={isLoading} />}
      {showModal && (
        <Modal
          patient={modalData}
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
