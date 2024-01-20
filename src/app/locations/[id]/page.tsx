'use client';
import {useEffect,useState} from 'react';
import {useParams,useSearchParams} from 'next/navigation';
import Head from "next/head";
import { IHero} from '@/services/interfaces/interface';
import Layout from '@/components/layout/layout';
import Link from 'next/link';
import CardResident from '@/components/cardResident/cardResident';
import styles from "./locations.module.css";

const  LocationsPageId=() =>{ 
    const [results,setResults]=useState<IHero>();  
    const params = useParams<{ id: string}>();
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
     
    useEffect(()=>{
      fetch(process.env.NEXT_PUBLIC_DOMAIN+`/location/${params.id}`) 
      .then((response)=> {return response.json();})
      .then((data:IHero)=> setResults(data));   
    },[]);   
  
    return (
    <>
        <Head>
            <title>Locations</title>
        </Head>            
        <Layout>
          <div className={styles.conteiner} >
            <Link className={styles.back} href={{pathname:`/locations`,query:{        
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
            }}}>GO BACK</Link>                   
          </div>
          {results!==undefined&&
          <CardResident results={results}/>}
        </Layout>
    </>);  
  };
  
  export default  LocationsPageId;