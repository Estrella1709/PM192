const personas = [
    {nombre: "Ana", edad: 22},
    {nombre: "Luis", edad: 35},
    {nombre: "Maria", edad: 28}
];

const luisPersona = personas.find(persona => persona.nombre === "Luis");
console.log("Persona encontrada", luisPersona);

personas.forEach(persona => {
    console.log(`${persona.nombre} tiene ${persona.edad} años.`);
});

const edadesTotal = personas.reduce((total, persona) => total + persona.edad, 0);
console.log("Suma total de edades:", edadesTotal); 