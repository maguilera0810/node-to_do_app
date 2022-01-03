require('colors');

const { readData, saveData } = require('./helpers/manageData');
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasDelete,
  confirmar,
  showCheckList
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');




const main = async () => {
  let opt = '';

  const tareas = new Tareas()
  const tareasDB = readData();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listadoCompletasPendientes(completadas = true);
        break;
      case '4':
        tareas.listadoCompletasPendientes(completadas = false);
        break;

      case '5':
        const ids = await showCheckList(tareas.listadoArr);
        tareas.toggleCommpletadas(ids);
        break;
      case '6':
        const id = await listadoTareasDelete(tareas.listadoArr);
        if (id === '0') break;
        const ok = await confirmar('¿Estas seguro?')
        if (ok) {
          tareas.borrarTarea(id);
          console.log('Tarea borrada');
        }
        break;
      default:
        break;
    }
    saveData(tareas.listadoArr)
    await pausa();
  } while (opt !== '0');
}

main();