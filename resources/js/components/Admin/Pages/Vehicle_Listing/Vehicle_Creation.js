import React from "react";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import { Box } from "@mui/material";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";

 const VehicleCreation=()=>{


    return(<>
        <BreadCrumb breadcrumb={"Vehicle"} breadcrumbItem1='Create' />

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

            <div className="row">

                <div className="col-md-4" mb-3>
                    <MaterialSelect fullWidth label="Vehicle Model" data={""} />

                </div>
                <div className="col-md-4 mb-3">
                    <MaterialSelect fullWidth label="Vehicle Make" data={""} />

                </div>
                <div className="col-md-4 mb-3">
                    <MaterialSelect fullWidth label="Transmission" data={""} />

                </div>
                <div className="col-md-4 mb-3">
                    <MaterialSelect fullWidth label="Fule Type" data={""} />

                </div>
                <div className="col-md-4 mb-3">
                    <MaterialSelect fullWidth label="Vehile Status" data={""} />

                </div>

            </div>
            <div className="row mb-3">
                    <div className="col-md-12">
                    <FileUploader handleChange={handleChan}  multiple={true} name="product_images" types={fileTypes} />
                    </div>
               
                </div>
        </Box>


    </>)

}
export default VehicleCreation