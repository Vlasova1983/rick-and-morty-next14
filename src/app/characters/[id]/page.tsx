'use client';
import {useEffect,useState} from 'react';
import {useParams,useSearchParams} from 'next/navigation';
import Head from "next/head";
import Link from 'next/link';
import {IHero} from '@/services/interfaces/interface';
import Layout from '@/components/layout/layout';
import CardCharacter from '@/components/cardCharacter/cardCharacter';
import styles from "./character.module.css";


const   CharactersPageId=() =>{ 
  const [results,setResults]=useState<IHero>();  
  const params = useParams<{ id: string}>();
  const searchParams = useSearchParams();
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

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_DOMAIN+`/character/${params.id}`) 
    .then((response)=> {return response.json();})
    .then((data:IHero)=> setResults(data));          
  },[]);   

  return (
    <>
    <Head>
      <title>Character</title>
    </Head>            
    <Layout>
        <div className={styles.conteiner} >
          <Link className={styles.back} href={{pathname:`/characters`,query:{       
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
          }}}>GO BACK</Link>                   
        </div>
        {results!==undefined&&<CardCharacter item={results}/>}
    </Layout>
</>
  );  
};

export default  CharactersPageId;
