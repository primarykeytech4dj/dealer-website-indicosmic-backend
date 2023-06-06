import React, { useRef } from 'react'
import { Table } from 'react-bootstrap';
import { useReactToPrint } from "react-to-print";



import Api from '../../../../api';

class ReportDocument extends React.Component {
  constructor(props) {
    super(props);
    this.apiCtrl = new Api();
    this.state = {

    }
  }




  render() {

    return (<>

      <div style={{ margin: "10px", background: "white" }}>



        <table hover className="table align-middle table-nowrap table-centered mb-0">
          <thead>
            <tr style={{ color: "black", fontWeight: "bold" }}>
              <td >
                <div className='row'>
                  <div className='col-md-12 d-flex justify-content-center' style={{ marginBottom: "-9px" }}>
                    <h4>KAMALA PARK NO.1 CO-OPERATIVE HOUSING SOCIETY LIMITED.</h4>


                  </div>
                  <div className='col-md-12 d-flex justify-content-center' style={{ marginBottom: "-16px" }}>
                    <p>REGN NO. TNA/(TNA)/HSG/TC/6696/1993-1994</p>


                  </div>
                  <div className='col-md-12 d-flex justify-content-center' style={{ marginBottom: "-21px" }}>
                    <p>PHATAK ROAD POST OFFICE BLDG.. BHAYANDER(WEST) TALUKA &DISTRICT THANE</p>


                  </div>

                  <div className='col-md-12 d-flex justify-content-center' style={{ marginBottom: "-4px" }}>
                    <h7>MAINTENANCE BILL</h7>


                  </div>


                  <div className='col-md-12 d-flex justify-content-center' style={{ marginBottom: "-9px" }}>
                    <h7>BILL FOR THE PERIAOB OF 1-Feb-2023 To 28-feb 2023 </h7>


                  </div>

                </div>

                <div className='row'>
                  <div className='col-md-6 d-flex justify-content-start'>
                    <label>FLAT NO:</label><span>204</span>
                  </div>
                  <div className='col-md-6 d-flex justify-content-end' >
                    <label>BILL NO:</label><span>1955/55-23</span>
                  </div>

                </div>

                <div className='row'>

                  <div className='col-md-4'>
                    <label>FLAT NO:</label><span>204</span>
                  </div>
                  <div className='col-md-4'>
                    <label>DUE DATE :</label><span>28-feb-2023</span>
                  </div>
                  <div className='col-md-4 d-flex justify-content-end'>
                    <label>BILL DATE:</label><span>1-2-2023</span>
                  </div>

                </div>
              </td>




            </tr>





          </thead>
          <tbody>
            <td>

              <table className="table align-middle table-nowrap table-centered mb-0">
                <thead>
                  <tr>
                    <th style={{ width: "70px" }}>Sr.</th>
                    <th >Particulars</th>
                    <th></th>
                    <th></th>
                    <th className="text-end">Price</th>


                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">01</th>
                    <td >
                      <div>
                        <h5 className="text-truncate font-size-14 mb-1">Black Strap A012</h5>
                        {/* <p className="text-muted mb-0">Watch, Black</p> */}
                      </div>
                    </td>
                    <td></td>

                    <td></td>
                    <td className="text-end">$ 245.50</td>
                  </tr>




                  <tr>
                    <th scope="row">02</th>
                    <td >
                      <div>
                        <h5 className="text-truncate font-size-14 mb-1">Stainless Steel S010</h5>
                        {/* <p className="text-muted mb-0">Watch, Gold</p> */}
                      </div>
                    </td>
                    <td></td>
                    <td></td>

                    <td className="text-end">$491.00</td>
                  </tr>

                  <tr>
                    <th scope="row" colspan="4" className="text-end">Total</th>
                    <td className="text-end">$732.50</td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="4" className="text-end">ADD:INTEREST</th>
                    <td className="text-end">$732.50</td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="4" className="text-end">ARREARS</th>
                    <td className="text-end">$732.50</td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="4" className="text-end">ADVANCE</th>
                    <td className="text-end">$732.50</td>
                  </tr>

                  <tr>
                    <th scope="row" colspan="4" className="text-end">GRAND TOTAL</th>
                    <td className="text-end">$732.50</td>
                  </tr>




                </tbody>
              </table>

            </td>
          </tbody>

          <tfoot>
            <tr>
              <td>
                <div className='row'>

                  <h4>Amount in Words:Rs.One Lakh Forty Seven Thousand Seven Hundred Twelve Only</h4>
                  <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events
                    Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.
                  </p>

                  <div className='col-md-12 d-flex justify-content-end'>

                    <b>For KAMALA PARK NO.1 CO-OPERATIVE HOUSING SOCIETY LIMITED</b>

                  </div>

                </div>


              </td>
            </tr>
          </tfoot>
        </table>


       


      </div>
        
    </>)

   
  }
}


export default function InvoiceReport(props){
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ReportDocument ref={componentRef} {...props} />
      <button onClick={handlePrint} className="btn btn-success me-1 d-flex justify-content-end" >Print</button>
    </div>
    // <div className="d-print-none mt-4">
    // <div className="float-end">
    //   <a href={"javascript:window.print()"} className="btn btn-success me-1"><i className="fa fa-print"></i></a>
    //   {/* <a href="#" className="btn btn-primary w-md">Send</a> */}
    // </div>
  // </div>

  )
}


