import { useEffect, useState } from "react";
import { NextPage } from 'next';
import { usePathname,useParams,useSearchParams} from 'next/navigation';
import Image from "next/image";
import {IHero,IHeroData} from "@/services/interfaces/interface";
import styles from "./cardResident.module.css";
import Link from "next/link";


const CardResident:NextPage<{ results:IHero}>=({results})=>{
  const searchParams = useSearchParams();
  const name_location = searchParams.get('name_location');
  const page_location = searchParams.get('page_location');
  const type = searchParams.get('type');
  const dimension = searchParams.get('dimension');
  const name_character = searchParams.get('name_character');
  const page_character = searchParams.get('page_character');
  const species = searchParams.get('species');
  const gender = searchParams.get('gender');
  const status = searchParams.get('status');
  const name_episodes = searchParams.get('name_episodes');
  const page_episodes = searchParams.get('page_episodes'); 
  const params = useParams<{ id: string}>();
  const[result,setResult]=useState<IHero[]>([]);
  const pathname = usePathname();
  const cardsHtml:number[]=[];
  let data:string[]=[];
  pathname===`/locations/${params.id}`?data=results.residents:data=results.characters;

  for(let i=0;i<data.length;i+=1){  
    fetch(`${data[i]}`) 
    .then((response)=> {return response.json();})
    .then((data:IHero)=>cardsHtml.push(data.id));
  }
  
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${cardsHtml}`) 
    .then((response)=> {return response.json();})
    .then((data:IHeroData)=>setResult(data.results));
  },[]);

  return (
    <>
      <h1 className={styles.h1}>{results.name}</h1>
      {pathname===`/locations/${params.id}`&& 
        <div className={styles.conteinertext}>
          <div ><p>Type</p><p className={styles.text}>{results.type}</p></div>
          <div><p>Dimension</p><p className={styles.text}>{results.dimension}</p></div>
        </div>
      }      
      {pathname===`/locations/${params.id}`&&      
      <h2 className={styles.h2}>Residents</h2>
      }
      {pathname===`/episodes/${params.id}`&& 
        <div className={styles.conteinertext}>
          <div ><p>Episode</p><p className={styles.content}>{results.episode}</p></div>
          <div><p>Date</p><p className={styles.content}>{results.air_date}</p></div>
        </div>
      }    
      {pathname===`/episodes/${params.id}`&& 
      <h2 className={styles.h2}>Cast</h2>
      }      
      <div className={styles.wrapper}>
        {result.length!==0 && result.map(item=>          
        < Link key={item.id} className={styles.card}  href={{pathname:`/characters/${item.id}`,query:{        
          name_character:name_character,
          page_character:page_character,
          name_location:name_location,
          page_location:page_location,
          name_episodes:name_episodes,
          page_episodes:page_episodes,
          species:species,
          gender:gender,
          status:status,
          type:type,
          dimension:dimension
        }}}
        
        >
          <Image
              className={styles.images}     
              src={item.image}
              alt={item.name}          
              width={312}
              height={232}  
              priority         
          />
          <div className={styles.text}>
            <h3>{item.name}</h3>
            <p>{item.species}</p>
          </div>      
        </Link >)}     
      </div> 
    </>  
  );   
};  

export default CardResident;




