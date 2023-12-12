from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:1234@localhost/agentes_valorant'
db = SQLAlchemy(app)

# Modelo de la tabla Agente
class Agente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    imagen = db.Column(db.String(255), nullable=False)
    habilidades = db.relationship('Habilidad', backref='agente', lazy=True)

# Modelo de la tabla Habilidad
class Habilidad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    agente_id = db.Column(db.Integer, db.ForeignKey('agente.id'), nullable=False)
    nombre = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    icono = db.Column(db.String(255), nullable=False)
    img = db.Column(db.String(255), nullable=False)

# Rutas de la API
@app.route('/agentes', methods=['GET'])
def obtener_agentes():
    agentes = Agente.query.options(db.joinedload(Agente.habilidades)).all()

    lista_agentes = []

    for agente in agentes:
        agente_dict = {
            "id": agente.id,
            "nombre": agente.nombre,
            "descripcion": agente.descripcion,
            "imagen": agente.imagen,
            "habilidades": []
        }

        for habilidad in agente.habilidades:
            habilidad_dict = {
                "nombre": habilidad.nombre,
                "descripcion": habilidad.descripcion,
                "icono": habilidad.icono,
                "img": habilidad.img
            }
            agente_dict["habilidades"].append(habilidad_dict)

        lista_agentes.append(agente_dict)

    return jsonify(lista_agentes)

@app.route('/crear_agentes', methods=['POST'])
def crear_agentes():
    try:
        datos_agente = request.json
        nuevo_agente = Agente(
            nombre=datos_agente['nombre'],
            descripcion=datos_agente['descripcion'],
            imagen=datos_agente['imagen']
        )

        habilidades = []
        for habilidad_data in datos_agente['habilidades']:
            habilidad = Habilidad(
                nombre=habilidad_data['nombre'],
                descripcion=habilidad_data['descripcion'],
                icono=habilidad_data['icono'],
                img=habilidad_data['img']
            )
            habilidades.append(habilidad)

        nuevo_agente.habilidades = habilidades

        db.session.add(nuevo_agente)
        db.session.commit()

        return jsonify({"mensaje": "Agente creado exitosamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/agente/<int:agente_id>', methods=['GET'])
def obtener_agente(agente_id):
    try:
        agente = Agente.query.get(agente_id)

        if not agente:
            return jsonify({"error": "Agente no encontrado"}), 404

        agente_dict = {
            "id": agente.id,
            "nombre": agente.nombre,
            "descripcion": agente.descripcion,
            "imagen": agente.imagen,
            "habilidades": []
        }

        for habilidad in agente.habilidades:
            habilidad_dict = {
                "nombre": habilidad.nombre,
                "descripcion": habilidad.descripcion,
                "icono": habilidad.icono,
                "img": habilidad.img
            }
            agente_dict["habilidades"].append(habilidad_dict)

        return jsonify(agente_dict), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Ruta para actualizar un agente existente
@app.route('/actualizar_agente/<int:agente_id>', methods=['PUT'])
def actualizar_agente(agente_id):
    try:
        agente = Agente.query.get(agente_id)

        if not agente:
            return jsonify({"error": "Agente no encontrado"}), 404

        datos_actualizados = request.json

        # Actualizar campos del agente
        agente.nombre = datos_actualizados.get('nombre', agente.nombre)
        agente.descripcion = datos_actualizados.get('descripcion', agente.descripcion)
        agente.imagen = datos_actualizados.get('imagen', agente.imagen)

        # Actualizar habilidades
        for i, habilidad_data in enumerate(datos_actualizados.get('habilidades', [])):
            habilidad_model = agente.habilidades[i]
            habilidad_model.nombre = habilidad_data.get('nombre', habilidad_model.nombre)
            habilidad_model.descripcion = habilidad_data.get('descripcion', habilidad_model.descripcion)
            habilidad_model.icono = habilidad_data.get('icono', habilidad_model.icono)
            habilidad_model.img = habilidad_data.get('img', habilidad_model.img)

        db.session.commit()

        return jsonify({"mensaje": "Agente actualizado exitosamente"}), 200  
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para eliminar un agente
@app.route('/eliminar_agente/<int:agente_id>', methods=['DELETE'])
def eliminar_agente(agente_id):
    try:
        agente = Agente.query.get(agente_id)

        if not agente:
            return jsonify({"error": "Agente no encontrado"}), 404

        db.session.delete(agente)
        db.session.commit()

        return jsonify({"mensaje": "Agente eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)