document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });
});

// Vue instance
var app = new Vue({
    el: '#formulario-agente',
    data: {
        nombre: '',
        descripcion: '',
        imagen: '',
        habilidad1_nombre: 'C',
        habilidad1_descripcion: '',
        habilidad1_icono: '',
        habilidad1_img: '',
        habilidad2_nombre: 'Q',
        habilidad2_descripcion: '',
        habilidad2_icono: '',
        habilidad2_img: '',
        habilidad3_nombre: 'E',
        habilidad3_descripcion: '',
        habilidad3_icono: '',
        habilidad3_img: '',
        habilidad4_nombre: 'X',
        habilidad4_descripcion: '',
        habilidad4_icono: '',
        habilidad4_img: ''
    },
    methods: {
        construirRutaImagen: function () {
            this.imagen = `/src/Valorant/Personajes/${this.nombre}/${this.nombre}.png`;
            this.habilidad1_icono = `/src/Valorant/Personajes/${this.nombre}/Habs/C_${this.nombre}.webp`;
            this.habilidad1_img = `/src/Valorant/Personajes/${this.nombre}/Habs/C_${this.nombre}_Hab.webp`;
            this.habilidad2_icono = `/src/Valorant/Personajes/${this.nombre}/Habs/Q_${this.nombre}.webp`;
            this.habilidad2_img = `/src/Valorant/Personajes/${this.nombre}/Habs/Q_${this.nombre}_Hab.webp`;
            this.habilidad3_icono = `/src/Valorant/Personajes/${this.nombre}/Habs/E_${this.nombre}.webp`;
            this.habilidad3_img = `/src/Valorant/Personajes/${this.nombre}/Habs/E_${this.nombre}_Hab.webp`;
            this.habilidad4_icono = `/src/Valorant/Personajes/${this.nombre}/Habs/X_${this.nombre}.webp`;
            this.habilidad4_img = `/src/Valorant/Personajes/${this.nombre}/Habs/X_${this.nombre}_Hab.webp`;
        },
        enviarFormulario: function () {
            var data_estructurada = {
                nombre: this.$data.nombre,
                descripcion: this.$data.descripcion,
                imagen: this.$data.imagen,
                habilidades: [
                    {
                        nombre: this.$data.habilidad1_nombre,
                        descripcion: this.$data.habilidad1_descripcion,
                        icono: this.$data.habilidad1_icono,
                        img: this.$data.habilidad1_img,
                    },
                    {
                        nombre: this.$data.habilidad2_nombre,
                        descripcion: this.$data.habilidad2_descripcion,
                        icono: this.$data.habilidad2_icono,
                        img: this.$data.habilidad2_img,
                    },
                    {
                        nombre: this.$data.habilidad3_nombre,
                        descripcion: this.$data.habilidad3_descripcion,
                        icono: this.$data.habilidad3_icono,
                        img: this.$data.habilidad3_img,
                    },
                    {
                        nombre: this.$data.habilidad4_nombre,
                        descripcion: this.$data.habilidad4_descripcion,
                        icono: this.$data.habilidad4_icono,
                        img: this.$data.habilidad4_img,
                    },
                ]
            };
        
            fetch('https://tearsdev.pythonanywhere.com/crear_agentes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_estructurada),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Datos a enviar al servidor:', data_estructurada);
                console.log('Respuesta del servidor:', data);
                alert('Agente creado Exitosamente!')
                window.location.href = '/templates/agentes.html';
            })
            .catch(error => {
                alert('Error al crear el Agente')
                console.error('Error al enviar el formulario:', error);
            });
        }        
    }
});
