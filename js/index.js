$(document).ready(() => {
    $.getJSON('../resources/resultados.json', function (datosJson) {
        $("#productos").DataTable({
            data: datosJson,
            columns: [
                {
                    title: 'Carrito', data: null, render: (data) => {
                        return '<button type="button" class="btn btn-secondary" onclick="agregar(' + data.Clave + ')"><i class="fa-solid fa-cart-plus"></i></button>'
                    }
                },
                { title: "Clave", data: "Clave" },
                { title: "Producto", data: "Producto" },
                { title: "Categoria", data: "Categoria" },
                { title: "Existencia", data: "Existencia" },
                { title: "Nivel de Reorden", data: "Nivel de Reorden" },
                {
                    title: 'Operaciones', data: null, render: (data) => {
                        return '<button type="button" class="btn btn-danger" onclick="eliminar(' +
                            data.Clave + ')"><i class="fa-solid fa-trash-can"></i></button> <button type="button" class="btn btn-warning" onclick="editar(' +
                            data.Clave + ')"><i class="fa-solid fa-pen-nib"></i></button>';
                    }
                }
            ],
            responsive: true,
            "order": [1, 'asc'],
            columnDefs: [
                { responsivePriority: 1, targets: 6 },
                { responsivePriority: 2, targets: [1, 2] },
                { responsivePriority: 3, targets: -1 },
            ],
            rowCallback: function (row, data) {
                var existencia = parseFloat(data['Existencia']);
                var nivelReorden = parseFloat(data['Nivel de Reorden']);
                if (nivelReorden > existencia) {
                    $(row).find('td').css({
                        'background-color': 'rgb(94, 33, 41)',
                        'color': 'rgb(245, 255, 191)',
                        'font-weight': 'bold'
                    });
                }
            }
        });
    });
});

function eliminar(id) {
    alert("se elimino el producto " + id);
}

function editar(id) {
    alert("Se edito el producto " + id);
}

function agregar(id) {
    alert("Se agrego al carrito el producto " + id);
}