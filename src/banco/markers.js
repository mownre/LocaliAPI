const markers = deps => {
    return {
        all: () => {
            return new Promise(function (resolve, reject) {
                const { connection, errorHandler } = deps;
                connection.query('SELECT * FROM markers', function (error, results) {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os marcadores', reject);
                        return false;
                    }

                    resolve({ markers: results });
                })
            });
        },

        save: (umMarker) => {
            return new Promise(function (resolve, reject) {
                const { connection, errorHandler } = deps;
                connection.query('INSERT INTO markers (propriedades) VALUES (?)', [JSON.stringify(umMarker)], function (error, results) {
                    if (error) {
                        errorHandler(error, 'Falha ao salvar o marcador', reject);
                        return false;
                    }

                    resolve({ marker: { id: results.insertId } });
                })
            });
        },

        update: (id, umMarker) => {
            return new Promise(function (resolve, reject) {
                const { connection, errorHandler } = deps;
                connection.query('UPDATE markers SET propriedades = ? WHERE id = ?', [umMarker, id], function (error, results) {
                    if (error) {
                        errorHandler(error, 'Falha ao atualizar o marcador', reject);
                        return false;
                    }

                    resolve({ marker: { id: results.insertId } });
                })
            });

        },

        delete: (id) => {
            return new Promise(function (resolve, reject) {
                const { connection, errorHandler } = deps;
                connection.query('DELETE FROM markers WHERE id = ?', [id], function (error, results) {
                    if (error) {
                        errorHandler(error, 'Falha ao remover o marcador', reject);
                        return false;
                    }

                    resolve({ message: "Marcador removido com sucesso" });
                })
            });

        }
    }
}



module.exports = markers;
