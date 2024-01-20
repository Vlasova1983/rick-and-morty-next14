'use client';
import { FC} from "react";
import Image from 'next/image';
import { f2 } from "@/services/type/type";
import styles from "./inputSearch.module.css";


const Input:FC<{value:string,setValue:f2}>=({value,setValue})=>{  
  return (
    <div className={styles.wrapper}>      
      <input 
        className={styles.input}
        placeholder="Filter by name..."
        value={value}
        onChange={e=>setValue(e.target.value)}
      />
      <div          
        className={styles.button}>
          <Image            
            src="./leading.svg"
            alt="search button"           
            width={24}
            height={24}
            priority
      />
      </div>    
    </div>
  );
};
  
  
export default Input;