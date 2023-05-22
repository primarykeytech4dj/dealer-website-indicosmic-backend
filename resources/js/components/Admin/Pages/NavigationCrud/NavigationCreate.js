import React from "react";
import Api from "../../../../api";
import './NavigationCreate.css'
import { Box, Divider } from "@mui/material";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialButton from "../../../../Tags/MaterialButton";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import { DragDropContext as DragAndDrop } from 'react-beautiful-dnd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
// import { DragAndDrop, Drag, Drop } from './drag-and-drop'

import { Button } from "react-bootstrap";
class NavigationCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state =
    {
     



    }


    this.apiCtrl = new Api;



  }
  componentWillMount(){
    
  }

  render() {

    const menu={
      "1":"Frontend",
       "2":"Backend"
    }

    
    
   
  
    return (<>

      <BreadCrumb breadcrumb="Navigation" breadcrumbItem1='Create' />

     

      <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor: 'white', borderRadius: "6px", padding: '2%' }}>

        <div className="row mb-3">
        <div className="col-md-2 mb-3">
        
            <MaterialSelect size={"small"} data={""} fullWidth label={"Select a menu to edit"} name="menu_id" />
        
          </div>  
          <div className="col-md-4 mb-2"> 
            <Button style={{textDecoration:"none"}} href="#exampleModalToggle1" data-bs-toggle="modal" >Create new menu</Button>
          
          </div>  
            
        </div>

        <Divider sx={{ borderColor: '#dac4c4',marginBottom:"5px"}}    />

        <div className="row">
        
          <div className="col-md-4">

            <div id="list1" className="dropdown-check-list" tabindex="100">
                <span id="anchor" class="anchor">Categories</span>
                <ul className="items">
                  <li><input type="checkbox" className="ml-2" /> <span className="ml-2"> Product</span> </li>
                  <li><input type="checkbox"className="ml-2" /><span className="ml-2">Gallery</span></li>
                  <li><input type="checkbox" className="ml-2" /><span className="ml-2">About us</span> </li>
                  <li><input type="checkbox" className="ml-2" /><span className="ml-2">Service </span></li>
                  <li><input type="checkbox" className="ml-2" /><span className="ml-2">Vehicle </span></li>
                  <div className="item-list-footer" style={{padding:"3px"}}>
                    <label className=" bttn btn-sm btn-default" ><input type="checkbox" id="select-all-categories"/> Select All</label>
                    <button  type="button" class="pull-right bttn  btn-default btn-sm" id="add-categories">Add to Menu</button>
                  </div>
                
                </ul>

                
            </div>
          </div>

          <div className="col-md-8">
            {/* <ul>
              <Columns/>
            </ul> */}
            <ul className="menu ui-sortable" id="menuitems">
              <Columns/>
            </ul>
          </div>

        

        

        </div>
        
     
      <Model/>
     </Box>


    </>)
  }



}

export default NavigationCreate



function Model(){

  const menu={
    "1":"Frontend",
     "2":"Backend"
  }

  
  return(
    <>
   
      <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{"Create new menu"}</h5>
            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>{props.params.any} Details</b></label> */}
            </div>
            <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body m-body">
           <div className="row">
              <div className="row mb-3">
                <div className="col-md-6">
              
                  <MaterialTextField fullWidth label={"Name"} size={"small"}/>

                </div>

                <div className="col-md-6">
                  
                  <MaterialSelect fullWidth size={"small"} data={menu}  label={"Menu"} name="menu_id" />

                </div>

                  

              </div>               
            </div>  
        
            
          <div className="modal-footer">
                  

                  {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                 */}
          
                   <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}} >Create</Button> 
                
                </div>
          </div>  

          
        </div>
      </div>
      </div>


    </>
  )
}


