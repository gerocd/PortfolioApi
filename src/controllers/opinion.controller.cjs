const { pool } = require('../db.cjs');

// Controlador para agregar una nueva opinión
const postOpinion = async (req, res) => {
    // Extraer datos del cuerpo de la solicitud
    const { name, location, opinion, calificacion } = req.body;
  
    try {
      // Validar la calificación (opcional)
      if (calificacion < 1 || calificacion > 5) {
        return res.status(400).json({ error: "La calificación debe estar entre 1 y 5." });
      }
  
      // Crear una nueva instancia de Opinion y guardarla en la base de datos
      const [rows] = await pool.query('INSERT INTO opinions(name, location, opinion, calificacion) VALUES (?,?,?,?)',
        [name, location, opinion, calificacion]);
  
      // Respuesta exitosa
      res.send({
        idOpinion: rows.insertId,
        name,
        location,
        opinion,
        calificacion,
      });
    } catch (error) {
      console.error("Error al agregar la opinión:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
};
0

// Controlador para obtener todas las opiniones
const getOpinions = async (req, res) => {
    try {
        // Consultar la base de datos para obtener todas las opiniones
        const [rows] = await pool.query('SELECT * FROM opinions');

        // Si no se encuentran opiniones, devolver un mensaje
        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron opiniones." });
        }

        // Respuesta exitosa con todas las opiniones
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener las opiniones:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};



// Controlador para obtener una opinión por ID
const getOpinion = async (req, res) => {
    // Extraer el ID de la solicitud
    const { id } = req.params;
  
    try {
      // Consultar la base de datos para obtener la opinión
      const [rows] = await pool.query('SELECT * FROM opinions WHERE idOpinion = ?', [id]);
  
      // Si no se encuentra la opinión, devolver un error
      if (rows.length === 0) {
        return res.status(404).json({ error: "No se encontró ninguna opinión con ese ID." });
      }
  
      // Respuesta exitosa
      res.send(rows[0]);
    } catch (error) {
      console.error("Error al obtener la opinión:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { getOpinion, postOpinion, getOpinions};

/* -------------------------------------- METODO POST --------------------------------------------------
export const createMensaje = async (req, res) => {
    const { Nombre, Apellido, Mensaje } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO Mensajes(Nombre, Apellido, Mensaje) VALUES (?,?,?)',
            [Nombre, Apellido, Mensaje]);
        res.send({
            id: rows.insertId,
            Nombre,
            Apellido,
            Mensaje,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}




// -------------------------------------- METODO GET (all) --------------------------------------------------
export const getMensajes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Mensajes');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

// -------------------------------------- METODO GET (id) --------------------------------------------------
export const getMensaje = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Mensajes WHERE ID = ?', [req.params.id]);

        if (rows.length <= 0) return res.status(404).json({
            message: 'Mensaje not found'
        });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

// -------------------------------------- METODO DEL --------------------------------------------------
export const deleteMensaje = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Mensajes WHERE ID = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Mensaje not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

// -------------------------------------- METODO PUT --------------------------------------------------
export const updateMensaje = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Mensaje } = req.body;

    try {
        const [result] = await pool.query('UPDATE Mensajes SET Nombre = ?, Apellido = ?, Mensaje = ? WHERE ID = ?',
            [Nombre, Apellido, Mensaje, id]);

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Mensaje no encontrado'
        });

        const [rows] = await pool.query('SELECT * FROM Mensajes WHERE ID = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}
*/