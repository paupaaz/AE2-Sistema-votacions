
const WebSocket = require('ws')
const fs = require('fs')

// port servidor
const port = process.env.PORT || 3000

// Llegir vots guardats
let votos = [0, 0, 0, 0]

if (fs.existsSync('votos.json')) {
  votos = JSON.parse(fs.readFileSync('votos.json', 'utf8'))
} else {
  fs.writeFileSync('votos.json', JSON.stringify(votos))
}

// Crear servidor WebSocket
const servidor = new WebSocket.Server({ port: port })

console.log('Servidor WebSocket iniciat al port ' + port)

// Quan es connecta un client
servidor.on('connection', (socket) => {
  console.log('Client connectat')

  // Enviar vots actuals al client
  socket.send(JSON.stringify({
    tipo: 'votos',
    votos: votos
  }))

  // Rebre missatges del client
  socket.on('message', (mensaje) => {
    const dades = JSON.parse(mensaje)

    if (dades.tipo === 'votar') {
      const opcio = dades.opcio

      if (Number.isInteger(opcio) && opcio >= 0 && opcio < 4) {
        votos[opcio]++

        // Guardar vots al fitxer
        fs.writeFileSync('votos.json', JSON.stringify(votos))

        // Enviar resultats a tots els clients
        servidor.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              tipo: 'votos',
              votos: votos
            }))
          }
        })
      }
    }
  })
})
