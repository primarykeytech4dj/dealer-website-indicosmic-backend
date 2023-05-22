

const validation = (fieldName, fieldValue,validations) => {
            
    let error={}
    let isValid = true;
   // let isMax = 1000;
    if(typeof validations[fieldName] !== "undefined"){
        Object.entries(validations[fieldName]).map(([key,value])=>{
     
            let temp =  fieldName.replace(/_/g, " "); 
            var name = temp
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
      
            if(key === 'required'){
                if((fieldValue.length < 0) || (fieldValue === '') || (fieldValue === null)){
                    error[fieldName] = `${name} Field is required`
                    isValid = false;
                } 
            } else if(key === 'min'){
                if(fieldValue.length < value){
                    error[fieldName] = `${name} must be more than ${value} characters`
                    isValid = false;
                }
            } else if(key === 'max'){
                if(fieldValue.length > value){
                    error[fieldName] = `${name} must be less than ${value} characters`
                    isMax = value;
                    isValid = false;
                }
            } else if(key === 'type'){
                if(value === 'alpha'){
                    if(!fieldValue.match(/^[A-Za-z\s]*$/)){
                        error[fieldName] = `${name} must be String characters`
                        isValid = false;
                    }
                } else if(value === 'AlphaNumeric'){
                    if(!fieldValue.match(/^[A-Za-z0-9,-.\s]*$/)){
                        error[fieldName] = `${name} must be String Alpha Numeric`
                        isValid = false;
                    }
                } else if(value === 'Numeric'){
                    if(!fieldValue.match(/^[0-9]*$/)){
                        error[fieldName] = `${name} must be String Numeric`
                        isValid = false;
                    }
                } else if(value === 'email'){
                    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                    if(!fieldValue.match(reg) ){
                        error[fieldName] = `${name} must be in Email format`
                        isValid = false;
                    }
                } 
                   
            }
            if(isValid == true) {
                
                error[fieldName] = '';
            }
        })
        // this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
    }
    // if(isMax >= fieldValue.length){
    //    this.setState(old=>({...old,[fieldName]: fieldValue } ))
    // }
    // this.setState(old=>({...old,[fieldName]: fieldValue } ))
}

export default validation