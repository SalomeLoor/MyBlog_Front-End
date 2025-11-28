import { IonButton, IonItem, IonLabel, useIonRouter } from '@ionic/react'
import React from 'react'

const Profile: React.FC = () => {
  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;
  const router = useIonRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login", "root");
  };
  return (
    <div>
      <IonItem>
        <IonLabel>Nombre: {userObj?.name}</IonLabel>
        <IonLabel>Email: {userObj?.email}</IonLabel>
      </IonItem>

      <IonItem>
        <IonButton onClick={handleLogout}>Cerrar Sesión</IonButton>
      </IonItem>
    </div>
  )
}

export default Profile