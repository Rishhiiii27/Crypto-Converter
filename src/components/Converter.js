import React, { useEffect, useState } from 'react'
import {Button, Card, Form, Input, Select} from 'antd'
import {RiCoinsLine} from 'react-icons/ri'


function Converter() {

    const apiurl='https://api.coingecko.com/api/v3/exchange_rates'
    const defaultfirstselectvalue='Bitcoin';
    const defaultsecondselectvalue='Ether';



    const[cryptolist,setcryptolist]=useState([]);
    const[inputvalue,setinputvalue]=useState("0");
    const[firstselect,setfirstselect]=useState(defaultfirstselectvalue);
    const[secondselect,setsecondselect]=useState(defaultsecondselectvalue);
    const[result,setresult]=useState("0");

     useEffect(()=>
     {
        fetchdata();

     },[]);

     async function fetchdata()
     {
        const response=await fetch(apiurl);
        const jsondata=await response.json();

        const data=jsondata.rates;
        // const temparray=[];
        // Object.entries(data).forEach(item => {
        //     const tempobj={
        //         value:item[1].name,     
        //         name:item[1].name,   ---->>>>> another method to obtain the items of a object
        //         rate:item[1].value
        //     }
        //     temparray.push(tempobj); 
        // });
        // console.log(temparray);

        const temparray = Object.entries(data).map(item =>{
             return {
                    value:item[1].name,
                   label:item[1].name,
                  rate:item[1].value,
             }
            })

            setcryptolist(temparray);
     }
     
     useEffect(()=>
     {
        if (cryptolist.length ==0) return;
           
              const firstselectrate = cryptolist.find(item=>{
                return item.value === firstselect     
            }).rate;
            const secondselectrate = cryptolist.find(item=>{
                return item.value === secondselect
            }).rate;

          const resultvalue = (inputvalue * secondselectrate)/firstselectrate; 

         setresult(resultvalue.toFixed(3));

     },[firstselect,secondselect,inputvalue])

  return (
    <div className='container'>
        
       <Card className='crypto-card' title={<h1><RiCoinsLine/> Crypto Converter</h1>}>
        <Form >
            <Form.Item>
                <Input placeholder='number of coins' onChange={(event)=> setinputvalue(event.target.value)}/>
            </Form.Item>
        </Form>

        <div className='select-box'>
        <Select      
             style={{width:'200px'}} 
             defaultValue={defaultfirstselectvalue} 
             options={cryptolist}
             onChange={(value)=> setfirstselect(value)} >
        </Select>

        <Select 
            
            style={{width:'200px'}} 
            defaultValue={defaultsecondselectvalue} 
            options={cryptolist}
            onChange={(value)=> setsecondselect(value)}>    
       </Select>
    
        </div>
        <p> {inputvalue} {firstselect} = {result} {secondselect}</p>
        </Card>
    </div>
  )
}

export default Converter