'use client';
import {  useCallback, useEffect,useState } from 'react';
import { useSearchParams,useRouter,usePathname } from 'next/navigation';
import Head from "next/head";
import { IHeroData} from '@/services/interfaces/interface';
import Layout from '@/components/layout/layout';
import Pages from '@/components/pages/pages';

const  CharacterPage=() =>{ 
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name_character = searchParams.get('name_character');
  const page_character = searchParams.get('page_character');
  const species = searchParams.get('species');
  const gender = searchParams.get('gender');
  const status = searchParams.get('status');

  const [results,setResults]=useState<IHeroData>();
  const [page,setPage]=useState<number>(Number(page_character));  
  const [name,setName]=useState<string>(String(name_character));  
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());    
      params.set(name, value) ;
      return params.toString();
    },
    [searchParams]
  );


  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_DOMAIN+`/character/?page=${page}&name=${name}&gender=${gender}&status=${status}&species=${species}`) 
      .then((response)=> {return response.json();})
      .then((data:IHeroData)=>setResults(data));
      router.push(pathname + '?' + createQueryString('page_character', String(page)));      
  },[page]); 
  
  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_DOMAIN+`/character/?page=${page}&name=${name}&gender=${gender}&status=${status}&species=${species}`) 
      .then((response)=> {return response.json();})
      .then((data:IHeroData)=>setResults(data));
    router.push(pathname + '?' + createQueryString('name_character', String(name)));
    setPage(1);     
  },[name]); 

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_DOMAIN+`/character/?page=${page}&name=${name}&gender=${gender}&status=${status}&species=${species}`) 
      .then((response)=> {return response.json();})
      .then((data:IHeroData)=>setResults(data)); 
      
  },[species,gender,status]);


  const setPageCharecters=()=>{
    results!==undefined&&page<results.info.pages?setPage(page+1):setPage(1);    
  };    
  return (
    <Layout>
      <Head>
        <title>Character</title>
      </Head>    
      {results&&<Pages 
        value={name} 
        setValue={setName}         
        results={results} 
        setPage={setPageCharecters} 
      />  }   
    </Layout>
  );  
};

export default CharacterPage;