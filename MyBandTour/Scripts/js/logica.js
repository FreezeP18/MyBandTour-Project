
let conciertosData = [];

function VerConciertos() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/BandTour/PrintConcerts',
        data: {},
        success: function (respuesta) {
            conciertosData = respuesta.result;
            llenarTabla(conciertosData);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function llenarTabla(data) {
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

    });
}

function filtrarConciertos() {
    let input = document.getElementById('buscarBanda').value.toLowerCase();
    let filteredData = conciertosData.filter(concierto => concierto.Banda.toLowerCase().includes(input));
    llenarTabla(filteredData);
}


function Autenticar() {
    let usuario = document.getElementById('usuario').value
    let contrasena = document.getElementById('contrasena').value

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/BandTour/Autenticar',
        data: { 'usuario': usuario, 'contrasena': contrasena },
        success: function (respuesta) {

            if (respuesta.Estado == 'Ok') {

                window.location.replace('/BandTour/Admin');

            } else {
                alert('Datos Erroneos')
                console.log(respuesta.Estado);
            }
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}
