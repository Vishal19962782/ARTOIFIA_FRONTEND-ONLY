import Swal from "sweetalert2";

export default function handleBid(e){
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure you want to bid',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, bid it!'
        
    })
}