import Footer from "@/App/Components/Footer";
import Header from "@/App/Components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Pages/BurgerMenu.module.css";

export default function Home() {
  const router = useRouter();

  const redirectToPage = (page) => {
    if (page === "/") {
      router.push(`/${page}`);
    } else if (page === "sprint") {
      router.push(`/Employee/${page}`);
    } else {
      router.push(`/Manager/${page}`);
    }
  };

  return (
    <div className={styles.burger}>

      <div>
        <Header />
      </div>


      <div className={styles.menu}>

        <h1>MENU</h1>


        <div onClick={() => redirectToPage("alerts")}>
          ALERTS
        </div>

        <div onClick={() => redirectToPage("dailyscrums")}>
          DAILY SRCUMS
        </div>

        <div onClick={() => redirectToPage("history")}>
          HISTORY
        </div>

        <div onClick={() => redirectToPage("addnewsprint")}>
          ADD NEW SPRINT
        </div>

        <div onClick={() => redirectToPage("addnewtask")}>
          ADD NEW TASK
        </div>

        <div onClick={() => redirectToPage("sprints")}>
          SPRINTS
        </div>

        <div onClick={() => redirectToPage("statistics")}>
          STATISTICS
        </div>


        <div onClick={() => redirectToPage("/")}>
          LOGOUT</div>



      </div>
      <Footer />


    </div>
  );
}


