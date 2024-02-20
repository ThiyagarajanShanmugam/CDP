import React, { useEffect, useState } from "react";
import { api } from "../../api/student";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [dues, setDues] = useState(null);

  useEffect(() => {
    api
      .get("/student/getProfile")
      .then((result) => {
        console.log(result);
        setUserData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getDues = () => {
    api
      .get("/student/getDues")
      .then((result) => {
        console.log(result);
        setDues(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{
        gap: "10px",
        minHeight: "40vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        border: "1px solid black",
        borderRadius: "20px"
      }}>
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "grey",
            borderRadius: "50%",
          }}
        ></div>
        <p>Name: {userData?.username}</p>
        <p>Email: {userData?.email}</p>
        <p>Phone: {userData?.phone}</p>
        <p>Regno: {userData?.regno}</p>
        <div>
          <button onClick={() => getDues()} style={{width: "100px", height: "30px", border: "1px solid black", background: "transparent", cursor: "pointer"}}>Get Dues</button>
          {dues !== null && (
            <table
              style={{
                border: "1px solid black",
                marginTop: "20px",
                padding: "10px",
                width: "250px",
              }}
            >
              <tr>
                <th>Book Name</th>
                <th>Book Due Date</th>
              </tr>
              {dues.map((element, index) => {
                var dueDate = userData?.currentDues[index];
                var dueDates = dueDate.split(":");
                return (
                  <tr>
                    <td>{element.bookName}</td>
                    <td>
                      {dueDates[0]} {months[parseInt(dueDates[1])]}
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
