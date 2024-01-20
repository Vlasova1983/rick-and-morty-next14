'use client';
import { FC, useState } from "react";
import { usePathname,useSearchParams} from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { IHeroData } from "@/services/interfaces/interface";
import { f1,f2 } from "@/services/type/type";
import Card from "@/components/card/card";
import Input from "@/components/inputSearch/inputSearh";
import LoadMore from "@/components/loadMore/loadMore";
import FilterButton from "../filtersButton/filterButton";
import Modal from "@/components/modal/modal";
import SelectBlock from "../selectBlock/selectBlock";
import Loader from '@/components/loader/loader';
import styles from "./pages.module.css";

const Pages:FC<{results:IHeroData|string,setPage:f1,value:string,setValue:f2}> =({results,setPage,value,setValue})=>{
    const pathname = usePathname();
    const searchParams = useSearchParams(); 
    const[isActive,setIsActive]=useState<boolean>(false);
    const location_name = searchParams.get('name_location');
    const page_location = searchParams.get('page_location');
    const type = searchParams.get('type');
    const dimension = searchParams.get('dimension');
    const character_name = searchParams.get('name_character');
    const page_character = searchParams.get('page_character');
    const species = searchParams.get('species');
    const gender = searchParams.get('gender');
    const status = searchParams.get('status');
    const episodes_name = searchParams.get('name_episodes');
    const page_episodes = searchParams.get('page_episodes'); 

    const changeIsActive=()=>{
        setIsActive(!isActive);
    };
   
  return (
    <> 
        {pathname===`/characters`&&
        <Image 
            className={styles.imgcharacters}       
            src="/characters.svg"
            alt="characters"           
            width={312}
            height={104}
            priority
        />        
        }
        {pathname==='/locations'&&
        <Image
            className={styles.imglocations}
            src="/locations.svg"
            alt="locations"           
            width={220}
            height={135}
            priority
        /> }
        {pathname===`/episodes`&& 
        <Image
            className={styles.imgepisides}
            src="/episode.svg"
            alt="episode"           
            width={220}
            height={135}
            priority
        />}
        {pathname===`/characters`&&
            <div className={styles.wrapper}>
                <Input value={value}  setValue={setValue} />
                <div className={styles.filter}>
                    <FilterButton isActive={isActive} changeIsActive={changeIsActive}/>
                </div>
                {isActive &&  
                <Modal changeIsActive={changeIsActive}>
                    <div className={styles.conteiner}>
                        <SelectBlock/>
                        <FilterButton  isActive={isActive} changeIsActive={changeIsActive}/> 
                    </div>                      
                </Modal> }
                <div className={styles.select}>
                    <SelectBlock/>
                </div>                         
            </div>
        }
        {pathname===`/locations`&&
            <div className={styles.wrapper}>
                <Input value={value}  setValue={setValue} />
                <div className={styles.filter}>
                    <FilterButton isActive={isActive} changeIsActive={changeIsActive}/>
                </div>
                {isActive &&  
                <Modal changeIsActive={changeIsActive}>
                    <div className={styles.conteiner}>
                        <SelectBlock/>
                        <FilterButton  isActive={isActive} changeIsActive={changeIsActive}/>
                    </div>                    
                </Modal> }
                <div className={styles.select}>
                    <SelectBlock/>
                </div>                                        
            </div>
        }        
        {pathname===`/episodes`&&
            <div className={styles.wrapper}>
                <Input value={value}  setValue={setValue} />                              
            </div>
        }        
        <div className={styles.wrapper}>
            {!results && <Loader/>} 
            {typeof(results)!=='string'&& !results.results&&<p>{results.error}</p>}
            { pathname===`/characters`&&  typeof(results)!=='string'&& results.results &&  results.results.map(event=>(            
            <Link className={styles.link} key={event.id} href={{pathname:`/characters/${event.id}`,query:{        
                name_character:character_name,
                page_character:page_character,
                name_location:location_name,
                page_location:page_location,
                name_episodes:episodes_name,
                page_episodes:page_episodes,
                species:species,
                gender:gender,
                status:status,
                type:type,
                dimension:dimension
            }}}> 
                <Card  item={event}/>           
            </Link>))
            } 
             { pathname===`/locations`&& typeof(results)!=='string'&& results.results &&  results.results.map(event=>(            
            <Link className={styles.link} key={event.id} href={{pathname:`/locations/${event.id}`,query:{        
                character_name:character_name,
                page_character:page_character,
                location_name:location_name,
                page_location:page_location,
                episodes_name:episodes_name,
                page_episodes:page_episodes,
                species:species,
                gender:gender,
                status:status,
                type:type,
                dimension:dimension
            }}}> 
                <Card  item={event}/>           
            </Link>))}  
            { pathname===`/episodes`&&   typeof(results)!=='string'&& results.results && results.results.map(event=>(            
            <Link className={styles.link} key={event.id} href={{pathname:`/episodes/${event.id}`,query:{        
                character_name:character_name,
                page_character:page_character,
                location_name:location_name,
                page_location:page_location,
                episodes_name:episodes_name,
                page_episodes:page_episodes,
                species:species,
                gender:gender,
                status:status,
                type:type,
                dimension:dimension
            }}}> 
                <Card  item={event}/>           
            </Link>))
            }             
        </div>        
      <LoadMore setPage={setPage}/> 
    </>
  );
};
export default Pages;

  
  