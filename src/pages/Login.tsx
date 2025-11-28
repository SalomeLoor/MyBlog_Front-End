import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, useIonRouter } from '@ionic/react'
import React, { useState } from 'react'
import { connectionBackend } from '../BackEnd/connectionBackend';

export interface IDataUser {
    id: number;
    name: string;
    email: string;
    password: string;
    message: string;
    token: string;
    users: IDataUser
}

export interface IUserLogin {
    dataUser?: IDataUser;
    token?: string;
    message?: string;
    email: string;
    password: string;
}

const Login: React.FC = () => {

    const router = useIonRouter();
    const [user, setUser] = useState<IUserLogin>({
        email: '',
        password: ''
    })

    const handleChanceInput = (e: any) => {
        const { name, value } = e.target;
        setUser((datosAnteriores) => ({ ...datosAnteriores, [name]: value }));
    }

    const handleSubmitLogin = async (e: any) => {
        e.preventDefault();
        try {
            const { data } = await connectionBackend.post<IUserLogin>('/login', user);
            console.log("Usuario Logueado", data);
            router.push("folder/Crear_Blog", "root");
            localStorage.setItem("token", data.token ?? ""); // para guardar el token en el local storage
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: data.dataUser?.id,
                    name: data.dataUser?.name,
                    email: data.dataUser?.email,
                })
            );
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            alert("Error al iniciar sesión");
        }
    }

    return (
        <IonPage>
            <IonContent>
                <h1>Bienvenido/a</h1>
                <form onSubmit={handleSubmitLogin}>
                    <IonItem>
                        <IonInput
                            label="Email"
                            labelPlacement="floating"
                            fill="outline"
                            type="email"
                            name="email"
                            placeholder='ex: mariajuana@gmail.com'
                            value={user.email}
                            onChange={handleChanceInput}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Contraseña"
                            labelPlacement="floating"
                            fill="outline"
                            type="password"
                            name="password"
                            placeholder='ingresa tu contraseña'
                            value={user.password}
                            onChange={handleChanceInput}
                        />
                    </IonItem>
                <IonButton type='submit' >Iniciar Sesión</IonButton>
            </form>
        </IonContent>
        </IonPage >
    )
}

export default Login