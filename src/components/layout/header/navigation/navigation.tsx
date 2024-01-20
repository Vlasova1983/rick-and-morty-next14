'use client';
import Link from 'next/link';
import { usePathname} from 'next/navigation';
import { FC } from "react";
import styles from "./navigetion.module.css";

const Navigetion:FC=()=>{   
    const pathname = usePathname();   
    
    return (            
        <nav className={styles.conteiner}>
            <Link className={pathname==='/characters'?styles.active:styles.link} href={{pathname:`/characters`,query:{        
                name_character:'',
                page_character:'1',
                name_location:'',
                page_location:'',
                name_episodes:'',
                page_episodes:'',
                species:'',
                gender:'',
                status:'',
                type:'',
                dimension:''
            }}}>Character</Link>
            <Link  className={pathname==='/locations'?styles.active:styles.link} href={{pathname:`/locations`,query:{        
                name_character:'',
                page_character:'1',
                name_location:'',
                page_location:'',
                name_episodes:'',
                page_episodes:'',
                species:'',
                gender:'',
                status:'',
                type:'',
                dimension:''
            }}}>Locations</Link>
            <Link  className={pathname==='/episodes'?styles.active:styles.link} href={{pathname:`/episodes`,query:{        
                name_character:'',
                page_character:'1',
                name_location:'',
                page_location:'',
                name_episodes:'',
                page_episodes:'',
                species:'',
                gender:'',
                status:'',
                type:'',
                dimension:''
            }}}>Episodes</Link> 
        </nav>       
    );      
};

export default Navigetion;