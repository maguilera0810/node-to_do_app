const inquirer = require('inquirer');
require('colors');


const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1'.green}. Crear Tarea`
      },
      {
        value: '2',
        name: `${'2'.green}. Listar tareas`
      },
      {
        value: '3',
        name: `${'3'.green}. Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4'.green}. Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5'.green}. Completar tarea(s)`
      },
      {
        value: '6',
        name: `${'6'.green}. Eliminar tarea`
      },
      {
        value: '0',
        name: `${'0'.green}. Salir`
      },
    ]

  }
]


const inquirerMenu = async () => {
  console.clear();
  console.log('\n==========================================='.green);
  console.log('\tSelecciones una opción'.white);
  console.log('==========================================='.green);
  const { opcion } = await inquirer.prompt(preguntas);
  return opcion
}

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.green} para continuar`,
    }
  ]
  console.log();
  const { enter } = await inquirer.prompt(question);
  console.log(enter);
  return enter
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ]
  const { desc } = await inquirer.prompt(question);
  return desc;
}


const listadoTareasDelete = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  })
  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'

  })
  const question = [
    {
      type: 'list',
      name: 'id',
      message: `Borrar`,
      choices
    }
  ]
  const { id } = await inquirer.prompt(question);
  return id;
};


const confirmar = async (message = '') => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]
  const { ok } = await inquirer.prompt(question);
  return ok;
}

const showCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: ` ${idx} ${tarea.desc}`,
      checked: tarea.completadaEn ? true : false
    }
  })
  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: `Selecciones`,
      choices
    }
  ]
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  confirmar,
  inquirerMenu,
  leerInput,
  listadoTareasDelete,
  showCheckList,
  pausa
}