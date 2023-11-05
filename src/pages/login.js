import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Pages/Login.module.css"
import MotivationalPhrase from "@/App/Components/Login Page/motivationalphrase";
import Header from "@/App/Components/Header";
import Footer from "@/App/Components/Footer";
import { toast } from "react-toastify";

export default function Login() {
  const [EmployeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EmployeeId, password }),
      });

      console.log(response);

      if (response.status === 200) {
        const result = await response.json();
        const loggedInEmployee = result.name;
        toast.success(`Wellcome ${loggedInEmployee}`)

        if (result.role === "manager") {
          router.push("./Manager/addnewsprint");
        } else {
          router.push({
            pathname: "./Employee/sprint",
            query: { employee: loggedInEmployee },
          });
        }
      } else {
        toast.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.login}>

  
        <Header />
   

      <div className={styles.img2}>

        <img src="/Assets/login_image.jpeg" alt="image" title="image" />
        <div className={styles.imageOverlay}>
            <p className={styles.imageText}>"Because every step matters"</p>
        </div>

      </div>

      <div className={styles.body}>

        <h1>LOGIN</h1>

        <form>
          <div className={styles.inputs}>
            <input className={styles.in1}
              type="text"
              placeholder="Employee ID"
              value={EmployeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
            <input className={styles.in2}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />


          </div>
       
        
        <div className={styles.button}>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
 </form>
 
      </div>
      
      <div className={styles.phrases}>

        <MotivationalPhrase />
      </div>

      <div>
        <Footer />
      </div>

    </div>
  );
}