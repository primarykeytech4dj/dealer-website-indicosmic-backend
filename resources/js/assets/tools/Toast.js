import React from 'react'
import './Toast.css';
import Swal from 'sweetalert2'
export default function Toast({text, type}) {
    const Toast = Swal.mixin({ //when firing the toast, the first window closes automatically
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      Toast.fire({
        type: 'success',
        title: text
      })
   
}
