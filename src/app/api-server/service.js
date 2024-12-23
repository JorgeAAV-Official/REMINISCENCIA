const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Reminiscencia',
  password: '03273025',
  port: 5432,
});

// Endpoint para crear un servidor
app.post('/crear-servidor', async (req, res) => {
  const { nombre_sala, max_jugadores, tipo_sala, mapa, usuario_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO servidores (nombre_sala, max_jugadores, tipo_sala, mapa, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre_sala, max_jugadores, tipo_sala, mapa, usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el servidor:', error);
    res.status(500).json({ error: 'Error al crear el servidor' });
  }
});

// Endpoint para obtener todos los servidores
app.get('/servidores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servidores');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los servidores:', error);
    res.status(500).json({ error: 'Error al obtener los servidores' });
  }
});

// Endpoint para eliminar un servidor
app.delete('/servidores/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM servidores WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Servidor eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Servidor no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el servidor:', error);
    res.status(500).json({ error: 'Error al eliminar el servidor' });
  }
});

// Endpoint para crear un personaje
app.post('/crear-personaje', async (req, res) => {
  const { nombre, edad, estatura, fuerza, destreza, constitucion, inteligencia, sabiduria, apariencia, musculatura, punteria, salud, estamina, balance, resistencia, conocimiento, fVoluntad, carisma, logica, intuicion, verborrea, servidor_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO personajes (nombre, edad, estatura, fuerza, destreza, constitucion, inteligencia, sabiduria, apariencia, musculatura, punteria, salud, estamina, balance, resistencia, conocimiento, fVoluntad, carisma, logica, intuicion, verborrea, servidor_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *',
      [nombre, edad, estatura, fuerza, destreza, constitucion, inteligencia, sabiduria, apariencia, musculatura, punteria, salud, estamina, balance, resistencia, conocimiento, fVoluntad, carisma, logica, intuicion, verborrea, servidor_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el personaje:', error);
    res.status(500).json({ error: 'Error al crear el personaje' });
  }
});

app.post('/register', async (req, res) => {
  const { nombre, usuario, email, contrasena, rol } = req.body;

  // Validar correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Correo electrónico no válido.' });
  }

  // Validar contraseña
  if (contrasena.length < 8) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
  }

  try {
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const result = await pool.query(
      'INSERT INTO usuarios (nombre, usuario, email, contrasena, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, usuario, email, hashedPassword, rol]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Endpoint para iniciar sesión
app.post('/login', async (req, res) => {
  const { usuario, contrasena, rol } = req.body;

  try {
    // Buscar al usuario por nombre de usuario y rol
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE usuario = $1 AND rol = $2',
      [usuario, rol]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Comparar contraseñas
      const match = await bcrypt.compare(contrasena, user.contrasena);

      if (match) {
        res.json({ success: true, role: user.rol });
      } else {
        res.json({ success: false, message: 'Contraseña incorrecta' });
      }
    } else {
      res.json({ success: false, message: 'Usuario o rol incorrectos' });
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Configuración del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
