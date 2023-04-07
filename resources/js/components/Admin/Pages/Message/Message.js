import React from "react";


const Message=({ user, message, classs })=>{

  if (user) {
    return (
      // <div className={`messageBox ${classs}`}  >
      //     {`${user}: ${message}`}
      // </div>
      <div className="d-flex flex-row justify-content-start mb-4">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="avatar 1"  style={{width:"45px",height:"100%"}}/>
        <div className="p-3 ms-3"  style={{borderRadius:"15px",backgroundColor: "#fffcfc"}}>
          <p className="small mb-0">{message}</p>
        </div>
      </div>
    )
  }else {


    return (
      // <div className={`messageBox ${classs}`}>
      //     {`You: ${message}`}
      // </div>
      <div className="d-flex flex-row justify-content-end mb-4">
        <div className="p-3 me-3 border"   style={{borderRadius:"15px",backgroundColor: "#f4f3ee"}} >
          <p className="small mb-0">{message}</p>
        </div>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
          alt="avatar 1"  style={{width:"45px",height:"100%"}}/>
      </div>
              
    )
  }
  


    
}

export default Message



/// return(<>

          
          
  //       <div className="d-flex flex-row justify-content-start mb-4">
  //         <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
  //           alt="avatar 1"  style={{width:"45px",height:"100%"}}/>
  //         <div className="p-3 ms-3"  style={{borderRadius:"15px",backgroundColor: "#fffcfc"}}>
  //           <p className="small mb-0">Hello and thank you for visiting MDBootstrap. Please click the video
  //             below.</p>
  //         </div>
  //       </div>

  //       <div className="d-flex flex-row justify-content-end mb-4">
  //         <div className="p-3 me-3 border"   style={{borderRadius:"15px",backgroundColor: "#f4f3ee"}} >
  //           <p className="small mb-0">Thank you, I really like your product.</p>
  //         </div>
  //         <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
  //           alt="avatar 1"  style={{width:"45px",height:"100%"}}/>
  //       </div>
        
  // </>)
