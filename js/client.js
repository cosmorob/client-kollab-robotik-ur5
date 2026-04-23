const socket = io('http://localhost:3000', {
    reconnection: true,
    reconnectionAttempts: 100,
    reconnectionDelay: 5000,
    forceNew: true
});

socket.on('connect_error', function () {
    socketError();
    robotError();
});

socket.on('connect', function () {
    socketRunning();
});

socket.on('disconnect', function () {
    socketError();
    robotError();
});

socket.on('error', function () {
    socketError();
    robotError();
});

socket.on('message', function (msg) {
    switch (msg.type) {
        case 'status':
            switch (msg.data) {
                case 'robot-running':
                    robotRunning();
                    break;
                case 'robot-working':
                    displayMessage('Montage läuft...', 'alert-success', false);
                    $('button.start-montage').prop('disabled', true);
                    $('#barcode').prop('disabled', true);
                    break;
                case 'robot-finished':
                    displayMessage('Montage erfolgreich abgeschlossen', 'alert-success', true);
                    $('button.start-montage').prop('disabled', false);
                    $('#barcode').prop('disabled', false);
            }
            break;
    }
});

/**
 * Fügt die Modelle der Website hinzu
 */
$(document).ready(function () {
    models.map(function (model) {
        $('.models').append(
            '<div class="col-6">\n' +
            '    <div class="card">\n' +
            '        <img class="card-img-top model-image" src="img/' + model.imageFile + '" alt="Modell Bild">' +
            '        <div class="card-body">\n' +
            '            <h5 class="card-title">' + model.name + '</h5>\n' +
            '            <button disabled type="button" class="btn btn-primary btn-block start-montage" data-toggle="modal" data-target="#affirmModal" data-name="' + model.name + '" data-identifier="' + model.modelIdentifier + '">Starten</button>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>');
    });
});

// Bestätigungsfenster
$('#affirmModal').on('show.bs.modal', function (event) {
    let $button = $(event.relatedTarget);
    let name = $button.data('name');
    let identifier = $button.data('identifier');
    let $modal = $(this);

    // Unterscheidung ob per Barcode oder Button Klick
    if ($button.length) {
        // Per Enter bestätigen
        $modal.off('keypress');
        $modal.keypress(function (e) {
            startRobot(identifier, name);
            $modal.modal('hide');
        });
        $modal.find('button.affirm').attr('data-name', name);
        $modal.find('button.affirm').attr('data-identifier', identifier);
        $modal.find('button.affirm').attr('onclick', 'startRobot("' + identifier + '", "' + name + '")');
        $modal.find('.modal-body').html('Montage wird gestartet für: ' + name);
    } else {
        let name = $modal.find('button.affirm').attr('data-name');
        let identifier = $modal.find('button.affirm').attr('data-identifier');

        $modal.off('keypress');
        $modal.keypress(function (e) {
            startRobot(identifier, name);
            $modal.modal('hide');
        });
    }
});

$("#affirmModal").on("hidden.bs.modal", function () {
    $('#barcode').focus();
});

/**
 * Prüft die Barcode Eingabe
 */
setInterval(checkBarcodeInput, 1000);

function checkBarcodeInput() {
    let i, $barcode = $('#barcode'), $modal = $('#affirmModal');
    let barcode = $barcode.val();

    // Prüfen ob der Barcode einem Modell zugeordnet werden kann
    for (i = 0; i < models.length; i++) {
        if (barcode === models[i].barcode) {
            $modal.find('.modal-body').html('Montage wird gestartet für: ' + models[i].name);
            $modal.find('button.affirm').attr('onclick', 'startRobot("' + models[i].modelIdentifier + '", "' + models[i].name + '")');
            $modal.find('button.affirm').attr('data-name', models[i].name);
            $modal.find('button.affirm').attr('data-identifier', models[i].modelIdentifier);
            $modal.find('button.affirm').attr('data', 'startRobot("' + models[i].modelIdentifier + '", "' + models[i].name + '")');
            $modal.modal('show');
            $barcode.val('');
        }
    }
}

/**
 * Started das Montageprogramm beim Roboter
 * @param modelIdentifier
 * @param modelName
 */
function startRobot(modelIdentifier, modelName) {
    console.log(modelIdentifier);
    console.log(modelName);
    let model = models.find(function (ele) {
        return ele.modelIdentifier === modelIdentifier;
    });
    console.log(model);

    if (model === undefined) {
        displayMessage('Montage für das Modell mit dem "modelIdentifier" ' + modelIdentifier + ' nicht möglich.', 'alert-danger', true);
        return;
    }

    socket.emit('montage', modelIdentifier);

}

/**
 * Zeigt eine Meldung am unteren Rand an.
 * @param message
 * @param type Typ der Nachricht. alert-success oder alert-danger
 * @param vanish Flagge ob die Nachricht bestehen bleiben soll oder nach drei Sekunden versteckt wird.
 */
function displayMessage(message, type, vanish) {
    if (typeof message !== 'string' || typeof type !== 'string') {
        return;
    }
    let $errorWrapper = $('.error-wrapper');

    $errorWrapper.html('');
    $errorWrapper.append('<div class="alert ' + type + '" role="alert">' + message + '</div>');

    if (vanish) {
        setTimeout(function () {
            $errorWrapper.children().fadeOut(1000);
        }, 3000);
    }

}

function socketInit() {
    $('.socket-info div:visible').fadeOut(300, '', function () {
        $('#socket-init').show();
    });
}

function robotInit() {
    $('.robot-info div:visible').fadeOut(300, '', function () {
        $('#robot-init').show();
    });
}

function socketError() {
    $('.socket-info div:visible').fadeOut(300, '', function () {
        $('#socket-error').show();
        $('button.start-montage').prop('disabled', true);
        $('#barcode').prop('disabled', true);
    });
}

function robotError() {
    $('.robot-info div:visible').fadeOut(300, '', function () {
        $('#robot-error').show();
        $('button.start-montage').prop('disabled', true);
        $('#barcode').prop('disabled', true);
    });
}

function socketRunning() {
    $('.socket-info div:visible').fadeOut(300, '', function () {
        $('#socket-running').show();
    });
}

function robotRunning() {
    $('.robot-info div:visible').fadeOut(300, '', function () {
        $('#robot-running').show();
        $('button.start-montage').prop('disabled', false);
        $('#barcode').prop('disabled', false);
        $('#barcode').focus();
    });
}