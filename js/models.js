/**
 * Tragen Sie hier die verschiedenen Getriebemodelle ein.
 * @type {Array.<Object>} Array mit Objekten die jeweils ein Getriebe beschreiben.
 * @property models[].name Name des Getriebes
 * @property models[].imageFile Bilddateiname des Getriebes. Abgelegt unter /img
 * @property models[].instructionFile Anleitung im PDF-Format. Abgelegt unter /pdf
 * @property models[].barcode Barcode des Getriebes. Wird für den Barcode-Scanner genutzt um das Getriebe zu identifizieren
 * @property models[].modelIdentifier Identifiert das Getriebe beim Roboter. Steuert das Montageprogramm am Roboter.
 */
models = [
    {
        'name': 'SK072.1 / SK172.1',
        'imageFile' : 'sk072-sk172.png',
        'instructionFile' : 'sk072-sk172.pdf',
        'barcode': '19205955839',
        'modelIdentifier': '(1)'
    },
    {
        'name': 'SK372.1 / SK572.1 / SK672.1',
        'imageFile' : 'sk372-sk572-sk672.png',
        'instructionFile' : 'sk372-sk572-sk672.pdf',
        'barcode': '4029589932',
        'modelIdentifier': '(2)'
    }
];