import React from 'react';
import styles from "./styles.module.css";
import { useRouter } from 'next/router';



const Header = () => {

  const router = useRouter();

  return (
    <div className={styles.header}>

      <div>
        <img src="/Assets/logo.png" alt="logo" title="Logo" />
      </div>
      {!(router.pathname === '/') && !(router.pathname === '/Employee/sprint') &&
        <div className={styles.menu}>
          <img  onClick={()=> router.push(`/Manager/menu`)} src="/Assets/burger.png" alt="burger" title="burger" />
      
        </div>
      }
    

    </div>
  );
};

export default Header;
