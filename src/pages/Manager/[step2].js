import React, { useEffect, useState } from "react";
import Select from "@/App/Components/Select/select";
import Footer from "@/App/Components/Footer";
import Header from "@/App/Components/Header";
import styles from "@/styles/Pages/step2.module.css";
import { GenericButton } from "@/App/Components/Generic Components/button";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Form = () => {
  const [tasks, setTasks] = useState();
  const [users, setUsers] = useState();
  const [department, setDepartment] = useState();
  const [handle, setHandle] = useState({ department: "", user: "" });
  const [state, setState] = useState([]);
  const router = useRouter();

  const step2 = router.query;

  const sprintId = step2.step2;
  console.log(sprintId);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("../api/Manager/Tasks/Get");
        if (response.ok) {
          const data = await response.json();

          setTasks(data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseUsers = await fetch("/api/Manager/Users/get");
        if (responseUsers.ok) {
          const data = await responseUsers.json();

          setUsers(data);
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const responseDept = await fetch("../api/Manager/Departments/get");
        if (responseDept.ok) {
          const data = await responseDept.json();

          setDepartment(data);
        } else {
          console.error("Failed to fetch department");
        }
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    };

    fetchDepartment();
  }, []);

  function filterDept(dept) {
    const userArray = users?.reduce(
      (acc, member) =>
        dept === member.Department
          ? (acc = [
            ...acc,
            {
              label: member.name,
              value: member.name,
            },
          ])
          : acc,
      []
    );

    setState([]);
    setHandle({ department: dept, user: userArray[0].value });
  }

  const handleUpdateSprint = async () => {
    const sprintData = {
      sprintId,
      tasks: state.map((task) => ({
        description: task,
        department: handle.department,
        employee: handle.user,
        completed: false,
      })),
      employees: [handle.user],
    };

    try {
      const response = await fetch("../api/Manager/Sprints/Modify", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sprintData),
      });

      if (response.ok) {
        toast.success("Sprint updated successfully!");
      } else {
        toast.error("Failed to update sprint.");
      }
    } catch (error) {
      console.error("Error updating sprint:", error);
    }
  };



  function filterUser(user) {
    setHandle((phandle) => ({ ...phandle, user: user }));
  }

  return (
    <div className={styles.step2}>
      <div className={styles.header}>
        <Header />
      </div>

      <h1>STEP II</h1>

      <div className={styles.form}>
        <form>
          <Select
            handleSelectChange={(e) => filterDept(e.target.value)}
            placeholder="AREA"

            data={department?.map((dept) => ({
              label: dept.name,
              value: dept.name,
            }))}
          />

          <Select
            handleSelectChange={(e) => filterUser(e.target.value)}
            placeholder="TEAM MEMBER"
            handle={handle}
            data={users?.reduce(
              (acc, member) =>
                handle.department === member.Department
                  ? (acc = [
                    ...acc,
                    {
                      label: member.name,
                      value: member.name,
                    },
                  ])
                  : acc,
              []
            )}
          />

          <Select
            multiple={true}

            handleSelectChange={(e) => {
              const selectedValue = e.target.value;
              if (!state.includes(selectedValue)) {
                setState((ps) => [...ps, e.target.value])
              }
            }
            }

            placeholder="TASKS"
            data={tasks
              ?.filter((task) => task.department === handle.department)
              .map((task) => ({
                label: task.description,
                value: task.description,
              }))}
          />
          {state.map((e) => (
            <span className={styles.span}>
              {e}
            </span>
          ))}
        </form>
      </div>

      <div>
        <GenericButton
          className={styles.button}
          label="SAVE"
          onClick={handleUpdateSprint}
        />
      </div>


      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Form;