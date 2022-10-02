let formulario = document.querySelector('form')

/* Variables que traen el input */
let _nombre = document.querySelector('#nombre')
let _apellido = document.querySelector('#apellido')
let _documento = document.querySelectorAll('input[type="radio"]')
let _numero = document.querySelector('#numero')
let _direccion = document.querySelector('#direccion')
let btnEnviar = document.querySelector('input[type="submit"]')

/* Variables que traen el Div */
let _divs = document.getElementsByTagName('div') // Trae todos los Div
const _subcontainer = document.querySelectorAll('.subcontainer') // Div que contiene el label y el input
const _containerDireccion = _divs[12] // Div que contiene el label y el input de Direccion
const errorDetail = document.querySelectorAll('.error-detail') // Div para el mensaje de error

/* Funcion que agrega el mensaje de error */
const setCustomValidityNombre = mensaje => {
    errorDetail[0].innerHTML = mensaje
    _subcontainer[0].classList.toggle('error', mensaje)
}
const setCustomValidityApellido = mensaje => {
    errorDetail[1].innerHTML = mensaje
    _subcontainer[1].classList.toggle('error', mensaje)
}

const setCustomValidityDni = mensaje => {
    errorDetail[3].innerHTML = mensaje
    _subcontainer[3].classList.toggle('error', mensaje)
}

const setCustomValidityCuil = mensaje => {
    errorDetail[3].innerHTML = mensaje
    _subcontainer[3].classList.toggle('error', mensaje)
}

const setCustomValidityDireccion = mensaje => {
    errorDetail[4].innerHTML = mensaje
    _containerDireccion.classList.toggle('error', mensaje)
}


