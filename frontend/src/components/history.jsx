import { React, useState, useEffect, useReducer } from "react";
import { Table, Card, Button } from "antd";

const columns_1 = [
  {
    title: "Operation",
    dataIndex: "operation",
    width: 150,
  },
  {
    title: "Number",
    dataIndex: "firstvalue",
    width: 150,
  },
  {
    title: "Result",
    dataIndex: "result",
    width: 120,
  },
];

const columns_2 = [
  {
    title: "Operation",
    dataIndex: "operation",
    width: 150,
  },
  {
    title: "First Number",
    dataIndex: "firstvalue",
    width: 150,
  },
  {
    title: "Second Number",
    dataIndex: "secondvalue",
    width: 150,
  },
  {
    title: "Result",
    dataIndex: "result",
    width: 120,
  },
];

const columns_3 = [
  {
    title: "Operation",
    dataIndex: "operation",
    width: 150,
  },
  {
    title: "Current Grade",
    dataIndex: "currentGrade",
    width: 150,
  },
  {
    title: "Desired Grade",
    dataIndex: "desiredGrade",
    width: 150,
  },
  {
    title: "Weight",
    dataIndex: "weight",
    width: 150,
  },
  {
    title: "Required Grade",
    dataIndex: "result",
    width: 120,
  },
];

const columns_4 = [
  {
    title: "Operation",
    dataIndex: "operation",
    width: 150,
  },
  {
    title: "Set 1",
    dataIndex: "firstvalue",
    width: 150,
  },
  {
    title: "Set 2",
    dataIndex: "secondvalue",
    width: 150,
  },
  {
    title: "Resulting Set",
    dataIndex: "result",
    width: 120,
  },
];

export default function Historybar(props) {
  const [values, setValues] = useState([{}]);
  const [columns, setColumns] = useState([]);

  const gcdvalues = [];
  const modvalues = [];
  const divisorvalues = [];
  const primevalues = [];
  const gradevalues = [];
  const setvalues = [];

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    if (props.name === "GCD" || props.name === "Mod") {
      setColumns(columns_2);
      fetch("https://ntheorylab-backend.herokuapp.com/doubleop")
        .then((res) => res.json())
        .then(
          (result) => {
            if (props.name === "GCD") {
              result.map(function (e) {
                if (e.operation === "GCD") {
                  gcdvalues.unshift(e);
                }
              });

              const newgcdvalues = gcdvalues
                ? Array.from(new Set(gcdvalues.map((h) => h)))
                : [];
              setValues(newgcdvalues);
            } else {
              result.map(function (e) {
                if (e.operation === "Mod") {
                  modvalues.unshift(e);
                }
              });

              const newmodvalues = modvalues
                ? Array.from(new Set(modvalues.map((h) => h)))
                : [];
              setValues(newmodvalues);
            }
          },

          (error) => {
            console.log(error);
          }
        );
    } else if (props.name === "Prime" || props.name === "Divisor") {
      setColumns(columns_1);
      fetch("https://ntheorylab-backend.herokuapp.com/singleop")
        .then((res) => res.json())
        .then(
          (result) => {
            if (props.name === "Divisor") {
              result.map(function (e) {
                if (e.operation === "Divisors") {
                  divisorvalues.unshift(e);
                }
              });

              const newdivisorvalues = divisorvalues
                ? Array.from(new Set(divisorvalues.map((h) => h)))
                : [];
              setValues(newdivisorvalues);
            } else {
              result.map(function (e) {
                if (e.operation === "Prime Factorization") {
                  primevalues.unshift(e);
                }
              });

              const newprimevalues = primevalues
                ? Array.from(new Set(primevalues.map((h) => h)))
                : [];
              setValues(newprimevalues);
            }
          },

          (error) => {
            console.log(error);
          }
        );
    } else if (props.name === "Grade") {
      setColumns(columns_3);
      fetch("https://ntheorylab-backend.herokuapp.com/grade")
        .then((res) => res.json())
        .then(
          (result) => {
            result.map(function (e) {
              if (e.operation === "Grade") {
                gradevalues.unshift(e);
              }
            });

            const newgradevalues = gradevalues
              ? Array.from(new Set(gradevalues.map((h) => h)))
              : [];
            setValues(newgradevalues);
          },

          (error) => {
            console.log(error);
          }
        );
    } else {
      setColumns(columns_4);
      fetch("https://ntheorylab-backend.herokuapp.com/sets")
        .then((res) => res.json())
        .then(
          (result) => {
            result.map(function (e) {
              setvalues.unshift(e);
            });

            const newsetvalues = setvalues
              ? Array.from(new Set(setvalues.map((h) => h)))
              : [];
            setValues(newsetvalues);
          },

          (error) => {
            console.log(error);
          }
        );
    }
  }, [props.name]);

  return (
    <div style={{ paddingRight: "3%" }}>
      <Card>
        <h1>History </h1>

        <Table
          columns={columns}
          dataSource={values}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 300 }}
          style={{ borderColor: "#000000", width: "100%" }}
        />
        <Button style={{ width: "40%" }} onClick={refreshPage}>
          Refresh
        </Button>
      </Card>
    </div>
  );
}
