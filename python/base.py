import json
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship, Session
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Agente(Base):
    __tablename__ = 'agente'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(255), nullable=False)
    descripcion = Column(Text, nullable=False)
    imagen = Column(String(255), nullable=False)
    habilidades = relationship('Habilidad', back_populates='agente')

class Habilidad(Base):
    __tablename__ = 'habilidad'

    id = Column(Integer, primary_key=True)
    agente_id = Column(Integer, ForeignKey('agente.id'))
    nombre = Column(String(255), nullable=False)
    descripcion = Column(Text, nullable=False)
    icono = Column(String(255), nullable=False)
    img = Column(String(255), nullable=False)
    agente = relationship('Agente', back_populates='habilidades')


engine = create_engine('mysql://root:1234@localhost/agentes_valorant')
Base.metadata.create_all(bind=engine)

# Carga el JSON y guarda los datos en la base de datos
with open('src\Json\personajes.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

session = Session(engine)

for agente_data in data:
    agente = Agente(nombre=agente_data['nombre'], descripcion=agente_data['descripcion'], imagen=agente_data['imagen'])
    habilidades = [Habilidad(**habilidad, agente=agente) for habilidad in agente_data['habilidades']]
    agente.habilidades = habilidades
    session.add(agente)

session.commit()
session.close()
