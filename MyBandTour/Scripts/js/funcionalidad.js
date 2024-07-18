
$(document).ready(function () {
    $('#toggleLogin').on('click', function () {
        $('#moduloLogin').toggle();
    });
});
function ocultarLogin() {
    $('#moduloLogin').hide();
}

function mostrarModal() {
    document.getElementById('crearModal').style.display = 'block';
}

function ocultarModal() {
    document.getElementById('crearModal').style.display = 'none';
}

