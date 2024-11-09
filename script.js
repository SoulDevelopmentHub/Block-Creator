const fs = require('fs');
const path = require('path');

// Función para leer el archivo de texto
function leerArchivoTXT(archivo) {
  return fs.readFileSync(archivo, 'utf8').split('\n').map(linea => linea.trim()).filter(linea => linea !== '');
}

// Función para crear la carpeta si no existe
function crearCarpetaSiNoExiste(carpeta) {
  if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta, { recursive: true });
    console.log(`Carpeta creada: ${carpeta}`);
  }
}

// Función para generar el JSON de blockstate para slabs
function generarBlockstateSlab(bloque) {
  return {
    "variants": {
      "type=bottom": {
        "model": `custom_things:block/${bloque}_slab`
      },
      "type=top": {
        "model": `custom_things:block/${bloque}_slab_top`
      },
      "type=double": {
        "model": `custom_things:block/${bloque}_slab_full`
      }
    }
  };
}

// Función para generar el JSON de blockstate para bloques normales
function generarBlockstateBlock(bloque) {
  return {
    "variants": {
      "": {
        "model": `custom_things:block/${bloque}`
      }
    }
  };
}

// Función para generar el JSON de blockstate para stairs
function generarBlockstateStairs(bloque) {
  return {
    "variants": {
      "facing=east,half=bottom,shape=straight": {
        "model": `custom_things:block/${bloque}_stairs`
      },
      "facing=west,half=bottom,shape=straight": {
        "model": `custom_things:block/${bloque}_stairs`
      },
      "facing=north,half=bottom,shape=straight": {
        "model": `custom_things:block/${bloque}_stairs`
      },
      "facing=south,half=bottom,shape=straight": {
        "model": `custom_things:block/${bloque}_stairs`
      },
      "facing=east,half=top,shape=straight": {
        "model": `custom_things:block/${bloque}_stairs_top`
      },
      "facing=west,half=top,shape=straight": {
        "model": `custom_things:block/${bloque}_stairs_top`
      },
      "facing=north,half=top,shape=straight": {
        "model": `custom_things:block/${bloque}_stairs_top`
      },
      "facing=south,half=top,shape=straight": {
        "model": `custom_things:block/${bloque}_stairs_top`
      }
    }
  };
}

// Función para generar el JSON del bloque slab
function generarBlockSlab(bloque) {
  return {
    "parent": "block/slab",
    "textures": {
      "bottom": `custom_things:block/${bloque}_texture`,
      "top": `custom_things:block/${bloque}_texture`,
      "side": `custom_things:block/${bloque}_texture`
    },
    "render_type": "solid"
  };
}

// Función para generar el JSON del bloque slab full
function generarBlockSlabFull(bloque) {
  return {
    "parent": "block/slab",
    "textures": {
      "bottom": `custom_things:block/${bloque}_texture`,
      "top": `custom_things:block/${bloque}_texture`,
      "side": `custom_things:block/${bloque}_texture`
    },
    "render_type": "solid"
  };
}

// Función para generar el JSON del bloque slab top
function generarBlockSlabTop(bloque) {
  return {
    "parent": "block/slab_top",
    "textures": {
      "bottom": `custom_things:block/${bloque}_texture`,
      "top": `custom_things:block/${bloque}_texture`,
      "side": `custom_things:block/${bloque}_texture`
    },
    "render_type": "solid"
  };
}

// Función para generar el JSON del bloque normal
function generarBlock(bloque, textura) {
  return {
    "parent": "block/cube_all",
    "textures": {
      "all": `custom_things:block/${textura}`,
      "particle": `custom_things:block/${textura}`
    },
    "render_type": "solid"
  };
}

// Función para generar el JSON del bloque stairs
function generarBlockStairs(bloque) {
  return {
    "parent": "block/stairs",
    "textures": {
      "bottom": `custom_things:block/${bloque}_texture`,
      "top": `custom_things:block/${bloque}_texture`,
      "side": `custom_things:block/${bloque}_texture`
    }
  };
}

