$(document).ready(() => {
    $.getJSON('../resources/resultados.json', function (datosJson) {
        $("#productos").DataTable({
            data: datosJson,
            columns: [
                {
                    title: 'Carrito', data: null, render: (data) => {
                        return '<button type="button" class="btn btn-secondary" onclick="agregarCarrito(' + data.Clave + ')"><i class="fa-solid fa-cart-plus"></i></button>'
                    }
                },
                { title: "Clave", data: "Clave" },
                { title: "Producto", data: "Producto" },
                { title: "Categoria", data: "Categoria" },
                { title: "Existencia", data: "Existencia" },
                { title: "Nivel de Reorden", data: "Nivel de Reorden" },
                {
                    title: 'Operaciones', data: null, render: (data, type) => {
                        return '<button type="button" class="eliminar btn btn-danger"><i class="fa-solid fa-trash-can"></i></button> <button class="editar btn btn-warning" type="button"><i class="fa-solid fa-pen-nib"></i></button>';
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
        var table = $('#productos').DataTable();

        $('#productos').on('click', '.editar', function () {
            var fila = $(this).closest('tr');
            var datosFila = table.row(fila).data();
            var nivelR = "Nivel de Reorden";


            var claveE = datosFila.Clave;
            var productoE = datosFila.Producto;
            var categoriaE = datosFila.Categoria;
            var existenciaE = datosFila.Existencia;
            var nivelReordenE = datosFila.nivelR;

            $("#modalEditar").modal("show");

            $("#productoE").val(productoE);
            $("#categoriaE").val(categoriaE);
            $("#existenciaE").val(existenciaE);
            $("#nivelE").val(nivelReordenE);

        });

        $("#editarFila").on('click', function () {
            var productoEd = document.getElementById('productoE').value;
            var categoriaEd = document.getElementById('categoriaE').value;
            var existenciaEd = document.getElementById('existenciaE').value;
            var nivelReordenEd = document.getElementById('nivelE').value;

            alert(productoEd);

            var fila = table.row('.selected').node();
            table.cell(fila, 1).data(productoEd);
            table.cell(fila, 2).data(categoriaEd);
            table.cell(fila, 3).data(existenciaEd);
            table.cell(fila, 4).data(nivelReordenEd);

            $('#modalEditar').modal('hide');
        });

        $('#productos').on('click', '.eliminar', function () {
            var fila = $(this).closest('tr');
            table.row(fila).remove().draw();
        });
    });
});

function agregar() {
    var table = $('#productos').DataTable();

    var claveA = document.getElementById('clave').value;
    var productoA = document.getElementById('producto').value;
    var categoriaA = document.getElementById('categoria').value;
    var existenciaA = document.getElementById('existencia').value;
    var nivelReordenA = document.getElementById('nivel').value;

    table.row.add({
        "Clave": claveA,
        "Producto": productoA,
        "Categoria": categoriaA,
        "Existencia": existenciaA,
        "Nivel de Reorden": nivelReordenA
    }).draw();

    $('#modalAgregar').modal('hide');
}