// const data=[
//   {
//       "name": "Dashboard",
//       "slug": "dashboard",
//       "sub_menu": false
//   },
//   {
//     "name":"Web Setting",
//     "slug":"website",
//     "sub_menu":false
//   },
//   {
//       "name": "Products",
//       "slug": "product",
//       "sub_menu": [
//           {
//               "name": "List",
//               "slug": "list",
//               "sub_menu": []
//           },
//           {
//               "name": "Create",
//               "slug": "create",
//               "sub_menu": []
//           }
//       ]
//   },
//   {
//     "name": "Service",
//     "slug": "service",
//     "sub_menu": [
//         {
//             "name": "List",
//             "slug": "list",
//             "sub_menu": []
//         },
//         {
//             "name": "Create",
//             "slug": "create",
//             "sub_menu": []
//         }
//     ]
//   },
//   {
//       "name": "Product Category",
//       "slug": "product-category",
//       "sub_menu": [
//           {
//               "name": "List",
//               "slug": "list",
//               "sub_menu":[]
//           },
//           {
//               "name": "Create",
//               "slug": "create",
//               "sub_menu": []
//           }
//       ]
//   },
//   {
//     "name": "Service Category",
//     "slug": "service-category",
//     "sub_menu": [
//         {
//             "name": "List",
//             "slug": "list",
//             "sub_menu":[]
//         },
//         {
//             "name": "Create",
//             "slug": "create",
//             "sub_menu": []
//         }
//     ]
//   },
//   {
//       "name": "Vehicles",
//       "slug": "vehicle",
//       "sub_menu": [
//         {
//           "name": "Make",
//           "slug": "make",
//           "sub_menu": [
//             {
//               "name": "list",
//               "slug": "list",
//               "sub_menu": []
//             },
//             {
//               "name": "create",
//               "slug": "create",
//               "sub_menu": []
//             }
//           ]
//         },
//         {
//           "name": "Model",
//           "slug": "model",
//           "sub_menu": [
//             {
//               "name": "list",
//               "slug": "list",
//               "sub_menu": []
//             },
//             {
//               "name": "create",
//               "slug": "create",
//               "sub_menu": []
//             }
//           ]
//         },
//         {
//           "name": "Variant",
//           "slug": "variant",
//           "sub_menu": [
//             {
//               "name": "list",
//               "slug": "list",
//               "sub_menu": []
//             },
//             {
//               "name": "create",
//               "slug": "create",
//               "sub_menu": []
//             }
//           ]
//         },
//         {
//           "name": "Vehicle List",
//           "slug": "vehicle-list",
//           "sub_menu": [
//             {
//               "name": "list",
//               "slug": "list",
//               "sub_menu": []
//             },
//             {
//               "name": "create",
//               "slug": "create",
//               "sub_menu": []
//             }
//           ]
//         },
//         {
//           "name": "Features",
//           "slug": "feature",
//           "sub_menu": [
//             {
//               "name": "list",
//               "slug": "list",
//               "sub_menu": []
//             },
//             {
//               "name": "create",
//               "slug": "create",
//               "sub_menu": []
//             }
//           ]
//         }
//       ]
//   },
//   {
//       "name": "Gallery",
//       "slug": "gallery",
//       "sub_menu": [
//         {
//           "name": "list",
//           "slug": "list",
//           "sub_menu": []
//         },
//         {
//           "name": "create",
//           "slug": "create",
//           "sub_menu": []
//         }
//       ]
//   },
//   {
//     "name": "Testimonials",
//     "slug": "testimonial",
//     "sub_menu": [
//       {
//           "name": "List",
//           "slug": "list",
//           "sub_menu": []
//       },
//       {
//           "name": "Create",
//           "slug": "create",
//           "sub_menu": []
//       }
//     ]
//   },
//   {
//     "name": "Slider",
//     "slug": "slider",
//     "sub_menu": [
//       {
//           "name": "List",
//           "slug": "list",
//           "sub_menu": []
//       },
//       {
//           "name": "Create",
//           "slug": "create",
//           "sub_menu": []
//       }
//     ]
//   },
//   {
//     "name": "Enquiry",
//     "slug": "enquiry-list",
//     "sub_menu": false
//   },
//   {
//     "name": "Navigation",
//     "slug": "navigation",
//     "sub_menu": [
//         {
//             "name": "List",
//             "slug": "list",
//             "sub_menu": []
//         },
//         {
//             "name": "Create",
//             "slug": "create",
//             "sub_menu": []
//         }
//     ]
// },

