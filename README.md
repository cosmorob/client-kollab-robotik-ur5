# Client für kollaborative Getriebemontage mit UR5

Dieses Projekt ist 2018 im Rahmen des Masterstudiums "Wirtschaftsinformatik / IT-Management"
in Kollaboration mit einem Getriebehersteller entstanden. Ziel war es, eine experimentelle 
Mensch-Roboter-Kollaboration für eine Getriebemontage mit einem Universal Roboter UR5 umzusetzen.

![Hero](https://github.com/cosmorob/client-kollab-robotik-ur5/blob/main/img/hero.png?raw=true)

## Architektur

Client App ↔ Websocket Port 3000 ↔ Server App ↔ TCP Server Port 30001 ↔ UR5

Der Client ist eine einfache Webanwendung, die eine Websocket-Verbindung auf Port 3000 mit
der Server-Anwendung herstellt. Der Server kommuniziert mit dem UR5 über einen TCP-Server auf Port 30001.

Server: https://github.com/cosmorob/server-kollab-robotik-ur5/tree/main

![Hero 2](https://github.com/cosmorob/client-kollab-robotik-ur5/blob/main/img/hero-architecture.png?raw=true)

## UI

Das UI ist mit HTML, jQuery und Bootstrap 4 CSS erstellt. Beim Öffnen der Seite
wird versucht, eine Verbindung zum Server und zum UR5 (über Server) herzustellen.
Die Montage wird entweder über einen Auftragsbarcode oder über vorkonfigurierte 
Getriebe gestartet.
