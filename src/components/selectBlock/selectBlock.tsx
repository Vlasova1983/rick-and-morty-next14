import { FC,useState } from "react";
import {useSearchParams,usePathname } from 'next/navigation';
import { species,gender,status,type, dimension} from "@/services/constants/constants";
import Select from "../selectElement/selectElement";
import styles from "./selectBlock.module.css";


const SelectBlock:FC=()=>{   
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const species_query = searchParams.get('species');
    const gender_query = searchParams.get('gender');
    const status_query = searchParams.get('status');
    const type_query = searchParams.get('type');
    const dimension_query = searchParams.get('dimension');
    const [valueSpecies,setValueSpecies] =useState<string>(String(species_query)); 
    const [valueGender,setValueGender] =useState<string>(String(gender_query));
    const [valueStatus,setValueStatus] =useState<string>(String(status_query));
    const [valueType,setValueType] =useState<string>(String(type_query));
    const [valueDimension,setValueDimension] =useState<string>(String(dimension_query)); 
    return (
        <>       
            {pathname==='/characters'&&        
            <div className={styles.select}>
                <Select value={valueSpecies} setValue={setValueSpecies} name={'species'} array={species}/>               
                <Select value={valueGender} setValue={setValueGender} name={'gender'}  array={gender}/>                
                <Select value={valueStatus} setValue={setValueStatus} name={'status'} array={status}/>       
            </div>}
            {pathname==='/locations'&&        
            <div className={styles.select}>
                <Select value={valueType} setValue={setValueType} name={'type'}  array={type}/>              
                <Select value={valueDimension} setValue={setValueDimension} name={'dimension'} array={dimension}/>                      
            </div>}        
        </>            
    );      
};

export default SelectBlock;

