new Vue({
    el: '#app',
    data: {
        titulo: '',
        plataforma: '',
        estado: '',
        puntaje: null,
        error: '',
        juegos: [],
        juegoSeleccionado: null,
        filtros: {
            titulo:  '',
            plataforma: '',
            estado: ''
        }
    },
    computed: {
        juegosFiltrados() {
            return this.juegos.filter(juego => {
                return (!this.filtros.titulo || juego.titulo.toLowerCase().includes(this.filtros.titulo.toLowerCase()) ) &&
                       (!this.filtros.plataforma || juego.plataforma === this.filtros.plataforma) &&
                       (!this.filtros.estado || juego.estado === this.filtros.estado);
            });
        }
    },
    methods: {
        registrarJuego() {
            this.error = '';
            if (this.puntaje !== null && (this.puntaje < 1 || this.puntaje > 10)) {
                this.error = 'El puntaje debe estar entre 1 y 10';
                return;
            }
            if (!this.titulo || !this.plataforma || !this.estado) {
                return;
            }
            const nuevoJuego = {
                titulo: this.titulo,
                plataforma: this.plataforma,
                estado: this.estado,
                puntaje: this.puntaje
            };
            this.juegos.push(nuevoJuego);
            this.titulo = '';
            this.plataforma = '';
            this.estado = '';
            this.puntaje = null;
        },
        verDetalles(juego) {
            this.juegoSeleccionado = juego;
        },
        cerrarDetalles() {
            this.juegoSeleccionado = null;
        },
        aplicarFiltros() {
            
        }
    },
    template: `
    <div>
        <h1>Gestión de Colección de Videojuegos</h1>
        <div>
            <h2>Registrar Videojuego</h2>
            <form @submit.prevent="registrarJuego">
                <div>
                    <label>Título:</label>
                    <input v-model="titulo" type="text" required />
                </div>
                <div>
                    <label>Plataforma:</label>
                    <select v-model="plataforma" required>
                        <option value="">Seleccionar</option>
                        <option>PC</option>
                        <option>PS4</option>
                        <option>Xbox One</option>
                        
                    </select>
                </div>
                <div>
                    <label>Estado:</label>
                    <select v-model="estado" required>
                        <option value="">Seleccionar</option>
                        <option>Completado</option>
                        <option>En progreso</option>
                        <option>No iniciado</option>
                    </select>
                </div>
                <div>
                    <label>Puntaje (1-10):</label>
                    <input v-model.number="puntaje" type="number" min="1" max="10" />
                </div>
                <button type="submit">Registrar Videojuego</button>
            </form>
            <div v-if="error" class="error">{{ error }}</div>
        </div>

        <div>
            <h2>Lista de Videojuegos</h2>
            <div>
                <label>Filtrar por Título:</label>
                <input v-model="filtros.titulo" @input="aplicarFiltros" />
                <label>Filtrar por Plataforma:</label>
                <select v-model="filtros.plataforma" @change="aplicarFiltros">
                    <option value="">Todas</option>
                    <option>PC</option>
                    <option>PS4</option>
                    <option>Xbox One</option>
                    
                </select>
                <label>Filtrar por Estado:</label>
                <select v-model="filtros.estado" @change="aplicarFiltros">
                    <option value="">Todos</option>
                    <option>Completado</option>
                    <option>En progreso</option>
                    <option>No iniciado</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Plataforma</th>
                        <th>Estado</th>
                        <th>Puntaje</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="juego in juegosFiltrados" >
                        <td>{{ juego.titulo }}</td>
                        <td>{{ juego.plataforma }}</td>
                        <td>{{ juego.estado }}</td>
                        <td>{{ juego.puntaje }}</td>
                        <td><button @click="verDetalles(juego)">Ver Detalles</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="juegoSeleccionado">
            <h2>Detalles del Videojuego</h2>
            <p><strong>Título:</strong> {{ juegoSeleccionado.titulo }}</p>
            <p><strong>Plataforma:</strong> {{ juegoSeleccionado.plataforma }}</p>
            <p><strong>Estado:</strong> {{ juegoSeleccionado.estado }}</p>
            <p><strong>Puntaje:</strong> {{ juegoSeleccionado.puntaje }}</p>
            <button @click="cerrarDetalles">Cerrar</button>
        </div>
    </div>
    `
});


  