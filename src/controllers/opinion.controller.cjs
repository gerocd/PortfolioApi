const { pool } = require("../db.cjs");

const postOpinion = async (req, res) => {
  const { name, location, opinion, calificacion } = req.body;

  try {
    if (calificacion < 1 || calificacion > 5) {
      return res
        .status(400)
        .json({ error: "La calificación debe estar entre 1 y 5." });
    }

    const [rows] = await pool.query(
      "INSERT INTO opinions(name, location, opinion, calificacion) VALUES (?,?,?,?)",
      [name, location, opinion, calificacion]
    );

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
0;


const getOpinions = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM opinions");

   
    if (rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron opiniones." });
    }

    
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener las opiniones:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getOpinion = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM opinions WHERE idOpinion = ?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ninguna opinión con ese ID." });
    }

    res.send(rows[0]);
  } catch (error) {
    console.error("Error al obtener la opinión:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { getOpinion, postOpinion, getOpinions };



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

