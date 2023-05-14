$(document).ready(() => {
    $.getJSON('../resources/resultados.json', function (datosJson) {
        $("#productos").DataTable({
            data: datosJson,
            columns: [
                { title: "Clave", data: "Clave" },
                { title: "Producto", data: "Producto" },
                { title: "Categoria", data: "Categoria" },
                { title: "Existencia", data: "Existencia" },
                { title: "Nivel de Reorden", data: "Nivel de Reorden" },
                {
                    title: 'Operaciones', data: null, render: (data, type) => {
                        return '<button type="button" onclick="eliminar(' +
                            data.employeeID + ')">Eliminar</button> <button type="button" onclick="editar(' +
                            data.employeeID + ')">Editar</button>';
                    }
                }
            ],
            responsive: true,
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

}

function editar(id) {
}



