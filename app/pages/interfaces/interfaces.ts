export interface Users{
    id:number;
    nombreCompleto: string;
    email: string;
    sede: string;
    asignatura: string;
    ano: number;
    semestre: string;
    horas_sem: number;
    password: string;
    role: string;
    isactive: boolean;
}

export interface Usuario{
    nombreCompleto: string;
    email: string;
    sede: string;
    asignatura: string;
    ano: number;
    semestre: string;
    horas_sem: number;
    password: string;
    role: string;
    isactive:boolean;
}

//get, put, delete
export interface Palabras{
    id:number;
    email: string;
    texto:string;
}

//post
export interface Palabra{
    email: string;
    texto: string;
}
export interface ialumnosPresentesId{
    id:number,
    idClase:number,
    nomYApe:string,
    correoA:string,
    asignatura:string,
    fecha:string
}

export interface ialumnosPresentes{
    idClase:number,
    nomYApe:string,
    correoA:string,
    asignatura:string,
    fecha:string
}

export interface igenerarQR{
    id:number,
    nomYApeD:string,
    correoD:string,
    fecha:string,
    asignatura:string
}