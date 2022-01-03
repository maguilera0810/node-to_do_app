const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key]
      listado.push(tarea)
    })
    return listado;
  }

  constructor(desc) {
    this._listado = {}
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadaEn } = tarea;
      const estado = completadaEn ? 'Completada'.green : 'Pendiente'.red;
      console.log(`${idx} ${desc} :: ${estado}`);

    })
  }

  listadoCompletasPendientes(completadas = true) {
    console.log();
    let i = 1
    this.listadoArr.forEach((tarea) => {
      if (new Boolean(tarea.completadaEn) == completadas) {
        const idx = `${i}`.green;
        const { desc, completadaEn } = tarea;
        const estado = completadaEn ? `${tarea.completadaEn}`.green : '';
        console.log(`${idx} ${desc} ${estado}`);
        i++;
      }
    })
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
  toggleCommpletadas(ids = []) {
    this.listadoArr.forEach((tarea) => {
      this._listado[tarea.id].completadaEn =
        ids.includes(tarea.id) ?
          new Date().toISOString() : null;

    })
  }
}

module.exports = Tareas