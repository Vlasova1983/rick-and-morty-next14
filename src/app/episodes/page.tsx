'use client';
import {  useCallback, useEffect,useState } from 'react';
import { useSearchParams,useRouter,usePathname } from 'next/navigation';
import Head from "next/head";
import { IHeroData} from '@/services/interfaces/interface';
import Layout from '@/components/layout/layout';
import Pages from '@/components/pages/pages';

const   EpisodesPage=() =>{ 
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name_episodes = searchParams.get('name_episodes');
  const page_episodes = searchParams.get('page_episodes'); 

  const [results,setResults]=useState<IHeroData>();
  const [page,setPage]=useState<number>(Number(page_episodes));  
  const [name,setName]=useState<string>(String(name_episodes));  
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString()) ;     
      params.set(name, value) ;
      return params.toString();
    },
    [searchParams]
  );

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_DOMAIN+`/episode/?page=${page}&name=${name}`) 
      .then((response)=> {return response.json();})
      .then((data:IHeroData)=>setResults(data));
      router.push(pathname + '?' + createQueryString('page_episodes', String(page)));      
  },[page]); 
  
  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_DOMAIN+`/episode/?page=${page}&name=${name}`) 
      .then((response)=> {return response.json();})
      .then((data:IHeroData)=>setResults(data));
    router.push(pathname + '?' + createQueryString('name_episodes', String(name)));
    setPage(1);     
  },[name]);  


  const setPageCharecters=()=>{
    results!==undefined&&page<results.info.pages?setPage(page+1):setPage(1);    
  };

  return (
    <Layout>
      <Head>
        <title>Episodes</title>
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

export default  EpisodesPage;