﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype":"json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/BookList/edit?id=${data}" class="btn btn-success text-white" style='curson:pointer,width:70px'>
                                 Edit
                            </a>
                            &nbsp;&nbsp;
                    <a class="btn btn-danger text-white" style='curson:pointer,width:70px'
                                onClick=Delete('api/book?id='+${data}) >
                                 Delete
                            </a>       
                        </div>`;
                },"width":"40px"
            }
        ],
        "language": {
            "emptyTable":"no data found"
        },
        "width":"100%"
    })
}

// Delete Event - use swal for popup
function Delete(url) {
    swal({
        title: "Are you sure",
        text: "Once deleted ,you cannot recover",
        icon: "warning",
        buttons: true,
        dangerMode: true,        

    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}