import { FC,useCallback } from "react";
import {useSearchParams, usePathname,useRouter,} from 'next/navigation';
import styles from "./selectElement.module.css";
import { f2 } from "@/services/type/type";
const Select:FC<{array:string[],name:string,value:string,setValue:f2}>=({array,name,value,setValue})=>{ 
  const router = useRouter();
  const pathname = usePathname();  
  const searchParams = useSearchParams();
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString()) ;     
      params.set(name, value) ;
      return params.toString();
    },
    [searchParams]
  );
  return (    
    <select 
      className={styles.select} 
      value={value}        
      onChange={(e)=>{
        setValue(e.target.value);
        router.push(pathname + '?' + createQueryString(name, String(e.target.value)));
      }}     
    >
      {array.map((i=><option key={i}  value={i}>{i}</option>))}        
    </select>    
  );
};  
  
export default Select;

 
           