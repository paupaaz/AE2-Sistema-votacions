
const WebSocket = require('ws')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 3000
const votosPath = path.join(__dirname, 'votos.json')

let votos = [0, 0, 0, 0]

if (fs.existsSync(votosPath)) {
  try {
    const datos = fs.readFileSync(votosPath, 'utf8')
    votos = JSON.parse(datos)
  } catch (error) {
    console.warn('No s\'ha pogut llegir el fitxer de vots, es reinicia.')
    fs.writeFileSync(votosPath, JSON.stringify([0, 0, 0, 0]))
    votos = [0, 0, 0, 0]
  }
} else {
  fs.writeFileSync(votosPath, JSON.stringify(votos))
}

// Crear servidor WebSocket
const servidor = new WebSocket.Server({ port: port })

servidor.on('error', (error) => {
  console.error('No s\'ha pogut iniciar el servidor WebSocket:', error.message)
  process.exit(1)
})

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
        fs.writeFileSync(votosPath, JSON.stringify(votos))

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
