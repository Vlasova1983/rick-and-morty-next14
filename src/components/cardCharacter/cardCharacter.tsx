import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { IHero, IHeroData } from "@/services/interfaces/interface";
import styles from "./cardCharacter.module.css";


const CardCharacter:FC< {item: IHero}> =({item})=>{      
    const[result,setResult]=useState<IHeroData>();
    const cardsHtml:IHero[]=[];
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
    const url:string[]=item.location.url.split('/');
   
   
    for(let i=0;i<item.episode.length;i+=1){  
        fetch(`${item.episode[i]}`) 
        .then((response)=> {return response.json();})
        .then((data:IHero)=>cardsHtml.push(data));
    }
    

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/episode/${cardsHtml}`) 
        .then((response)=> {return response.json();})
        .then((data:IHeroData)=>setResult(data)); 
    },[]);    
 
  return (
    <>              
        <Image
            className={styles.images}     
            src={item.image}
            alt={item.name}          
            width={150}
            height={150}  
            priority         
        />
        <h2 className={styles.name}>{item.name}</h2>
        < div className={styles.card}>        
            <div className={styles.text}>
                <h3 className={styles.title}>Informations</h3>
                <p className={styles.property}>Gender</p>                
                <p className={styles.context}>{item.gender}</p>
                <p className={styles.property}>Status</p>                
                <p className={styles.context}>{item.status}</p>
                <p className={styles.property}>Specie</p>                
                <p className={styles.context}>{item.species}</p>
                <p className={styles.property}>Origin</p>                
                <p className={styles.context}>{item.origin.name}</p>
                <p className={styles.property}>Type</p>                
                <p className={styles.context}>{item.type}</p>
                <div className={styles.wrapp}>
                        <div  className={styles.conteiner}>
                            <h4 className={styles.h4}>Location</h4>                
                            <p >{item.location.name}</p> 
                        </div>                        
                        <Link  href={{pathname:`/locations/${url[5]}`,query:{        
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
                            }}}>                           
                            <Image  
                                className={styles.link}         
                                src="/chevron_right_24px.svg"
                                alt="chevron_right"           
                                width={24}
                                height={24}
                                priority
                            />
                        </Link>                        
                </div>                                       
            </div>
            <div className={styles.text}>
                <h3 className={styles.title}>Episodes</h3> 
                {result?.results.length!==0 && result?.results.slice(0, 4).map(item=>          
                    < div key={item.id} >                    
                        <div className={styles.wrapp} >
                            <div className={styles.conteiner}>
                                <h4 className={styles.h4}>{item.episode}</h4>
                                <p>{item.name}</p>
                                <p>{item.air_date}</p>                             
                            </div>                            
                            <Link  href={{pathname:`/episodes/${item.id}`,query:{        
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
                            }}}>
                                <Image 
                                    className={styles.link}          
                                    src="/chevron_right_24px.svg"
                                    alt="chevron_right"           
                                    width={24}
                                    height={24}
                                    priority
                                />
                            </Link>                           
                        </div>      
                </div >)}                                    
            </div>          
        </div >       
    </>);
};


export default CardCharacter;