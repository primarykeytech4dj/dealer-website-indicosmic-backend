import React from "react";
 import { CKEditor } from '@ckeditor/ckeditor5-react';

import ClassicEditor from'@ckeditor/ckeditor5-build-classic';
import { useState } from "react";

export default function Editor(props) {

//  const [saveData, setSaveData] = useState();
const [saveData,setSaveData] =useState();

const handlechange=(event, editor)=>{
    console.log("event",event)
    const data = editor.getData();
    console.log("editor",data)
       
     props.func(data)

}

// const editorConfiguration = {
//    // plugins: [  Bold, Italic, Essentials ],
//     toolbar: [ 'bold', 'italic', 'Essentials','image','link']
   
// };



  return (
    <div>

       {/* <h2>Description</h2> */}
        <div className="row ml-1">
          <label><b>Description</b></label>
        </div>
                <CKEditor
                    editor={ ClassicEditor }

                     data={props.data?props.data:""}
                    
                    // data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }

                    onChange={handlechange}
                    // onChange={ ( event, editor ) => {
                    //     const data = editor.getData();
                    //     console.log( { event, editor, data } );
                    //      setSaveData(data);
                    // } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                    config={
                        {
                            uploadUrl:'/upload'
                        }
                    }
                    // config={ editorConfiguration }
                />

  {/* <h5>Un-parsed data:</h5>
        {saveData}                 */}
    </div>
  );
}