// ]

class Columns extends React.Component{
  constructor(props){
    super(props);
    this.state={

      data:[
        {   "id":"1",
            "name": "Dashboard",
            "slug": "dashboard",
            "sub_menu": []
        },
        {   "id":"2",
          "name":"Web Setting",
          "slug":"website",
          "sub_menu":[]
        },
        {   "id":"3",
            "name": "Products",
            "slug": "product",
            "sub_menu": [
                {   "id":"3_1",
                    "name": "List",
                    "slug": "list",
                    "sub_menu": []
                },
                {   "id":"3_2",
                    "name": "Create",
                    "slug": "create",
                    "sub_menu": []
                }
            ]
        },
        { "id":"4",
          "name": "Service",
          "slug": "service",
          "sub_menu": [
              {   "id":"4_1",
                  "name": "List",
                  "slug": "list",
                  "sub_menu": []
              },
              {   "id":"4_2",
                  "name": "Create",
                  "slug": "create",
                  "sub_menu": []
              }
          ]
        },
        {   "id":"5",
            "name": "Product Category",
            "slug": "product-category",
            "sub_menu": [
                {    "id":"5_1",
                    "name": "List",
                    "slug": "list",
                    "sub_menu":[]
                },
                {   "id":"5_2",
                    "name": "Create",
                    "slug": "create",
                    "sub_menu": []
                }
            ]
        },
        { "id":"6",
          "name": "Service Category",
          "slug": "service-category",
          "sub_menu": [
              {   "id":"6_1",
                  "name": "List",
                  "slug": "list",
                  "sub_menu":[]
              },
              {    "id":"6_2",
                  "name": "Create",
                  "slug": "create",
                  "sub_menu": []
              }
          ]
        },
        {   "id":"7",
            "name": "Vehicles",
            "slug": "vehicle",
            "sub_menu": [
              { "id":"7_1",
                "name": "Make",
                "slug": "make",
                "sub_menu": [
                  { "id":"veh11",
                    "name": "list",
                    "slug": "list",
                    "sub_menu": []
                  },
                  {  "id":"veh12",
                    "name": "create",
                    "slug": "create",
                    "sub_menu": []
                  }
                ]
              },
              {  "id":"7_2",
                "name": "Model",
                "slug": "model",
                "sub_menu": [
                  {  "id":"veh21",
                    "name": "list",
                    "slug": "list",
                    "sub_menu": []
                  },
                  {  "id":"veh21",
                    "name": "create",
                    "slug": "create",
                    "sub_menu": []
                  }
                ]
              },
              {  "id":"7_3",
                "name": "Variant",
                "slug": "variant",
                "sub_menu": [
                  { "id":"veh31",
                    "name": "list",
                    "slug": "list",
                    "sub_menu": []
                  },
                  { "id":"veh31",
                    "name": "create",
                    "slug": "create",
                    "sub_menu": []
                  }
                ]
              },
              {  "id":"7_4",
                "name": "Vehicle List",
                "slug": "vehicle-list",
                "sub_menu": [
                  { "id":"veh41",
                    "name": "list",
                    "slug": "list",
                    "sub_menu": []
                  },
                  { "id":"veh42",
                    "name": "create",
                    "slug": "create",
                    "sub_menu": []
                  }
                ]
              },
              {  "id":"7_5",
                "name": "Features",
                "slug": "feature",
                "sub_menu": [
                  { "id":"veh51",
                    "name": "list",
                    "slug": "list",
                    "sub_menu": []
                  },
                  {  "id":"veh52",
                    "name": "create",
                    "slug": "create",
                    "sub_menu": []
                  }
                ]
              }
            ]
        },
        {   "id":"8",
            "name": "Gallery",
            "slug": "gallery",
            "sub_menu": [
              { "id":"8_1",
                "name": "list",
                "slug": "list",
                "sub_menu": []
              },
              {  "id":"8_2",
                "name": "create",
                "slug": "create",
                "sub_menu": []
              }
            ]
        },
        {  "id":"9",
          "name": "Testimonials",
          "slug": "testimonial",
          "sub_menu": [
            {   "id":"9_1",
                "name": "List",
                "slug": "list",
                "sub_menu": []
            },
            {    "id":"9_2",
                "name": "Create",
                "slug": "create",
                "sub_menu": []
            }
          ]
        },
        { "id":"10",
          "name": "Slider",
          "slug": "slider",
          "sub_menu": [
            {    "id":"10_1",
                "name": "List",
                "slug": "list",
                "sub_menu": []
            },
            {   "id":"10_2",
                "name": "Create",
                "slug": "create",
                "sub_menu": []
            }
          ]
        },
        { "id":"11",
          "name": "Enquiry",
          "slug": "enquiry-list",
          "sub_menu": []
        },
        { "id":"12",
          "name": "Navigation",
          "slug": "navigation",
          "sub_menu": [
              {   "id":"12_1",
                  "name": "List",
                  "slug": "list",
                  "sub_menu": []
              },
              {    "id":"12_2",
                  "name": "Create",
                  "slug": "create",
                  "sub_menu": []
              }
          ]
      },
      
      ]
      


    }
    




  }

