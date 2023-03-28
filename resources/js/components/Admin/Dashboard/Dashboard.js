import React, { useEffect } from 'react'


import BreadCrumb from '../BreadCrumb/BreadCrumb'
import Card from './Card'


import CardData from "./CardData"
import MetaAndTitle from '../../../MetaAndTitle'
import Api from '../../../api'
export default function Dashboard() {

const apiCtrl=new Api

  useEffect(()=>{


    apiCtrl.callAxios("dashboard/detail").then(res=>{
      console.log("response=>",res)
    })

       

  },[])


  return (
    <>
      <MetaAndTitle/>
      <BreadCrumb breadcrumb="Dashboard" breadcrumbItem1='My Dashboard' />
      <div className="row">                                              
        {CardData.map((value, index) =>{
         return <Card icon={value.icon} color={value.color} key={index} title={value.title} link={value.link}/>
        })}
      </div>
    </>
  )
}
