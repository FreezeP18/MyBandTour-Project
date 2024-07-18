let conciertosData = [];

function VerConciertosAdmin() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/BandTour/PrintConcerts',
        data: {},
        success: function (respuesta) {
            conciertosData = respuesta.result;
            llenarTablaAdmin(conciertosData);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function crearConcierto() {

    let Codigo = document.getElementById('bandaID').value;
    let fecha = document.getElementById('fechaConcierto').value;
    let hora = document.getElementById('horaConcierto').value;
    let pais = document.getElementById('pais').value;
    let dir = document.getElementById('direccion').value;

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/BandTour/CreateConcerts',
        data: {
            'BandaId': Codigo,
            'Time': fecha,
            'Hour': hora,
            'country': pais,
            'dir': dir
        },
        success: function (respuesta) {
            if (respuesta.result == "Concierto creado exitosamente") {
                VerConciertosAdmin();
                document.getElementById('crearModal').style.display = 'none';

                document.getElementById('bandaID').value = null;
                document.getElementById('fechaConcierto').value = null;
                document.getElementById('horaConcierto').value = null;
                document.getElementById('pais').value = null;
                document.getElementById('direccion').value = null;
            } else {
                alert('Hay un error');
            }
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function llenarTablaAdmin(data) {

    let bodyTable = document.getElementById('bodyTable');
    bodyTable.innerHTML = '';

    data.forEach(concierto => {
        let row = bodyTable.insertRow();

        let idCell = row.insertCell(0);
        idCell.innerHTML = concierto.ConciertoID;

        let bandaCell = row.insertCell(1);
        bandaCell.innerHTML = concierto.Banda;

        let generoCell = row.insertCell(2);
        generoCell.innerHTML = concierto.GeneroMusical;

        let fechaCell = row.insertCell(3);
        fechaCell.innerHTML = concierto.FechaConcierto;

        let horaCell = row.insertCell(4);
        horaCell.innerHTML = concierto.HoraConcierto;

        let paisCell = row.insertCell(5);
        paisCell.innerHTML = concierto.Pais;

        let direccionCell = row.insertCell(6);
        direccionCell.innerHTML = concierto.Direccion;

        let accionesCell = row.insertCell(7);
        accionesCell.innerHTML = `
            <button onclick='eliminarConcierto(${concierto.ConciertoID})'>Eliminar</button>
        `;
    });
}

function filtrarConciertosAdmin() {
    let input = document.getElementById('buscarBanda').value.toLowerCase();
    let filteredData = conciertosData.filter(concierto => concierto.Banda.toLowerCase().includes(input));
    llenarTablaAdmin(filteredData);
}

function eliminarConcierto(conciertoID) {
    
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/BandTour/DeleteConcerts',
        data: { 'ConciertoID': conciertoID },
        success: function (respuesta) {
            alert('Concierto eliminado exitosamente');
            VerConciertosAdmin();
        },
        error: function (error) {
            console.error('Error:', error);
            alert('Error al eliminar el concierto');
        }
    });
}
function Desloguear() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/BandTour/Logout',
        data: {},
        success: function (respuesta) {

            if (respuesta.Estado == 'Ok') {

                window.location.replace('/BandTour/Start');

            } else {
                alert('Ocurrio un error')
                console.log(respuesta.Estado);
            }
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });

}

