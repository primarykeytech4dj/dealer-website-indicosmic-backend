import React from "react";
import Api from "../../../../api";
import Button from '@mui/material/Button';
import { Box, Divider } from '@mui/material';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Switch from "@mui/material/Switch";
import MaterialButton from "../../../../Tags/MaterialButton";
import { ThirteenMp } from "@mui/icons-material";
import TextEditor from "../TextEditor/Text_Editor";
import MaterialSelect from "../../../../Tags/MaterialSelect";

import { API_CONSTANTS } from "../../../../assets/constant";

export class ComapnyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            comapnyDetails: {
                ...this.props.data,
              

            },

            imageshow: {},

            errors: {},
            validation: {
                company_name: { required: true, min: 4, type: 'alpha' },
                logo: { required: false, },
                meta_keyword: { required: false, },
                meta_description: { required: false, },
                domain: { required: true, },
                sub_domain: { required: false, },
                type: { required: true, },
                about_company: { required: true },
                company_mission: { required: false },
                company_vision: { required: false },
                nature_of_business: { required: false, },
                pan_no: { required: false, min: 10, max: 10, type: "pan" },
                gst_no: { required: false, min: 15, max: 15, type: "gst" },
                adhaar_no: { required: false, min: 12, max: 12, type: "aadhar" }



            },
            isValid: false,



        }
        this.apiCtrl = new Api;

    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.data.id !== this.props.data.id) {
            // this.setState(old=>({...old,comapnyDetails:{...this.props.data}}))
            this.setState({ comapnyDetails: { ...this.props.data } })
        }
        if (prevState.comapnyDetails !== this.state.comapnyDetails) {
            this.props.func({...this.state.comapnyDetails})
        }
    }

     componentDidMount(){
        this.setState(old=>({...old,comapnyDetails:{...old.comapnyDetails,domain:API_CONSTANTS.domain}}))
     }



    render() {

        const validation = (fieldName, fieldValue) => {
            // console.log("fieldname",fieldName,"fieldvalue",fieldValue)

            let error = {}
            let isValid = true;
            let isMax = 1000;
            if (typeof this.state.validation[fieldName] !== "undefined") {
                Object.entries(this.state.validation[fieldName]).map(([key, value]) => {

                    let temp = fieldName.replace(/_/g, " ");
                    var name = temp
                        .toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');

                    if (key === 'required') {
                        if (((fieldValue.length < 0) || (fieldValue === '') || (fieldValue === null)) && (value)) {
                            error[fieldName] = `${name} Field is required`
                            isValid = false;
                        }
                    } else if (key === 'min') {
                        if (fieldValue.length < value) {
                            error[fieldName] = `${name} Is Invalid`
                            isValid = false;
                        }
                    } else if (key === 'max') {
                        if (fieldValue.length > value) {
                            error[fieldName] = `${name} Is Invalid`
                            isMax = value;
                            isValid = false;
                        }
                    } else if (key === 'type') {
                        if (value === 'alpha') {
                            if (!fieldValue.match(/^[A-Za-z\s]*$/)) {
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }
                        } else if (value === 'AlphaNumeric') {
                            if (!fieldValue.match(/^[A-Za-z0-9,-.\s]*$/)) {
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }
                        } else if (value === 'Numeric') {
                            if (!fieldValue.match(/^[0-9]*$/)) {
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }
                        } else if (value === 'email') {
                            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                            if (!fieldValue.match(reg)) {
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }
                        }
                        else if (value === 'pan') {
                            let reg = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
                            if (!fieldValue.match(reg)) {
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }
                        } else if (value == "aadhar") {
                            let reg = /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/
                            if (!fieldValue.match(reg)) {
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }

                        } else if (value == "gst") {
                            let reg = /^[0-9]{2}[a-zA-Z]{3}[cphfatbljgCPHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1}$/;
                            if (!fieldValue.match(reg)) {
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }

                        }



                    }
                    if (isValid) {

                        error[fieldName] = '';
                    }
                })
                // console.log("erroe=>",error)    
                this.setState(old => ({ ...old, errors: { ...old.errors, ...error } }))
            }
            if ((fieldName === "company_mission_image") || (fieldName === "logo") || (fieldName === "about_company_image") || (fieldName === "company_vision_image")) {
                this.setState(old => ({ ...old, comapnyDetails: { ...old.comapnyDetails, [fieldName]: fieldValue } }))


            }

            if (isMax >= fieldValue.length) {
                //this.setState(old => ({...old,[fieldName]: fieldValue }) ) 
                this.setState(old => ({ ...old, comapnyDetails: { ...old.comapnyDetails, [fieldName]: fieldValue } }))

            }



        }

        const handleChange = (e) => {



            if ((e.target.name === "company_mission_image") || (e.target.name === "logo") || (e.target.name === "about_company_image") || (e.target.name === "company_vision_image")) {

                validation(e.target.name, e.target.files[0])
                //this.setState(old=>({...old,comapnyDetails:{...old.comapnyDetails,[e.target.name]:e.target.files[0]}}))
                this.setState(old => ({ ...old, imageshow: { ...old.imageshow, [e.target.name]: URL.createObjectURL(e.target.files[0]) } }))
            } else {

                validation(e.target.name, e.target.value)
                //this.setState(old=>({...old,comapnyDetails:{...old.comapnyDetails,[e.target.name]:e.target.value}}))

            }

            this.props.func({ ...this.state.comapnyDetails })




            // this.setState({errors: ''})
        }
        const next = () => {


            let errors = {};
            let isValid = true;
            let fieldValue = '';

            Object.entries(this.state.validation).map(([fieldName, value]) => {
                fieldValue = (typeof this.state.comapnyDetails[fieldName] !== 'undefined') ? (this.state.comapnyDetails[fieldName] !== null ? this.state.comapnyDetails[fieldName] : "") : '';
                console.log("fieldValue=>", fieldValue)
                if (typeof this.state.validation[fieldName] !== "undefined") {
                    Object.entries(this.state.validation[fieldName]).map(([key, value]) => {
                        let temp = fieldName.replace(/_/g, " ");
                        var name = temp
                            .toLowerCase()
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');

                        if (key === 'required') {
                            if (((fieldValue.length < 0) || (fieldValue === '') || (fieldValue === null)) && (value)) {
                                errors[fieldName] = `${name} Field is required`
                                isValid = false;
                            }
                        }
                        if (isValid) {

                            errors[fieldName] = '';
                        }

                    })
                    // console.log("erroe=>",errors)    
                    this.setState(old => ({ ...old, errors: { ...old.errors, ...errors } }))
                }

            })



            var count = 0;
            Object.entries(errors).map(([key, value]) => {
                if (value !== '') {
                    count += 1;
                }
            })
            // console.log("count=>",count)  
            console.log("erroe=>", errors)
            if (count > 0) {

                return false;
            }

            this.props.funcnext("2")


        }

        const type = {
            "Private Limited Company": "Private Limited Company",
            " Public Company": ' Public Company',
            " Sole Proprietorship": " Sole Proprietorship",
            " One Person Company": " One Person Company",
            "Partnership": "Partnership",
            "Limited Liability Partnership (LLP)": "Limited Liability Partnership (LLP)"
        }
        const theme = {
            "dealer": "Dealer",
            "ascentia": "Ascentia",
        }

        var domain=API_CONSTANTS.domain
        console.log("domain=>",domain)

        console.log("comapydetails props=>", this.props)
        console.log("comapydetails state=>", this.state.comapnyDetails)


        return (<>


            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor: 'white', borderRadius: "6px", padding: '2%' }}>
                <div className="row ml-1 mb-3">
                    <label><b>{"Company Details"} </b></label>
                </div>


                <div className="row mb-3">
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="company_name" value={this.state.comapnyDetails.company_name ? this.state.comapnyDetails.company_name : ""} label="Company Name" size={"small"} fullWidth onChange={handleChange}
                            helperText={
                                this.state.errors.company_name
                                    ? this.state.errors.company_name
                                    : ''
                            }
                            error={this.state.errors.company_name ? true : false}
                        />

                    </div>
                    <div className={`${this.state.imageshow.logo||this.state.comapnyDetails.logo ? "col-md-3 mb-3" : "col-md-4 mb-3"}`}>
                        <MaterialTextField size={"small"} type="file" name="logo" label="Logo" onChange={handleChange} fullWidth
                            helperText={
                                this.state.errors.logo
                                    ? this.state.errors.logo
                                    : ''
                            }
                            error={this.state.errors.logo ? true : false}
                        />

                    </div>

                    {this.state.imageshow.logo ?
                        <div className="col-md-1 mb-3">

                            <img size={"small"} style={{ width: "57px", height: "55px" }} src={this.state.imageshow.logo} />
                        </div>
                        : this.state.comapnyDetails.logo? <div className="col-md-1 mb-3">

                            <img size={"small"} style={{ width: "57px", height: "55px" }} src={this.state.comapnyDetails.logo} />
                       </div>:""
                    }

                    {/* <div className="col-md-4 mb-3">               
                        <Switch checked={this.state.is_active=="1"?true:false}  onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}   fullWidth />                 
                        { <strong> {"Active"} </strong>         }
                    </div> */}



                    {/* <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth size={"small"} name="website" label="Website" onChange={handleChange}
                          helperText={
                            this.state.errors.website
                            ? this.state.errors.website
                            : ''
                           }
                           error={this.state.errors.website?true:false}
                        />

                    </div> */}

                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth value={this.state.comapnyDetails.domain ? this.state.comapnyDetails.domain : ""} placeholder={"domain"} size={"small"} name="domain" label="Domain: eg(sub.domain.com)" onChange={handleChange}
                            helperText={
                                this.state.errors.domain
                                    ? this.state.errors.domain
                                    : ''
                            }

                            error={this.state.errors.domain ? true : false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth value={this.state.comapnyDetails.sub_domain ? this.state.comapnyDetails.sub_domain : ""} size={"small"} placeholder={"sub"} name="sub_domain" label="Sub Domain: eg(sub.domain.com)" onChange={handleChange}
                            helperText={
                                this.state.errors.sub_domain
                                    ? this.state.errors.sub_domain
                                    : ''
                            }
                            error={this.state.errors.sub_domain ? true : false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth size={"small"} value={this.state.comapnyDetails.website ? this.state.comapnyDetails.website : ""} placeholder={"website"} name="website" label="Website" onChange={handleChange}
                        //   helperText={
                        //     this.state.errors.subdomain
                        //     ? this.state.errors.subdomain
                        //     : ''
                        //    }
                        //    error={this.state.errors.subdomain?true:false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialSelect data={type} value={this.state.comapnyDetails.type ? this.state.comapnyDetails.type : ""} fullWidth size={"small"} name="type" label="Type" onChange={handleChange}
                            helperText={
                                this.state.errors.type
                                    ? this.state.errors.type
                                    : ''
                            }
                            error={this.state.errors.type ? true : false}
                        />


                    </div>

                    {/* <div className="col-md-4 mb-3">
                        <MaterialSelect data={theme} defaultValue={"dealer"} value={this.state.comapnyDetails.template ? this.state.comapnyDetails.template : ""} fullWidth size={"small"} name="template" label="Theme" onChange={handleChange}
                            helperText={
                                this.state.errors.template
                                    ? this.state.errors.template
                                    : ''
                            }
                            error={this.state.errors.template ? true : false}
                        />


                    </div> */}
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth size={"small"} value={this.state.comapnyDetails.about_company ? this.state.comapnyDetails.about_company : ""} name="about_company" label="About Company" onChange={handleChange}
                            helperText={
                                this.state.errors.about_company
                                    ? this.state.errors.about_company
                                    : ''
                            }
                            error={this.state.errors.about_company ? true : false}
                        />



                    </div>
                    <div className={`${this.state.imageshow.about_company_image||this.state.comapnyDetails.about_company_image ? "col-md-3 mb-3" : "col-md-4 mb-3"}`}>
                        <MaterialTextField fullWidth size={"small"} type="file" name="about_company_image" label="About Company Image" onChange={handleChange}
                            helperText={
                                this.state.errors.about_company_image
                                    ? this.state.errors.about_company_image
                                    : ''
                            }
                            error={this.state.errors.about_company_image ? true : false}
                        />

                    </div>

                    {this.state.imageshow.about_company_image ?
                        <div className="col-md-1 mb-3">
                            <img style={{ width: "57px", height: "55px" }} src={this.state.imageshow.about_company_image} />
                        </div>
                        :this.state.comapnyDetails.about_company_image?  <div className="col-md-1 mb-3">
                           <img style={{ width: "57px", height: "55px" }} src={this.state.comapnyDetails.about_company_image} />
                        </div>:""

                    }

                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth size={"small"} value={this.state.comapnyDetails.company_mission ? this.state.comapnyDetails.company_mission : ""} name="company_mission" label="Company Mission" onChange={handleChange}
                            helperText={
                                this.state.errors.company_mission
                                    ? this.state.errors.company_mission
                                    : ''
                            }
                            error={this.state.errors.company_mission ? true : false}
                        />

                    </div>
                    <div className={`${this.state.imageshow.company_mission_image ||this.state.comapnyDetails.company_mission_image? "col-md-3 mb-3" : "col-md-4 mb-3"}`}>
                        <MaterialTextField fullWidth size={"small"} type="file" name="company_mission_image" label="Company Mission Image" onChange={handleChange}
                            helperText={
                                this.state.errors.company_mission_image
                                    ? this.state.errors.company_mission_image
                                    : ''
                            }
                            error={this.state.errors.company_mission_image ? true : false}
                        />

                    </div>

                    {this.state.imageshow.company_mission_image ?
                        <div className="col-md-1 mb-3">

                            <img style={{ width: "57px", height: "55px" }} src={this.state.imageshow.company_mission_image} />
                        </div>
                        :this.state.comapnyDetails.company_mission_image?<div className="col-md-1 mb-3">

                            <img style={{ width: "57px", height: "55px" }} src={this.state.comapnyDetails.company_mission_image} />
                        </div>:""
                    }

                    <div className="col-md-4 mb-3">
                        <MaterialTextField value={this.state.comapnyDetails.company_vision ? this.state.comapnyDetails.company_vision : ""} fullWidth size={"small"} name="company_vision" label="Company Vision" onChange={handleChange}
                            helperText={
                                this.state.errors.company_vision
                                    ? this.state.errors.company_vision
                                    : ''
                            }
                            error={this.state.errors.company_vision ? true : false}
                        />

                    </div>
                    <div className={`${this.state.imageshow.company_vision_image ||this.state.comapnyDetails.company_vision_image ? "col-md-3 mb-3" : "col-md-4 mb-3"}`}>
                        <MaterialTextField size={"small"} fullWidth type="file" name="company_vision_image" label="Company Vision Image" onChange={handleChange}
                            helperText={
                                this.state.errors.company_vision_image
                                    ? this.state.errors.company_vision_image
                                    : ''
                            }
                            error={this.state.errors.company_vision_image ? true : false}
                        />

                    </div>

                    {this.state.imageshow.company_vision_image ?
                        <div className="col-md-1 mb-3">

                            <img style={{ width: "57px", height: "55px" }} src={this.state.imageshow.company_vision_image} />
                        </div>
                        :this.state.comapnyDetails.company_vision_image? <div className="col-md-1 mb-3">

                           <img style={{ width: "57px", height: "55px" }} src={this.state.comapnyDetails.company_vision_image} />
                         </div>:""
                    }
                    <div className="col-md-4 mb-3">
                        <MaterialTextField size={"small"} fullWidth value={this.state.comapnyDetails.nature_of_business ? this.state.comapnyDetails.nature_of_business : "dealership"} name="nature_of_business" label="Nature of business" onChange={handleChange}
                            helperText={
                                this.state.errors.nature_of_business
                                    ? this.state.errors.nature_of_business
                                    : ''
                            }
                            error={this.state.errors.nature_of_business ? true : false}
                        />

                    </div>






                </div>



                {/* <TextEditor label={"About Company"}/> */}







                <div className="row ml-1 mb-3">
                    <label><b>{"SEO Stuff"} </b></label>
                </div>


                <div className="row mb-3">

                    <div className="col-md-4 mb-3">
                        <MaterialTextField value={this.state.comapnyDetails.meta_keyword ? this.state.comapnyDetails.meta_keyword : ""} fullWidth size={"small"} name="meta_keyword" label="Meta Keyword" onChange={handleChange}
                            helperText={
                                this.state.errors.meta_keyword
                                    ? this.state.errors.meta_keyword
                                    : ''
                            }
                            error={this.state.errors.meta_keyword ? true : false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth value={this.state.comapnyDetails.meta_description ? this.state.comapnyDetails.meta_description : ""} size={"small"} name="meta_description" label="Meta Description" onChange={handleChange}
                            helperText={
                                this.state.errors.meta_description
                                    ? this.state.errors.meta_description
                                    : ''
                            }
                            error={this.state.errors.meta_description ? true : false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth value={this.state.comapnyDetails.meta_title ? this.state.comapnyDetails.meta_title : ""} size={"small"} name="meta_title" label="Meta Title" onChange={handleChange}
                            helperText={
                                this.state.errors.meta_title
                                    ? this.state.errors.meta_title
                                    : ''
                            }
                            error={this.state.errors.meta_title ? true : false}
                        />

                    </div>

                </div>

                <div className="row ml-1 mb-3">
                    <label><b>{"Others"} </b></label>
                </div>

                <div className="row mb-3">

                    <div className="col-md-4 mb-3">
                        <MaterialTextField value={this.state.comapnyDetails.pan_no ? this.state.comapnyDetails.pan_no : ""} size={"small"} fullWidth name="pan_no" label="Pan Card Number" onChange={handleChange}
                            helperText={
                                this.state.errors.pan_no
                                    ? this.state.errors.pan_no
                                    : ''
                            }
                            error={this.state.errors.pan_no ? true : false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField size={"small"} value={this.state.comapnyDetails.gst_no ? this.state.comapnyDetails.gst_no : ""} fullWidth name="gst_no" label="GST Number" onChange={handleChange}
                            helperText={
                                this.state.errors.gst_no
                                    ? this.state.errors.gst_no
                                    : ''
                            }
                            error={this.state.errors.gst_no ? true : false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField size={"small"} value={this.state.comapnyDetails.adhaar_no ? this.state.comapnyDetails.adhaar_no : ""} fullWidth name="adhaar_no" label="Adhaar Card Number" onChange={handleChange}
                            helperText={
                                this.state.errors.adhaar_no
                                    ? this.state.errors.adhaar_no
                                    : ''
                            }
                            error={this.state.errors.adhaar_no ? true : false}
                        />

                    </div>

                </div>


                <Divider sx={{ borderColor: '#dac4c4' }} />

                <div className="col-md-12 mb-4 d-flex" style={{ justifyContent: "right", marginBottom: "auto" }}>
                    <MaterialButton style={{ backgroundColor: '#183883', marginTop: "14px", border: '1px solid #183883', height: 55 }} name="submit" text="Next" onClick={next} />
                </div>


            </Box>


        </>)
    }

}