import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/Page.css';
import CreateBlog from '../components/CreateBlog';
import Profile from '../components/Profile';
import ViewBlogs from '../components/ViewBlogs';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const nameSplit = name.split('_').join(' ');

  const views: any = {
   "Crear Blog": <CreateBlog />,
   "Perfil": <Profile />,
   "Blogs": <ViewBlogs />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{nameSplit}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{nameSplit}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {views[nameSplit] ?? <ExploreContainer name={nameSplit} />} {/*leer acerca de este tipo de condiccional */}
      </IonContent>
    </IonPage>
  );
};

export default Page;