// Función para generar el JSON del ítem
function generarItem(bloque) {
  return {
    "parent": `custom_things:block/${bloque}`,
    "display": {
      "thirdperson": {
        "rotation": [
          10,
          -45,
          170
        ],
        "translation": [
          0,
          1.5,
          -2.75
        ],
        "scale": [
          0.375,
          0.375,
          0.375
        ]
      }
    }
  };
}

// Función para generar el JSON del ítem slab
function generarItemSlab(bloque) {
  return {
    "parent": `custom_things:block/${bloque}`,
    "display": {
      "thirdperson": {
        "rotation": [
          10,
          -45,
          170
        ],
        "translation": [
          0,
          1.5,
          -2.75
        ],
        "scale": [
          0.375,
          0.375,
          0.375
        ]
      }
    }
  };
}

// Función para generar los archivos JSON
function generarJSON(bloques) {
  // Crear las carpetas si no existen
  crearCarpetaSiNoExiste('models/block');
  crearCarpetaSiNoExiste('models/item');
  crearCarpetaSiNoExiste('blockstates');

  bloques.forEach(bloque => {
    const [nombre, tipo, textura] = bloque.split(':');

    // Si el bloque tiene el sufijo "_slab", generar archivos para slab, slab_full y slab_top
    if (nombre.endsWith('_slab')) {
      const blockstateData = generarBlockstateSlab(nombre);
      const blockSlabData = generarBlockSlab(nombre);
      const blockSlabFullData = generarBlockSlabFull(nombre);
      const blockSlabTopData = generarBlockSlabTop(nombre);

      // Escribir los archivos JSON en las carpetas correspondientes
      fs.writeFileSync(`models/block/${nombre}.json`, JSON.stringify(blockSlabData, null, 2), 'utf8');
      fs.writeFileSync(`models/block/${nombre}_full.json`, JSON.stringify(blockSlabFullData, null, 2), 'utf8');
      fs.writeFileSync(`models/block/${nombre}_top.json`, JSON.stringify(blockSlabTopData, null, 2), 'utf8');
      fs.writeFileSync(`blockstates/${nombre}.json`, JSON.stringify(blockstateData, null, 2), 'utf8');

      console.log(`Archivos generados para slab: ${nombre}`);

      // Generar también archivos para el slab como ítem
      const itemSlabData = generarItemSlab(nombre);
      fs.writeFileSync(`models/item/${nombre}.json`, JSON.stringify(itemSlabData, null, 2), 'utf8');
    } else if (nombre.endsWith('_stairs')) {
      // Si el bloque es tipo "stairs", generar los archivos correspondientes
      const blockstateData = generarBlockstateStairs(nombre);
      const blockStairsData = generarBlockStairs(nombre);

      // Escribir los archivos JSON en las carpetas correspondientes
      fs.writeFileSync(`models/block/${nombre}.json`, JSON.stringify(blockStairsData, null, 2), 'utf8');
      fs.writeFileSync(`blockstates/${nombre}.json`, JSON.stringify(blockstateData, null, 2), 'utf8');

      console.log(`Archivos generados para stairs: ${nombre}`);

      // Generar también archivos para el stairs como ítem
      const itemStairsData = generarItem(nombre);
      fs.writeFileSync(`models/item/${nombre}.json`, JSON.stringify(itemStairsData, null, 2), 'utf8');
    } else {
      // Generar los archivos normales para bloques no tipo slab o stairs
      const blockData = generarBlock(nombre, textura);
      const itemData = generarItem(nombre);
      const blockstateData = generarBlockstateBlock(nombre);

      // Escribir los archivos JSON en las carpetas correspondientes
      fs.writeFileSync(`models/block/${nombre}.json`, JSON.stringify(blockData, null, 2), 'utf8');
      fs.writeFileSync(`models/item/${nombre}.json`, JSON.stringify(itemData, null, 2), 'utf8');
      fs.writeFileSync(`blockstates/${nombre}.json`, JSON.stringify(blockstateData, null, 2), 'utf8');

      console.log(`Archivos generados para bloque: ${nombre}`);
    }
  });
}

// Bloques a procesar
const bloques = leerArchivoTXT('bloques.txt');

// Generar los archivos JSON
generarJSON(bloques);