/* Variables de validaciones con expresiones regulares */
let validadorNombre = /^[A-Za-z][a-záéíóúñ]{2,10}$/
// - optativo de 3 a 10 caracteres en total -OK
// - la primera letra en mayúsculas o minúsculas -OK
// - las siguientes letras solo en minúsculas -OK
// - soporta caracteres del español-OK
// - no soporta espacios ni ningún otro caracteres más que los mencionados -OK
let validadorApellido = /^[a-záéíóúñ']{2,20}$/i
// - obligatorio de 2 a 20 caracteres en total -OK
// - todas o algunas letras en mayúsculas y/o minúsculas en cualquier parte del texto -OK
// - soporta caracteres del español y apóstrofes o comillas simples (') -OK
// - no soporta espacios ni ningún otro caracter más que los mencionados -OK
let validadorDni = /^\d{1,2}.?\d{3}.?\d{3}$/
// Debe habilitarse solo si se seleccionó un tipo de documento en el campo anterior. -OK
// Si en el campo anterior se seleccionó DNI, debe permitirse ingresar un número de DNI de 7 u 8 
// dígitos, pudiendo adicionarse 2 caracteres más para ingresar separadores de miles. Ej: "1.234.567",
// "12.234.567", "1234567", "12345678". -OK
// Solo se permitirá el uso del punto como separador de miles, es decir, en las ubicaciones indicadas 
// en los ejemplos. Tampoco se permitirá ingresar un único punto en el número. Es decir, los valores 
// "1.234567" o "1234.567" no deben admitirse. -OK
let validadorCuil = /^\d{2}-?\d{8}-?\d{1}$/
// Si, en cambio, se seleccionó la opción CUIL, debe permitir ingresar un CUIL de 11 dígitos, más dos 
// guiones medios optativos. Ej: "20-33444555-6", "20334445556". Solo se permitirá utilizar el guión 
// luego de los primeros 2 dígitos y antes del último. -OK
// Deberán ingresarse ambos guiones en las ubicaciones correspondientes o ninguno. -OK
// No será válido ingresar los guiones en ubicaciones distintas a las indicadas, como así tampoco 
// ingresar solo uno. 
let validadorDireccion = /^[A-Za-z0-9áéíóúñç\d\s,;!¡#$.()'"°-]{10,200}$/i
// - optativo de 10 a 200 caracteres -OK
// - soporta caracteres en mayúsculas y minúsculas del español y portugués -OK
// - adicionalmente debe soportar espacios, números, comas, guiones medios, puntos, paréntesis, -OK
// - comillas simples y dobles, símbolo de grado "°" y barra "/". -OK

/* Funcion que habilita el input si se hizo check en una opcion */
_numero.disabled = true // Input número de documento deshabilitado

_documento[0].addEventListener('click', (e) => {
    errorDetail[3].style.display = 'none'
    _numero.disabled = false;
    _documento[1].checked = false;
    _numero.value = ''

    _numero.addEventListener('input', e => {
        errorDetail[3].style.display = 'block'
        console.log(validarInputDni(_numero.value))
        formulario.reportValidity()
    })
})

_documento[1].addEventListener('click', (e) => {
    errorDetail[3].style.display = 'none'
    _numero.disabled = false;
    _documento[0].checked = false;
    _numero.value = ''

    _numero.addEventListener('input', e => {
        errorDetail[3].style.display = 'block'
        console.log(validarInputCuil(_numero.value))
        formulario.reportValidity()
    })
})

/* Funcion que valida la respuesta */
function validarInputNombre(nombre) {
    nombre = nombre.trim()
    let mensaje = ''

    if (!validadorNombre.test(nombre)) {
        if (nombre.length < 3) {
            errorDetail[0].style.opacity = "1"
            _nombre.style.border = '2px solid #540b0e'
            mensaje = '* Este campo debe contener mínimo 3 caracteres'
        } else if (nombre.length > 10) {
            errorDetail[0].style.opacity = "1"
            _nombre.style.border = '2px solid #540b0e'
            mensaje = '* Este campo debe contener 10 caracteres como máximo'
        } else {
            errorDetail[0].style.opacity = "1"
            _nombre.style.border = '2px solid #540b0e'
            mensaje = '* Se debe completar todo en minúscula salvo la primer letra que puede ser mayúscula. No permite espacios'
        }
        setCustomValidityNombre(mensaje)
        return null
    } else {
        errorDetail[0].style.opacity = "0"
        errorDetail[0].style.transition = "all 3s"
        _nombre.style.border = '2.5px solid #588157'
    }

    setCustomValidityNombre(mensaje)
    return encodeURIComponent(nombre)
}

function validarInputApellido(apellido) {
    apellido = apellido.trim()
    let mensaje = ''

    if (!validadorApellido.test(apellido)) {
        if (apellido == null || apellido.length == 0 || /^\s+$/.test(apellido)) {
            errorDetail[1].style.opacity = "1"
            _apellido.style.border = '2px solid #540b0e'
            mensaje = '* Este campo es obligatorio'
        } else if (apellido.length < 2) {
            errorDetail[1].style.opacity = "1"
            _apellido.style.border = '2px solid #540b0e'
            mensaje = '* Este campo debe contener mínimo 2 caracteres'
        } else if (apellido.length > 20) {
            errorDetail[1].style.opacity = "1"
            _apellido.style.border = '2px solid #540b0e'
            mensaje = '* Este campo debe contener 20 caracteres como máximo'
        } else {
            errorDetail[1].style.opacity = "1"
            _apellido.style.border = '2px solid #540b0e'
            mensaje = '* Este campo no permite espacios'
        }
        setCustomValidityApellido(mensaje)
        return null
    }
    else {
        errorDetail[1].style.opacity = "0"
        errorDetail[1].style.transition = "all 3s"
        _apellido.style.border = '2.5px solid #588157'
    }
    setCustomValidityApellido(mensaje)
    return encodeURIComponent(apellido)
}

function validarInputDni(dni) {
    dni = dni.trim()
    let mensaje = ''

    if (!validadorDni.test(dni)) {
        if (dni.length < 7) {
            errorDetail[3].style.opacity = "1"
            _numero.style.border = '2px solid #540b0e'
            mensaje = '* Este campo debe contener mínimo 7 caracteres'
        } else if (isNaN(dni)) {
            errorDetail[3].style.opacity = "1"
            _numero.style.border = '2px solid #540b0e'
            mensaje = '* El valor ingresado es incorrecto'
        } else {
            errorDetail[3].style.opacity = "1"
            _numero.style.border = '2px solid #540b0e'
            mensaje = '* Este campo solo permite usar punto como separador de miles'
        }
        setCustomValidityDni(mensaje)
        return null
    } else {
        errorDetail[3].style.opacity = "0"
        errorDetail[3].style.transition = "all 3s"
        _numero.style.border = '2.5px solid #588157'
    }
    setCustomValidityDni(mensaje)
    return encodeURIComponent(dni)
}

function validarInputCuil(cuil) {
    cuil = cuil.trim()
    let mensaje = ''

    if (!validadorCuil.test(cuil)) {
        if (cuil.length < 11) {
            errorDetail[3].style.opacity = "1"
            _numero.style.border = '2px solid #540b0e'
            mensaje = '* Este campo debe contener mínimo 11 caracteres'
        } else if (isNaN(cuil)) {
            errorDetail[3].style.opacity = "1"
            _numero.style.border = '2px solid #540b0e'
            mensaje = '* Este campo no permite letras'
        } else {
            errorDetail[3].style.opacity = "1"
            _numero.style.border = '2px solid #540b0e'
            mensaje = '* Este campo solo permite usar punto como separador de miles'
        }
        setCustomValidityCuil(mensaje)
        return null
    } else {
        errorDetail[3].style.opacity = "0"
        errorDetail[3].style.transition = "all 3s"
        _numero.style.border = '2.5px solid #588157'
    }
    setCustomValidityCuil(mensaje)
    return encodeURIComponent(cuil)
}

function validarInputDireccion(direccion) {
    direccion = direccion.trim()
    let mensaje = ''
    if (!validadorDireccion.test(direccion)) {
        errorDetail[4].style.opacity = "1"
        _direccion.style.border = '2px solid #540b0e'
        if (direccion.length < 10) {
            errorDetail[4].style.opacity = "1"
            _direccion.style.border = '2px solid #540b0e'
            mensaje = '* Este campo debe contener mínimo 10 caracteres'
        } else if (direccion.length > 200) {
            errorDetail[4].style.opacity = "1"
            _direccion.style.border = '2px solid #540b0e'
            mensaje = '* Este campo debe contener 200 caracteres como máximo'
        } else if (direccion = null) {
            errorDetail[4].style.opacity = "1"
            _direccion.style.border = '2px solid #540b0e'
            mensaje = '* Este campo no es válido'
        }
        setCustomValidityDireccion(mensaje)
        return null
    } else {
        errorDetail[4].style.opacity = "0"
        errorDetail[4].style.transition = "all 3s"
        _direccion.style.border = '2.5px solid #588157'
    }
    setCustomValidityDireccion(mensaje)
    return encodeURIComponent(direccion)
}

/* Evento que muestra la validacion en consola */
_nombre.addEventListener('input', e => {
    console.log(validarInputNombre(_nombre.value))
    formulario.reportValidity()
})

_apellido.addEventListener('input', e => {
    console.log(validarInputApellido(_apellido.value))
    formulario.reportValidity()
})

_numero.addEventListener('input', e => {
    console.log(validarInputDni(_numero.value))
    formulario.reportValidity()
})

_numero.addEventListener('input', e => {
    console.log(validarInputCuil(_numero.value))
    formulario.reportValidity()
})

_direccion.addEventListener('input', e => {
    console.log(validarInputDireccion(_direccion.value))
    formulario.reportValidity()
})

/* Evento que muestra la respuesta en consola cuando se acciona el boton de enviar */
formulario.addEventListener('submit', e => {
    e.preventDefault()

    let valorNombre = validarInputNombre(_nombre.value)
    if (valorNombre) {
        console.log(`Nombre: "${valorNombre}"`)
    }

    let valorApellido = validarInputApellido(_apellido.value)
    if (valorApellido) {
        console.log(`Apellido: "${valorApellido}"`)
    }

    let valorDni = validarInputDni(_numero.value)
    if (valorDni) {
        console.log(`DNI: "${valorDni}"`)
    }

    let valorCuil = validarInputCuil(_numero.value)
    if (valorCuil) {
        console.log(`CUIL: "${valorCuil}"`)
    }

    let valorDireccion = validarInputDireccion(_direccion.value)
    if (valorDireccion) {
        console.log(`Dirección: "${valorDireccion}"`)
    }
})