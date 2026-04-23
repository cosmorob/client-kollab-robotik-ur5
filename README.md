# Client für kollaborative Getriebemontage mit UR5

Dieses Projekt ist im Rahmen des Masterstudiums "Wirtschaftsinformatik / IT-Management" 2018
in Kollaboration mit einem Getriebehersteller entstanden. Ziel war es, eine experimentelle 
Mensch-Roboter-Kollaboration für eine Getriebemontage mit einem Universal Roboter UR5 umzusetzen.

## Architektur

Client App ↔ Websocket Port 3000 ↔ Server App ↔ TCP Server Port 30001 ↔ UR5

Der Client ist eine einfache Web-Applikation, die Websocket-Verbindung auf Port 3000 mit
der Server-Applikation herstellt. Die Server-Applikation kommuniziert mit dem UR5 
über einen TCP-Server auf Port 30001.

## UI

Das UI ist mit plain HTML, jQuery und Bootstrap 4 CSS erstellt. Beim Öffnen der Seite
wird versucht, eine Verbindung zum Server und zum UR5 (über Server) herzustellen.
Die Montage wird entweder über einen Auftragsbarcode oder über vorkonfigurierte 
Getriebe gestartet.