  render(){

    // const handleDragEnd = (result) => {
    //   const {items, source, destination } = result
    //   console.log("rusult=>",result)
    //   if (!destination) {
    //     return
    //   }
    
    //   const reorderedItems = reorder(items, source.index, destination.index)
    //   console.log("reorderitems=>",reorderedItems)
    //   this.setState({data:reorderedItems})
    // }

    const handleDragEnd = (result) => {
      const { type, source, destination } = result
       console.log("type==>",result)
      if (!destination) return
    
      const sourceCategoryId = source.droppableId
      const destinationCategoryId = destination.droppableId
    
      // Reordering items
      if (type === 'droppable-item') {
         // If reordering within the same category
        if (sourceCategoryId === destinationCategoryId) {
          const updatedOrder = reorder(
            this.state.data.find((category) => category.id === sourceCategoryId).sub_menu,
            source.index,
            destination.index
          )
          const updatedCategories = this.state.data.map((category) =>
            category.id !== sourceCategoryId ? category : { ...category, sub_menu: updatedOrder }
          )
    
          this.setState(old=>({...old,data:updatedCategories}))
        } else {
          // Dragging to a different category
           const sourceOrder = this.state.data.find((category) => category.id === sourceCategoryId).sub_menu
         // const sourceOrder = this.state.data.find((category) => console.log("======>",category,"sourceCategoryId==>",sourceCategoryId ))

          console.log("destination=>",sourceOrder)
    
          const destinationOrder = this.state.data.find(
            (category) => category.id === destinationCategoryId
          ).sub_menu

          console.log("destination=>",destinationOrder)
    
          const [removed] = sourceOrder.splice(source.index, 1)
          destinationOrder.splice(destination.index, 0, removed)
    
          destinationOrder[removed] = sourceOrder[removed]
          delete sourceOrder[removed]
    
          const updatedCategories = this.state.data.map((category) =>
            category.id === sourceCategoryId
              ? { ...category, sub_menu: sourceOrder }
              : category.id === destinationCategoryId
              ? { ...category, sub_menu: destinationOrder }
              : category
          )
    
          this.setState({data:updatedCategories})
        }
      }
    
      //Reordering categories
      if (type === 'droppable-category') {
        const updatedCategories = reorder(this.state.data, source.index, destination.index)
    
        // setCategories(updatedCategories)
        this.setState({data:updatedCategories})
      }
    }








     console.log("state=>",this.state)
  


    function Menus(menu, slug,index){
      var slugs ='';
      if(typeof menu.sub_menu === 'undefined'){
          if((menu.length > 0)){
              return(
                
                     menu.map((val, ind)=>{
                      if(typeof val.sub_menu !== 'undefined'){
                        if(val.sub_menu.length > 0){
                          
                           console.log("menu=>",menu)
                          return(
                            // <Drop key={val.id} id={val.id} type="droppable-item">
                            // <li ><span className="menu-item-bar menu-toggle"><i className="fa fa-arrows"></i>    {val.name} </span>	
                            
                            //   <ul >

                            //     {Menus(val.sub_menu,val.slug ,ind)}
                                  
                            //       {/* <li><a href="#">Link 2</a></li> */}
                            //   </ul>
                            // </li>	
                            // </Drop >

                            <Drag key={val.id} id={val.id} index={index } type="droppable-item">
                              <li ><span className="menu-item-bar menu-toggle"><i className="fa fa-arrows"></i>  {val.name} </span>	
                            
                                <ul >
                                <Drop key={val.id} id={val.id} type="droppable-item">

                                  {Menus(val.sub_menu,val.id,ind)}
                                    
                                </Drop>
                                </ul>
                              </li>	
                            </Drag>

                            
                        
                            
                          )
                        } else {
                            
                          
                        return (<>
                              <Drag key={val.id} id={val.id} index={ind} >

                                  <li ><span className="menu-item-bar"><i className="fa fa-arrows"></i> {val.name}	 </span>
                                  </li>	
                              </Drag>
                        </>) 
                      
                      }
                      } else {
      
                        return (<>
                                <Drag key={val.id} id={val.id} index={ind} >

                                    <li ><span className="menu-item-bar"><i className="fa fa-arrows"></i> {val.name}	 </span>
                                    </li>	
                                </Drag>
                          </>) 
                        
                        }
                    })
                  
               
              )
          } else{
              
              
              return (<>
                    <Drag key={menu.id} id={menu.id} index={index} type="droppable-item">

                    <li ><span className="menu-item-bar"><i className="fa fa-arrows"></i>   {menu.name}	  </span>
            
                    </li>	
      

                  </Drag>
              </>)

              
          }
      } else {
          return(
            <>
              <Drag key={menu.id} id={menu.id} index={index} >
              <li ><span className="menu-item-bar"><i className="fa fa-arrows"></i> {menu.name}	 </span>
              
              </li>	
              </Drag>

            
            </>
          
            

          )
      }
    }
    return(
      <>

        <DragAndDrop onDragEnd={handleDragEnd}>
          <Drop id="droppable" type="droppable-category">

            {
              this.state.data.map((value, index)=>{
                if(value.sub_menu.length > 0){
                  return(<>
                    <Drag key={value.id} id={value.id} index={index}>
                      <li ><span className="menu-item-bar menu-toggle"><i className="fa fa-arrows"></i>  {value.name} </span>	
                    
                        <ul >
                        <Drop key={value.id} id={value.id} type="droppable-item">

                          {Menus(value.sub_menu,value.slug,index)}
                            
                        </Drop>
                        </ul>
                      </li>	
                    </Drag>
                      
                  </>)
                }else{

                  return(
                    <Drop key={value.id} id={value.id} type="droppable-item">
                      <Drag key={value.id} id={value.id} index={index}>
                      <li ><span className="menu-item-bar"><i className="fa fa-arrows"></i>   {value.name}	 </span>
                      
                      </li>	
                      </Drag>
                    </Drop>
                    
                  )

                }
                
              })
            }
          </Drop>

        </DragAndDrop>
   
      </>
    )
  }
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const Drop = ({ id, type, ...props }) => {
  return (
    <Droppable droppableId={id} type={type}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps} {...props}>
            {props.children}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  )
}

const Drag = ({ id, index, ...props }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...props}>
            <div {...provided.dragHandleProps}>Drag handle</div>
            {props.children}
          </div>
        )
      }}
    </Draggable>
  )
}

