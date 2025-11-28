import { IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, useIonRouter } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import '../styles/CreateBlog.css';
import { connectionBackend } from '../BackEnd/connectionBackend';

const CreateBlog: React.FC = () => {
    const user = localStorage.getItem("user")
    const [blog, setBlog] = useState({
        title: '',
        summary: '',
        content: '',
        readingTime: '',
        category: '',
        tags: [] as string[],
        userId: user ? JSON.parse(user).id : null
    });
    console.log("user loguedo", user)
    const router = useIonRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        //verifica si hay token para que pueda acceder
        if (!token) {
            router.push("/login", "root");
            return;
        }
    }, [router]);

    const handleChangeInput = (name: string, value: any) => {
        setBlog(prev => ({ ...prev, [name]: value }));
    };

    console.log("Datos del blog a crear", blog)
    const handleCreateBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = localStorage.getItem("user");
            const { data } = await connectionBackend.post('/createPost', blog)
            console.log("Blog creado", data);
            alert("Blog creado exitosamente");
            router.push("/folder/Blogs", "root");
        } catch (error) {
            console.error("Error al crear el blog", error);
            alert("Error al crear el blog");
        }
    }

  

    return (
        <div className="createBlogContainer">
            <form onSubmit={handleCreateBlog}>
                <IonItem className="minimal-item">
                    <IonLabel position="stacked">Título</IonLabel>
                    <IonInput
                        name='title'
                        fill='solid'
                        placeholder='Ingrese el título del blog'
                        value={blog.title}
                        onIonChange={(e) => handleChangeInput("title", e.detail.value)}
                        required
                    />
                </IonItem>

                <IonItem className="minimal-item">
                    <IonLabel position="stacked">Resumen</IonLabel>
                    <IonTextarea
                        className='ionTaxtArea'
                        name='summary'
                        fill='solid'
                        placeholder='Ingrese un breve resumen'
                        value={blog.summary}
                        onIonChange={(e) => handleChangeInput("summary", e.detail.value)}
                        required
                    />
                </IonItem>

                <IonItem className="minimal-item">
                    <IonLabel position="stacked">Contenido</IonLabel>
                    <IonTextarea
                        className='ionTaxtArea'
                        name='content'
                        fill='solid'
                        placeholder='Ingrese el contenido del blog'
                        value={blog.content}
                        onIonChange={(e) => handleChangeInput("content", e.detail.value)}
                        required
                    />
                </IonItem>

                <IonItem className="minimal-item time-reading">
                    <div className="row-flex">
                        <IonSelect
                            className='ionSelect'
                            placeholder='---Tiempo de lectura---'
                            name='readingTime'
                            value={blog.readingTime}
                            onIonChange={(e) => handleChangeInput("readingTime", e.detail.value)}
                            required
                        >
                            <IonSelectOption value="5 minutos">5 minutos</IonSelectOption>
                            <IonSelectOption value="10 minutos">10 minutos</IonSelectOption>
                            <IonSelectOption value="15 minutos">15 minutos</IonSelectOption>
                            <IonSelectOption value="20 minutos">20 minutos</IonSelectOption>
                            <IonSelectOption value="25 minutos">25 minutos</IonSelectOption>
                            <IonSelectOption value="30 minutos">30 minutos</IonSelectOption>
                            <IonSelectOption value="35 minutos">35 minutos</IonSelectOption>
                            <IonSelectOption value="40 minutos">40 minutos</IonSelectOption>
                            <IonSelectOption value="45 minutos">45 minutos</IonSelectOption>
                            <IonSelectOption value="50 minutos">50 minutos</IonSelectOption>
                            <IonSelectOption value="55 minutos">55 minutos</IonSelectOption>
                            <IonSelectOption value="1 hora">1 hora</IonSelectOption>
                            <IonSelectOption value="1:05 hora">1:05 hora</IonSelectOption>
                            <IonSelectOption value="1:10 hora">1:10 hora</IonSelectOption>
                            <IonSelectOption value="1:15 hora">1:15 hora</IonSelectOption>
                            <IonSelectOption value="1:20 hora">1:20 hora</IonSelectOption>
                            <IonSelectOption value="1:25 hora">1:25 hora</IonSelectOption>
                            <IonSelectOption value="1:30 hora">1:30 hora</IonSelectOption>
                            <IonSelectOption value="1:35 hora">1:35 hora</IonSelectOption>
                            <IonSelectOption value="1:40 hora">1:40 hora</IonSelectOption>
                            <IonSelectOption value="1:45 hora">1:45 hora</IonSelectOption>
                            <IonSelectOption value="1:50 hora">1:50 hora</IonSelectOption>
                            <IonSelectOption value="1:55 hora">1:55 hora</IonSelectOption>
                            <IonSelectOption value="2 horas">2 horas</IonSelectOption>
                        </IonSelect>
                    </div>
                </IonItem>

                <IonItem className="minimal-item">
                    <IonSelect
                        className='ionSelect'
                        placeholder='---Seleccione una categoría---'
                        name='category'
                        value={blog.category}
                        onIonChange={(e) => handleChangeInput("category", e.detail.value)}
                        required
                    >
                        <IonSelectOption value="Html">Html</IonSelectOption>
                        <IonSelectOption value="Css">Css</IonSelectOption>
                        <IonSelectOption value="JavaScript">JavaScript</IonSelectOption>
                        <IonSelectOption value="TypeScript">TypeScript</IonSelectOption>
                        <IonSelectOption value="Phython">Phython</IonSelectOption>
                        <IonSelectOption value="Front-End">Front-End</IonSelectOption>
                        <IonSelectOption value="Back-End">Back-End</IonSelectOption>
                        <IonSelectOption value="Api Rest Full">Api Rest Full</IonSelectOption>
                        <IonSelectOption value="Despliegue">Despliegue</IonSelectOption>
                        <IonSelectOption value="Ciencia de Datos">Django</IonSelectOption>
                        <IonSelectOption value="Algoritmos">Machine Learning</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem className="minimal-item">
                    <IonSelect
                        multiple
                        className='ionSelect'
                        placeholder='---Seleccione etiquetas---'
                        name='tags'
                        value={blog.tags}
                        onIonChange={(e) => handleChangeInput("tags", e.detail.value)}
                        required
                    >
                        <IonSelectOption disabled>---Guias paso a paso---</IonSelectOption>
                        <IonSelectOption value="Guias">Guias</IonSelectOption>
                        <IonSelectOption value="Animaciones">Animaciones</IonSelectOption>

                        <IonSelectOption disabled>---Frameworks y Librerías---</IonSelectOption>
                        <IonSelectOption value="NodeJs">NodeJs</IonSelectOption>
                        <IonSelectOption value="ReactJs">ReactJs</IonSelectOption>
                        <IonSelectOption value="Ionic">Ionic</IonSelectOption>

                        <IonSelectOption disabled>---Servicios Back-End---</IonSelectOption>
                        <IonSelectOption value="Firebase">Firebase</IonSelectOption>
                        <IonSelectOption value="PocketBase">PocketBase</IonSelectOption>
                        <IonSelectOption value="Supabase">Supabase</IonSelectOption>

                        <IonSelectOption disabled>---Hosting---</IonSelectOption>
                        <IonSelectOption value="Netlify">Netlify</IonSelectOption>

                        <IonSelectOption disabled>---PaaS/IaaS---</IonSelectOption>
                        <IonSelectOption value="Amazon AWS">Amazon AWS</IonSelectOption>
                        <IonSelectOption value="Render">Render</IonSelectOption>
                        <IonSelectOption value="Vercel">Vercel</IonSelectOption>

                        <IonSelectOption disabled>---Back-End Libs---</IonSelectOption>
                        <IonSelectOption value="Express">Express</IonSelectOption>
                        <IonSelectOption value="MySql2">MySql2</IonSelectOption>
                        <IonSelectOption value="Sequelize">Sequelize</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonButton type="submit">Crear Blog</IonButton>
            </form>

           
        </div>
    )
}

export default CreateBlog
